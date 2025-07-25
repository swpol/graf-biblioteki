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
  ThumbImg: () => ThumbImg,
  ThumbnailsPane: () => ThumbnailsPane,
  useThumbnailCapability: () => useThumbnailCapability,
  useThumbnailPlugin: () => useThumbnailPlugin
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
    for (var n, u = r; u = u.__; ) if ((n = u.__c) && n.__c) return r.__e == null && (r.__e = t2.__e, r.__k = t2.__k), n.__c(e, r);
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
  var n = A(o.__v), u = false, i2 = function() {
    u || (u = true, t2.__R = null, n ? n(l) : l());
  };
  t2.__R = i2;
  var l = function() {
    if (!--o.__u) {
      if (o.state.__a) {
        var a = o.state.__a;
        o.__v.__k[0] = z2(a, a.__c.__P, a.__c.__O);
      }
      var _3;
      for (o.setState({ __a: o.__b = null }); _3 = o.o.pop(); ) _3.forceUpdate();
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
    var u = function() {
      r.props.revealOrder ? (o.push(n), R(r, e, o)) : n();
    };
    t2 ? t2(u) : u();
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
    var t2 = r.props, o = r.type, n = {}, u = o.indexOf("-") === -1;
    for (var i2 in t2) {
      var l = t2[i2];
      if (!(i2 === "value" && "defaultValue" in t2 && l == null || G && i2 === "children" && o === "noscript" || i2 === "class" || i2 === "className")) {
        var a = i2.toLowerCase();
        i2 === "defaultValue" && "value" in t2 && t2.value == null ? i2 = "value" : i2 === "download" && l === true ? l = "" : a === "translate" && l === "no" ? l = false : a[0] === "o" && a[1] === "n" ? a === "ondoubleclick" ? i2 = "ondblclick" : a !== "onchange" || o !== "input" && o !== "textarea" || J(t2.type) ? a === "onfocus" ? i2 = "onfocusin" : a === "onblur" ? i2 = "onfocusout" : I.test(i2) && (i2 = a) : a = i2 = "oninput" : u && q.test(i2) ? i2 = i2.replace(Z, "-$&").toLowerCase() : l === null && (l = void 0), a === "oninput" && n[i2 = a] && (i2 = "oninputCapture"), n[i2] = l;
      }
    }
    o == "select" && n.multiple && Array.isArray(n.value) && (n.value = (0, import_preact2.toChildArray)(t2.children).forEach(function(_3) {
      _3.props.selected = n.value.indexOf(_3.props.value) != -1;
    })), o == "select" && n.defaultValue != null && (n.value = (0, import_preact2.toChildArray)(t2.children).forEach(function(_3) {
      _3.props.selected = n.multiple ? n.defaultValue.indexOf(_3.props.value) != -1 : n.defaultValue == _3.props.value;
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
var f2 = "SET_DOCUMENT";
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
    const a = Array.isArray(i2), o = Array.isArray(e);
    return a && o ? U2(i2, e, t2) : !a && !o ? B2(i2, e, t2) : false;
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
  e: for (let s2 = 0; s2 < i2.length; s2++) {
    const n = i2[s2];
    for (let a = 0; a < e.length; a++)
      if (!r[a] && v3(n, e[a], t2)) {
        r[a] = true;
        continue e;
      }
    return false;
  }
  return true;
}
function B2(i2, e, t2) {
  const r = Object.keys(i2).sort(), s2 = Object.keys(e).sort();
  if (r.length !== s2.length) return false;
  for (let n = 0; n < r.length; n++)
    if (r[n] !== s2[n]) return false;
  for (const n of r) {
    const a = i2[n], o = e[n];
    if (!v3(a, o, t2))
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
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((i2, s2, c) => {
      this.onStoreUpdated(c, s2);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((i2, s2, c) => {
      this.onCoreStoreUpdated(c, s2);
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
function C2(o, t2 = v3) {
  const e = /* @__PURE__ */ new Set(), i2 = /* @__PURE__ */ new Map();
  let s2 = o;
  const c = (r) => e.forEach((n) => n(r)), p2 = (r, n) => {
    let a = r, d2 = () => {
    };
    if (n) {
      const u2 = new b2(r, n);
      a = u2.handle, d2 = () => u2.destroy(), i2.set(r, { wrapped: a, destroy: d2 });
    }
    return s2 !== void 0 && a(s2), e.add(a), () => {
      e.delete(a), d2(), i2.delete(r);
    };
  };
  return {
    /* emitter behaviour ---------------------------------------- */
    get value() {
      return s2;
    },
    emit(r = void 0) {
      (s2 === void 0 || !t2(s2, r)) && (s2 = r, c(r));
    },
    on: p2,
    off(r) {
      const n = i2.get(r);
      n ? (e.delete(n.wrapped), n.destroy(), i2.delete(r)) : e.delete(r);
    },
    clear() {
      e.clear(), i2.forEach((r) => r.destroy()), i2.clear();
    },
    /* derived hook --------------------------------------------- */
    select(r, n = v3) {
      return (a, d2) => {
        let u2;
        if (s2 !== void 0) {
          const h2 = r(s2);
          u2 = h2, a(h2);
        }
        return p2(
          (h2) => {
            const l2 = r(h2);
            (u2 === void 0 || !n(u2, l2)) && (u2 = l2, a(l2));
          },
          d2
        );
      };
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
var ThumbnailPlugin = class extends w2 {
  constructor(id, registry, cfg) {
    super(id, registry);
    this.cfg = cfg;
    this.thumbs = [];
    this.window = null;
    this.emitWindow = C2();
    this.taskCache = /* @__PURE__ */ new Map();
    this.renderCapability = this.registry.getPlugin("render").provides();
    this.coreStore.onAction(f2, (_action, state) => {
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
    const L22 = this.cfg.labelHeight ?? 16;
    const GAP = this.cfg.gap ?? 8;
    let offset = 0;
    this.thumbs = core.document.pages.map((p2) => {
      const ratio = p2.size.height / p2.size.width;
      const thumbH = Math.round(W2 * ratio);
      const wrapH = thumbH + L22;
      const meta = {
        pageIndex: p2.index,
        width: W2,
        height: thumbH,
        wrapperHeight: wrapH,
        top: offset,
        labelHeight: L22
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
      setViewport: (y2, h2) => this.updateWindow(y2, h2),
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

// src/react/hooks/use-thumbnail.ts
var useThumbnailPlugin = () => ee2(ThumbnailPlugin.id);
var useThumbnailCapability = () => ae(ThumbnailPlugin.id);

// src/react/components/thumbnails-pane.tsx
var import_react2 = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
function ThumbnailsPane({
  style,
  selectedPage,
  scrollOptions = { behavior: "smooth", block: "nearest", inline: "nearest" },
  ...props
}) {
  const { provides: thumbs } = useThumbnailCapability();
  const viewportRef = (0, import_react2.useRef)(null);
  const [window2, setWindow] = (0, import_react2.useState)(null);
  (0, import_react2.useEffect)(() => thumbs?.onWindow(setWindow), [thumbs]);
  (0, import_react2.useEffect)(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const onScroll = () => thumbs?.setViewport(vp.scrollTop, vp.clientHeight);
    vp.addEventListener("scroll", onScroll);
    return () => vp.removeEventListener("scroll", onScroll);
  }, [thumbs]);
  (0, import_react2.useEffect)(() => {
    const vp = viewportRef.current;
    if (!vp || !thumbs) return;
    if (window2?.items.length === 0) {
      thumbs.setViewport(vp.scrollTop, vp.clientHeight);
    }
  }, [window2, thumbs]);
  (0, import_react2.useEffect)(() => {
    if (!selectedPage || !window2) return;
    const item = window2.items.find((it) => it.pageIndex + 1 === selectedPage);
    if (!item) return;
    const vp = viewportRef.current;
    if (!vp) return;
    const margin = 8;
    if (item.top < vp.scrollTop + margin) {
      vp.scrollTo({ top: item.top, ...scrollOptions });
    } else if (item.top + item.wrapperHeight + item.labelHeight > vp.scrollTop + vp.clientHeight - margin) {
      vp.scrollTo({
        top: item.top + item.wrapperHeight + item.labelHeight - vp.clientHeight,
        ...scrollOptions
      });
    }
  }, [selectedPage, window2, scrollOptions]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: viewportRef, style: { overflowY: "auto", position: "relative", ...style }, ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: window2?.totalHeight ?? 0, position: "relative" }, children: window2?.items.map((m2) => props.children(m2)) }) });
}

// src/react/components/thumbnail-img.tsx
var import_react3 = require("react");

// ../models/dist/index.js
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
  (m2, info) => {
    m2[info.id] = info;
    return m2;
  },
  {}
);
var cssToEnum2 = BLEND_MODE_INFOS2.reduce((m2, info) => {
  m2[info.css] = info.id;
  return m2;
}, {});
var blendModeSelectOptions2 = BLEND_MODE_INFOS2.map((info) => ({
  value: info.id,
  label: info.label
}));
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
function ignore2() {
}

// src/react/components/thumbnail-img.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function ThumbImg({ meta, style, ...props }) {
  const { provides: thumbs } = useThumbnailCapability();
  const [url, setUrl] = (0, import_react3.useState)();
  const urlRef = (0, import_react3.useRef)(null);
  (0, import_react3.useEffect)(() => {
    const task = thumbs?.renderThumb(meta.pageIndex, window.devicePixelRatio);
    task?.wait((blob) => {
      const objectUrl = URL.createObjectURL(blob);
      urlRef.current = objectUrl;
      setUrl(objectUrl);
    }, ignore2);
    return () => {
      if (urlRef.current) {
        URL.revokeObjectURL(urlRef.current);
        urlRef.current = null;
      } else {
        task?.abort({
          code: PdfErrorCode.Cancelled,
          message: "canceled render task"
        });
      }
    };
  }, [meta.pageIndex]);
  const handleImageLoad = () => {
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
  };
  return url ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: url, onLoad: handleImageLoad, style, ...props }) : null;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ThumbImg,
  ThumbnailsPane,
  useThumbnailCapability,
  useThumbnailPlugin
});
//# sourceMappingURL=index.cjs.map