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

// src/react/index.ts
var react_exports = {};
__export(react_exports, {
  PanMode: () => PanMode,
  usePan: () => usePan,
  usePanCapability: () => usePanCapability,
  usePanPlugin: () => usePanPlugin
});
module.exports = __toCommonJS(react_exports);

// ../core/dist/react/index.js
var import_preact2 = require("preact");
var import_hooks = require("preact/hooks");

// ../core/dist/jsxRuntime.module-Bzuv3cXw.js
var import_preact = require("preact");

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

// ../core/dist/react/index.js
function B(e, r) {
  for (var t2 in r) e[t2] = r[t2];
  return e;
}
function S(e, r) {
  for (var t2 in e) if (t2 !== "__source" && !(t2 in r)) return true;
  for (var o in r) if (o !== "__source" && e[o] !== r[o]) return true;
  return false;
}
function k2(e, r) {
  this.props = e, this.context = r;
}
(k2.prototype = new import_preact2.Component()).isPureReactComponent = true, k2.prototype.shouldComponentUpdate = function(e, r) {
  return S(this.props, e) || S(this.state, r);
};
var C = import_preact2.options.__b;
import_preact2.options.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), C && C(e);
};
var M2 = import_preact2.options.__e;
import_preact2.options.__e = function(e, r, t2, o) {
  if (e.then) {
    for (var n, u2 = r; u2 = u2.__; ) if ((n = u2.__c) && n.__c) return r.__e == null && (r.__e = t2.__e, r.__k = t2.__k), n.__c(e, r);
  }
  M2(e, r, t2, o);
};
var E = import_preact2.options.unmount;
function U(e, r, t2) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(o) {
    typeof o.__c == "function" && o.__c();
  }), e.__c.__H = null), (e = B({}, e)).__c != null && (e.__c.__P === t2 && (e.__c.__P = r), e.__c.__e = true, e.__c = null), e.__k = e.__k && e.__k.map(function(o) {
    return U(o, r, t2);
  })), e;
}
function z2(e, r, t2) {
  return e && t2 && (e.__v = null, e.__k = e.__k && e.__k.map(function(o) {
    return z2(o, r, t2);
  }), e.__c && e.__c.__P === r && (e.__e && t2.appendChild(e.__e), e.__c.__e = true, e.__c.__P = t2)), e;
}
function y() {
  this.__u = 0, this.o = null, this.__b = null;
}
function A(e) {
  var r = e.__.__c;
  return r && r.__a && r.__a(e);
}
function v2() {
  this.i = null, this.l = null;
}
import_preact2.options.unmount = function(e) {
  var r = e.__c;
  r && r.__R && r.__R(), r && 32 & e.__u && (e.type = null), E && E(e);
}, (y.prototype = new import_preact2.Component()).__c = function(e, r) {
  var t2 = r.__c, o = this;
  o.o == null && (o.o = []), o.o.push(t2);
  var n = A(o.__v), u2 = false, i2 = function() {
    u2 || (u2 = true, t2.__R = null, n ? n(l4) : l4());
  };
  t2.__R = i2;
  var l4 = function() {
    if (!--o.__u) {
      if (o.state.__a) {
        var a4 = o.state.__a;
        o.__v.__k[0] = z2(a4, a4.__c.__P, a4.__c.__O);
      }
      var _5;
      for (o.setState({ __a: o.__b = null }); _5 = o.o.pop(); ) _5.forceUpdate();
    }
  };
  o.__u++ || 32 & r.__u || o.setState({ __a: o.__b = o.__v.__k[0] }), e.then(i2, i2);
}, y.prototype.componentWillUnmount = function() {
  this.o = [];
}, y.prototype.render = function(e, r) {
  if (this.__b) {
    if (this.__v.__k) {
      var t2 = document.createElement("div"), o = this.__v.__k[0].__c;
      this.__v.__k[0] = U(this.__b, t2, o.__O = o.__P);
    }
    this.__b = null;
  }
  var n = r.__a && (0, import_preact2.createElement)(import_preact2.Fragment, null, e.fallback);
  return n && (n.__u &= -33), [(0, import_preact2.createElement)(import_preact2.Fragment, null, r.__a ? null : e.children), n];
};
var R = function(e, r, t2) {
  if (++t2[1] === t2[0] && e.l.delete(r), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (t2 = e.i; t2; ) {
    for (; t2.length > 3; ) t2.pop()();
    if (t2[1] < t2[0]) break;
    e.i = t2 = t2[2];
  }
};
(v2.prototype = new import_preact2.Component()).__a = function(e) {
  var r = this, t2 = A(r.__v), o = r.l.get(e);
  return o[0]++, function(n) {
    var u2 = function() {
      r.props.revealOrder ? (o.push(n), R(r, e, o)) : n();
    };
    t2 ? t2(u2) : u2();
  };
}, v2.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var r = (0, import_preact2.toChildArray)(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && r.reverse();
  for (var t2 = r.length; t2--; ) this.l.set(r[t2], this.i = [1, 0, this.i]);
  return e.children;
}, v2.prototype.componentDidUpdate = v2.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(r, t2) {
    R(e, t2, r);
  });
};
var T = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103;
var q = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
var I = /^on(Ani|Tra|Tou|BeforeInp|Compo)/;
var Z = /[A-Z0-9]/g;
var G = typeof document < "u";
var J = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
import_preact2.Component.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(import_preact2.Component.prototype, e, { configurable: true, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(r) {
    Object.defineProperty(this, e, { configurable: true, writable: true, value: r });
  } });
});
var x = import_preact2.options.event;
function K() {
}
function Q() {
  return this.cancelBubble;
}
function X() {
  return this.defaultPrevented;
}
import_preact2.options.event = function(e) {
  return x && (e = x(e)), e.persist = K, e.isPropagationStopped = Q, e.isDefaultPrevented = X, e.nativeEvent = e;
};
var Y = { enumerable: false, configurable: true, get: function() {
  return this.class;
} };
var O = import_preact2.options.vnode;
import_preact2.options.vnode = function(e) {
  typeof e.type == "string" && function(r) {
    var t2 = r.props, o = r.type, n = {}, u2 = o.indexOf("-") === -1;
    for (var i2 in t2) {
      var l4 = t2[i2];
      if (!(i2 === "value" && "defaultValue" in t2 && l4 == null || G && i2 === "children" && o === "noscript" || i2 === "class" || i2 === "className")) {
        var a4 = i2.toLowerCase();
        i2 === "defaultValue" && "value" in t2 && t2.value == null ? i2 = "value" : i2 === "download" && l4 === true ? l4 = "" : a4 === "translate" && l4 === "no" ? l4 = false : a4[0] === "o" && a4[1] === "n" ? a4 === "ondoubleclick" ? i2 = "ondblclick" : a4 !== "onchange" || o !== "input" && o !== "textarea" || J(t2.type) ? a4 === "onfocus" ? i2 = "onfocusin" : a4 === "onblur" ? i2 = "onfocusout" : I.test(i2) && (i2 = a4) : a4 = i2 = "oninput" : u2 && q.test(i2) ? i2 = i2.replace(Z, "-$&").toLowerCase() : l4 === null && (l4 = void 0), a4 === "oninput" && n[i2 = a4] && (i2 = "oninputCapture"), n[i2] = l4;
      }
    }
    o == "select" && n.multiple && Array.isArray(n.value) && (n.value = (0, import_preact2.toChildArray)(t2.children).forEach(function(_5) {
      _5.props.selected = n.value.indexOf(_5.props.value) != -1;
    })), o == "select" && n.defaultValue != null && (n.value = (0, import_preact2.toChildArray)(t2.children).forEach(function(_5) {
      _5.props.selected = n.multiple ? n.defaultValue.indexOf(_5.props.value) != -1 : n.defaultValue == _5.props.value;
    })), t2.class && !t2.className ? (n.class = t2.class, Object.defineProperty(n, "className", Y)) : (t2.className && !t2.class || t2.class && t2.className) && (n.class = n.className = t2.className), r.props = n;
  }(e), e.$$typeof = T, O && O(e);
};
var D = import_preact2.options.__r;
import_preact2.options.__r = function(e) {
  D && D(e), e.__c;
};
var N2 = import_preact2.options.diffed;
import_preact2.options.diffed = function(e) {
  N2 && N2(e);
  var r = e.props, t2 = e.__e;
  t2 != null && e.type === "textarea" && "value" in r && r.value !== t2.value && (t2.value = r.value == null ? "" : r.value);
};
var V = (0, import_preact2.createContext)({
  registry: null,
  isInitializing: true,
  pluginsReady: false
});
function m() {
  const e = (0, import_hooks.useContext)(V);
  if (e === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: r, isInitializing: t2 } = e;
  if (t2)
    return e;
  if (r === null)
    throw new Error("PDF registry failed to initialize properly");
  return e;
}
function ee2(e) {
  const { registry: r } = m();
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
function ae(e) {
  const { plugin: r, isLoading: t2, ready: o } = ee2(e);
  if (!r)
    return {
      provides: null,
      isLoading: t2,
      ready: o
    };
  if (!r.provides)
    throw new Error(`Plugin ${e} does not provide a capability`);
  return {
    provides: r.provides(),
    isLoading: t2,
    ready: o
  };
}

// ../plugin-interaction-manager/dist/react/index.js
var import_preact4 = require("preact");
var import_hooks2 = require("preact/hooks");

// ../plugin-interaction-manager/dist/reducer-Dda407Go.js
var M3 = "\xAD";
var H = "\u200B";
var T2 = "\u2060";
var $2 = "\uFEFF";
var R2 = "\uFFFE";
var I2 = "\uFFFF";
var P3 = Object.freeze([
  M3,
  H,
  T2,
  $2,
  R2,
  I2
]);
new RegExp(`[${P3.join("")}]`, "g");
var y2 = Object.freeze([
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
y2.reduce(
  (o, t2) => (o[t2.id] = t2, o),
  {}
);
y2.reduce((o, t2) => (o[t2.css] = t2.id, o), {});
y2.map((o) => ({
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
  const s4 = typeof o;
  if (s4 !== typeof t2) return false;
  if (s4 === "object") {
    e || (e = /* @__PURE__ */ new Set());
    const i2 = O2(o, t2);
    if (e.has(i2))
      return true;
    e.add(i2);
    const r = Array.isArray(o), a4 = Array.isArray(t2);
    return r && a4 ? N3(o, t2, e) : !r && !a4 ? U2(o, t2, e) : false;
  }
  return false;
}
function O2(o, t2) {
  return `${C2(o)}__${C2(t2)}`;
}
var F3 = 0;
var b = /* @__PURE__ */ new WeakMap();
function C2(o) {
  return b.has(o) || b.set(o, ++F3), b.get(o);
}
function N3(o, t2, e) {
  if (o.length !== t2.length) return false;
  const s4 = new Array(t2.length).fill(false);
  t: for (let i2 = 0; i2 < o.length; i2++) {
    const r = o[i2];
    for (let a4 = 0; a4 < t2.length; a4++)
      if (!s4[a4] && g2(r, t2[a4], e)) {
        s4[a4] = true;
        continue t;
      }
    return false;
  }
  return true;
}
function U2(o, t2, e) {
  const s4 = Object.keys(o).sort(), i2 = Object.keys(t2).sort();
  if (s4.length !== i2.length) return false;
  for (let r = 0; r < s4.length; r++)
    if (s4[r] !== i2[r]) return false;
  for (const r of s4) {
    const a4 = o[r], n = t2[r];
    if (!g2(a4, n, e))
      return false;
  }
  return true;
}
var _2 = class {
  constructor(t2, e) {
    if (this.id = t2, this.registry = e, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t2 !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t2} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((s4, i2, r) => {
      this.onStoreUpdated(r, i2);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((s4, i2, r) => {
      this.onCoreStoreUpdated(r, i2);
    }), this.readyPromise = new Promise((s4) => {
      this.readyResolve = s4;
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
    const s4 = Date.now(), i2 = this.debouncedActions[t2.type] || 0;
    return s4 - i2 >= e ? (this.debouncedActions[t2.type] = s4, this.dispatch(t2), true) : false;
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
    this.handler = t2, this.options = e, this.lastRun = 0, this.handle = (s4) => {
      this.options.mode === "debounce" ? this.debounce(s4) : this.throttle(s4);
    };
  }
  debounce(t2) {
    this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(() => {
      this.handler(t2), this.timeoutId = void 0;
    }, this.options.wait);
  }
  throttle(t2) {
    if (this.options.mode === "debounce") return;
    const e = Date.now(), s4 = this.options.throttleMode || "leading-trailing";
    e - this.lastRun >= this.options.wait && (s4 === "leading-trailing" && this.handler(t2), this.lastRun = e), this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(
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
function p2() {
  const o = /* @__PURE__ */ new Set();
  return {
    emit: (t2 = void 0) => o.forEach((e) => e(t2)),
    on: (t2) => (o.add(t2), () => o.delete(t2)),
    off: (t2) => o.delete(t2),
    clear: () => o.clear()
  };
}
function D2(o, t2 = g2) {
  const e = /* @__PURE__ */ new Set(), s4 = /* @__PURE__ */ new Map();
  let i2 = o;
  const r = (n) => e.forEach((c) => c(n)), a4 = (n, c) => {
    let u2 = n, h4 = () => {
    };
    if (c) {
      const l4 = new x2(n, c);
      u2 = l4.handle, h4 = () => l4.destroy(), s4.set(n, { wrapped: u2, destroy: h4 });
    }
    return i2 !== void 0 && u2(i2), e.add(u2), () => {
      e.delete(u2), h4(), s4.delete(n);
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
    on: a4,
    off(n) {
      const c = s4.get(n);
      c ? (e.delete(c.wrapped), c.destroy(), s4.delete(n)) : e.delete(n);
    },
    clear() {
      e.clear(), s4.forEach((n) => n.destroy()), s4.clear();
    },
    /* derived hook --------------------------------------------- */
    select(n, c = g2) {
      return (u2, h4) => {
        let l4;
        if (i2 !== void 0) {
          const d3 = n(i2);
          l4 = d3, u2(d3);
        }
        return a4(
          (d3) => {
            const f5 = n(d3);
            (l4 === void 0 || !c(l4, f5)) && (l4 = f5, u2(f5));
          },
          h4
        );
      };
    }
  };
}
var v3 = "INTERACTION/ACTIVATE_MODE";
var m2 = "INTERACTION/PAUSE";
var E2 = "INTERACTION/RESUME";
var A2 = "INTERACTION/SET_CURSOR";
var j = (o) => ({
  type: v3,
  payload: { mode: o }
});
var z3 = (o) => ({
  type: A2,
  payload: { cursor: o }
});
var G2 = () => ({
  type: m2
});
var L3 = () => ({
  type: E2
});
function V2(o) {
  const t2 = [
    "onPointerDown",
    "onPointerUp",
    "onPointerMove",
    "onPointerEnter",
    "onPointerLeave",
    "onPointerCancel"
  ], e = {};
  for (const s4 of t2)
    e[s4] = (i2, r, a4) => {
      var n;
      for (const c of o) (n = c[s4]) == null || n.call(c, i2, r, a4);
    };
  return e;
}
var S2 = class S3 extends _2 {
  constructor(t2, e) {
    super(t2, e), this.modes = /* @__PURE__ */ new Map(), this.cursorClaims = /* @__PURE__ */ new Map(), this.buckets = /* @__PURE__ */ new Map(), this.alwaysGlobal = /* @__PURE__ */ new Set(), this.alwaysPage = /* @__PURE__ */ new Map(), this.onModeChange$ = p2(), this.onHandlerChange$ = p2(), this.onCursorChange$ = p2(), this.onStateChange$ = D2(), this.registerMode({
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
      setCursor: (t2, e, s4 = 0) => this.setCursor(t2, e, s4),
      removeCursor: (t2) => this.removeCursor(t2),
      getCurrentCursor: () => this.state.cursor,
      getHandlersForScope: (t2) => this.getHandlersForScope(t2),
      activeModeIsExclusive: () => this.activeModeIsExclusive(),
      pause: () => this.dispatch(G2()),
      resume: () => this.dispatch(L3()),
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
        var a4;
        (a4 = r.onHandlerActiveStart) == null || a4.call(r, t2);
      });
    });
    const e = this.modes.get(t2);
    if (!e) return;
    const s4 = this.buckets.get(t2);
    s4 && (e.scope === "global" && s4.global.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveStart) == null || r.call(i2, t2);
    }), e.scope === "page" && s4.page.forEach((i2, r) => {
      i2.forEach((a4) => {
        var n;
        (n = a4.onHandlerActiveStart) == null || n.call(a4, t2);
      });
    }));
  }
  notifyHandlersInactive(t2) {
    this.alwaysGlobal.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveEnd) == null || r.call(i2, t2);
    }), this.alwaysPage.forEach((i2) => {
      i2.forEach((r) => {
        var a4;
        (a4 = r.onHandlerActiveEnd) == null || a4.call(r, t2);
      });
    });
    const e = this.modes.get(t2);
    if (!e) return;
    const s4 = this.buckets.get(t2);
    s4 && (e.scope === "global" && s4.global.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveEnd) == null || r.call(i2, t2);
    }), e.scope === "page" && s4.page.forEach((i2, r) => {
      i2.forEach((a4) => {
        var n;
        (n = a4.onHandlerActiveEnd) == null || n.call(a4, t2);
      });
    }));
  }
  registerMode(t2) {
    this.modes.set(t2.id, t2), this.buckets.has(t2.id) || this.buckets.set(t2.id, { global: /* @__PURE__ */ new Set(), page: /* @__PURE__ */ new Map() });
  }
  /** ---------- pointer-handler handling ------------ */
  registerHandlers({ modeId: t2, handlers: e, pageIndex: s4 }) {
    const i2 = Array.isArray(t2) ? t2 : [t2], r = [];
    for (const a4 of i2) {
      const n = this.buckets.get(a4);
      if (!n) throw new Error(`unknown mode '${a4}'`);
      if (s4 == null)
        n.global.add(e);
      else {
        const c = n.page.get(s4) ?? /* @__PURE__ */ new Set();
        c.add(e), n.page.set(s4, c);
      }
      r.push(() => {
        if (s4 == null)
          n.global.delete(e);
        else {
          const c = n.page.get(s4);
          c && (c.delete(e), c.size === 0 && n.page.delete(s4));
        }
      });
    }
    return this.onHandlerChange$.emit({ ...this.state }), () => {
      r.forEach((a4) => a4()), this.onHandlerChange$.emit({ ...this.state });
    };
  }
  registerAlways({ scope: t2, handlers: e }) {
    if (t2.type === "global")
      return this.alwaysGlobal.add(e), this.onHandlerChange$.emit({ ...this.state }), () => this.alwaysGlobal.delete(e);
    const s4 = this.alwaysPage.get(t2.pageIndex) ?? /* @__PURE__ */ new Set();
    return s4.add(e), this.alwaysPage.set(t2.pageIndex, s4), this.onHandlerChange$.emit({ ...this.state }), () => {
      s4.delete(e), this.onHandlerChange$.emit({ ...this.state });
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
    const s4 = this.buckets.get(e.id);
    if (!s4) return null;
    const i2 = (n, c) => n.size || c.size ? V2([...n, ...c]) : null;
    if (t2.type === "global") {
      const n = e.scope === "global" ? s4.global : /* @__PURE__ */ new Set();
      return i2(this.alwaysGlobal, n);
    }
    const r = this.alwaysPage.get(t2.pageIndex) ?? /* @__PURE__ */ new Set(), a4 = e.scope === "page" ? s4.page.get(t2.pageIndex) ?? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set();
    return i2(r, a4);
  }
  /** ---------- cursor handling --------------------- */
  setCursor(t2, e, s4 = 0) {
    this.cursorClaims.set(t2, { cursor: e, priority: s4 }), this.emitCursor();
  }
  removeCursor(t2) {
    this.cursorClaims.delete(t2), this.emitCursor();
  }
  emitCursor() {
    var e;
    const t2 = [...this.cursorClaims.values()].sort((s4, i2) => i2.priority - s4.priority)[0] ?? {
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
S2.id = "interaction-manager";
var w2 = S2;

// ../plugin-interaction-manager/dist/jsxRuntime.module-D89ud_rY.js
var import_preact3 = require("preact");

// ../plugin-interaction-manager/dist/index-Q-vI1_iw.js
var C3 = "\xAD";
var M4 = "\u200B";
var E3 = "\u2060";
var O3 = "\uFEFF";
var w3 = "\uFFFE";
var H2 = "\uFFFF";
var L4 = Object.freeze([
  C3,
  M4,
  E3,
  O3,
  w3,
  H2
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
var N4 = Object.freeze({
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
  N4
).reduce(
  (e, [r, o]) => (e[o] = Number(r), e),
  {}
);

// ../plugin-interaction-manager/dist/react/index.js
function ae2(e, n) {
  for (var t2 in n) e[t2] = n[t2];
  return e;
}
function E4(e, n) {
  for (var t2 in e) if (t2 !== "__source" && !(t2 in n)) return true;
  for (var r in n) if (r !== "__source" && e[r] !== n[r]) return true;
  return false;
}
function O4(e, n) {
  this.props = e, this.context = n;
}
(O4.prototype = new import_preact4.Component()).isPureReactComponent = true, O4.prototype.shouldComponentUpdate = function(e, n) {
  return E4(this.props, e) || E4(this.state, n);
};
var S4 = import_preact4.options.__b;
import_preact4.options.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), S4 && S4(e);
};
var ce = import_preact4.options.__e;
import_preact4.options.__e = function(e, n, t2, r) {
  if (e.then) {
    for (var o, _5 = n; _5 = _5.__; ) if ((o = _5.__c) && o.__c) return n.__e == null && (n.__e = t2.__e, n.__k = t2.__k), o.__c(e, n);
  }
  ce(e, n, t2, r);
};
var I3 = import_preact4.options.unmount;
function X2(e, n, t2) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), e.__c.__H = null), (e = ae2({}, e)).__c != null && (e.__c.__P === t2 && (e.__c.__P = n), e.__c.__e = true, e.__c = null), e.__k = e.__k && e.__k.map(function(r) {
    return X2(r, n, t2);
  })), e;
}
function q2(e, n, t2) {
  return e && t2 && (e.__v = null, e.__k = e.__k && e.__k.map(function(r) {
    return q2(r, n, t2);
  }), e.__c && e.__c.__P === n && (e.__e && t2.appendChild(e.__e), e.__c.__e = true, e.__c.__P = t2)), e;
}
function b2() {
  this.__u = 0, this.o = null, this.__b = null;
}
function J2(e) {
  var n = e.__.__c;
  return n && n.__a && n.__a(e);
}
function v4() {
  this.i = null, this.l = null;
}
import_preact4.options.unmount = function(e) {
  var n = e.__c;
  n && n.__R && n.__R(), n && 32 & e.__u && (e.type = null), I3 && I3(e);
}, (b2.prototype = new import_preact4.Component()).__c = function(e, n) {
  var t2 = n.__c, r = this;
  r.o == null && (r.o = []), r.o.push(t2);
  var o = J2(r.__v), _5 = false, u2 = function() {
    _5 || (_5 = true, t2.__R = null, o ? o(a4) : a4());
  };
  t2.__R = u2;
  var a4 = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var i2 = r.state.__a;
        r.__v.__k[0] = q2(i2, i2.__c.__P, i2.__c.__O);
      }
      var c;
      for (r.setState({ __a: r.__b = null }); c = r.o.pop(); ) c.forceUpdate();
    }
  };
  r.__u++ || 32 & n.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(u2, u2);
}, b2.prototype.componentWillUnmount = function() {
  this.o = [];
}, b2.prototype.render = function(e, n) {
  if (this.__b) {
    if (this.__v.__k) {
      var t2 = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = X2(this.__b, t2, r.__O = r.__P);
    }
    this.__b = null;
  }
  var o = n.__a && (0, import_preact4.createElement)(import_preact4.Fragment, null, e.fallback);
  return o && (o.__u &= -33), [(0, import_preact4.createElement)(import_preact4.Fragment, null, n.__a ? null : e.children), o];
};
var R3 = function(e, n, t2) {
  if (++t2[1] === t2[0] && e.l.delete(n), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (t2 = e.i; t2; ) {
    for (; t2.length > 3; ) t2.pop()();
    if (t2[1] < t2[0]) break;
    e.i = t2 = t2[2];
  }
};
(v4.prototype = new import_preact4.Component()).__a = function(e) {
  var n = this, t2 = J2(n.__v), r = n.l.get(e);
  return r[0]++, function(o) {
    var _5 = function() {
      n.props.revealOrder ? (r.push(o), R3(n, e, r)) : o();
    };
    t2 ? t2(_5) : _5();
  };
}, v4.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var n = (0, import_preact4.toChildArray)(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && n.reverse();
  for (var t2 = n.length; t2--; ) this.l.set(n[t2], this.i = [1, 0, this.i]);
  return e.children;
}, v4.prototype.componentDidUpdate = v4.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(n, t2) {
    R3(e, t2, n);
  });
};
var se = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103;
var fe = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
var pe = /^on(Ani|Tra|Tou|BeforeInp|Compo)/;
var ve = /[A-Z0-9]/g;
var de = typeof document < "u";
var he = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
import_preact4.Component.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(import_preact4.Component.prototype, e, { configurable: true, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(n) {
    Object.defineProperty(this, e, { configurable: true, writable: true, value: n });
  } });
});
var $3 = import_preact4.options.event;
function ye() {
}
function me() {
  return this.cancelBubble;
}
function ge() {
  return this.defaultPrevented;
}
import_preact4.options.event = function(e) {
  return $3 && (e = $3(e)), e.persist = ye, e.isPropagationStopped = me, e.isDefaultPrevented = ge, e.nativeEvent = e;
};
var be = { enumerable: false, configurable: true, get: function() {
  return this.class;
} };
var N5 = import_preact4.options.vnode;
import_preact4.options.vnode = function(e) {
  typeof e.type == "string" && function(n) {
    var t2 = n.props, r = n.type, o = {}, _5 = r.indexOf("-") === -1;
    for (var u2 in t2) {
      var a4 = t2[u2];
      if (!(u2 === "value" && "defaultValue" in t2 && a4 == null || de && u2 === "children" && r === "noscript" || u2 === "class" || u2 === "className")) {
        var i2 = u2.toLowerCase();
        u2 === "defaultValue" && "value" in t2 && t2.value == null ? u2 = "value" : u2 === "download" && a4 === true ? a4 = "" : i2 === "translate" && a4 === "no" ? a4 = false : i2[0] === "o" && i2[1] === "n" ? i2 === "ondoubleclick" ? u2 = "ondblclick" : i2 !== "onchange" || r !== "input" && r !== "textarea" || he(t2.type) ? i2 === "onfocus" ? u2 = "onfocusin" : i2 === "onblur" ? u2 = "onfocusout" : pe.test(u2) && (u2 = i2) : i2 = u2 = "oninput" : _5 && fe.test(u2) ? u2 = u2.replace(ve, "-$&").toLowerCase() : a4 === null && (a4 = void 0), i2 === "oninput" && o[u2 = i2] && (u2 = "oninputCapture"), o[u2] = a4;
      }
    }
    r == "select" && o.multiple && Array.isArray(o.value) && (o.value = (0, import_preact4.toChildArray)(t2.children).forEach(function(c) {
      c.props.selected = o.value.indexOf(c.props.value) != -1;
    })), r == "select" && o.defaultValue != null && (o.value = (0, import_preact4.toChildArray)(t2.children).forEach(function(c) {
      c.props.selected = o.multiple ? o.defaultValue.indexOf(c.props.value) != -1 : o.defaultValue == c.props.value;
    })), t2.class && !t2.className ? (o.class = t2.class, Object.defineProperty(o, "className", be)) : (t2.className && !t2.class || t2.class && t2.className) && (o.class = o.className = t2.className), n.props = o;
  }(e), e.$$typeof = se, N5 && N5(e);
};
var U3 = import_preact4.options.__r;
import_preact4.options.__r = function(e) {
  U3 && U3(e), e.__c;
};
var A3 = import_preact4.options.diffed;
import_preact4.options.diffed = function(e) {
  A3 && A3(e);
  var n = e.props, t2 = e.__e;
  t2 != null && e.type === "textarea" && "value" in n && n.value !== t2.value && (t2.value = n.value == null ? "" : n.value);
};
var Pe = (0, import_preact4.createContext)({
  registry: null,
  isInitializing: true,
  pluginsReady: false
});
function ke() {
  const e = (0, import_hooks2.useContext)(Pe);
  if (e === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: n, isInitializing: t2 } = e;
  if (t2)
    return e;
  if (n === null)
    throw new Error("PDF registry failed to initialize properly");
  return e;
}
function K2(e) {
  const { registry: n } = ke();
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
function Ce(e) {
  const { plugin: n, isLoading: t2, ready: r } = K2(e);
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
function we(e, n) {
  for (var t2 in n) e[t2] = n[t2];
  return e;
}
function M5(e, n) {
  for (var t2 in e) if (t2 !== "__source" && !(t2 in n)) return true;
  for (var r in n) if (r !== "__source" && e[r] !== n[r]) return true;
  return false;
}
function V3(e, n) {
  this.props = e, this.context = n;
}
(V3.prototype = new import_preact4.Component()).isPureReactComponent = true, V3.prototype.shouldComponentUpdate = function(e, n) {
  return M5(this.props, e) || M5(this.state, n);
};
var L5 = import_preact4.options.__b;
import_preact4.options.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), L5 && L5(e);
};
var xe = import_preact4.options.__e;
import_preact4.options.__e = function(e, n, t2, r) {
  if (e.then) {
    for (var o, _5 = n; _5 = _5.__; ) if ((o = _5.__c) && o.__c) return n.__e == null && (n.__e = t2.__e, n.__k = t2.__k), o.__c(e, n);
  }
  xe(e, n, t2, r);
};
var H3 = import_preact4.options.unmount;
function Q2(e, n, t2) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), e.__c.__H = null), (e = we({}, e)).__c != null && (e.__c.__P === t2 && (e.__c.__P = n), e.__c.__e = true, e.__c = null), e.__k = e.__k && e.__k.map(function(r) {
    return Q2(r, n, t2);
  })), e;
}
function Y2(e, n, t2) {
  return e && t2 && (e.__v = null, e.__k = e.__k && e.__k.map(function(r) {
    return Y2(r, n, t2);
  }), e.__c && e.__c.__P === n && (e.__e && t2.appendChild(e.__e), e.__c.__e = true, e.__c.__P = t2)), e;
}
function P4() {
  this.__u = 0, this.o = null, this.__b = null;
}
function ee3(e) {
  var n = e.__.__c;
  return n && n.__a && n.__a(e);
}
function d() {
  this.i = null, this.l = null;
}
import_preact4.options.unmount = function(e) {
  var n = e.__c;
  n && n.__R && n.__R(), n && 32 & e.__u && (e.type = null), H3 && H3(e);
}, (P4.prototype = new import_preact4.Component()).__c = function(e, n) {
  var t2 = n.__c, r = this;
  r.o == null && (r.o = []), r.o.push(t2);
  var o = ee3(r.__v), _5 = false, u2 = function() {
    _5 || (_5 = true, t2.__R = null, o ? o(a4) : a4());
  };
  t2.__R = u2;
  var a4 = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var i2 = r.state.__a;
        r.__v.__k[0] = Y2(i2, i2.__c.__P, i2.__c.__O);
      }
      var c;
      for (r.setState({ __a: r.__b = null }); c = r.o.pop(); ) c.forceUpdate();
    }
  };
  r.__u++ || 32 & n.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(u2, u2);
}, P4.prototype.componentWillUnmount = function() {
  this.o = [];
}, P4.prototype.render = function(e, n) {
  if (this.__b) {
    if (this.__v.__k) {
      var t2 = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = Q2(this.__b, t2, r.__O = r.__P);
    }
    this.__b = null;
  }
  var o = n.__a && (0, import_preact4.createElement)(import_preact4.Fragment, null, e.fallback);
  return o && (o.__u &= -33), [(0, import_preact4.createElement)(import_preact4.Fragment, null, n.__a ? null : e.children), o];
};
var W2 = function(e, n, t2) {
  if (++t2[1] === t2[0] && e.l.delete(n), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (t2 = e.i; t2; ) {
    for (; t2.length > 3; ) t2.pop()();
    if (t2[1] < t2[0]) break;
    e.i = t2 = t2[2];
  }
};
(d.prototype = new import_preact4.Component()).__a = function(e) {
  var n = this, t2 = ee3(n.__v), r = n.l.get(e);
  return r[0]++, function(o) {
    var _5 = function() {
      n.props.revealOrder ? (r.push(o), W2(n, e, r)) : o();
    };
    t2 ? t2(_5) : _5();
  };
}, d.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var n = (0, import_preact4.toChildArray)(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && n.reverse();
  for (var t2 = n.length; t2--; ) this.l.set(n[t2], this.i = [1, 0, this.i]);
  return e.children;
}, d.prototype.componentDidUpdate = d.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(n, t2) {
    W2(e, t2, n);
  });
};
var Ee = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103;
var Oe = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
var Se = /^on(Ani|Tra|Tou|BeforeInp|Compo)/;
var Ie = /[A-Z0-9]/g;
var Re = typeof document < "u";
var $e = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
import_preact4.Component.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(import_preact4.Component.prototype, e, { configurable: true, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(n) {
    Object.defineProperty(this, e, { configurable: true, writable: true, value: n });
  } });
});
var z4 = import_preact4.options.event;
function Ne() {
}
function Ue() {
  return this.cancelBubble;
}
function Ae() {
  return this.defaultPrevented;
}
import_preact4.options.event = function(e) {
  return z4 && (e = z4(e)), e.persist = Ne, e.isPropagationStopped = Ue, e.isDefaultPrevented = Ae, e.nativeEvent = e;
};
var Me = { enumerable: false, configurable: true, get: function() {
  return this.class;
} };
var D3 = import_preact4.options.vnode;
import_preact4.options.vnode = function(e) {
  typeof e.type == "string" && function(n) {
    var t2 = n.props, r = n.type, o = {}, _5 = r.indexOf("-") === -1;
    for (var u2 in t2) {
      var a4 = t2[u2];
      if (!(u2 === "value" && "defaultValue" in t2 && a4 == null || Re && u2 === "children" && r === "noscript" || u2 === "class" || u2 === "className")) {
        var i2 = u2.toLowerCase();
        u2 === "defaultValue" && "value" in t2 && t2.value == null ? u2 = "value" : u2 === "download" && a4 === true ? a4 = "" : i2 === "translate" && a4 === "no" ? a4 = false : i2[0] === "o" && i2[1] === "n" ? i2 === "ondoubleclick" ? u2 = "ondblclick" : i2 !== "onchange" || r !== "input" && r !== "textarea" || $e(t2.type) ? i2 === "onfocus" ? u2 = "onfocusin" : i2 === "onblur" ? u2 = "onfocusout" : Se.test(u2) && (u2 = i2) : i2 = u2 = "oninput" : _5 && Oe.test(u2) ? u2 = u2.replace(Ie, "-$&").toLowerCase() : a4 === null && (a4 = void 0), i2 === "oninput" && o[u2 = i2] && (u2 = "oninputCapture"), o[u2] = a4;
      }
    }
    r == "select" && o.multiple && Array.isArray(o.value) && (o.value = (0, import_preact4.toChildArray)(t2.children).forEach(function(c) {
      c.props.selected = o.value.indexOf(c.props.value) != -1;
    })), r == "select" && o.defaultValue != null && (o.value = (0, import_preact4.toChildArray)(t2.children).forEach(function(c) {
      c.props.selected = o.multiple ? o.defaultValue.indexOf(c.props.value) != -1 : o.defaultValue == c.props.value;
    })), t2.class && !t2.className ? (o.class = t2.class, Object.defineProperty(o, "className", Me)) : (t2.className && !t2.class || t2.class && t2.className) && (o.class = o.className = t2.className), n.props = o;
  }(e), e.$$typeof = Ee, D3 && D3(e);
};
var j3 = import_preact4.options.__r;
import_preact4.options.__r = function(e) {
  j3 && j3(e), e.__c;
};
var B3 = import_preact4.options.diffed;
import_preact4.options.diffed = function(e) {
  B3 && B3(e);
  var n = e.props, t2 = e.__e;
  t2 != null && e.type === "textarea" && "value" in n && n.value !== t2.value && (t2.value = n.value == null ? "" : n.value);
};
var p3 = () => Ce(w2.id);
function Fe() {
  const { provides: e } = p3();
  return {
    setCursor: (n, t2, r = 0) => {
      e == null || e.setCursor(n, t2, r);
    },
    removeCursor: (n) => {
      e == null || e.removeCursor(n);
    }
  };
}
function Te({ modeId: e, pageIndex: n }) {
  const { provides: t2 } = p3();
  return {
    register: (r, o) => {
      const _5 = (o == null ? void 0 : o.modeId) ?? e, u2 = (o == null ? void 0 : o.pageIndex) ?? n;
      return _5 ? t2 == null ? void 0 : t2.registerHandlers({
        modeId: _5,
        handlers: r,
        pageIndex: u2
      }) : t2 == null ? void 0 : t2.registerAlways({
        scope: u2 !== void 0 ? { type: "page", pageIndex: u2 } : { type: "global" },
        handlers: r
      });
    }
  };
}

// dist/index.js
var z5 = "\xAD";
var M6 = "\u200B";
var L6 = "\u2060";
var $4 = "\uFEFF";
var F5 = "\uFFFE";
var N6 = "\uFFFF";
var k5 = Object.freeze([
  z5,
  M6,
  L6,
  $4,
  F5,
  N6
]);
new RegExp(`[${k5.join("")}]`, "g");
var P5 = Object.freeze([
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
P5.reduce(
  (i2, e) => (i2[e.id] = e, i2),
  {}
);
P5.reduce((i2, e) => (i2[e.css] = e.id, i2), {});
P5.map((i2) => ({
  value: i2.id,
  label: i2.label
}));
var _3 = Object.freeze({
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
  _3
).reduce(
  (i2, [e, t2]) => (i2[t2] = Number(e), i2),
  {}
);
var w22 = class {
  constructor(t2, e) {
    if (this.id = t2, this.registry = e, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t2 !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t2} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((i2, s4, c) => {
      this.onStoreUpdated(c, s4);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((i2, s4, c) => {
      this.onCoreStoreUpdated(c, s4);
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
    const i2 = Date.now(), s4 = this.debouncedActions[t2.type] || 0;
    return i2 - s4 >= e ? (this.debouncedActions[t2.type] = i2, this.dispatch(t2), true) : false;
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
var M22 = "\xAD";
var H22 = "\u200B";
var T4 = "\u2060";
var $22 = "\uFEFF";
var R22 = "\uFFFE";
var I22 = "\uFFFF";
var P22 = Object.freeze([
  M22,
  H22,
  T4,
  $22,
  R22,
  I22
]);
new RegExp(`[${P22.join("")}]`, "g");
var y22 = Object.freeze([
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
y22.reduce(
  (o, t2) => (o[t2.id] = t2, o),
  {}
);
y22.reduce((o, t2) => (o[t2.css] = t2.id, o), {});
y22.map((o) => ({
  value: o.id,
  label: o.label
}));
var k22 = Object.freeze({
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
  k22
).reduce(
  (o, [t2, e]) => (o[e] = Number(t2), o),
  {}
);
function g22(o, t2, e) {
  if (o === t2)
    return true;
  if (o == null || t2 == null)
    return o === t2;
  const s4 = typeof o;
  if (s4 !== typeof t2) return false;
  if (s4 === "object") {
    e || (e = /* @__PURE__ */ new Set());
    const i2 = O22(o, t2);
    if (e.has(i2))
      return true;
    e.add(i2);
    const r = Array.isArray(o), a4 = Array.isArray(t2);
    return r && a4 ? N22(o, t2, e) : !r && !a4 ? U4(o, t2, e) : false;
  }
  return false;
}
function O22(o, t2) {
  return `${C4(o)}__${C4(t2)}`;
}
var F22 = 0;
var b22 = /* @__PURE__ */ new WeakMap();
function C4(o) {
  return b22.has(o) || b22.set(o, ++F22), b22.get(o);
}
function N22(o, t2, e) {
  if (o.length !== t2.length) return false;
  const s4 = new Array(t2.length).fill(false);
  t: for (let i2 = 0; i2 < o.length; i2++) {
    const r = o[i2];
    for (let a4 = 0; a4 < t2.length; a4++)
      if (!s4[a4] && g22(r, t2[a4], e)) {
        s4[a4] = true;
        continue t;
      }
    return false;
  }
  return true;
}
function U4(o, t2, e) {
  const s4 = Object.keys(o).sort(), i2 = Object.keys(t2).sort();
  if (s4.length !== i2.length) return false;
  for (let r = 0; r < s4.length; r++)
    if (s4[r] !== i2[r]) return false;
  for (const r of s4) {
    const a4 = o[r], n = t2[r];
    if (!g22(a4, n, e))
      return false;
  }
  return true;
}
var _22 = class {
  constructor(t2, e) {
    if (this.id = t2, this.registry = e, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t2 !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t2} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((s4, i2, r) => {
      this.onStoreUpdated(r, i2);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((s4, i2, r) => {
      this.onCoreStoreUpdated(r, i2);
    }), this.readyPromise = new Promise((s4) => {
      this.readyResolve = s4;
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
    const s4 = Date.now(), i2 = this.debouncedActions[t2.type] || 0;
    return s4 - i2 >= e ? (this.debouncedActions[t2.type] = s4, this.dispatch(t2), true) : false;
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
var x3 = class {
  constructor(t2, e) {
    this.handler = t2, this.options = e, this.lastRun = 0, this.handle = (s4) => {
      this.options.mode === "debounce" ? this.debounce(s4) : this.throttle(s4);
    };
  }
  debounce(t2) {
    this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(() => {
      this.handler(t2), this.timeoutId = void 0;
    }, this.options.wait);
  }
  throttle(t2) {
    if (this.options.mode === "debounce") return;
    const e = Date.now(), s4 = this.options.throttleMode || "leading-trailing";
    e - this.lastRun >= this.options.wait && (s4 === "leading-trailing" && this.handler(t2), this.lastRun = e), this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(
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
function p22() {
  const o = /* @__PURE__ */ new Set();
  return {
    emit: (t2 = void 0) => o.forEach((e) => e(t2)),
    on: (t2) => (o.add(t2), () => o.delete(t2)),
    off: (t2) => o.delete(t2),
    clear: () => o.clear()
  };
}
function D4(o, t2 = g22) {
  const e = /* @__PURE__ */ new Set(), s4 = /* @__PURE__ */ new Map();
  let i2 = o;
  const r = (n) => e.forEach((c) => c(n)), a4 = (n, c) => {
    let u2 = n, h4 = () => {
    };
    if (c) {
      const l22 = new x3(n, c);
      u2 = l22.handle, h4 = () => l22.destroy(), s4.set(n, { wrapped: u2, destroy: h4 });
    }
    return i2 !== void 0 && u2(i2), e.add(u2), () => {
      e.delete(u2), h4(), s4.delete(n);
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
    on: a4,
    off(n) {
      const c = s4.get(n);
      c ? (e.delete(c.wrapped), c.destroy(), s4.delete(n)) : e.delete(n);
    },
    clear() {
      e.clear(), s4.forEach((n) => n.destroy()), s4.clear();
    },
    /* derived hook --------------------------------------------- */
    select(n, c = g22) {
      return (u2, h4) => {
        let l22;
        if (i2 !== void 0) {
          const d3 = n(i2);
          l22 = d3, u2(d3);
        }
        return a4(
          (d3) => {
            const f22 = n(d3);
            (l22 === void 0 || !c(l22, f22)) && (l22 = f22, u2(f22));
          },
          h4
        );
      };
    }
  };
}
var v22 = "INTERACTION/ACTIVATE_MODE";
var m22 = "INTERACTION/PAUSE";
var E22 = "INTERACTION/RESUME";
var A4 = "INTERACTION/SET_CURSOR";
var j22 = (o) => ({
  type: v22,
  payload: { mode: o }
});
var z22 = (o) => ({
  type: A4,
  payload: { cursor: o }
});
var G3 = () => ({
  type: m22
});
var L22 = () => ({
  type: E22
});
function V22(o) {
  const t2 = [
    "onPointerDown",
    "onPointerUp",
    "onPointerMove",
    "onPointerEnter",
    "onPointerLeave",
    "onPointerCancel"
  ], e = {};
  for (const s4 of t2)
    e[s4] = (i2, r, a4) => {
      var n;
      for (const c of o) (n = c[s4]) == null || n.call(c, i2, r, a4);
    };
  return e;
}
var S5 = class S22 extends _22 {
  constructor(t2, e) {
    super(t2, e), this.modes = /* @__PURE__ */ new Map(), this.cursorClaims = /* @__PURE__ */ new Map(), this.buckets = /* @__PURE__ */ new Map(), this.alwaysGlobal = /* @__PURE__ */ new Set(), this.alwaysPage = /* @__PURE__ */ new Map(), this.onModeChange$ = p22(), this.onHandlerChange$ = p22(), this.onCursorChange$ = p22(), this.onStateChange$ = D4(), this.registerMode({
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
      setCursor: (t2, e, s4 = 0) => this.setCursor(t2, e, s4),
      removeCursor: (t2) => this.removeCursor(t2),
      getCurrentCursor: () => this.state.cursor,
      getHandlersForScope: (t2) => this.getHandlersForScope(t2),
      activeModeIsExclusive: () => this.activeModeIsExclusive(),
      pause: () => this.dispatch(G3()),
      resume: () => this.dispatch(L22()),
      isPaused: () => this.state.paused
    };
  }
  activate(t2) {
    if (!this.modes.has(t2))
      throw new Error(`[interaction] unknown mode '${t2}'`);
    if (t2 === this.state.activeMode) return;
    const e = this.state.activeMode;
    this.cursorClaims.clear(), this.notifyHandlersInactive(e), this.dispatch(j22(t2)), this.emitCursor(), this.notifyHandlersActive(t2), this.onModeChange$.emit({ ...this.state, activeMode: t2 });
  }
  notifyHandlersActive(t2) {
    this.alwaysGlobal.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveStart) == null || r.call(i2, t2);
    }), this.alwaysPage.forEach((i2) => {
      i2.forEach((r) => {
        var a4;
        (a4 = r.onHandlerActiveStart) == null || a4.call(r, t2);
      });
    });
    const e = this.modes.get(t2);
    if (!e) return;
    const s4 = this.buckets.get(t2);
    s4 && (e.scope === "global" && s4.global.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveStart) == null || r.call(i2, t2);
    }), e.scope === "page" && s4.page.forEach((i2, r) => {
      i2.forEach((a4) => {
        var n;
        (n = a4.onHandlerActiveStart) == null || n.call(a4, t2);
      });
    }));
  }
  notifyHandlersInactive(t2) {
    this.alwaysGlobal.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveEnd) == null || r.call(i2, t2);
    }), this.alwaysPage.forEach((i2) => {
      i2.forEach((r) => {
        var a4;
        (a4 = r.onHandlerActiveEnd) == null || a4.call(r, t2);
      });
    });
    const e = this.modes.get(t2);
    if (!e) return;
    const s4 = this.buckets.get(t2);
    s4 && (e.scope === "global" && s4.global.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveEnd) == null || r.call(i2, t2);
    }), e.scope === "page" && s4.page.forEach((i2, r) => {
      i2.forEach((a4) => {
        var n;
        (n = a4.onHandlerActiveEnd) == null || n.call(a4, t2);
      });
    }));
  }
  registerMode(t2) {
    this.modes.set(t2.id, t2), this.buckets.has(t2.id) || this.buckets.set(t2.id, { global: /* @__PURE__ */ new Set(), page: /* @__PURE__ */ new Map() });
  }
  /** ---------- pointer-handler handling ------------ */
  registerHandlers({ modeId: t2, handlers: e, pageIndex: s4 }) {
    const i2 = Array.isArray(t2) ? t2 : [t2], r = [];
    for (const a4 of i2) {
      const n = this.buckets.get(a4);
      if (!n) throw new Error(`unknown mode '${a4}'`);
      if (s4 == null)
        n.global.add(e);
      else {
        const c = n.page.get(s4) ?? /* @__PURE__ */ new Set();
        c.add(e), n.page.set(s4, c);
      }
      r.push(() => {
        if (s4 == null)
          n.global.delete(e);
        else {
          const c = n.page.get(s4);
          c && (c.delete(e), c.size === 0 && n.page.delete(s4));
        }
      });
    }
    return this.onHandlerChange$.emit({ ...this.state }), () => {
      r.forEach((a4) => a4()), this.onHandlerChange$.emit({ ...this.state });
    };
  }
  registerAlways({ scope: t2, handlers: e }) {
    if (t2.type === "global")
      return this.alwaysGlobal.add(e), this.onHandlerChange$.emit({ ...this.state }), () => this.alwaysGlobal.delete(e);
    const s4 = this.alwaysPage.get(t2.pageIndex) ?? /* @__PURE__ */ new Set();
    return s4.add(e), this.alwaysPage.set(t2.pageIndex, s4), this.onHandlerChange$.emit({ ...this.state }), () => {
      s4.delete(e), this.onHandlerChange$.emit({ ...this.state });
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
    const s4 = this.buckets.get(e.id);
    if (!s4) return null;
    const i2 = (n, c) => n.size || c.size ? V22([...n, ...c]) : null;
    if (t2.type === "global") {
      const n = e.scope === "global" ? s4.global : /* @__PURE__ */ new Set();
      return i2(this.alwaysGlobal, n);
    }
    const r = this.alwaysPage.get(t2.pageIndex) ?? /* @__PURE__ */ new Set(), a4 = e.scope === "page" ? s4.page.get(t2.pageIndex) ?? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set();
    return i2(r, a4);
  }
  /** ---------- cursor handling --------------------- */
  setCursor(t2, e, s4 = 0) {
    this.cursorClaims.set(t2, { cursor: e, priority: s4 }), this.emitCursor();
  }
  removeCursor(t2) {
    this.cursorClaims.delete(t2), this.emitCursor();
  }
  emitCursor() {
    var e;
    const t2 = [...this.cursorClaims.values()].sort((s4, i2) => i2.priority - s4.priority)[0] ?? {
      cursor: ((e = this.modes.get(this.state.activeMode)) == null ? void 0 : e.cursor) ?? "auto"
    };
    t2.cursor !== this.state.cursor && (this.dispatch(z22(t2.cursor)), this.onCursorChange$.emit(t2.cursor));
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
S5.id = "interaction-manager";
var w32 = S5;
var PanPlugin = class extends w22 {
  constructor(id, registry) {
    super(id, registry);
    this.interactionManager = registry.getPlugin(w32.id)?.provides();
    this.interactionManager.registerMode({
      id: "panMode",
      scope: "global",
      exclusive: false,
      cursor: "grab"
    });
  }
  async initialize(_32) {
  }
  buildCapability() {
    return {
      enablePan: () => this.interactionManager.activate("panMode"),
      disablePan: () => this.interactionManager.activate("default"),
      togglePan: () => {
        if (this.interactionManager.getActiveMode() === "panMode") {
          this.interactionManager.activate("default");
        } else {
          this.interactionManager.activate("panMode");
        }
      }
    };
  }
};
PanPlugin.id = "pan";

// src/react/hooks/use-pan.ts
var import_react3 = require("react");
var usePanPlugin = () => ee2(PanPlugin.id);
var usePanCapability = () => ae(PanPlugin.id);
var usePan = () => {
  const { provides } = usePanCapability();
  const { provides: interactionManager } = p3();
  const [isPanning, setIsPanning] = (0, import_react3.useState)(false);
  (0, import_react3.useEffect)(() => {
    if (!interactionManager) return;
    return interactionManager.onStateChange((state) => {
      setIsPanning(state.activeMode === "panMode");
    });
  }, [interactionManager]);
  return {
    provides,
    isPanning
  };
};

// src/react/components/pan-mode.tsx
var import_react4 = require("react");

// ../plugin-viewport/dist/react/index.js
var import_preact6 = require("preact");
var import_hooks3 = require("preact/hooks");

// ../plugin-viewport/dist/jsxRuntime.module-D89ud_rY.js
var import_preact5 = require("preact");

// ../plugin-viewport/dist/viewport-plugin-CewlD1yp.js
var v5 = "SET_VIEWPORT_METRICS";
var T5 = "SET_VIEWPORT_SCROLL_METRICS";
var R4 = "SET_VIEWPORT_GAP";
var E5 = "SET_SCROLL_ACTIVITY";
function C5(e) {
  return {
    type: R4,
    payload: e
  };
}
function $5(e) {
  return {
    type: v5,
    payload: e
  };
}
function I4(e) {
  return {
    type: T5,
    payload: e
  };
}
function M7(e) {
  return { type: E5, payload: e };
}
var _4 = "\xAD";
var A5 = "\u200B";
var P6 = "\u2060";
var O5 = "\uFEFF";
var L7 = "\uFFFE";
var V4 = "\uFFFF";
var F6 = Object.freeze([
  _4,
  A5,
  P6,
  O5,
  L7,
  V4
]);
new RegExp(`[${F6.join("")}]`, "g");
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
  (e, t2) => (e[t2.id] = t2, e),
  {}
);
y4.reduce((e, t2) => (e[t2.css] = t2.id, e), {});
y4.map((e) => ({
  value: e.id,
  label: e.label
}));
var z6 = Object.freeze({
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
  z6
).reduce(
  (e, [t2, i2]) => (e[i2] = Number(t2), e),
  {}
);
function b3(e, t2, i2) {
  if (e === t2)
    return true;
  if (e == null || t2 == null)
    return e === t2;
  const s4 = typeof e;
  if (s4 !== typeof t2) return false;
  if (s4 === "object") {
    i2 || (i2 = /* @__PURE__ */ new Set());
    const r = D5(e, t2);
    if (i2.has(r))
      return true;
    i2.add(r);
    const l4 = Array.isArray(e), n = Array.isArray(t2);
    return l4 && n ? x4(e, t2, i2) : !l4 && !n ? k6(e, t2, i2) : false;
  }
  return false;
}
function D5(e, t2) {
  return `${m4(e)}__${m4(t2)}`;
}
var j4 = 0;
var f3 = /* @__PURE__ */ new WeakMap();
function m4(e) {
  return f3.has(e) || f3.set(e, ++j4), f3.get(e);
}
function x4(e, t2, i2) {
  if (e.length !== t2.length) return false;
  const s4 = new Array(t2.length).fill(false);
  t: for (let r = 0; r < e.length; r++) {
    const l4 = e[r];
    for (let n = 0; n < t2.length; n++)
      if (!s4[n] && b3(l4, t2[n], i2)) {
        s4[n] = true;
        continue t;
      }
    return false;
  }
  return true;
}
function k6(e, t2, i2) {
  const s4 = Object.keys(e).sort(), r = Object.keys(t2).sort();
  if (s4.length !== r.length) return false;
  for (let l4 = 0; l4 < s4.length; l4++)
    if (s4[l4] !== r[l4]) return false;
  for (const l4 of s4) {
    const n = e[l4], o = t2[l4];
    if (!b3(n, o, i2))
      return false;
  }
  return true;
}
var G4 = class {
  constructor(t2, i2) {
    if (this.id = t2, this.registry = i2, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t2 !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t2} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((s4, r, l4) => {
      this.onStoreUpdated(l4, r);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((s4, r, l4) => {
      this.onCoreStoreUpdated(l4, r);
    }), this.readyPromise = new Promise((s4) => {
      this.readyResolve = s4;
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
  debouncedDispatch(t2, i2 = 100) {
    const s4 = Date.now(), r = this.debouncedActions[t2.type] || 0;
    return s4 - r >= i2 ? (this.debouncedActions[t2.type] = s4, this.dispatch(t2), true) : false;
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
  onStoreUpdated(t2, i2) {
  }
  /**
   * Called when the core store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onCoreStoreUpdated(t2, i2) {
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
var W3 = class {
  constructor(t2, i2) {
    this.handler = t2, this.options = i2, this.lastRun = 0, this.handle = (s4) => {
      this.options.mode === "debounce" ? this.debounce(s4) : this.throttle(s4);
    };
  }
  debounce(t2) {
    this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(() => {
      this.handler(t2), this.timeoutId = void 0;
    }, this.options.wait);
  }
  throttle(t2) {
    if (this.options.mode === "debounce") return;
    const i2 = Date.now(), s4 = this.options.throttleMode || "leading-trailing";
    i2 - this.lastRun >= this.options.wait && (s4 === "leading-trailing" && this.handler(t2), this.lastRun = i2), this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(
      () => {
        this.handler(t2), this.lastRun = Date.now(), this.timeoutId = void 0;
      },
      this.options.wait - (i2 - this.lastRun)
    );
  }
  destroy() {
    this.timeoutId && window.clearTimeout(this.timeoutId);
  }
};
function q3() {
  const e = /* @__PURE__ */ new Set();
  return {
    emit: (t2 = void 0) => e.forEach((i2) => i2(t2)),
    on: (t2) => (e.add(t2), () => e.delete(t2)),
    off: (t2) => e.delete(t2),
    clear: () => e.clear()
  };
}
function p4(e, t2 = b3) {
  const i2 = /* @__PURE__ */ new Set(), s4 = /* @__PURE__ */ new Map();
  let r = e;
  const l4 = (o) => i2.forEach((c) => c(o)), n = (o, c) => {
    let a4 = o, d3 = () => {
    };
    if (c) {
      const h4 = new W3(o, c);
      a4 = h4.handle, d3 = () => h4.destroy(), s4.set(o, { wrapped: a4, destroy: d3 });
    }
    return r !== void 0 && a4(r), i2.add(a4), () => {
      i2.delete(a4), d3(), s4.delete(o);
    };
  };
  return {
    /* emitter behaviour ---------------------------------------- */
    get value() {
      return r;
    },
    emit(o = void 0) {
      (r === void 0 || !t2(r, o)) && (r = o, l4(o));
    },
    on: n,
    off(o) {
      const c = s4.get(o);
      c ? (i2.delete(c.wrapped), c.destroy(), s4.delete(o)) : i2.delete(o);
    },
    clear() {
      i2.clear(), s4.forEach((o) => o.destroy()), s4.clear();
    },
    /* derived hook --------------------------------------------- */
    select(o, c = b3) {
      return (a4, d3) => {
        let h4;
        if (r !== void 0) {
          const u2 = o(r);
          h4 = u2, a4(u2);
        }
        return n(
          (u2) => {
            const S7 = o(u2);
            (h4 === void 0 || !c(h4, S7)) && (h4 = S7, a4(S7));
          },
          d3
        );
      };
    }
  };
}
var g3 = class g4 extends G4 {
  constructor(t2, i2, s4) {
    super(t2, i2), this.id = t2, this.viewportResize$ = p4(), this.viewportMetrics$ = p4(), this.scrollMetrics$ = p4(), this.scrollReq$ = q3(), this.scrollActivity$ = p4(), this.rectProvider = null, s4.viewportGap && this.dispatch(C5(s4.viewportGap)), this.scrollEndDelay = s4.scrollEndDelay || 300;
  }
  buildCapability() {
    return {
      getViewportGap: () => this.state.viewportGap,
      getMetrics: () => this.state.viewportMetrics,
      getBoundingRect: () => {
        var t2;
        return ((t2 = this.rectProvider) == null ? void 0 : t2.call(this)) ?? {
          origin: { x: 0, y: 0 },
          size: { width: 0, height: 0 }
        };
      },
      scrollTo: (t2) => this.scrollTo(t2),
      isScrolling: () => this.state.isScrolling,
      onScrollChange: this.scrollMetrics$.on,
      onViewportChange: this.viewportMetrics$.on,
      onViewportResize: this.viewportResize$.on,
      onScrollActivity: this.scrollActivity$.on
    };
  }
  setViewportResizeMetrics(t2) {
    this.dispatch($5(t2)), this.viewportResize$.emit(this.state.viewportMetrics);
  }
  setViewportScrollMetrics(t2) {
    (t2.scrollTop !== this.state.viewportMetrics.scrollTop || t2.scrollLeft !== this.state.viewportMetrics.scrollLeft) && (this.dispatch(I4(t2)), this.bumpScrollActivity(), this.scrollMetrics$.emit({
      scrollTop: t2.scrollTop,
      scrollLeft: t2.scrollLeft
    }));
  }
  onScrollRequest(t2) {
    return this.scrollReq$.on(t2);
  }
  registerBoundingRectProvider(t2) {
    this.rectProvider = t2;
  }
  bumpScrollActivity() {
    this.debouncedDispatch(M7(false), this.scrollEndDelay);
  }
  scrollTo(t2) {
    const { x: i2, y: s4, center: r, behavior: l4 = "auto" } = t2;
    if (r) {
      const n = this.state.viewportMetrics, o = i2 - n.clientWidth / 2, c = s4 - n.clientHeight / 2;
      this.scrollReq$.emit({
        x: o,
        y: c,
        behavior: l4
      });
    } else
      this.scrollReq$.emit({
        x: i2,
        y: s4,
        behavior: l4
      });
  }
  // Subscribe to store changes to notify onViewportChange
  onStoreUpdated(t2, i2) {
    t2 !== i2 && (this.viewportMetrics$.emit(i2.viewportMetrics), t2.isScrolling !== i2.isScrolling && this.scrollActivity$.emit(i2.isScrolling));
  }
  async initialize(t2) {
  }
  async destroy() {
    super.destroy(), this.viewportMetrics$.clear(), this.viewportResize$.clear(), this.scrollMetrics$.clear(), this.scrollReq$.clear(), this.scrollActivity$.clear(), this.rectProvider = null, this.scrollEndTimer && clearTimeout(this.scrollEndTimer);
  }
};
g3.id = "viewport";
var w4 = g3;

// ../plugin-viewport/dist/react/index.js
function X3(e, r) {
  for (var t2 in r) e[t2] = r[t2];
  return e;
}
function g5(e, r) {
  for (var t2 in e) if (t2 !== "__source" && !(t2 in r)) return true;
  for (var n in r) if (n !== "__source" && e[n] !== r[n]) return true;
  return false;
}
function b4(e, r) {
  this.props = e, this.context = r;
}
(b4.prototype = new import_preact6.Component()).isPureReactComponent = true, b4.prototype.shouldComponentUpdate = function(e, r) {
  return g5(this.props, e) || g5(this.state, r);
};
var w5 = import_preact6.options.__b;
import_preact6.options.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), w5 && w5(e);
};
var Y3 = import_preact6.options.__e;
import_preact6.options.__e = function(e, r, t2, n) {
  if (e.then) {
    for (var o, _5 = r; _5 = _5.__; ) if ((o = _5.__c) && o.__c) return r.__e == null && (r.__e = t2.__e, r.__k = t2.__k), o.__c(e, r);
  }
  Y3(e, r, t2, n);
};
var P7 = import_preact6.options.unmount;
function z7(e, r, t2) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(n) {
    typeof n.__c == "function" && n.__c();
  }), e.__c.__H = null), (e = X3({}, e)).__c != null && (e.__c.__P === t2 && (e.__c.__P = r), e.__c.__e = true, e.__c = null), e.__k = e.__k && e.__k.map(function(n) {
    return z7(n, r, t2);
  })), e;
}
function T6(e, r, t2) {
  return e && t2 && (e.__v = null, e.__k = e.__k && e.__k.map(function(n) {
    return T6(n, r, t2);
  }), e.__c && e.__c.__P === r && (e.__e && t2.appendChild(e.__e), e.__c.__e = true, e.__c.__P = t2)), e;
}
function m5() {
  this.__u = 0, this.o = null, this.__b = null;
}
function B4(e) {
  var r = e.__.__c;
  return r && r.__a && r.__a(e);
}
function p5() {
  this.i = null, this.l = null;
}
import_preact6.options.unmount = function(e) {
  var r = e.__c;
  r && r.__R && r.__R(), r && 32 & e.__u && (e.type = null), P7 && P7(e);
}, (m5.prototype = new import_preact6.Component()).__c = function(e, r) {
  var t2 = r.__c, n = this;
  n.o == null && (n.o = []), n.o.push(t2);
  var o = B4(n.__v), _5 = false, i2 = function() {
    _5 || (_5 = true, t2.__R = null, o ? o(u2) : u2());
  };
  t2.__R = i2;
  var u2 = function() {
    if (!--n.__u) {
      if (n.state.__a) {
        var l4 = n.state.__a;
        n.__v.__k[0] = T6(l4, l4.__c.__P, l4.__c.__O);
      }
      var c;
      for (n.setState({ __a: n.__b = null }); c = n.o.pop(); ) c.forceUpdate();
    }
  };
  n.__u++ || 32 & r.__u || n.setState({ __a: n.__b = n.__v.__k[0] }), e.then(i2, i2);
}, m5.prototype.componentWillUnmount = function() {
  this.o = [];
}, m5.prototype.render = function(e, r) {
  if (this.__b) {
    if (this.__v.__k) {
      var t2 = document.createElement("div"), n = this.__v.__k[0].__c;
      this.__v.__k[0] = z7(this.__b, t2, n.__O = n.__P);
    }
    this.__b = null;
  }
  var o = r.__a && (0, import_preact6.createElement)(import_preact6.Fragment, null, e.fallback);
  return o && (o.__u &= -33), [(0, import_preact6.createElement)(import_preact6.Fragment, null, r.__a ? null : e.children), o];
};
var k7 = function(e, r, t2) {
  if (++t2[1] === t2[0] && e.l.delete(r), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (t2 = e.i; t2; ) {
    for (; t2.length > 3; ) t2.pop()();
    if (t2[1] < t2[0]) break;
    e.i = t2 = t2[2];
  }
};
(p5.prototype = new import_preact6.Component()).__a = function(e) {
  var r = this, t2 = B4(r.__v), n = r.l.get(e);
  return n[0]++, function(o) {
    var _5 = function() {
      r.props.revealOrder ? (n.push(o), k7(r, e, n)) : o();
    };
    t2 ? t2(_5) : _5();
  };
}, p5.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var r = (0, import_preact6.toChildArray)(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && r.reverse();
  for (var t2 = r.length; t2--; ) this.l.set(r[t2], this.i = [1, 0, this.i]);
  return e.children;
}, p5.prototype.componentDidUpdate = p5.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(r, t2) {
    k7(e, t2, r);
  });
};
var ee4 = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103;
var te = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
var re = /^on(Ani|Tra|Tou|BeforeInp|Compo)/;
var ne = /[A-Z0-9]/g;
var oe2 = typeof document < "u";
var ie2 = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
import_preact6.Component.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(import_preact6.Component.prototype, e, { configurable: true, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(r) {
    Object.defineProperty(this, e, { configurable: true, writable: true, value: r });
  } });
});
var R5 = import_preact6.options.event;
function le() {
}
function ue2() {
  return this.cancelBubble;
}
function _e() {
  return this.defaultPrevented;
}
import_preact6.options.event = function(e) {
  return R5 && (e = R5(e)), e.persist = le, e.isPropagationStopped = ue2, e.isDefaultPrevented = _e, e.nativeEvent = e;
};
var ae3 = { enumerable: false, configurable: true, get: function() {
  return this.class;
} };
var O6 = import_preact6.options.vnode;
import_preact6.options.vnode = function(e) {
  typeof e.type == "string" && function(r) {
    var t2 = r.props, n = r.type, o = {}, _5 = n.indexOf("-") === -1;
    for (var i2 in t2) {
      var u2 = t2[i2];
      if (!(i2 === "value" && "defaultValue" in t2 && u2 == null || oe2 && i2 === "children" && n === "noscript" || i2 === "class" || i2 === "className")) {
        var l4 = i2.toLowerCase();
        i2 === "defaultValue" && "value" in t2 && t2.value == null ? i2 = "value" : i2 === "download" && u2 === true ? u2 = "" : l4 === "translate" && u2 === "no" ? u2 = false : l4[0] === "o" && l4[1] === "n" ? l4 === "ondoubleclick" ? i2 = "ondblclick" : l4 !== "onchange" || n !== "input" && n !== "textarea" || ie2(t2.type) ? l4 === "onfocus" ? i2 = "onfocusin" : l4 === "onblur" ? i2 = "onfocusout" : re.test(i2) && (i2 = l4) : l4 = i2 = "oninput" : _5 && te.test(i2) ? i2 = i2.replace(ne, "-$&").toLowerCase() : u2 === null && (u2 = void 0), l4 === "oninput" && o[i2 = l4] && (i2 = "oninputCapture"), o[i2] = u2;
      }
    }
    n == "select" && o.multiple && Array.isArray(o.value) && (o.value = (0, import_preact6.toChildArray)(t2.children).forEach(function(c) {
      c.props.selected = o.value.indexOf(c.props.value) != -1;
    })), n == "select" && o.defaultValue != null && (o.value = (0, import_preact6.toChildArray)(t2.children).forEach(function(c) {
      c.props.selected = o.multiple ? o.defaultValue.indexOf(c.props.value) != -1 : o.defaultValue == c.props.value;
    })), t2.class && !t2.className ? (o.class = t2.class, Object.defineProperty(o, "className", ae3)) : (t2.className && !t2.class || t2.class && t2.className) && (o.class = o.className = t2.className), r.props = o;
  }(e), e.$$typeof = ee4, O6 && O6(e);
};
var C6 = import_preact6.options.__r;
import_preact6.options.__r = function(e) {
  C6 && C6(e), e.__c;
};
var E6 = import_preact6.options.diffed;
import_preact6.options.diffed = function(e) {
  E6 && E6(e);
  var r = e.props, t2 = e.__e;
  t2 != null && e.type === "textarea" && "value" in r && r.value !== t2.value && (t2.value = r.value == null ? "" : r.value);
};
function ce2(e, r) {
  for (var t2 in r) e[t2] = r[t2];
  return e;
}
function S6(e, r) {
  for (var t2 in e) if (t2 !== "__source" && !(t2 in r)) return true;
  for (var n in r) if (n !== "__source" && e[n] !== r[n]) return true;
  return false;
}
function x5(e, r) {
  this.props = e, this.context = r;
}
(x5.prototype = new import_preact6.Component()).isPureReactComponent = true, x5.prototype.shouldComponentUpdate = function(e, r) {
  return S6(this.props, e) || S6(this.state, r);
};
var V5 = import_preact6.options.__b;
import_preact6.options.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), V5 && V5(e);
};
var se2 = import_preact6.options.__e;
import_preact6.options.__e = function(e, r, t2, n) {
  if (e.then) {
    for (var o, _5 = r; _5 = _5.__; ) if ((o = _5.__c) && o.__c) return r.__e == null && (r.__e = t2.__e, r.__k = t2.__k), o.__c(e, r);
  }
  se2(e, r, t2, n);
};
var $6 = import_preact6.options.unmount;
function D6(e, r, t2) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(n) {
    typeof n.__c == "function" && n.__c();
  }), e.__c.__H = null), (e = ce2({}, e)).__c != null && (e.__c.__P === t2 && (e.__c.__P = r), e.__c.__e = true, e.__c = null), e.__k = e.__k && e.__k.map(function(n) {
    return D6(n, r, t2);
  })), e;
}
function M8(e, r, t2) {
  return e && t2 && (e.__v = null, e.__k = e.__k && e.__k.map(function(n) {
    return M8(n, r, t2);
  }), e.__c && e.__c.__P === r && (e.__e && t2.appendChild(e.__e), e.__c.__e = true, e.__c.__P = t2)), e;
}
function y5() {
  this.__u = 0, this.o = null, this.__b = null;
}
function j5(e) {
  var r = e.__.__c;
  return r && r.__a && r.__a(e);
}
function v6() {
  this.i = null, this.l = null;
}
import_preact6.options.unmount = function(e) {
  var r = e.__c;
  r && r.__R && r.__R(), r && 32 & e.__u && (e.type = null), $6 && $6(e);
}, (y5.prototype = new import_preact6.Component()).__c = function(e, r) {
  var t2 = r.__c, n = this;
  n.o == null && (n.o = []), n.o.push(t2);
  var o = j5(n.__v), _5 = false, i2 = function() {
    _5 || (_5 = true, t2.__R = null, o ? o(u2) : u2());
  };
  t2.__R = i2;
  var u2 = function() {
    if (!--n.__u) {
      if (n.state.__a) {
        var l4 = n.state.__a;
        n.__v.__k[0] = M8(l4, l4.__c.__P, l4.__c.__O);
      }
      var c;
      for (n.setState({ __a: n.__b = null }); c = n.o.pop(); ) c.forceUpdate();
    }
  };
  n.__u++ || 32 & r.__u || n.setState({ __a: n.__b = n.__v.__k[0] }), e.then(i2, i2);
}, y5.prototype.componentWillUnmount = function() {
  this.o = [];
}, y5.prototype.render = function(e, r) {
  if (this.__b) {
    if (this.__v.__k) {
      var t2 = document.createElement("div"), n = this.__v.__k[0].__c;
      this.__v.__k[0] = D6(this.__b, t2, n.__O = n.__P);
    }
    this.__b = null;
  }
  var o = r.__a && (0, import_preact6.createElement)(import_preact6.Fragment, null, e.fallback);
  return o && (o.__u &= -33), [(0, import_preact6.createElement)(import_preact6.Fragment, null, r.__a ? null : e.children), o];
};
var L8 = function(e, r, t2) {
  if (++t2[1] === t2[0] && e.l.delete(r), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (t2 = e.i; t2; ) {
    for (; t2.length > 3; ) t2.pop()();
    if (t2[1] < t2[0]) break;
    e.i = t2 = t2[2];
  }
};
(v6.prototype = new import_preact6.Component()).__a = function(e) {
  var r = this, t2 = j5(r.__v), n = r.l.get(e);
  return n[0]++, function(o) {
    var _5 = function() {
      r.props.revealOrder ? (n.push(o), L8(r, e, n)) : o();
    };
    t2 ? t2(_5) : _5();
  };
}, v6.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var r = (0, import_preact6.toChildArray)(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && r.reverse();
  for (var t2 = r.length; t2--; ) this.l.set(r[t2], this.i = [1, 0, this.i]);
  return e.children;
}, v6.prototype.componentDidUpdate = v6.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(r, t2) {
    L8(e, t2, r);
  });
};
var fe2 = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103;
var pe2 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
var ve2 = /^on(Ani|Tra|Tou|BeforeInp|Compo)/;
var de2 = /[A-Z0-9]/g;
var he2 = typeof document < "u";
var me2 = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
import_preact6.Component.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(import_preact6.Component.prototype, e, { configurable: true, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(r) {
    Object.defineProperty(this, e, { configurable: true, writable: true, value: r });
  } });
});
var N7 = import_preact6.options.event;
function ye2() {
}
function ge2() {
  return this.cancelBubble;
}
function be2() {
  return this.defaultPrevented;
}
import_preact6.options.event = function(e) {
  return N7 && (e = N7(e)), e.persist = ye2, e.isPropagationStopped = ge2, e.isDefaultPrevented = be2, e.nativeEvent = e;
};
var we2 = { enumerable: false, configurable: true, get: function() {
  return this.class;
} };
var U5 = import_preact6.options.vnode;
import_preact6.options.vnode = function(e) {
  typeof e.type == "string" && function(r) {
    var t2 = r.props, n = r.type, o = {}, _5 = n.indexOf("-") === -1;
    for (var i2 in t2) {
      var u2 = t2[i2];
      if (!(i2 === "value" && "defaultValue" in t2 && u2 == null || he2 && i2 === "children" && n === "noscript" || i2 === "class" || i2 === "className")) {
        var l4 = i2.toLowerCase();
        i2 === "defaultValue" && "value" in t2 && t2.value == null ? i2 = "value" : i2 === "download" && u2 === true ? u2 = "" : l4 === "translate" && u2 === "no" ? u2 = false : l4[0] === "o" && l4[1] === "n" ? l4 === "ondoubleclick" ? i2 = "ondblclick" : l4 !== "onchange" || n !== "input" && n !== "textarea" || me2(t2.type) ? l4 === "onfocus" ? i2 = "onfocusin" : l4 === "onblur" ? i2 = "onfocusout" : ve2.test(i2) && (i2 = l4) : l4 = i2 = "oninput" : _5 && pe2.test(i2) ? i2 = i2.replace(de2, "-$&").toLowerCase() : u2 === null && (u2 = void 0), l4 === "oninput" && o[i2 = l4] && (i2 = "oninputCapture"), o[i2] = u2;
      }
    }
    n == "select" && o.multiple && Array.isArray(o.value) && (o.value = (0, import_preact6.toChildArray)(t2.children).forEach(function(c) {
      c.props.selected = o.value.indexOf(c.props.value) != -1;
    })), n == "select" && o.defaultValue != null && (o.value = (0, import_preact6.toChildArray)(t2.children).forEach(function(c) {
      c.props.selected = o.multiple ? o.defaultValue.indexOf(c.props.value) != -1 : o.defaultValue == c.props.value;
    })), t2.class && !t2.className ? (o.class = t2.class, Object.defineProperty(o, "className", we2)) : (t2.className && !t2.class || t2.class && t2.className) && (o.class = o.className = t2.className), r.props = o;
  }(e), e.$$typeof = fe2, U5 && U5(e);
};
var W4 = import_preact6.options.__r;
import_preact6.options.__r = function(e) {
  W4 && W4(e), e.__c;
};
var A6 = import_preact6.options.diffed;
import_preact6.options.diffed = function(e) {
  A6 && A6(e);
  var r = e.props, t2 = e.__e;
  t2 != null && e.type === "textarea" && "value" in r && r.value !== t2.value && (t2.value = r.value == null ? "" : r.value);
};
var Pe2 = (0, import_preact6.createContext)({
  registry: null,
  isInitializing: true,
  pluginsReady: false
});
function ke2() {
  const e = (0, import_hooks3.useContext)(Pe2);
  if (e === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: r, isInitializing: t2 } = e;
  if (t2)
    return e;
  if (r === null)
    throw new Error("PDF registry failed to initialize properly");
  return e;
}
function F7(e) {
  const { registry: r } = ke2();
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
function Re2(e) {
  const { plugin: r, isLoading: t2, ready: n } = F7(e);
  if (!r)
    return {
      provides: null,
      isLoading: t2,
      ready: n
    };
  if (!r.provides)
    throw new Error(`Plugin ${e} does not provide a capability`);
  return {
    provides: r.provides(),
    isLoading: t2,
    ready: n
  };
}
var Ce2 = () => Re2(w4.id);

// src/react/components/pan-mode.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var PanMode = () => {
  const { register } = Te({ modeId: "panMode" });
  const { setCursor, removeCursor } = Fe();
  const { provides: viewport } = Ce2();
  const dragRef = (0, import_react4.useRef)(null);
  const handlers = (0, import_react4.useMemo)(
    () => ({
      onPointerDown: (_5, pe3) => {
        if (!viewport) return;
        const metrics = viewport.getMetrics();
        dragRef.current = {
          startX: pe3.clientX,
          startY: pe3.clientY,
          startLeft: metrics.scrollLeft,
          startTop: metrics.scrollTop
        };
        setCursor("panMode", "grabbing", 10);
      },
      onPointerMove: (_5, pe3) => {
        const drag = dragRef.current;
        if (!drag || !viewport) return;
        const dx = pe3.clientX - drag.startX;
        const dy = pe3.clientY - drag.startY;
        viewport.scrollTo({
          x: drag.startLeft - dx,
          y: drag.startTop - dy
        });
      },
      onPointerUp: () => {
        const drag = dragRef.current;
        if (!drag) return;
        dragRef.current = null;
        removeCursor("panMode");
      },
      onPointerLeave: () => {
        const drag = dragRef.current;
        if (!drag) return;
        dragRef.current = null;
        removeCursor("panMode");
      },
      onPointerCancel: () => {
        const drag = dragRef.current;
        if (!drag) return;
        dragRef.current = null;
        removeCursor("panMode");
      }
    }),
    [viewport, setCursor, removeCursor]
  );
  (0, import_react4.useEffect)(() => {
    if (!register) return;
    return register(handlers);
  }, [register, handlers]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PanMode,
  usePan,
  usePanCapability,
  usePanPlugin
});
//# sourceMappingURL=index.cjs.map