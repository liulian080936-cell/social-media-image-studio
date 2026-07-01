const DEFAULT_PRESETS = [
  {
    id: "xhs-portrait",
    platform: "小红书",
    name: "笔记竖版",
    width: 1080,
    height: 1440,
    ratio: "3:4",
    note: "通用竖版",
    checked: true,
  },
  {
    id: "xhs-square",
    platform: "小红书",
    name: "笔记方图",
    width: 1080,
    height: 1080,
    ratio: "1:1",
    note: "标准方图",
    checked: false,
  },
  {
    id: "xhs-landscape",
    platform: "小红书",
    name: "笔记横版",
    width: 1200,
    height: 900,
    ratio: "4:3",
    note: "标准横版",
    checked: false,
  },
  {
    id: "xhs-immersive",
    platform: "小红书",
    name: "沉浸竖屏",
    width: 1080,
    height: 1920,
    ratio: "9:16",
    note: "沉浸竖屏",
    checked: false,
  },
  {
    id: "douyin-card",
    platform: "抖音",
    name: "图文竖版",
    width: 1080,
    height: 1440,
    ratio: "3:4",
    note: "图文常用",
    checked: true,
  },
  {
    id: "douyin-full",
    platform: "抖音",
    name: "全屏竖版",
    width: 1080,
    height: 1920,
    ratio: "9:16",
    note: "全屏竖版",
    checked: false,
  },
  {
    id: "douyin-square",
    platform: "抖音",
    name: "方图备用",
    width: 1080,
    height: 1080,
    ratio: "1:1",
    note: "跨平台方图",
    checked: false,
  },
  {
    id: "douyin-landscape",
    platform: "抖音",
    name: "横版素材",
    width: 1920,
    height: 1080,
    ratio: "16:9",
    note: "横版素材",
    checked: false,
  },
  {
    id: "ig-feed-safe",
    platform: "Instagram / Ins",
    name: "Feed 兼容档",
    width: 1080,
    height: 1350,
    ratio: "4:5",
    note: "Feed 常用",
    checked: true,
  },
  {
    id: "ig-feed-34",
    platform: "Instagram / Ins",
    name: "Feed 直出档",
    width: 1080,
    height: 1440,
    ratio: "3:4",
    note: "3:4 直出",
    checked: false,
  },
  {
    id: "ig-square",
    platform: "Instagram / Ins",
    name: "Feed 方图",
    width: 1080,
    height: 1080,
    ratio: "1:1",
    note: "标准方图",
    checked: false,
  },
  {
    id: "ig-landscape",
    platform: "Instagram / Ins",
    name: "Feed 横图",
    width: 1080,
    height: 566,
    ratio: "1.91:1",
    note: "Feed 横图",
    checked: false,
  },
  {
    id: "ig-story",
    platform: "Instagram / Ins",
    name: "Story / Reel",
    width: 1080,
    height: 1920,
    ratio: "9:16",
    note: "Story / Reel",
    checked: false,
  },
];

const STORAGE_KEY = "social-media-image-studio.custom-presets.v1";
const PREVIEW_FRAME_CHROME = 72;
const PREVIEW_FALLBACK_WIDTH = 820;
const PREVIEW_FALLBACK_HEIGHT = 760;
const DEFAULT_BACKGROUND_COLOR = "#f5f1ea";
const IMPORTABLE_IMAGE_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "png",
  "webp",
  "gif",
  "bmp",
  "svg",
  "avif",
  "heic",
  "heif",
  "tif",
  "tiff",
]);

const fileInput = document.querySelector("#fileInput");
const dropzone = document.querySelector("#dropzone");
const pickImagesButton = document.querySelector("#pickImagesButton");
const previewPanel = document.querySelector(".preview-panel");
const previewFrame = document.querySelector("#previewFrame");
const previewCanvas = document.querySelector("#previewCanvas");
const previewEmpty = document.querySelector("#previewEmpty");
const sourceQueue = document.querySelector("#sourceQueue");
const effectGallery = document.querySelector("#effectGallery");
const effectPresetText = document.querySelector("#effectPresetText");
const effectCountText = document.querySelector("#effectCountText");
const presetGrid = document.querySelector("#presetGrid");
const presetPicker = document.querySelector("#presetPicker");
const recenterButton = document.querySelector("#recenterButton");
const downloadCurrentButton = document.querySelector("#downloadCurrentButton");
const downloadSelectedButton = document.querySelector("#downloadSelectedButton");
const downloadZipButton = document.querySelector("#downloadZipButton");
const clearQueueButton = document.querySelector("#clearQueueButton");
const selectAllAssetsButton = document.querySelector("#selectAllAssetsButton");
const clearSelectedAssetsButton = document.querySelector("#clearSelectedAssetsButton");
const zoomRange = document.querySelector("#zoomRange");
const zoomValue = document.querySelector("#zoomValue");
const applyZoomToSelectedButton = document.querySelector("#applyZoomToSelectedButton");
const bulkZoomHint = document.querySelector("#bulkZoomHint");
const vintageNoiseRange = document.querySelector("#vintageNoiseRange");
const vintageNoiseValue = document.querySelector("#vintageNoiseValue");
const gridModeSelect = document.querySelector("#gridModeSelect");
const gridColorGroup = document.querySelector("#gridColorGroup");
const gridColorInput = document.querySelector("#gridColorInput");
const gridOpacityGroup = document.querySelector("#gridOpacityGroup");
const gridOpacityRange = document.querySelector("#gridOpacityRange");
const gridOpacityValue = document.querySelector("#gridOpacityValue");
const gridInsetGroup = document.querySelector("#gridInsetGroup");
const gridInsetRange = document.querySelector("#gridInsetRange");
const gridInsetValue = document.querySelector("#gridInsetValue");
const backgroundColorInput = document.querySelector("#backgroundColor");
const presetSelect = document.querySelector("#presetSelect");
const presetSelectMeta = document.querySelector("#presetSelectMeta");
const formatSelect = document.querySelector("#formatSelect");
const qualityRange = document.querySelector("#qualityRange");
const qualityValue = document.querySelector("#qualityValue");
const qualityGroup = document.querySelector("#qualityGroup");
const statusLine = document.querySelector("#statusLine");
const activePresetName = document.querySelector("#activePresetName");
const activePresetMeta = document.querySelector("#activePresetMeta");
const fileName = document.querySelector("#fileName");
const fileSizeText = document.querySelector("#fileSizeText");
const fileRatioText = document.querySelector("#fileRatioText");
const fileCountText = document.querySelector("#fileCountText");
const selectedCountText = document.querySelector("#selectedCountText");
const customPresetForm = document.querySelector("#customPresetForm");
const customPlatformInput = document.querySelector("#customPlatform");
const customNameInput = document.querySelector("#customName");
const customWidthInput = document.querySelector("#customWidth");
const customHeightInput = document.querySelector("#customHeight");
const customNoteInput = document.querySelector("#customNote");
const customRatioText = document.querySelector("#customRatioText");
const templateStatus = document.querySelector("#templateStatus");

const EFFECT_MAX_WIDTH = 180;
const EFFECT_MAX_HEIGHT = 220;
const noisePatternCache = new Map();

const state = {
  assets: [],
  customPresets: loadCustomPresets(),
  activeAssetId: null,
  activePresetId: DEFAULT_PRESETS[0].id,
  checkedPresetIds: new Set(),
  selectedAssetIds: new Set(),
  fitMode: "fill",
  zoom: 1,
  panXNorm: 0,
  panYNorm: 0,
  backgroundColor: DEFAULT_BACKGROUND_COLOR,
  vintageNoise: 0,
  gridMode: "none",
  gridColor: "#ffffff",
  gridOpacity: 0.24,
  gridInset: 0,
  mimeType: "image/jpeg",
  quality: 0.92,
  drag: null,
};

state.checkedPresetIds = new Set(
  getPresets()
    .filter((preset) => preset.checked)
    .map((preset) => preset.id),
);

const crcTable = buildCrcTable();

function loadCustomPresets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((preset) => normalizeCustomPreset(preset))
      .filter(Boolean);
  } catch {
    return [];
  }
}

function persistCustomPresets() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.customPresets));
  } catch {
    templateStatus.textContent = "模板已加到当前页，但浏览器没有成功保存到本地。";
  }
}

function normalizeCustomPreset(preset) {
  if (!preset || !preset.id || !preset.platform || !preset.name) {
    return null;
  }

  const width = Number(preset.width);
  const height = Number(preset.height);

  if (!Number.isFinite(width) || !Number.isFinite(height) || width < 100 || height < 100) {
    return null;
  }

  return {
    id: String(preset.id),
    platform: String(preset.platform).trim(),
    name: String(preset.name).trim(),
    width: Math.round(width),
    height: Math.round(height),
    ratio: readableRatio(Math.round(width), Math.round(height)),
    note: String(preset.note || "自定义模板").trim() || "自定义模板",
    checked: Boolean(preset.checked),
    isCustom: true,
  };
}

function getPresets() {
  return [
    ...DEFAULT_PRESETS,
    ...state.customPresets.map((preset) => ({
      ...preset,
      isCustom: true,
      ratio: readableRatio(preset.width, preset.height),
    })),
  ];
}

function getPresetById(id) {
  return getPresets().find((preset) => preset.id === id) ?? getPresets()[0];
}

function getActiveAsset() {
  return state.assets.find((asset) => asset.id === state.activeAssetId) ?? null;
}

function getSelectedAssets() {
  return state.assets.filter((asset) => state.selectedAssetIds.has(asset.id));
}

function formatBytes(size) {
  if (!size && size !== 0) {
    return "-";
  }

  const units = ["B", "KB", "MB", "GB"];
  let value = size;
  let index = 0;

  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }

  return `${value.toFixed(value >= 100 || index === 0 ? 0 : 1)} ${units[index]}`;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function readableRatio(width, height) {
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
}

function currentExtension() {
  switch (state.mimeType) {
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    default:
      return "jpg";
  }
}

function getFileExtension(fileNameValue) {
  const match = String(fileNameValue || "").toLowerCase().match(/\.([^.]+)$/);
  return match ? match[1] : "";
}

function isImportableImageFile(file) {
  if (!file) {
    return false;
  }

  if (typeof file.type === "string" && file.type.startsWith("image/")) {
    return true;
  }

  return IMPORTABLE_IMAGE_EXTENSIONS.has(getFileExtension(file.name));
}

function createImportError(code, userMessage, detail = {}) {
  const error = new Error(userMessage);
  error.code = code;
  error.userMessage = userMessage;
  Object.assign(error, detail);
  return error;
}

function buildAssetFromImage(file, objectUrl, image, options = {}) {
  return {
    id: `asset-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    file,
    objectUrl,
    image,
    fileName: file.name,
    nameBase: file.name.replace(/\.[^.]+$/, ""),
    size: file.size,
    width: image.width,
    height: image.height,
    ratio: readableRatio(image.width, image.height),
    transform: defaultTransform(),
    backgroundColor: state.backgroundColor,
    wasConverted: Boolean(options.wasConverted),
  };
}

function loadImageElement(objectUrl) {
  const image = new Image();

  return new Promise((resolve, reject) => {
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("image-decode-failed"));
    image.src = objectUrl;
  });
}

async function convertImageWithServer(file) {
  let response;

  try {
    response = await fetch("/api/convert-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
        "X-File-Name": encodeURIComponent(file.name),
        "X-Source-Mime": file.type || "application/octet-stream",
      },
      body: file,
    });
  } catch {
    throw createImportError(
      "conversion-service-unavailable",
      "这类图片需要先做本地转换，但当前页面没有连到转换服务。请用本地启动器打开，或先转成 JPG / PNG 后再试。",
      { fileName: file.name },
    );
  }

  if (!response.ok) {
    let message = "";

    try {
      const payload = await response.json();
      message = payload?.error || payload?.message || "";
    } catch {
      message = await response.text().catch(() => "");
    }

    throw createImportError(
      "conversion-failed",
      message || "这类图片已尝试本地转换，但没有成功。请先转成 JPG / PNG / WebP 后再试。",
      { fileName: file.name },
    );
  }

  const blob = await response.blob();
  const encodedName = response.headers.get("X-Converted-File-Name");
  let convertedName = `${file.name.replace(/\.[^.]+$/, "") || "converted-image"}.png`;

  if (encodedName) {
    try {
      convertedName = decodeURIComponent(encodedName);
    } catch {
      convertedName = encodedName;
    }
  }

  return new File([blob], convertedName, {
    type: blob.type || "image/png",
    lastModified: file.lastModified,
  });
}

function buildImportFailureMessage(errors) {
  const firstError = errors.find((error) => error?.userMessage);

  if (!firstError) {
    return "图片读取失败，请换一组文件再试。";
  }

  if (errors.length === 1) {
    return firstError.userMessage;
  }

  return `${firstError.userMessage} 这次共有 ${errors.length} 张图片没有成功读取。`;
}

function updateQualityVisibility() {
  qualityGroup.hidden = state.mimeType === "image/png";
}

function updateButtonState() {
  const hasAssets = state.assets.length > 0;
  const hasActiveAsset = Boolean(getActiveAsset());
  const hasCheckedPresets = state.checkedPresetIds.size > 0;
  const hasSelectedAssets = state.selectedAssetIds.size > 0;

  downloadCurrentButton.disabled = !hasActiveAsset;
  downloadSelectedButton.disabled = !hasActiveAsset || !hasCheckedPresets;
  downloadZipButton.disabled = !hasAssets || !hasCheckedPresets;
  clearQueueButton.disabled = !hasAssets;
  selectAllAssetsButton.disabled = !hasAssets || state.selectedAssetIds.size === state.assets.length;
  clearSelectedAssetsButton.disabled = !hasSelectedAssets;
  applyZoomToSelectedButton.disabled = !hasActiveAsset || !hasSelectedAssets;
}

function syncSelectionMeta() {
  selectedCountText.textContent = `${state.selectedAssetIds.size} 张`;

  if (state.selectedAssetIds.size === 0) {
    bulkZoomHint.textContent = "先在左侧勾选需要同步缩放的图片";
    return;
  }

  bulkZoomHint.textContent = `已选 ${state.selectedAssetIds.size} 张图片，可同步当前缩放 ${Math.round(state.zoom * 100)}%`;
}

function setStatus(message) {
  statusLine.textContent = message;
}

function gridModeLabel(mode) {
  switch (mode) {
    case "thirds":
      return "九宫格";
    case "editorial":
      return "12 列网格";
    default:
      return "";
  }
}

function effectSummaryParts() {
  const parts = [];

  if (state.vintageNoise > 0.001) {
    parts.push(`颗粒 ${Math.round(state.vintageNoise * 100)}%`);
  }

  if (state.gridMode !== "none") {
    parts.push(`${gridModeLabel(state.gridMode)} ${Math.round(state.gridOpacity * 100)}%`);
    if (state.gridInset > 0.001) {
      parts.push(`边距 ${Math.round(state.gridInset * 100)}%`);
    }
  }

  return parts;
}

function syncEffectControls() {
  vintageNoiseRange.value = String(state.vintageNoise);
  vintageNoiseValue.textContent = `${Math.round(state.vintageNoise * 100)}%`;
  gridModeSelect.value = state.gridMode;
  gridColorInput.value = state.gridColor;
  gridOpacityRange.value = String(state.gridOpacity);
  gridOpacityValue.textContent = `${Math.round(state.gridOpacity * 100)}%`;
  gridInsetRange.value = String(state.gridInset);
  gridInsetValue.textContent = `${Math.round(state.gridInset * 100)}%`;
  gridColorGroup.hidden = state.gridMode === "none";
  gridOpacityGroup.hidden = state.gridMode === "none";
  gridInsetGroup.hidden = state.gridMode === "none";
}

function refreshEffectRendering(statusMessage = "") {
  syncEffectControls();
  drawPreview();
  buildEffectGallery();

  if (statusMessage) {
    setStatus(statusMessage);
  }
}

function syncActivePresetMeta() {
  const preset = getPresetById(state.activePresetId);
  activePresetName.textContent = `${preset.platform} · ${preset.name}`;
  activePresetMeta.textContent = `${preset.width} × ${preset.height} · ${preset.ratio}`;
  effectPresetText.textContent = `${preset.platform} · ${preset.name}`;
  presetSelect.value = preset.id;
  presetSelectMeta.textContent = `${preset.width} × ${preset.height} · ${preset.note}`;
}

function buildPresetSelect() {
  const presets = getPresets();
  const groupedPresets = new Map();

  presetSelect.innerHTML = "";

  presets.forEach((preset) => {
    if (!groupedPresets.has(preset.platform)) {
      groupedPresets.set(preset.platform, []);
    }

    groupedPresets.get(preset.platform).push(preset);
  });

  groupedPresets.forEach((platformPresets, platform) => {
    const group = document.createElement("optgroup");
    group.label = platform;

    platformPresets.forEach((preset) => {
      const option = document.createElement("option");
      option.value = preset.id;
      option.textContent = `${preset.name} · ${preset.width} × ${preset.height} · ${preset.ratio}${preset.isCustom ? " · 自定义" : ""}`;
      group.appendChild(option);
    });

    presetSelect.appendChild(group);
  });

  presetSelect.value = getPresetById(state.activePresetId).id;
}

function buildPresetPicker() {
  if (!presetPicker) {
    return;
  }

  presetPicker.innerHTML = "";

  getPresets().forEach((preset) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "preset-chip";
    if (preset.id === state.activePresetId) {
      button.classList.add("is-active");
    }
    button.dataset.presetId = preset.id;
    button.title = `${preset.platform} · ${preset.name} · ${preset.width} × ${preset.height} · ${preset.note}`;

    const platform = document.createElement("span");
    platform.className = "preset-chip-platform";
    platform.textContent = preset.platform;

    const name = document.createElement("strong");
    name.textContent = preset.name;

    const meta = document.createElement("span");
    meta.className = "preset-chip-meta";
    meta.textContent = `${preset.width} × ${preset.height} · ${preset.ratio}`;

    button.append(platform, name, meta);
    button.addEventListener("click", () => {
      setActivePreset(preset.id, `已切换到 ${preset.platform} · ${preset.name}`);
    });

    presetPicker.appendChild(button);
  });
}

function setActivePreset(presetId, statusMessage = "") {
  const preset = getPresetById(presetId);
  state.activePresetId = preset.id;
  buildPresetSelect();
  buildPresetPicker();
  syncActivePresetMeta();
  buildPresetGrid();
  drawPreview();
  buildEffectGallery();

  if (statusMessage) {
    setStatus(statusMessage);
  }
}

function defaultTransform() {
  return {
    zoom: 1,
    panXNorm: 0,
    panYNorm: 0,
  };
}

function getAssetBackgroundColor(asset) {
  return asset?.backgroundColor || state.backgroundColor || DEFAULT_BACKGROUND_COLOR;
}

function syncBackgroundColorControl() {
  const backgroundColor = getAssetBackgroundColor(getActiveAsset());
  state.backgroundColor = backgroundColor;
  backgroundColorInput.value = backgroundColor;
}

function revealPreviewPanelIfNeeded() {
  if (!previewPanel) {
    return;
  }

  const rect = previewPanel.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  if (rect.top >= 0 && rect.bottom <= viewportHeight) {
    return;
  }

  previewPanel.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function syncViewportFromActiveAsset() {
  const asset = getActiveAsset();
  const transform = asset?.transform ?? defaultTransform();

  state.zoom = transform.zoom;
  state.panXNorm = transform.panXNorm;
  state.panYNorm = transform.panYNorm;
  zoomRange.value = String(state.zoom);
  zoomValue.textContent = `${Math.round(state.zoom * 100)}%`;
}

function persistViewportToActiveAsset() {
  const asset = getActiveAsset();
  if (!asset) {
    return;
  }

  asset.transform.zoom = state.zoom;
  asset.transform.panXNorm = state.panXNorm;
  asset.transform.panYNorm = state.panYNorm;
}

function resetViewportForActiveAsset() {
  const asset = getActiveAsset();
  if (!asset) {
    state.zoom = 1;
    state.panXNorm = 0;
    state.panYNorm = 0;
  } else {
    asset.transform = defaultTransform();
    syncViewportFromActiveAsset();
  }

  zoomRange.value = String(state.zoom);
  zoomValue.textContent = `${Math.round(state.zoom * 100)}%`;
}

function buildPresetGrid() {
  presetGrid.innerHTML = "";

  getPresets().forEach((preset) => {
    const card = document.createElement("article");
    card.className = "preset-card";
    if (preset.id === state.activePresetId) {
      card.classList.add("is-active");
    }
    card.dataset.presetId = preset.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "preset-checkbox";
    checkbox.checked = state.checkedPresetIds.has(preset.id);
    checkbox.addEventListener("click", (event) => {
      event.stopPropagation();
      if (checkbox.checked) {
        state.checkedPresetIds.add(preset.id);
      } else {
        state.checkedPresetIds.delete(preset.id);
      }

      if (preset.isCustom) {
        updateCustomPresetCheckedState(preset.id, checkbox.checked);
      }

      updateButtonState();
    });

    const platformRow = document.createElement("div");
    platformRow.className = "preset-platform-row";

    const platform = document.createElement("span");
    platform.className = "preset-platform";
    platform.textContent = preset.platform;
    platformRow.appendChild(platform);

    if (preset.isCustom) {
      const tag = document.createElement("span");
      tag.className = "preset-custom-tag";
      tag.textContent = "自定义";
      platformRow.appendChild(tag);
    }

    const name = document.createElement("h3");
    name.textContent = preset.name;

    const dimensions = document.createElement("div");
    dimensions.className = "preset-dimensions";
    dimensions.textContent = `${preset.width} × ${preset.height} · ${preset.ratio}`;

    const note = document.createElement("div");
    note.className = "preset-note";
    note.textContent = preset.note;

    card.append(checkbox, platformRow, name, dimensions, note);

    if (preset.isCustom) {
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "preset-delete";
      deleteButton.textContent = "删除模板";
      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        removeCustomPreset(preset.id);
      });
      card.appendChild(deleteButton);
    }

    card.addEventListener("click", () => {
      setActivePreset(preset.id, `已切换到 ${preset.platform} · ${preset.name}`);
    });

    presetGrid.appendChild(card);
  });
}

function buildSourceQueue() {
  sourceQueue.innerHTML = "";

  if (state.assets.length === 0) {
    const empty = document.createElement("div");
    empty.className = "queue-empty";
    empty.textContent = "还没有图片，先导入一张试试。";
    sourceQueue.appendChild(empty);
    return;
  }

  state.assets.forEach((asset) => {
    const item = document.createElement("article");
    item.className = "queue-item";
    if (asset.id === state.activeAssetId) {
      item.classList.add("is-active");
    }
    if (state.selectedAssetIds.has(asset.id)) {
      item.classList.add("is-selected");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "queue-select";
    checkbox.checked = state.selectedAssetIds.has(asset.id);
    checkbox.setAttribute("aria-label", `选中 ${asset.fileName}`);
    checkbox.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleAssetSelection(asset.id, checkbox.checked);
    });

    const thumb = document.createElement("img");
    thumb.className = "queue-thumb";
    thumb.src = asset.objectUrl;
    thumb.alt = asset.fileName;

    const meta = document.createElement("div");
    meta.className = "queue-meta";

    const name = document.createElement("div");
    name.className = "queue-name";
    name.textContent = asset.fileName;

    const detail = document.createElement("div");
    detail.className = "queue-detail";
    detail.textContent = `${asset.width} × ${asset.height} · ${formatBytes(asset.size)}`;

    meta.append(name, detail);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "queue-remove";
    removeButton.textContent = "移除";
    removeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      removeAsset(asset.id);
    });

    item.append(checkbox, thumb, meta, removeButton);
    item.addEventListener("click", () => {
      setActiveAsset(asset.id);
    });
    sourceQueue.appendChild(item);
  });
}

function syncSourceMeta() {
  const asset = getActiveAsset();
  fileCountText.textContent = `${state.assets.length} 张`;

  if (!asset) {
    fileName.textContent = "未选择";
    fileSizeText.textContent = "-";
    fileRatioText.textContent = "-";
    return;
  }

  fileName.textContent = asset.fileName;
  fileSizeText.textContent = `${asset.width} × ${asset.height} · ${formatBytes(asset.size)}`;
  fileRatioText.textContent = asset.ratio;
}

function toggleAssetSelection(assetId, checked) {
  if (checked) {
    state.selectedAssetIds.add(assetId);
  } else {
    state.selectedAssetIds.delete(assetId);
  }

  buildSourceQueue();
  buildEffectGallery();
  syncSelectionMeta();
  updateButtonState();
}

function setActiveAsset(assetId) {
  if (!state.assets.some((asset) => asset.id === assetId)) {
    return;
  }

  state.activeAssetId = assetId;
  syncViewportFromActiveAsset();
  syncBackgroundColorControl();
  syncSourceMeta();
  buildSourceQueue();
  buildEffectGallery();
  syncSelectionMeta();
  updateButtonState();
  drawPreview();
}

function reconcilePresetState() {
  const presets = getPresets();
  const presetIds = new Set(presets.map((preset) => preset.id));

  state.checkedPresetIds = new Set(
    [...state.checkedPresetIds].filter((presetId) => presetIds.has(presetId)),
  );

  if (!presetIds.has(state.activePresetId)) {
    state.activePresetId = presets[0]?.id ?? null;
  }

  if (state.checkedPresetIds.size === 0 && presets[0]) {
    state.checkedPresetIds.add(presets[0].id);
  }

  buildPresetSelect();
  buildPresetPicker();
  syncActivePresetMeta();
  buildPresetGrid();
  updateButtonState();
  buildEffectGallery();
  drawPreview();
}

function updateCustomPresetCheckedState(presetId, checked) {
  const preset = state.customPresets.find((item) => item.id === presetId);
  if (!preset) {
    return;
  }

  preset.checked = checked;
  persistCustomPresets();
}

function removeCustomPreset(presetId) {
  state.customPresets = state.customPresets.filter((preset) => preset.id !== presetId);
  state.checkedPresetIds.delete(presetId);
  persistCustomPresets();
  reconcilePresetState();
  templateStatus.textContent = "已删除自定义模板。";
}

function computePreviewSize(preset) {
  const availableWidth = Math.max(
    280,
    (previewFrame?.clientWidth ?? PREVIEW_FALLBACK_WIDTH) - PREVIEW_FRAME_CHROME,
  );
  const availableHeight = Math.max(
    360,
    (previewFrame?.clientHeight ?? PREVIEW_FALLBACK_HEIGHT) - PREVIEW_FRAME_CHROME,
  );
  const scale = Math.min(availableWidth / preset.width, availableHeight / preset.height, 1);
  return {
    width: Math.round(preset.width * scale),
    height: Math.round(preset.height * scale),
  };
}

function computeEffectSize(preset) {
  const scale = Math.min(EFFECT_MAX_WIDTH / preset.width, EFFECT_MAX_HEIGHT / preset.height, 1);
  return {
    width: Math.max(88, Math.round(preset.width * scale)),
    height: Math.max(88, Math.round(preset.height * scale)),
  };
}

function computeMetrics(image, targetWidth, targetHeight, transform, fitMode) {
  const baseScaleFill = Math.max(targetWidth / image.width, targetHeight / image.height);
  const baseScaleFit = Math.min(targetWidth / image.width, targetHeight / image.height);
  const baseScale = fitMode === "fill" ? baseScaleFill : baseScaleFit;
  const scale = baseScale * transform.zoom;
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const maxPanX = Math.max(0, (drawWidth - targetWidth) / 2);
  const maxPanY = Math.max(0, (drawHeight - targetHeight) / 2);
  const offsetX = maxPanX === 0 ? 0 : transform.panXNorm * maxPanX;
  const offsetY = maxPanY === 0 ? 0 : transform.panYNorm * maxPanY;

  return {
    drawWidth,
    drawHeight,
    maxPanX,
    maxPanY,
    x: (targetWidth - drawWidth) / 2 + offsetX,
    y: (targetHeight - drawHeight) / 2 + offsetY,
  };
}

function hashString(value) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function seededRandomGenerator(seed) {
  let value = seed >>> 0;

  return () => {
    value += 0x6d2b79f5;
    let mixed = value;
    mixed = Math.imul(mixed ^ (mixed >>> 15), mixed | 1);
    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
}

function getNoisePatternTile(width, height, seed, intensity) {
  const tileSize = Math.max(96, Math.min(168, Math.round(Math.min(width, height) / 4)));
  const normalizedIntensity = Math.round(intensity * 100);
  const cacheKey = `${tileSize}:${seed}:${normalizedIntensity}`;

  if (noisePatternCache.has(cacheKey)) {
    return noisePatternCache.get(cacheKey);
  }

  const tile = document.createElement("canvas");
  tile.width = tileSize;
  tile.height = tileSize;

  const tileContext = tile.getContext("2d");
  const imageData = tileContext.createImageData(tileSize, tileSize);
  const { data } = imageData;
  const random = seededRandomGenerator(seed ^ tileSize ^ normalizedIntensity);

  for (let index = 0; index < data.length; index += 4) {
    const grain = Math.floor(106 + random() * 140);
    const alpha = Math.floor((18 + random() * 108) * intensity);

    data[index] = grain;
    data[index + 1] = grain;
    data[index + 2] = grain;
    data[index + 3] = alpha;
  }

  tileContext.putImageData(imageData, 0, 0);
  noisePatternCache.set(cacheKey, tile);
  return tile;
}

function hexToRgb(hex) {
  const normalized = String(hex || "").trim();
  const match = normalized.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);

  if (!match) {
    return { r: 255, g: 255, b: 255 };
  }

  return {
    r: Number.parseInt(match[1], 16),
    g: Number.parseInt(match[2], 16),
    b: Number.parseInt(match[3], 16),
  };
}

function drawGuideLine(context, x1, y1, x2, y2, opacity, color = state.gridColor) {
  const baseWidth = Math.max(1, Math.round(Math.min(context.canvas.width, context.canvas.height) / 640));
  const rgb = hexToRgb(color);

  context.save();
  context.lineCap = "square";
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineWidth = baseWidth + 1;
  context.strokeStyle = `rgba(15, 18, 24, ${opacity * 0.22})`;
  context.stroke();
  context.lineWidth = baseWidth;
  context.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.min(1, opacity * 0.92)})`;
  context.stroke();
  context.restore();
}

function drawGridOverlay(context, width, height) {
  if (state.gridMode === "none") {
    return;
  }

  const opacity = state.gridOpacity;
  const gridRgb = hexToRgb(state.gridColor);
  const insetX = width * state.gridInset;
  const insetY = height * state.gridInset;
  const innerWidth = Math.max(1, width - insetX * 2);
  const innerHeight = Math.max(1, height - insetY * 2);
  const showInsetFrame = state.gridInset > 0.001;

  if (state.gridMode === "thirds") {
    [1 / 3, 2 / 3].forEach((ratio) => {
      const x = insetX + innerWidth * ratio;
      const y = insetY + innerHeight * ratio;
      drawGuideLine(context, x, insetY, x, height - insetY, opacity);
      drawGuideLine(context, insetX, y, width - insetX, y, opacity);
    });

    if (showInsetFrame) {
      drawGuideLine(context, insetX, insetY, width - insetX, insetY, opacity * 0.82);
      drawGuideLine(context, width - insetX, insetY, width - insetX, height - insetY, opacity * 0.82);
      drawGuideLine(context, width - insetX, height - insetY, insetX, height - insetY, opacity * 0.82);
      drawGuideLine(context, insetX, height - insetY, insetX, insetY, opacity * 0.82);
    }

    return;
  }

  const columns = 12;
  const gutter = Math.max(innerWidth * 0.008, 6);
  const columnWidth = Math.max(1, (innerWidth - gutter * (columns - 1)) / columns);

  context.save();
  context.fillStyle = `rgba(${gridRgb.r}, ${gridRgb.g}, ${gridRgb.b}, ${opacity * 0.08})`;

  for (let index = 0; index < columns; index += 1) {
    const columnX = insetX + index * (columnWidth + gutter);
    context.fillRect(columnX, insetY, columnWidth, innerHeight);

    if (index > 0) {
      drawGuideLine(context, columnX - gutter / 2, insetY, columnX - gutter / 2, height - insetY, opacity * 0.55);
    }
  }

  context.restore();

  if (showInsetFrame) {
    drawGuideLine(context, insetX, insetY, width - insetX, insetY, opacity * 0.82);
    drawGuideLine(context, width - insetX, insetY, width - insetX, height - insetY, opacity * 0.82);
    drawGuideLine(context, width - insetX, height - insetY, insetX, height - insetY, opacity * 0.82);
    drawGuideLine(context, insetX, height - insetY, insetX, insetY, opacity * 0.82);
  }

  const baselineCount = 8;
  for (let index = 1; index < baselineCount; index += 1) {
    const y = insetY + (innerHeight / baselineCount) * index;
    drawGuideLine(context, insetX, y, width - insetX, y, opacity * 0.4);
  }
}

function drawVintageOverlay(context, width, height, asset, preset) {
  if (state.vintageNoise <= 0.001) {
    return;
  }

  const intensity = state.vintageNoise;

  context.save();
  context.globalCompositeOperation = "soft-light";
  context.fillStyle = `rgba(255, 255, 255, ${0.02 + intensity * 0.05})`;
  context.fillRect(0, 0, width, height);
  context.restore();

  const vignette = context.createRadialGradient(
    width * 0.5,
    height * 0.42,
    Math.min(width, height) * 0.16,
    width * 0.5,
    height * 0.5,
    Math.max(width, height) * 0.76,
  );
  vignette.addColorStop(0, "rgba(255,255,255,0)");
  vignette.addColorStop(0.68, `rgba(18, 22, 28, ${0.03 + intensity * 0.04})`);
  vignette.addColorStop(1, `rgba(10, 12, 16, ${0.12 + intensity * 0.16})`);

  context.save();
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
  context.restore();

  const seed = hashString(`${asset.id}:${preset.id}:${width}x${height}`);
  const tile = getNoisePatternTile(width, height, seed, intensity);
  const pattern = context.createPattern(tile, "repeat");

  if (pattern) {
    context.save();
    context.globalAlpha = 0.2 + intensity * 0.2;
    context.fillStyle = pattern;
    context.fillRect(0, 0, width, height);
    context.restore();
  }
}

function renderAssetToCanvas(canvas, preset, asset) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = getAssetBackgroundColor(asset);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (!asset) {
    return;
  }

  const metrics = computeMetrics(
    asset.image,
    canvas.width,
    canvas.height,
    asset.transform,
    state.fitMode,
  );

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  ctx.save();
  if (state.vintageNoise > 0.001) {
    const intensity = state.vintageNoise;
    ctx.filter = `contrast(${Math.round(100 + intensity * 10)}%) brightness(${Math.round(100 - intensity * 2)}%)`;
  }
  ctx.drawImage(asset.image, metrics.x, metrics.y, metrics.drawWidth, metrics.drawHeight);
  ctx.restore();

  drawVintageOverlay(ctx, canvas.width, canvas.height, asset, preset);
  drawGridOverlay(ctx, canvas.width, canvas.height);
}

function drawPreview() {
  const preset = getPresetById(state.activePresetId);
  if (!preset) {
    return;
  }

  const asset = getActiveAsset();
  const previewSize = computePreviewSize(preset);
  previewCanvas.width = previewSize.width;
  previewCanvas.height = previewSize.height;
  previewCanvas.style.width = `${previewSize.width}px`;
  previewCanvas.style.height = `${previewSize.height}px`;

  renderAssetToCanvas(previewCanvas, preset, asset);
  previewEmpty.hidden = Boolean(asset);
}

let previewResizeFrame = 0;

function queuePreviewRedraw() {
  cancelAnimationFrame(previewResizeFrame);
  previewResizeFrame = requestAnimationFrame(() => {
    previewResizeFrame = 0;
    drawPreview();
  });
}

function buildEffectGallery() {
  effectGallery.innerHTML = "";
  effectCountText.textContent = `${state.assets.length} 张`;

  if (state.assets.length === 0) {
    const empty = document.createElement("div");
    empty.className = "queue-empty";
    empty.textContent = "还没有图片，导入后这里会显示每张图的应用效果。";
    effectGallery.appendChild(empty);
    return;
  }

  const preset = getPresetById(state.activePresetId);
  if (!preset) {
    return;
  }

  const effectSize = computeEffectSize(preset);

  state.assets.forEach((asset) => {
    const card = document.createElement("article");
    card.className = "effect-card";
    if (asset.id === state.activeAssetId) {
      card.classList.add("is-active");
    }
    if (state.selectedAssetIds.has(asset.id)) {
      card.classList.add("is-selected");
    }

    const header = document.createElement("div");
    header.className = "effect-card-header";

    const name = document.createElement("div");
    name.className = "effect-card-name";
    name.textContent = asset.fileName;

    const badges = document.createElement("div");
    badges.className = "effect-card-badges";

    if (asset.id === state.activeAssetId) {
      const activeBadge = document.createElement("span");
      activeBadge.className = "effect-badge effect-badge--active";
      activeBadge.textContent = "当前";
      badges.appendChild(activeBadge);
    }

    if (state.selectedAssetIds.has(asset.id)) {
      const selectedBadge = document.createElement("span");
      selectedBadge.className = "effect-badge effect-badge--selected";
      selectedBadge.textContent = "已选";
      badges.appendChild(selectedBadge);
    }

    header.append(name, badges);

    const canvasShell = document.createElement("div");
    canvasShell.className = "effect-canvas-shell";

    const canvas = document.createElement("canvas");
    canvas.className = "effect-canvas";
    canvas.width = effectSize.width;
    canvas.height = effectSize.height;
    canvas.style.width = `${effectSize.width}px`;
    canvas.style.height = `${effectSize.height}px`;
    renderAssetToCanvas(canvas, preset, asset);
    canvasShell.appendChild(canvas);

    const meta = document.createElement("div");
    meta.className = "effect-card-meta";
    const effectSummary = effectSummaryParts();
    meta.textContent = effectSummary.length
      ? `${preset.ratio} 输出 · 缩放 ${Math.round(asset.transform.zoom * 100)}% · ${effectSummary.join(" · ")}`
      : `${preset.ratio} 输出 · 缩放 ${Math.round(asset.transform.zoom * 100)}%`;

    card.append(header, canvasShell, meta);
    card.addEventListener("click", () => {
      setActiveAsset(asset.id);
      revealPreviewPanelIfNeeded();
      setStatus(`已切换到 ${asset.fileName}，可继续查看和微调应用效果。`);
    });

    effectGallery.appendChild(card);
  });
}

async function loadAssetFromFile(file) {
  const directObjectUrl = URL.createObjectURL(file);

  try {
    const image = await loadImageElement(directObjectUrl);
    return buildAssetFromImage(file, directObjectUrl, image);
  } catch {
    URL.revokeObjectURL(directObjectUrl);
  }

  if (!isImportableImageFile(file)) {
    throw createImportError(
      "unsupported-image-type",
      "没有检测到可用图片文件。支持 JPG、PNG、WebP、GIF、BMP、SVG、AVIF、HEIC、HEIF、TIFF。",
      { fileName: file.name },
    );
  }

  const convertedFile = await convertImageWithServer(file);
  const convertedObjectUrl = URL.createObjectURL(convertedFile);

  try {
    const image = await loadImageElement(convertedObjectUrl);
    return buildAssetFromImage(file, convertedObjectUrl, image, { wasConverted: true });
  } catch {
    URL.revokeObjectURL(convertedObjectUrl);
    throw createImportError(
      "converted-image-decode-failed",
      "这类图片已尝试本地转换，但转换后的预览仍然失败。请先转成 JPG / PNG / WebP 后再试。",
      { fileName: file.name },
    );
  }
}

async function importFiles(fileList) {
  const imageFiles = [...fileList].filter((file) => isImportableImageFile(file));
  if (imageFiles.length === 0) {
    setStatus("没有检测到可用图片文件。支持 JPG、PNG、WebP、GIF、BMP、SVG、AVIF、HEIC、HEIF、TIFF。");
    return;
  }

  const results = await Promise.allSettled(imageFiles.map((file) => loadAssetFromFile(file)));
  const loadedAssets = [];
  const failedErrors = [];

  results.forEach((result) => {
    if (result.status === "fulfilled") {
      loadedAssets.push(result.value);
      return;
    }

    failedErrors.push(result.reason);
  });

  if (loadedAssets.length === 0) {
    setStatus(buildImportFailureMessage(failedErrors));
    return;
  }

  state.assets.push(...loadedAssets);
  state.activeAssetId = loadedAssets[0].id;
  syncViewportFromActiveAsset();
  syncBackgroundColorControl();
  syncSourceMeta();
  buildSourceQueue();
  buildEffectGallery();
  syncSelectionMeta();
  updateButtonState();
  drawPreview();

  const convertedCount = loadedAssets.filter((asset) => asset.wasConverted).length;
  const convertedSuffix = convertedCount > 0 ? `，其中 ${convertedCount} 张已自动转成兼容格式` : "";
  const failSuffix = failedErrors.length > 0 ? `，另有 ${failedErrors.length} 张读取失败` : "";
  setStatus(`已导入 ${loadedAssets.length} 张图片${convertedSuffix}${failSuffix}。你可以逐张调整构图，或直接打包 ZIP。`);
}

function removeAsset(assetId) {
  const asset = state.assets.find((item) => item.id === assetId);
  if (!asset) {
    return;
  }

  URL.revokeObjectURL(asset.objectUrl);
  state.assets = state.assets.filter((item) => item.id !== assetId);
  state.selectedAssetIds.delete(assetId);

  if (state.activeAssetId === assetId) {
    state.activeAssetId = state.assets[0]?.id ?? null;
    syncViewportFromActiveAsset();
  }

  syncBackgroundColorControl();
  syncSourceMeta();
  buildSourceQueue();
  buildEffectGallery();
  syncSelectionMeta();
  updateButtonState();
  drawPreview();
  setStatus(state.assets.length ? "已移除一张图片。" : "图片队列已清空。");
}

function clearAssets() {
  state.assets.forEach((asset) => URL.revokeObjectURL(asset.objectUrl));
  state.assets = [];
  state.activeAssetId = null;
  state.selectedAssetIds.clear();
  state.zoom = 1;
  state.panXNorm = 0;
  state.panYNorm = 0;
  backgroundColorInput.value = state.backgroundColor;
  syncSourceMeta();
  buildSourceQueue();
  buildEffectGallery();
  syncSelectionMeta();
  updateButtonState();
  drawPreview();
  zoomRange.value = "1";
  zoomValue.textContent = "100%";
  setStatus("图片队列已清空。");
}

function selectAllAssets() {
  state.selectedAssetIds = new Set(state.assets.map((asset) => asset.id));
  buildSourceQueue();
  buildEffectGallery();
  syncSelectionMeta();
  updateButtonState();
  setStatus(`已选中 ${state.selectedAssetIds.size} 张图片。`);
}

function clearSelectedAssets() {
  state.selectedAssetIds.clear();
  buildSourceQueue();
  buildEffectGallery();
  syncSelectionMeta();
  updateButtonState();
  setStatus("已清空图片选择。");
}

function applyZoomToSelectedAssets() {
  const activeAsset = getActiveAsset();
  const selectedAssets = getSelectedAssets();

  if (!activeAsset || selectedAssets.length === 0) {
    return;
  }

  selectedAssets.forEach((asset) => {
    asset.transform.zoom = state.zoom;
  });

  if (state.selectedAssetIds.has(activeAsset.id)) {
    activeAsset.transform.zoom = state.zoom;
    syncViewportFromActiveAsset();
  }

  buildSourceQueue();
  buildEffectGallery();
  syncSelectionMeta();
  drawPreview();
  setStatus(`已将当前缩放 ${Math.round(state.zoom * 100)}% 应用到 ${selectedAssets.length} 张图片。`);
}

function clampPan() {
  state.panXNorm = Math.max(-1, Math.min(1, state.panXNorm));
  state.panYNorm = Math.max(-1, Math.min(1, state.panYNorm));
}

async function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    const quality = state.mimeType === "image/png" ? undefined : state.quality;
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
        return;
      }
      reject(new Error("导出失败"));
    }, state.mimeType, quality);
  });
}

async function renderBlobForAssetPreset(asset, preset) {
  const canvas = document.createElement("canvas");
  canvas.width = preset.width;
  canvas.height = preset.height;
  renderAssetToCanvas(canvas, preset, asset);
  return canvasToBlob(canvas);
}

function sanitizeFilePart(value) {
  return String(value).replace(/[\\/:*?"<>|]/g, "-").trim() || "untitled";
}

function buildDownloadName(asset, preset) {
  const extension = currentExtension();
  return `${sanitizeFilePart(asset.nameBase)}-${sanitizeFilePart(preset.platform)}-${sanitizeFilePart(preset.name)}.${extension}`;
}

function downloadBlob(blob, fileNameValue) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileNameValue;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

async function exportPreset(asset, preset) {
  const blob = await renderBlobForAssetPreset(asset, preset);
  downloadBlob(blob, buildDownloadName(asset, preset));
}

async function exportCurrentPreset() {
  const asset = getActiveAsset();
  if (!asset) {
    return;
  }

  const preset = getPresetById(state.activePresetId);
  await exportPreset(asset, preset);
  setStatus(`已导出 ${asset.fileName} · ${preset.platform} · ${preset.name}`);
}

async function exportSelectedPresets() {
  const asset = getActiveAsset();
  if (!asset || state.checkedPresetIds.size === 0) {
    return;
  }

  const selectedPresets = getPresets().filter((preset) => state.checkedPresetIds.has(preset.id));
  setStatus(`正在导出 ${asset.fileName} 的 ${selectedPresets.length} 个预设...`);

  for (const preset of selectedPresets) {
    await exportPreset(asset, preset);
    await pause();
  }

  setStatus(`已完成 ${asset.fileName} 的 ${selectedPresets.length} 个预设导出`);
}

function pause() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

function buildCrcTable() {
  const table = new Uint32Array(256);

  for (let index = 0; index < 256; index += 1) {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }
    table[index] = value >>> 0;
  }

  return table;
}

function crc32(bytes) {
  let crc = 0xffffffff;

  for (let index = 0; index < bytes.length; index += 1) {
    crc = crcTable[(crc ^ bytes[index]) & 0xff] ^ (crc >>> 8);
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function dosDateTime(date) {
  const safeYear = Math.max(1980, date.getFullYear());
  return {
    date:
      ((safeYear - 1980) << 9) |
      ((date.getMonth() + 1) << 5) |
      date.getDate(),
    time:
      (date.getHours() << 11) |
      (date.getMinutes() << 5) |
      Math.floor(date.getSeconds() / 2),
  };
}

function writeUint16(view, offset, value) {
  view.setUint16(offset, value, true);
}

function writeUint32(view, offset, value) {
  view.setUint32(offset, value >>> 0, true);
}

// Store-only ZIP writer keeps the app dependency-free while still bundling many exports.
function createZipBlob(entries) {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const entry of entries) {
    const nameBytes = encoder.encode(entry.name);
    const { date, time } = dosDateTime(entry.lastModified ?? new Date());

    const localHeader = new Uint8Array(30 + nameBytes.length);
    const localView = new DataView(localHeader.buffer);
    writeUint32(localView, 0, 0x04034b50);
    writeUint16(localView, 4, 20);
    writeUint16(localView, 6, 0x0800);
    writeUint16(localView, 8, 0);
    writeUint16(localView, 10, time);
    writeUint16(localView, 12, date);
    writeUint32(localView, 14, entry.crc32);
    writeUint32(localView, 18, entry.bytes.length);
    writeUint32(localView, 22, entry.bytes.length);
    writeUint16(localView, 26, nameBytes.length);
    writeUint16(localView, 28, 0);
    localHeader.set(nameBytes, 30);
    localParts.push(localHeader, entry.bytes);

    const centralHeader = new Uint8Array(46 + nameBytes.length);
    const centralView = new DataView(centralHeader.buffer);
    writeUint32(centralView, 0, 0x02014b50);
    writeUint16(centralView, 4, 20);
    writeUint16(centralView, 6, 20);
    writeUint16(centralView, 8, 0x0800);
    writeUint16(centralView, 10, 0);
    writeUint16(centralView, 12, time);
    writeUint16(centralView, 14, date);
    writeUint32(centralView, 16, entry.crc32);
    writeUint32(centralView, 20, entry.bytes.length);
    writeUint32(centralView, 24, entry.bytes.length);
    writeUint16(centralView, 28, nameBytes.length);
    writeUint16(centralView, 30, 0);
    writeUint16(centralView, 32, 0);
    writeUint16(centralView, 34, 0);
    writeUint16(centralView, 36, 0);
    writeUint32(centralView, 38, 0);
    writeUint32(centralView, 42, offset);
    centralHeader.set(nameBytes, 46);
    centralParts.push(centralHeader);

    offset += localHeader.length + entry.bytes.length;
  }

  const centralOffset = offset;
  let centralSize = 0;
  for (const centralPart of centralParts) {
    centralSize += centralPart.length;
  }

  const endRecord = new Uint8Array(22);
  const endView = new DataView(endRecord.buffer);
  writeUint32(endView, 0, 0x06054b50);
  writeUint16(endView, 4, 0);
  writeUint16(endView, 6, 0);
  writeUint16(endView, 8, entries.length);
  writeUint16(endView, 10, entries.length);
  writeUint32(endView, 12, centralSize);
  writeUint32(endView, 16, centralOffset);
  writeUint16(endView, 20, 0);

  return new Blob([...localParts, ...centralParts, endRecord], {
    type: "application/zip",
  });
}

async function exportZipBundle() {
  if (state.assets.length === 0 || state.checkedPresetIds.size === 0) {
    return;
  }

  const selectedPresets = getPresets().filter((preset) => state.checkedPresetIds.has(preset.id));
  const totalJobs = state.assets.length * selectedPresets.length;
  const entries = [];
  let completedJobs = 0;

  for (const asset of state.assets) {
    const folderName = sanitizeFilePart(asset.nameBase);
    for (const preset of selectedPresets) {
      completedJobs += 1;
      setStatus(`正在准备 ZIP：${completedJobs} / ${totalJobs}`);
      const blob = await renderBlobForAssetPreset(asset, preset);
      const bytes = new Uint8Array(await blob.arrayBuffer());
      entries.push({
        name: `${folderName}/${buildDownloadName(asset, preset)}`,
        bytes,
        crc32: crc32(bytes),
        lastModified: asset.file.lastModified ? new Date(asset.file.lastModified) : new Date(),
      });
      await pause();
    }
  }

  const zipBlob = createZipBlob(entries);
  const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
  downloadBlob(zipBlob, `social-media-bundle-${stamp}.zip`);
  setStatus(`已打包 ${state.assets.length} 张图片，共 ${entries.length} 个文件`);
}

function updateCustomRatioText() {
  const width = Number(customWidthInput.value);
  const height = Number(customHeightInput.value);

  if (Number.isFinite(width) && width > 0 && Number.isFinite(height) && height > 0) {
    customRatioText.textContent = `宽高比 ${readableRatio(Math.round(width), Math.round(height))}`;
    return;
  }

  customRatioText.textContent = "宽高比 -";
}

function addCustomPreset(event) {
  event.preventDefault();

  const platform = customPlatformInput.value.trim();
  const name = customNameInput.value.trim();
  const width = Math.round(Number(customWidthInput.value));
  const height = Math.round(Number(customHeightInput.value));
  const note = customNoteInput.value.trim() || "自定义模板";

  if (!platform || !name || !Number.isFinite(width) || !Number.isFinite(height)) {
    templateStatus.textContent = "请把平台、模板名、宽度和高度填完整。";
    return;
  }

  if (width < 100 || height < 100) {
    templateStatus.textContent = "宽度和高度至少填 100。";
    return;
  }

  const preset = {
    id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    platform,
    name,
    width,
    height,
    ratio: readableRatio(width, height),
    note,
    checked: true,
    isCustom: true,
  };

  state.customPresets.push(preset);
  state.checkedPresetIds.add(preset.id);
  persistCustomPresets();
  setActivePreset(preset.id);
  updateButtonState();
  customPresetForm.reset();
  customRatioText.textContent = "宽高比 -";
  templateStatus.textContent = `已保存 ${platform} · ${name}`;
}

["dragenter", "dragover"].forEach((eventName) => {
  dropzone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropzone.classList.add("is-dragover");
  });
});

["dragleave", "drop"].forEach((eventName) => {
  dropzone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropzone.classList.remove("is-dragover");
  });
});

pickImagesButton.addEventListener("click", () => {
  fileInput.click();
});

dropzone.tabIndex = 0;
dropzone.setAttribute("role", "button");
dropzone.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    fileInput.click();
  }
});

fileInput.addEventListener("change", async (event) => {
  const files = event.target.files ?? [];
  await importFiles(files);
  fileInput.value = "";
});

dropzone.addEventListener("drop", async (event) => {
  await importFiles(event.dataTransfer?.files ?? []);
});

presetSelect.addEventListener("change", (event) => {
  const preset = getPresetById(event.target.value);
  setActivePreset(preset.id, `已切换到 ${preset.platform} · ${preset.name}`);
});

document.querySelectorAll('input[name="fitMode"]').forEach((radio) => {
  radio.addEventListener("change", (event) => {
    state.fitMode = event.target.value;
    drawPreview();
    buildEffectGallery();
  });
});

zoomRange.addEventListener("input", (event) => {
  state.zoom = Number(event.target.value);
  zoomValue.textContent = `${Math.round(state.zoom * 100)}%`;
  persistViewportToActiveAsset();
  syncSelectionMeta();
  drawPreview();
  buildEffectGallery();
});

vintageNoiseRange.addEventListener("input", (event) => {
  state.vintageNoise = Number(event.target.value);
  const effectLabel = state.vintageNoise > 0.001
    ? `已更新颗粒噪点 ${Math.round(state.vintageNoise * 100)}%`
    : "已关闭颗粒噪点";
  refreshEffectRendering(effectLabel);
});

gridModeSelect.addEventListener("change", (event) => {
  state.gridMode = event.target.value;
  const label = state.gridMode === "none"
    ? "已关闭网格系统"
    : `已切换到 ${gridModeLabel(state.gridMode)}`;
  refreshEffectRendering(label);
});

gridColorInput.addEventListener("input", (event) => {
  state.gridColor = event.target.value;
  refreshEffectRendering("已更新网格颜色");
});

gridOpacityRange.addEventListener("input", (event) => {
  state.gridOpacity = Number(event.target.value);
  refreshEffectRendering(`已更新${gridModeLabel(state.gridMode)}透明度 ${Math.round(state.gridOpacity * 100)}%`);
});

gridInsetRange.addEventListener("input", (event) => {
  state.gridInset = Number(event.target.value);
  refreshEffectRendering(`已更新网格边距 ${Math.round(state.gridInset * 100)}%`);
});

backgroundColorInput.addEventListener("input", (event) => {
  const activeAsset = getActiveAsset();
  state.backgroundColor = event.target.value;
  if (activeAsset) {
    activeAsset.backgroundColor = event.target.value;
  }
  drawPreview();
  buildEffectGallery();
});

formatSelect.addEventListener("change", (event) => {
  state.mimeType = event.target.value;
  updateQualityVisibility();
});

qualityRange.addEventListener("input", (event) => {
  state.quality = Number(event.target.value);
  qualityValue.textContent = `${Math.round(state.quality * 100)}%`;
});

recenterButton.addEventListener("click", () => {
  resetViewportForActiveAsset();
  persistViewportToActiveAsset();
  drawPreview();
  buildEffectGallery();
  setStatus("已恢复当前图片的默认构图");
});

clearQueueButton.addEventListener("click", () => {
  clearAssets();
});

selectAllAssetsButton.addEventListener("click", () => {
  selectAllAssets();
});

clearSelectedAssetsButton.addEventListener("click", () => {
  clearSelectedAssets();
});

downloadCurrentButton.addEventListener("click", () => {
  exportCurrentPreset().catch(() => setStatus("导出失败，请重试。"));
});

downloadSelectedButton.addEventListener("click", () => {
  exportSelectedPresets().catch(() => setStatus("批量导出失败，请重试。"));
});

downloadZipButton.addEventListener("click", () => {
  exportZipBundle().catch(() => setStatus("ZIP 打包失败，请重试。"));
});

applyZoomToSelectedButton.addEventListener("click", () => {
  applyZoomToSelectedAssets();
});

previewCanvas.addEventListener("wheel", (event) => {
  if (!getActiveAsset()) {
    return;
  }

  event.preventDefault();
  const factor = event.deltaY < 0 ? 1.04 : 0.96;
  state.zoom = Math.max(0.6, Math.min(3, state.zoom * factor));
  zoomRange.value = String(state.zoom);
  zoomValue.textContent = `${Math.round(state.zoom * 100)}%`;
  persistViewportToActiveAsset();
  syncSelectionMeta();
  drawPreview();
  buildEffectGallery();
});

previewCanvas.addEventListener("pointerdown", (event) => {
  const asset = getActiveAsset();
  if (!asset) {
    return;
  }

  const metrics = computeMetrics(
    asset.image,
    previewCanvas.width,
    previewCanvas.height,
    asset.transform,
    state.fitMode,
  );

  state.drag = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    startPanXNorm: state.panXNorm,
    startPanYNorm: state.panYNorm,
    maxPanX: metrics.maxPanX,
    maxPanY: metrics.maxPanY,
  };

  previewCanvas.classList.add("is-dragging");
  previewCanvas.setPointerCapture(event.pointerId);
});

previewCanvas.addEventListener("pointermove", (event) => {
  if (!state.drag) {
    return;
  }

  const deltaX = event.clientX - state.drag.startX;
  const deltaY = event.clientY - state.drag.startY;

  state.panXNorm =
    state.drag.maxPanX > 0 ? state.drag.startPanXNorm + deltaX / state.drag.maxPanX : 0;
  state.panYNorm =
    state.drag.maxPanY > 0 ? state.drag.startPanYNorm + deltaY / state.drag.maxPanY : 0;

  clampPan();
  persistViewportToActiveAsset();
  drawPreview();
});

function finishDrag(event) {
  if (!state.drag) {
    return;
  }

  const pointerId = state.drag.pointerId;
  state.drag = null;
  previewCanvas.classList.remove("is-dragging");

  if (previewCanvas.hasPointerCapture(pointerId)) {
    previewCanvas.releasePointerCapture(pointerId);
  }

  if (event) {
    persistViewportToActiveAsset();
    buildEffectGallery();
  }
}

previewCanvas.addEventListener("pointerup", finishDrag);
previewCanvas.addEventListener("pointercancel", finishDrag);
previewCanvas.addEventListener("pointerleave", (event) => {
  if (state.drag && event.buttons === 0) {
    finishDrag(event);
  }
});

customPresetForm.addEventListener("submit", addCustomPreset);
customWidthInput.addEventListener("input", updateCustomRatioText);
customHeightInput.addEventListener("input", updateCustomRatioText);
window.addEventListener("resize", queuePreviewRedraw);

syncSourceMeta();
buildPresetSelect();
buildPresetPicker();
syncActivePresetMeta();
buildPresetGrid();
buildSourceQueue();
buildEffectGallery();
syncSelectionMeta();
syncEffectControls();
syncBackgroundColorControl();
updateQualityVisibility();
updateButtonState();
drawPreview();
