// ../core/dist/preact/index.js
import { createContext as b } from "preact";

// ../core/dist/jsxRuntime.module-Bzuv3cXw.js
import { options as i } from "preact";

// ../core/dist/preact/index.js
import { useState as a, useRef as m, useEffect as f, useContext as S } from "preact/hooks";

// ../core/dist/math-ChSRQF3r.js
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
  (i2, e) => (i2[e.id] = e, i2),
  {}
);
P.reduce((i2, e) => (i2[e.css] = e.id, i2), {});
P.map((i2) => ({
  value: i2.id,
  label: i2.label
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
  (i2, [e, t2]) => (i2[t2] = Number(e), i2),
  {}
);

// ../core/dist/preact/index.js
var P2 = b({
  registry: null,
  isInitializing: true,
  pluginsReady: false
});
function g() {
  const t2 = S(P2);
  if (t2 === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: r, isInitializing: e } = t2;
  if (e)
    return t2;
  if (r === null)
    throw new Error("PDF registry failed to initialize properly");
  return t2;
}
function h(t2) {
  const { registry: r } = g();
  if (r === null)
    return {
      plugin: null,
      isLoading: true,
      ready: new Promise(() => {
      })
    };
  const e = r.getPlugin(t2);
  if (!e)
    throw new Error(`Plugin ${t2} not found`);
  return {
    plugin: e,
    isLoading: false,
    ready: e.ready()
  };
}
function L2(t2) {
  const { plugin: r, isLoading: e, ready: i2 } = h(t2);
  if (!r)
    return {
      provides: null,
      isLoading: e,
      ready: i2
    };
  if (!r.provides)
    throw new Error(`Plugin ${t2} does not provide a capability`);
  return {
    provides: r.provides(),
    isLoading: e,
    ready: i2
  };
}

// dist/index.js
var f2 = "SET_DOCUMENT";
var z2 = "\xAD";
var M2 = "\u200B";
var L3 = "\u2060";
var $2 = "\uFEFF";
var F2 = "\uFFFE";
var N2 = "\uFFFF";
var k2 = Object.freeze([
  z2,
  M2,
  L3,
  $2,
  F2,
  N2
]);
new RegExp(`[${k2.join("")}]`, "g");
var P3 = Object.freeze([
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
P3.reduce(
  (i2, e) => (i2[e.id] = e, i2),
  {}
);
P3.reduce((i2, e) => (i2[e.css] = e.id, i2), {});
P3.map((i2) => ({
  value: i2.id,
  label: i2.label
}));
var _2 = Object.freeze({
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
  _2
).reduce(
  (i2, [e, t2]) => (i2[t2] = Number(e), i2),
  {}
);
function v2(i2, e, t2) {
  if (i2 === e)
    return true;
  if (i2 == null || e == null)
    return i2 === e;
  const r = typeof i2;
  if (r !== typeof e) return false;
  if (r === "object") {
    t2 || (t2 = /* @__PURE__ */ new Set());
    const n = x(i2, e);
    if (t2.has(n))
      return true;
    t2.add(n);
    const a5 = Array.isArray(i2), o = Array.isArray(e);
    return a5 && o ? U(i2, e, t2) : !a5 && !o ? B(i2, e, t2) : false;
  }
  return false;
}
function x(i2, e) {
  return `${S2(i2)}__${S2(e)}`;
}
var G = 0;
var d = /* @__PURE__ */ new WeakMap();
function S2(i2) {
  return d.has(i2) || d.set(i2, ++G), d.get(i2);
}
function U(i2, e, t2) {
  if (i2.length !== e.length) return false;
  const r = new Array(e.length).fill(false);
  e: for (let s2 = 0; s2 < i2.length; s2++) {
    const n = i2[s2];
    for (let a5 = 0; a5 < e.length; a5++)
      if (!r[a5] && v2(n, e[a5], t2)) {
        r[a5] = true;
        continue e;
      }
    return false;
  }
  return true;
}
function B(i2, e, t2) {
  const r = Object.keys(i2).sort(), s2 = Object.keys(e).sort();
  if (r.length !== s2.length) return false;
  for (let n = 0; n < r.length; n++)
    if (r[n] !== s2[n]) return false;
  for (const n of r) {
    const a5 = i2[n], o = e[n];
    if (!v2(a5, o, t2))
      return false;
  }
  return true;
}
var w2 = class {
  constructor(t2, e) {
    if (this.id = t2, this.registry = e, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t2 !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t2} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((i2, s2, c2) => {
      this.onStoreUpdated(c2, s2);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((i2, s2, c2) => {
      this.onCoreStoreUpdated(c2, s2);
    }), this.readyPromise = new Promise((i2) => {
      this.readyResolve = i2;
    }), this.readyResolve();
  }
  provides() {
    if (!this._capability) {
      const t2 = this.buildCapability();
      this._capability = Object.freeze(t2);
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
  dispatchCoreAction(t2) {
    return this.coreStore.dispatchToCore(t2);
  }
  /**
   * Dispatch an action to all plugins
   */
  dispatchToAllPlugins(t2) {
    return this.coreStore.dispatch(t2);
  }
  /**
   * Dispatch an action
   */
  dispatch(t2) {
    return this.pluginStore.dispatch(t2);
  }
  /**
   * Dispatch an action with debouncing to prevent rapid repeated calls
   * @param action The action to dispatch
   * @param debounceTime Time in ms to debounce (default: 100ms)
   * @returns boolean indicating whether the action was dispatched or debounced
   */
  debouncedDispatch(t2, e = 100) {
    const i2 = Date.now(), s2 = this.debouncedActions[t2.type] || 0;
    return i2 - s2 >= e ? (this.debouncedActions[t2.type] = i2, this.dispatch(t2), true) : false;
  }
  /**
   * Subscribe to state changes
   */
  subscribe(t2) {
    return this.pluginStore.subscribeToState(t2);
  }
  /**
   * Subscribe to core store changes
   */
  subscribeToCoreStore(t2) {
    return this.coreStore.subscribe(t2);
  }
  /**
   * Called when the plugin store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onStoreUpdated(t2, e) {
  }
  /**
   * Called when the core store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onCoreStoreUpdated(t2, e) {
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
    this.readyPromise = new Promise((t2) => {
      this.readyResolve = t2;
    });
  }
};
var b2 = class {
  constructor(t2, e) {
    this.handler = t2, this.options = e, this.lastRun = 0, this.handle = (i2) => {
      this.options.mode === "debounce" ? this.debounce(i2) : this.throttle(i2);
    };
  }
  debounce(t2) {
    this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(() => {
      this.handler(t2), this.timeoutId = void 0;
    }, this.options.wait);
  }
  throttle(t2) {
    if (this.options.mode === "debounce") return;
    const e = Date.now(), i2 = this.options.throttleMode || "leading-trailing";
    e - this.lastRun >= this.options.wait && (i2 === "leading-trailing" && this.handler(t2), this.lastRun = e), this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(
      () => {
        this.handler(t2), this.lastRun = Date.now(), this.timeoutId = void 0;
      },
      this.options.wait - (e - this.lastRun)
    );
  }
  destroy() {
    this.timeoutId && window.clearTimeout(this.timeoutId);
  }
};
function C(o, t2 = v2) {
  const e = /* @__PURE__ */ new Set(), i2 = /* @__PURE__ */ new Map();
  let s2 = o;
  const c2 = (r) => e.forEach((n) => n(r)), p22 = (r, n) => {
    let a5 = r, d2 = () => {
    };
    if (n) {
      const u2 = new b2(r, n);
      a5 = u2.handle, d2 = () => u2.destroy(), i2.set(r, { wrapped: a5, destroy: d2 });
    }
    return s2 !== void 0 && a5(s2), e.add(a5), () => {
      e.delete(a5), d2(), i2.delete(r);
    };
  };
  return {
    /* emitter behaviour ---------------------------------------- */
    get value() {
      return s2;
    },
    emit(r = void 0) {
      (s2 === void 0 || !t2(s2, r)) && (s2 = r, c2(r));
    },
    on: p22,
    off(r) {
      const n = i2.get(r);
      n ? (e.delete(n.wrapped), n.destroy(), i2.delete(r)) : e.delete(r);
    },
    clear() {
      e.clear(), i2.forEach((r) => r.destroy()), i2.clear();
    },
    /* derived hook --------------------------------------------- */
    select(r, n = v2) {
      return (a5, d2) => {
        let u2;
        if (s2 !== void 0) {
          const h2 = r(s2);
          u2 = h2, a5(h2);
        }
        return p22(
          (h2) => {
            const l22 = r(h2);
            (u2 === void 0 || !n(u2, l22)) && (u2 = l22, a5(l22));
          },
          d2
        );
      };
    }
  };
}
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
var PdfBlendMode = /* @__PURE__ */ ((PdfBlendMode22) => {
  PdfBlendMode22[PdfBlendMode22["Normal"] = 0] = "Normal";
  PdfBlendMode22[PdfBlendMode22["Multiply"] = 1] = "Multiply";
  PdfBlendMode22[PdfBlendMode22["Screen"] = 2] = "Screen";
  PdfBlendMode22[PdfBlendMode22["Overlay"] = 3] = "Overlay";
  PdfBlendMode22[PdfBlendMode22["Darken"] = 4] = "Darken";
  PdfBlendMode22[PdfBlendMode22["Lighten"] = 5] = "Lighten";
  PdfBlendMode22[PdfBlendMode22["ColorDodge"] = 6] = "ColorDodge";
  PdfBlendMode22[PdfBlendMode22["ColorBurn"] = 7] = "ColorBurn";
  PdfBlendMode22[PdfBlendMode22["HardLight"] = 8] = "HardLight";
  PdfBlendMode22[PdfBlendMode22["SoftLight"] = 9] = "SoftLight";
  PdfBlendMode22[PdfBlendMode22["Difference"] = 10] = "Difference";
  PdfBlendMode22[PdfBlendMode22["Exclusion"] = 11] = "Exclusion";
  PdfBlendMode22[PdfBlendMode22["Hue"] = 12] = "Hue";
  PdfBlendMode22[PdfBlendMode22["Saturation"] = 13] = "Saturation";
  PdfBlendMode22[PdfBlendMode22["Color"] = 14] = "Color";
  PdfBlendMode22[PdfBlendMode22["Luminosity"] = 15] = "Luminosity";
  return PdfBlendMode22;
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
  (m22, info) => {
    m22[info.id] = info;
    return m22;
  },
  {}
);
var cssToEnum = BLEND_MODE_INFOS.reduce((m22, info) => {
  m22[info.css] = info.id;
  return m22;
}, {});
var blendModeSelectOptions = BLEND_MODE_INFOS.map((info) => ({
  value: info.id,
  label: info.label
}));
var PdfAnnotationSubtype = /* @__PURE__ */ ((PdfAnnotationSubtype22) => {
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["UNKNOWN"] = 0] = "UNKNOWN";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["TEXT"] = 1] = "TEXT";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["LINK"] = 2] = "LINK";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["FREETEXT"] = 3] = "FREETEXT";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["LINE"] = 4] = "LINE";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["SQUARE"] = 5] = "SQUARE";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["CIRCLE"] = 6] = "CIRCLE";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["POLYGON"] = 7] = "POLYGON";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["POLYLINE"] = 8] = "POLYLINE";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["HIGHLIGHT"] = 9] = "HIGHLIGHT";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["UNDERLINE"] = 10] = "UNDERLINE";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["SQUIGGLY"] = 11] = "SQUIGGLY";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["STRIKEOUT"] = 12] = "STRIKEOUT";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["STAMP"] = 13] = "STAMP";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["CARET"] = 14] = "CARET";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["INK"] = 15] = "INK";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["POPUP"] = 16] = "POPUP";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["FILEATTACHMENT"] = 17] = "FILEATTACHMENT";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["SOUND"] = 18] = "SOUND";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["MOVIE"] = 19] = "MOVIE";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["WIDGET"] = 20] = "WIDGET";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["SCREEN"] = 21] = "SCREEN";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["PRINTERMARK"] = 22] = "PRINTERMARK";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["TRAPNET"] = 23] = "TRAPNET";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["WATERMARK"] = 24] = "WATERMARK";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["THREED"] = 25] = "THREED";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["RICHMEDIA"] = 26] = "RICHMEDIA";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["XFAWIDGET"] = 27] = "XFAWIDGET";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["REDACT"] = 28] = "REDACT";
  return PdfAnnotationSubtype22;
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
var setAnnotations = (p22) => ({
  type: SET_ANNOTATIONS,
  payload: p22
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
var addColorPreset = (c2) => ({
  type: ADD_COLOR_PRESET,
  payload: c2
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
var setActiveVariant = (k22) => ({
  type: SET_ACTIVE_VARIANT,
  payload: k22
});
var makeUid = (pageIndex, localId) => `p${pageIndex}#${localId}`;
var parseUid = (uid) => {
  const [pg, rest] = uid.slice(1).split("#");
  return { pageIndex: Number(pg), localId: Number(rest) };
};
var getAnnotationsByPageIndex = (s2, page) => (s2.pages[page] ?? []).map((uid) => s2.byUid[uid]);
var getSelectedAnnotation = (s2) => s2.selectedUid ? s2.byUid[s2.selectedUid] : null;
var getSelectedAnnotationByPageIndex = (s2, pageIndex) => {
  if (!s2.selectedUid) return null;
  const pageUids = s2.pages[pageIndex] ?? [];
  if (pageUids.includes(s2.selectedUid)) {
    return s2.byUid[s2.selectedUid];
  }
  return null;
};
var makeVariantKey = (subtype, intent) => intent ? `${subtype}#${intent}` : `${subtype}`;
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
    this.coreStore.onAction(f2, (_action, state) => {
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
    this.interactionManager?.onModeChange((s2) => {
      const newVariant = this.variantByMode.get(s2.activeMode) ?? null;
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
    const page = doc.pages.find((p22) => p22.index === pageIndex);
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
      const page = doc.pages.find((p22) => p22.index === pageIndex);
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
      const page = doc.pages.find((p22) => p22.index === pageIndex);
      deletions.sort((a5, b32) => (b32.ta.pdfId ?? -1) - (a5.ta.pdfId ?? -1));
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

// src/preact/hooks/use-annotation.ts
var useAnnotationPlugin = () => h(AnnotationPlugin.id);
var useAnnotationCapability = () => L2(AnnotationPlugin.id);

// ../models/dist/index.js
function restoreOffset(offset, rotation, scaleFactor) {
  let offsetX = offset.x;
  let offsetY = offset.y;
  switch (rotation) {
    case 0:
      offsetX = offset.x / scaleFactor;
      offsetY = offset.y / scaleFactor;
      break;
    case 1:
      offsetX = offset.y / scaleFactor;
      offsetY = -offset.x / scaleFactor;
      break;
    case 2:
      offsetX = -offset.x / scaleFactor;
      offsetY = -offset.y / scaleFactor;
      break;
    case 3:
      offsetX = -offset.y / scaleFactor;
      offsetY = offset.x / scaleFactor;
      break;
  }
  return {
    x: offsetX,
    y: offsetY
  };
}
var PdfSoftHyphenMarker2 = "\xAD";
var PdfZeroWidthSpace2 = "\u200B";
var PdfWordJoiner2 = "\u2060";
var PdfBomOrZwnbsp2 = "\uFEFF";
var PdfNonCharacterFFFE2 = "\uFFFE";
var PdfNonCharacterFFFF2 = "\uFFFF";
var PdfUnwantedTextMarkers2 = Object.freeze([
  PdfSoftHyphenMarker2,
  PdfZeroWidthSpace2,
  PdfWordJoiner2,
  PdfBomOrZwnbsp2,
  PdfNonCharacterFFFE2,
  PdfNonCharacterFFFF2
]);
var PdfUnwantedTextRegex2 = new RegExp(`[${PdfUnwantedTextMarkers2.join("")}]`, "g");
var PdfBlendMode2 = /* @__PURE__ */ ((PdfBlendMode22) => {
  PdfBlendMode22[PdfBlendMode22["Normal"] = 0] = "Normal";
  PdfBlendMode22[PdfBlendMode22["Multiply"] = 1] = "Multiply";
  PdfBlendMode22[PdfBlendMode22["Screen"] = 2] = "Screen";
  PdfBlendMode22[PdfBlendMode22["Overlay"] = 3] = "Overlay";
  PdfBlendMode22[PdfBlendMode22["Darken"] = 4] = "Darken";
  PdfBlendMode22[PdfBlendMode22["Lighten"] = 5] = "Lighten";
  PdfBlendMode22[PdfBlendMode22["ColorDodge"] = 6] = "ColorDodge";
  PdfBlendMode22[PdfBlendMode22["ColorBurn"] = 7] = "ColorBurn";
  PdfBlendMode22[PdfBlendMode22["HardLight"] = 8] = "HardLight";
  PdfBlendMode22[PdfBlendMode22["SoftLight"] = 9] = "SoftLight";
  PdfBlendMode22[PdfBlendMode22["Difference"] = 10] = "Difference";
  PdfBlendMode22[PdfBlendMode22["Exclusion"] = 11] = "Exclusion";
  PdfBlendMode22[PdfBlendMode22["Hue"] = 12] = "Hue";
  PdfBlendMode22[PdfBlendMode22["Saturation"] = 13] = "Saturation";
  PdfBlendMode22[PdfBlendMode22["Color"] = 14] = "Color";
  PdfBlendMode22[PdfBlendMode22["Luminosity"] = 15] = "Luminosity";
  return PdfBlendMode22;
})(PdfBlendMode2 || {});
var MixedBlendMode2 = Symbol("mixed");
var BLEND_MODE_INFOS2 = Object.freeze([
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
var enumToInfo2 = BLEND_MODE_INFOS2.reduce(
  (m5, info) => {
    m5[info.id] = info;
    return m5;
  },
  {}
);
var cssToEnum2 = BLEND_MODE_INFOS2.reduce((m5, info) => {
  m5[info.css] = info.id;
  return m5;
}, {});
function getBlendModeInfo(mode) {
  return enumToInfo2[mode] ?? enumToInfo2[
    0
    /* Normal */
  ];
}
function blendModeToCss(mode) {
  return getBlendModeInfo(mode).css;
}
var blendModeSelectOptions2 = BLEND_MODE_INFOS2.map((info) => ({
  value: info.id,
  label: info.label
}));
var PdfAnnotationSubtype2 = /* @__PURE__ */ ((PdfAnnotationSubtype22) => {
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["UNKNOWN"] = 0] = "UNKNOWN";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["TEXT"] = 1] = "TEXT";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["LINK"] = 2] = "LINK";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["FREETEXT"] = 3] = "FREETEXT";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["LINE"] = 4] = "LINE";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["SQUARE"] = 5] = "SQUARE";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["CIRCLE"] = 6] = "CIRCLE";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["POLYGON"] = 7] = "POLYGON";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["POLYLINE"] = 8] = "POLYLINE";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["HIGHLIGHT"] = 9] = "HIGHLIGHT";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["UNDERLINE"] = 10] = "UNDERLINE";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["SQUIGGLY"] = 11] = "SQUIGGLY";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["STRIKEOUT"] = 12] = "STRIKEOUT";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["STAMP"] = 13] = "STAMP";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["CARET"] = 14] = "CARET";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["INK"] = 15] = "INK";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["POPUP"] = 16] = "POPUP";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["FILEATTACHMENT"] = 17] = "FILEATTACHMENT";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["SOUND"] = 18] = "SOUND";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["MOVIE"] = 19] = "MOVIE";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["WIDGET"] = 20] = "WIDGET";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["SCREEN"] = 21] = "SCREEN";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["PRINTERMARK"] = 22] = "PRINTERMARK";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["TRAPNET"] = 23] = "TRAPNET";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["WATERMARK"] = 24] = "WATERMARK";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["THREED"] = 25] = "THREED";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["RICHMEDIA"] = 26] = "RICHMEDIA";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["XFAWIDGET"] = 27] = "XFAWIDGET";
  PdfAnnotationSubtype22[PdfAnnotationSubtype22["REDACT"] = 28] = "REDACT";
  return PdfAnnotationSubtype22;
})(PdfAnnotationSubtype2 || {});
var PdfAnnotationFlagName2 = Object.freeze({
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
var PdfAnnotationFlagValue2 = Object.entries(
  PdfAnnotationFlagName2
).reduce(
  (acc, [bit, name]) => {
    acc[name] = Number(bit);
    return acc;
  },
  {}
);

// ../plugin-interaction-manager/dist/jsxRuntime.module-D89ud_rY.js
import { options as l } from "preact";

// ../plugin-interaction-manager/dist/preact/index.js
import { useContext as E3, useState as y2, useEffect as a3, useRef as P5, useCallback as M5 } from "preact/hooks";

// ../plugin-interaction-manager/dist/index-Q-vI1_iw.js
var C2 = "\xAD";
var M3 = "\u200B";
var E = "\u2060";
var O = "\uFEFF";
var w = "\uFFFE";
var H = "\uFFFF";
var L4 = Object.freeze([
  C2,
  M3,
  E,
  O,
  w,
  H
]);
new RegExp(`[${L4.join("")}]`, "g");
var u = Object.freeze([
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
u.reduce(
  (e, r) => (e[r.id] = r, e),
  {}
);
u.reduce((e, r) => (e[r.css] = r.id, e), {});
u.map((e) => ({
  value: e.id,
  label: e.label
}));
var N3 = Object.freeze({
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
  N3
).reduce(
  (e, [r, o]) => (e[o] = Number(r), e),
  {}
);

// ../plugin-interaction-manager/dist/preact/index.js
import { createContext as z4 } from "preact";

// ../plugin-interaction-manager/dist/reducer-Dda407Go.js
var M4 = "\xAD";
var H2 = "\u200B";
var T = "\u2060";
var $3 = "\uFEFF";
var R = "\uFFFE";
var I = "\uFFFF";
var P4 = Object.freeze([
  M4,
  H2,
  T,
  $3,
  R,
  I
]);
new RegExp(`[${P4.join("")}]`, "g");
var y = Object.freeze([
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
y.reduce(
  (o, t2) => (o[t2.id] = t2, o),
  {}
);
y.reduce((o, t2) => (o[t2.css] = t2.id, o), {});
y.map((o) => ({
  value: o.id,
  label: o.label
}));
var k3 = Object.freeze({
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
  k3
).reduce(
  (o, [t2, e]) => (o[e] = Number(t2), o),
  {}
);
function g2(o, t2, e) {
  if (o === t2)
    return true;
  if (o == null || t2 == null)
    return o === t2;
  const s2 = typeof o;
  if (s2 !== typeof t2) return false;
  if (s2 === "object") {
    e || (e = /* @__PURE__ */ new Set());
    const i2 = O2(o, t2);
    if (e.has(i2))
      return true;
    e.add(i2);
    const r = Array.isArray(o), a5 = Array.isArray(t2);
    return r && a5 ? N4(o, t2, e) : !r && !a5 ? U2(o, t2, e) : false;
  }
  return false;
}
function O2(o, t2) {
  return `${C3(o)}__${C3(t2)}`;
}
var F3 = 0;
var b3 = /* @__PURE__ */ new WeakMap();
function C3(o) {
  return b3.has(o) || b3.set(o, ++F3), b3.get(o);
}
function N4(o, t2, e) {
  if (o.length !== t2.length) return false;
  const s2 = new Array(t2.length).fill(false);
  t: for (let i2 = 0; i2 < o.length; i2++) {
    const r = o[i2];
    for (let a5 = 0; a5 < t2.length; a5++)
      if (!s2[a5] && g2(r, t2[a5], e)) {
        s2[a5] = true;
        continue t;
      }
    return false;
  }
  return true;
}
function U2(o, t2, e) {
  const s2 = Object.keys(o).sort(), i2 = Object.keys(t2).sort();
  if (s2.length !== i2.length) return false;
  for (let r = 0; r < s2.length; r++)
    if (s2[r] !== i2[r]) return false;
  for (const r of s2) {
    const a5 = o[r], n = t2[r];
    if (!g2(a5, n, e))
      return false;
  }
  return true;
}
var _3 = class {
  constructor(t2, e) {
    if (this.id = t2, this.registry = e, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t2 !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t2} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((s2, i2, r) => {
      this.onStoreUpdated(r, i2);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((s2, i2, r) => {
      this.onCoreStoreUpdated(r, i2);
    }), this.readyPromise = new Promise((s2) => {
      this.readyResolve = s2;
    }), this.readyResolve();
  }
  provides() {
    if (!this._capability) {
      const t2 = this.buildCapability();
      this._capability = Object.freeze(t2);
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
  dispatchCoreAction(t2) {
    return this.coreStore.dispatchToCore(t2);
  }
  /**
   * Dispatch an action to all plugins
   */
  dispatchToAllPlugins(t2) {
    return this.coreStore.dispatch(t2);
  }
  /**
   * Dispatch an action
   */
  dispatch(t2) {
    return this.pluginStore.dispatch(t2);
  }
  /**
   * Dispatch an action with debouncing to prevent rapid repeated calls
   * @param action The action to dispatch
   * @param debounceTime Time in ms to debounce (default: 100ms)
   * @returns boolean indicating whether the action was dispatched or debounced
   */
  debouncedDispatch(t2, e = 100) {
    const s2 = Date.now(), i2 = this.debouncedActions[t2.type] || 0;
    return s2 - i2 >= e ? (this.debouncedActions[t2.type] = s2, this.dispatch(t2), true) : false;
  }
  /**
   * Subscribe to state changes
   */
  subscribe(t2) {
    return this.pluginStore.subscribeToState(t2);
  }
  /**
   * Subscribe to core store changes
   */
  subscribeToCoreStore(t2) {
    return this.coreStore.subscribe(t2);
  }
  /**
   * Called when the plugin store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onStoreUpdated(t2, e) {
  }
  /**
   * Called when the core store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onCoreStoreUpdated(t2, e) {
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
    this.readyPromise = new Promise((t2) => {
      this.readyResolve = t2;
    });
  }
};
var x2 = class {
  constructor(t2, e) {
    this.handler = t2, this.options = e, this.lastRun = 0, this.handle = (s2) => {
      this.options.mode === "debounce" ? this.debounce(s2) : this.throttle(s2);
    };
  }
  debounce(t2) {
    this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(() => {
      this.handler(t2), this.timeoutId = void 0;
    }, this.options.wait);
  }
  throttle(t2) {
    if (this.options.mode === "debounce") return;
    const e = Date.now(), s2 = this.options.throttleMode || "leading-trailing";
    e - this.lastRun >= this.options.wait && (s2 === "leading-trailing" && this.handler(t2), this.lastRun = e), this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(
      () => {
        this.handler(t2), this.lastRun = Date.now(), this.timeoutId = void 0;
      },
      this.options.wait - (e - this.lastRun)
    );
  }
  destroy() {
    this.timeoutId && window.clearTimeout(this.timeoutId);
  }
};
function p() {
  const o = /* @__PURE__ */ new Set();
  return {
    emit: (t2 = void 0) => o.forEach((e) => e(t2)),
    on: (t2) => (o.add(t2), () => o.delete(t2)),
    off: (t2) => o.delete(t2),
    clear: () => o.clear()
  };
}
function D(o, t2 = g2) {
  const e = /* @__PURE__ */ new Set(), s2 = /* @__PURE__ */ new Map();
  let i2 = o;
  const r = (n) => e.forEach((c2) => c2(n)), a5 = (n, c2) => {
    let u2 = n, h2 = () => {
    };
    if (c2) {
      const l3 = new x2(n, c2);
      u2 = l3.handle, h2 = () => l3.destroy(), s2.set(n, { wrapped: u2, destroy: h2 });
    }
    return i2 !== void 0 && u2(i2), e.add(u2), () => {
      e.delete(u2), h2(), s2.delete(n);
    };
  };
  return {
    /* emitter behaviour ---------------------------------------- */
    get value() {
      return i2;
    },
    emit(n = void 0) {
      (i2 === void 0 || !t2(i2, n)) && (i2 = n, r(n));
    },
    on: a5,
    off(n) {
      const c2 = s2.get(n);
      c2 ? (e.delete(c2.wrapped), c2.destroy(), s2.delete(n)) : e.delete(n);
    },
    clear() {
      e.clear(), s2.forEach((n) => n.destroy()), s2.clear();
    },
    /* derived hook --------------------------------------------- */
    select(n, c2 = g2) {
      return (u2, h2) => {
        let l3;
        if (i2 !== void 0) {
          const d2 = n(i2);
          l3 = d2, u2(d2);
        }
        return a5(
          (d2) => {
            const f4 = n(d2);
            (l3 === void 0 || !c2(l3, f4)) && (l3 = f4, u2(f4));
          },
          h2
        );
      };
    }
  };
}
var v3 = "INTERACTION/ACTIVATE_MODE";
var m2 = "INTERACTION/PAUSE";
var E2 = "INTERACTION/RESUME";
var A = "INTERACTION/SET_CURSOR";
var j = (o) => ({
  type: v3,
  payload: { mode: o }
});
var z3 = (o) => ({
  type: A,
  payload: { cursor: o }
});
var G2 = () => ({
  type: m2
});
var L5 = () => ({
  type: E2
});
function V(o) {
  const t2 = [
    "onPointerDown",
    "onPointerUp",
    "onPointerMove",
    "onPointerEnter",
    "onPointerLeave",
    "onPointerCancel"
  ], e = {};
  for (const s2 of t2)
    e[s2] = (i2, r, a5) => {
      var n;
      for (const c2 of o) (n = c2[s2]) == null || n.call(c2, i2, r, a5);
    };
  return e;
}
var S3 = class S4 extends _3 {
  constructor(t2, e) {
    super(t2, e), this.modes = /* @__PURE__ */ new Map(), this.cursorClaims = /* @__PURE__ */ new Map(), this.buckets = /* @__PURE__ */ new Map(), this.alwaysGlobal = /* @__PURE__ */ new Set(), this.alwaysPage = /* @__PURE__ */ new Map(), this.onModeChange$ = p(), this.onHandlerChange$ = p(), this.onCursorChange$ = p(), this.onStateChange$ = D(), this.registerMode({
      id: "default",
      scope: "page",
      exclusive: false,
      cursor: "auto"
    });
  }
  async initialize(t2) {
  }
  buildCapability() {
    return {
      activate: (t2) => this.activate(t2),
      onModeChange: this.onModeChange$.on,
      onCursorChange: this.onCursorChange$.on,
      onHandlerChange: this.onHandlerChange$.on,
      onStateChange: this.onStateChange$.on,
      getActiveMode: () => this.state.activeMode,
      getActiveInteractionMode: () => this.getActiveInteractionMode(),
      finish: () => this.activate("default"),
      registerMode: (t2) => this.registerMode(t2),
      registerHandlers: (t2) => this.registerHandlers(t2),
      registerAlways: (t2) => this.registerAlways(t2),
      setCursor: (t2, e, s2 = 0) => this.setCursor(t2, e, s2),
      removeCursor: (t2) => this.removeCursor(t2),
      getCurrentCursor: () => this.state.cursor,
      getHandlersForScope: (t2) => this.getHandlersForScope(t2),
      activeModeIsExclusive: () => this.activeModeIsExclusive(),
      pause: () => this.dispatch(G2()),
      resume: () => this.dispatch(L5()),
      isPaused: () => this.state.paused
    };
  }
  activate(t2) {
    if (!this.modes.has(t2))
      throw new Error(`[interaction] unknown mode '${t2}'`);
    if (t2 === this.state.activeMode) return;
    const e = this.state.activeMode;
    this.cursorClaims.clear(), this.notifyHandlersInactive(e), this.dispatch(j(t2)), this.emitCursor(), this.notifyHandlersActive(t2), this.onModeChange$.emit({ ...this.state, activeMode: t2 });
  }
  notifyHandlersActive(t2) {
    this.alwaysGlobal.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveStart) == null || r.call(i2, t2);
    }), this.alwaysPage.forEach((i2) => {
      i2.forEach((r) => {
        var a5;
        (a5 = r.onHandlerActiveStart) == null || a5.call(r, t2);
      });
    });
    const e = this.modes.get(t2);
    if (!e) return;
    const s2 = this.buckets.get(t2);
    s2 && (e.scope === "global" && s2.global.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveStart) == null || r.call(i2, t2);
    }), e.scope === "page" && s2.page.forEach((i2, r) => {
      i2.forEach((a5) => {
        var n;
        (n = a5.onHandlerActiveStart) == null || n.call(a5, t2);
      });
    }));
  }
  notifyHandlersInactive(t2) {
    this.alwaysGlobal.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveEnd) == null || r.call(i2, t2);
    }), this.alwaysPage.forEach((i2) => {
      i2.forEach((r) => {
        var a5;
        (a5 = r.onHandlerActiveEnd) == null || a5.call(r, t2);
      });
    });
    const e = this.modes.get(t2);
    if (!e) return;
    const s2 = this.buckets.get(t2);
    s2 && (e.scope === "global" && s2.global.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveEnd) == null || r.call(i2, t2);
    }), e.scope === "page" && s2.page.forEach((i2, r) => {
      i2.forEach((a5) => {
        var n;
        (n = a5.onHandlerActiveEnd) == null || n.call(a5, t2);
      });
    }));
  }
  registerMode(t2) {
    this.modes.set(t2.id, t2), this.buckets.has(t2.id) || this.buckets.set(t2.id, { global: /* @__PURE__ */ new Set(), page: /* @__PURE__ */ new Map() });
  }
  /** ---------- pointer-handler handling ------------ */
  registerHandlers({ modeId: t2, handlers: e, pageIndex: s2 }) {
    const i2 = Array.isArray(t2) ? t2 : [t2], r = [];
    for (const a5 of i2) {
      const n = this.buckets.get(a5);
      if (!n) throw new Error(`unknown mode '${a5}'`);
      if (s2 == null)
        n.global.add(e);
      else {
        const c2 = n.page.get(s2) ?? /* @__PURE__ */ new Set();
        c2.add(e), n.page.set(s2, c2);
      }
      r.push(() => {
        if (s2 == null)
          n.global.delete(e);
        else {
          const c2 = n.page.get(s2);
          c2 && (c2.delete(e), c2.size === 0 && n.page.delete(s2));
        }
      });
    }
    return this.onHandlerChange$.emit({ ...this.state }), () => {
      r.forEach((a5) => a5()), this.onHandlerChange$.emit({ ...this.state });
    };
  }
  registerAlways({ scope: t2, handlers: e }) {
    if (t2.type === "global")
      return this.alwaysGlobal.add(e), this.onHandlerChange$.emit({ ...this.state }), () => this.alwaysGlobal.delete(e);
    const s2 = this.alwaysPage.get(t2.pageIndex) ?? /* @__PURE__ */ new Set();
    return s2.add(e), this.alwaysPage.set(t2.pageIndex, s2), this.onHandlerChange$.emit({ ...this.state }), () => {
      s2.delete(e), this.onHandlerChange$.emit({ ...this.state });
    };
  }
  /** Returns the *merged* handler set that should be active for the given
   *  provider (`global` wrapper or a single page wrapper).
   *  – `alwaysGlobal` / `alwaysPage` are **always** active.
   *  – Handlers that belong to the current mode are added on top **iff**
   *    the mode’s own scope matches the provider’s scope.            */
  getHandlersForScope(t2) {
    if (!this.state) return null;
    const e = this.modes.get(this.state.activeMode);
    if (!e) return null;
    const s2 = this.buckets.get(e.id);
    if (!s2) return null;
    const i2 = (n, c2) => n.size || c2.size ? V([...n, ...c2]) : null;
    if (t2.type === "global") {
      const n = e.scope === "global" ? s2.global : /* @__PURE__ */ new Set();
      return i2(this.alwaysGlobal, n);
    }
    const r = this.alwaysPage.get(t2.pageIndex) ?? /* @__PURE__ */ new Set(), a5 = e.scope === "page" ? s2.page.get(t2.pageIndex) ?? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set();
    return i2(r, a5);
  }
  /** ---------- cursor handling --------------------- */
  setCursor(t2, e, s2 = 0) {
    this.cursorClaims.set(t2, { cursor: e, priority: s2 }), this.emitCursor();
  }
  removeCursor(t2) {
    this.cursorClaims.delete(t2), this.emitCursor();
  }
  emitCursor() {
    var e;
    const t2 = [...this.cursorClaims.values()].sort((s2, i2) => i2.priority - s2.priority)[0] ?? {
      cursor: ((e = this.modes.get(this.state.activeMode)) == null ? void 0 : e.cursor) ?? "auto"
    };
    t2.cursor !== this.state.cursor && (this.dispatch(z3(t2.cursor)), this.onCursorChange$.emit(t2.cursor));
  }
  onStoreUpdated(t2, e) {
    this.onStateChange$.emit(e);
  }
  activeModeIsExclusive() {
    const t2 = this.modes.get(this.state.activeMode);
    return !!(t2 != null && t2.exclusive);
  }
  getActiveInteractionMode() {
    return this.modes.get(this.state.activeMode) ?? null;
  }
  // keep emitter clean
  async destroy() {
    this.onModeChange$.clear(), this.onCursorChange$.clear(), await super.destroy();
  }
};
S3.id = "interaction-manager";
var w3 = S3;

// ../plugin-interaction-manager/dist/preact/index.js
var A2 = z4({
  registry: null,
  isInitializing: true,
  pluginsReady: false
});
function R2() {
  const e = E3(A2);
  if (e === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: n, isInitializing: t2 } = e;
  if (t2)
    return e;
  if (n === null)
    throw new Error("PDF registry failed to initialize properly");
  return e;
}
function x3(e) {
  const { registry: n } = R2();
  if (n === null)
    return {
      plugin: null,
      isLoading: true,
      ready: new Promise(() => {
      })
    };
  const t2 = n.getPlugin(e);
  if (!t2)
    throw new Error(`Plugin ${e} not found`);
  return {
    plugin: t2,
    isLoading: false,
    ready: t2.ready()
  };
}
function D2(e) {
  const { plugin: n, isLoading: t2, ready: r } = x3(e);
  if (!n)
    return {
      provides: null,
      isLoading: t2,
      ready: r
    };
  if (!n.provides)
    throw new Error(`Plugin ${e} does not provide a capability`);
  return {
    provides: n.provides(),
    isLoading: t2,
    ready: r
  };
}
var s = () => D2(w3.id);
function q({ modeId: e, pageIndex: n }) {
  const { provides: t2 } = s();
  return {
    register: (r, i2) => {
      const u2 = (i2 == null ? void 0 : i2.modeId) ?? e, o = (i2 == null ? void 0 : i2.pageIndex) ?? n;
      return u2 ? t2 == null ? void 0 : t2.registerHandlers({
        modeId: u2,
        handlers: r,
        pageIndex: o
      }) : t2 == null ? void 0 : t2.registerAlways({
        scope: o !== void 0 ? { type: "page", pageIndex: o } : { type: "global" },
        handlers: r
      });
    }
  };
}

// src/preact/components/annotations.tsx
import { useMemo as useMemo2, useState as useState2, useEffect as useEffect2, useCallback } from "preact/hooks";

// src/preact/components/annotation-container.tsx
import { useEffect, useRef, useState } from "preact/hooks";
import { Fragment, jsx, jsxs } from "preact/jsx-runtime";
function AnnotationContainer({
  scale,
  pageIndex,
  rotation,
  trackedAnnotation,
  children,
  style,
  outlineOffset = 1,
  isSelected = false,
  isDraggable = true,
  isResizable = true,
  computeResizePatch,
  ...props
}) {
  const { provides: annotationProvides } = useAnnotationCapability();
  const ref = useRef(null);
  const [dragState, setDragState] = useState("idle");
  const [resizeDirection, setResizeDirection] = useState(null);
  const [startPos, setStartPos] = useState(null);
  const [startRect, setStartRect] = useState(null);
  const [currentRect, setCurrentRect] = useState(trackedAnnotation.object.rect);
  const [previewObject, setPreviewObject] = useState(null);
  useEffect(() => {
    setCurrentRect(trackedAnnotation.object.rect);
    setPreviewObject(null);
  }, [trackedAnnotation]);
  const handlePointerDown = (e) => {
    if (!isSelected) return;
    e.stopPropagation();
    e.preventDefault();
    const target = e.target;
    if (isResizable && target.classList.contains("resize-handle")) {
      setDragState("resizing");
      setResizeDirection(target.dataset.direction);
    } else if (isDraggable) {
      setDragState("dragging");
    } else {
      return;
    }
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartRect(currentRect);
    ref.current?.setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e) => {
    if (dragState === "idle" || !startPos || !startRect) return;
    const dispDelta = { x: e.clientX - startPos.x, y: e.clientY - startPos.y };
    const { x: dx, y: dy } = restoreOffset(dispDelta, rotation, scale);
    let newOriginX = startRect.origin.x;
    let newOriginY = startRect.origin.y;
    let newWidth = startRect.size.width;
    let newHeight = startRect.size.height;
    if (dragState === "dragging") {
      newOriginX += dx;
      newOriginY += dy;
    } else if (dragState === "resizing" && resizeDirection) {
      if (resizeDirection.includes("right")) {
        newWidth += dx;
      } else if (resizeDirection.includes("left")) {
        newOriginX += dx;
        newWidth -= dx;
      }
      if (resizeDirection.includes("bottom")) {
        newHeight += dy;
      } else if (resizeDirection.includes("top")) {
        newOriginY += dy;
        newHeight -= dy;
      }
      if (newWidth < 1 || newHeight < 1) return;
    }
    const tentativeRect = {
      origin: { x: newOriginX, y: newOriginY },
      size: { width: newWidth, height: newHeight }
    };
    let previewPatch = { rect: tentativeRect };
    if (computeResizePatch) {
      const dir = dragState === "resizing" ? resizeDirection : "bottom-right";
      if (dir) {
        previewPatch = computeResizePatch(trackedAnnotation.object, tentativeRect, dir);
      }
    }
    setCurrentRect(previewPatch.rect || tentativeRect);
    setPreviewObject(previewPatch);
  };
  const handlePointerUp = (e) => {
    if (dragState === "idle") return;
    const usedDirection = resizeDirection || "bottom-right";
    setDragState("idle");
    setResizeDirection(null);
    ref.current?.releasePointerCapture(e.pointerId);
    if (annotationProvides && trackedAnnotation) {
      let patch = { rect: currentRect };
      if (computeResizePatch && usedDirection) {
        patch = computeResizePatch(trackedAnnotation.object, currentRect, usedDirection);
      }
      annotationProvides.updateAnnotation(pageIndex, trackedAnnotation.localId, patch);
    }
    setStartPos(null);
    setStartRect(null);
    setPreviewObject(null);
  };
  const currentObject = previewObject ? { ...trackedAnnotation.object, ...previewObject } : trackedAnnotation.object;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      style: {
        position: "absolute",
        outline: isSelected ? "1px solid #007ACC" : "none",
        outlineOffset: isSelected ? `${outlineOffset}px` : "0px",
        left: `${currentRect.origin.x * scale}px`,
        top: `${currentRect.origin.y * scale}px`,
        width: `${currentRect.size.width * scale}px`,
        height: `${currentRect.size.height * scale}px`,
        pointerEvents: isSelected ? "auto" : "none",
        cursor: isSelected && isDraggable ? "move" : "default",
        ...style
      },
      ...props,
      children: [
        typeof children === "function" ? children(currentObject) : children,
        isSelected && isResizable && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "resize-handle",
              "data-direction": "top-left",
              style: {
                position: "absolute",
                top: -7 - outlineOffset,
                left: -7 - outlineOffset,
                width: 13,
                height: 13,
                background: "blue",
                borderRadius: "50%",
                cursor: rotation % 2 ? "nesw-resize" : "nwse-resize"
              }
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "resize-handle",
              "data-direction": "top-right",
              style: {
                position: "absolute",
                top: -7 - outlineOffset,
                right: -7 - outlineOffset,
                width: 13,
                height: 13,
                background: "blue",
                borderRadius: "50%",
                cursor: rotation % 2 ? "nwse-resize" : "nesw-resize"
              }
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "resize-handle",
              "data-direction": "bottom-left",
              style: {
                position: "absolute",
                bottom: -7 - outlineOffset,
                left: -7 - outlineOffset,
                width: 13,
                height: 13,
                background: "blue",
                borderRadius: "50%",
                cursor: rotation % 2 ? "nwse-resize" : "nesw-resize"
              }
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "resize-handle",
              "data-direction": "bottom-right",
              style: {
                position: "absolute",
                bottom: -7 - outlineOffset,
                right: -7 - outlineOffset,
                width: 13,
                height: 13,
                background: "blue",
                borderRadius: "50%",
                cursor: rotation % 2 ? "nesw-resize" : "nwse-resize"
              }
            }
          )
        ] })
      ]
    }
  );
}

// src/preact/components/text-markup/highlight.tsx
import { Fragment as Fragment2, jsx as jsx2 } from "preact/jsx-runtime";
function Highlight({
  color = "#FFFF00",
  opacity = 0.5,
  rects,
  rect,
  scale,
  onClick,
  style,
  ...props
}) {
  return /* @__PURE__ */ jsx2(Fragment2, { children: rects.map((b4, i2) => /* @__PURE__ */ jsx2(
    "div",
    {
      onMouseDown: onClick,
      style: {
        position: "absolute",
        left: (rect ? b4.origin.x - rect.origin.x : b4.origin.x) * scale,
        top: (rect ? b4.origin.y - rect.origin.y : b4.origin.y) * scale,
        width: b4.size.width * scale,
        height: b4.size.height * scale,
        background: color,
        opacity,
        pointerEvents: onClick ? "auto" : "none",
        cursor: onClick ? "pointer" : "default",
        zIndex: onClick ? 1 : null,
        ...style
      },
      ...props
    },
    i2
  )) });
}

// src/preact/components/text-markup/underline.tsx
import { Fragment as Fragment3, jsx as jsx3 } from "preact/jsx-runtime";
function Underline({
  color = "#FFFF00",
  opacity = 0.5,
  rects,
  rect,
  scale,
  onClick,
  style,
  ...props
}) {
  const thickness = 2 * scale;
  return /* @__PURE__ */ jsx3(Fragment3, { children: rects.map((r, i2) => /* @__PURE__ */ jsx3(
    "div",
    {
      onMouseDown: onClick,
      style: {
        position: "absolute",
        left: (rect ? r.origin.x - rect.origin.x : r.origin.x) * scale,
        top: (rect ? r.origin.y - rect.origin.y : r.origin.y) * scale,
        width: r.size.width * scale,
        height: r.size.height * scale,
        background: "transparent",
        pointerEvents: onClick ? "auto" : "none",
        cursor: onClick ? "pointer" : "default",
        zIndex: onClick ? 1 : 0,
        ...style
      },
      ...props,
      children: /* @__PURE__ */ jsx3(
        "div",
        {
          style: {
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: thickness,
            background: color,
            opacity,
            pointerEvents: "none"
          }
        }
      )
    },
    i2
  )) });
}

// src/preact/components/text-markup/strikeout.tsx
import { Fragment as Fragment4, jsx as jsx4 } from "preact/jsx-runtime";
function Strikeout({
  color = "#FFFF00",
  opacity = 0.5,
  rects,
  rect,
  scale,
  onClick,
  style,
  ...props
}) {
  const thickness = 2 * scale;
  return /* @__PURE__ */ jsx4(Fragment4, { children: rects.map((r, i2) => /* @__PURE__ */ jsx4(
    "div",
    {
      onMouseDown: onClick,
      style: {
        position: "absolute",
        left: (rect ? r.origin.x - rect.origin.x : r.origin.x) * scale,
        top: (rect ? r.origin.y - rect.origin.y : r.origin.y) * scale,
        width: r.size.width * scale,
        height: r.size.height * scale,
        background: "transparent",
        pointerEvents: onClick ? "auto" : "none",
        cursor: onClick ? "pointer" : "default",
        zIndex: onClick ? 1 : 0,
        ...style
      },
      ...props,
      children: /* @__PURE__ */ jsx4(
        "div",
        {
          style: {
            position: "absolute",
            left: 0,
            top: "50%",
            width: "100%",
            height: thickness,
            background: color,
            opacity,
            transform: "translateY(-50%)",
            pointerEvents: "none"
          }
        }
      )
    },
    i2
  )) });
}

// src/preact/components/text-markup/squiggly.tsx
import { Fragment as Fragment5, jsx as jsx5 } from "preact/jsx-runtime";
function Squiggly({
  color = "#FFFF00",
  opacity = 0.5,
  rects,
  rect,
  scale,
  onClick,
  style,
  ...props
}) {
  const amplitude = 2 * scale;
  const period = 6 * scale;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${period}" height="${amplitude * 2}" viewBox="0 0 ${period} ${amplitude * 2}">
      <path d="M0 ${amplitude} Q ${period / 4} 0 ${period / 2} ${amplitude} T ${period} ${amplitude}"
            fill="none" stroke="${color}" stroke-width="${amplitude}" stroke-linecap="round"/>
    </svg>`;
  const svgDataUri = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
  return /* @__PURE__ */ jsx5(Fragment5, { children: rects.map((r, i2) => /* @__PURE__ */ jsx5(
    "div",
    {
      onMouseDown: onClick,
      style: {
        position: "absolute",
        left: (rect ? r.origin.x - rect.origin.x : r.origin.x) * scale,
        top: (rect ? r.origin.y - rect.origin.y : r.origin.y) * scale,
        width: r.size.width * scale,
        height: r.size.height * scale,
        background: "transparent",
        pointerEvents: onClick ? "auto" : "none",
        cursor: onClick ? "pointer" : "default",
        zIndex: onClick ? 1 : 0,
        ...style
      },
      ...props,
      children: /* @__PURE__ */ jsx5(
        "div",
        {
          style: {
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: amplitude * 2,
            backgroundImage: svgDataUri,
            backgroundRepeat: "repeat-x",
            backgroundSize: `${period}px ${amplitude * 2}px`,
            opacity,
            pointerEvents: "none"
          }
        }
      )
    },
    i2
  )) });
}

// src/preact/components/annotations/ink.tsx
import { useMemo } from "preact/hooks";
import { jsx as jsx6 } from "preact/jsx-runtime";
function Ink({
  color = "#000000",
  opacity = 1,
  strokeWidth,
  inkList,
  rect,
  scale,
  onClick
}) {
  const paths = useMemo(() => {
    return inkList.map(({ points }) => {
      let d2 = "";
      points.forEach(({ x: x7, y: y5 }, i2) => {
        const lx = x7 - rect.origin.x;
        const ly = y5 - rect.origin.y;
        d2 += (i2 === 0 ? "M" : "L") + lx + " " + ly + " ";
      });
      return d2.trim();
    });
  }, [inkList, rect]);
  const width = rect.size.width * scale;
  const height = rect.size.height * scale;
  return /* @__PURE__ */ jsx6(
    "svg",
    {
      style: {
        position: "absolute",
        width,
        height,
        pointerEvents: "none",
        zIndex: 2
      },
      width,
      height,
      viewBox: `0 0 ${rect.size.width} ${rect.size.height}`,
      children: paths.map((d2, i2) => /* @__PURE__ */ jsx6(
        "path",
        {
          d: d2,
          fill: "none",
          stroke: color,
          strokeWidth,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          opacity,
          pointerEvents: "visibleStroke",
          onMouseDown: onClick,
          style: {
            cursor: "pointer"
          }
        },
        i2
      ))
    }
  );
}

// ../plugin-selection/dist/preact/index.js
import { createContext as L8 } from "preact";
import { useContext as z7, useState as P8, useRef as S7, useEffect as c, useCallback as k7, useMemo as _6 } from "preact/hooks";

// ../plugin-selection/dist/selection-plugin-Bns-tQIi.js
var _4 = "SET_DOCUMENT";
var D3 = "\xAD";
var $4 = "\u200B";
var E4 = "\u2060";
var H3 = "\uFEFF";
var B3 = "\uFFFE";
var G3 = "\uFFFF";
var U3 = Object.freeze([
  D3,
  $4,
  E4,
  H3,
  B3,
  G3
]);
new RegExp(`[${U3.join("")}]`, "g");
var F4 = Object.freeze([
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
F4.reduce(
  (e, t2) => (e[t2.id] = t2, e),
  {}
);
F4.reduce((e, t2) => (e[t2.css] = t2.id, e), {});
F4.map((e) => ({
  value: e.id,
  label: e.label
}));
var V2 = Object.freeze({
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
  V2
).reduce(
  (e, [t2, s2]) => (e[s2] = Number(t2), e),
  {}
);
function y3(e, t2, s2) {
  if (e === t2)
    return true;
  if (e == null || t2 == null)
    return e === t2;
  const i2 = typeof e;
  if (i2 !== typeof t2) return false;
  if (i2 === "object") {
    s2 || (s2 = /* @__PURE__ */ new Set());
    const n = W(e, t2);
    if (s2.has(n))
      return true;
    s2.add(n);
    const o = Array.isArray(e), c2 = Array.isArray(t2);
    return o && c2 ? Y(e, t2, s2) : !o && !c2 ? Z(e, t2, s2) : false;
  }
  return false;
}
function W(e, t2) {
  return `${I2(e)}__${I2(t2)}`;
}
var X = 0;
var R3 = /* @__PURE__ */ new WeakMap();
function I2(e) {
  return R3.has(e) || R3.set(e, ++X), R3.get(e);
}
function Y(e, t2, s2) {
  if (e.length !== t2.length) return false;
  const i2 = new Array(t2.length).fill(false);
  t: for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (let c2 = 0; c2 < t2.length; c2++)
      if (!i2[c2] && y3(o, t2[c2], s2)) {
        i2[c2] = true;
        continue t;
      }
    return false;
  }
  return true;
}
function Z(e, t2, s2) {
  const i2 = Object.keys(e).sort(), n = Object.keys(t2).sort();
  if (i2.length !== n.length) return false;
  for (let o = 0; o < i2.length; o++)
    if (i2[o] !== n[o]) return false;
  for (const o of i2) {
    const c2 = e[o], a5 = t2[o];
    if (!y3(c2, a5, s2))
      return false;
  }
  return true;
}
var J = class {
  constructor(t2, s2) {
    if (this.id = t2, this.registry = s2, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t2 !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t2} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((i2, n, o) => {
      this.onStoreUpdated(o, n);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((i2, n, o) => {
      this.onCoreStoreUpdated(o, n);
    }), this.readyPromise = new Promise((i2) => {
      this.readyResolve = i2;
    }), this.readyResolve();
  }
  provides() {
    if (!this._capability) {
      const t2 = this.buildCapability();
      this._capability = Object.freeze(t2);
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
  dispatchCoreAction(t2) {
    return this.coreStore.dispatchToCore(t2);
  }
  /**
   * Dispatch an action to all plugins
   */
  dispatchToAllPlugins(t2) {
    return this.coreStore.dispatch(t2);
  }
  /**
   * Dispatch an action
   */
  dispatch(t2) {
    return this.pluginStore.dispatch(t2);
  }
  /**
   * Dispatch an action with debouncing to prevent rapid repeated calls
   * @param action The action to dispatch
   * @param debounceTime Time in ms to debounce (default: 100ms)
   * @returns boolean indicating whether the action was dispatched or debounced
   */
  debouncedDispatch(t2, s2 = 100) {
    const i2 = Date.now(), n = this.debouncedActions[t2.type] || 0;
    return i2 - n >= s2 ? (this.debouncedActions[t2.type] = i2, this.dispatch(t2), true) : false;
  }
  /**
   * Subscribe to state changes
   */
  subscribe(t2) {
    return this.pluginStore.subscribeToState(t2);
  }
  /**
   * Subscribe to core store changes
   */
  subscribeToCoreStore(t2) {
    return this.coreStore.subscribe(t2);
  }
  /**
   * Called when the plugin store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onStoreUpdated(t2, s2) {
  }
  /**
   * Called when the core store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onCoreStoreUpdated(t2, s2) {
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
    this.readyPromise = new Promise((t2) => {
      this.readyResolve = t2;
    });
  }
};
var q2 = class {
  constructor(t2, s2) {
    this.handler = t2, this.options = s2, this.lastRun = 0, this.handle = (i2) => {
      this.options.mode === "debounce" ? this.debounce(i2) : this.throttle(i2);
    };
  }
  debounce(t2) {
    this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(() => {
      this.handler(t2), this.timeoutId = void 0;
    }, this.options.wait);
  }
  throttle(t2) {
    if (this.options.mode === "debounce") return;
    const s2 = Date.now(), i2 = this.options.throttleMode || "leading-trailing";
    s2 - this.lastRun >= this.options.wait && (i2 === "leading-trailing" && this.handler(t2), this.lastRun = s2), this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(
      () => {
        this.handler(t2), this.lastRun = Date.now(), this.timeoutId = void 0;
      },
      this.options.wait - (s2 - this.lastRun)
    );
  }
  destroy() {
    this.timeoutId && window.clearTimeout(this.timeoutId);
  }
};
function x4() {
  const e = /* @__PURE__ */ new Set();
  return {
    emit: (t2 = void 0) => e.forEach((s2) => s2(t2)),
    on: (t2) => (e.add(t2), () => e.delete(t2)),
    off: (t2) => e.delete(t2),
    clear: () => e.clear()
  };
}
function N5(e, t2 = y3) {
  const s2 = /* @__PURE__ */ new Set(), i2 = /* @__PURE__ */ new Map();
  let n = e;
  const o = (a5) => s2.forEach((r) => r(a5)), c2 = (a5, r) => {
    let u2 = a5, l3 = () => {
    };
    if (r) {
      const h2 = new q2(a5, r);
      u2 = h2.handle, l3 = () => h2.destroy(), i2.set(a5, { wrapped: u2, destroy: l3 });
    }
    return n !== void 0 && u2(n), s2.add(u2), () => {
      s2.delete(u2), l3(), i2.delete(a5);
    };
  };
  return {
    /* emitter behaviour ---------------------------------------- */
    get value() {
      return n;
    },
    emit(a5 = void 0) {
      (n === void 0 || !t2(n, a5)) && (n = a5, o(a5));
    },
    on: c2,
    off(a5) {
      const r = i2.get(a5);
      r ? (s2.delete(r.wrapped), r.destroy(), i2.delete(a5)) : s2.delete(a5);
    },
    clear() {
      s2.clear(), i2.forEach((a5) => a5.destroy()), i2.clear();
    },
    /* derived hook --------------------------------------------- */
    select(a5, r = y3) {
      return (u2, l3) => {
        let h2;
        if (n !== void 0) {
          const d2 = a5(n);
          h2 = d2, u2(d2);
        }
        return c2(
          (d2) => {
            const g4 = a5(d2);
            (h2 === void 0 || !r(h2, g4)) && (h2 = g4, u2(g4));
          },
          l3
        );
      };
    }
  };
}
function L6(e) {
  if (e.length === 0) return null;
  let t2 = e[0].origin.x, s2 = e[0].origin.y, i2 = e[0].origin.x + e[0].size.width, n = e[0].origin.y + e[0].size.height;
  for (const o of e)
    t2 = Math.min(t2, o.origin.x), s2 = Math.min(s2, o.origin.y), i2 = Math.max(i2, o.origin.x + o.size.width), n = Math.max(n, o.origin.y + o.size.height);
  return {
    origin: {
      x: t2,
      y: s2
    },
    size: {
      width: i2 - t2,
      height: n - s2
    }
  };
}
var K = class extends Error {
  constructor(e) {
    super(`Task aborted: ${JSON.stringify(e)}`), this.name = "TaskAbortedError";
  }
};
var Q = class extends Error {
  constructor(e) {
    super(`Task rejected: ${JSON.stringify(e)}`), this.name = "TaskRejectedError";
  }
};
var p2 = class S5 {
  constructor() {
    this.state = {
      stage: 0
      /* Pending */
    }, this.resolvedCallbacks = [], this.rejectedCallbacks = [], this._promise = null;
  }
  /**
   * Convert task to promise
   * @returns promise that will be resolved when task is settled
   */
  toPromise() {
    return this._promise || (this._promise = new Promise((t2, s2) => {
      this.wait(
        (i2) => t2(i2),
        (i2) => {
          i2.type === "abort" ? s2(new K(i2.reason)) : s2(new Q(i2.reason));
        }
      );
    })), this._promise;
  }
  /**
   * wait for task to be settled
   * @param resolvedCallback - callback for resolved value
   * @param rejectedCallback - callback for rejected value
   */
  wait(t2, s2) {
    switch (this.state.stage) {
      case 0:
        this.resolvedCallbacks.push(t2), this.rejectedCallbacks.push(s2);
        break;
      case 1:
        t2(this.state.result);
        break;
      case 2:
        s2({
          type: "reject",
          reason: this.state.reason
        });
        break;
      case 3:
        s2({
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
  resolve(t2) {
    if (this.state.stage === 0) {
      this.state = {
        stage: 1,
        result: t2
      };
      for (const s2 of this.resolvedCallbacks)
        try {
          s2(t2);
        } catch {
        }
      this.resolvedCallbacks = [], this.rejectedCallbacks = [];
    }
  }
  /**
   * reject task with specific reason
   * @param reason - abort reason
   *
   */
  reject(t2) {
    if (this.state.stage === 0) {
      this.state = {
        stage: 2,
        reason: t2
      };
      for (const s2 of this.rejectedCallbacks)
        try {
          s2({
            type: "reject",
            reason: t2
          });
        } catch {
        }
      this.resolvedCallbacks = [], this.rejectedCallbacks = [];
    }
  }
  /**
   * abort task with specific reason
   * @param reason - abort reason
   */
  abort(t2) {
    if (this.state.stage === 0) {
      this.state = {
        stage: 3,
        reason: t2
      };
      for (const s2 of this.rejectedCallbacks)
        try {
          s2({
            type: "abort",
            reason: t2
          });
        } catch {
        }
      this.resolvedCallbacks = [], this.rejectedCallbacks = [];
    }
  }
  /**
   * fail task with a TaskError from another task
   * This is a convenience method for error propagation between tasks
   * @param error - TaskError from another task
   */
  fail(t2) {
    t2.type === "abort" ? this.abort(t2.reason) : this.reject(t2.reason);
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
  static all(t2) {
    const s2 = new S5();
    if (t2.length === 0)
      return s2.resolve([]), s2;
    const i2 = new Array(t2.length);
    let n = 0, o = false;
    return t2.forEach((c2, a5) => {
      c2.wait(
        (r) => {
          o || (i2[a5] = r, n++, n === t2.length && (o = true, s2.resolve(i2)));
        },
        (r) => {
          o || (o = true, r.type === "abort" ? s2.abort(r.reason) : s2.reject(r.reason));
        }
      );
    }), s2;
  }
  /**
   * Static method to wait for all tasks to settle (resolve, reject, or abort)
   * Always resolves with an array of settlement results
   *
   * @param tasks - array of tasks to wait for
   * @returns new task that resolves when all input tasks settle
   * @public
   */
  static allSettled(t2) {
    const s2 = new S5();
    if (t2.length === 0)
      return s2.resolve([]), s2;
    const i2 = new Array(t2.length);
    let n = 0;
    return t2.forEach((o, c2) => {
      o.wait(
        (a5) => {
          i2[c2] = { status: "resolved", value: a5 }, n++, n === t2.length && s2.resolve(i2);
        },
        (a5) => {
          i2[c2] = {
            status: a5.type === "abort" ? "aborted" : "rejected",
            reason: a5.reason
          }, n++, n === t2.length && s2.resolve(i2);
        }
      );
    }), s2;
  }
  /**
   * Static method that resolves/rejects with the first task that settles
   *
   * @param tasks - array of tasks to race
   * @returns new task that settles with the first input task that settles
   * @public
   */
  static race(t2) {
    const s2 = new S5();
    if (t2.length === 0)
      return s2.reject("No tasks provided"), s2;
    let i2 = false;
    return t2.forEach((n) => {
      n.wait(
        (o) => {
          i2 || (i2 = true, s2.resolve(o));
        },
        (o) => {
          i2 || (i2 = true, o.type === "abort" ? s2.abort(o.reason) : s2.reject(o.reason));
        }
      );
    }), s2;
  }
  /**
   * Utility to track progress of multiple tasks
   *
   * @param tasks - array of tasks to track
   * @param onProgress - callback called when any task completes
   * @returns new task that resolves when all input tasks resolve
   * @public
   */
  static withProgress(t2, s2) {
    const i2 = S5.all(t2);
    if (s2) {
      let n = 0;
      t2.forEach((o) => {
        o.wait(
          () => {
            n++, s2(n, t2.length);
          },
          () => {
            n++, s2(n, t2.length);
          }
        );
      });
    }
    return i2;
  }
};
var P6 = "\xAD";
var tt = "\u200B";
var et = "\u2060";
var st = "\uFEFF";
var it = "\uFFFE";
var nt = "\uFFFF";
var ot = Object.freeze([
  P6,
  tt,
  et,
  st,
  it,
  nt
]);
new RegExp(`[${ot.join("")}]`, "g");
var A3 = Object.freeze([
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
A3.reduce(
  (e, t2) => (e[t2.id] = t2, e),
  {}
);
A3.reduce((e, t2) => (e[t2.css] = t2.id, e), {});
A3.map((e) => ({
  value: e.id,
  label: e.label
}));
var at = Object.freeze({
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
  at
).reduce(
  (e, [t2, s2]) => (e[s2] = Number(t2), e),
  {}
);
var T2 = /* @__PURE__ */ ((e) => (e[e.Ok = 0] = "Ok", e[e.Unknown = 1] = "Unknown", e[e.NotFound = 2] = "NotFound", e[e.WrongFormat = 3] = "WrongFormat", e[e.Password = 4] = "Password", e[e.Security = 5] = "Security", e[e.PageError = 6] = "PageError", e[e.XFALoad = 7] = "XFALoad", e[e.XFALayout = 8] = "XFALayout", e[e.Cancelled = 9] = "Cancelled", e[e.Initialization = 10] = "Initialization", e[e.NotReady = 11] = "NotReady", e[e.NotSupport = 12] = "NotSupport", e[e.LoadDoc = 13] = "LoadDoc", e[e.DocNotOpen = 14] = "DocNotOpen", e[e.CantCloseDoc = 15] = "CantCloseDoc", e[e.CantCreateNewDoc = 16] = "CantCreateNewDoc", e[e.CantImportPages = 17] = "CantImportPages", e[e.CantCreateAnnot = 18] = "CantCreateAnnot", e[e.CantSetAnnotRect = 19] = "CantSetAnnotRect", e[e.CantSetAnnotContent = 20] = "CantSetAnnotContent", e[e.CantRemoveInkList = 21] = "CantRemoveInkList", e[e.CantAddInkStoke = 22] = "CantAddInkStoke", e[e.CantReadAttachmentSize = 23] = "CantReadAttachmentSize", e[e.CantReadAttachmentContent = 24] = "CantReadAttachmentContent", e[e.CantFocusAnnot = 25] = "CantFocusAnnot", e[e.CantSelectText = 26] = "CantSelectText", e[e.CantSelectOption = 27] = "CantSelectOption", e[e.CantCheckField = 28] = "CantCheckField", e))(T2 || {});
var m3 = class {
  /**
   * Create a task
   * @returns new task
   */
  static create() {
    return new p2();
  }
  /**
   * Create a task that has been resolved with value
   * @param result - resolved value
   * @returns resolved task
   */
  static resolve(e) {
    const t2 = new p2();
    return t2.resolve(e), t2;
  }
  /**
   * Create a task that has been rejected with error
   * @param reason - rejected error
   * @returns rejected task
   */
  static reject(e) {
    const t2 = new p2();
    return t2.reject(e), t2;
  }
  /**
   * Create a task that has been aborted with error
   * @param reason - aborted error
   * @returns aborted task
   */
  static abort(e) {
    const t2 = new p2();
    return t2.reject(e), t2;
  }
};
function v4() {
}
var ct = "CACHE_PAGE_GEOMETRY";
var rt = "SET_SELECTION";
var lt = "START_SELECTION";
var ht = "END_SELECTION";
var ut = "CLEAR_SELECTION";
var dt = "SET_RECTS";
var gt = "SET_SLICES";
var bt = "RESET";
var St = (e, t2) => ({
  type: ct,
  payload: { page: e, geo: t2 }
});
var pt = (e) => ({
  type: rt,
  payload: e
});
var mt = () => ({ type: lt });
var yt = () => ({ type: ht });
var ft = () => ({ type: ut });
var wt = (e) => ({
  type: dt,
  payload: e
});
var Rt = (e) => ({ type: gt, payload: e });
var xt = () => ({ type: bt });
function j3(e, t2) {
  return e.rects[t2] ?? [];
}
function k5(e, t2) {
  return L6(j3(e, t2));
}
function vt(e) {
  const t2 = [], s2 = e.rects;
  for (const i2 in s2) {
    const n = Number(i2), o = L6(s2[n]);
    o && t2.push({ page: n, rect: o });
  }
  return t2;
}
function Tt(e, t2) {
  const s2 = e.rects[t2] || [];
  if (s2.length === 0) return null;
  const i2 = k5(e, t2);
  return i2 ? { pageIndex: t2, rect: i2, segmentRects: s2 } : null;
}
function Ct(e) {
  const t2 = [], s2 = Object.keys(e.rects).map(Number);
  for (const i2 of s2) {
    const n = e.rects[i2] || [];
    if (n.length === 0) continue;
    const o = k5(e, i2);
    o && t2.push({
      pageIndex: i2,
      rect: o,
      segmentRects: n
    });
  }
  return t2;
}
function Ft(e, t2, s2) {
  if (!e || !t2 || s2 < e.start.page || s2 > e.end.page) return null;
  const i2 = s2 === e.start.page ? e.start.index : 0, n = t2.runs[t2.runs.length - 1], o = n.charStart + n.glyphs.length - 1, c2 = s2 === e.end.page ? e.end.index : o;
  return { from: i2, to: c2 };
}
function At(e, t2, s2, i2 = true) {
  const n = [];
  for (const o of e.runs) {
    const c2 = o.charStart, a5 = c2 + o.glyphs.length - 1;
    if (a5 < t2 || c2 > s2) continue;
    const r = Math.max(t2, c2) - c2, u2 = Math.min(s2, a5) - c2;
    let l3 = 1 / 0, h2 = -1 / 0, d2 = 1 / 0, g4 = -1 / 0, f4 = 0;
    for (let w5 = r; w5 <= u2; w5++) {
      const b4 = o.glyphs[w5];
      b4.flags !== 2 && (l3 = Math.min(l3, b4.x), h2 = Math.max(h2, b4.x + b4.width), d2 = Math.min(d2, b4.y), g4 = Math.max(g4, b4.y + b4.height), f4++);
    }
    l3 !== 1 / 0 && f4 > 0 && n.push({
      rect: {
        origin: { x: l3, y: d2 },
        size: { width: h2 - l3, height: g4 - d2 }
      },
      charCount: f4
    });
  }
  return i2 ? Nt(n) : n.map((o) => o.rect);
}
function M6(e, t2) {
  const s2 = Math.min(e.origin.x, t2.origin.x), i2 = Math.min(e.origin.y, t2.origin.y), n = Math.max(e.origin.x + e.size.width, t2.origin.x + t2.size.width), o = Math.max(e.origin.y + e.size.height, t2.origin.y + t2.size.height);
  return {
    origin: { x: s2, y: i2 },
    size: { width: n - s2, height: o - i2 }
  };
}
function kt(e, t2) {
  const s2 = Math.max(e.origin.x, t2.origin.x), i2 = Math.max(e.origin.y, t2.origin.y), n = Math.min(e.origin.x + e.size.width, t2.origin.x + t2.size.width), o = Math.min(e.origin.y + e.size.height, t2.origin.y + t2.size.height), c2 = Math.max(0, n - s2), a5 = Math.max(0, o - i2);
  return {
    origin: { x: s2, y: i2 },
    size: { width: c2, height: a5 }
  };
}
function C4(e) {
  return e.size.width <= 0 || e.size.height <= 0;
}
function Ot(e, t2) {
  if (C4(e) || C4(t2)) return 0;
  const s2 = M6(e, t2);
  return s2.size.height === e.size.height || s2.size.height === t2.size.height ? 1 : kt(e, t2).size.height / s2.size.height;
}
function It(e, t2) {
  const i2 = e.rect, n = t2.rect;
  if (Ot(i2, n) < 0.8)
    return false;
  const o = 1, c2 = o * i2.size.width / e.charCount, a5 = o * n.size.width / t2.charCount, r = i2.origin.x - c2, u2 = i2.origin.x + i2.size.width + c2, l3 = n.origin.x - a5, h2 = n.origin.x + n.size.width + a5;
  return r < h2 && u2 > l3;
}
function Nt(e) {
  const t2 = [];
  let s2 = null, i2 = null;
  for (const n of e)
    s2 && i2 ? It(s2, n) ? i2 = M6(i2, n.rect) : (t2.push(i2), i2 = n.rect) : i2 = n.rect, s2 = n;
  return i2 && !C4(i2) && t2.push(i2), t2;
}
var O3 = class O4 extends J {
  constructor(t2, s2, i2) {
    super(t2, s2), this.engine = i2, this.enabledModes = /* @__PURE__ */ new Set(["default"]), this.selecting = false, this.selChange$ = N5(), this.textRetrieved$ = N5(), this.copyToClipboard$ = x4(), this.beginSelection$ = x4(), this.endSelection$ = x4(), this.coreStore.onAction(_4, (n) => {
      this.dispatch(xt());
    });
  }
  /* ── life-cycle ────────────────────────────────────────── */
  async initialize() {
  }
  async destroy() {
    this.selChange$.clear();
  }
  /* ── capability exposed to UI / other plugins ─────────── */
  buildCapability() {
    return {
      getGeometry: (t2) => this.getOrLoadGeometry(t2),
      getFormattedSelection: () => Ct(this.state),
      getFormattedSelectionForPage: (t2) => Tt(this.state, t2),
      getHighlightRectsForPage: (t2) => j3(this.state, t2),
      getHighlightRects: () => this.state.rects,
      getBoundingRectForPage: (t2) => k5(this.state, t2),
      getBoundingRects: () => vt(this.state),
      begin: (t2, s2) => this.beginSelection(t2, s2),
      update: (t2, s2) => this.updateSelection(t2, s2),
      end: () => this.endSelection(),
      clear: () => this.clearSelection(),
      onCopyToClipboard: this.copyToClipboard$.on,
      onSelectionChange: this.selChange$.on,
      onTextRetrieved: this.textRetrieved$.on,
      onBeginSelection: this.beginSelection$.on,
      onEndSelection: this.endSelection$.on,
      getSelectedText: () => this.getSelectedText(),
      copyToClipboard: () => this.copyToClipboard(),
      enableForMode: (t2) => this.enabledModes.add(t2),
      isEnabledForMode: (t2) => this.enabledModes.has(t2),
      getState: () => this.state
    };
  }
  /* ── geometry cache ───────────────────────────────────── */
  getOrLoadGeometry(t2) {
    const s2 = this.state.geometry[t2];
    if (s2) return m3.resolve(s2);
    if (!this.coreState.core.document)
      return m3.reject({ code: T2.NotFound, message: "Doc Not Found" });
    const i2 = this.coreState.core.document.pages.find((o) => o.index === t2), n = this.engine.getPageGeometry(this.coreState.core.document, i2);
    return n.wait((o) => {
      this.dispatch(St(t2, o));
    }, v4), n;
  }
  /* ── selection state updates ───────────────────────────── */
  beginSelection(t2, s2) {
    this.selecting = true, this.anchor = { page: t2, index: s2 }, this.dispatch(mt()), this.beginSelection$.emit({ page: t2, index: s2 });
  }
  endSelection() {
    this.selecting = false, this.anchor = void 0, this.dispatch(yt()), this.endSelection$.emit();
  }
  clearSelection() {
    this.selecting = false, this.anchor = void 0, this.dispatch(ft()), this.selChange$.emit(null);
  }
  updateSelection(t2, s2) {
    if (!this.selecting || !this.anchor) return;
    const i2 = this.anchor, n = t2 > i2.page || t2 === i2.page && s2 >= i2.index, a5 = { start: n ? i2 : { page: t2, index: s2 }, end: n ? { page: t2, index: s2 } : i2 };
    this.dispatch(pt(a5)), this.updateRectsAndSlices(a5), this.selChange$.emit(a5);
  }
  updateRectsAndSlices(t2) {
    const s2 = {}, i2 = {};
    for (let n = t2.start.page; n <= t2.end.page; n++) {
      const o = this.state.geometry[n], c2 = Ft(t2, o, n);
      c2 && (s2[n] = At(o, c2.from, c2.to), i2[n] = { start: c2.from, count: c2.to - c2.from + 1 });
    }
    this.dispatch(wt(s2)), this.dispatch(Rt(i2));
  }
  getSelectedText() {
    if (!this.coreState.core.document || !this.state.selection)
      return m3.reject({
        code: T2.NotFound,
        message: "Doc Not Found or No Selection"
      });
    const t2 = this.state.selection, s2 = [];
    for (let n = t2.start.page; n <= t2.end.page; n++) {
      const o = this.state.slices[n];
      o && s2.push({ pageIndex: n, charIndex: o.start, charCount: o.count });
    }
    if (s2.length === 0) return m3.resolve([]);
    const i2 = this.engine.getTextSlices(this.coreState.core.document, s2);
    return i2.wait((n) => {
      this.textRetrieved$.emit(n);
    }, v4), i2;
  }
  copyToClipboard() {
    this.getSelectedText().wait((s2) => {
      this.copyToClipboard$.emit(s2.join(`
`));
    }, v4);
  }
};
O3.id = "selection";
var z5 = O3;

// ../plugin-selection/dist/jsxRuntime.module-D89ud_rY.js
import { options as l2 } from "preact";

// ../plugin-selection/dist/index-Q-vI1_iw-B7e7p3tz.js
var w4 = "\xAD";
var C5 = "\u200B";
var E5 = "\u2060";
var M7 = "\uFEFF";
var A4 = "\uFFFE";
var I3 = "\uFFFF";
var $5 = Object.freeze([
  w4,
  C5,
  E5,
  M7,
  A4,
  I3
]);
new RegExp(`[${$5.join("")}]`, "g");
var m4 = Object.freeze([
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
m4.reduce(
  (s2, e) => (s2[e.id] = e, s2),
  {}
);
m4.reduce((s2, e) => (s2[e.css] = e.id, s2), {});
m4.map((s2) => ({
  value: s2.id,
  label: s2.label
}));
var H4 = Object.freeze({
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
  H4
).reduce(
  (s2, [e, t2]) => (s2[t2] = Number(e), s2),
  {}
);
function g3(s2, e, t2) {
  if (s2 === e)
    return true;
  if (s2 == null || e == null)
    return s2 === e;
  const r = typeof s2;
  if (r !== typeof e) return false;
  if (r === "object") {
    t2 || (t2 = /* @__PURE__ */ new Set());
    const i2 = O5(s2, e);
    if (t2.has(i2))
      return true;
    t2.add(i2);
    const o = Array.isArray(s2), n = Array.isArray(e);
    return o && n ? R4(s2, e, t2) : !o && !n ? T3(s2, e, t2) : false;
  }
  return false;
}
function O5(s2, e) {
  return `${v5(s2)}__${v5(e)}`;
}
var P7 = 0;
var p3 = /* @__PURE__ */ new WeakMap();
function v5(s2) {
  return p3.has(s2) || p3.set(s2, ++P7), p3.get(s2);
}
function R4(s2, e, t2) {
  if (s2.length !== e.length) return false;
  const r = new Array(e.length).fill(false);
  e: for (let i2 = 0; i2 < s2.length; i2++) {
    const o = s2[i2];
    for (let n = 0; n < e.length; n++)
      if (!r[n] && g3(o, e[n], t2)) {
        r[n] = true;
        continue e;
      }
    return false;
  }
  return true;
}
function T3(s2, e, t2) {
  const r = Object.keys(s2).sort(), i2 = Object.keys(e).sort();
  if (r.length !== i2.length) return false;
  for (let o = 0; o < r.length; o++)
    if (r[o] !== i2[o]) return false;
  for (const o of r) {
    const n = s2[o], a5 = e[o];
    if (!g3(n, a5, t2))
      return false;
  }
  return true;
}
var k6 = class {
  constructor(e, t2) {
    if (this.id = e, this.registry = t2, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, e !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${e} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((r, i2, o) => {
      this.onStoreUpdated(o, i2);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((r, i2, o) => {
      this.onCoreStoreUpdated(o, i2);
    }), this.readyPromise = new Promise((r) => {
      this.readyResolve = r;
    }), this.readyResolve();
  }
  provides() {
    if (!this._capability) {
      const e = this.buildCapability();
      this._capability = Object.freeze(e);
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
  dispatchCoreAction(e) {
    return this.coreStore.dispatchToCore(e);
  }
  /**
   * Dispatch an action to all plugins
   */
  dispatchToAllPlugins(e) {
    return this.coreStore.dispatch(e);
  }
  /**
   * Dispatch an action
   */
  dispatch(e) {
    return this.pluginStore.dispatch(e);
  }
  /**
   * Dispatch an action with debouncing to prevent rapid repeated calls
   * @param action The action to dispatch
   * @param debounceTime Time in ms to debounce (default: 100ms)
   * @returns boolean indicating whether the action was dispatched or debounced
   */
  debouncedDispatch(e, t2 = 100) {
    const r = Date.now(), i2 = this.debouncedActions[e.type] || 0;
    return r - i2 >= t2 ? (this.debouncedActions[e.type] = r, this.dispatch(e), true) : false;
  }
  /**
   * Subscribe to state changes
   */
  subscribe(e) {
    return this.pluginStore.subscribeToState(e);
  }
  /**
   * Subscribe to core store changes
   */
  subscribeToCoreStore(e) {
    return this.coreStore.subscribe(e);
  }
  /**
   * Called when the plugin store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onStoreUpdated(e, t2) {
  }
  /**
   * Called when the core store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onCoreStoreUpdated(e, t2) {
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
    this.readyPromise = new Promise((e) => {
      this.readyResolve = e;
    });
  }
};
var F5 = class {
  constructor(e, t2) {
    this.handler = e, this.options = t2, this.lastRun = 0, this.handle = (r) => {
      this.options.mode === "debounce" ? this.debounce(r) : this.throttle(r);
    };
  }
  debounce(e) {
    this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(() => {
      this.handler(e), this.timeoutId = void 0;
    }, this.options.wait);
  }
  throttle(e) {
    if (this.options.mode === "debounce") return;
    const t2 = Date.now(), r = this.options.throttleMode || "leading-trailing";
    t2 - this.lastRun >= this.options.wait && (r === "leading-trailing" && this.handler(e), this.lastRun = t2), this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(
      () => {
        this.handler(e), this.lastRun = Date.now(), this.timeoutId = void 0;
      },
      this.options.wait - (t2 - this.lastRun)
    );
  }
  destroy() {
    this.timeoutId && window.clearTimeout(this.timeoutId);
  }
};
function f3() {
  const s2 = /* @__PURE__ */ new Set();
  return {
    emit: (e = void 0) => s2.forEach((t2) => t2(e)),
    on: (e) => (s2.add(e), () => s2.delete(e)),
    off: (e) => s2.delete(e),
    clear: () => s2.clear()
  };
}
function x5(s2, e = g3) {
  const t2 = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map();
  let i2 = s2;
  const o = (a5) => t2.forEach((l3) => l3(a5)), n = (a5, l3) => {
    let c2 = a5, h2 = () => {
    };
    if (l3) {
      const d2 = new F5(a5, l3);
      c2 = d2.handle, h2 = () => d2.destroy(), r.set(a5, { wrapped: c2, destroy: h2 });
    }
    return i2 !== void 0 && c2(i2), t2.add(c2), () => {
      t2.delete(c2), h2(), r.delete(a5);
    };
  };
  return {
    /* emitter behaviour ---------------------------------------- */
    get value() {
      return i2;
    },
    emit(a5 = void 0) {
      (i2 === void 0 || !e(i2, a5)) && (i2 = a5, o(a5));
    },
    on: n,
    off(a5) {
      const l3 = r.get(a5);
      l3 ? (t2.delete(l3.wrapped), l3.destroy(), r.delete(a5)) : t2.delete(a5);
    },
    clear() {
      t2.clear(), r.forEach((a5) => a5.destroy()), r.clear();
    },
    /* derived hook --------------------------------------------- */
    select(a5, l3 = g3) {
      return (c2, h2) => {
        let d2;
        if (i2 !== void 0) {
          const u2 = a5(i2);
          d2 = u2, c2(u2);
        }
        return n(
          (u2) => {
            const b4 = a5(u2);
            (d2 === void 0 || !l3(d2, b4)) && (d2 = b4, c2(b4));
          },
          h2
        );
      };
    }
  };
}
var N6 = "INTERACTION/ACTIVATE_MODE";
var j4 = "INTERACTION/PAUSE";
var D4 = "INTERACTION/RESUME";
var z6 = "INTERACTION/SET_CURSOR";
var L7 = (s2) => ({
  type: N6,
  payload: { mode: s2 }
});
var U4 = (s2) => ({
  type: z6,
  payload: { cursor: s2 }
});
var _5 = () => ({
  type: j4
});
var G4 = () => ({
  type: D4
});
function V3(s2) {
  const e = [
    "onPointerDown",
    "onPointerUp",
    "onPointerMove",
    "onPointerEnter",
    "onPointerLeave",
    "onPointerCancel"
  ], t2 = {};
  for (const r of e)
    t2[r] = (i2, o, n) => {
      var a5;
      for (const l3 of s2) (a5 = l3[r]) == null || a5.call(l3, i2, o, n);
    };
  return t2;
}
var S6 = class extends k6 {
  constructor(e, t2) {
    super(e, t2), this.modes = /* @__PURE__ */ new Map(), this.cursorClaims = /* @__PURE__ */ new Map(), this.buckets = /* @__PURE__ */ new Map(), this.alwaysGlobal = /* @__PURE__ */ new Set(), this.alwaysPage = /* @__PURE__ */ new Map(), this.onModeChange$ = f3(), this.onHandlerChange$ = f3(), this.onCursorChange$ = f3(), this.onStateChange$ = x5(), this.registerMode({
      id: "default",
      scope: "page",
      exclusive: false,
      cursor: "auto"
    });
  }
  async initialize(e) {
  }
  buildCapability() {
    return {
      activate: (e) => this.activate(e),
      onModeChange: this.onModeChange$.on,
      onCursorChange: this.onCursorChange$.on,
      onHandlerChange: this.onHandlerChange$.on,
      onStateChange: this.onStateChange$.on,
      getActiveMode: () => this.state.activeMode,
      getActiveInteractionMode: () => this.getActiveInteractionMode(),
      finish: () => this.activate("default"),
      registerMode: (e) => this.registerMode(e),
      registerHandlers: (e) => this.registerHandlers(e),
      registerAlways: (e) => this.registerAlways(e),
      setCursor: (e, t2, r = 0) => this.setCursor(e, t2, r),
      removeCursor: (e) => this.removeCursor(e),
      getCurrentCursor: () => this.state.cursor,
      getHandlersForScope: (e) => this.getHandlersForScope(e),
      activeModeIsExclusive: () => this.activeModeIsExclusive(),
      pause: () => this.dispatch(_5()),
      resume: () => this.dispatch(G4()),
      isPaused: () => this.state.paused
    };
  }
  activate(e) {
    if (!this.modes.has(e))
      throw new Error(`[interaction] unknown mode '${e}'`);
    if (e === this.state.activeMode) return;
    const t2 = this.state.activeMode;
    this.cursorClaims.clear(), this.notifyHandlersInactive(t2), this.dispatch(L7(e)), this.emitCursor(), this.notifyHandlersActive(e), this.onModeChange$.emit({ ...this.state, activeMode: e });
  }
  notifyHandlersActive(e) {
    this.alwaysGlobal.forEach((i2) => {
      var o;
      (o = i2.onHandlerActiveStart) == null || o.call(i2, e);
    }), this.alwaysPage.forEach((i2) => {
      i2.forEach((o) => {
        var n;
        (n = o.onHandlerActiveStart) == null || n.call(o, e);
      });
    });
    const t2 = this.modes.get(e);
    if (!t2) return;
    const r = this.buckets.get(e);
    r && (t2.scope === "global" && r.global.forEach((i2) => {
      var o;
      (o = i2.onHandlerActiveStart) == null || o.call(i2, e);
    }), t2.scope === "page" && r.page.forEach((i2, o) => {
      i2.forEach((n) => {
        var a5;
        (a5 = n.onHandlerActiveStart) == null || a5.call(n, e);
      });
    }));
  }
  notifyHandlersInactive(e) {
    this.alwaysGlobal.forEach((i2) => {
      var o;
      (o = i2.onHandlerActiveEnd) == null || o.call(i2, e);
    }), this.alwaysPage.forEach((i2) => {
      i2.forEach((o) => {
        var n;
        (n = o.onHandlerActiveEnd) == null || n.call(o, e);
      });
    });
    const t2 = this.modes.get(e);
    if (!t2) return;
    const r = this.buckets.get(e);
    r && (t2.scope === "global" && r.global.forEach((i2) => {
      var o;
      (o = i2.onHandlerActiveEnd) == null || o.call(i2, e);
    }), t2.scope === "page" && r.page.forEach((i2, o) => {
      i2.forEach((n) => {
        var a5;
        (a5 = n.onHandlerActiveEnd) == null || a5.call(n, e);
      });
    }));
  }
  registerMode(e) {
    this.modes.set(e.id, e), this.buckets.has(e.id) || this.buckets.set(e.id, { global: /* @__PURE__ */ new Set(), page: /* @__PURE__ */ new Map() });
  }
  /** ---------- pointer-handler handling ------------ */
  registerHandlers({ modeId: e, handlers: t2, pageIndex: r }) {
    const i2 = Array.isArray(e) ? e : [e], o = [];
    for (const n of i2) {
      const a5 = this.buckets.get(n);
      if (!a5) throw new Error(`unknown mode '${n}'`);
      if (r == null)
        a5.global.add(t2);
      else {
        const l3 = a5.page.get(r) ?? /* @__PURE__ */ new Set();
        l3.add(t2), a5.page.set(r, l3);
      }
      o.push(() => {
        if (r == null)
          a5.global.delete(t2);
        else {
          const l3 = a5.page.get(r);
          l3 && (l3.delete(t2), l3.size === 0 && a5.page.delete(r));
        }
      });
    }
    return this.onHandlerChange$.emit({ ...this.state }), () => {
      o.forEach((n) => n()), this.onHandlerChange$.emit({ ...this.state });
    };
  }
  registerAlways({ scope: e, handlers: t2 }) {
    if (e.type === "global")
      return this.alwaysGlobal.add(t2), this.onHandlerChange$.emit({ ...this.state }), () => this.alwaysGlobal.delete(t2);
    const r = this.alwaysPage.get(e.pageIndex) ?? /* @__PURE__ */ new Set();
    return r.add(t2), this.alwaysPage.set(e.pageIndex, r), this.onHandlerChange$.emit({ ...this.state }), () => {
      r.delete(t2), this.onHandlerChange$.emit({ ...this.state });
    };
  }
  /** Returns the *merged* handler set that should be active for the given
   *  provider (`global` wrapper or a single page wrapper).
   *  – `alwaysGlobal` / `alwaysPage` are **always** active.
   *  – Handlers that belong to the current mode are added on top **iff**
   *    the mode’s own scope matches the provider’s scope.            */
  getHandlersForScope(e) {
    if (!this.state) return null;
    const t2 = this.modes.get(this.state.activeMode);
    if (!t2) return null;
    const r = this.buckets.get(t2.id);
    if (!r) return null;
    const i2 = (a5, l3) => a5.size || l3.size ? V3([...a5, ...l3]) : null;
    if (e.type === "global") {
      const a5 = t2.scope === "global" ? r.global : /* @__PURE__ */ new Set();
      return i2(this.alwaysGlobal, a5);
    }
    const o = this.alwaysPage.get(e.pageIndex) ?? /* @__PURE__ */ new Set(), n = t2.scope === "page" ? r.page.get(e.pageIndex) ?? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set();
    return i2(o, n);
  }
  /** ---------- cursor handling --------------------- */
  setCursor(e, t2, r = 0) {
    this.cursorClaims.set(e, { cursor: t2, priority: r }), this.emitCursor();
  }
  removeCursor(e) {
    this.cursorClaims.delete(e), this.emitCursor();
  }
  emitCursor() {
    var e;
    const t2 = [...this.cursorClaims.values()].sort((r, i2) => i2.priority - r.priority)[0] ?? {
      cursor: ((e = this.modes.get(this.state.activeMode)) == null ? void 0 : e.cursor) ?? "auto"
    };
    t2.cursor !== this.state.cursor && (this.dispatch(U4(t2.cursor)), this.onCursorChange$.emit(t2.cursor));
  }
  onStoreUpdated(e, t2) {
    this.onStateChange$.emit(t2);
  }
  activeModeIsExclusive() {
    const e = this.modes.get(this.state.activeMode);
    return !!(e != null && e.exclusive);
  }
  getActiveInteractionMode() {
    return this.modes.get(this.state.activeMode) ?? null;
  }
  // keep emitter clean
  async destroy() {
    this.onModeChange$.clear(), this.onCursorChange$.clear(), await super.destroy();
  }
};
S6.id = "interaction-manager";
var B4 = "\xAD";
var Z2 = "\u200B";
var W2 = "\u2060";
var q3 = "\uFEFF";
var J2 = "\uFFFE";
var K2 = "\uFFFF";
var Q2 = Object.freeze([
  B4,
  Z2,
  W2,
  q3,
  J2,
  K2
]);
new RegExp(`[${Q2.join("")}]`, "g");
var y4 = Object.freeze([
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
y4.reduce(
  (s2, e) => (s2[e.id] = e, s2),
  {}
);
y4.reduce((s2, e) => (s2[e.css] = e.id, s2), {});
y4.map((s2) => ({
  value: s2.id,
  label: s2.label
}));
var X2 = Object.freeze({
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
  X2
).reduce(
  (s2, [e, t2]) => (s2[t2] = Number(e), s2),
  {}
);

// ../plugin-selection/dist/preact/index.js
var G5 = L8({
  registry: null,
  isInitializing: true,
  pluginsReady: false
});
function H5() {
  const e = z7(G5);
  if (e === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: r, isInitializing: t2 } = e;
  if (t2)
    return e;
  if (r === null)
    throw new Error("PDF registry failed to initialize properly");
  return e;
}
function R5(e) {
  const { registry: r } = H5();
  if (r === null)
    return {
      plugin: null,
      isLoading: true,
      ready: new Promise(() => {
      })
    };
  const t2 = r.getPlugin(e);
  if (!t2)
    throw new Error(`Plugin ${e} not found`);
  return {
    plugin: t2,
    isLoading: false,
    ready: t2.ready()
  };
}
function T4(e) {
  const { plugin: r, isLoading: t2, ready: i2 } = R5(e);
  if (!r)
    return {
      provides: null,
      isLoading: t2,
      ready: i2
    };
  if (!r.provides)
    throw new Error(`Plugin ${e} does not provide a capability`);
  return {
    provides: r.provides(),
    isLoading: t2,
    ready: i2
  };
}
var x6 = () => T4(z5.id);
var I4 = L8({
  registry: null,
  isInitializing: true,
  pluginsReady: false
});

// src/shared/resize-ink.ts
function resizeInkAnnotation(original, newRect, direction, uniform = false) {
  if (original.type !== PdfAnnotationSubtype2.INK) {
    throw new Error("resizeInkAnnotation: original is not an ink annotation");
  }
  const oldRect = original.rect;
  let scaleX = newRect.size.width / oldRect.size.width;
  let scaleY = newRect.size.height / oldRect.size.height;
  const minSize = 10;
  if (newRect.size.width < minSize || newRect.size.height < minSize) {
    scaleX = Math.max(scaleX, minSize / oldRect.size.width);
    scaleY = Math.max(scaleY, minSize / oldRect.size.height);
    newRect = {
      origin: newRect.origin,
      size: {
        width: oldRect.size.width * scaleX,
        height: oldRect.size.height * scaleY
      }
    };
  }
  if (uniform) {
    const minScale = Math.min(scaleX, scaleY);
    scaleX = minScale;
    scaleY = minScale;
    newRect.size = {
      width: oldRect.size.width * minScale,
      height: oldRect.size.height * minScale
    };
  }
  const newInkList = original.inkList.map((stroke) => ({
    points: stroke.points.map((p4) => ({
      x: newRect.origin.x + (p4.x - oldRect.origin.x) * scaleX,
      y: newRect.origin.y + (p4.y - oldRect.origin.y) * scaleY
    }))
  }));
  const avgScale = (scaleX + scaleY) / 2;
  const newStrokeWidth = original.strokeWidth * avgScale;
  return {
    rect: newRect,
    inkList: newInkList,
    strokeWidth: newStrokeWidth
  };
}

// src/preact/components/annotations.tsx
import { Fragment as Fragment6, jsx as jsx7 } from "preact/jsx-runtime";
function Annotations(annotationsProps) {
  const { pageIndex, scale } = annotationsProps;
  const { provides: annotationProvides } = useAnnotationCapability();
  const { provides: selectionProvides } = x6();
  const [annotations, setAnnotations2] = useState2([]);
  const { register } = q({ pageIndex });
  const [selectionState, setSelectionState] = useState2(null);
  useEffect2(() => {
    if (annotationProvides) {
      annotationProvides.onStateChange((state) => {
        setAnnotations2(getAnnotationsByPageIndex(state, pageIndex));
        setSelectionState(getSelectedAnnotationByPageIndex(state, pageIndex));
      });
    }
  }, [annotationProvides]);
  const handlers = useMemo2(
    () => ({
      onPointerDown: (_7, pe) => {
        if (pe.target === pe.currentTarget && annotationProvides) {
          annotationProvides.deselectAnnotation();
        }
      }
    }),
    [annotationProvides]
  );
  const handleClick = useCallback(
    (e, annotation) => {
      e.stopPropagation();
      if (annotationProvides && selectionProvides) {
        annotationProvides.selectAnnotation(pageIndex, annotation.localId);
        selectionProvides.clear();
      }
    },
    [annotationProvides, selectionProvides, pageIndex]
  );
  useEffect2(() => {
    return register(handlers);
  }, [register, handlers]);
  return /* @__PURE__ */ jsx7(Fragment6, { children: annotations.map((annotation) => {
    const isSelected = selectionState?.localId === annotation.localId;
    switch (annotation.object.type) {
      case PdfAnnotationSubtype2.UNDERLINE:
        return /* @__PURE__ */ jsx7(
          AnnotationContainer,
          {
            trackedAnnotation: annotation,
            isSelected,
            isDraggable: false,
            isResizable: false,
            style: {
              mixBlendMode: blendModeToCss(annotation.object.blendMode ?? PdfBlendMode2.Normal)
            },
            ...annotationsProps,
            children: /* @__PURE__ */ jsx7(
              Underline,
              {
                rect: annotation.object.rect,
                color: annotation.object.color,
                opacity: annotation.object.opacity,
                rects: annotation.object.segmentRects,
                scale,
                onClick: (e) => handleClick(e, annotation)
              }
            )
          },
          annotation.localId
        );
      case PdfAnnotationSubtype2.STRIKEOUT:
        return /* @__PURE__ */ jsx7(
          AnnotationContainer,
          {
            trackedAnnotation: annotation,
            isSelected,
            isDraggable: false,
            isResizable: false,
            style: {
              mixBlendMode: blendModeToCss(annotation.object.blendMode ?? PdfBlendMode2.Normal)
            },
            ...annotationsProps,
            children: /* @__PURE__ */ jsx7(
              Strikeout,
              {
                rect: annotation.object.rect,
                color: annotation.object.color,
                opacity: annotation.object.opacity,
                rects: annotation.object.segmentRects,
                scale,
                onClick: (e) => handleClick(e, annotation)
              }
            )
          },
          annotation.localId
        );
      case PdfAnnotationSubtype2.SQUIGGLY:
        return /* @__PURE__ */ jsx7(
          AnnotationContainer,
          {
            trackedAnnotation: annotation,
            isSelected,
            isDraggable: false,
            isResizable: false,
            style: {
              mixBlendMode: blendModeToCss(annotation.object.blendMode ?? PdfBlendMode2.Normal)
            },
            ...annotationsProps,
            children: /* @__PURE__ */ jsx7(
              Squiggly,
              {
                color: annotation.object.color,
                opacity: annotation.object.opacity,
                rects: annotation.object.segmentRects,
                rect: annotation.object.rect,
                scale,
                onClick: (e) => handleClick(e, annotation)
              }
            )
          },
          annotation.localId
        );
      case PdfAnnotationSubtype2.HIGHLIGHT:
        return /* @__PURE__ */ jsx7(
          AnnotationContainer,
          {
            trackedAnnotation: annotation,
            isSelected,
            isDraggable: false,
            isResizable: false,
            style: {
              mixBlendMode: blendModeToCss(
                annotation.object.blendMode ?? PdfBlendMode2.Multiply
              )
            },
            ...annotationsProps,
            children: /* @__PURE__ */ jsx7(
              Highlight,
              {
                color: annotation.object.color,
                opacity: annotation.object.opacity,
                rects: annotation.object.segmentRects,
                scale,
                rect: annotation.object.rect,
                onClick: (e) => handleClick(e, annotation)
              }
            )
          },
          annotation.localId
        );
      case PdfAnnotationSubtype2.INK:
        return /* @__PURE__ */ jsx7(
          AnnotationContainer,
          {
            isSelected,
            trackedAnnotation: annotation,
            outlineOffset: 6,
            computeResizePatch: resizeInkAnnotation,
            style: {
              mixBlendMode: blendModeToCss(annotation.object.blendMode ?? PdfBlendMode2.Normal)
            },
            ...annotationsProps,
            children: (obj) => /* @__PURE__ */ jsx7(
              Ink,
              {
                color: obj.color,
                opacity: obj.opacity,
                strokeWidth: obj.strokeWidth,
                inkList: obj.inkList,
                rect: obj.rect,
                scale,
                onClick: (e) => handleClick(e, annotation)
              }
            )
          },
          annotation.localId
        );
      default:
        return null;
    }
  }) });
}

// src/preact/components/text-markup.tsx
import { useEffect as useEffect3, useState as useState3 } from "preact/hooks";
import { jsx as jsx8 } from "preact/jsx-runtime";
function TextMarkup({ pageIndex, scale }) {
  const { provides: selectionProvides } = x6();
  const { provides: annotationProvides } = useAnnotationCapability();
  const [rects, setRects] = useState3([]);
  const [boundingRect, setBoundingRect] = useState3(null);
  const [activeTool, setActiveTool] = useState3({ variantKey: null, defaults: null });
  useEffect3(() => {
    if (!selectionProvides) return;
    const off = selectionProvides.onSelectionChange(() => {
      setRects(selectionProvides.getHighlightRectsForPage(pageIndex));
      setBoundingRect(selectionProvides.getBoundingRectForPage(pageIndex));
    });
    return off;
  }, [selectionProvides, pageIndex]);
  useEffect3(() => {
    if (!annotationProvides) return;
    const off = annotationProvides.onActiveToolChange(setActiveTool);
    return off;
  }, [annotationProvides]);
  if (!boundingRect) return null;
  switch (activeTool.variantKey) {
    case makeVariantKey(PdfAnnotationSubtype2.UNDERLINE):
      return /* @__PURE__ */ jsx8(
        "div",
        {
          style: {
            mixBlendMode: blendModeToCss(activeTool.defaults?.blendMode ?? PdfBlendMode2.Normal),
            pointerEvents: "none",
            position: "absolute",
            inset: 0
          },
          children: /* @__PURE__ */ jsx8(
            Underline,
            {
              color: activeTool.defaults?.color,
              opacity: activeTool.defaults?.opacity,
              rects,
              scale
            }
          )
        }
      );
    case makeVariantKey(PdfAnnotationSubtype2.HIGHLIGHT):
      return /* @__PURE__ */ jsx8(
        "div",
        {
          style: {
            mixBlendMode: blendModeToCss(activeTool.defaults?.blendMode ?? PdfBlendMode2.Multiply),
            pointerEvents: "none",
            position: "absolute",
            inset: 0
          },
          children: /* @__PURE__ */ jsx8(
            Highlight,
            {
              color: activeTool.defaults?.color,
              opacity: activeTool.defaults?.opacity,
              rects,
              scale
            }
          )
        }
      );
    case makeVariantKey(PdfAnnotationSubtype2.STRIKEOUT):
      return /* @__PURE__ */ jsx8(
        "div",
        {
          style: {
            mixBlendMode: blendModeToCss(activeTool.defaults?.blendMode ?? PdfBlendMode2.Normal),
            pointerEvents: "none",
            position: "absolute",
            inset: 0
          },
          children: /* @__PURE__ */ jsx8(
            Strikeout,
            {
              color: activeTool.defaults?.color,
              opacity: activeTool.defaults?.opacity,
              rects,
              scale
            }
          )
        }
      );
    case makeVariantKey(PdfAnnotationSubtype2.SQUIGGLY):
      return /* @__PURE__ */ jsx8(
        "div",
        {
          style: {
            mixBlendMode: blendModeToCss(activeTool.defaults?.blendMode ?? PdfBlendMode2.Normal),
            pointerEvents: "none",
            position: "absolute",
            inset: 0
          },
          children: /* @__PURE__ */ jsx8(
            Squiggly,
            {
              color: activeTool.defaults?.color,
              opacity: activeTool.defaults?.opacity,
              rects,
              scale
            }
          )
        }
      );
    default:
      return null;
  }
}

// src/preact/components/annotations/ink-paint.tsx
import { useEffect as useEffect4, useMemo as useMemo3, useRef as useRef2, useState as useState4 } from "preact/hooks";
import { jsx as jsx9 } from "preact/jsx-runtime";
var MAX_STROKE_WIDTH = 30;
var InkPaint = ({ pageIndex, scale, pageWidth, pageHeight }) => {
  const { provides: annotationProvides } = useAnnotationCapability();
  const [activeTool, setActiveTool] = useState4({ variantKey: null, defaults: null });
  useEffect4(() => {
    if (!annotationProvides) return;
    const off = annotationProvides.onActiveToolChange(setActiveTool);
    return off;
  }, [annotationProvides]);
  if (!activeTool.defaults) return null;
  if (activeTool.defaults.subtype !== PdfAnnotationSubtype2.INK) return null;
  const toolColor = activeTool.defaults?.color ?? "#000000";
  const toolOpacity = activeTool.defaults?.opacity ?? 1;
  const toolStrokeWidth = activeTool.defaults?.strokeWidth ?? 2;
  const { register } = q({ modeId: "ink", pageIndex });
  const clamp = (v6, min, max) => Math.max(min, Math.min(max, v6));
  const [currentStrokes, setCurrentStrokes] = useState4([]);
  const [isDrawing, setIsDrawing] = useState4(false);
  const timerRef = useRef2(null);
  const pageWidthPDF = pageWidth / scale;
  const pageHeightPDF = pageHeight / scale;
  const handlers = useMemo3(
    () => ({
      onPointerDown: (pos, evt) => {
        const curX = clamp(pos.x, 0, pageWidthPDF);
        const curY = clamp(pos.y, 0, pageHeightPDF);
        setIsDrawing(true);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
          setCurrentStrokes((prev) => [...prev, { points: [{ x: curX, y: curY }] }]);
        } else {
          setCurrentStrokes([{ points: [{ x: curX, y: curY }] }]);
        }
        evt.target?.setPointerCapture?.(evt.pointerId);
      },
      onPointerMove: (pos) => {
        if (!isDrawing) return;
        const curX = clamp(pos.x, 0, pageWidthPDF);
        const curY = clamp(pos.y, 0, pageHeightPDF);
        setCurrentStrokes((prev) => {
          if (!prev.length) return prev;
          const last = prev[prev.length - 1];
          const newLast = { points: [...last.points, { x: curX, y: curY }] };
          return [...prev.slice(0, -1), newLast];
        });
      },
      onPointerUp: (_7, evt) => {
        setIsDrawing(false);
        evt.target?.releasePointerCapture?.(evt.pointerId);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          if (currentStrokes.length && annotationProvides) {
            const allPoints2 = currentStrokes.flatMap((s2) => s2.points);
            if (!allPoints2.length) return;
            const minX2 = Math.min(...allPoints2.map((p4) => p4.x));
            const minY2 = Math.min(...allPoints2.map((p4) => p4.y));
            const maxX2 = Math.max(...allPoints2.map((p4) => p4.x));
            const maxY2 = Math.max(...allPoints2.map((p4) => p4.y));
            const halfStroke2 = MAX_STROKE_WIDTH / 2;
            const rectMinX = minX2 - halfStroke2;
            const rectMinY = minY2 - halfStroke2;
            const rectMaxX = maxX2 + halfStroke2;
            const rectMaxY = maxY2 + halfStroke2;
            if (rectMaxX - rectMinX < 1 || rectMaxY - rectMinY < 1) return;
            const rect = {
              origin: { x: rectMinX, y: rectMinY },
              size: { width: rectMaxX - rectMinX, height: rectMaxY - rectMinY }
            };
            const anno = {
              type: PdfAnnotationSubtype2.INK,
              rect,
              inkList: currentStrokes,
              color: toolColor,
              opacity: toolOpacity,
              strokeWidth: toolStrokeWidth,
              pageIndex,
              id: Date.now() + Math.random()
            };
            annotationProvides.createAnnotation(pageIndex, anno);
            annotationProvides.setActiveVariant(null);
            annotationProvides.selectAnnotation(pageIndex, anno.id);
          }
          setCurrentStrokes([]);
          timerRef.current = null;
        }, 3e3);
      },
      onPointerCancel: (_7, evt) => {
        setIsDrawing(false);
        evt.target?.releasePointerCapture?.(evt.pointerId);
        setCurrentStrokes([]);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      }
    }),
    [
      pageWidthPDF,
      pageHeightPDF,
      currentStrokes,
      annotationProvides,
      pageIndex,
      toolColor,
      toolOpacity,
      toolStrokeWidth,
      isDrawing
    ]
  );
  useEffect4(() => {
    if (!register) return;
    return register(handlers);
  }, [register, handlers]);
  useEffect4(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  if (!currentStrokes.length) return null;
  const allPoints = currentStrokes.flatMap((s2) => s2.points);
  if (!allPoints.length) return null;
  const minX = Math.min(...allPoints.map((p4) => p4.x));
  const minY = Math.min(...allPoints.map((p4) => p4.y));
  const maxX = Math.max(...allPoints.map((p4) => p4.x));
  const maxY = Math.max(...allPoints.map((p4) => p4.y));
  const halfStroke = MAX_STROKE_WIDTH / 2;
  const svgMinX = minX - halfStroke;
  const svgMinY = minY - halfStroke;
  const svgMaxX = maxX + halfStroke;
  const svgMaxY = maxY + halfStroke;
  const dw = svgMaxX - svgMinX;
  const dh = svgMaxY - svgMinY;
  const paths = currentStrokes.map(({ points }) => {
    let d2 = "";
    points.forEach(({ x: x7, y: y5 }, i2) => {
      const lx = x7 - svgMinX;
      const ly = y5 - svgMinY;
      d2 += (i2 === 0 ? "M" : "L") + lx + " " + ly + " ";
    });
    return d2.trim();
  });
  return /* @__PURE__ */ jsx9(
    "svg",
    {
      style: {
        position: "absolute",
        left: svgMinX * scale,
        top: svgMinY * scale,
        width: dw * scale,
        height: dh * scale,
        pointerEvents: "none",
        zIndex: 2
      },
      width: dw * scale,
      height: dh * scale,
      viewBox: `0 0 ${dw} ${dh}`,
      children: paths.map((d2, i2) => /* @__PURE__ */ jsx9(
        "path",
        {
          d: d2,
          fill: "none",
          stroke: toolColor,
          strokeWidth: toolStrokeWidth,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          opacity: toolOpacity
        },
        i2
      ))
    }
  );
};

// src/preact/components/annotation-layer.tsx
import { jsx as jsx10, jsxs as jsxs2 } from "preact/jsx-runtime";
function AnnotationLayer({
  pageIndex,
  scale,
  pageWidth,
  pageHeight,
  rotation,
  style,
  ...props
}) {
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      style: {
        ...style
      },
      ...props,
      children: [
        /* @__PURE__ */ jsx10(Annotations, { pageIndex, scale, rotation }),
        /* @__PURE__ */ jsx10(TextMarkup, { pageIndex, scale }),
        /* @__PURE__ */ jsx10(InkPaint, { pageIndex, scale, pageWidth, pageHeight })
      ]
    }
  );
}
export {
  AnnotationLayer,
  useAnnotationCapability,
  useAnnotationPlugin
};
//# sourceMappingURL=index.js.map