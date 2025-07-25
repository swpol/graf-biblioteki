const _ = "SET_DOCUMENT";
var D = "­", $ = "​", E = "⁠", H = "\uFEFF", B = "￾", G = "￿", U = Object.freeze([
  D,
  $,
  E,
  H,
  B,
  G
]);
new RegExp(`[${U.join("")}]`, "g");
var F = Object.freeze([
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
F.reduce(
  (e, t) => (e[t.id] = t, e),
  {}
);
F.reduce((e, t) => (e[t.css] = t.id, e), {});
F.map((e) => ({
  value: e.id,
  label: e.label
}));
var V = Object.freeze({
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
  V
).reduce(
  (e, [t, s]) => (e[s] = Number(t), e),
  {}
);
function y(e, t, s) {
  if (e === t)
    return !0;
  if (e == null || t == null)
    return e === t;
  const i = typeof e;
  if (i !== typeof t) return !1;
  if (i === "object") {
    s || (s = /* @__PURE__ */ new Set());
    const n = W(e, t);
    if (s.has(n))
      return !0;
    s.add(n);
    const o = Array.isArray(e), c = Array.isArray(t);
    return o && c ? Y(e, t, s) : !o && !c ? Z(e, t, s) : !1;
  }
  return !1;
}
function W(e, t) {
  return `${I(e)}__${I(t)}`;
}
let X = 0;
const R = /* @__PURE__ */ new WeakMap();
function I(e) {
  return R.has(e) || R.set(e, ++X), R.get(e);
}
function Y(e, t, s) {
  if (e.length !== t.length) return !1;
  const i = new Array(t.length).fill(!1);
  t: for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (let c = 0; c < t.length; c++)
      if (!i[c] && y(o, t[c], s)) {
        i[c] = !0;
        continue t;
      }
    return !1;
  }
  return !0;
}
function Z(e, t, s) {
  const i = Object.keys(e).sort(), n = Object.keys(t).sort();
  if (i.length !== n.length) return !1;
  for (let o = 0; o < i.length; o++)
    if (i[o] !== n[o]) return !1;
  for (const o of i) {
    const c = e[o], a = t[o];
    if (!y(c, a, s))
      return !1;
  }
  return !0;
}
class J {
  constructor(t, s) {
    if (this.id = t, this.registry = s, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((i, n, o) => {
      this.onStoreUpdated(o, n);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((i, n, o) => {
      this.onCoreStoreUpdated(o, n);
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
  debouncedDispatch(t, s = 100) {
    const i = Date.now(), n = this.debouncedActions[t.type] || 0;
    return i - n >= s ? (this.debouncedActions[t.type] = i, this.dispatch(t), !0) : !1;
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
  onStoreUpdated(t, s) {
  }
  /**
   * Called when the core store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onCoreStoreUpdated(t, s) {
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
}
class q {
  constructor(t, s) {
    this.handler = t, this.options = s, this.lastRun = 0, this.handle = (i) => {
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
    const s = Date.now(), i = this.options.throttleMode || "leading-trailing";
    s - this.lastRun >= this.options.wait && (i === "leading-trailing" && this.handler(t), this.lastRun = s), this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(
      () => {
        this.handler(t), this.lastRun = Date.now(), this.timeoutId = void 0;
      },
      this.options.wait - (s - this.lastRun)
    );
  }
  destroy() {
    this.timeoutId && window.clearTimeout(this.timeoutId);
  }
}
function x() {
  const e = /* @__PURE__ */ new Set();
  return {
    emit: (t = void 0) => e.forEach((s) => s(t)),
    on: (t) => (e.add(t), () => e.delete(t)),
    off: (t) => e.delete(t),
    clear: () => e.clear()
  };
}
function N(e, t = y) {
  const s = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
  let n = e;
  const o = (a) => s.forEach((r) => r(a)), c = (a, r) => {
    let u = a, l = () => {
    };
    if (r) {
      const h = new q(a, r);
      u = h.handle, l = () => h.destroy(), i.set(a, { wrapped: u, destroy: l });
    }
    return n !== void 0 && u(n), s.add(u), () => {
      s.delete(u), l(), i.delete(a);
    };
  };
  return {
    /* emitter behaviour ---------------------------------------- */
    get value() {
      return n;
    },
    emit(a = void 0) {
      (n === void 0 || !t(n, a)) && (n = a, o(a));
    },
    on: c,
    off(a) {
      const r = i.get(a);
      r ? (s.delete(r.wrapped), r.destroy(), i.delete(a)) : s.delete(a);
    },
    clear() {
      s.clear(), i.forEach((a) => a.destroy()), i.clear();
    },
    /* derived hook --------------------------------------------- */
    select(a, r = y) {
      return (u, l) => {
        let h;
        if (n !== void 0) {
          const d = a(n);
          h = d, u(d);
        }
        return c(
          (d) => {
            const g = a(d);
            (h === void 0 || !r(h, g)) && (h = g, u(g));
          },
          l
        );
      };
    }
  };
}
function L(e) {
  if (e.length === 0) return null;
  let t = e[0].origin.x, s = e[0].origin.y, i = e[0].origin.x + e[0].size.width, n = e[0].origin.y + e[0].size.height;
  for (const o of e)
    t = Math.min(t, o.origin.x), s = Math.min(s, o.origin.y), i = Math.max(i, o.origin.x + o.size.width), n = Math.max(n, o.origin.y + o.size.height);
  return {
    origin: {
      x: t,
      y: s
    },
    size: {
      width: i - t,
      height: n - s
    }
  };
}
var K = class extends Error {
  constructor(e) {
    super(`Task aborted: ${JSON.stringify(e)}`), this.name = "TaskAbortedError";
  }
}, Q = class extends Error {
  constructor(e) {
    super(`Task rejected: ${JSON.stringify(e)}`), this.name = "TaskRejectedError";
  }
}, p = class S {
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
    return this._promise || (this._promise = new Promise((t, s) => {
      this.wait(
        (i) => t(i),
        (i) => {
          i.type === "abort" ? s(new K(i.reason)) : s(new Q(i.reason));
        }
      );
    })), this._promise;
  }
  /**
   * wait for task to be settled
   * @param resolvedCallback - callback for resolved value
   * @param rejectedCallback - callback for rejected value
   */
  wait(t, s) {
    switch (this.state.stage) {
      case 0:
        this.resolvedCallbacks.push(t), this.rejectedCallbacks.push(s);
        break;
      case 1:
        t(this.state.result);
        break;
      case 2:
        s({
          type: "reject",
          reason: this.state.reason
        });
        break;
      case 3:
        s({
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
  resolve(t) {
    if (this.state.stage === 0) {
      this.state = {
        stage: 1,
        result: t
      };
      for (const s of this.resolvedCallbacks)
        try {
          s(t);
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
  reject(t) {
    if (this.state.stage === 0) {
      this.state = {
        stage: 2,
        reason: t
      };
      for (const s of this.rejectedCallbacks)
        try {
          s({
            type: "reject",
            reason: t
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
  abort(t) {
    if (this.state.stage === 0) {
      this.state = {
        stage: 3,
        reason: t
      };
      for (const s of this.rejectedCallbacks)
        try {
          s({
            type: "abort",
            reason: t
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
  fail(t) {
    t.type === "abort" ? this.abort(t.reason) : this.reject(t.reason);
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
  static all(t) {
    const s = new S();
    if (t.length === 0)
      return s.resolve([]), s;
    const i = new Array(t.length);
    let n = 0, o = !1;
    return t.forEach((c, a) => {
      c.wait(
        (r) => {
          o || (i[a] = r, n++, n === t.length && (o = !0, s.resolve(i)));
        },
        (r) => {
          o || (o = !0, r.type === "abort" ? s.abort(r.reason) : s.reject(r.reason));
        }
      );
    }), s;
  }
  /**
   * Static method to wait for all tasks to settle (resolve, reject, or abort)
   * Always resolves with an array of settlement results
   *
   * @param tasks - array of tasks to wait for
   * @returns new task that resolves when all input tasks settle
   * @public
   */
  static allSettled(t) {
    const s = new S();
    if (t.length === 0)
      return s.resolve([]), s;
    const i = new Array(t.length);
    let n = 0;
    return t.forEach((o, c) => {
      o.wait(
        (a) => {
          i[c] = { status: "resolved", value: a }, n++, n === t.length && s.resolve(i);
        },
        (a) => {
          i[c] = {
            status: a.type === "abort" ? "aborted" : "rejected",
            reason: a.reason
          }, n++, n === t.length && s.resolve(i);
        }
      );
    }), s;
  }
  /**
   * Static method that resolves/rejects with the first task that settles
   *
   * @param tasks - array of tasks to race
   * @returns new task that settles with the first input task that settles
   * @public
   */
  static race(t) {
    const s = new S();
    if (t.length === 0)
      return s.reject("No tasks provided"), s;
    let i = !1;
    return t.forEach((n) => {
      n.wait(
        (o) => {
          i || (i = !0, s.resolve(o));
        },
        (o) => {
          i || (i = !0, o.type === "abort" ? s.abort(o.reason) : s.reject(o.reason));
        }
      );
    }), s;
  }
  /**
   * Utility to track progress of multiple tasks
   *
   * @param tasks - array of tasks to track
   * @param onProgress - callback called when any task completes
   * @returns new task that resolves when all input tasks resolve
   * @public
   */
  static withProgress(t, s) {
    const i = S.all(t);
    if (s) {
      let n = 0;
      t.forEach((o) => {
        o.wait(
          () => {
            n++, s(n, t.length);
          },
          () => {
            n++, s(n, t.length);
          }
        );
      });
    }
    return i;
  }
}, P = "­", tt = "​", et = "⁠", st = "\uFEFF", it = "￾", nt = "￿", ot = Object.freeze([
  P,
  tt,
  et,
  st,
  it,
  nt
]);
new RegExp(`[${ot.join("")}]`, "g");
var A = Object.freeze([
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
A.reduce(
  (e, t) => (e[t.id] = t, e),
  {}
);
A.reduce((e, t) => (e[t.css] = t.id, e), {});
A.map((e) => ({
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
  (e, [t, s]) => (e[s] = Number(t), e),
  {}
);
var T = /* @__PURE__ */ ((e) => (e[e.Ok = 0] = "Ok", e[e.Unknown = 1] = "Unknown", e[e.NotFound = 2] = "NotFound", e[e.WrongFormat = 3] = "WrongFormat", e[e.Password = 4] = "Password", e[e.Security = 5] = "Security", e[e.PageError = 6] = "PageError", e[e.XFALoad = 7] = "XFALoad", e[e.XFALayout = 8] = "XFALayout", e[e.Cancelled = 9] = "Cancelled", e[e.Initialization = 10] = "Initialization", e[e.NotReady = 11] = "NotReady", e[e.NotSupport = 12] = "NotSupport", e[e.LoadDoc = 13] = "LoadDoc", e[e.DocNotOpen = 14] = "DocNotOpen", e[e.CantCloseDoc = 15] = "CantCloseDoc", e[e.CantCreateNewDoc = 16] = "CantCreateNewDoc", e[e.CantImportPages = 17] = "CantImportPages", e[e.CantCreateAnnot = 18] = "CantCreateAnnot", e[e.CantSetAnnotRect = 19] = "CantSetAnnotRect", e[e.CantSetAnnotContent = 20] = "CantSetAnnotContent", e[e.CantRemoveInkList = 21] = "CantRemoveInkList", e[e.CantAddInkStoke = 22] = "CantAddInkStoke", e[e.CantReadAttachmentSize = 23] = "CantReadAttachmentSize", e[e.CantReadAttachmentContent = 24] = "CantReadAttachmentContent", e[e.CantFocusAnnot = 25] = "CantFocusAnnot", e[e.CantSelectText = 26] = "CantSelectText", e[e.CantSelectOption = 27] = "CantSelectOption", e[e.CantCheckField = 28] = "CantCheckField", e))(T || {}), m = class {
  /**
   * Create a task
   * @returns new task
   */
  static create() {
    return new p();
  }
  /**
   * Create a task that has been resolved with value
   * @param result - resolved value
   * @returns resolved task
   */
  static resolve(e) {
    const t = new p();
    return t.resolve(e), t;
  }
  /**
   * Create a task that has been rejected with error
   * @param reason - rejected error
   * @returns rejected task
   */
  static reject(e) {
    const t = new p();
    return t.reject(e), t;
  }
  /**
   * Create a task that has been aborted with error
   * @param reason - aborted error
   * @returns aborted task
   */
  static abort(e) {
    const t = new p();
    return t.reject(e), t;
  }
};
function v() {
}
const ct = "CACHE_PAGE_GEOMETRY", rt = "SET_SELECTION", lt = "START_SELECTION", ht = "END_SELECTION", ut = "CLEAR_SELECTION", dt = "SET_RECTS", gt = "SET_SLICES", bt = "RESET", St = (e, t) => ({
  type: ct,
  payload: { page: e, geo: t }
}), pt = (e) => ({
  type: rt,
  payload: e
}), mt = () => ({ type: lt }), yt = () => ({ type: ht }), ft = () => ({ type: ut }), wt = (e) => ({
  type: dt,
  payload: e
}), Rt = (e) => ({ type: gt, payload: e }), xt = () => ({ type: bt });
function j(e, t) {
  return e.rects[t] ?? [];
}
function k(e, t) {
  return L(j(e, t));
}
function vt(e) {
  const t = [], s = e.rects;
  for (const i in s) {
    const n = Number(i), o = L(s[n]);
    o && t.push({ page: n, rect: o });
  }
  return t;
}
function Tt(e, t) {
  const s = e.rects[t] || [];
  if (s.length === 0) return null;
  const i = k(e, t);
  return i ? { pageIndex: t, rect: i, segmentRects: s } : null;
}
function Ct(e) {
  const t = [], s = Object.keys(e.rects).map(Number);
  for (const i of s) {
    const n = e.rects[i] || [];
    if (n.length === 0) continue;
    const o = k(e, i);
    o && t.push({
      pageIndex: i,
      rect: o,
      segmentRects: n
    });
  }
  return t;
}
function zt(e, t) {
  for (const s of e.runs) {
    if (!(t.y >= s.rect.y && t.y <= s.rect.y + s.rect.height && t.x >= s.rect.x && t.x <= s.rect.x + s.rect.width)) continue;
    const n = s.glyphs.findIndex(
      (o) => t.x >= o.x && t.x <= o.x + o.width && t.y >= o.y && t.y <= o.y + o.height
    );
    if (n !== -1)
      return s.charStart + n;
  }
  return -1;
}
function Ft(e, t, s) {
  if (!e || !t || s < e.start.page || s > e.end.page) return null;
  const i = s === e.start.page ? e.start.index : 0, n = t.runs[t.runs.length - 1], o = n.charStart + n.glyphs.length - 1, c = s === e.end.page ? e.end.index : o;
  return { from: i, to: c };
}
function At(e, t, s, i = !0) {
  const n = [];
  for (const o of e.runs) {
    const c = o.charStart, a = c + o.glyphs.length - 1;
    if (a < t || c > s) continue;
    const r = Math.max(t, c) - c, u = Math.min(s, a) - c;
    let l = 1 / 0, h = -1 / 0, d = 1 / 0, g = -1 / 0, f = 0;
    for (let w = r; w <= u; w++) {
      const b = o.glyphs[w];
      b.flags !== 2 && (l = Math.min(l, b.x), h = Math.max(h, b.x + b.width), d = Math.min(d, b.y), g = Math.max(g, b.y + b.height), f++);
    }
    l !== 1 / 0 && f > 0 && n.push({
      rect: {
        origin: { x: l, y: d },
        size: { width: h - l, height: g - d }
      },
      charCount: f
    });
  }
  return i ? Nt(n) : n.map((o) => o.rect);
}
function M(e, t) {
  const s = Math.min(e.origin.x, t.origin.x), i = Math.min(e.origin.y, t.origin.y), n = Math.max(e.origin.x + e.size.width, t.origin.x + t.size.width), o = Math.max(e.origin.y + e.size.height, t.origin.y + t.size.height);
  return {
    origin: { x: s, y: i },
    size: { width: n - s, height: o - i }
  };
}
function kt(e, t) {
  const s = Math.max(e.origin.x, t.origin.x), i = Math.max(e.origin.y, t.origin.y), n = Math.min(e.origin.x + e.size.width, t.origin.x + t.size.width), o = Math.min(e.origin.y + e.size.height, t.origin.y + t.size.height), c = Math.max(0, n - s), a = Math.max(0, o - i);
  return {
    origin: { x: s, y: i },
    size: { width: c, height: a }
  };
}
function C(e) {
  return e.size.width <= 0 || e.size.height <= 0;
}
function Ot(e, t) {
  if (C(e) || C(t)) return 0;
  const s = M(e, t);
  return s.size.height === e.size.height || s.size.height === t.size.height ? 1 : kt(e, t).size.height / s.size.height;
}
function It(e, t) {
  const i = e.rect, n = t.rect;
  if (Ot(i, n) < 0.8)
    return !1;
  const o = 1, c = o * i.size.width / e.charCount, a = o * n.size.width / t.charCount, r = i.origin.x - c, u = i.origin.x + i.size.width + c, l = n.origin.x - a, h = n.origin.x + n.size.width + a;
  return r < h && u > l;
}
function Nt(e) {
  const t = [];
  let s = null, i = null;
  for (const n of e)
    s && i ? It(s, n) ? i = M(i, n.rect) : (t.push(i), i = n.rect) : i = n.rect, s = n;
  return i && !C(i) && t.push(i), t;
}
const O = class O extends J {
  constructor(t, s, i) {
    super(t, s), this.engine = i, this.enabledModes = /* @__PURE__ */ new Set(["default"]), this.selecting = !1, this.selChange$ = N(), this.textRetrieved$ = N(), this.copyToClipboard$ = x(), this.beginSelection$ = x(), this.endSelection$ = x(), this.coreStore.onAction(_, (n) => {
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
      getGeometry: (t) => this.getOrLoadGeometry(t),
      getFormattedSelection: () => Ct(this.state),
      getFormattedSelectionForPage: (t) => Tt(this.state, t),
      getHighlightRectsForPage: (t) => j(this.state, t),
      getHighlightRects: () => this.state.rects,
      getBoundingRectForPage: (t) => k(this.state, t),
      getBoundingRects: () => vt(this.state),
      begin: (t, s) => this.beginSelection(t, s),
      update: (t, s) => this.updateSelection(t, s),
      end: () => this.endSelection(),
      clear: () => this.clearSelection(),
      onCopyToClipboard: this.copyToClipboard$.on,
      onSelectionChange: this.selChange$.on,
      onTextRetrieved: this.textRetrieved$.on,
      onBeginSelection: this.beginSelection$.on,
      onEndSelection: this.endSelection$.on,
      getSelectedText: () => this.getSelectedText(),
      copyToClipboard: () => this.copyToClipboard(),
      enableForMode: (t) => this.enabledModes.add(t),
      isEnabledForMode: (t) => this.enabledModes.has(t),
      getState: () => this.state
    };
  }
  /* ── geometry cache ───────────────────────────────────── */
  getOrLoadGeometry(t) {
    const s = this.state.geometry[t];
    if (s) return m.resolve(s);
    if (!this.coreState.core.document)
      return m.reject({ code: T.NotFound, message: "Doc Not Found" });
    const i = this.coreState.core.document.pages.find((o) => o.index === t), n = this.engine.getPageGeometry(this.coreState.core.document, i);
    return n.wait((o) => {
      this.dispatch(St(t, o));
    }, v), n;
  }
  /* ── selection state updates ───────────────────────────── */
  beginSelection(t, s) {
    this.selecting = !0, this.anchor = { page: t, index: s }, this.dispatch(mt()), this.beginSelection$.emit({ page: t, index: s });
  }
  endSelection() {
    this.selecting = !1, this.anchor = void 0, this.dispatch(yt()), this.endSelection$.emit();
  }
  clearSelection() {
    this.selecting = !1, this.anchor = void 0, this.dispatch(ft()), this.selChange$.emit(null);
  }
  updateSelection(t, s) {
    if (!this.selecting || !this.anchor) return;
    const i = this.anchor, n = t > i.page || t === i.page && s >= i.index, a = { start: n ? i : { page: t, index: s }, end: n ? { page: t, index: s } : i };
    this.dispatch(pt(a)), this.updateRectsAndSlices(a), this.selChange$.emit(a);
  }
  updateRectsAndSlices(t) {
    const s = {}, i = {};
    for (let n = t.start.page; n <= t.end.page; n++) {
      const o = this.state.geometry[n], c = Ft(t, o, n);
      c && (s[n] = At(o, c.from, c.to), i[n] = { start: c.from, count: c.to - c.from + 1 });
    }
    this.dispatch(wt(s)), this.dispatch(Rt(i));
  }
  getSelectedText() {
    if (!this.coreState.core.document || !this.state.selection)
      return m.reject({
        code: T.NotFound,
        message: "Doc Not Found or No Selection"
      });
    const t = this.state.selection, s = [];
    for (let n = t.start.page; n <= t.end.page; n++) {
      const o = this.state.slices[n];
      o && s.push({ pageIndex: n, charIndex: o.start, charCount: o.count });
    }
    if (s.length === 0) return m.resolve([]);
    const i = this.engine.getTextSlices(this.coreState.core.document, s);
    return i.wait((n) => {
      this.textRetrieved$.emit(n);
    }, v), i;
  }
  copyToClipboard() {
    this.getSelectedText().wait((s) => {
      this.copyToClipboard$.emit(s.join(`
`));
    }, v);
  }
};
O.id = "selection";
let z = O;
export {
  ut as C,
  ht as E,
  T as P,
  bt as R,
  gt as S,
  dt as a,
  lt as b,
  rt as c,
  ct as d,
  z as e,
  M as f,
  zt as g,
  kt as h,
  C as i,
  Ot as j,
  It as k,
  v as l,
  Nt as m,
  At as r,
  Ft as s
};
//# sourceMappingURL=selection-plugin-Bns-tQIi.js.map
