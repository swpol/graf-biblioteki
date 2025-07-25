"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ANNOTATION_PLUGIN_ID: () => ANNOTATION_PLUGIN_ID,
  AnnotationPlugin: () => AnnotationPlugin,
  AnnotationPluginPackage: () => AnnotationPluginPackage,
  getAnnotations: () => getAnnotations,
  getAnnotationsByPageIndex: () => getAnnotationsByPageIndex,
  getSelectedAnnotation: () => getSelectedAnnotation,
  getSelectedAnnotationByPageIndex: () => getSelectedAnnotationByPageIndex,
  getSelectedAnnotationVariant: () => getSelectedAnnotationVariant,
  getSelectedAnnotationWithPageIndex: () => getSelectedAnnotationWithPageIndex,
  isAnnotationSelected: () => isAnnotationSelected,
  isInAnnotationVariant: () => isInAnnotationVariant,
  makeVariantKey: () => makeVariantKey,
  manifest: () => manifest,
  parseVariantKey: () => parseVariantKey,
  variantKeyFromAnnotation: () => variantKeyFromAnnotation
});
module.exports = __toCommonJS(index_exports);

// src/lib/manifest.ts
var ANNOTATION_PLUGIN_ID = "annotation";
var manifest = {
  id: ANNOTATION_PLUGIN_ID,
  name: "Annotation Plugin",
  version: "1.0.0",
  provides: ["annotation"],
  requires: ["interaction-manager", "selection"],
  optional: ["history"],
  defaultConfig: {
    enabled: true,
    autoCommit: true
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
var Rotation = /* @__PURE__ */ ((Rotation2) => {
  Rotation2[Rotation2["Degree0"] = 0] = "Degree0";
  Rotation2[Rotation2["Degree90"] = 1] = "Degree90";
  Rotation2[Rotation2["Degree180"] = 2] = "Degree180";
  Rotation2[Rotation2["Degree270"] = 3] = "Degree270";
  return Rotation2;
})(Rotation || {});
var TaskAbortedError = class extends Error {
  constructor(reason) {
    super(`Task aborted: ${JSON.stringify(reason)}`);
    this.name = "TaskAbortedError";
  }
};
var TaskRejectedError = class extends Error {
  constructor(reason) {
    super(`Task rejected: ${JSON.stringify(reason)}`);
    this.name = "TaskRejectedError";
  }
};
var Task = class _Task {
  constructor() {
    this.state = {
      stage: 0
      /* Pending */
    };
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];
    this._promise = null;
  }
  /**
   * Convert task to promise
   * @returns promise that will be resolved when task is settled
   */
  toPromise() {
    if (!this._promise) {
      this._promise = new Promise((resolve, reject) => {
        this.wait(
          (result) => resolve(result),
          (error) => {
            if (error.type === "abort") {
              reject(new TaskAbortedError(error.reason));
            } else {
              reject(new TaskRejectedError(error.reason));
            }
          }
        );
      });
    }
    return this._promise;
  }
  /**
   * wait for task to be settled
   * @param resolvedCallback - callback for resolved value
   * @param rejectedCallback - callback for rejected value
   */
  wait(resolvedCallback, rejectedCallback) {
    switch (this.state.stage) {
      case 0:
        this.resolvedCallbacks.push(resolvedCallback);
        this.rejectedCallbacks.push(rejectedCallback);
        break;
      case 1:
        resolvedCallback(this.state.result);
        break;
      case 2:
        rejectedCallback({
          type: "reject",
          reason: this.state.reason
        });
        break;
      case 3:
        rejectedCallback({
          type: "abort",
          reason: this.state.reason
        });
        break;
    }
  }
  /**
   * resolve task with specific result
   * @param result - result value
   */
  resolve(result) {
    if (this.state.stage === 0) {
      this.state = {
        stage: 1,
        result
      };
      for (const resolvedCallback of this.resolvedCallbacks) {
        try {
          resolvedCallback(result);
        } catch (e) {
        }
      }
      this.resolvedCallbacks = [];
      this.rejectedCallbacks = [];
    }
  }
  /**
   * reject task with specific reason
   * @param reason - abort reason
   *
   */
  reject(reason) {
    if (this.state.stage === 0) {
      this.state = {
        stage: 2,
        reason
      };
      for (const rejectedCallback of this.rejectedCallbacks) {
        try {
          rejectedCallback({
            type: "reject",
            reason
          });
        } catch (e) {
        }
      }
      this.resolvedCallbacks = [];
      this.rejectedCallbacks = [];
    }
  }
  /**
   * abort task with specific reason
   * @param reason - abort reason
   */
  abort(reason) {
    if (this.state.stage === 0) {
      this.state = {
        stage: 3,
        reason
      };
      for (const rejectedCallback of this.rejectedCallbacks) {
        try {
          rejectedCallback({
            type: "abort",
            reason
          });
        } catch (e) {
        }
      }
      this.resolvedCallbacks = [];
      this.rejectedCallbacks = [];
    }
  }
  /**
   * fail task with a TaskError from another task
   * This is a convenience method for error propagation between tasks
   * @param error - TaskError from another task
   */
  fail(error) {
    if (error.type === "abort") {
      this.abort(error.reason);
    } else {
      this.reject(error.reason);
    }
  }
  /**
   * Static method to wait for all tasks to resolve
   * Returns a new task that resolves with an array of all results
   * Rejects immediately if any task fails
   *
   * @param tasks - array of tasks to wait for
   * @returns new task that resolves when all input tasks resolve
   * @public
   */
  static all(tasks) {
    const combinedTask = new _Task();
    if (tasks.length === 0) {
      combinedTask.resolve([]);
      return combinedTask;
    }
    const results = new Array(tasks.length);
    let resolvedCount = 0;
    let isSettled = false;
    tasks.forEach((task, index) => {
      task.wait(
        (result) => {
          if (isSettled) return;
          results[index] = result;
          resolvedCount++;
          if (resolvedCount === tasks.length) {
            isSettled = true;
            combinedTask.resolve(results);
          }
        },
        (error) => {
          if (isSettled) return;
          isSettled = true;
          if (error.type === "abort") {
            combinedTask.abort(error.reason);
          } else {
            combinedTask.reject(error.reason);
          }
        }
      );
    });
    return combinedTask;
  }
  /**
   * Static method to wait for all tasks to settle (resolve, reject, or abort)
   * Always resolves with an array of settlement results
   *
   * @param tasks - array of tasks to wait for
   * @returns new task that resolves when all input tasks settle
   * @public
   */
  static allSettled(tasks) {
    const combinedTask = new _Task();
    if (tasks.length === 0) {
      combinedTask.resolve([]);
      return combinedTask;
    }
    const results = new Array(tasks.length);
    let settledCount = 0;
    tasks.forEach((task, index) => {
      task.wait(
        (result) => {
          results[index] = { status: "resolved", value: result };
          settledCount++;
          if (settledCount === tasks.length) {
            combinedTask.resolve(results);
          }
        },
        (error) => {
          results[index] = {
            status: error.type === "abort" ? "aborted" : "rejected",
            reason: error.reason
          };
          settledCount++;
          if (settledCount === tasks.length) {
            combinedTask.resolve(results);
          }
        }
      );
    });
    return combinedTask;
  }
  /**
   * Static method that resolves/rejects with the first task that settles
   *
   * @param tasks - array of tasks to race
   * @returns new task that settles with the first input task that settles
   * @public
   */
  static race(tasks) {
    const combinedTask = new _Task();
    if (tasks.length === 0) {
      combinedTask.reject("No tasks provided");
      return combinedTask;
    }
    let isSettled = false;
    tasks.forEach((task) => {
      task.wait(
        (result) => {
          if (isSettled) return;
          isSettled = true;
          combinedTask.resolve(result);
        },
        (error) => {
          if (isSettled) return;
          isSettled = true;
          if (error.type === "abort") {
            combinedTask.abort(error.reason);
          } else {
            combinedTask.reject(error.reason);
          }
        }
      );
    });
    return combinedTask;
  }
  /**
   * Utility to track progress of multiple tasks
   *
   * @param tasks - array of tasks to track
   * @param onProgress - callback called when any task completes
   * @returns new task that resolves when all input tasks resolve
   * @public
   */
  static withProgress(tasks, onProgress) {
    const combinedTask = _Task.all(tasks);
    if (onProgress) {
      let completedCount = 0;
      tasks.forEach((task) => {
        task.wait(
          () => {
            completedCount++;
            onProgress(completedCount, tasks.length);
          },
          () => {
            completedCount++;
            onProgress(completedCount, tasks.length);
          }
        );
      });
    }
    return combinedTask;
  }
};
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
var PdfBlendMode = /* @__PURE__ */ ((PdfBlendMode2) => {
  PdfBlendMode2[PdfBlendMode2["Normal"] = 0] = "Normal";
  PdfBlendMode2[PdfBlendMode2["Multiply"] = 1] = "Multiply";
  PdfBlendMode2[PdfBlendMode2["Screen"] = 2] = "Screen";
  PdfBlendMode2[PdfBlendMode2["Overlay"] = 3] = "Overlay";
  PdfBlendMode2[PdfBlendMode2["Darken"] = 4] = "Darken";
  PdfBlendMode2[PdfBlendMode2["Lighten"] = 5] = "Lighten";
  PdfBlendMode2[PdfBlendMode2["ColorDodge"] = 6] = "ColorDodge";
  PdfBlendMode2[PdfBlendMode2["ColorBurn"] = 7] = "ColorBurn";
  PdfBlendMode2[PdfBlendMode2["HardLight"] = 8] = "HardLight";
  PdfBlendMode2[PdfBlendMode2["SoftLight"] = 9] = "SoftLight";
  PdfBlendMode2[PdfBlendMode2["Difference"] = 10] = "Difference";
  PdfBlendMode2[PdfBlendMode2["Exclusion"] = 11] = "Exclusion";
  PdfBlendMode2[PdfBlendMode2["Hue"] = 12] = "Hue";
  PdfBlendMode2[PdfBlendMode2["Saturation"] = 13] = "Saturation";
  PdfBlendMode2[PdfBlendMode2["Color"] = 14] = "Color";
  PdfBlendMode2[PdfBlendMode2["Luminosity"] = 15] = "Luminosity";
  return PdfBlendMode2;
})(PdfBlendMode || {});
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
var PdfAnnotationSubtype = /* @__PURE__ */ ((PdfAnnotationSubtype2) => {
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["UNKNOWN"] = 0] = "UNKNOWN";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["TEXT"] = 1] = "TEXT";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["LINK"] = 2] = "LINK";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["FREETEXT"] = 3] = "FREETEXT";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["LINE"] = 4] = "LINE";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["SQUARE"] = 5] = "SQUARE";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["CIRCLE"] = 6] = "CIRCLE";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["POLYGON"] = 7] = "POLYGON";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["POLYLINE"] = 8] = "POLYLINE";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["HIGHLIGHT"] = 9] = "HIGHLIGHT";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["UNDERLINE"] = 10] = "UNDERLINE";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["SQUIGGLY"] = 11] = "SQUIGGLY";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["STRIKEOUT"] = 12] = "STRIKEOUT";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["STAMP"] = 13] = "STAMP";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["CARET"] = 14] = "CARET";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["INK"] = 15] = "INK";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["POPUP"] = 16] = "POPUP";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["FILEATTACHMENT"] = 17] = "FILEATTACHMENT";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["SOUND"] = 18] = "SOUND";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["MOVIE"] = 19] = "MOVIE";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["WIDGET"] = 20] = "WIDGET";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["SCREEN"] = 21] = "SCREEN";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["PRINTERMARK"] = 22] = "PRINTERMARK";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["TRAPNET"] = 23] = "TRAPNET";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["WATERMARK"] = 24] = "WATERMARK";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["THREED"] = 25] = "THREED";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["RICHMEDIA"] = 26] = "RICHMEDIA";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["XFAWIDGET"] = 27] = "XFAWIDGET";
  PdfAnnotationSubtype2[PdfAnnotationSubtype2["REDACT"] = 28] = "REDACT";
  return PdfAnnotationSubtype2;
})(PdfAnnotationSubtype || {});
var AppearanceMode = /* @__PURE__ */ ((AppearanceMode2) => {
  AppearanceMode2[AppearanceMode2["Normal"] = 0] = "Normal";
  AppearanceMode2[AppearanceMode2["Rollover"] = 1] = "Rollover";
  AppearanceMode2[AppearanceMode2["Down"] = 2] = "Down";
  return AppearanceMode2;
})(AppearanceMode || {});
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
var PdfErrorCode = /* @__PURE__ */ ((PdfErrorCode2) => {
  PdfErrorCode2[PdfErrorCode2["Ok"] = 0] = "Ok";
  PdfErrorCode2[PdfErrorCode2["Unknown"] = 1] = "Unknown";
  PdfErrorCode2[PdfErrorCode2["NotFound"] = 2] = "NotFound";
  PdfErrorCode2[PdfErrorCode2["WrongFormat"] = 3] = "WrongFormat";
  PdfErrorCode2[PdfErrorCode2["Password"] = 4] = "Password";
  PdfErrorCode2[PdfErrorCode2["Security"] = 5] = "Security";
  PdfErrorCode2[PdfErrorCode2["PageError"] = 6] = "PageError";
  PdfErrorCode2[PdfErrorCode2["XFALoad"] = 7] = "XFALoad";
  PdfErrorCode2[PdfErrorCode2["XFALayout"] = 8] = "XFALayout";
  PdfErrorCode2[PdfErrorCode2["Cancelled"] = 9] = "Cancelled";
  PdfErrorCode2[PdfErrorCode2["Initialization"] = 10] = "Initialization";
  PdfErrorCode2[PdfErrorCode2["NotReady"] = 11] = "NotReady";
  PdfErrorCode2[PdfErrorCode2["NotSupport"] = 12] = "NotSupport";
  PdfErrorCode2[PdfErrorCode2["LoadDoc"] = 13] = "LoadDoc";
  PdfErrorCode2[PdfErrorCode2["DocNotOpen"] = 14] = "DocNotOpen";
  PdfErrorCode2[PdfErrorCode2["CantCloseDoc"] = 15] = "CantCloseDoc";
  PdfErrorCode2[PdfErrorCode2["CantCreateNewDoc"] = 16] = "CantCreateNewDoc";
  PdfErrorCode2[PdfErrorCode2["CantImportPages"] = 17] = "CantImportPages";
  PdfErrorCode2[PdfErrorCode2["CantCreateAnnot"] = 18] = "CantCreateAnnot";
  PdfErrorCode2[PdfErrorCode2["CantSetAnnotRect"] = 19] = "CantSetAnnotRect";
  PdfErrorCode2[PdfErrorCode2["CantSetAnnotContent"] = 20] = "CantSetAnnotContent";
  PdfErrorCode2[PdfErrorCode2["CantRemoveInkList"] = 21] = "CantRemoveInkList";
  PdfErrorCode2[PdfErrorCode2["CantAddInkStoke"] = 22] = "CantAddInkStoke";
  PdfErrorCode2[PdfErrorCode2["CantReadAttachmentSize"] = 23] = "CantReadAttachmentSize";
  PdfErrorCode2[PdfErrorCode2["CantReadAttachmentContent"] = 24] = "CantReadAttachmentContent";
  PdfErrorCode2[PdfErrorCode2["CantFocusAnnot"] = 25] = "CantFocusAnnot";
  PdfErrorCode2[PdfErrorCode2["CantSelectText"] = 26] = "CantSelectText";
  PdfErrorCode2[PdfErrorCode2["CantSelectOption"] = 27] = "CantSelectOption";
  PdfErrorCode2[PdfErrorCode2["CantCheckField"] = 28] = "CantCheckField";
  return PdfErrorCode2;
})(PdfErrorCode || {});
var PdfTaskHelper = class {
  /**
   * Create a task
   * @returns new task
   */
  static create() {
    return new Task();
  }
  /**
   * Create a task that has been resolved with value
   * @param result - resolved value
   * @returns resolved task
   */
  static resolve(result) {
    const task = new Task();
    task.resolve(result);
    return task;
  }
  /**
   * Create a task that has been rejected with error
   * @param reason - rejected error
   * @returns rejected task
   */
  static reject(reason) {
    const task = new Task();
    task.reject(reason);
    return task;
  }
  /**
   * Create a task that has been aborted with error
   * @param reason - aborted error
   * @returns aborted task
   */
  static abort(reason) {
    const task = new Task();
    task.reject(reason);
    return task;
  }
};
function ignore() {
}

// src/lib/actions.ts
var SET_ANNOTATIONS = "ANNOTATION/SET_ANNOTATIONS";
var REINDEX_PAGE_ANNOTATIONS = "ANNOTATION/REINDEX_PAGE";
var SELECT_ANNOTATION = "ANNOTATION/SELECT_ANNOTATION";
var DESELECT_ANNOTATION = "ANNOTATION/DESELECT_ANNOTATION";
var UPDATE_TOOL_DEFAULTS = "ANNOTATION/UPDATE_TOOL_DEFAULTS";
var ADD_COLOR_PRESET = "ANNOTATION/ADD_COLOR_PRESET";
var CREATE_ANNOTATION = "ANNOTATION/CREATE_ANNOTATION";
var PATCH_ANNOTATION = "ANNOTATION/PATCH_ANNOTATION";
var DELETE_ANNOTATION = "ANNOTATION/DELETE_ANNOTATION";
var COMMIT_PENDING_CHANGES = "ANNOTATION/COMMIT";
var STORE_PDF_ID = "ANNOTATION/STORE_PDF_ID";
var PURGE_ANNOTATION = "ANNOTATION/PURGE_ANNOTATION";
var SET_ACTIVE_VARIANT = "ANNOTATION/SET_ACTIVE_VARIANT";
var setAnnotations = (p2) => ({
  type: SET_ANNOTATIONS,
  payload: p2
});
var reindexPageAnnotations = (pageIndex) => ({
  type: REINDEX_PAGE_ANNOTATIONS,
  payload: { pageIndex }
});
var selectAnnotation = (pageIndex, localId) => ({
  type: SELECT_ANNOTATION,
  payload: { pageIndex, localId }
});
var deselectAnnotation = () => ({ type: DESELECT_ANNOTATION });
var updateToolDefaults = (variantKey, patch) => ({ type: UPDATE_TOOL_DEFAULTS, payload: { variantKey, patch } });
var addColorPreset = (c) => ({
  type: ADD_COLOR_PRESET,
  payload: c
});
var createAnnotation = (pageIndex, localId, annotation) => ({
  type: CREATE_ANNOTATION,
  payload: { pageIndex, localId, annotation }
});
var patchAnnotation = (pageIndex, localId, patch) => ({
  type: PATCH_ANNOTATION,
  payload: { pageIndex, localId, patch }
});
var deleteAnnotation = (pageIndex, localId) => ({
  type: DELETE_ANNOTATION,
  payload: { pageIndex, localId }
});
var commitPendingChanges = () => ({ type: COMMIT_PENDING_CHANGES });
var storePdfId = (uid, pdfId) => ({
  type: STORE_PDF_ID,
  payload: { uid, pdfId }
});
var purgeAnnotation = (uid) => ({
  type: PURGE_ANNOTATION,
  payload: { uid }
});
var setActiveVariant = (k2) => ({
  type: SET_ACTIVE_VARIANT,
  payload: k2
});

// src/lib/utils.ts
var makeUid = (pageIndex, localId) => `p${pageIndex}#${localId}`;
var parseUid = (uid) => {
  const [pg, rest] = uid.slice(1).split("#");
  return { pageIndex: Number(pg), localId: Number(rest) };
};

// src/lib/selectors.ts
var makeUid2 = (page, id) => `p${page}#${id}`;
var getAnnotationsByPageIndex = (s, page) => (s.pages[page] ?? []).map((uid) => s.byUid[uid]);
var getAnnotations = (s) => {
  const out = {};
  for (const p2 of Object.keys(s.pages).map(Number)) out[p2] = getAnnotationsByPageIndex(s, p2);
  return out;
};
var getSelectedAnnotation = (s) => s.selectedUid ? s.byUid[s.selectedUid] : null;
var getSelectedAnnotationWithPageIndex = (s) => {
  if (!s.selectedUid) return null;
  const { pageIndex, localId } = parseUid(s.selectedUid);
  return { pageIndex, localId, annotation: s.byUid[s.selectedUid].object };
};
var getSelectedAnnotationByPageIndex = (s, pageIndex) => {
  if (!s.selectedUid) return null;
  const pageUids = s.pages[pageIndex] ?? [];
  if (pageUids.includes(s.selectedUid)) {
    return s.byUid[s.selectedUid];
  }
  return null;
};
var isInAnnotationVariant = (s) => s.activeVariant !== null;
var getSelectedAnnotationVariant = (s) => s.activeVariant;
var isAnnotationSelected = (s, page, id) => s.selectedUid === makeUid2(page, id);

// src/lib/variant-key.ts
var makeVariantKey = (subtype, intent) => intent ? `${subtype}#${intent}` : `${subtype}`;
var parseVariantKey = (key) => {
  const [subStr, intent] = key.split("#");
  return { subtype: Number(subStr), intent };
};
var variantKeyFromAnnotation = (a) => makeVariantKey(a.type, a.intent);

// src/lib/annotation-plugin.ts
var AnnotationPlugin = class extends w2 {
  constructor(id, registry, engine, config) {
    super(id, registry);
    this.ANNOTATION_HISTORY_TOPIC = "annotations";
    this.state$ = C();
    this.modeByVariant = /* @__PURE__ */ new Map();
    this.variantByMode = /* @__PURE__ */ new Map();
    this.activeVariantChange$ = C();
    this.activeTool$ = C({
      variantKey: null,
      defaults: null
    });
    this.engine = engine;
    this.config = config;
    const selection = registry.getPlugin("selection");
    this.selection = selection?.provides() ?? null;
    const history = registry.getPlugin("history");
    this.history = history?.provides() ?? null;
    const interactionManager = registry.getPlugin("interaction-manager");
    this.interactionManager = interactionManager?.provides() ?? null;
    this.coreStore.onAction(f, (_action, state) => {
      const doc = state.core.document;
      if (doc) {
        this.getAllAnnotations(doc);
      }
    });
  }
  async initialize() {
    for (const [variantKey, defaults] of Object.entries(this.state.toolDefaults)) {
      this.registerTool(variantKey, defaults);
    }
    this.history?.onHistoryChange((topic) => {
      if (topic === this.ANNOTATION_HISTORY_TOPIC && this.config.autoCommit !== false) {
        this.commit();
      }
    });
    this.interactionManager?.onModeChange((s) => {
      const newVariant = this.variantByMode.get(s.activeMode) ?? null;
      console.log(newVariant, this.state.activeVariant);
      if (newVariant !== this.state.activeVariant) {
        this.dispatch(setActiveVariant(newVariant));
        this.activeVariantChange$.emit(newVariant);
      }
    });
    this.selection?.onEndSelection(() => {
      if (!this.state.activeVariant) return;
      if (!(this.state.activeVariant === makeVariantKey(PdfAnnotationSubtype.HIGHLIGHT) || this.state.activeVariant === makeVariantKey(PdfAnnotationSubtype.UNDERLINE) || this.state.activeVariant === makeVariantKey(PdfAnnotationSubtype.STRIKEOUT) || this.state.activeVariant === makeVariantKey(PdfAnnotationSubtype.SQUIGGLY))) {
        return;
      }
      const formattedSelection = this.selection?.getFormattedSelection();
      if (!formattedSelection) return;
      for (const selection of formattedSelection) {
        const rect = selection.rect;
        const segmentRects = selection.segmentRects;
        const type = this.state.activeVariant;
        const subtype = this.state.toolDefaults[type].subtype;
        const color = this.state.toolDefaults[type].color;
        const opacity = this.state.toolDefaults[type].opacity;
        const blendMode = this.state.toolDefaults[type].blendMode ?? PdfBlendMode.Normal;
        this.createAnnotation(selection.pageIndex, {
          type: subtype,
          rect,
          segmentRects,
          color,
          opacity,
          blendMode,
          pageIndex: selection.pageIndex,
          id: Date.now() + Math.random()
        });
      }
      this.selection?.clear();
    });
  }
  registerTool(variantKey, defaults) {
    const modeId = defaults.interaction.mode;
    const interactionMode = {
      id: modeId,
      scope: "page",
      exclusive: defaults.interaction.exclusive,
      cursor: defaults.interaction.cursor
    };
    this.interactionManager?.registerMode(interactionMode);
    if (defaults.textSelection) {
      this.selection?.enableForMode(modeId);
    }
    this.modeByVariant.set(variantKey, modeId);
    this.variantByMode.set(modeId, variantKey);
  }
  buildCapability() {
    return {
      getPageAnnotations: (options) => {
        return this.getPageAnnotations(options);
      },
      getSelectedAnnotation: () => {
        return getSelectedAnnotation(this.state);
      },
      selectAnnotation: (pageIndex, annotationId) => {
        this.selectAnnotation(pageIndex, annotationId);
      },
      deselectAnnotation: () => {
        this.dispatch(deselectAnnotation());
      },
      getActiveVariant: () => {
        return this.state.activeVariant;
      },
      setActiveVariant: (variantKey) => {
        if (variantKey === this.state.activeVariant) return;
        if (variantKey) {
          const mode = this.modeByVariant.get(variantKey);
          if (!mode) throw new Error(`Mode missing for variant ${variantKey}`);
          this.interactionManager?.activate(mode);
        } else {
          this.interactionManager?.activate("default");
        }
      },
      getToolDefaults: (variantKey) => {
        const defaults = this.state.toolDefaults[variantKey];
        if (!defaults) {
          throw new Error(`No defaults found for variant: ${variantKey}`);
        }
        return defaults;
      },
      getToolDefaultsBySubtypeAndIntent: (subtype, intent) => {
        const variantKey = makeVariantKey(subtype, intent);
        const defaults = this.state.toolDefaults[variantKey];
        if (!defaults) {
          throw new Error(`No defaults found for variant: ${variantKey}`);
        }
        return defaults;
      },
      getToolDefaultsBySubtype: (subtype) => {
        const defaults = this.state.toolDefaults[subtype];
        if (!defaults) {
          throw new Error(`No defaults found for subtype: ${subtype}`);
        }
        return defaults;
      },
      setToolDefaults: (variantKey, patch) => {
        this.dispatch(updateToolDefaults(variantKey, patch));
      },
      getColorPresets: () => [...this.state.colorPresets],
      addColorPreset: (color) => this.dispatch(addColorPreset(color)),
      createAnnotation: (pageIndex, annotation) => this.createAnnotation(pageIndex, annotation),
      updateAnnotation: (pageIndex, localId, patch) => this.updateAnnotation(pageIndex, localId, patch),
      deleteAnnotation: (pageIndex, localId) => this.deleteAnnotation(pageIndex, localId),
      renderAnnotation: (options) => this.renderAnnotation(options),
      onStateChange: this.state$.on,
      onActiveVariantChange: this.activeVariantChange$.on,
      onActiveToolChange: this.activeTool$.on,
      commit: () => this.commit()
    };
  }
  createActiveTool(mode, toolDefaults) {
    if (mode === null) {
      return { variantKey: null, defaults: null };
    }
    return { variantKey: mode, defaults: toolDefaults[mode] };
  }
  emitActiveTool(state) {
    const activeTool = this.createActiveTool(state.activeVariant, state.toolDefaults);
    this.activeTool$.emit(activeTool);
  }
  onStoreUpdated(prev, next) {
    this.state$.emit(next);
    if (prev.activeVariant !== next.activeVariant || prev.toolDefaults[prev.activeVariant ?? PdfAnnotationSubtype.HIGHLIGHT] !== next.toolDefaults[next.activeVariant ?? PdfAnnotationSubtype.HIGHLIGHT]) {
      this.emitActiveTool(next);
    }
  }
  getAllAnnotations(doc) {
    const task = this.engine.getAllAnnotations(doc);
    task.wait((annotations) => this.dispatch(setAnnotations(annotations)), ignore);
  }
  getPageAnnotations(options) {
    const { pageIndex } = options;
    const doc = this.coreState.core.document;
    if (!doc) {
      return PdfTaskHelper.reject({ code: PdfErrorCode.NotFound, message: "Document not found" });
    }
    const page = doc.pages.find((p2) => p2.index === pageIndex);
    if (!page) {
      return PdfTaskHelper.reject({ code: PdfErrorCode.NotFound, message: "Page not found" });
    }
    return this.engine.getPageAnnotations(doc, page);
  }
  renderAnnotation({
    pageIndex,
    annotation,
    scaleFactor = 1,
    rotation = Rotation.Degree0,
    dpr = 1,
    mode = AppearanceMode.Normal,
    imageType = "image/webp"
  }) {
    const coreState = this.coreState.core;
    if (!coreState.document) {
      throw new Error("document does not open");
    }
    const page = coreState.document.pages.find((page2) => page2.index === pageIndex);
    if (!page) {
      throw new Error("page does not exist");
    }
    return this.engine.renderAnnotation(
      coreState.document,
      page,
      annotation,
      scaleFactor,
      rotation,
      dpr,
      mode,
      imageType
    );
  }
  selectAnnotation(pageIndex, annotationId) {
    this.dispatch(selectAnnotation(pageIndex, annotationId));
  }
  createAnnotation(pageIndex, annotation) {
    const localId = annotation.id;
    const execute = () => this.dispatch(createAnnotation(pageIndex, localId, annotation));
    if (!this.history) {
      execute();
      if (this.config.autoCommit) this.commit();
      return;
    }
    const command = {
      execute,
      undo: () => {
        this.dispatch(deselectAnnotation());
        this.dispatch(deleteAnnotation(pageIndex, localId));
      }
    };
    this.history.register(command, this.ANNOTATION_HISTORY_TOPIC);
  }
  updateAnnotation(pageIndex, localId, patch) {
    if (!this.history) {
      this.dispatch(patchAnnotation(pageIndex, localId, patch));
      if (this.config.autoCommit !== false) {
        this.commit();
      }
      return;
    }
    const originalObject = this.state.byUid[makeUid(pageIndex, localId)].object;
    const originalPatch = Object.fromEntries(
      Object.keys(patch).map((key) => [key, originalObject[key]])
    );
    const command = {
      execute: () => this.dispatch(patchAnnotation(pageIndex, localId, patch)),
      undo: () => this.dispatch(patchAnnotation(pageIndex, localId, originalPatch))
    };
    this.history.register(command, this.ANNOTATION_HISTORY_TOPIC);
  }
  deleteAnnotation(pageIndex, localId) {
    if (!this.history) {
      this.dispatch(deselectAnnotation());
      this.dispatch(deleteAnnotation(pageIndex, localId));
      if (this.config.autoCommit !== false) {
        this.commit();
      }
      return;
    }
    const originalAnnotation = this.state.byUid[makeUid(pageIndex, localId)].object;
    const command = {
      execute: () => {
        this.dispatch(deselectAnnotation());
        this.dispatch(deleteAnnotation(pageIndex, localId));
      },
      undo: () => this.dispatch(createAnnotation(pageIndex, localId, originalAnnotation))
    };
    this.history.register(command, this.ANNOTATION_HISTORY_TOPIC);
  }
  commit() {
    const task = new Task();
    if (!this.state.hasPendingChanges) return PdfTaskHelper.resolve(true);
    const doc = this.coreState.core.document;
    if (!doc)
      return PdfTaskHelper.reject({ code: PdfErrorCode.NotFound, message: "Document not found" });
    const creations = [];
    const updates = [];
    const deletionsByPage = /* @__PURE__ */ new Map();
    const affectedPages = /* @__PURE__ */ new Set();
    for (const [uid, ta] of Object.entries(this.state.byUid)) {
      if (ta.commitState === "synced") continue;
      const { pageIndex } = parseUid(uid);
      const page = doc.pages.find((p2) => p2.index === pageIndex);
      if (!page) continue;
      affectedPages.add(pageIndex);
      switch (ta.commitState) {
        case "new":
          const task2 = this.engine.createPageAnnotation(doc, page, ta.object);
          task2.wait((annoId) => this.dispatch(storePdfId(uid, annoId)), ignore);
          creations.push(task2);
          break;
        case "dirty":
          updates.push(
            this.engine.updatePageAnnotation(doc, page, { ...ta.object, id: ta.pdfId })
          );
          break;
        case "deleted":
          if (!deletionsByPage.has(pageIndex)) {
            deletionsByPage.set(pageIndex, []);
          }
          deletionsByPage.get(pageIndex).push({ ta, uid });
          break;
      }
    }
    const deletionTasks = [];
    for (const [pageIndex, deletions] of deletionsByPage.entries()) {
      const page = doc.pages.find((p2) => p2.index === pageIndex);
      deletions.sort((a, b3) => (b3.ta.pdfId ?? -1) - (a.ta.pdfId ?? -1));
      for (const { ta, uid } of deletions) {
        if (ta.pdfId !== void 0) {
          const task2 = new Task();
          const removeTask = this.engine.removePageAnnotation(doc, page, {
            ...ta.object,
            id: ta.pdfId
          });
          removeTask.wait(() => {
            this.dispatch(purgeAnnotation(uid));
            task2.resolve(true);
          }, task2.fail);
          deletionTasks.push(task2);
        } else {
          this.dispatch(purgeAnnotation(uid));
        }
      }
    }
    const allWriteTasks = [...creations, ...updates, ...deletionTasks];
    Task.allSettled(allWriteTasks).wait(() => {
      for (const pageIndex of affectedPages) {
        this.dispatch(reindexPageAnnotations(pageIndex));
      }
      this.dispatch(commitPendingChanges());
      task.resolve(true);
    }, task.fail);
    return task;
  }
};
AnnotationPlugin.id = "annotation";

// src/lib/reducer.ts
var DEFAULT_COLORS = [
  "#E44234",
  "#FF8D00",
  "#FFCD45",
  "#5CC96E",
  "#25D2D1",
  "#597CE2",
  "#C544CE",
  "#7D2E25"
];
var patchAnno = (state, uid, patch) => {
  const prev = state.byUid[uid];
  if (!prev) return state;
  return {
    ...state,
    byUid: {
      ...state.byUid,
      [uid]: {
        ...prev,
        commitState: prev.commitState === "synced" ? "dirty" : prev.commitState,
        object: { ...prev.object, ...patch }
      }
    },
    hasPendingChanges: true
  };
};
var initialState = (cfg) => ({
  pages: {},
  byUid: {},
  selectedUid: null,
  activeVariant: null,
  toolDefaults: {
    [makeVariantKey(PdfAnnotationSubtype.HIGHLIGHT)]: {
      name: "Highlight",
      subtype: PdfAnnotationSubtype.HIGHLIGHT,
      interaction: { mode: "highlight", exclusive: false },
      textSelection: true,
      color: "#FFCD45",
      opacity: 1,
      blendMode: PdfBlendMode.Multiply
    },
    [makeVariantKey(PdfAnnotationSubtype.UNDERLINE)]: {
      name: "Underline",
      subtype: PdfAnnotationSubtype.UNDERLINE,
      interaction: { mode: "underline", exclusive: false },
      textSelection: true,
      color: "#E44234",
      opacity: 1,
      blendMode: PdfBlendMode.Normal
    },
    [makeVariantKey(PdfAnnotationSubtype.STRIKEOUT)]: {
      name: "Strikeout",
      subtype: PdfAnnotationSubtype.STRIKEOUT,
      interaction: { mode: "strikeout", exclusive: false },
      textSelection: true,
      color: "#E44234",
      opacity: 1,
      blendMode: PdfBlendMode.Normal
    },
    [makeVariantKey(PdfAnnotationSubtype.SQUIGGLY)]: {
      name: "Squiggly",
      subtype: PdfAnnotationSubtype.SQUIGGLY,
      interaction: { mode: "squiggly", exclusive: false },
      textSelection: true,
      color: "#E44234",
      opacity: 1,
      blendMode: PdfBlendMode.Normal
    },
    [makeVariantKey(PdfAnnotationSubtype.INK)]: {
      name: "Ink",
      subtype: PdfAnnotationSubtype.INK,
      interaction: { mode: "ink", exclusive: true, cursor: "crosshair" },
      color: "#E44234",
      opacity: 1,
      strokeWidth: 11,
      blendMode: PdfBlendMode.Normal
    },
    [makeVariantKey(PdfAnnotationSubtype.INK, "InkHighlight")]: {
      name: "Ink Highlight",
      subtype: PdfAnnotationSubtype.INK,
      interaction: { mode: "inkHighlight", exclusive: true, cursor: "crosshair" },
      color: "#E44234",
      opacity: 1,
      strokeWidth: 11,
      blendMode: PdfBlendMode.Multiply
    },
    ...cfg.toolDefaults
  },
  colorPresets: cfg.colorPresets ?? DEFAULT_COLORS,
  hasPendingChanges: false
});
var reducer = (state, action) => {
  switch (action.type) {
    /* ───── bulk load from engine ───── */
    case SET_ANNOTATIONS: {
      const newPages = { ...state.pages };
      const newByUid = { ...state.byUid };
      for (const [pgStr, list] of Object.entries(action.payload)) {
        const pageIndex = Number(pgStr);
        const oldUidsOnPage = state.pages[pageIndex] || [];
        for (const uid of oldUidsOnPage) {
          delete newByUid[uid];
        }
        const newUidsOnPage = list.map((a, index) => {
          const localId = Date.now() + Math.random() + index;
          const uid = makeUid(pageIndex, localId);
          newByUid[uid] = { localId, pdfId: a.id, commitState: "synced", object: a };
          return uid;
        });
        newPages[pageIndex] = newUidsOnPage;
      }
      return { ...state, pages: newPages, byUid: newByUid };
    }
    /* ───── GUI bits ───── */
    case SET_ACTIVE_VARIANT:
      return { ...state, activeVariant: action.payload };
    case SELECT_ANNOTATION:
      return {
        ...state,
        selectedUid: makeUid(action.payload.pageIndex, action.payload.localId)
      };
    case DESELECT_ANNOTATION:
      return { ...state, selectedUid: null };
    case ADD_COLOR_PRESET:
      return state.colorPresets.includes(action.payload) ? state : { ...state, colorPresets: [...state.colorPresets, action.payload] };
    case UPDATE_TOOL_DEFAULTS: {
      const { variantKey, patch } = action.payload;
      const prev = state.toolDefaults[variantKey];
      if (!prev) return state;
      return {
        ...state,
        toolDefaults: {
          ...state.toolDefaults,
          [variantKey]: { ...prev, ...patch }
        }
      };
    }
    /* ───── create ───── */
    case CREATE_ANNOTATION: {
      const { pageIndex, localId, annotation } = action.payload;
      const uid = makeUid(pageIndex, localId);
      return {
        ...state,
        pages: { ...state.pages, [pageIndex]: [...state.pages[pageIndex] ?? [], uid] },
        byUid: {
          ...state.byUid,
          [uid]: { localId, pdfId: void 0, commitState: "new", object: annotation }
        },
        hasPendingChanges: true
      };
    }
    /* ───── delete ───── */
    case DELETE_ANNOTATION: {
      const { pageIndex, localId } = action.payload;
      const uid = makeUid(pageIndex, localId);
      if (!state.byUid[uid]) return state;
      return {
        ...state,
        pages: {
          ...state.pages,
          [pageIndex]: (state.pages[pageIndex] ?? []).filter((u2) => u2 !== uid)
        },
        byUid: {
          ...state.byUid,
          [uid]: { ...state.byUid[uid], commitState: "deleted" }
        },
        hasPendingChanges: true
      };
    }
    /* ───── field edits ───── */
    case PATCH_ANNOTATION: {
      const uid = makeUid(action.payload.pageIndex, action.payload.localId);
      return patchAnno(state, uid, action.payload.patch);
    }
    /* ───── commit bookkeeping ───── */
    case COMMIT_PENDING_CHANGES: {
      const cleaned = {};
      for (const [uid, ta] of Object.entries(state.byUid)) {
        cleaned[uid] = {
          ...ta,
          commitState: ta.commitState === "dirty" || ta.commitState === "new" ? "synced" : ta.commitState
        };
      }
      return { ...state, byUid: cleaned, hasPendingChanges: false };
    }
    case REINDEX_PAGE_ANNOTATIONS: {
      const { pageIndex } = action.payload;
      const newByUid = { ...state.byUid };
      const uidsOnPage = state.pages[pageIndex] || [];
      const annosOnPage = uidsOnPage.map((uid) => state.byUid[uid]).filter((ta) => ta && ta.commitState !== "deleted");
      annosOnPage.sort((a, b3) => (a.pdfId ?? Infinity) - (b3.pdfId ?? Infinity));
      annosOnPage.forEach((ta, newPdfId) => {
        const uid = makeUid(pageIndex, ta.localId);
        newByUid[uid] = { ...newByUid[uid], pdfId: newPdfId };
      });
      return { ...state, byUid: newByUid };
    }
    case STORE_PDF_ID: {
      const { uid, pdfId } = action.payload;
      const ta = state.byUid[uid];
      if (!ta) return state;
      return {
        ...state,
        byUid: {
          ...state.byUid,
          [uid]: { ...ta, pdfId, commitState: "synced" }
        }
      };
    }
    case PURGE_ANNOTATION: {
      const { uid } = action.payload;
      const { [uid]: _gone, ...rest } = state.byUid;
      return { ...state, byUid: rest };
    }
    default:
      return state;
  }
};

// src/lib/index.ts
var AnnotationPluginPackage = {
  manifest,
  create: (registry, engine, config) => new AnnotationPlugin(ANNOTATION_PLUGIN_ID, registry, engine, config),
  reducer,
  initialState: (_2, config) => initialState(config)
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ANNOTATION_PLUGIN_ID,
  AnnotationPlugin,
  AnnotationPluginPackage,
  getAnnotations,
  getAnnotationsByPageIndex,
  getSelectedAnnotation,
  getSelectedAnnotationByPageIndex,
  getSelectedAnnotationVariant,
  getSelectedAnnotationWithPageIndex,
  isAnnotationSelected,
  isInAnnotationVariant,
  makeVariantKey,
  manifest,
  parseVariantKey,
  variantKeyFromAnnotation
});
//# sourceMappingURL=index.cjs.map