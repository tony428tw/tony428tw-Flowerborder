const plants = [
  { name: "樟樹", scientific: "Cinnamomum camphora", type: "喬木", native: "原生／歸化", height: "6m 以上", spacing: "6-8m", flower: "黃綠", season: ["春"], foliage: "常綠闊葉、芳香", sun: ["全日照", "半日照"], water: "中等", maintenance: "低", eco: "鳥類食源、遮蔭", function: "背景骨架", layer: "背景", risk: "", colors: ["白綠清爽"], tags: ["校園花境", "公園花境", "台灣原生植物風"] },
  { name: "臺灣欒樹", scientific: "Koelreuteria henryi", type: "喬木", native: "原生", height: "6m 以上", spacing: "6-8m", flower: "黃花、粉紅蒴果", season: ["秋"], foliage: "季相明顯", sun: ["全日照", "西曬強烈"], water: "耐旱", maintenance: "低", eco: "蜜源、鳥類棲息", function: "季節焦點", layer: "背景", risk: "落花落果需避開精密鋪面", colors: ["黃橘熱情", "四季混色"], tags: ["校園花境", "公園花境", "道路綠帶", "台灣原生植物風"] },
  { name: "流蘇", scientific: "Chionanthus retusus", type: "小喬木", native: "原生／歸化", height: "3-6m", spacing: "3-4m", flower: "白", season: ["春"], foliage: "細緻白花、落葉", sun: ["全日照", "半日照"], water: "中等", maintenance: "中", eco: "蜜源", function: "入口焦點", layer: "背景", risk: "", colors: ["白綠清爽"], tags: ["校園花境", "住宅庭園", "日式清雅風"] },
  { name: "山櫻花", scientific: "Prunus campanulata", type: "小喬木", native: "原生", height: "3-6m", spacing: "3-5m", flower: "粉紅", season: ["春"], foliage: "春花、落葉", sun: ["全日照", "半日照"], water: "中等", maintenance: "中", eco: "蜜源、鳥類食源", function: "春季主景", layer: "背景", risk: "落花期需清理", colors: ["粉紫柔和", "紅色節慶"], tags: ["校園花境", "療癒庭園", "台灣原生植物風"] },
  { name: "福木", scientific: "Garcinia subelliptica", type: "小喬木", native: "原生／歸化", height: "3-6m", spacing: "3-5m", flower: "淡黃", season: ["夏"], foliage: "常綠厚葉", sun: ["全日照", "半日照", "西曬強烈"], water: "耐旱", maintenance: "低", eco: "鳥類棲息", function: "常綠屏障", layer: "背景", risk: "", colors: ["白綠清爽"], tags: ["商業空間", "道路綠帶", "現代極簡風"] },
  { name: "羅漢松", scientific: "Podocarpus macrophyllus", type: "小喬木", native: "原生／歸化", height: "3-6m", spacing: "2-4m", flower: "不明顯", season: ["四季"], foliage: "常綠針葉感", sun: ["全日照", "半日照"], water: "中等", maintenance: "中", eco: "鳥類棲息", function: "端景、骨架", layer: "背景", risk: "", colors: ["白綠清爽"], tags: ["日式清雅風", "現代極簡風", "住宅庭園"] },
  { name: "桂花", scientific: "Osmanthus fragrans", type: "灌木", native: "外來／常用", height: "1.5-2.5m", spacing: "1.2-1.8m", flower: "白黃、芳香", season: ["秋"], foliage: "常綠細緻", sun: ["全日照", "半日照"], water: "中等", maintenance: "低", eco: "蜜源", function: "香氣與中層骨架", layer: "中景", risk: "", colors: ["白綠清爽", "黃橘熱情"], tags: ["療癒庭園", "住宅庭園", "日式清雅風"] },
  { name: "樹蘭", scientific: "Aglaia odorata", type: "灌木", native: "原生／歸化", height: "1.5-2.5m", spacing: "1.2-1.5m", flower: "淡黃、芳香", season: ["夏", "秋"], foliage: "常綠細葉", sun: ["全日照", "半日照"], water: "中等", maintenance: "低", eco: "蜜源", function: "背景灌木", layer: "中景", risk: "", colors: ["白綠清爽"], tags: ["校園花境", "公園花境", "台灣原生植物風"] },
  { name: "朱槿", scientific: "Hibiscus rosa-sinensis", type: "灌木", native: "常用", height: "1.5-2.5m", spacing: "1.2-1.8m", flower: "紅、粉、黃", season: ["春", "夏", "秋"], foliage: "常綠大葉", sun: ["全日照", "西曬強烈"], water: "中等", maintenance: "中", eco: "蜜源、誘蝶", function: "熱帶花色焦點", layer: "中景", risk: "需定期修剪維持花量", colors: ["紅色節慶", "黃橘熱情", "四季混色"], tags: ["熱帶度假風", "商業空間", "公園花境"] },
  { name: "野牡丹", scientific: "Melastoma candidum", type: "灌木", native: "原生", height: "0.8-1.5m", spacing: "0.9-1.2m", flower: "紫", season: ["夏", "秋"], foliage: "粗質感葉", sun: ["全日照", "半日照"], water: "中等", maintenance: "低", eco: "蜜源、誘蝶", function: "紫花主題灌木", layer: "中景", risk: "", colors: ["粉紫柔和", "藍紫靜謐"], tags: ["自然野趣風", "台灣原生植物風", "公園花境"] },
  { name: "杜鵑", scientific: "Rhododendron spp.", type: "灌木", native: "常用", height: "0.8-1.5m", spacing: "0.8-1.2m", flower: "粉、白、紅", season: ["春"], foliage: "常綠密實", sun: ["半日照", "林下陰影"], water: "中等", maintenance: "中", eco: "蜜源", function: "春季色塊", layer: "中景", risk: "忌積水與強鹼土", colors: ["粉紫柔和", "白綠清爽", "紅色節慶"], tags: ["日式清雅風", "住宅庭園", "療癒庭園"] },
  { name: "六月雪", scientific: "Serissa japonica", type: "灌木", native: "常用", height: "0.5-1m", spacing: "0.5-0.8m", flower: "白", season: ["夏"], foliage: "細葉、密植", sun: ["全日照", "半日照"], water: "中等", maintenance: "低", eco: "小型昆蟲棲地", function: "低灌木邊界", layer: "前中景", risk: "", colors: ["白綠清爽"], tags: ["日式清雅風", "現代極簡風", "住宅庭園"] },
  { name: "金露華", scientific: "Duranta erecta", type: "灌木", native: "常用", height: "1-2m", spacing: "0.9-1.2m", flower: "紫", season: ["夏", "秋"], foliage: "常綠、可修剪", sun: ["全日照", "西曬強烈"], water: "耐旱", maintenance: "低", eco: "蜜源、誘蝶", function: "花籬與中層色帶", layer: "中景", risk: "果實不宜食用", colors: ["藍紫靜謐", "粉紫柔和"], tags: ["公園花境", "道路綠帶", "低維護"] },
  { name: "桃金孃", scientific: "Rhodomyrtus tomentosa", type: "灌木", native: "原生", height: "1-2m", spacing: "1-1.5m", flower: "粉", season: ["春", "夏"], foliage: "絨毛質感", sun: ["全日照", "西曬強烈"], water: "耐旱", maintenance: "低", eco: "蜜源、鳥類食源", function: "野趣灌木", layer: "中景", risk: "", colors: ["粉紫柔和"], tags: ["自然野趣風", "台灣原生植物風", "道路綠帶"] },
  { name: "百子蓮", scientific: "Agapanthus africanus", type: "草花", native: "外來／常用", height: "0.5-0.9m", spacing: "0.4-0.6m", flower: "藍紫、白", season: ["夏"], foliage: "線形葉", sun: ["全日照", "半日照"], water: "中等", maintenance: "低", eco: "蜜源", function: "中低層花序", layer: "草花層", risk: "", colors: ["藍紫靜謐", "白綠清爽"], tags: ["現代極簡風", "日式清雅風", "商業空間"] },
  { name: "紫嬌花", scientific: "Tulbaghia violacea", type: "草花／地被", native: "外來／常用", height: "0.3-0.6m", spacing: "0.3-0.45m", flower: "紫", season: ["春", "夏", "秋"], foliage: "線形葉", sun: ["全日照", "西曬強烈"], water: "耐旱", maintenance: "低", eco: "蜜源", function: "前景花帶", layer: "前景", risk: "具蔥蒜氣味", colors: ["粉紫柔和", "藍紫靜謐"], tags: ["低維護", "現代極簡風", "道路綠帶"] },
  { name: "美人蕉", scientific: "Canna indica", type: "草花", native: "常用", height: "0.8-1.8m", spacing: "0.6-0.9m", flower: "紅、黃、橘", season: ["夏", "秋"], foliage: "大葉、熱帶感", sun: ["全日照", "濕地／水邊"], water: "濕生", maintenance: "中", eco: "蜜源", function: "高草花焦點", layer: "草花層", risk: "花後需清理殘花", colors: ["黃橘熱情", "紅色節慶"], tags: ["熱帶度假風", "水岸花境", "公園花境"] },
  { name: "金針花", scientific: "Hemerocallis fulva", type: "草花", native: "常用", height: "0.5-0.8m", spacing: "0.4-0.6m", flower: "橘黃", season: ["夏"], foliage: "線形叢生", sun: ["全日照", "半日照"], water: "中等", maintenance: "低", eco: "蜜源", function: "夏季花帶", layer: "草花層", risk: "", colors: ["黃橘熱情"], tags: ["自然野趣風", "療癒庭園", "公園花境"] },
  { name: "繁星花", scientific: "Pentas lanceolata", type: "草花", native: "外來／常用", height: "0.3-0.6m", spacing: "0.3-0.45m", flower: "粉、紅、白", season: ["春", "夏", "秋"], foliage: "細緻花序", sun: ["全日照", "半日照"], water: "中等", maintenance: "中", eco: "蜜源、誘蝶", function: "前景色塊", layer: "前景", risk: "需更新補植維持花量", colors: ["粉紫柔和", "紅色節慶", "白綠清爽"], tags: ["高齡療癒花園風", "商業空間", "誘蝶"] },
  { name: "馬纓丹", scientific: "Lantana camara", type: "草花／灌木", native: "外來／歸化", height: "0.4-1m", spacing: "0.5-0.8m", flower: "黃、橘、粉", season: ["春", "夏", "秋"], foliage: "粗質感、耐熱", sun: ["全日照", "西曬強烈"], water: "耐旱", maintenance: "低", eco: "蜜源、誘蝶", function: "耐熱花帶", layer: "前中景", risk: "部分地區具擴散性，需控管", colors: ["黃橘熱情", "四季混色"], tags: ["自然野趣風", "道路綠帶", "低維護"] },
  { name: "蔓花生", scientific: "Arachis pintoi", type: "地被", native: "外來／常用", height: "0.05-0.15m", spacing: "0.25-0.35m", flower: "黃", season: ["春", "夏", "秋"], foliage: "低矮密覆", sun: ["全日照", "半日照"], water: "中等", maintenance: "低", eco: "蜜源、固氮", function: "覆蓋裸土", layer: "地被層", risk: "需邊界控管", colors: ["黃橘熱情", "四季混色"], tags: ["低維護", "校園花境", "公園花境"] },
  { name: "玉龍草", scientific: "Ophiopogon japonicus", type: "地被", native: "常用", height: "0.1-0.2m", spacing: "0.2-0.3m", flower: "淡紫不明顯", season: ["夏"], foliage: "細葉常綠", sun: ["半日照", "林下陰影"], water: "中等", maintenance: "低", eco: "覆蓋棲地", function: "陰處地被", layer: "地被層", risk: "", colors: ["白綠清爽", "藍紫靜謐"], tags: ["日式清雅風", "住宅庭園", "林下"] },
  { name: "麥門冬", scientific: "Liriope spicata", type: "地被", native: "常用", height: "0.2-0.35m", spacing: "0.25-0.35m", flower: "淡紫", season: ["夏", "秋"], foliage: "線形常綠", sun: ["全日照", "半日照", "林下陰影"], water: "中等", maintenance: "低", eco: "蜜源、覆蓋棲地", function: "邊界地被", layer: "地被層", risk: "", colors: ["藍紫靜謐", "白綠清爽"], tags: ["現代極簡風", "日式清雅風", "低維護"] },
  { name: "沿階草", scientific: "Ophiopogon bodinieri", type: "地被", native: "常用", height: "0.15-0.3m", spacing: "0.25-0.35m", flower: "淡紫", season: ["夏"], foliage: "細葉", sun: ["半日照", "林下陰影"], water: "中等", maintenance: "低", eco: "覆蓋棲地", function: "步道邊界", layer: "地被層", risk: "", colors: ["白綠清爽", "藍紫靜謐"], tags: ["日式清雅風", "高齡療癒花園風"] },
  { name: "天胡荽", scientific: "Hydrocotyle sibthorpioides", type: "地被", native: "原生／歸化", height: "0.05-0.15m", spacing: "0.2-0.3m", flower: "不明顯", season: ["四季"], foliage: "圓葉、濕潤感", sun: ["半日照", "林下陰影", "濕地／水邊"], water: "濕生", maintenance: "低", eco: "小型棲地", function: "濕潤地被", layer: "地被層", risk: "過濕處易蔓延", colors: ["白綠清爽"], tags: ["水岸花境", "療癒庭園", "台灣原生植物風"] },
  { name: "水丁香", scientific: "Ludwigia octovalvis", type: "水生／濕生", native: "原生", height: "0.5-1m", spacing: "0.5-0.8m", flower: "黃", season: ["夏", "秋"], foliage: "濕生草本", sun: ["全日照", "濕地／水邊"], water: "濕生", maintenance: "中", eco: "蜜源、水岸棲地", function: "水邊花帶", layer: "中前景", risk: "需控管水位與蔓延", colors: ["黃橘熱情"], tags: ["水岸花境", "台灣原生植物風"] },
  { name: "石菖蒲", scientific: "Acorus gramineus", type: "水生／濕生", native: "常用", height: "0.2-0.4m", spacing: "0.25-0.4m", flower: "不明顯", season: ["四季"], foliage: "線形香草質感", sun: ["半日照", "濕地／水邊"], water: "濕生", maintenance: "低", eco: "濕地邊緣棲地", function: "水邊地被", layer: "地被層", risk: "", colors: ["白綠清爽"], tags: ["水岸花境", "日式清雅風", "療癒庭園"] }
];

const els = {};
const seasons = ["春", "夏", "秋", "冬"];
const defaultValues = {};
const visualOutputs = ["寫實照片", "平面圖", "剖立面圖", "軸側圖", "專業分析海報"];
let currentDesign = null;

document.addEventListener("DOMContentLoaded", () => {
  [
    "siteDescription", "siteSize", "siteType", "designStyle", "sunlight", "soil", "season",
    "colorMood", "heightLayer", "lowMaintenance", "wildlife", "taiwanRule", "bannedPlants",
    "generateBtn", "resetBtn", "exportCsvBtn", "copyAllBtn", "downloadBtn", "printBtn", "projectTitle",
    "plantCount", "maintenanceLevel", "seasonFocus", "riskCount", "strategyOutput",
    "seasonTimeline", "plantTableBody", "plantAnalysis", "photoPrompt", "planPrompt", "sectionPrompt",
    "axonPrompt", "posterPrompt", "checklistOutput", "toast"
  ].forEach((id) => { els[id] = document.getElementById(id); });

  document.querySelectorAll("input, select").forEach((input) => {
    if (input.type === "checkbox") defaultValues[input.id || input.value] = input.checked;
    else if (input.id) defaultValues[input.id] = input.value;
  });

  els.generateBtn.addEventListener("click", generate);
  els.resetBtn.addEventListener("click", resetForm);
  els.exportCsvBtn.addEventListener("click", exportPlantCsv);
  els.copyAllBtn.addEventListener("click", copyAll);
  els.downloadBtn.addEventListener("click", downloadMarkdown);
  els.printBtn.addEventListener("click", () => window.print());
  document.querySelectorAll(".tab").forEach((tab) => tab.addEventListener("click", switchTab));
  document.querySelectorAll("input, select").forEach((input) => input.addEventListener("change", generate));
  document.querySelectorAll(".copy-prompt-btn").forEach((button) => button.addEventListener("click", copyPrompt));

  generate();
});

function getBrief() {
  const location = els.siteDescription.value.trim() || "台灣低維護自然式花境";
  return {
    location,
    size: els.siteSize.value.trim() || "12m x 3m",
    siteType: els.siteType.value,
    style: els.designStyle.value,
    sun: els.sunlight.value,
    soil: els.soil.value,
    season: els.season.value,
    color: els.colorMood.value,
    heightLayer: els.heightLayer.value,
    lowMaintenance: els.lowMaintenance.checked,
    wildlife: els.wildlife.checked,
    taiwanRule: els.taiwanRule.checked,
    banned: normalizeList(els.bannedPlants.value),
    outputs: Array.from(document.querySelectorAll("input[name='outputs']:checked")).map((node) => node.value)
  };
}

function normalizeList(value) {
  return value
    .split(/[,，、\s]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function generate() {
  const brief = getBrief();
  const selected = selectPlants(brief);
  const design = buildDesign(brief, selected);
  currentDesign = design;
  renderDesign(design);
}

function selectPlants(brief) {
  const banned = new Set(brief.banned);
  const filtered = plants.filter((plant) => {
    if (banned.has(plant.name)) return false;
    if (brief.lowMaintenance && plant.maintenance === "高") return false;
    if (brief.sun === "濕地／水邊") return plant.sun.includes("濕地／水邊") || plant.water === "濕生";
    if (brief.sun === "西曬強烈") return plant.sun.includes("西曬強烈") || plant.sun.includes("全日照");
    return plant.sun.includes(brief.sun) || plant.sun.includes("全日照") && brief.sun === "半日照";
  });

  const scorePlant = (plant) => {
    let score = 0;
    if (plant.tags.includes(brief.siteType)) score += 3;
    if (plant.tags.includes(brief.style)) score += 3;
    if (plant.colors.includes(brief.color)) score += 3;
    if (brief.season === "四季" || plant.season.includes(brief.season)) score += 2;
    if (brief.lowMaintenance && plant.maintenance === "低") score += 2;
    if (brief.wildlife && /蜜源|誘蝶|鳥類/.test(plant.eco)) score += 2;
    if (brief.taiwanRule && /原生/.test(plant.native)) score += 1;
    if (plant.water === "耐旱" && (brief.soil === "砂質土" || brief.sun === "西曬強烈")) score += 1;
    if (plant.water === "濕生" && (brief.soil === "潮濕低窪" || brief.sun === "濕地／水邊")) score += 2;
    if (plant.risk) score -= 1;
    return score;
  };

  const pick = (predicate, count) => filtered
    .filter(predicate)
    .map((plant) => ({ plant, score: scorePlant(plant) }))
    .sort((a, b) => b.score - a.score || a.plant.name.localeCompare(b.plant.name, "zh-Hant"))
    .slice(0, count)
    .map((item) => item.plant);

  const trees = pick((p) => ["喬木", "小喬木"].includes(p.type), brief.heightLayer === "低矮通透" ? 1 : 2);
  const shrubs = pick((p) => p.type === "灌木", 4);
  const flowers = pick((p) => p.type.includes("草花") || p.type === "草花／地被", 4);
  const grounds = pick((p) => p.type === "地被" || p.type.includes("地被"), 3);
  const wet = brief.sun === "濕地／水邊" || brief.soil === "潮濕低窪" ? pick((p) => p.type.includes("水生"), 2) : [];

  const unique = [];
  [...trees, ...shrubs, ...flowers, ...grounds, ...wet].forEach((plant) => {
    if (!unique.some((item) => item.name === plant.name)) unique.push(plant);
  });

  const counters = {};
  return unique.slice(0, 14).map((plant) => {
    const prefix = getPlantPrefix(plant);
    counters[prefix] = (counters[prefix] || 0) + 1;
    return { ...plant, id: `${prefix}-${String(counters[prefix]).padStart(2, "0")}` };
  });
}

function getPlantPrefix(plant) {
  if (plant.type.includes("喬木")) return "T";
  if (plant.type.includes("灌木")) return "S";
  if (plant.type.includes("草花")) return "F";
  if (plant.type.includes("地被")) return "G";
  if (plant.type.includes("水生")) return "W";
  return "P";
}

function buildDesign(brief, selected) {
  const risks = selected.filter((plant) => plant.risk);
  const layers = {
    background: selected.filter((p) => p.layer === "背景"),
    middle: selected.filter((p) => ["中景", "前中景", "中前景"].includes(p.layer)),
    foreground: selected.filter((p) => ["前景", "地被層", "草花層"].includes(p.layer))
  };

  const title = brief.location;
  const strategy = [
    `以「${brief.heightLayer}」建立花境層次，背景使用 ${names(layers.background)} 作為骨架與遮蔭。`,
    `中景以 ${names(layers.middle)} 建立量體與色彩過渡，避免花境只在單一季節有表情。`,
    `前景與地被使用 ${names(layers.foreground)} 覆蓋裸土，降低雜草與澆灌壓力。`,
    brief.wildlife ? "優先納入蜜源、誘蝶與鳥類食源植物，讓花境同時具備生態功能。" : "以清楚視覺層次與維護便利作為主要配置依據。",
    brief.taiwanRule ? "喬木與原生植物可對應台灣綠化、綠覆率與公共空間植栽審查需求。" : "本案不強制套用綠化規範，但仍保留適地適種與安全檢核。"
  ];

  return {
    brief,
    title,
    plants: selected,
    risks,
    strategy,
    prompts: buildPrompts(brief, selected, strategy)
  };
}

function names(list) {
  if (!list.length) return "低維護常綠植栽";
  return list.slice(0, 4).map((plant) => `${plant.id} ${plant.name}`).join("、");
}

function renderDesign(design) {
  els.projectTitle.textContent = design.title;
  els.plantCount.textContent = design.plants.length;
  els.maintenanceLevel.textContent = design.brief.lowMaintenance ? "低" : "中";
  els.seasonFocus.textContent = design.brief.season;
  els.riskCount.textContent = design.risks.length;
  els.strategyOutput.innerHTML = `<ul>${design.strategy.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  renderTimeline(design);
  renderPlantTable(design);
  renderAnalysis(design);
  renderPrompts(design);
  renderChecklist(design);
  renderOutputVisibility(design);
}

function hasOutput(design, outputName) {
  return design.brief.outputs.includes(outputName);
}

function renderOutputVisibility(design) {
  const showPlants = hasOutput(design, "植栽表");
  const showPrompts = visualOutputs.some((output) => hasOutput(design, output));

  setTabVisibility("plants", showPlants);
  setTabVisibility("prompts", showPrompts);

  document.querySelectorAll(".prompt-card").forEach((block) => {
    block.hidden = !hasOutput(design, block.dataset.output);
  });

  const activeTab = document.querySelector(".tab.active");
  if (activeTab && activeTab.hidden) {
    activateTab("overview");
  }
}

function setTabVisibility(tabName, visible) {
  const tab = document.querySelector(`.tab[data-tab="${tabName}"]`);
  const panel = document.getElementById(tabName);
  if (tab) tab.hidden = !visible;
  if (panel) panel.hidden = !visible;
}

function activateTab(tabName) {
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === tabName));
  document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.id === tabName));
}

function renderTimeline(design) {
  els.seasonTimeline.innerHTML = seasons.map((season) => {
    const blooming = design.plants.filter((plant) => plant.season.includes(season)).map((plant) => plant.name);
    const text = blooming.length ? blooming.join("、") : "以常綠骨架與葉色維持景觀完整。";
    return `<article class="season-card"><strong>${season}</strong><p>${escapeHtml(text)}</p></article>`;
  }).join("");
}

function renderPlantTable(design) {
  els.plantTableBody.innerHTML = design.plants.map((plant) => `
    <tr>
      <td>${plant.id}</td>
      <td>${plant.name}</td>
      <td><em>${plant.scientific}</em></td>
      <td>${plant.type}<br>${plant.native}</td>
      <td>${plant.height}<br>株距 ${plant.spacing}</td>
      <td>${plant.flower}<br>${plant.season.join("、")}</td>
      <td>${plant.function}<br>${plant.eco}</td>
      <td>${plant.risk || "無特殊高風險，依一般養護管理。"}</td>
    </tr>
  `).join("");
}

function renderAnalysis(design) {
  els.plantAnalysis.innerHTML = design.plants.map((plant) => `
    <article class="analysis-item">
      <strong>${plant.id} ${plant.name}</strong>
      <p>類型：${plant.type}。配置位置：${plant.layer}。景觀功能：${plant.function}。觀賞重點：${plant.flower}花與${plant.foliage}。生態功能：${plant.eco}。維護建議：${plant.maintenance}維護，水分需求為${plant.water}。設計注意事項：${plant.risk || "注意合理株距與定期整枝即可。"}。</p>
    </article>
  `).join("");
}

function renderPrompts(design) {
  els.photoPrompt.value = design.prompts.photo;
  els.planPrompt.value = design.prompts.plan;
  els.sectionPrompt.value = design.prompts.section;
  els.axonPrompt.value = design.prompts.axon;
  els.posterPrompt.value = design.prompts.posterPrompt;
}

function renderChecklist(design) {
  const checks = [
    ["適地適種", `日照條件為 ${design.brief.sun}，土壤為 ${design.brief.soil}，已依植物日照與水分需求篩選。`, true],
    ["高度合理", `配置採 ${design.brief.heightLayer}，並以植物高度層次檢核前中後景。`, true],
    ["季節連續", `主季節為 ${design.brief.season}，四季表已標示花期與常綠支撐。`, true],
    ["維護可行", design.brief.lowMaintenance ? "已優先選用低維護植物。" : "未限制低維護，可視預算調整更新草花比例。", true],
    ["安全性", design.risks.length ? `需注意：${design.risks.map((p) => `${p.name} ${p.risk}`).join("；")}` : "未納入明顯高風險植物。", design.risks.length === 0],
    ["生態性", design.brief.wildlife ? "已納入蜜源、誘蝶或鳥類食源植物。" : "未啟用生態優先，可再加入誘蝶蜜源植物。", design.brief.wildlife],
    ["圖面一致", "植栽表、平面、剖面、軸側分析與提示詞共用同一組植物編號。", true],
    ["專業性", "已包含北箭、比例尺、圖例概念、植物編號、植物分析與海報架構。", true]
  ];

  els.checklistOutput.innerHTML = checks.map(([title, body, ok]) => `
    <article class="check-item ${ok ? "" : "warning"}">
      <strong><span class="status">${ok ? "✓" : "!"}</span>${title}</strong>
      <p>${escapeHtml(body)}</p>
    </article>
  `).join("");
}

function buildPrompts(brief, selected, strategy) {
  const plantList = selected.map((p) => `${p.id} ${p.name}（${p.type}，${p.height}，${p.flower}，${p.season.join("、")}）`).join("；");
  const base = `設計主題：${brief.style} ${brief.siteType}
基地位置描述：${brief.location}
花境尺度：${brief.size}
日照與水分：${brief.sun}，${brief.soil}
植栽組合：${plantList}
色彩氛圍：${brief.color}
主要觀賞季節：${brief.season}
配置策略：${strategy.join("")}`;

  return {
    photo: `根據以下植栽表，生成一張高品質寫實景觀花境照片。

${base}

畫面要求：
真實景觀攝影質感，專業景觀設計完工照，植物品種清楚可辨識，前中後景層次分明，低矮地被在前景，中層灌木與草花形成色彩帶，背景以喬木或高灌木作為骨架。自然光線，細緻葉片、花序與枝條質感，真實土壤與覆蓋物，合理株距，符合台灣氣候條件，不出現不合理巨大花朵，不出現塑膠感，不出現錯誤文字。`,
    plan: `請根據以下植栽表生成一張專業景觀植栽配置平面圖。

${base}

圖面風格：
景觀建築競圖風格，乾淨清楚，俯視正投影，無透視。

內容要求：
標示基地邊界、北箭、比例尺、主要步道、植栽群落、喬木冠幅、灌木色塊、草花帶、地被區域與植栽編號。植物配置需符合${brief.heightLayer}、疏密有致、季節變化與維護動線。圖面可使用柔和自然色系，不要過度裝飾，不要出現錯字。`,
    section: `請根據植栽表與平面配置，生成一張景觀植栽剖立面圖。

${base}

圖面要求：
橫向剖面，清楚表現前景地被、中景草花與灌木、背景小喬木與喬木。每一層植物高度需合理，植物冠形、葉形與花色需可辨識。下方標示植物編號與高度尺度，呈現花境由低至高、由開放至圍合的空間層次。風格為專業景觀設計剖面圖，乾淨、精緻、具植物學準確性。`,
    axon: `根據植栽表、平面配置與剖立面圖，生成一張專業景觀植栽軸側視圖。

${base}

圖面風格：
45 度軸側視角，景觀建築競圖表現，乾淨背景，植物群落清楚分層。

內容要求：
顯示基地邊界、步道、花境帶、喬木、小喬木、灌木、草花、地被。植物需依高度由前至後配置，喬木作為背景骨架，中層灌木形成空間量體，草花形成季節色帶，地被銜接邊界。每種植物以編號標示，並搭配簡潔圖例。整體應具有真實植物質感與專業分析圖清晰度。`,
    posterPrompt: `請根據本案植栽表、寫實照片、植栽平面圖、剖立面圖與軸側圖，生成一張專業景觀設計分析海報。

${base}

海報風格：
國際景觀競圖風格，Sasaki / Field Operations / OMA diagram style，乾淨、理性、具設計感，16:9 橫式構圖。

海報內容：
1. 設計概念標題
2. 基地條件分析
3. 日照與水分條件
4. 植栽配置平面圖
5. 植栽剖立面圖
6. 45 度軸側植栽設計圖
7. 四季花期分析
8. 植物高度層次分析
9. 生態效益分析
10. 維護管理策略
11. 植栽表摘要

視覺要求：
版面清楚分區，主圖置中，分析圖環繞，使用柔和自然色系，文字層級分明，圖例清楚，避免過度裝飾，呈現專業景觀建築設計提案質感。`
  };
}

function switchTab(event) {
  const tabName = event.currentTarget.dataset.tab;
  if (event.currentTarget.hidden) return;
  activateTab(tabName);
}

function resetForm() {
  document.querySelectorAll("input, select").forEach((input) => {
    if (input.type === "checkbox") input.checked = defaultValues[input.id || input.value] ?? input.checked;
    else if (input.id && defaultValues[input.id] !== undefined) input.value = defaultValues[input.id];
  });
  generate();
  showToast("已重設為預設台灣低維護花境條件。");
}

function copyAll() {
  const markdown = buildMarkdown(currentDesign);
  copyText(markdown, "已複製完整方案。");
}

function copyPrompt(event) {
  const targetId = event.currentTarget.dataset.copyTarget;
  const textarea = document.getElementById(targetId);
  if (!textarea) return;
  copyText(textarea.value, "已複製提示詞。");
}

function copyText(value, message) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(value).then(
      () => showToast(message),
      () => fallbackCopy(value, message)
    );
    return;
  }
  fallbackCopy(value, message);
}

function fallbackCopy(value, message = "已複製。") {
  const area = document.createElement("textarea");
  area.value = value;
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  area.remove();
  showToast(message);
}

function downloadMarkdown() {
  const blob = new Blob([buildMarkdown(currentDesign)], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${currentDesign.title.replace(/[\\/:*?"<>|]/g, "_")}_花境方案.md`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("已產生 Markdown 下載檔。");
}

function exportPlantCsv() {
  if (!currentDesign) return;
  const headers = ["編號", "中文名", "學名", "類型", "原生／外來", "高度", "冠幅／株距", "花色", "花期", "葉色／質感", "日照需求", "水分需求", "維護難度", "生態功能", "景觀功能", "設計位置", "注意事項"];
  const rows = currentDesign.plants.map((plant) => [
    plant.id,
    plant.name,
    plant.scientific,
    plant.type,
    plant.native,
    plant.height,
    plant.spacing,
    plant.flower,
    plant.season.join("、"),
    plant.foliage,
    plant.sun.join("、"),
    plant.water,
    plant.maintenance,
    plant.eco,
    plant.function,
    plant.layer,
    plant.risk || "無特殊高風險"
  ]);
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
  const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${currentDesign.title.replace(/[\\/:*?"<>|]/g, "_")}_植栽表.csv`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("已匯出植栽表 CSV。");
}

function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function buildMarkdown(design) {
  if (!design) return "";
  const rows = design.plants.map((p) => `| ${p.id} | ${p.name} | ${p.scientific} | ${p.type} | ${p.height} | ${p.flower}／${p.season.join("、")} | ${p.function} | ${p.risk || "無特殊高風險"} |`).join("\n");
  const sections = [`# ${design.title}

## 基地條件

- 基地位置描述：${design.brief.location}
- 基地尺寸：${design.brief.size}
- 設計風格：${design.brief.style}
- 日照條件：${design.brief.sun}
- 土壤與排水：${design.brief.soil}
- 色彩方向：${design.brief.color}
- 高度層次：${design.brief.heightLayer}

## 設計策略

${design.strategy.map((item) => `- ${item}`).join("\n")}`];

  if (hasOutput(design, "植栽表")) {
    sections.push(`## 植栽表

| 編號 | 中文名 | 學名 | 類型 | 高度 | 花色／花期 | 功能 | 注意事項 |
| --- | --- | --- | --- | --- | --- | --- | --- |
${rows}`);
  }

  if (hasOutput(design, "寫實照片")) {
    sections.push(`## 寫實照片提示詞

${design.prompts.photo}`);
  }

  if (hasOutput(design, "平面圖")) {
    sections.push(`## 平面圖提示詞

${design.prompts.plan}`);
  }

  if (hasOutput(design, "剖立面圖")) {
    sections.push(`## 剖立面圖提示詞

${design.prompts.section}`);
  }

  if (hasOutput(design, "軸側圖")) {
    sections.push(`## 軸側圖提示詞

${design.prompts.axon}`);
  }

  if (hasOutput(design, "專業分析海報")) {
    sections.push(`## 海報提示詞

${design.prompts.posterPrompt}`);
  }

  return sections.join("\n\n");
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.setTimeout(() => els.toast.classList.remove("show"), 2200);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}
