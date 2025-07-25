import { Component as p, options as s, createElement as P, Fragment as w, toChildArray as g, createContext as F } from "preact";
import { useState as f, useRef as L, useEffect as h, useContext as W } from "preact/hooks";
import { u as H } from "../jsxRuntime.module-Bzuv3cXw.js";
import { P as $, a as j } from "../math-ChSRQF3r.js";
function B(e, r) {
  for (var t in r) e[t] = r[t];
  return e;
}
function S(e, r) {
  for (var t in e) if (t !== "__source" && !(t in r)) return !0;
  for (var o in r) if (o !== "__source" && e[o] !== r[o]) return !0;
  return !1;
}
function k(e, r) {
  this.props = e, this.context = r;
}
(k.prototype = new p()).isPureReactComponent = !0, k.prototype.shouldComponentUpdate = function(e, r) {
  return S(this.props, e) || S(this.state, r);
};
var C = s.__b;
s.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), C && C(e);
};
var M = s.__e;
s.__e = function(e, r, t, o) {
  if (e.then) {
    for (var n, u = r; u = u.__; ) if ((n = u.__c) && n.__c) return r.__e == null && (r.__e = t.__e, r.__k = t.__k), n.__c(e, r);
  }
  M(e, r, t, o);
};
var E = s.unmount;
function U(e, r, t) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(o) {
    typeof o.__c == "function" && o.__c();
  }), e.__c.__H = null), (e = B({}, e)).__c != null && (e.__c.__P === t && (e.__c.__P = r), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(o) {
    return U(o, r, t);
  })), e;
}
function z(e, r, t) {
  return e && t && (e.__v = null, e.__k = e.__k && e.__k.map(function(o) {
    return z(o, r, t);
  }), e.__c && e.__c.__P === r && (e.__e && t.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = t)), e;
}
function y() {
  this.__u = 0, this.o = null, this.__b = null;
}
function A(e) {
  var r = e.__.__c;
  return r && r.__a && r.__a(e);
}
function v() {
  this.i = null, this.l = null;
}
s.unmount = function(e) {
  var r = e.__c;
  r && r.__R && r.__R(), r && 32 & e.__u && (e.type = null), E && E(e);
}, (y.prototype = new p()).__c = function(e, r) {
  var t = r.__c, o = this;
  o.o == null && (o.o = []), o.o.push(t);
  var n = A(o.__v), u = !1, i = function() {
    u || (u = !0, t.__R = null, n ? n(l) : l());
  };
  t.__R = i;
  var l = function() {
    if (!--o.__u) {
      if (o.state.__a) {
        var a = o.state.__a;
        o.__v.__k[0] = z(a, a.__c.__P, a.__c.__O);
      }
      var _;
      for (o.setState({ __a: o.__b = null }); _ = o.o.pop(); ) _.forceUpdate();
    }
  };
  o.__u++ || 32 & r.__u || o.setState({ __a: o.__b = o.__v.__k[0] }), e.then(i, i);
}, y.prototype.componentWillUnmount = function() {
  this.o = [];
}, y.prototype.render = function(e, r) {
  if (this.__b) {
    if (this.__v.__k) {
      var t = document.createElement("div"), o = this.__v.__k[0].__c;
      this.__v.__k[0] = U(this.__b, t, o.__O = o.__P);
    }
    this.__b = null;
  }
  var n = r.__a && P(w, null, e.fallback);
  return n && (n.__u &= -33), [P(w, null, r.__a ? null : e.children), n];
};
var R = function(e, r, t) {
  if (++t[1] === t[0] && e.l.delete(r), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (t = e.i; t; ) {
    for (; t.length > 3; ) t.pop()();
    if (t[1] < t[0]) break;
    e.i = t = t[2];
  }
};
(v.prototype = new p()).__a = function(e) {
  var r = this, t = A(r.__v), o = r.l.get(e);
  return o[0]++, function(n) {
    var u = function() {
      r.props.revealOrder ? (o.push(n), R(r, e, o)) : n();
    };
    t ? t(u) : u();
  };
}, v.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var r = g(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && r.reverse();
  for (var t = r.length; t--; ) this.l.set(r[t], this.i = [1, 0, this.i]);
  return e.children;
}, v.prototype.componentDidUpdate = v.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(r, t) {
    R(e, t, r);
  });
};
var T = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, q = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, I = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Z = /[A-Z0-9]/g, G = typeof document < "u", J = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
p.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(p.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(r) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: r });
  } });
});
var x = s.event;
function K() {
}
function Q() {
  return this.cancelBubble;
}
function X() {
  return this.defaultPrevented;
}
s.event = function(e) {
  return x && (e = x(e)), e.persist = K, e.isPropagationStopped = Q, e.isDefaultPrevented = X, e.nativeEvent = e;
};
var Y = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, O = s.vnode;
s.vnode = function(e) {
  typeof e.type == "string" && function(r) {
    var t = r.props, o = r.type, n = {}, u = o.indexOf("-") === -1;
    for (var i in t) {
      var l = t[i];
      if (!(i === "value" && "defaultValue" in t && l == null || G && i === "children" && o === "noscript" || i === "class" || i === "className")) {
        var a = i.toLowerCase();
        i === "defaultValue" && "value" in t && t.value == null ? i = "value" : i === "download" && l === !0 ? l = "" : a === "translate" && l === "no" ? l = !1 : a[0] === "o" && a[1] === "n" ? a === "ondoubleclick" ? i = "ondblclick" : a !== "onchange" || o !== "input" && o !== "textarea" || J(t.type) ? a === "onfocus" ? i = "onfocusin" : a === "onblur" ? i = "onfocusout" : I.test(i) && (i = a) : a = i = "oninput" : u && q.test(i) ? i = i.replace(Z, "-$&").toLowerCase() : l === null && (l = void 0), a === "oninput" && n[i = a] && (i = "oninputCapture"), n[i] = l;
      }
    }
    o == "select" && n.multiple && Array.isArray(n.value) && (n.value = g(t.children).forEach(function(_) {
      _.props.selected = n.value.indexOf(_.props.value) != -1;
    })), o == "select" && n.defaultValue != null && (n.value = g(t.children).forEach(function(_) {
      _.props.selected = n.multiple ? n.defaultValue.indexOf(_.props.value) != -1 : n.defaultValue == _.props.value;
    })), t.class && !t.className ? (n.class = t.class, Object.defineProperty(n, "className", Y)) : (t.className && !t.class || t.class && t.className) && (n.class = n.className = t.className), r.props = n;
  }(e), e.$$typeof = T, O && O(e);
};
var D = s.__r;
s.__r = function(e) {
  D && D(e), e.__c;
};
var N = s.diffed;
s.diffed = function(e) {
  N && N(e);
  var r = e.props, t = e.__e;
  t != null && e.type === "textarea" && "value" in r && r.value !== t.value && (t.value = r.value == null ? "" : r.value);
};
const V = F({
  registry: null,
  isInitializing: !0,
  pluginsReady: !1
});
function ue({ engine: e, onInitialized: r, plugins: t, children: o }) {
  const [n, u] = f(null), [i, l] = f(!0), [a, _] = f(!1), d = L(r);
  return h(() => {
    d.current = r;
  }, [r]), h(() => {
    const c = new $(e);
    return c.registerPluginBatch(t), (async () => {
      var b;
      await c.initialize(), !c.isDestroyed() && (await ((b = d.current) == null ? void 0 : b.call(d, c)), !c.isDestroyed() && (c.pluginsReady().then(() => {
        c.isDestroyed() || _(!0);
      }), u(c), l(!1)));
    })().catch(console.error), () => {
      c.destroy(), u(null), l(!0), _(!1);
    };
  }, [e, t]), /* @__PURE__ */ H(V.Provider, { value: { registry: n, isInitializing: i, pluginsReady: a }, children: typeof o == "function" ? o({ registry: n, isInitializing: i, pluginsReady: a }) : o });
}
function m() {
  const e = W(V);
  if (e === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: r, isInitializing: t } = e;
  if (t)
    return e;
  if (r === null)
    throw new Error("PDF registry failed to initialize properly");
  return e;
}
function ee(e) {
  const { registry: r } = m();
  if (r === null)
    return {
      plugin: null,
      isLoading: !0,
      ready: new Promise(() => {
      })
    };
  const t = r.getPlugin(e);
  if (!t)
    throw new Error(`Plugin ${e} not found`);
  return {
    plugin: t,
    isLoading: !1,
    ready: t.ready()
  };
}
function ae(e) {
  const { plugin: r, isLoading: t, ready: o } = ee(e);
  if (!r)
    return {
      provides: null,
      isLoading: t,
      ready: o
    };
  if (!r.provides)
    throw new Error(`Plugin ${e} does not provide a capability`);
  return {
    provides: r.provides(),
    isLoading: t,
    ready: o
  };
}
function le() {
  const { registry: e } = m(), [r, t] = f(null);
  return h(() => {
    if (!e) return;
    t(e.getStore().getState());
    const o = e.getStore().subscribe((n, u) => {
      t(u);
    });
    return () => o();
  }, [e]), r;
}
function se() {
  const { registry: e } = m(), [r, t] = f(null);
  return h(() => {
    if (!e) return;
    const o = e.getStore();
    t(o.getState().core);
    const n = o.subscribe((u, i, l) => {
      o.isCoreAction(u) && !j(i.core, l.core) && t(i.core);
    });
    return () => n();
  }, [e]), r;
}
export {
  ue as EmbedPDF,
  V as PDFContext,
  ae as useCapability,
  se as useCoreState,
  ee as usePlugin,
  m as useRegistry,
  le as useStoreState
};
//# sourceMappingURL=index.js.map
