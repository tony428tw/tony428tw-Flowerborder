const state = {
  mode: "name",
  fighters: [],
  round: 0,
  wins: [0, 0],
  locked: false,
  phase: "idle",
  animationId: 0,
  roundTimer: 0,
  arena: null,
  activeIndex: 0,
  roundWinners: [],
  lastResult: null,
  finalWinner: null,
  recordSaved: false,
  log: []
};

const els = {
  setupView: document.querySelector("#setupView"),
  battleView: document.querySelector("#battleView"),
  nameModeButton: document.querySelector("#nameModeButton"),
  singleModeButton: document.querySelector("#singleModeButton"),
  modeHint: document.querySelector("#modeHint"),
  playerOneInput: document.querySelector("#playerOneInput"),
  playerTwoInput: document.querySelector("#playerTwoInput"),
  playerOnePreview: document.querySelector("#playerOnePreview"),
  playerTwoPreview: document.querySelector("#playerTwoPreview"),
  startButton: document.querySelector("#startButton"),
  leftNameLabel: document.querySelector("#leftNameLabel"),
  rightNameLabel: document.querySelector("#rightNameLabel"),
  roundProgress: document.querySelector("#roundProgress"),
  leftPanel: document.querySelector("#leftPanel"),
  rightPanel: document.querySelector("#rightPanel"),
  canvas: document.querySelector("#arenaCanvas"),
  roundOverlay: document.querySelector("#roundOverlay"),
  battleLog: document.querySelector("#battleLog"),
  nextRoundButton: document.querySelector("#nextRoundButton"),
  rematchButton: document.querySelector("#rematchButton"),
  backButton: document.querySelector("#backButton"),
  recordsButton: document.querySelector("#recordsButton"),
  recordsDialog: document.querySelector("#recordsDialog"),
  recordsList: document.querySelector("#recordsList"),
  clearRecordsButton: document.querySelector("#clearRecordsButton")
};

const ctx = els.canvas.getContext("2d");
const MAX_ROUNDS = 3;
const glyphBlockCache = new Map();

function cleanName(value) {
  const chars = Array.from(value.replace(/\s/g, ""));
  const limit = state.mode === "single" ? 1 : 3;
  return chars.slice(0, limit).join("");
}

function charSeed(char, index) {
  const code = char.codePointAt(0) || 0;
  return (code * 9301 + (index + 7) * 49297) % 233280;
}

function stat(char, index, salt, min, max) {
  const seed = (charSeed(char, index) + salt * 7919) % 9973;
  return min + (seed % (max - min + 1));
}

function makeGlyph(char, index, side) {
  const weight = stat(char, index, 1, 42, 76);
  const speed = stat(char, index, 2, 56, 96);
  const attack = stat(char, index, 3, 45, 86);
  const defense = stat(char, index, 4, 34, 74);
  const stamina = stat(char, index, 5, 62, 98);
  return {
    char,
    index,
    side,
    weight,
    speed,
    attack,
    defense,
    stamina,
    hp: 100
  };
}

function makeFighter(name, side) {
  const fallback = side === 0 ? "戰鬥陀" : "螺旋王";
  const clean = cleanName(name) || cleanName(fallback);
  const chars = Array.from(clean);
  return {
    name: clean,
    side,
    color: side === 0 ? "#181818" : "#ad3a31",
    glyphs: chars.map((char, index) => makeGlyph(char, index, side))
  };
}

function cardMarkup(glyph) {
  return `
    <div class="letter-card">
      <div class="hanzi-box"><span>${glyph.char}</span></div>
      <div class="letter-stats">
        <div>${glyph.char}</div>
        <div>重${glyph.weight} 穩${glyph.stamina}</div>
        <div>攻${glyph.attack} 防${glyph.defense}</div>
      </div>
    </div>
  `;
}

function renderPreviews() {
  const f1 = makeFighter(els.playerOneInput.value, 0);
  const f2 = makeFighter(els.playerTwoInput.value, 1);
  els.playerOnePreview.innerHTML = f1.glyphs.map(cardMarkup).join("");
  els.playerTwoPreview.innerHTML = f2.glyphs.map(cardMarkup).join("");
}

function setMode(mode) {
  state.mode = mode;
  els.nameModeButton.classList.toggle("active", mode === "name");
  els.singleModeButton.classList.toggle("active", mode === "single");
  els.modeHint.textContent = mode === "name"
    ? "雙方各輸入三個字的名字，每個字化為一顆陀螺。三回合各派一字對決，先得兩勝的名字最強。"
    : "雙方各輸入一個字，一顆陀螺決勝負。字的重量、攻防與穩定度由文字本身生成。";
  els.playerOneInput.maxLength = mode === "single" ? 1 : 6;
  els.playerTwoInput.maxLength = mode === "single" ? 1 : 6;
  els.playerOneInput.value = cleanName(els.playerOneInput.value);
  els.playerTwoInput.value = cleanName(els.playerTwoInput.value);
  renderPreviews();
}

function renderRoundProgress() {
  const dots = Array.from({ length: MAX_ROUNDS }, (_, index) => {
    if (index < state.round) {
      return state.roundWinners[index] === 0 ? "●" : "○";
    }
    return "○";
  }).join(" ");
  const displayRound = Math.min((state.phase === "paused" || state.phase === "finished" ? state.activeIndex + 1 : state.round + 1), MAX_ROUNDS);
  els.roundProgress.textContent = `${dots}　第 ${displayRound} / ${MAX_ROUNDS} 回`;
}

function renderPanel(panel, fighter, activeIndex) {
  const sideClass = fighter.side === 1 ? "right-side" : "";
  const active = fighter.glyphs[activeIndex] || fighter.glyphs[fighter.glyphs.length - 1];
  panel.classList.toggle("right-side", fighter.side === 1);
  panel.innerHTML = `
    <h2>${fighter.name}</h2>
    <div class="letter-list">
      ${fighter.glyphs.map((glyph, index) => `
        <div class="letter-slot ${index === activeIndex ? "active" : ""}">
          <span>${glyph.char}</span>
          <small>${letterStatus(glyph, index, activeIndex)}</small>
        </div>
      `).join("")}
    </div>
    <div class="active-card ${sideClass}">
      <div class="hanzi-box"><span>${active.char}</span>${damageGrid(active)}</div>
      <div class="integrity">${active.char}　完整度 <strong>${Math.max(0, Math.round(active.hp))}</strong>%</div>
    </div>
  `;
}

function damageGrid(glyph) {
  const missing = Math.max(0, Math.round((100 - glyph.hp) / 5));
  const active = state.phase === "playing" ? 5 : 0;
  const count = Math.min(24, Math.max(active, missing));
  if (!count) return "";
  const blocks = Array.from({ length: count }, (_, index) => {
    const seed = charSeed(glyph.char, glyph.index + index + 71);
    const x = 9 + (seed % 78);
    const y = 8 + ((seed >> 4) % 76);
    const size = 7 + ((seed >> 7) % 8);
    return `<i style="left:${x}%; top:${y}%; width:${size}px; height:${size}px"></i>`;
  }).join("");
  return `<div class="damage-map">${blocks}</div>`;
}

function letterStatus(glyph, index, activeIndex) {
  if (glyph.result) return glyph.result;
  if (index === activeIndex && state.phase === "playing") return "戰鬥中";
  if (index === activeIndex && state.phase === "paused") return "待戰";
  return "待戰";
}

function renderBattleUi() {
  els.leftNameLabel.textContent = state.fighters[0].name;
  els.rightNameLabel.textContent = state.fighters[1].name;
  renderRoundProgress();
  const activeIndex = Math.min(state.activeIndex, state.fighters[0].glyphs.length - 1);
  renderPanel(els.leftPanel, state.fighters[0], activeIndex);
  renderPanel(els.rightPanel, state.fighters[1], activeIndex);
  els.battleLog.innerHTML = state.log.map(line => `<div>${line}</div>`).join("");
  renderRoundOverlay();
  els.nextRoundButton.classList.toggle("hidden", state.phase !== "paused");
}

function renderRoundOverlay() {
  if (state.phase !== "paused" && state.phase !== "finished") {
    els.roundOverlay.classList.add("hidden");
    els.roundOverlay.innerHTML = "";
    return;
  }
  const result = state.lastResult;
  if (!result) return;
  const winnerName = state.fighters[result.winner].name;
  const winnerChar = result.winner === 0 ? result.left.char : result.right.char;
  const title = state.phase === "finished" ? `本回合勝　${winnerChar}` : `本回合勝　${winnerChar}`;
  const score = `${state.fighters[0].name} ${state.wins[0]} - ${state.wins[1]} ${state.fighters[1].name}`;
  els.roundOverlay.innerHTML = `
    <div class="round-overlay-card">
      <strong>${title}</strong>
      <span>目前比數　${score}</span>
      <span>${state.phase === "finished" ? `勝者　${winnerName}` : "按下一回合繼續"}</span>
    </div>
  `;
  els.roundOverlay.classList.remove("hidden");
}

function resizeCanvasForDpr() {
  const rect = els.canvas.getBoundingClientRect();
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  els.canvas.width = Math.round(rect.width * dpr);
  els.canvas.height = Math.round(rect.width * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawArenaBase(size) {
  const center = size / 2;
  ctx.clearRect(0, 0, size, size);

  const bowl = ctx.createRadialGradient(center, center, 20, center, center, center * 0.95);
  bowl.addColorStop(0, "#fffdf8");
  bowl.addColorStop(0.52, "#fbf8ef");
  bowl.addColorStop(1, "#eee3d2");
  ctx.fillStyle = bowl;
  ctx.beginPath();
  ctx.arc(center, center, center * 0.88, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.strokeStyle = "rgba(178, 58, 49, 0.28)";
  ctx.lineWidth = 2;
  ctx.shadowColor = "rgba(70, 45, 25, 0.12)";
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 12;
  ctx.beginPath();
  ctx.arc(center, center, center * 0.88, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  ctx.strokeStyle = "rgba(173, 58, 49, 0.18)";
  ctx.lineWidth = 2;
  [0.24, 0.45, 0.66, 0.84].forEach(r => {
    ctx.beginPath();
    ctx.arc(center, center, center * r, 0, Math.PI * 2);
    ctx.stroke();
  });

  ctx.strokeStyle = "rgba(25, 25, 25, 0.05)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 12; i += 1) {
    const angle = (Math.PI * 2 * i) / 12;
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(center + Math.cos(angle) * center * 0.84, center + Math.sin(angle) * center * 0.84);
    ctx.stroke();
  }
}

function mixColor(hex, amount) {
  const value = Number.parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, ((value >> 16) & 255) + amount));
  const g = Math.max(0, Math.min(255, ((value >> 8) & 255) + amount));
  const b = Math.max(0, Math.min(255, (value & 255) + amount));
  return `rgb(${r}, ${g}, ${b})`;
}

function getGlyphBlocks(char) {
  if (glyphBlockCache.has(char)) return glyphBlockCache.get(char);

  const sample = document.createElement("canvas");
  const sampleSize = 160;
  const sampleCtx = sample.getContext("2d", { willReadFrequently: true });
  sample.width = sampleSize;
  sample.height = sampleSize;
  sampleCtx.fillStyle = "#000";
  sampleCtx.font = "900 122px 'Noto Serif TC', 'Kaiti TC', serif";
  sampleCtx.textAlign = "center";
  sampleCtx.textBaseline = "middle";
  sampleCtx.fillText(char, sampleSize / 2, sampleSize / 2 + 5);

  const data = sampleCtx.getImageData(0, 0, sampleSize, sampleSize).data;
  const seedBase = charSeed(char, 31);
  const blocks = [];
  const step = 11;

  for (let y = 20; y < sampleSize - 18; y += step) {
    for (let x = 20; x < sampleSize - 18; x += step) {
      let alpha = 0;
      for (let oy = -2; oy <= 2; oy += 2) {
        for (let ox = -2; ox <= 2; ox += 2) {
          alpha += data[((y + oy) * sampleSize + (x + ox)) * 4 + 3];
        }
      }
      if (alpha < 980) continue;

      const seed = (seedBase + x * 41 + y * 73) % 9973;
      if (seed % 5 === 0) continue;
      blocks.push({
        x: x - sampleSize / 2 + ((seed % 5) - 2) * 0.45,
        y: y - sampleSize / 2 + (((seed >> 3) % 5) - 2) * 0.45,
        w: 8 + (seed % 7),
        h: 8 + ((seed >> 2) % 7),
        d: 4 + ((seed >> 4) % 4),
        angle: ((seed % 7) - 3) * 0.035,
        lift: ((seed >> 6) % 9) * 0.35
      });
    }
  }

  blocks.sort((a, b) => a.y - b.y);
  const limited = blocks.slice(0, 72);
  glyphBlockCache.set(char, limited);
  return limited;
}

function drawBlock(block, palette, alpha = 1) {
  const x = block.x;
  const y = block.y - block.lift;
  const w = block.w;
  const h = block.h;
  const d = block.d;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(block.angle);
  ctx.globalAlpha *= alpha;

  ctx.fillStyle = palette.shadow;
  ctx.fillRect(d * 0.8, d * 1.15, w, h);

  ctx.fillStyle = palette.side;
  ctx.beginPath();
  ctx.moveTo(w, 0);
  ctx.lineTo(w + d, d);
  ctx.lineTo(w + d, h + d);
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = palette.under;
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(w, h);
  ctx.lineTo(w + d, h + d);
  ctx.lineTo(d, h + d);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = palette.face;
  ctx.strokeStyle = palette.stroke;
  ctx.lineWidth = 0.8;
  ctx.fillRect(0, 0, w, h);
  ctx.strokeRect(0, 0, w, h);
  ctx.restore();
}

function drawGlyphSlab(char, palette) {
  ctx.save();
  ctx.font = "900 118px 'Noto Serif TC', 'Kaiti TC', serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineJoin = "round";
  ctx.lineWidth = 3;

  for (let depth = 7; depth >= 1; depth -= 1) {
    ctx.globalAlpha = 0.22;
    ctx.fillStyle = palette.side;
    ctx.fillText(char, depth * 1.15, depth * 1.45 + 4);
  }

  ctx.globalAlpha = 0.42;
  ctx.fillStyle = palette.face;
  ctx.strokeStyle = palette.stroke;
  ctx.fillText(char, 0, 4);
  ctx.strokeText(char, 0, 4);
  ctx.restore();
}

function paletteFor(color) {
  const red = color !== "#181818";
  return red
    ? {
        face: "#b43a31",
        side: "#7f2a25",
        under: "#983129",
        stroke: "rgba(92, 26, 22, 0.24)",
        shadow: "rgba(65, 42, 34, 0.15)"
      }
    : {
        face: "#2b2b27",
        side: "#6e6d64",
        under: "#4c4c45",
        stroke: "rgba(16, 16, 14, 0.24)",
        shadow: "rgba(30, 30, 24, 0.14)"
      };
}

function drawTop(top) {
  ctx.save();
  ctx.translate(top.x, top.y);
  ctx.globalAlpha = top.alpha || 1;

  const wobble = Math.sin(top.spin * 1.9) * 0.08;
  ctx.fillStyle = "rgba(30, 24, 18, 0.18)";
  ctx.beginPath();
  ctx.ellipse(10, 28, top.radius * 1.24, top.radius * 0.28, -0.14, 0, Math.PI * 2);
  ctx.fill();

  ctx.rotate(top.spin);
  ctx.transform(1, wobble, -0.12, 0.58, 0, 0);
  ctx.scale(top.scale, top.scale);

  const blocks = getGlyphBlocks(top.char);
  const palette = paletteFor(top.color);
  const spinBlur = Math.min(0.34, Math.abs(top.spinRate || 0) * 0.7);

  ctx.save();
  ctx.globalAlpha *= 0.32;
  ctx.translate(8, 9);
  blocks.forEach(block => drawBlock(block, palette, 0.36));
  ctx.restore();

  drawGlyphSlab(top.char, palette);
  blocks.forEach((block, index) => {
    const pulse = spinBlur && index % 4 === 0 ? 0.68 : 1;
    drawBlock(block, palette, pulse);
  });

  ctx.restore();
}

function drawFragment(fragment) {
  ctx.save();
  ctx.translate(fragment.x, fragment.y);
  ctx.rotate(fragment.spin);
  ctx.globalAlpha = fragment.alpha;
  ctx.fillStyle = fragment.side;
  ctx.fillRect(fragment.depth, fragment.depth, fragment.w, fragment.h);
  ctx.fillStyle = fragment.color;
  ctx.strokeStyle = "rgba(60, 35, 25, 0.18)";
  ctx.lineWidth = 1;
  ctx.fillRect(0, 0, fragment.w, fragment.h);
  ctx.strokeRect(0, 0, fragment.w, fragment.h);
  ctx.restore();
}

function makeFragments(leftGlyph, rightGlyph, result, size) {
  const center = size / 2;
  const glyphs = [leftGlyph, rightGlyph];
  const fragments = [];
  glyphs.forEach((glyph, side) => {
    const count = side === result.winner ? 8 : 16;
    const baseAngle = side === 0 ? Math.PI * 0.78 : Math.PI * 1.72;
    for (let i = 0; i < count; i += 1) {
      const seed = charSeed(glyph.char, glyph.index + i + 11);
      const angle = baseAngle + (i - count / 2) * 0.11 + (seed % 19) / 92;
      const distance = size * (0.1 + (seed % 190) / 780);
      const color = side === 0 ? "#2d2d29" : "#b23a31";
      fragments.push({
        x: center + Math.cos(angle) * distance,
        y: center + Math.sin(angle) * distance,
        vx: Math.cos(angle) * (0.34 + (seed % 9) / 13),
        vy: Math.sin(angle) * (0.26 + (seed % 7) / 16),
        spin: (seed % 360) * Math.PI / 180,
        spinRate: ((seed % 13) - 6) / 110,
        w: 5 + (seed % 13),
        h: 5 + ((seed >> 3) % 13),
        depth: 4,
        color,
        side: side === 0 ? "#707066" : "#7b2c27",
        alpha: 0
      });
    }
  });
  return fragments;
}

function drawPostRoundScene(result) {
  resizeCanvasForDpr();
  const size = els.canvas.getBoundingClientRect().width;
  const center = size / 2;
  drawArenaBase(size);

  const fragments = makeFragments(result.left, result.right, result, size);
  fragments.forEach((fragment, index) => {
    fragment.alpha = 0.38 + (index % 4) * 0.07;
    fragment.x += fragment.vx * 52;
    fragment.y += fragment.vy * 52;
    fragment.spin += fragment.spinRate * 52;
    drawFragment(fragment);
  });

  const tops = spawnTops(result.left, result.right);
  tops[0].x = center - (result.winner === 0 ? size * 0.02 : size * 0.19);
  tops[0].y = center + (result.winner === 0 ? size * 0.04 : size * 0.13);
  tops[0].spin = 2.4;
  tops[0].alpha = result.winner === 0 ? 0.92 : 0.18;
  tops[1].x = center + (result.winner === 1 ? size * 0.02 : size * 0.18);
  tops[1].y = center - (result.winner === 1 ? size * 0.02 : size * 0.12);
  tops[1].spin = -1.7;
  tops[1].alpha = result.winner === 1 ? 0.92 : 0.18;
  drawTop(tops[1 - result.winner]);
  drawTop(tops[result.winner]);
}

function spawnTops(leftGlyph, rightGlyph) {
  const size = els.canvas.getBoundingClientRect().width;
  const center = size / 2;
  return [
    {
      glyph: leftGlyph,
      char: leftGlyph.char,
      color: "#181818",
      x: center - size * 0.12,
      y: center + size * 0.08,
      vx: 1.15 + leftGlyph.speed / 90,
      vy: -0.64,
      radius: 42 + leftGlyph.weight / 11,
        scale: 0.64 + leftGlyph.weight / 220,
      spin: 0,
      spinRate: 0.24 + leftGlyph.speed / 460,
      alpha: 1
    },
    {
      glyph: rightGlyph,
      char: rightGlyph.char,
      color: "#ad3a31",
      x: center + size * 0.12,
      y: center - size * 0.04,
      vx: -1.05 - rightGlyph.speed / 95,
      vy: 0.72,
      radius: 42 + rightGlyph.weight / 11,
        scale: 0.64 + rightGlyph.weight / 220,
      spin: 0.8,
      spinRate: -0.22 - rightGlyph.speed / 470,
      alpha: 1
    }
  ];
}

function collisionDamage(attacker, defender) {
  const force = attacker.glyph.attack * 0.72 + attacker.glyph.speed * 0.26 + attacker.glyph.weight * 0.13;
  const guard = defender.glyph.defense * 0.58 + defender.glyph.weight * 0.17 + defender.glyph.stamina * 0.12;
  return Math.max(4, Math.round((force - guard * 0.52) / 5));
}

function resolveRound(leftGlyph, rightGlyph) {
  const leftBefore = leftGlyph.hp;
  const rightBefore = rightGlyph.hp;
  const leftPower = leftGlyph.attack * 1.05 + leftGlyph.stamina * 0.72 + leftGlyph.defense * 0.62 + leftGlyph.weight * 0.42 + leftGlyph.speed * 0.38;
  const rightPower = rightGlyph.attack * 1.05 + rightGlyph.stamina * 0.72 + rightGlyph.defense * 0.62 + rightGlyph.weight * 0.42 + rightGlyph.speed * 0.38;
  const leftLuck = ((charSeed(leftGlyph.char, leftGlyph.index) % 17) - 8) * 0.9;
  const rightLuck = ((charSeed(rightGlyph.char, rightGlyph.index + 3) % 17) - 8) * 0.9;
  const leftScore = leftPower + leftLuck;
  const rightScore = rightPower + rightLuck;
  const winner = leftScore >= rightScore ? 0 : 1;
  const diff = Math.abs(leftScore - rightScore);
  const damage = Math.min(68, Math.max(17, Math.round(30 + diff / 3)));
  if (winner === 0) {
    rightGlyph.hp = Math.max(0, rightGlyph.hp - damage);
    leftGlyph.hp = Math.max(12, leftGlyph.hp - Math.round(damage * 0.35));
  } else {
    leftGlyph.hp = Math.max(0, leftGlyph.hp - damage);
    rightGlyph.hp = Math.max(12, rightGlyph.hp - Math.round(damage * 0.35));
  }
  return {
    winner,
    diff,
    damage,
    left: leftGlyph,
    right: rightGlyph,
    before: [leftBefore, rightBefore],
    after: [leftGlyph.hp, rightGlyph.hp]
  };
}

function animateRound(leftGlyph, rightGlyph, result) {
  cancelAnimationFrame(state.animationId);
  clearTimeout(state.roundTimer);
  resizeCanvasForDpr();
  const size = els.canvas.getBoundingClientRect().width;
  const center = size / 2;
  const limit = center * 0.82;
  const tops = spawnTops(leftGlyph, rightGlyph);
  const fragments = makeFragments(leftGlyph, rightGlyph, result, size);
  let frame = 0;

  function tick() {
    frame += 1;
    drawArenaBase(size);
    tops.forEach(top => {
      top.x += top.vx;
      top.y += top.vy;
      top.spin += top.spinRate;
      top.spinRate *= 0.996;
      const dx = top.x - center;
      const dy = top.y - center;
      const dist = Math.hypot(dx, dy);
      if (dist > limit - top.radius * 0.35) {
        const nx = dx / dist;
        const ny = dy / dist;
        top.vx -= nx * 0.24;
        top.vy -= ny * 0.24;
        top.vx *= 0.96;
        top.vy *= 0.96;
      }
    });

    const a = tops[0];
    const b = tops[1];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.hypot(dx, dy);
    if (dist < a.radius + b.radius && frame % 7 === 0) {
      const nx = dx / Math.max(1, dist);
      const ny = dy / Math.max(1, dist);
      const hitA = collisionDamage(b, a) / 22;
      const hitB = collisionDamage(a, b) / 22;
      a.vx -= nx * hitA;
      a.vy -= ny * hitA;
      b.vx += nx * hitB;
      b.vy += ny * hitB;
      a.spinRate *= -1.04;
      b.spinRate *= -1.04;
    }

    if (frame > 170) {
      tops[1 - result.winner].alpha = Math.max(0.16, tops[1 - result.winner].alpha - 0.015);
      tops[1 - result.winner].spinRate *= 0.96;
    }

    if (frame > 46) {
      fragments.forEach(fragment => {
        fragment.alpha = Math.min(0.58, fragment.alpha + 0.028);
        fragment.x += fragment.vx;
        fragment.y += fragment.vy;
        fragment.vy += 0.015;
        fragment.spin += fragment.spinRate;
      });
    }

    fragments.forEach(drawFragment);
    drawTop(tops[0]);
    drawTop(tops[1]);

    if (frame < 235) {
      state.animationId = requestAnimationFrame(tick);
    } else {
      endRound(result);
    }
  }

  tick();
}

function makeRoundLog(roundNumber, result) {
  const leftChar = result.left.char;
  const rightChar = result.right.char;
  const winnerChar = result.winner === 0 ? leftChar : rightChar;
  const loserChar = result.winner === 0 ? rightChar : leftChar;
  const heavyHits = Math.max(3, Math.min(5, Math.round(result.damage / 13)));
  const lines = [`第 ${roundNumber} 回合：「${leftChar}」對「${rightChar}」！`];

  for (let i = 0; i < heavyHits; i += 1) {
    const target = i === heavyHits - 2 ? winnerChar : loserChar;
    lines.push(`• 「${target}」筆畫被撞斷轉飛！`);
  }

  lines.push(`• 「${loserChar}」中心旋轉力耗盡，「${winnerChar}」勝出本回合！`);
  lines.push(`• 完整度：「${leftChar}」${Math.round(result.after[0])}%，「${rightChar}」${Math.round(result.after[1])}%`);
  return lines;
}

function endRound(result) {
  const leftGlyph = state.fighters[0].glyphs[Math.min(state.round, state.fighters[0].glyphs.length - 1)];
  const rightGlyph = state.fighters[1].glyphs[Math.min(state.round, state.fighters[1].glyphs.length - 1)];
  state.wins[result.winner] += 1;
  state.roundWinners[state.round] = result.winner;
  leftGlyph.result = result.winner === 0 ? "勝" : "敗";
  rightGlyph.result = result.winner === 1 ? "勝" : "敗";
  state.lastResult = result;
  state.log = makeRoundLog(state.round + 1, result);
  state.round += 1;
  drawPostRoundScene(result);

  const finished = state.round >= MAX_ROUNDS || state.mode === "single";
  if (finished) {
    finishMatch();
    return;
  }

  state.phase = "paused";
  state.activeIndex = Math.max(0, state.round - 1);
  renderBattleUi();
}

function playRound() {
  if (state.locked || state.phase === "playing") return;
  state.phase = "playing";
  state.activeIndex = Math.min(state.round, state.fighters[0].glyphs.length - 1);
  state.lastResult = null;
  renderBattleUi();
  const leftGlyph = state.fighters[0].glyphs[Math.min(state.round, state.fighters[0].glyphs.length - 1)];
  const rightGlyph = state.fighters[1].glyphs[Math.min(state.round, state.fighters[1].glyphs.length - 1)];
  const result = resolveRound(leftGlyph, rightGlyph);
  animateRound(leftGlyph, rightGlyph, result);
}

function finishMatch() {
  state.locked = true;
  state.phase = "finished";
  state.activeIndex = Math.max(0, state.round - 1);
  const leftTotal = state.fighters[0].glyphs.reduce((sum, glyph) => sum + glyph.hp, 0);
  const rightTotal = state.fighters[1].glyphs.reduce((sum, glyph) => sum + glyph.hp, 0);
  let winner = state.wins[0] === state.wins[1] ? (leftTotal >= rightTotal ? 0 : 1) : (state.wins[0] > state.wins[1] ? 0 : 1);
  state.finalWinner = winner;
  state.log.push(`• 最終勝者：${state.fighters[winner].name}（${state.wins[0]}：${state.wins[1]}）`);
  renderBattleUi();
  if (!state.recordSaved) {
    saveRecord(winner);
    state.recordSaved = true;
  }
}

function saveRecord(winner) {
  const records = getRecords();
  records.unshift({
    time: new Date().toLocaleString("zh-TW", { hour12: false }),
    left: state.fighters[0].name,
    right: state.fighters[1].name,
    score: `${state.wins[0]}：${state.wins[1]}`,
    winner: state.fighters[winner].name
  });
  localStorage.setItem("name-battle-records", JSON.stringify(records.slice(0, 18)));
}

function startBattle() {
  cancelAnimationFrame(state.animationId);
  clearTimeout(state.roundTimer);
  state.fighters = [
    makeFighter(els.playerOneInput.value, 0),
    makeFighter(els.playerTwoInput.value, 1)
  ];
  state.round = 0;
  state.wins = [0, 0];
  state.roundWinners = [];
  state.locked = false;
  state.phase = "idle";
  state.activeIndex = 0;
  state.lastResult = null;
  state.finalWinner = null;
  state.recordSaved = false;
  state.log = ["第 1 回合準備開始。"];
  els.setupView.classList.add("hidden");
  els.battleView.classList.remove("hidden");
  renderBattleUi();
  resizeCanvasForDpr();
  drawArenaBase(els.canvas.getBoundingClientRect().width);
  window.setTimeout(playRound, 500);
}

function nextRound() {
  if (state.phase !== "paused") return;
  state.activeIndex = Math.min(state.round, state.fighters[0].glyphs.length - 1);
  state.log = [`第 ${state.round + 1} 回合準備開始。`];
  playRound();
}

function backToSetup() {
  cancelAnimationFrame(state.animationId);
  clearTimeout(state.roundTimer);
  state.phase = "idle";
  els.battleView.classList.add("hidden");
  els.setupView.classList.remove("hidden");
  renderPreviews();
}

function getRecords() {
  try {
    return JSON.parse(localStorage.getItem("name-battle-records") || "[]");
  } catch {
    return [];
  }
}

function renderRecords() {
  const records = getRecords();
  els.recordsList.innerHTML = records.length
    ? records.map(record => `
        <div class="record-item">
          <div><strong>${record.winner}</strong> 勝出　${record.score}</div>
          <div>${record.left} 對 ${record.right}</div>
          <small>${record.time}</small>
        </div>
      `).join("")
    : `<div class="empty-records">尚無上場紀錄。</div>`;
}

els.nameModeButton.addEventListener("click", () => setMode("name"));
els.singleModeButton.addEventListener("click", () => setMode("single"));
els.playerOneInput.addEventListener("input", renderPreviews);
els.playerTwoInput.addEventListener("input", renderPreviews);
els.startButton.addEventListener("click", startBattle);
els.nextRoundButton.addEventListener("click", nextRound);
els.rematchButton.addEventListener("click", startBattle);
els.backButton.addEventListener("click", backToSetup);
els.recordsButton.addEventListener("click", () => {
  renderRecords();
  els.recordsDialog.showModal();
});
els.clearRecordsButton.addEventListener("click", () => {
  localStorage.removeItem("name-battle-records");
  renderRecords();
});
window.addEventListener("resize", () => {
  if (!els.battleView.classList.contains("hidden")) {
    if ((state.phase === "paused" || state.phase === "finished") && state.lastResult) {
      drawPostRoundScene(state.lastResult);
    } else {
      resizeCanvasForDpr();
      drawArenaBase(els.canvas.getBoundingClientRect().width);
    }
  }
});

setMode("name");
