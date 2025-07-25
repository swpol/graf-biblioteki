import { Component as c, options as _, createElement as v, Fragment as h, toChildArray as d, createContext as U } from "preact";
import { useContext as L } from "preact/hooks";
import { R as E } from "../rotate-plugin-BYCSul3M.js";
import { u as $ } from "../jsxRuntime.module-D89ud_rY.js";
function A(e, t) {
  for (var r in t) e[r] = t[r];
  return e;
}
function m(e, t) {
  for (var r in e) if (r !== "__source" && !(r in t)) return !0;
  for (var o in t) if (o !== "__source" && e[o] !== t[o]) return !0;
  return !1;
}
function y(e, t) {
  this.props = e, this.context = t;
}
(y.prototype = new c()).isPureReactComponent = !0, y.prototype.shouldComponentUpdate = function(e, t) {
  return m(this.props, e) || m(this.state, t);
};
var g = _.__b;
_.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), g && g(e);
};
var F = _.__e;
_.__e = function(e, t, r, o) {
  if (e.then) {
    for (var n, a = t; a = a.__; ) if ((n = a.__c) && n.__c) return t.__e == null && (t.__e = r.__e, t.__k = r.__k), n.__c(e, t);
  }
  F(e, t, r, o);
};
var b = _.unmount;
function O(e, t, r) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(o) {
    typeof o.__c == "function" && o.__c();
  }), e.__c.__H = null), (e = A({}, e)).__c != null && (e.__c.__P === r && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(o) {
    return O(o, t, r);
  })), e;
}
function R(e, t, r) {
  return e && r && (e.__v = null, e.__k = e.__k && e.__k.map(function(o) {
    return R(o, t, r);
  }), e.__c && e.__c.__P === t && (e.__e && r.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = r)), e;
}
function p() {
  this.__u = 0, this.o = null, this.__b = null;
}
function N(e) {
  var t = e.__.__c;
  return t && t.__a && t.__a(e);
}
function f() {
  this.i = null, this.l = null;
}
_.unmount = function(e) {
  var t = e.__c;
  t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), b && b(e);
}, (p.prototype = new c()).__c = function(e, t) {
  var r = t.__c, o = this;
  o.o == null && (o.o = []), o.o.push(r);
  var n = N(o.__v), a = !1, i = function() {
    a || (a = !0, r.__R = null, n ? n(l) : l());
  };
  r.__R = i;
  var l = function() {
    if (!--o.__u) {
      if (o.state.__a) {
        var u = o.state.__a;
        o.__v.__k[0] = R(u, u.__c.__P, u.__c.__O);
      }
      var s;
      for (o.setState({ __a: o.__b = null }); s = o.o.pop(); ) s.forceUpdate();
    }
  };
  o.__u++ || 32 & t.__u || o.setState({ __a: o.__b = o.__v.__k[0] }), e.then(i, i);
}, p.prototype.componentWillUnmount = function() {
  this.o = [];
}, p.prototype.render = function(e, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var r = document.createElement("div"), o = this.__v.__k[0].__c;
      this.__v.__k[0] = O(this.__b, r, o.__O = o.__P);
    }
    this.__b = null;
  }
  var n = t.__a && v(h, null, e.fallback);
  return n && (n.__u &= -33), [v(h, null, t.__a ? null : e.children), n];
};
var P = function(e, t, r) {
  if (++r[1] === r[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (r = e.i; r; ) {
    for (; r.length > 3; ) r.pop()();
    if (r[1] < r[0]) break;
    e.i = r = r[2];
  }
};
(f.prototype = new c()).__a = function(e) {
  var t = this, r = N(t.__v), o = t.l.get(e);
  return o[0]++, function(n) {
    var a = function() {
      t.props.revealOrder ? (o.push(n), P(t, e, o)) : n();
    };
    r ? r(a) : a();
  };
}, f.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var t = d(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
  for (var r = t.length; r--; ) this.l.set(t[r], this.i = [1, 0, this.i]);
  return e.children;
}, f.prototype.componentDidUpdate = f.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(t, r) {
    P(e, r, t);
  });
};
var V = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, W = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, D = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, H = /[A-Z0-9]/g, j = typeof document < "u", z = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
c.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(c.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(t) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
  } });
});
var w = _.event;
function M() {
}
function B() {
  return this.cancelBubble;
}
function I() {
  return this.defaultPrevented;
}
_.event = function(e) {
  return w && (e = w(e)), e.persist = M, e.isPropagationStopped = B, e.isDefaultPrevented = I, e.nativeEvent = e;
};
var T = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, k = _.vnode;
_.vnode = function(e) {
  typeof e.type == "string" && function(t) {
    var r = t.props, o = t.type, n = {}, a = o.indexOf("-") === -1;
    for (var i in r) {
      var l = r[i];
      if (!(i === "value" && "defaultValue" in r && l == null || j && i === "children" && o === "noscript" || i === "class" || i === "className")) {
        var u = i.toLowerCase();
        i === "defaultValue" && "value" in r && r.value == null ? i = "value" : i === "download" && l === !0 ? l = "" : u === "translate" && l === "no" ? l = !1 : u[0] === "o" && u[1] === "n" ? u === "ondoubleclick" ? i = "ondblclick" : u !== "onchange" || o !== "input" && o !== "textarea" || z(r.type) ? u === "onfocus" ? i = "onfocusin" : u === "onblur" ? i = "onfocusout" : D.test(i) && (i = u) : u = i = "oninput" : a && W.test(i) ? i = i.replace(H, "-$&").toLowerCase() : l === null && (l = void 0), u === "oninput" && n[i = u] && (i = "oninputCapture"), n[i] = l;
      }
    }
    o == "select" && n.multiple && Array.isArray(n.value) && (n.value = d(r.children).forEach(function(s) {
      s.props.selected = n.value.indexOf(s.props.value) != -1;
    })), o == "select" && n.defaultValue != null && (n.value = d(r.children).forEach(function(s) {
      s.props.selected = n.multiple ? n.defaultValue.indexOf(s.props.value) != -1 : n.defaultValue == s.props.value;
    })), r.class && !r.className ? (n.class = r.class, Object.defineProperty(n, "className", T)) : (r.className && !r.class || r.class && r.className) && (n.class = n.className = r.className), t.props = n;
  }(e), e.$$typeof = V, k && k(e);
};
var C = _.__r;
_.__r = function(e) {
  C && C(e), e.__c;
};
var x = _.diffed;
_.diffed = function(e) {
  x && x(e);
  var t = e.props, r = e.__e;
  r != null && e.type === "textarea" && "value" in t && t.value !== r.value && (r.value = t.value == null ? "" : t.value);
};
const Z = U({
  registry: null,
  isInitializing: !0,
  pluginsReady: !1
});
function q() {
  const e = L(Z);
  if (e === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: t, isInitializing: r } = e;
  if (r)
    return e;
  if (t === null)
    throw new Error("PDF registry failed to initialize properly");
  return e;
}
function S(e) {
  const { registry: t } = q();
  if (t === null)
    return {
      plugin: null,
      isLoading: !0,
      ready: new Promise(() => {
      })
    };
  const r = t.getPlugin(e);
  if (!r)
    throw new Error(`Plugin ${e} not found`);
  return {
    plugin: r,
    isLoading: !1,
    ready: r.ready()
  };
}
function G(e) {
  const { plugin: t, isLoading: r, ready: o } = S(e);
  if (!t)
    return {
      provides: null,
      isLoading: r,
      ready: o
    };
  if (!t.provides)
    throw new Error(`Plugin ${e} does not provide a capability`);
  return {
    provides: t.provides(),
    isLoading: r,
    ready: o
  };
}
const ee = () => S(E.id), J = () => G(E.id);
function te({ children: e, pageSize: t, ...r }) {
  const { provides: o } = J(), n = (o == null ? void 0 : o.getMatrix({
    w: t.width,
    h: t.height
  })) || "matrix(1, 0, 0, 1, 0, 0)";
  return /* @__PURE__ */ $(
    "div",
    {
      ...r,
      style: {
        position: "absolute",
        transformOrigin: "0 0",
        transform: n
      },
      children: e
    }
  );
}
export {
  te as Rotate,
  J as useRotateCapability,
  ee as useRotatePlugin
};
//# sourceMappingURL=index.js.map
