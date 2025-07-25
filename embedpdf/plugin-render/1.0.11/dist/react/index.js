import { Component as s, options as l, createElement as h, Fragment as p, toChildArray as f, createContext as J } from "preact";
import { useContext as K, useState as Q, useRef as X, useEffect as Y } from "preact/hooks";
import { R as z, i as ee, P as te } from "../render-plugin-ErV8zPxc.js";
import { u as k } from "../jsxRuntime.module-Bzuv3cXw.js";
function ne(e, n) {
  for (var t in n) e[t] = n[t];
  return e;
}
function P(e, n) {
  for (var t in e) if (t !== "__source" && !(t in n)) return !0;
  for (var r in n) if (r !== "__source" && e[r] !== n[r]) return !0;
  return !1;
}
function w(e, n) {
  this.props = e, this.context = n;
}
(w.prototype = new s()).isPureReactComponent = !0, w.prototype.shouldComponentUpdate = function(e, n) {
  return P(this.props, e) || P(this.state, n);
};
var R = l.__b;
l.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), R && R(e);
};
var re = l.__e;
l.__e = function(e, n, t, r) {
  if (e.then) {
    for (var o, i = n; i = i.__; ) if ((o = i.__c) && o.__c) return n.__e == null && (n.__e = t.__e, n.__k = t.__k), o.__c(e, n);
  }
  re(e, n, t, r);
};
var O = l.unmount;
function I(e, n, t) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), e.__c.__H = null), (e = ne({}, e)).__c != null && (e.__c.__P === t && (e.__c.__P = n), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(r) {
    return I(r, n, t);
  })), e;
}
function M(e, n, t) {
  return e && t && (e.__v = null, e.__k = e.__k && e.__k.map(function(r) {
    return M(r, n, t);
  }), e.__c && e.__c.__P === n && (e.__e && t.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = t)), e;
}
function m() {
  this.__u = 0, this.o = null, this.__b = null;
}
function B(e) {
  var n = e.__.__c;
  return n && n.__a && n.__a(e);
}
function d() {
  this.i = null, this.l = null;
}
l.unmount = function(e) {
  var n = e.__c;
  n && n.__R && n.__R(), n && 32 & e.__u && (e.type = null), O && O(e);
}, (m.prototype = new s()).__c = function(e, n) {
  var t = n.__c, r = this;
  r.o == null && (r.o = []), r.o.push(t);
  var o = B(r.__v), i = !1, _ = function() {
    i || (i = !0, t.__R = null, o ? o(a) : a());
  };
  t.__R = _;
  var a = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var u = r.state.__a;
        r.__v.__k[0] = M(u, u.__c.__P, u.__c.__O);
      }
      var c;
      for (r.setState({ __a: r.__b = null }); c = r.o.pop(); ) c.forceUpdate();
    }
  };
  r.__u++ || 32 & n.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(_, _);
}, m.prototype.componentWillUnmount = function() {
  this.o = [];
}, m.prototype.render = function(e, n) {
  if (this.__b) {
    if (this.__v.__k) {
      var t = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = I(this.__b, t, r.__O = r.__P);
    }
    this.__b = null;
  }
  var o = n.__a && h(p, null, e.fallback);
  return o && (o.__u &= -33), [h(p, null, n.__a ? null : e.children), o];
};
var C = function(e, n, t) {
  if (++t[1] === t[0] && e.l.delete(n), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (t = e.i; t; ) {
    for (; t.length > 3; ) t.pop()();
    if (t[1] < t[0]) break;
    e.i = t = t[2];
  }
};
(d.prototype = new s()).__a = function(e) {
  var n = this, t = B(n.__v), r = n.l.get(e);
  return r[0]++, function(o) {
    var i = function() {
      n.props.revealOrder ? (r.push(o), C(n, e, r)) : o();
    };
    t ? t(i) : i();
  };
}, d.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var n = f(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && n.reverse();
  for (var t = n.length; t--; ) this.l.set(n[t], this.i = [1, 0, this.i]);
  return e.children;
}, d.prototype.componentDidUpdate = d.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(n, t) {
    C(e, t, n);
  });
};
var oe = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, _e = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, ue = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, le = /[A-Z0-9]/g, ie = typeof document < "u", ae = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
s.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(s.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(n) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: n });
  } });
});
var U = l.event;
function ce() {
}
function se() {
  return this.cancelBubble;
}
function fe() {
  return this.defaultPrevented;
}
l.event = function(e) {
  return U && (e = U(e)), e.persist = ce, e.isPropagationStopped = se, e.isDefaultPrevented = fe, e.nativeEvent = e;
};
var pe = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, E = l.vnode;
l.vnode = function(e) {
  typeof e.type == "string" && function(n) {
    var t = n.props, r = n.type, o = {}, i = r.indexOf("-") === -1;
    for (var _ in t) {
      var a = t[_];
      if (!(_ === "value" && "defaultValue" in t && a == null || ie && _ === "children" && r === "noscript" || _ === "class" || _ === "className")) {
        var u = _.toLowerCase();
        _ === "defaultValue" && "value" in t && t.value == null ? _ = "value" : _ === "download" && a === !0 ? a = "" : u === "translate" && a === "no" ? a = !1 : u[0] === "o" && u[1] === "n" ? u === "ondoubleclick" ? _ = "ondblclick" : u !== "onchange" || r !== "input" && r !== "textarea" || ae(t.type) ? u === "onfocus" ? _ = "onfocusin" : u === "onblur" ? _ = "onfocusout" : ue.test(_) && (_ = u) : u = _ = "oninput" : i && _e.test(_) ? _ = _.replace(le, "-$&").toLowerCase() : a === null && (a = void 0), u === "oninput" && o[_ = u] && (_ = "oninputCapture"), o[_] = a;
      }
    }
    r == "select" && o.multiple && Array.isArray(o.value) && (o.value = f(t.children).forEach(function(c) {
      c.props.selected = o.value.indexOf(c.props.value) != -1;
    })), r == "select" && o.defaultValue != null && (o.value = f(t.children).forEach(function(c) {
      c.props.selected = o.multiple ? o.defaultValue.indexOf(c.props.value) != -1 : o.defaultValue == c.props.value;
    })), t.class && !t.className ? (o.class = t.class, Object.defineProperty(o, "className", pe)) : (t.className && !t.class || t.class && t.className) && (o.class = o.className = t.className), n.props = o;
  }(e), e.$$typeof = oe, E && E(e);
};
var S = l.__r;
l.__r = function(e) {
  S && S(e), e.__c;
};
var L = l.diffed;
l.diffed = function(e) {
  L && L(e);
  var n = e.props, t = e.__e;
  t != null && e.type === "textarea" && "value" in n && n.value !== t.value && (t.value = n.value == null ? "" : n.value);
};
const de = J({
  registry: null,
  isInitializing: !0,
  pluginsReady: !1
});
function ve() {
  const e = K(de);
  if (e === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: n, isInitializing: t } = e;
  if (t)
    return e;
  if (n === null)
    throw new Error("PDF registry failed to initialize properly");
  return e;
}
function T(e) {
  const { registry: n } = ve();
  if (n === null)
    return {
      plugin: null,
      isLoading: !0,
      ready: new Promise(() => {
      })
    };
  const t = n.getPlugin(e);
  if (!t)
    throw new Error(`Plugin ${e} not found`);
  return {
    plugin: t,
    isLoading: !1,
    ready: t.ready()
  };
}
function he(e) {
  const { plugin: n, isLoading: t, ready: r } = T(e);
  if (!n)
    return {
      provides: null,
      isLoading: t,
      ready: r
    };
  if (!n.provides)
    throw new Error(`Plugin ${e} does not provide a capability`);
  return {
    provides: n.provides(),
    isLoading: t,
    ready: r
  };
}
const Ae = () => T(z.id), me = () => he(z.id);
function ye(e, n) {
  for (var t in n) e[t] = n[t];
  return e;
}
function x(e, n) {
  for (var t in e) if (t !== "__source" && !(t in n)) return !0;
  for (var r in n) if (r !== "__source" && e[r] !== n[r]) return !0;
  return !1;
}
function $(e, n) {
  this.props = e, this.context = n;
}
($.prototype = new s()).isPureReactComponent = !0, $.prototype.shouldComponentUpdate = function(e, n) {
  return x(this.props, e) || x(this.state, n);
};
var N = l.__b;
l.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), N && N(e);
};
var be = l.__e;
l.__e = function(e, n, t, r) {
  if (e.then) {
    for (var o, i = n; i = i.__; ) if ((o = i.__c) && o.__c) return n.__e == null && (n.__e = t.__e, n.__k = t.__k), o.__c(e, n);
  }
  be(e, n, t, r);
};
var A = l.unmount;
function F(e, n, t) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), e.__c.__H = null), (e = ye({}, e)).__c != null && (e.__c.__P === t && (e.__c.__P = n), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(r) {
    return F(r, n, t);
  })), e;
}
function Z(e, n, t) {
  return e && t && (e.__v = null, e.__k = e.__k && e.__k.map(function(r) {
    return Z(r, n, t);
  }), e.__c && e.__c.__P === n && (e.__e && t.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = t)), e;
}
function y() {
  this.__u = 0, this.o = null, this.__b = null;
}
function q(e) {
  var n = e.__.__c;
  return n && n.__a && n.__a(e);
}
function v() {
  this.i = null, this.l = null;
}
l.unmount = function(e) {
  var n = e.__c;
  n && n.__R && n.__R(), n && 32 & e.__u && (e.type = null), A && A(e);
}, (y.prototype = new s()).__c = function(e, n) {
  var t = n.__c, r = this;
  r.o == null && (r.o = []), r.o.push(t);
  var o = q(r.__v), i = !1, _ = function() {
    i || (i = !0, t.__R = null, o ? o(a) : a());
  };
  t.__R = _;
  var a = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var u = r.state.__a;
        r.__v.__k[0] = Z(u, u.__c.__P, u.__c.__O);
      }
      var c;
      for (r.setState({ __a: r.__b = null }); c = r.o.pop(); ) c.forceUpdate();
    }
  };
  r.__u++ || 32 & n.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(_, _);
}, y.prototype.componentWillUnmount = function() {
  this.o = [];
}, y.prototype.render = function(e, n) {
  if (this.__b) {
    if (this.__v.__k) {
      var t = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = F(this.__b, t, r.__O = r.__P);
    }
    this.__b = null;
  }
  var o = n.__a && h(p, null, e.fallback);
  return o && (o.__u &= -33), [h(p, null, n.__a ? null : e.children), o];
};
var V = function(e, n, t) {
  if (++t[1] === t[0] && e.l.delete(n), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (t = e.i; t; ) {
    for (; t.length > 3; ) t.pop()();
    if (t[1] < t[0]) break;
    e.i = t = t[2];
  }
};
(v.prototype = new s()).__a = function(e) {
  var n = this, t = q(n.__v), r = n.l.get(e);
  return r[0]++, function(o) {
    var i = function() {
      n.props.revealOrder ? (r.push(o), V(n, e, r)) : o();
    };
    t ? t(i) : i();
  };
}, v.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var n = f(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && n.reverse();
  for (var t = n.length; t--; ) this.l.set(n[t], this.i = [1, 0, this.i]);
  return e.children;
}, v.prototype.componentDidUpdate = v.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(n, t) {
    V(e, t, n);
  });
};
var ge = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, ke = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Pe = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, we = /[A-Z0-9]/g, Re = typeof document < "u", Oe = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
s.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(s.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(n) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: n });
  } });
});
var W = l.event;
function Ce() {
}
function Ue() {
  return this.cancelBubble;
}
function Ee() {
  return this.defaultPrevented;
}
l.event = function(e) {
  return W && (e = W(e)), e.persist = Ce, e.isPropagationStopped = Ue, e.isDefaultPrevented = Ee, e.nativeEvent = e;
};
var Se = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, j = l.vnode;
l.vnode = function(e) {
  typeof e.type == "string" && function(n) {
    var t = n.props, r = n.type, o = {}, i = r.indexOf("-") === -1;
    for (var _ in t) {
      var a = t[_];
      if (!(_ === "value" && "defaultValue" in t && a == null || Re && _ === "children" && r === "noscript" || _ === "class" || _ === "className")) {
        var u = _.toLowerCase();
        _ === "defaultValue" && "value" in t && t.value == null ? _ = "value" : _ === "download" && a === !0 ? a = "" : u === "translate" && a === "no" ? a = !1 : u[0] === "o" && u[1] === "n" ? u === "ondoubleclick" ? _ = "ondblclick" : u !== "onchange" || r !== "input" && r !== "textarea" || Oe(t.type) ? u === "onfocus" ? _ = "onfocusin" : u === "onblur" ? _ = "onfocusout" : Pe.test(_) && (_ = u) : u = _ = "oninput" : i && ke.test(_) ? _ = _.replace(we, "-$&").toLowerCase() : a === null && (a = void 0), u === "oninput" && o[_ = u] && (_ = "oninputCapture"), o[_] = a;
      }
    }
    r == "select" && o.multiple && Array.isArray(o.value) && (o.value = f(t.children).forEach(function(c) {
      c.props.selected = o.value.indexOf(c.props.value) != -1;
    })), r == "select" && o.defaultValue != null && (o.value = f(t.children).forEach(function(c) {
      c.props.selected = o.multiple ? o.defaultValue.indexOf(c.props.value) != -1 : o.defaultValue == c.props.value;
    })), t.class && !t.className ? (o.class = t.class, Object.defineProperty(o, "className", Se)) : (t.className && !t.class || t.class && t.className) && (o.class = o.className = t.className), n.props = o;
  }(e), e.$$typeof = ge, j && j(e);
};
var D = l.__r;
l.__r = function(e) {
  D && D(e), e.__c;
};
var H = l.diffed;
l.diffed = function(e) {
  H && H(e);
  var n = e.props, t = e.__e;
  t != null && e.type === "textarea" && "value" in n && n.value !== t.value && (t.value = n.value == null ? "" : n.value);
};
function Ve({
  pageIndex: e,
  scaleFactor: n = 1,
  dpr: t = 1,
  style: r,
  ...o
}) {
  const { provides: i } = me(), [_, a] = Q(null), u = X(null);
  return Y(() => {
    if (i) {
      const b = i.renderPage({ pageIndex: e, scaleFactor: n, dpr: t });
      return b.wait((G) => {
        const g = URL.createObjectURL(G);
        a(g), u.current = g;
      }, ee), () => {
        u.current ? (URL.revokeObjectURL(u.current), u.current = null) : b.abort({
          code: te.Cancelled,
          message: "canceled render task"
        });
      };
    }
  }, [e, n, t, i]), /* @__PURE__ */ k(p, { children: _ && /* @__PURE__ */ k(
    "img",
    {
      src: _,
      onLoad: () => {
        u.current && (URL.revokeObjectURL(u.current), u.current = null);
      },
      ...o,
      style: {
        width: "100%",
        height: "100%",
        ...r || {}
      }
    }
  ) });
}
export {
  Ve as RenderLayer,
  me as useRenderCapability,
  Ae as useRenderPlugin
};
//# sourceMappingURL=index.js.map
