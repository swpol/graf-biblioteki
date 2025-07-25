// src/lib/manifest.ts
var THUMBNAIL_PLUGIN_ID = "thumbnail";
var manifest = {
  id: THUMBNAIL_PLUGIN_ID,
  name: "Thumbnail Plugin",
  version: "1.0.0",
  provides: ["thumbnail"],
  requires: ["render"],
  optional: [],
  defaultConfig: {
    enabled: true,
    width: 150,
    gap: 10,
    buffer: 3,
    labelHeight: 16
  }
};

// ../core/dist/math-ChSRQF3r.js
var f = "SET_DOCUMENT";
var z = "\xAD";
var M = "\u200B";
var L = "\u2060";
var $ = "\uFEFF";
var F = "\uFFFE";
var N = "\uFFFF";
var k = Object.freeze([
  z,
  M,
  L,
  $,
  F,
  N
]);
new RegExp(`[${k.join("")}]`, "g");
var P = Object.freeze([
  { id: 0, label: "Normal", css: "normal" },
  { id: 1, label: "Multiply", css: "multiply" },
  { id: 2, label: "Screen", css: "screen" },
  { id: 3, label: "Overlay", css: "overlay" },
  { id: 4, label: "Darken", css: "darken" },
  { id: 5, label: "Lighten", css: "lighten" },
  { id: 6, label: "Color Dodge", css: "color-dodge" },
  { id: 7, label: "Color Burn", css: "color-burn" },
  { id: 8, label: "Hard Light", css: "hard-light" },
  { id: 9, label: "Soft Light", css: "soft-light" },
  { id: 10, label: "Difference", css: "difference" },
  { id: 11, label: "Exclusion", css: "exclusion" },
  { id: 12, label: "Hue", css: "hue" },
  { id: 13, label: "Saturation", css: "saturation" },
  { id: 14, label: "Color", css: "color" },
  { id: 15, label: "Luminosity", css: "luminosity" }
]);
P.reduce(
  (i, e) => (i[e.id] = e, i),
  {}
);
P.reduce((i, e) => (i[e.css] = e.id, i), {});
P.map((i) => ({
  value: i.id,
  label: i.label
}));
var _ = Object.freeze({
  1: "invisible",
  2: "hidden",
  4: "print",
  8: "noZoom",
  16: "noRotate",
  32: "noView",
  64: "readOnly",
  128: "locked",
  256: "toggleNoView"
});
Object.entries(
  _
).reduce(
  (i, [e, t]) => (i[t] = Number(e), i),
  {}
);
function v(i, e, t) {
  if (i === e)
    return true;
  if (i == null || e == null)
    return i === e;
  const r = typeof i;
  if (r !== typeof e) return false;
  if (r === "object") {
    t || (t = /* @__PURE__ */ new Set());
    const n = x(i, e);
    if (t.has(n))
      return true;
    t.add(n);
    const a = Array.isArray(i), o = Array.isArray(e);
    return a && o ? U(i, e, t) : !a && !o ? B(i, e, t) : false;
  }
  return false;
}
function x(i, e) {
  return `${S(i)}__${S(e)}`;
}
var G = 0;
var d = /* @__PURE__ */ new WeakMap();
function S(i) {
  return d.has(i) || d.set(i, ++G), d.get(i);
}
function U(i, e, t) {
  if (i.length !== e.length) return false;
  const r = new Array(e.length).fill(false);
  e: for (let s = 0; s < i.length; s++) {
    const n = i[s];
    for (let a = 0; a < e.length; a++)
      if (!r[a] && v(n, e[a], t)) {
        r[a] = true;
        continue e;
      }
    return false;
  }
  return true;
}
function B(i, e, t) {
  const r = Object.keys(i).sort(), s = Object.keys(e).sort();
  if (r.length !== s.length) return false;
  for (let n = 0; n < r.length; n++)
    if (r[n] !== s[n]) return false;
  for (const n of r) {
    const a = i[n], o = e[n];
    if (!v(a, o, t))
      return false;
  }
  return true;
}

// ../core/dist/index.js
var w2 = class {
  constructor(t, e) {
    if (this.id = t, this.registry = e, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((i, s, c) => {
      this.onStoreUpdated(c, s);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((i, s, c) => {
      this.onCoreStoreUpdated(c, s);
    }), this.readyPromise = new Promise((i) => {
      this.readyResolve = i;
    }), this.readyResolve();
  }
  provides() {
    if (!this._capability) {
      const t = this.buildCapability();
      this._capability = Object.freeze(t);
    }
    return this._capability;
  }
  /**
   *  Get a copy of the current state
   */
  get state() {
    return this.pluginStore.getState();
  }
  /**
   *  Get a copy of the current core state
   */
  get coreState() {
    return this.coreStore.getState();
  }
  /**
   * @deprecated  use `this.state` Get a copy of the current state
   */
  getState() {
    return this.pluginStore.getState();
  }
  /**
   * @deprecated  use `this.coreState` Get a copy of the current core state
   */
  getCoreState() {
    return this.coreStore.getState();
  }
  /**
   * Core Dispatch
   */
  dispatchCoreAction(t) {
    return this.coreStore.dispatchToCore(t);
  }
  /**
   * Dispatch an action to all plugins
   */
  dispatchToAllPlugins(t) {
    return this.coreStore.dispatch(t);
  }
  /**
   * Dispatch an action
   */
  dispatch(t) {
    return this.pluginStore.dispatch(t);
  }
  /**
   * Dispatch an action with debouncing to prevent rapid repeated calls
   * @param action The action to dispatch
   * @param debounceTime Time in ms to debounce (default: 100ms)
   * @returns boolean indicating whether the action was dispatched or debounced
   */
  debouncedDispatch(t, e = 100) {
    const i = Date.now(), s = this.debouncedActions[t.type] || 0;
    return i - s >= e ? (this.debouncedActions[t.type] = i, this.dispatch(t), true) : false;
  }
  /**
   * Subscribe to state changes
   */
  subscribe(t) {
    return this.pluginStore.subscribeToState(t);
  }
  /**
   * Subscribe to core store changes
   */
  subscribeToCoreStore(t) {
    return this.coreStore.subscribe(t);
  }
  /**
   * Called when the plugin store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onStoreUpdated(t, e) {
  }
  /**
   * Called when the core store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onCoreStoreUpdated(t, e) {
  }
  /**
   * Cleanup method to be called when plugin is being destroyed
   */
  destroy() {
    this.unsubscribeFromState && (this.unsubscribeFromState(), this.unsubscribeFromState = null), this.unsubscribeFromCoreStore && (this.unsubscribeFromCoreStore(), this.unsubscribeFromCoreStore = null);
  }
  /**
   * Returns a promise that resolves when the plugin is ready
   */
  ready() {
    return this.readyPromise;
  }
  /**
   * Mark the plugin as ready
   */
  markReady() {
    this.readyResolve();
  }
  /**
   * Reset the ready state (useful for plugins that need to reinitialize)
   */
  resetReady() {
    this.readyPromise = new Promise((t) => {
      this.readyResolve = t;
    });
  }
};
var b2 = class {
  constructor(t, e) {
    this.handler = t, this.options = e, this.lastRun = 0, this.handle = (i) => {
      this.options.mode === "debounce" ? this.debounce(i) : this.throttle(i);
    };
  }
  debounce(t) {
    this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(() => {
      this.handler(t), this.timeoutId = void 0;
    }, this.options.wait);
  }
  throttle(t) {
    if (this.options.mode === "debounce") return;
    const e = Date.now(), i = this.options.throttleMode || "leading-trailing";
    e - this.lastRun >= this.options.wait && (i === "leading-trailing" && this.handler(t), this.lastRun = e), this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(
      () => {
        this.handler(t), this.lastRun = Date.now(), this.timeoutId = void 0;
      },
      this.options.wait - (e - this.lastRun)
    );
  }
  destroy() {
    this.timeoutId && window.clearTimeout(this.timeoutId);
  }
};
function C(o, t = v) {
  const e = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
  let s = o;
  const c = (r) => e.forEach((n) => n(r)), p2 = (r, n) => {
    let a = r, d2 = () => {
    };
    if (n) {
      const u2 = new b2(r, n);
      a = u2.handle, d2 = () => u2.destroy(), i.set(r, { wrapped: a, destroy: d2 });
    }
    return s !== void 0 && a(s), e.add(a), () => {
      e.delete(a), d2(), i.delete(r);
    };
  };
  return {
    /* emitter behaviour ---------------------------------------- */
    get value() {
      return s;
    },
    emit(r = void 0) {
      (s === void 0 || !t(s, r)) && (s = r, c(r));
    },
    on: p2,
    off(r) {
      const n = i.get(r);
      n ? (e.delete(n.wrapped), n.destroy(), i.delete(r)) : e.delete(r);
    },
    clear() {
      e.clear(), i.forEach((r) => r.destroy()), i.clear();
    },
    /* derived hook --------------------------------------------- */
    select(r, n = v) {
      return (a, d2) => {
        let u2;
        if (s !== void 0) {
          const h = r(s);
          u2 = h, a(h);
        }
        return p2(
          (h) => {
            const l2 = r(h);
            (u2 === void 0 || !n(u2, l2)) && (u2 = l2, a(l2));
          },
          d2
        );
      };
    }
  };
}

// ../models/dist/index.js
var PdfSoftHyphenMarker = "\xAD";
var PdfZeroWidthSpace = "\u200B";
var PdfWordJoiner = "\u2060";
var PdfBomOrZwnbsp = "\uFEFF";
var PdfNonCharacterFFFE = "\uFFFE";
var PdfNonCharacterFFFF = "\uFFFF";
var PdfUnwantedTextMarkers = Object.freeze([
  PdfSoftHyphenMarker,
  PdfZeroWidthSpace,
  PdfWordJoiner,
  PdfBomOrZwnbsp,
  PdfNonCharacterFFFE,
  PdfNonCharacterFFFF
]);
var PdfUnwantedTextRegex = new RegExp(`[${PdfUnwantedTextMarkers.join("")}]`, "g");
var MixedBlendMode = Symbol("mixed");
var BLEND_MODE_INFOS = Object.freeze([
  { id: 0, label: "Normal", css: "normal" },
  { id: 1, label: "Multiply", css: "multiply" },
  { id: 2, label: "Screen", css: "screen" },
  { id: 3, label: "Overlay", css: "overlay" },
  { id: 4, label: "Darken", css: "darken" },
  { id: 5, label: "Lighten", css: "lighten" },
  { id: 6, label: "Color Dodge", css: "color-dodge" },
  { id: 7, label: "Color Burn", css: "color-burn" },
  { id: 8, label: "Hard Light", css: "hard-light" },
  { id: 9, label: "Soft Light", css: "soft-light" },
  { id: 10, label: "Difference", css: "difference" },
  { id: 11, label: "Exclusion", css: "exclusion" },
  { id: 12, label: "Hue", css: "hue" },
  { id: 13, label: "Saturation", css: "saturation" },
  { id: 14, label: "Color", css: "color" },
  { id: 15, label: "Luminosity", css: "luminosity" }
]);
var enumToInfo = BLEND_MODE_INFOS.reduce(
  (m2, info) => {
    m2[info.id] = info;
    return m2;
  },
  {}
);
var cssToEnum = BLEND_MODE_INFOS.reduce((m2, info) => {
  m2[info.css] = info.id;
  return m2;
}, {});
var blendModeSelectOptions = BLEND_MODE_INFOS.map((info) => ({
  value: info.id,
  label: info.label
}));
var PdfAnnotationFlagName = Object.freeze({
  [
    1
    /* INVISIBLE */
  ]: "invisible",
  [
    2
    /* HIDDEN */
  ]: "hidden",
  [
    4
    /* PRINT */
  ]: "print",
  [
    8
    /* NO_ZOOM */
  ]: "noZoom",
  [
    16
    /* NO_ROTATE */
  ]: "noRotate",
  [
    32
    /* NO_VIEW */
  ]: "noView",
  [
    64
    /* READ_ONLY */
  ]: "readOnly",
  [
    128
    /* LOCKED */
  ]: "locked",
  [
    256
    /* TOGGLE_NOVIEW */
  ]: "toggleNoView"
});
var PdfAnnotationFlagValue = Object.entries(
  PdfAnnotationFlagName
).reduce(
  (acc, [bit, name]) => {
    acc[name] = Number(bit);
    return acc;
  },
  {}
);
function ignore() {
}

// src/lib/thumbnail-plugin.ts
var ThumbnailPlugin = class extends w2 {
  constructor(id, registry, cfg) {
    super(id, registry);
    this.cfg = cfg;
    this.thumbs = [];
    this.window = null;
    this.emitWindow = C();
    this.taskCache = /* @__PURE__ */ new Map();
    this.renderCapability = this.registry.getPlugin("render").provides();
    this.coreStore.onAction(f, (_action, state) => {
      this.taskCache.clear();
      this.setWindowState(state);
    });
  }
  /* ------------ init ------------------------------------------------ */
  async initialize() {
  }
  setWindowState(state) {
    const core = state.core;
    if (!core.document) return;
    const W2 = this.cfg.width ?? 120;
    const L2 = this.cfg.labelHeight ?? 16;
    const GAP = this.cfg.gap ?? 8;
    let offset = 0;
    this.thumbs = core.document.pages.map((p2) => {
      const ratio = p2.size.height / p2.size.width;
      const thumbH = Math.round(W2 * ratio);
      const wrapH = thumbH + L2;
      const meta = {
        pageIndex: p2.index,
        width: W2,
        height: thumbH,
        wrapperHeight: wrapH,
        top: offset,
        labelHeight: L2
      };
      offset += wrapH + GAP;
      return meta;
    });
    this.window = {
      start: -1,
      end: -1,
      items: [],
      totalHeight: offset - GAP
      // last item has no gap below
    };
    this.emitWindow.emit(this.window);
  }
  /* ------------ capability ----------------------------------------- */
  buildCapability() {
    return {
      onWindow: this.emitWindow.on,
      setViewport: (y2, h) => this.updateWindow(y2, h),
      renderThumb: (idx, dpr) => this.renderThumb(idx, dpr)
    };
  }
  /* ------------ windowing math ------------------------------------- */
  updateWindow(scrollY, viewportH) {
    const BUF = this.cfg.buffer ?? 3;
    let low = 0, high = this.thumbs.length - 1, first = 0;
    while (low <= high) {
      const mid = low + high >> 1;
      const m2 = this.thumbs[mid];
      if (m2.top + m2.wrapperHeight < scrollY) low = mid + 1;
      else {
        first = mid;
        high = mid - 1;
      }
    }
    let last = first;
    const limit = scrollY + viewportH;
    while (last + 1 < this.thumbs.length && this.thumbs[last].top < limit) last++;
    last = Math.min(this.thumbs.length - 1, last + BUF);
    const start = Math.max(0, first - BUF);
    if (this.window && start === this.window.start && last === this.window.end) return;
    this.window = {
      start,
      end: last,
      items: this.thumbs.slice(start, last + 1),
      totalHeight: this.window.totalHeight
    };
    this.emitWindow.emit(this.window);
  }
  /* ------------ thumbnail raster ----------------------------------- */
  renderThumb(idx, dpr) {
    if (this.taskCache.has(idx)) return this.taskCache.get(idx);
    const core = this.coreState.core;
    const page = core.document.pages[idx];
    const scale = (this.cfg.width ?? 120) / page.size.width;
    const task = this.renderCapability.renderPageRect({
      pageIndex: idx,
      rect: { origin: { x: 0, y: 0 }, size: page.size },
      scaleFactor: scale,
      dpr
    });
    this.taskCache.set(idx, task);
    task.wait(ignore, () => {
      this.taskCache.delete(idx);
    });
    return task;
  }
};
ThumbnailPlugin.id = "thumbnail";

// src/lib/index.ts
var ThumbnailPluginPackage = {
  manifest,
  create: (registry, _engine, config) => new ThumbnailPlugin(THUMBNAIL_PLUGIN_ID, registry, config),
  reducer: () => {
  },
  initialState: {}
};
export {
  THUMBNAIL_PLUGIN_ID,
  ThumbnailPlugin,
  ThumbnailPluginPackage,
  manifest
};
//# sourceMappingURL=index.js.map