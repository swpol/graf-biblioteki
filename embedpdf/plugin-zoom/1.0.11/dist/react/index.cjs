"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/react/index.ts
var react_exports = {};
__export(react_exports, {
  MarqueeZoom: () => MarqueeZoom,
  PinchWrapper: () => PinchWrapper,
  usePinch: () => usePinch,
  useZoom: () => useZoom,
  useZoomCapability: () => useZoomCapability,
  useZoomPlugin: () => useZoomPlugin
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
    u2 || (u2 = true, t2.__R = null, n ? n(l3) : l3());
  };
  t2.__R = i2;
  var l3 = function() {
    if (!--o.__u) {
      if (o.state.__a) {
        var a2 = o.state.__a;
        o.__v.__k[0] = z2(a2, a2.__c.__P, a2.__c.__O);
      }
      var _4;
      for (o.setState({ __a: o.__b = null }); _4 = o.o.pop(); ) _4.forceUpdate();
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
      var l3 = t2[i2];
      if (!(i2 === "value" && "defaultValue" in t2 && l3 == null || G && i2 === "children" && o === "noscript" || i2 === "class" || i2 === "className")) {
        var a2 = i2.toLowerCase();
        i2 === "defaultValue" && "value" in t2 && t2.value == null ? i2 = "value" : i2 === "download" && l3 === true ? l3 = "" : a2 === "translate" && l3 === "no" ? l3 = false : a2[0] === "o" && a2[1] === "n" ? a2 === "ondoubleclick" ? i2 = "ondblclick" : a2 !== "onchange" || o !== "input" && o !== "textarea" || J(t2.type) ? a2 === "onfocus" ? i2 = "onfocusin" : a2 === "onblur" ? i2 = "onfocusout" : I.test(i2) && (i2 = a2) : a2 = i2 = "oninput" : u2 && q.test(i2) ? i2 = i2.replace(Z, "-$&").toLowerCase() : l3 === null && (l3 = void 0), a2 === "oninput" && n[i2 = a2] && (i2 = "oninputCapture"), n[i2] = l3;
      }
    }
    o == "select" && n.multiple && Array.isArray(n.value) && (n.value = (0, import_preact2.toChildArray)(t2.children).forEach(function(_4) {
      _4.props.selected = n.value.indexOf(_4.props.value) != -1;
    })), o == "select" && n.defaultValue != null && (n.value = (0, import_preact2.toChildArray)(t2.children).forEach(function(_4) {
      _4.props.selected = n.multiple ? n.defaultValue.indexOf(_4.props.value) != -1 : n.defaultValue == _4.props.value;
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

// dist/index.js
var SET_ZOOM_LEVEL = "SET_ZOOM_LEVEL";
var SET_INITIAL_ZOOM_LEVEL = "SET_INITIAL_ZOOM_LEVEL";
function setZoomLevel(zoomLevel, currentZoomLevel) {
  return {
    type: SET_ZOOM_LEVEL,
    payload: { zoomLevel, currentZoomLevel }
  };
}
function setInitialZoomLevel(zoomLevel) {
  return {
    type: SET_INITIAL_ZOOM_LEVEL,
    payload: { zoomLevel }
  };
}
var initialState = {
  zoomLevel: "automatic",
  currentZoomLevel: 1
};
var f2 = "SET_DOCUMENT";
var y2 = "SET_SCALE";
var w2 = "SET_ROTATION";
var E2 = "SET_PAGES";
var J2 = (i2) => ({ type: y2, payload: i2 });
function T2(i2) {
  const { width: e, height: t2 } = i2;
  return {
    width: t2,
    height: e
  };
}
function X2(i2, e, t2) {
  return i2 = e % 2 === 0 ? i2 : T2(i2), {
    width: i2.width * t2,
    height: i2.height * t2
  };
}
var z3 = "\xAD";
var M3 = "\u200B";
var L3 = "\u2060";
var $2 = "\uFEFF";
var F3 = "\uFFFE";
var N3 = "\uFFFF";
var k3 = Object.freeze([
  z3,
  M3,
  L3,
  $2,
  F3,
  N3
]);
new RegExp(`[${k3.join("")}]`, "g");
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
function te(i2, e, t2) {
  return i2 < e ? e : i2 > t2 ? t2 : i2;
}
function v3(i2, e, t2) {
  if (i2 === e)
    return true;
  if (i2 == null || e == null)
    return i2 === e;
  const r = typeof i2;
  if (r !== typeof e) return false;
  if (r === "object") {
    t2 || (t2 = /* @__PURE__ */ new Set());
    const n = x2(i2, e);
    if (t2.has(n))
      return true;
    t2.add(n);
    const a2 = Array.isArray(i2), o = Array.isArray(e);
    return a2 && o ? U2(i2, e, t2) : !a2 && !o ? B2(i2, e, t2) : false;
  }
  return false;
}
function x2(i2, e) {
  return `${S2(i2)}__${S2(e)}`;
}
var G2 = 0;
var d = /* @__PURE__ */ new WeakMap();
function S2(i2) {
  return d.has(i2) || d.set(i2, ++G2), d.get(i2);
}
function U2(i2, e, t2) {
  if (i2.length !== e.length) return false;
  const r = new Array(e.length).fill(false);
  e: for (let s3 = 0; s3 < i2.length; s3++) {
    const n = i2[s3];
    for (let a2 = 0; a2 < e.length; a2++)
      if (!r[a2] && v3(n, e[a2], t2)) {
        r[a2] = true;
        continue e;
      }
    return false;
  }
  return true;
}
function B2(i2, e, t2) {
  const r = Object.keys(i2).sort(), s3 = Object.keys(e).sort();
  if (r.length !== s3.length) return false;
  for (let n = 0; n < r.length; n++)
    if (r[n] !== s3[n]) return false;
  for (const n of r) {
    const a2 = i2[n], o = e[n];
    if (!v3(a2, o, t2))
      return false;
  }
  return true;
}
var f22 = (o) => o.pages.map(
  (t2) => t2.map((e) => ({
    ...e,
    rotatedSize: X2(e.size, o.rotation, 1)
  }))
);
var w22 = class {
  constructor(t2, e) {
    if (this.id = t2, this.registry = e, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t2 !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t2} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((i2, s3, c) => {
      this.onStoreUpdated(c, s3);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((i2, s3, c) => {
      this.onCoreStoreUpdated(c, s3);
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
    const i2 = Date.now(), s3 = this.debouncedActions[t2.type] || 0;
    return i2 - s3 >= e ? (this.debouncedActions[t2.type] = i2, this.dispatch(t2), true) : false;
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
function E22() {
  const o = /* @__PURE__ */ new Set();
  return {
    emit: (e = void 0) => o.forEach((i2) => i2(e)),
    on: (e) => (o.add(e), () => o.delete(e)),
    off: (e) => o.delete(e),
    clear: () => o.clear()
  };
}
function C2(o, t2 = v3) {
  const e = /* @__PURE__ */ new Set(), i2 = /* @__PURE__ */ new Map();
  let s3 = o;
  const c = (r) => e.forEach((n) => n(r)), p22 = (r, n) => {
    let a2 = r, d22 = () => {
    };
    if (n) {
      const u2 = new b2(r, n);
      a2 = u2.handle, d22 = () => u2.destroy(), i2.set(r, { wrapped: a2, destroy: d22 });
    }
    return s3 !== void 0 && a2(s3), e.add(a2), () => {
      e.delete(a2), d22(), i2.delete(r);
    };
  };
  return {
    /* emitter behaviour ---------------------------------------- */
    get value() {
      return s3;
    },
    emit(r = void 0) {
      (s3 === void 0 || !t2(s3, r)) && (s3 = r, c(r));
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
    select(r, n = v3) {
      return (a2, d22) => {
        let u2;
        if (s3 !== void 0) {
          const h3 = r(s3);
          u2 = h3, a2(h3);
        }
        return p22(
          (h3) => {
            const l22 = r(h3);
            (u2 === void 0 || !n(u2, l22)) && (u2 = l22, a2(l22));
          },
          d22
        );
      };
    }
  };
}
function swap(size) {
  const { width, height } = size;
  return {
    width: height,
    height: width
  };
}
function rotateRect(containerSize, rect, rotation) {
  let x22 = rect.origin.x;
  let y22 = rect.origin.y;
  let size = rect.size;
  switch (rotation) {
    case 0:
      break;
    case 1:
      x22 = containerSize.height - rect.origin.y - rect.size.height;
      y22 = rect.origin.x;
      size = swap(rect.size);
      break;
    case 2:
      x22 = containerSize.width - rect.origin.x - rect.size.width;
      y22 = containerSize.height - rect.origin.y - rect.size.height;
      break;
    case 3:
      x22 = rect.origin.y;
      y22 = containerSize.width - rect.origin.x - rect.size.width;
      size = swap(rect.size);
      break;
  }
  return {
    origin: {
      x: x22,
      y: y22
    },
    size: {
      width: size.width,
      height: size.height
    }
  };
}
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
var ZoomPlugin = class extends w22 {
  /* ------------------------------------------------------------------ */
  constructor(id, registry, cfg) {
    super(id, registry);
    this.zoom$ = E22();
    this.state$ = C2();
    this.viewportPlugin = registry.getPlugin("viewport");
    this.viewport = this.viewportPlugin.provides();
    this.scroll = registry.getPlugin("scroll").provides();
    const interactionManager = registry.getPlugin("interaction-manager");
    this.interactionManager = interactionManager?.provides() ?? null;
    this.minZoom = cfg.minZoom ?? 0.25;
    this.maxZoom = cfg.maxZoom ?? 10;
    this.zoomStep = cfg.zoomStep ?? 0.1;
    this.presets = cfg.presets ?? [];
    this.zoomRanges = this.normalizeRanges(cfg.zoomRanges ?? []);
    this.dispatch(setInitialZoomLevel(cfg.defaultZoomLevel));
    this.viewport.onViewportResize(() => this.recalcAuto(
      1
      /* Top */
    ), {
      mode: "debounce",
      wait: 150
    });
    this.coreStore.onAction(w2, () => this.recalcAuto(
      1
      /* Top */
    ));
    this.coreStore.onAction(E2, () => this.recalcAuto(
      1
      /* Top */
    ));
    this.coreStore.onAction(f2, () => this.recalcAuto(
      1
      /* Top */
    ));
    this.interactionManager?.registerMode({
      id: "marqueeZoom",
      scope: "page",
      exclusive: true,
      cursor: "zoom-in"
    });
    this.resetReady();
  }
  /* ------------------------------------------------------------------ */
  /* capability                                                          */
  /* ------------------------------------------------------------------ */
  buildCapability() {
    return {
      onZoomChange: this.zoom$.on,
      onStateChange: this.state$.on,
      zoomIn: () => {
        const cur = this.state.currentZoomLevel;
        return this.handleRequest({ level: cur, delta: this.stepFor(cur) });
      },
      zoomOut: () => {
        const cur = this.state.currentZoomLevel;
        return this.handleRequest({ level: cur, delta: -this.stepFor(cur) });
      },
      zoomToArea: (pageIndex, rect) => this.handleZoomToArea(pageIndex, rect),
      requestZoom: (level, c) => this.handleRequest({ level, center: c }),
      requestZoomBy: (d22, c) => {
        const cur = this.state.currentZoomLevel;
        const target = this.toZoom(cur + d22);
        return this.handleRequest({ level: target, center: c });
      },
      enableMarqueeZoom: () => {
        this.interactionManager?.activate("marqueeZoom");
      },
      disableMarqueeZoom: () => {
        this.interactionManager?.activate("default");
      },
      toggleMarqueeZoom: () => {
        if (this.interactionManager?.getActiveMode() === "marqueeZoom") {
          this.interactionManager?.activate("default");
        } else {
          this.interactionManager?.activate("marqueeZoom");
        }
      },
      isMarqueeZoomActive: () => this.interactionManager?.getActiveMode() === "marqueeZoom",
      getState: () => this.state,
      getPresets: () => this.presets
    };
  }
  /* ------------------------------------------------------------------ */
  /* plugin life‑cycle                                                   */
  /* ------------------------------------------------------------------ */
  async initialize() {
  }
  async destroy() {
    this.zoom$.clear();
  }
  /**
   * Sort ranges once, make sure they are sane
   */
  normalizeRanges(ranges) {
    return [...ranges].filter((r) => r.step > 0 && r.max > r.min).sort((a2, b32) => a2.min - b32.min);
  }
  /** pick the step that applies to a given numeric zoom */
  stepFor(zoom) {
    const r = this.zoomRanges.find((r2) => zoom >= r2.min && zoom < r2.max);
    return r ? r.step : this.zoomStep;
  }
  /** clamp + round helper reused later */
  toZoom(v22) {
    return parseFloat(te(v22, this.minZoom, this.maxZoom).toFixed(2));
  }
  /* ------------------------------------------------------------------ */
  /* main entry – handles **every** zoom request                          */
  /* ------------------------------------------------------------------ */
  handleRequest({
    level,
    delta = 0,
    center,
    focus = 0,
    align = "keep"
  }) {
    const metrics = this.viewport.getMetrics();
    const oldZoom = this.state.currentZoomLevel;
    if (metrics.clientWidth === 0 || metrics.clientHeight === 0) {
      return;
    }
    const base = typeof level === "number" ? level : this.computeZoomForMode(level, metrics);
    if (base === false) {
      return;
    }
    const exactZoom = te(base + delta, this.minZoom, this.maxZoom);
    const newZoom = Math.floor(exactZoom * 100) / 100;
    const focusPoint = center ?? {
      vx: metrics.clientWidth / 2,
      vy: focus === 1 ? 0 : metrics.clientHeight / 2
    };
    const { desiredScrollLeft, desiredScrollTop } = this.computeScrollForZoomChange(
      metrics,
      oldZoom,
      newZoom,
      focusPoint,
      align
    );
    if (!isNaN(desiredScrollLeft) && !isNaN(desiredScrollTop)) {
      this.viewportPlugin.setViewportScrollMetrics({
        scrollLeft: desiredScrollLeft,
        scrollTop: desiredScrollTop
      });
    }
    this.dispatch(setZoomLevel(typeof level === "number" ? newZoom : level, newZoom));
    this.dispatchCoreAction(J2(newZoom));
    this.markReady();
    this.viewport.scrollTo({
      x: desiredScrollLeft,
      y: desiredScrollTop,
      behavior: "instant"
    });
    const evt = {
      oldZoom,
      newZoom,
      level,
      center: focusPoint,
      desiredScrollLeft,
      desiredScrollTop,
      viewport: metrics
    };
    this.zoom$.emit(evt);
  }
  /* ------------------------------------------------------------------ */
  /* helpers                                                             */
  /* ------------------------------------------------------------------ */
  /** numeric zoom for Automatic / FitPage / FitWidth */
  computeZoomForMode(mode, vp) {
    const spreads = f22(this.coreState.core);
    if (!spreads.length) return false;
    const pgGap = this.scroll.getPageGap();
    const vpGap = this.viewport.getViewportGap();
    if (vp.clientWidth === 0 || vp.clientHeight === 0) {
      return false;
    }
    const availableWidth = vp.clientWidth - 2 * vpGap;
    const availableHeight = vp.clientHeight - 2 * vpGap;
    if (availableWidth <= 0 || availableHeight <= 0) {
      return false;
    }
    let maxContentW = 0, maxContentH = 0;
    spreads.forEach((spread) => {
      const contentW = spread.reduce((s3, p22, i2) => s3 + p22.rotatedSize.width + (i2 ? pgGap : 0), 0);
      const contentH = Math.max(...spread.map((p22) => p22.rotatedSize.height));
      maxContentW = Math.max(maxContentW, contentW);
      maxContentH = Math.max(maxContentH, contentH);
    });
    switch (mode) {
      case "fit-width":
        return availableWidth / maxContentW;
      case "fit-page":
        return Math.min(availableWidth / maxContentW, availableHeight / maxContentH);
      case "automatic":
        return Math.min(availableWidth / maxContentW, 1);
      /* istanbul ignore next */
      default:
        return 1;
    }
  }
  /** where to scroll so that *focus* stays stable after scaling          */
  computeScrollForZoomChange(vp, oldZoom, newZoom, focus, align = "keep") {
    const layout = this.scroll.getLayout();
    const vpGap = this.viewport.getViewportGap();
    const contentW = layout.totalContentSize.width;
    const contentH = layout.totalContentSize.height;
    const availableWidth = vp.clientWidth - 2 * vpGap;
    const availableHeight = vp.clientHeight - 2 * vpGap;
    const off = (availableSpace, cw, zoom) => cw * zoom < availableSpace ? (availableSpace - cw * zoom) / 2 : 0;
    const offXold = off(availableWidth, contentW, oldZoom);
    const offYold = off(availableHeight, contentH, oldZoom);
    const offXnew = off(availableWidth, contentW, newZoom);
    const offYnew = off(availableHeight, contentH, newZoom);
    const cx = (vp.scrollLeft + focus.vx - vpGap - offXold) / oldZoom;
    const cy = (vp.scrollTop + focus.vy - vpGap - offYold) / oldZoom;
    const baseLeft = cx * newZoom + vpGap + offXnew;
    const baseTop = cy * newZoom + vpGap + offYnew;
    const desiredScrollLeft = align === "center" ? baseLeft - vp.clientWidth / 2 : baseLeft - focus.vx;
    const desiredScrollTop = align === "center" ? baseTop - vp.clientHeight / 2 : baseTop - focus.vy;
    return {
      desiredScrollLeft: Math.max(0, desiredScrollLeft),
      desiredScrollTop: Math.max(0, desiredScrollTop)
    };
  }
  handleZoomToArea(pageIndex, rect) {
    const rotation = this.coreState.core.rotation;
    const vp = this.viewport.getMetrics();
    const vpGap = this.viewport.getViewportGap();
    const oldZ = this.state.currentZoomLevel;
    const availableW = vp.clientWidth - 2 * vpGap;
    const availableH = vp.clientHeight - 2 * vpGap;
    const layout = this.scroll.getLayout();
    const vItem = layout.virtualItems.find(
      (it) => it.pageLayouts.some((p22) => p22.pageIndex === pageIndex)
    );
    if (!vItem) return;
    const pageRel = vItem.pageLayouts.find((p22) => p22.pageIndex === pageIndex);
    const rotatedRect = rotateRect(
      {
        width: pageRel.width,
        height: pageRel.height
      },
      rect,
      rotation
    );
    const targetZoom = this.toZoom(
      Math.min(availableW / rotatedRect.size.width, availableH / rotatedRect.size.height)
    );
    const pageAbsX = vItem.x + pageRel.x;
    const pageAbsY = vItem.y + pageRel.y;
    const cxContent = pageAbsX + rotatedRect.origin.x + rotatedRect.size.width / 2;
    const cyContent = pageAbsY + rotatedRect.origin.y + rotatedRect.size.height / 2;
    const off = (avail, cw, z22) => cw * z22 < avail ? (avail - cw * z22) / 2 : 0;
    const offXold = off(availableW, layout.totalContentSize.width, oldZ);
    const offYold = off(availableH, layout.totalContentSize.height, oldZ);
    const centerVX = vpGap + offXold + cxContent * oldZ - vp.scrollLeft;
    const centerVY = vpGap + offYold + cyContent * oldZ - vp.scrollTop;
    this.handleRequest({
      level: targetZoom,
      center: { vx: centerVX, vy: centerVY },
      align: "center"
    });
  }
  /** recalculates Automatic / Fit* when viewport or pages change */
  recalcAuto(focus) {
    const s3 = this.state;
    if (s3.zoomLevel === "automatic" || s3.zoomLevel === "fit-page" || s3.zoomLevel === "fit-width")
      this.handleRequest({ level: s3.zoomLevel, focus });
  }
  onStoreUpdated(_prevState, newState) {
    this.state$.emit(newState);
  }
};
ZoomPlugin.id = "zoom";

// src/react/hooks/use-zoom.ts
var import_react2 = require("react");
var useZoomCapability = () => ae(ZoomPlugin.id);
var useZoomPlugin = () => ee2(ZoomPlugin.id);
var useZoom = () => {
  const { provides } = useZoomCapability();
  const [state, setState] = (0, import_react2.useState)(initialState);
  (0, import_react2.useEffect)(() => {
    return provides?.onStateChange((action) => {
      setState(action);
    });
  }, [provides]);
  return {
    state,
    provides
  };
};

// src/react/hooks/use-pinch-zoom.ts
var import_react3 = require("react");
function usePinch() {
  const { provides: viewportProvides } = ae("viewport");
  const { provides: zoomProvides } = useZoomCapability();
  const elementRef = (0, import_react3.useRef)(null);
  (0, import_react3.useEffect)(() => {
    const element = elementRef.current;
    if (!element || !viewportProvides || !zoomProvides) {
      return;
    }
    if (typeof window === "undefined") {
      return;
    }
    let hammer;
    let initialZoom = 0;
    let lastCenter = { x: 0, y: 0 };
    const getState = () => zoomProvides.getState();
    const updateTransform = (scale) => {
      element.style.transform = `scale(${scale})`;
    };
    const resetTransform = () => {
      element.style.transform = "none";
      element.style.transformOrigin = "0 0";
    };
    const pinchStart = (e) => {
      initialZoom = getState().currentZoomLevel;
      const contRect = viewportProvides.getBoundingRect();
      lastCenter = {
        x: e.center.x - contRect.origin.x,
        y: e.center.y - contRect.origin.y
      };
      const innerRect = element.getBoundingClientRect();
      element.style.transformOrigin = `${e.center.x - innerRect.left}px ${e.center.y - innerRect.top}px`;
      if (e.srcEvent?.cancelable) {
        e.srcEvent.preventDefault();
        e.srcEvent.stopPropagation();
      }
    };
    const pinchMove = (e) => {
      updateTransform(e.scale);
      if (e.srcEvent?.cancelable) {
        e.srcEvent.preventDefault();
        e.srcEvent.stopPropagation();
      }
    };
    const pinchEnd = (e) => {
      const delta = (e.scale - 1) * initialZoom;
      zoomProvides.requestZoomBy(delta, { vx: lastCenter.x, vy: lastCenter.y });
      resetTransform();
      initialZoom = 0;
    };
    const setupHammer = async () => {
      try {
        const Hammer = (await import("hammerjs")).default;
        const inputClass = (() => {
          const MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
          const SUPPORT_TOUCH = "ontouchstart" in window || navigator.maxTouchPoints > 0;
          const SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
          if (SUPPORT_ONLY_TOUCH) return Hammer.TouchInput;
          if (!SUPPORT_TOUCH) return Hammer.MouseInput;
          return Hammer.TouchMouseInput;
        })();
        hammer = new Hammer(element, {
          touchAction: "pan-x pan-y",
          // allow scroll in every direction
          inputClass
        });
        hammer.get("pinch").set({ enable: true, pointers: 2, threshold: 0.1 });
        hammer.on("pinchstart", pinchStart);
        hammer.on("pinchmove", pinchMove);
        hammer.on("pinchend", pinchEnd);
      } catch (error) {
        console.warn("Failed to load HammerJS:", error);
      }
    };
    setupHammer();
    return () => {
      hammer?.destroy();
      resetTransform();
    };
  }, [viewportProvides, zoomProvides]);
  return { elementRef };
}

// src/react/components/pinch-wrapper.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function PinchWrapper({ children, style, ...props }) {
  const { elementRef } = usePinch();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      ref: elementRef,
      ...props,
      style: {
        ...style,
        display: "block",
        width: "fit-content",
        overflow: "visible",
        boxSizing: "border-box",
        margin: "0px auto"
      },
      children
    }
  );
}

// src/react/components/marquee-zoom.tsx
var import_react5 = require("react");

// ../plugin-interaction-manager/dist/react/index.js
var import_preact4 = require("preact");
var import_hooks3 = require("preact/hooks");

// ../plugin-interaction-manager/dist/reducer-Dda407Go.js
var M4 = "\xAD";
var H = "\u200B";
var T3 = "\u2060";
var $3 = "\uFEFF";
var R2 = "\uFFFE";
var I2 = "\uFFFF";
var P4 = Object.freeze([
  M4,
  H,
  T3,
  $3,
  R2,
  I2
]);
new RegExp(`[${P4.join("")}]`, "g");
var y3 = Object.freeze([
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
y3.reduce(
  (o, t2) => (o[t2.id] = t2, o),
  {}
);
y3.reduce((o, t2) => (o[t2.css] = t2.id, o), {});
y3.map((o) => ({
  value: o.id,
  label: o.label
}));
var k4 = Object.freeze({
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
  k4
).reduce(
  (o, [t2, e]) => (o[e] = Number(t2), o),
  {}
);
function g2(o, t2, e) {
  if (o === t2)
    return true;
  if (o == null || t2 == null)
    return o === t2;
  const s3 = typeof o;
  if (s3 !== typeof t2) return false;
  if (s3 === "object") {
    e || (e = /* @__PURE__ */ new Set());
    const i2 = O2(o, t2);
    if (e.has(i2))
      return true;
    e.add(i2);
    const r = Array.isArray(o), a2 = Array.isArray(t2);
    return r && a2 ? N4(o, t2, e) : !r && !a2 ? U3(o, t2, e) : false;
  }
  return false;
}
function O2(o, t2) {
  return `${C3(o)}__${C3(t2)}`;
}
var F4 = 0;
var b = /* @__PURE__ */ new WeakMap();
function C3(o) {
  return b.has(o) || b.set(o, ++F4), b.get(o);
}
function N4(o, t2, e) {
  if (o.length !== t2.length) return false;
  const s3 = new Array(t2.length).fill(false);
  t: for (let i2 = 0; i2 < o.length; i2++) {
    const r = o[i2];
    for (let a2 = 0; a2 < t2.length; a2++)
      if (!s3[a2] && g2(r, t2[a2], e)) {
        s3[a2] = true;
        continue t;
      }
    return false;
  }
  return true;
}
function U3(o, t2, e) {
  const s3 = Object.keys(o).sort(), i2 = Object.keys(t2).sort();
  if (s3.length !== i2.length) return false;
  for (let r = 0; r < s3.length; r++)
    if (s3[r] !== i2[r]) return false;
  for (const r of s3) {
    const a2 = o[r], n = t2[r];
    if (!g2(a2, n, e))
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
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((s3, i2, r) => {
      this.onStoreUpdated(r, i2);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((s3, i2, r) => {
      this.onCoreStoreUpdated(r, i2);
    }), this.readyPromise = new Promise((s3) => {
      this.readyResolve = s3;
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
    const s3 = Date.now(), i2 = this.debouncedActions[t2.type] || 0;
    return s3 - i2 >= e ? (this.debouncedActions[t2.type] = s3, this.dispatch(t2), true) : false;
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
    this.handler = t2, this.options = e, this.lastRun = 0, this.handle = (s3) => {
      this.options.mode === "debounce" ? this.debounce(s3) : this.throttle(s3);
    };
  }
  debounce(t2) {
    this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(() => {
      this.handler(t2), this.timeoutId = void 0;
    }, this.options.wait);
  }
  throttle(t2) {
    if (this.options.mode === "debounce") return;
    const e = Date.now(), s3 = this.options.throttleMode || "leading-trailing";
    e - this.lastRun >= this.options.wait && (s3 === "leading-trailing" && this.handler(t2), this.lastRun = e), this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(
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
  const e = /* @__PURE__ */ new Set(), s3 = /* @__PURE__ */ new Map();
  let i2 = o;
  const r = (n) => e.forEach((c) => c(n)), a2 = (n, c) => {
    let u2 = n, h3 = () => {
    };
    if (c) {
      const l3 = new x3(n, c);
      u2 = l3.handle, h3 = () => l3.destroy(), s3.set(n, { wrapped: u2, destroy: h3 });
    }
    return i2 !== void 0 && u2(i2), e.add(u2), () => {
      e.delete(u2), h3(), s3.delete(n);
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
    on: a2,
    off(n) {
      const c = s3.get(n);
      c ? (e.delete(c.wrapped), c.destroy(), s3.delete(n)) : e.delete(n);
    },
    clear() {
      e.clear(), s3.forEach((n) => n.destroy()), s3.clear();
    },
    /* derived hook --------------------------------------------- */
    select(n, c = g2) {
      return (u2, h3) => {
        let l3;
        if (i2 !== void 0) {
          const d3 = n(i2);
          l3 = d3, u2(d3);
        }
        return a2(
          (d3) => {
            const f4 = n(d3);
            (l3 === void 0 || !c(l3, f4)) && (l3 = f4, u2(f4));
          },
          h3
        );
      };
    }
  };
}
var v4 = "INTERACTION/ACTIVATE_MODE";
var m2 = "INTERACTION/PAUSE";
var E3 = "INTERACTION/RESUME";
var A2 = "INTERACTION/SET_CURSOR";
var j = (o) => ({
  type: v4,
  payload: { mode: o }
});
var z4 = (o) => ({
  type: A2,
  payload: { cursor: o }
});
var G3 = () => ({
  type: m2
});
var L4 = () => ({
  type: E3
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
  for (const s3 of t2)
    e[s3] = (i2, r, a2) => {
      var n;
      for (const c of o) (n = c[s3]) == null || n.call(c, i2, r, a2);
    };
  return e;
}
var S3 = class S4 extends _3 {
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
      setCursor: (t2, e, s3 = 0) => this.setCursor(t2, e, s3),
      removeCursor: (t2) => this.removeCursor(t2),
      getCurrentCursor: () => this.state.cursor,
      getHandlersForScope: (t2) => this.getHandlersForScope(t2),
      activeModeIsExclusive: () => this.activeModeIsExclusive(),
      pause: () => this.dispatch(G3()),
      resume: () => this.dispatch(L4()),
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
        var a2;
        (a2 = r.onHandlerActiveStart) == null || a2.call(r, t2);
      });
    });
    const e = this.modes.get(t2);
    if (!e) return;
    const s3 = this.buckets.get(t2);
    s3 && (e.scope === "global" && s3.global.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveStart) == null || r.call(i2, t2);
    }), e.scope === "page" && s3.page.forEach((i2, r) => {
      i2.forEach((a2) => {
        var n;
        (n = a2.onHandlerActiveStart) == null || n.call(a2, t2);
      });
    }));
  }
  notifyHandlersInactive(t2) {
    this.alwaysGlobal.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveEnd) == null || r.call(i2, t2);
    }), this.alwaysPage.forEach((i2) => {
      i2.forEach((r) => {
        var a2;
        (a2 = r.onHandlerActiveEnd) == null || a2.call(r, t2);
      });
    });
    const e = this.modes.get(t2);
    if (!e) return;
    const s3 = this.buckets.get(t2);
    s3 && (e.scope === "global" && s3.global.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveEnd) == null || r.call(i2, t2);
    }), e.scope === "page" && s3.page.forEach((i2, r) => {
      i2.forEach((a2) => {
        var n;
        (n = a2.onHandlerActiveEnd) == null || n.call(a2, t2);
      });
    }));
  }
  registerMode(t2) {
    this.modes.set(t2.id, t2), this.buckets.has(t2.id) || this.buckets.set(t2.id, { global: /* @__PURE__ */ new Set(), page: /* @__PURE__ */ new Map() });
  }
  /** ---------- pointer-handler handling ------------ */
  registerHandlers({ modeId: t2, handlers: e, pageIndex: s3 }) {
    const i2 = Array.isArray(t2) ? t2 : [t2], r = [];
    for (const a2 of i2) {
      const n = this.buckets.get(a2);
      if (!n) throw new Error(`unknown mode '${a2}'`);
      if (s3 == null)
        n.global.add(e);
      else {
        const c = n.page.get(s3) ?? /* @__PURE__ */ new Set();
        c.add(e), n.page.set(s3, c);
      }
      r.push(() => {
        if (s3 == null)
          n.global.delete(e);
        else {
          const c = n.page.get(s3);
          c && (c.delete(e), c.size === 0 && n.page.delete(s3));
        }
      });
    }
    return this.onHandlerChange$.emit({ ...this.state }), () => {
      r.forEach((a2) => a2()), this.onHandlerChange$.emit({ ...this.state });
    };
  }
  registerAlways({ scope: t2, handlers: e }) {
    if (t2.type === "global")
      return this.alwaysGlobal.add(e), this.onHandlerChange$.emit({ ...this.state }), () => this.alwaysGlobal.delete(e);
    const s3 = this.alwaysPage.get(t2.pageIndex) ?? /* @__PURE__ */ new Set();
    return s3.add(e), this.alwaysPage.set(t2.pageIndex, s3), this.onHandlerChange$.emit({ ...this.state }), () => {
      s3.delete(e), this.onHandlerChange$.emit({ ...this.state });
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
    const s3 = this.buckets.get(e.id);
    if (!s3) return null;
    const i2 = (n, c) => n.size || c.size ? V2([...n, ...c]) : null;
    if (t2.type === "global") {
      const n = e.scope === "global" ? s3.global : /* @__PURE__ */ new Set();
      return i2(this.alwaysGlobal, n);
    }
    const r = this.alwaysPage.get(t2.pageIndex) ?? /* @__PURE__ */ new Set(), a2 = e.scope === "page" ? s3.page.get(t2.pageIndex) ?? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set();
    return i2(r, a2);
  }
  /** ---------- cursor handling --------------------- */
  setCursor(t2, e, s3 = 0) {
    this.cursorClaims.set(t2, { cursor: e, priority: s3 }), this.emitCursor();
  }
  removeCursor(t2) {
    this.cursorClaims.delete(t2), this.emitCursor();
  }
  emitCursor() {
    var e;
    const t2 = [...this.cursorClaims.values()].sort((s3, i2) => i2.priority - s3.priority)[0] ?? {
      cursor: ((e = this.modes.get(this.state.activeMode)) == null ? void 0 : e.cursor) ?? "auto"
    };
    t2.cursor !== this.state.cursor && (this.dispatch(z4(t2.cursor)), this.onCursorChange$.emit(t2.cursor));
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

// ../plugin-interaction-manager/dist/jsxRuntime.module-D89ud_rY.js
var import_preact3 = require("preact");

// ../plugin-interaction-manager/dist/index-Q-vI1_iw.js
var C4 = "\xAD";
var M5 = "\u200B";
var E4 = "\u2060";
var O3 = "\uFEFF";
var w4 = "\uFFFE";
var H2 = "\uFFFF";
var L5 = Object.freeze([
  C4,
  M5,
  E4,
  O3,
  w4,
  H2
]);
new RegExp(`[${L5.join("")}]`, "g");
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
var N5 = Object.freeze({
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
  N5
).reduce(
  (e, [r, o]) => (e[o] = Number(r), e),
  {}
);

// ../plugin-interaction-manager/dist/react/index.js
function ae2(e, n) {
  for (var t2 in n) e[t2] = n[t2];
  return e;
}
function E5(e, n) {
  for (var t2 in e) if (t2 !== "__source" && !(t2 in n)) return true;
  for (var r in n) if (r !== "__source" && e[r] !== n[r]) return true;
  return false;
}
function O4(e, n) {
  this.props = e, this.context = n;
}
(O4.prototype = new import_preact4.Component()).isPureReactComponent = true, O4.prototype.shouldComponentUpdate = function(e, n) {
  return E5(this.props, e) || E5(this.state, n);
};
var S5 = import_preact4.options.__b;
import_preact4.options.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), S5 && S5(e);
};
var ce = import_preact4.options.__e;
import_preact4.options.__e = function(e, n, t2, r) {
  if (e.then) {
    for (var o, _4 = n; _4 = _4.__; ) if ((o = _4.__c) && o.__c) return n.__e == null && (n.__e = t2.__e, n.__k = t2.__k), o.__c(e, n);
  }
  ce(e, n, t2, r);
};
var I3 = import_preact4.options.unmount;
function X3(e, n, t2) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), e.__c.__H = null), (e = ae2({}, e)).__c != null && (e.__c.__P === t2 && (e.__c.__P = n), e.__c.__e = true, e.__c = null), e.__k = e.__k && e.__k.map(function(r) {
    return X3(r, n, t2);
  })), e;
}
function q2(e, n, t2) {
  return e && t2 && (e.__v = null, e.__k = e.__k && e.__k.map(function(r) {
    return q2(r, n, t2);
  }), e.__c && e.__c.__P === n && (e.__e && t2.appendChild(e.__e), e.__c.__e = true, e.__c.__P = t2)), e;
}
function b3() {
  this.__u = 0, this.o = null, this.__b = null;
}
function J3(e) {
  var n = e.__.__c;
  return n && n.__a && n.__a(e);
}
function v5() {
  this.i = null, this.l = null;
}
import_preact4.options.unmount = function(e) {
  var n = e.__c;
  n && n.__R && n.__R(), n && 32 & e.__u && (e.type = null), I3 && I3(e);
}, (b3.prototype = new import_preact4.Component()).__c = function(e, n) {
  var t2 = n.__c, r = this;
  r.o == null && (r.o = []), r.o.push(t2);
  var o = J3(r.__v), _4 = false, u2 = function() {
    _4 || (_4 = true, t2.__R = null, o ? o(a2) : a2());
  };
  t2.__R = u2;
  var a2 = function() {
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
}, b3.prototype.componentWillUnmount = function() {
  this.o = [];
}, b3.prototype.render = function(e, n) {
  if (this.__b) {
    if (this.__v.__k) {
      var t2 = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = X3(this.__b, t2, r.__O = r.__P);
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
(v5.prototype = new import_preact4.Component()).__a = function(e) {
  var n = this, t2 = J3(n.__v), r = n.l.get(e);
  return r[0]++, function(o) {
    var _4 = function() {
      n.props.revealOrder ? (r.push(o), R3(n, e, r)) : o();
    };
    t2 ? t2(_4) : _4();
  };
}, v5.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var n = (0, import_preact4.toChildArray)(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && n.reverse();
  for (var t2 = n.length; t2--; ) this.l.set(n[t2], this.i = [1, 0, this.i]);
  return e.children;
}, v5.prototype.componentDidUpdate = v5.prototype.componentDidMount = function() {
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
var $4 = import_preact4.options.event;
function ye() {
}
function me() {
  return this.cancelBubble;
}
function ge() {
  return this.defaultPrevented;
}
import_preact4.options.event = function(e) {
  return $4 && (e = $4(e)), e.persist = ye, e.isPropagationStopped = me, e.isDefaultPrevented = ge, e.nativeEvent = e;
};
var be = { enumerable: false, configurable: true, get: function() {
  return this.class;
} };
var N6 = import_preact4.options.vnode;
import_preact4.options.vnode = function(e) {
  typeof e.type == "string" && function(n) {
    var t2 = n.props, r = n.type, o = {}, _4 = r.indexOf("-") === -1;
    for (var u2 in t2) {
      var a2 = t2[u2];
      if (!(u2 === "value" && "defaultValue" in t2 && a2 == null || de && u2 === "children" && r === "noscript" || u2 === "class" || u2 === "className")) {
        var i2 = u2.toLowerCase();
        u2 === "defaultValue" && "value" in t2 && t2.value == null ? u2 = "value" : u2 === "download" && a2 === true ? a2 = "" : i2 === "translate" && a2 === "no" ? a2 = false : i2[0] === "o" && i2[1] === "n" ? i2 === "ondoubleclick" ? u2 = "ondblclick" : i2 !== "onchange" || r !== "input" && r !== "textarea" || he(t2.type) ? i2 === "onfocus" ? u2 = "onfocusin" : i2 === "onblur" ? u2 = "onfocusout" : pe.test(u2) && (u2 = i2) : i2 = u2 = "oninput" : _4 && fe.test(u2) ? u2 = u2.replace(ve, "-$&").toLowerCase() : a2 === null && (a2 = void 0), i2 === "oninput" && o[u2 = i2] && (u2 = "oninputCapture"), o[u2] = a2;
      }
    }
    r == "select" && o.multiple && Array.isArray(o.value) && (o.value = (0, import_preact4.toChildArray)(t2.children).forEach(function(c) {
      c.props.selected = o.value.indexOf(c.props.value) != -1;
    })), r == "select" && o.defaultValue != null && (o.value = (0, import_preact4.toChildArray)(t2.children).forEach(function(c) {
      c.props.selected = o.multiple ? o.defaultValue.indexOf(c.props.value) != -1 : o.defaultValue == c.props.value;
    })), t2.class && !t2.className ? (o.class = t2.class, Object.defineProperty(o, "className", be)) : (t2.className && !t2.class || t2.class && t2.className) && (o.class = o.className = t2.className), n.props = o;
  }(e), e.$$typeof = se, N6 && N6(e);
};
var U4 = import_preact4.options.__r;
import_preact4.options.__r = function(e) {
  U4 && U4(e), e.__c;
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
  const e = (0, import_hooks3.useContext)(Pe);
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
function M6(e, n) {
  for (var t2 in e) if (t2 !== "__source" && !(t2 in n)) return true;
  for (var r in n) if (r !== "__source" && e[r] !== n[r]) return true;
  return false;
}
function V3(e, n) {
  this.props = e, this.context = n;
}
(V3.prototype = new import_preact4.Component()).isPureReactComponent = true, V3.prototype.shouldComponentUpdate = function(e, n) {
  return M6(this.props, e) || M6(this.state, n);
};
var L6 = import_preact4.options.__b;
import_preact4.options.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), L6 && L6(e);
};
var xe = import_preact4.options.__e;
import_preact4.options.__e = function(e, n, t2, r) {
  if (e.then) {
    for (var o, _4 = n; _4 = _4.__; ) if ((o = _4.__c) && o.__c) return n.__e == null && (n.__e = t2.__e, n.__k = t2.__k), o.__c(e, n);
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
function P5() {
  this.__u = 0, this.o = null, this.__b = null;
}
function ee3(e) {
  var n = e.__.__c;
  return n && n.__a && n.__a(e);
}
function d2() {
  this.i = null, this.l = null;
}
import_preact4.options.unmount = function(e) {
  var n = e.__c;
  n && n.__R && n.__R(), n && 32 & e.__u && (e.type = null), H3 && H3(e);
}, (P5.prototype = new import_preact4.Component()).__c = function(e, n) {
  var t2 = n.__c, r = this;
  r.o == null && (r.o = []), r.o.push(t2);
  var o = ee3(r.__v), _4 = false, u2 = function() {
    _4 || (_4 = true, t2.__R = null, o ? o(a2) : a2());
  };
  t2.__R = u2;
  var a2 = function() {
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
}, P5.prototype.componentWillUnmount = function() {
  this.o = [];
}, P5.prototype.render = function(e, n) {
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
(d2.prototype = new import_preact4.Component()).__a = function(e) {
  var n = this, t2 = ee3(n.__v), r = n.l.get(e);
  return r[0]++, function(o) {
    var _4 = function() {
      n.props.revealOrder ? (r.push(o), W2(n, e, r)) : o();
    };
    t2 ? t2(_4) : _4();
  };
}, d2.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var n = (0, import_preact4.toChildArray)(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && n.reverse();
  for (var t2 = n.length; t2--; ) this.l.set(n[t2], this.i = [1, 0, this.i]);
  return e.children;
}, d2.prototype.componentDidUpdate = d2.prototype.componentDidMount = function() {
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
var z5 = import_preact4.options.event;
function Ne() {
}
function Ue() {
  return this.cancelBubble;
}
function Ae() {
  return this.defaultPrevented;
}
import_preact4.options.event = function(e) {
  return z5 && (e = z5(e)), e.persist = Ne, e.isPropagationStopped = Ue, e.isDefaultPrevented = Ae, e.nativeEvent = e;
};
var Me = { enumerable: false, configurable: true, get: function() {
  return this.class;
} };
var D3 = import_preact4.options.vnode;
import_preact4.options.vnode = function(e) {
  typeof e.type == "string" && function(n) {
    var t2 = n.props, r = n.type, o = {}, _4 = r.indexOf("-") === -1;
    for (var u2 in t2) {
      var a2 = t2[u2];
      if (!(u2 === "value" && "defaultValue" in t2 && a2 == null || Re && u2 === "children" && r === "noscript" || u2 === "class" || u2 === "className")) {
        var i2 = u2.toLowerCase();
        u2 === "defaultValue" && "value" in t2 && t2.value == null ? u2 = "value" : u2 === "download" && a2 === true ? a2 = "" : i2 === "translate" && a2 === "no" ? a2 = false : i2[0] === "o" && i2[1] === "n" ? i2 === "ondoubleclick" ? u2 = "ondblclick" : i2 !== "onchange" || r !== "input" && r !== "textarea" || $e(t2.type) ? i2 === "onfocus" ? u2 = "onfocusin" : i2 === "onblur" ? u2 = "onfocusout" : Se.test(u2) && (u2 = i2) : i2 = u2 = "oninput" : _4 && Oe.test(u2) ? u2 = u2.replace(Ie, "-$&").toLowerCase() : a2 === null && (a2 = void 0), i2 === "oninput" && o[u2 = i2] && (u2 = "oninputCapture"), o[u2] = a2;
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
var B4 = import_preact4.options.diffed;
import_preact4.options.diffed = function(e) {
  B4 && B4(e);
  var n = e.props, t2 = e.__e;
  t2 != null && e.type === "textarea" && "value" in n && n.value !== t2.value && (t2.value = n.value == null ? "" : n.value);
};
var p3 = () => Ce(w3.id);
function Te({ modeId: e, pageIndex: n }) {
  const { provides: t2 } = p3();
  return {
    register: (r, o) => {
      const _4 = (o == null ? void 0 : o.modeId) ?? e, u2 = (o == null ? void 0 : o.pageIndex) ?? n;
      return _4 ? t2 == null ? void 0 : t2.registerHandlers({
        modeId: _4,
        handlers: r,
        pageIndex: u2
      }) : t2 == null ? void 0 : t2.registerAlways({
        scope: u2 !== void 0 ? { type: "page", pageIndex: u2 } : { type: "global" },
        handlers: r
      });
    }
  };
}

// src/react/components/marquee-zoom.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var MarqueeZoom = ({
  pageIndex,
  scale,
  pageWidth,
  pageHeight,
  className,
  stroke = "rgba(33,150,243,0.8)",
  fill = "rgba(33,150,243,0.15)"
}) => {
  const { provides: zoom } = useZoomCapability();
  const { register } = Te({ modeId: "marqueeZoom", pageIndex });
  const clamp = (v6, min, max) => Math.max(min, Math.min(max, v6));
  const startRef = (0, import_react5.useRef)(null);
  const [rect, setRect] = (0, import_react5.useState)(null);
  const pageWidthPDF = pageWidth / scale;
  const pageHeightPDF = pageHeight / scale;
  const handlers = (0, import_react5.useMemo)(
    () => ({
      onPointerDown: (pos, evt) => {
        startRef.current = pos;
        setRect({ origin: { x: pos.x, y: pos.y }, size: { width: 0, height: 0 } });
        evt.target?.setPointerCapture?.(evt.pointerId);
      },
      onPointerMove: (pos) => {
        if (!startRef.current) return;
        const curX = clamp(pos.x, 0, pageWidthPDF);
        const curY = clamp(pos.y, 0, pageHeightPDF);
        const { x: sx, y: sy } = startRef.current;
        const left = Math.min(sx, curX);
        const top = Math.min(sy, curY);
        const width = Math.abs(curX - sx);
        const height = Math.abs(curY - sy);
        setRect({ origin: { x: left, y: top }, size: { width, height } });
      },
      onPointerUp: (_4, evt) => {
        if (rect && zoom) {
          const dragPx = Math.max(rect.size.width, rect.size.height) * scale;
          if (dragPx > 5) {
            zoom.zoomToArea(pageIndex, rect);
          } else {
            zoom.zoomIn();
          }
        }
        startRef.current = null;
        setRect(null);
        evt.target?.releasePointerCapture?.(evt.pointerId);
      },
      onPointerCancel: (_4, evt) => {
        startRef.current = null;
        setRect(null);
        evt.target?.releasePointerCapture?.(evt.pointerId);
      }
    }),
    [pageWidthPDF, pageWidthPDF, zoom, scale, rect, pageIndex]
  );
  (0, import_react5.useEffect)(() => {
    if (!register) return;
    return register(handlers);
  }, [register, handlers]);
  if (!rect) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "div",
    {
      style: {
        position: "absolute",
        pointerEvents: "none",
        // ignore hits – underlying page still gets events
        left: rect.origin.x * scale,
        top: rect.origin.y * scale,
        width: rect.size.width * scale,
        height: rect.size.height * scale,
        border: `1px solid ${stroke}`,
        background: fill,
        boxSizing: "border-box"
      },
      className
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MarqueeZoom,
  PinchWrapper,
  usePinch,
  useZoom,
  useZoomCapability,
  useZoomPlugin
});
//# sourceMappingURL=index.cjs.map