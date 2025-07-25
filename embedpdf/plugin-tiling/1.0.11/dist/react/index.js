import { Component as s, options as a, createElement as v, Fragment as h, toChildArray as f, createContext as X } from "preact";
import { useContext as Y, useState as D, useRef as ee, useEffect as H } from "preact/hooks";
import { T as M, i as te, P as ne } from "../tiling-plugin-CEXbViPQ.js";
import { u as b } from "../jsxRuntime.module-Bzuv3cXw.js";
function re(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function P(e, t) {
  for (var n in e) if (n !== "__source" && !(n in t)) return !0;
  for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
  return !1;
}
function w(e, t) {
  this.props = e, this.context = t;
}
(w.prototype = new s()).isPureReactComponent = !0, w.prototype.shouldComponentUpdate = function(e, t) {
  return P(this.props, e) || P(this.state, t);
};
var R = a.__b;
a.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), R && R(e);
};
var oe = a.__e;
a.__e = function(e, t, n, r) {
  if (e.then) {
    for (var o, l = t; l = l.__; ) if ((o = l.__c) && o.__c) return t.__e == null && (t.__e = n.__e, t.__k = n.__k), o.__c(e, t);
  }
  oe(e, t, n, r);
};
var O = a.unmount;
function B(e, t, n) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), e.__c.__H = null), (e = re({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(r) {
    return B(r, t, n);
  })), e;
}
function F(e, t, n) {
  return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(r) {
    return F(r, t, n);
  }), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function m() {
  this.__u = 0, this.o = null, this.__b = null;
}
function I(e) {
  var t = e.__.__c;
  return t && t.__a && t.__a(e);
}
function p() {
  this.i = null, this.l = null;
}
a.unmount = function(e) {
  var t = e.__c;
  t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), O && O(e);
}, (m.prototype = new s()).__c = function(e, t) {
  var n = t.__c, r = this;
  r.o == null && (r.o = []), r.o.push(n);
  var o = I(r.__v), l = !1, i = function() {
    l || (l = !0, n.__R = null, o ? o(u) : u());
  };
  n.__R = i;
  var u = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var _ = r.state.__a;
        r.__v.__k[0] = F(_, _.__c.__P, _.__c.__O);
      }
      var c;
      for (r.setState({ __a: r.__b = null }); c = r.o.pop(); ) c.forceUpdate();
    }
  };
  r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(i, i);
}, m.prototype.componentWillUnmount = function() {
  this.o = [];
}, m.prototype.render = function(e, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = B(this.__b, n, r.__O = r.__P);
    }
    this.__b = null;
  }
  var o = t.__a && v(h, null, e.fallback);
  return o && (o.__u &= -33), [v(h, null, t.__a ? null : e.children), o];
};
var C = function(e, t, n) {
  if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    e.i = n = n[2];
  }
};
(p.prototype = new s()).__a = function(e) {
  var t = this, n = I(t.__v), r = t.l.get(e);
  return r[0]++, function(o) {
    var l = function() {
      t.props.revealOrder ? (r.push(o), C(t, e, r)) : o();
    };
    n ? n(l) : l();
  };
}, p.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var t = f(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
  for (var n = t.length; n--; ) this.l.set(t[n], this.i = [1, 0, this.i]);
  return e.children;
}, p.prototype.componentDidUpdate = p.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(t, n) {
    C(e, n, t);
  });
};
var ie = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, ue = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, _e = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, le = /[A-Z0-9]/g, ae = typeof document < "u", ce = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
s.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(s.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(t) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
  } });
});
var U = a.event;
function se() {
}
function fe() {
  return this.cancelBubble;
}
function pe() {
  return this.defaultPrevented;
}
a.event = function(e) {
  return U && (e = U(e)), e.persist = se, e.isPropagationStopped = fe, e.isDefaultPrevented = pe, e.nativeEvent = e;
};
var de = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, E = a.vnode;
a.vnode = function(e) {
  typeof e.type == "string" && function(t) {
    var n = t.props, r = t.type, o = {}, l = r.indexOf("-") === -1;
    for (var i in n) {
      var u = n[i];
      if (!(i === "value" && "defaultValue" in n && u == null || ae && i === "children" && r === "noscript" || i === "class" || i === "className")) {
        var _ = i.toLowerCase();
        i === "defaultValue" && "value" in n && n.value == null ? i = "value" : i === "download" && u === !0 ? u = "" : _ === "translate" && u === "no" ? u = !1 : _[0] === "o" && _[1] === "n" ? _ === "ondoubleclick" ? i = "ondblclick" : _ !== "onchange" || r !== "input" && r !== "textarea" || ce(n.type) ? _ === "onfocus" ? i = "onfocusin" : _ === "onblur" ? i = "onfocusout" : _e.test(i) && (i = _) : _ = i = "oninput" : l && ue.test(i) ? i = i.replace(le, "-$&").toLowerCase() : u === null && (u = void 0), _ === "oninput" && o[i = _] && (i = "oninputCapture"), o[i] = u;
      }
    }
    r == "select" && o.multiple && Array.isArray(o.value) && (o.value = f(n.children).forEach(function(c) {
      c.props.selected = o.value.indexOf(c.props.value) != -1;
    })), r == "select" && o.defaultValue != null && (o.value = f(n.children).forEach(function(c) {
      c.props.selected = o.multiple ? o.defaultValue.indexOf(c.props.value) != -1 : o.defaultValue == c.props.value;
    })), n.class && !n.className ? (o.class = n.class, Object.defineProperty(o, "className", de)) : (n.className && !n.class || n.class && n.className) && (o.class = o.className = n.className), t.props = o;
  }(e), e.$$typeof = ie, E && E(e);
};
var S = a.__r;
a.__r = function(e) {
  S && S(e), e.__c;
};
var x = a.diffed;
a.diffed = function(e) {
  x && x(e);
  var t = e.props, n = e.__e;
  n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
const ve = X({
  registry: null,
  isInitializing: !0,
  pluginsReady: !1
});
function he() {
  const e = Y(ve);
  if (e === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: t, isInitializing: n } = e;
  if (n)
    return e;
  if (t === null)
    throw new Error("PDF registry failed to initialize properly");
  return e;
}
function Z(e) {
  const { registry: t } = he();
  if (t === null)
    return {
      plugin: null,
      isLoading: !0,
      ready: new Promise(() => {
      })
    };
  const n = t.getPlugin(e);
  if (!n)
    throw new Error(`Plugin ${e} not found`);
  return {
    plugin: n,
    isLoading: !1,
    ready: n.ready()
  };
}
function me(e) {
  const { plugin: t, isLoading: n, ready: r } = Z(e);
  if (!t)
    return {
      provides: null,
      isLoading: n,
      ready: r
    };
  if (!t.provides)
    throw new Error(`Plugin ${e} does not provide a capability`);
  return {
    provides: t.provides(),
    isLoading: n,
    ready: r
  };
}
const Ae = () => Z(M.id), q = () => me(M.id);
function ye(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function L(e, t) {
  for (var n in e) if (n !== "__source" && !(n in t)) return !0;
  for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
  return !1;
}
function $(e, t) {
  this.props = e, this.context = t;
}
($.prototype = new s()).isPureReactComponent = !0, $.prototype.shouldComponentUpdate = function(e, t) {
  return L(this.props, e) || L(this.state, t);
};
var N = a.__b;
a.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), N && N(e);
};
var be = a.__e;
a.__e = function(e, t, n, r) {
  if (e.then) {
    for (var o, l = t; l = l.__; ) if ((o = l.__c) && o.__c) return t.__e == null && (t.__e = n.__e, t.__k = n.__k), o.__c(e, t);
  }
  be(e, t, n, r);
};
var T = a.unmount;
function G(e, t, n) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), e.__c.__H = null), (e = ye({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(r) {
    return G(r, t, n);
  })), e;
}
function J(e, t, n) {
  return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(r) {
    return J(r, t, n);
  }), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function y() {
  this.__u = 0, this.o = null, this.__b = null;
}
function K(e) {
  var t = e.__.__c;
  return t && t.__a && t.__a(e);
}
function d() {
  this.i = null, this.l = null;
}
a.unmount = function(e) {
  var t = e.__c;
  t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), T && T(e);
}, (y.prototype = new s()).__c = function(e, t) {
  var n = t.__c, r = this;
  r.o == null && (r.o = []), r.o.push(n);
  var o = K(r.__v), l = !1, i = function() {
    l || (l = !0, n.__R = null, o ? o(u) : u());
  };
  n.__R = i;
  var u = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var _ = r.state.__a;
        r.__v.__k[0] = J(_, _.__c.__P, _.__c.__O);
      }
      var c;
      for (r.setState({ __a: r.__b = null }); c = r.o.pop(); ) c.forceUpdate();
    }
  };
  r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(i, i);
}, y.prototype.componentWillUnmount = function() {
  this.o = [];
}, y.prototype.render = function(e, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = G(this.__b, n, r.__O = r.__P);
    }
    this.__b = null;
  }
  var o = t.__a && v(h, null, e.fallback);
  return o && (o.__u &= -33), [v(h, null, t.__a ? null : e.children), o];
};
var A = function(e, t, n) {
  if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    e.i = n = n[2];
  }
};
(d.prototype = new s()).__a = function(e) {
  var t = this, n = K(t.__v), r = t.l.get(e);
  return r[0]++, function(o) {
    var l = function() {
      t.props.revealOrder ? (r.push(o), A(t, e, r)) : o();
    };
    n ? n(l) : l();
  };
}, d.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var t = f(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
  for (var n = t.length; n--; ) this.l.set(t[n], this.i = [1, 0, this.i]);
  return e.children;
}, d.prototype.componentDidUpdate = d.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(t, n) {
    A(e, n, t);
  });
};
var ge = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, ke = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Pe = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, we = /[A-Z0-9]/g, Re = typeof document < "u", Oe = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
s.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(s.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(t) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
  } });
});
var V = a.event;
function Ce() {
}
function Ue() {
  return this.cancelBubble;
}
function Ee() {
  return this.defaultPrevented;
}
a.event = function(e) {
  return V && (e = V(e)), e.persist = Ce, e.isPropagationStopped = Ue, e.isDefaultPrevented = Ee, e.nativeEvent = e;
};
var Se = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, j = a.vnode;
a.vnode = function(e) {
  typeof e.type == "string" && function(t) {
    var n = t.props, r = t.type, o = {}, l = r.indexOf("-") === -1;
    for (var i in n) {
      var u = n[i];
      if (!(i === "value" && "defaultValue" in n && u == null || Re && i === "children" && r === "noscript" || i === "class" || i === "className")) {
        var _ = i.toLowerCase();
        i === "defaultValue" && "value" in n && n.value == null ? i = "value" : i === "download" && u === !0 ? u = "" : _ === "translate" && u === "no" ? u = !1 : _[0] === "o" && _[1] === "n" ? _ === "ondoubleclick" ? i = "ondblclick" : _ !== "onchange" || r !== "input" && r !== "textarea" || Oe(n.type) ? _ === "onfocus" ? i = "onfocusin" : _ === "onblur" ? i = "onfocusout" : Pe.test(i) && (i = _) : _ = i = "oninput" : l && ke.test(i) ? i = i.replace(we, "-$&").toLowerCase() : u === null && (u = void 0), _ === "oninput" && o[i = _] && (i = "oninputCapture"), o[i] = u;
      }
    }
    r == "select" && o.multiple && Array.isArray(o.value) && (o.value = f(n.children).forEach(function(c) {
      c.props.selected = o.value.indexOf(c.props.value) != -1;
    })), r == "select" && o.defaultValue != null && (o.value = f(n.children).forEach(function(c) {
      c.props.selected = o.multiple ? o.defaultValue.indexOf(c.props.value) != -1 : o.defaultValue == c.props.value;
    })), n.class && !n.className ? (o.class = n.class, Object.defineProperty(o, "className", Se)) : (n.className && !n.class || n.class && n.className) && (o.class = o.className = n.className), t.props = o;
  }(e), e.$$typeof = ge, j && j(e);
};
var W = a.__r;
a.__r = function(e) {
  W && W(e), e.__c;
};
var z = a.diffed;
a.diffed = function(e) {
  z && z(e);
  var t = e.props, n = e.__e;
  n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
function xe({ pageIndex: e, tile: t, dpr: n, scale: r }) {
  const { provides: o } = q(), [l, i] = D(), u = ee(null), _ = r / t.srcScale;
  H(() => {
    if (t.status === "ready" && u.current || !o) return;
    const g = o.renderTile({ pageIndex: e, tile: t, dpr: n });
    return g.wait((Q) => {
      const k = URL.createObjectURL(Q);
      u.current = k, i(k);
    }, te), () => {
      u.current ? (URL.revokeObjectURL(u.current), u.current = null) : g.abort({
        code: ne.Cancelled,
        message: "canceled render task"
      });
    };
  }, [e, t.id]);
  const c = () => {
    u.current && (URL.revokeObjectURL(u.current), u.current = null);
  };
  return l ? /* @__PURE__ */ b(
    "img",
    {
      src: l,
      onLoad: c,
      style: {
        position: "absolute",
        left: t.screenRect.origin.x * _,
        top: t.screenRect.origin.y * _,
        width: t.screenRect.size.width * _,
        height: t.screenRect.size.height * _,
        display: "block"
      }
    }
  ) : null;
}
function Ve({ pageIndex: e, scale: t, style: n, ...r }) {
  const { provides: o } = q(), [l, i] = D([]);
  return H(() => {
    if (o)
      return o.onTileRendering((u) => i(u[e]));
  }, [o]), /* @__PURE__ */ b(
    "div",
    {
      style: {
        ...n
      },
      ...r,
      children: l == null ? void 0 : l.map((u) => /* @__PURE__ */ b(
        xe,
        {
          pageIndex: e,
          tile: u,
          dpr: window.devicePixelRatio,
          scale: t
        },
        u.id
      ))
    }
  );
}
export {
  Ve as TilingLayer,
  q as useTilingCapability,
  Ae as useTilingPlugin
};
//# sourceMappingURL=index.js.map
