import { Component as s, options as a, createElement as m, Fragment as g, toChildArray as p, createContext as X } from "preact";
import { useContext as Y, useState as S, useEffect as k } from "preact/hooks";
import { c as T, S as v } from "../scroll-plugin-DIl4FWp0.js";
import { u as f } from "../jsxRuntime.module-D89ud_rY.js";
function tt(t, r) {
  for (var e in r) t[e] = r[e];
  return t;
}
function w(t, r) {
  for (var e in t) if (e !== "__source" && !(e in r)) return !0;
  for (var n in r) if (n !== "__source" && t[n] !== r[n]) return !0;
  return !1;
}
function x(t, r) {
  this.props = t, this.context = r;
}
(x.prototype = new s()).isPureReactComponent = !0, x.prototype.shouldComponentUpdate = function(t, r) {
  return w(this.props, t) || w(this.state, r);
};
var C = a.__b;
a.__b = function(t) {
  t.type && t.type.__f && t.ref && (t.props.ref = t.ref, t.ref = null), C && C(t);
};
var et = a.__e;
a.__e = function(t, r, e, n) {
  if (t.then) {
    for (var i, u = r; u = u.__; ) if ((i = u.__c) && i.__c) return r.__e == null && (r.__e = e.__e, r.__k = e.__k), i.__c(t, r);
  }
  et(t, r, e, n);
};
var O = a.unmount;
function B(t, r, e) {
  return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function(n) {
    typeof n.__c == "function" && n.__c();
  }), t.__c.__H = null), (t = tt({}, t)).__c != null && (t.__c.__P === e && (t.__c.__P = r), t.__c.__e = !0, t.__c = null), t.__k = t.__k && t.__k.map(function(n) {
    return B(n, r, e);
  })), t;
}
function F(t, r, e) {
  return t && e && (t.__v = null, t.__k = t.__k && t.__k.map(function(n) {
    return F(n, r, e);
  }), t.__c && t.__c.__P === r && (t.__e && e.appendChild(t.__e), t.__c.__e = !0, t.__c.__P = e)), t;
}
function b() {
  this.__u = 0, this.o = null, this.__b = null;
}
function I(t) {
  var r = t.__.__c;
  return r && r.__a && r.__a(t);
}
function h() {
  this.i = null, this.l = null;
}
a.unmount = function(t) {
  var r = t.__c;
  r && r.__R && r.__R(), r && 32 & t.__u && (t.type = null), O && O(t);
}, (b.prototype = new s()).__c = function(t, r) {
  var e = r.__c, n = this;
  n.o == null && (n.o = []), n.o.push(e);
  var i = I(n.__v), u = !1, o = function() {
    u || (u = !0, e.__R = null, i ? i(_) : _());
  };
  e.__R = o;
  var _ = function() {
    if (!--n.__u) {
      if (n.state.__a) {
        var l = n.state.__a;
        n.__v.__k[0] = F(l, l.__c.__P, l.__c.__O);
      }
      var c;
      for (n.setState({ __a: n.__b = null }); c = n.o.pop(); ) c.forceUpdate();
    }
  };
  n.__u++ || 32 & r.__u || n.setState({ __a: n.__b = n.__v.__k[0] }), t.then(o, o);
}, b.prototype.componentWillUnmount = function() {
  this.o = [];
}, b.prototype.render = function(t, r) {
  if (this.__b) {
    if (this.__v.__k) {
      var e = document.createElement("div"), n = this.__v.__k[0].__c;
      this.__v.__k[0] = B(this.__b, e, n.__O = n.__P);
    }
    this.__b = null;
  }
  var i = r.__a && m(g, null, t.fallback);
  return i && (i.__u &= -33), [m(g, null, r.__a ? null : t.children), i];
};
var E = function(t, r, e) {
  if (++e[1] === e[0] && t.l.delete(r), t.props.revealOrder && (t.props.revealOrder[0] !== "t" || !t.l.size)) for (e = t.i; e; ) {
    for (; e.length > 3; ) e.pop()();
    if (e[1] < e[0]) break;
    t.i = e = e[2];
  }
};
(h.prototype = new s()).__a = function(t) {
  var r = this, e = I(r.__v), n = r.l.get(t);
  return n[0]++, function(i) {
    var u = function() {
      r.props.revealOrder ? (n.push(i), E(r, t, n)) : i();
    };
    e ? e(u) : u();
  };
}, h.prototype.render = function(t) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var r = p(t.children);
  t.revealOrder && t.revealOrder[0] === "b" && r.reverse();
  for (var e = r.length; e--; ) this.l.set(r[e], this.i = [1, 0, this.i]);
  return t.children;
}, h.prototype.componentDidUpdate = h.prototype.componentDidMount = function() {
  var t = this;
  this.l.forEach(function(r, e) {
    E(t, e, r);
  });
};
var rt = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, nt = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, ot = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, it = /[A-Z0-9]/g, lt = typeof document < "u", ut = function(t) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(t);
};
s.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t) {
  Object.defineProperty(s.prototype, t, { configurable: !0, get: function() {
    return this["UNSAFE_" + t];
  }, set: function(r) {
    Object.defineProperty(this, t, { configurable: !0, writable: !0, value: r });
  } });
});
var $ = a.event;
function at() {
}
function _t() {
  return this.cancelBubble;
}
function ct() {
  return this.defaultPrevented;
}
a.event = function(t) {
  return $ && (t = $(t)), t.persist = at, t.isPropagationStopped = _t, t.isDefaultPrevented = ct, t.nativeEvent = t;
};
var st = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, N = a.vnode;
a.vnode = function(t) {
  typeof t.type == "string" && function(r) {
    var e = r.props, n = r.type, i = {}, u = n.indexOf("-") === -1;
    for (var o in e) {
      var _ = e[o];
      if (!(o === "value" && "defaultValue" in e && _ == null || lt && o === "children" && n === "noscript" || o === "class" || o === "className")) {
        var l = o.toLowerCase();
        o === "defaultValue" && "value" in e && e.value == null ? o = "value" : o === "download" && _ === !0 ? _ = "" : l === "translate" && _ === "no" ? _ = !1 : l[0] === "o" && l[1] === "n" ? l === "ondoubleclick" ? o = "ondblclick" : l !== "onchange" || n !== "input" && n !== "textarea" || ut(e.type) ? l === "onfocus" ? o = "onfocusin" : l === "onblur" ? o = "onfocusout" : ot.test(o) && (o = l) : l = o = "oninput" : u && nt.test(o) ? o = o.replace(it, "-$&").toLowerCase() : _ === null && (_ = void 0), l === "oninput" && i[o = l] && (o = "oninputCapture"), i[o] = _;
      }
    }
    n == "select" && i.multiple && Array.isArray(i.value) && (i.value = p(e.children).forEach(function(c) {
      c.props.selected = i.value.indexOf(c.props.value) != -1;
    })), n == "select" && i.defaultValue != null && (i.value = p(e.children).forEach(function(c) {
      c.props.selected = i.multiple ? i.defaultValue.indexOf(c.props.value) != -1 : i.defaultValue == c.props.value;
    })), e.class && !e.className ? (i.class = e.class, Object.defineProperty(i, "className", st)) : (e.className && !e.class || e.class && e.className) && (i.class = i.className = e.className), r.props = i;
  }(t), t.$$typeof = rt, N && N(t);
};
var R = a.__r;
a.__r = function(t) {
  R && R(t), t.__c;
};
var U = a.diffed;
a.diffed = function(t) {
  U && U(t);
  var r = t.props, e = t.__e;
  e != null && t.type === "textarea" && "value" in r && r.value !== e.value && (e.value = r.value == null ? "" : r.value);
};
const ft = X({
  registry: null,
  isInitializing: !0,
  pluginsReady: !1
});
function Z() {
  const t = Y(ft);
  if (t === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: r, isInitializing: e } = t;
  if (e)
    return t;
  if (r === null)
    throw new Error("PDF registry failed to initialize properly");
  return t;
}
function G(t) {
  const { registry: r } = Z();
  if (r === null)
    return {
      plugin: null,
      isLoading: !0,
      ready: new Promise(() => {
      })
    };
  const e = r.getPlugin(t);
  if (!e)
    throw new Error(`Plugin ${t} not found`);
  return {
    plugin: e,
    isLoading: !1,
    ready: e.ready()
  };
}
function pt(t) {
  const { plugin: r, isLoading: e, ready: n } = G(t);
  if (!r)
    return {
      provides: null,
      isLoading: e,
      ready: n
    };
  if (!r.provides)
    throw new Error(`Plugin ${t} does not provide a capability`);
  return {
    provides: r.provides(),
    isLoading: e,
    ready: n
  };
}
function dt(t, r) {
  for (var e in r) t[e] = r[e];
  return t;
}
function H(t, r) {
  for (var e in t) if (e !== "__source" && !(e in r)) return !0;
  for (var n in r) if (n !== "__source" && t[n] !== r[n]) return !0;
  return !1;
}
function L(t, r) {
  this.props = t, this.context = r;
}
(L.prototype = new s()).isPureReactComponent = !0, L.prototype.shouldComponentUpdate = function(t, r) {
  return H(this.props, t) || H(this.state, r);
};
var z = a.__b;
a.__b = function(t) {
  t.type && t.type.__f && t.ref && (t.props.ref = t.ref, t.ref = null), z && z(t);
};
var vt = a.__e;
a.__e = function(t, r, e, n) {
  if (t.then) {
    for (var i, u = r; u = u.__; ) if ((i = u.__c) && i.__c) return r.__e == null && (r.__e = e.__e, r.__k = e.__k), i.__c(t, r);
  }
  vt(t, r, e, n);
};
var A = a.unmount;
function q(t, r, e) {
  return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function(n) {
    typeof n.__c == "function" && n.__c();
  }), t.__c.__H = null), (t = dt({}, t)).__c != null && (t.__c.__P === e && (t.__c.__P = r), t.__c.__e = !0, t.__c = null), t.__k = t.__k && t.__k.map(function(n) {
    return q(n, r, e);
  })), t;
}
function J(t, r, e) {
  return t && e && (t.__v = null, t.__k = t.__k && t.__k.map(function(n) {
    return J(n, r, e);
  }), t.__c && t.__c.__P === r && (t.__e && e.appendChild(t.__e), t.__c.__e = !0, t.__c.__P = e)), t;
}
function P() {
  this.__u = 0, this.o = null, this.__b = null;
}
function K(t) {
  var r = t.__.__c;
  return r && r.__a && r.__a(t);
}
function y() {
  this.i = null, this.l = null;
}
a.unmount = function(t) {
  var r = t.__c;
  r && r.__R && r.__R(), r && 32 & t.__u && (t.type = null), A && A(t);
}, (P.prototype = new s()).__c = function(t, r) {
  var e = r.__c, n = this;
  n.o == null && (n.o = []), n.o.push(e);
  var i = K(n.__v), u = !1, o = function() {
    u || (u = !0, e.__R = null, i ? i(_) : _());
  };
  e.__R = o;
  var _ = function() {
    if (!--n.__u) {
      if (n.state.__a) {
        var l = n.state.__a;
        n.__v.__k[0] = J(l, l.__c.__P, l.__c.__O);
      }
      var c;
      for (n.setState({ __a: n.__b = null }); c = n.o.pop(); ) c.forceUpdate();
    }
  };
  n.__u++ || 32 & r.__u || n.setState({ __a: n.__b = n.__v.__k[0] }), t.then(o, o);
}, P.prototype.componentWillUnmount = function() {
  this.o = [];
}, P.prototype.render = function(t, r) {
  if (this.__b) {
    if (this.__v.__k) {
      var e = document.createElement("div"), n = this.__v.__k[0].__c;
      this.__v.__k[0] = q(this.__b, e, n.__O = n.__P);
    }
    this.__b = null;
  }
  var i = r.__a && m(g, null, t.fallback);
  return i && (i.__u &= -33), [m(g, null, r.__a ? null : t.children), i];
};
var W = function(t, r, e) {
  if (++e[1] === e[0] && t.l.delete(r), t.props.revealOrder && (t.props.revealOrder[0] !== "t" || !t.l.size)) for (e = t.i; e; ) {
    for (; e.length > 3; ) e.pop()();
    if (e[1] < e[0]) break;
    t.i = e = e[2];
  }
};
(y.prototype = new s()).__a = function(t) {
  var r = this, e = K(r.__v), n = r.l.get(t);
  return n[0]++, function(i) {
    var u = function() {
      r.props.revealOrder ? (n.push(i), W(r, t, n)) : i();
    };
    e ? e(u) : u();
  };
}, y.prototype.render = function(t) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var r = p(t.children);
  t.revealOrder && t.revealOrder[0] === "b" && r.reverse();
  for (var e = r.length; e--; ) this.l.set(r[e], this.i = [1, 0, this.i]);
  return t.children;
}, y.prototype.componentDidUpdate = y.prototype.componentDidMount = function() {
  var t = this;
  this.l.forEach(function(r, e) {
    W(t, e, r);
  });
};
var ht = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, yt = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, mt = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, gt = /[A-Z0-9]/g, bt = typeof document < "u", Pt = function(t) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(t);
};
s.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t) {
  Object.defineProperty(s.prototype, t, { configurable: !0, get: function() {
    return this["UNSAFE_" + t];
  }, set: function(r) {
    Object.defineProperty(this, t, { configurable: !0, writable: !0, value: r });
  } });
});
var D = a.event;
function St() {
}
function kt() {
  return this.cancelBubble;
}
function wt() {
  return this.defaultPrevented;
}
a.event = function(t) {
  return D && (t = D(t)), t.persist = St, t.isPropagationStopped = kt, t.isDefaultPrevented = wt, t.nativeEvent = t;
};
var xt = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, V = a.vnode;
a.vnode = function(t) {
  typeof t.type == "string" && function(r) {
    var e = r.props, n = r.type, i = {}, u = n.indexOf("-") === -1;
    for (var o in e) {
      var _ = e[o];
      if (!(o === "value" && "defaultValue" in e && _ == null || bt && o === "children" && n === "noscript" || o === "class" || o === "className")) {
        var l = o.toLowerCase();
        o === "defaultValue" && "value" in e && e.value == null ? o = "value" : o === "download" && _ === !0 ? _ = "" : l === "translate" && _ === "no" ? _ = !1 : l[0] === "o" && l[1] === "n" ? l === "ondoubleclick" ? o = "ondblclick" : l !== "onchange" || n !== "input" && n !== "textarea" || Pt(e.type) ? l === "onfocus" ? o = "onfocusin" : l === "onblur" ? o = "onfocusout" : mt.test(o) && (o = l) : l = o = "oninput" : u && yt.test(o) ? o = o.replace(gt, "-$&").toLowerCase() : _ === null && (_ = void 0), l === "oninput" && i[o = l] && (o = "oninputCapture"), i[o] = _;
      }
    }
    n == "select" && i.multiple && Array.isArray(i.value) && (i.value = p(e.children).forEach(function(c) {
      c.props.selected = i.value.indexOf(c.props.value) != -1;
    })), n == "select" && i.defaultValue != null && (i.value = p(e.children).forEach(function(c) {
      c.props.selected = i.multiple ? i.defaultValue.indexOf(c.props.value) != -1 : i.defaultValue == c.props.value;
    })), e.class && !e.className ? (i.class = e.class, Object.defineProperty(i, "className", xt)) : (e.className && !e.class || e.class && e.className) && (i.class = i.className = e.className), r.props = i;
  }(t), t.$$typeof = ht, V && V(t);
};
var j = a.__r;
a.__r = function(t) {
  j && j(t), t.__c;
};
var M = a.diffed;
a.diffed = function(t) {
  M && M(t);
  var r = t.props, e = t.__e;
  e != null && t.type === "textarea" && "value" in r && r.value !== e.value && (e.value = r.value == null ? "" : r.value);
};
const Ct = () => G(T.id), Q = () => pt(T.id), Rt = () => {
  const { provides: t } = Q(), [r, e] = S(1), [n, i] = S(1);
  return k(() => {
    if (t)
      return t.onPageChange(({ pageNumber: u, totalPages: o }) => {
        e(u), i(o);
      });
  }, [t]), {
    ...t,
    currentPage: r,
    totalPages: n
  };
};
function Ut({ renderPage: t, overlayElements: r, ...e }) {
  const { provides: n } = Q(), { plugin: i } = Ct(), { registry: u } = Z(), [o, _] = S(
    () => (n == null ? void 0 : n.getScrollerLayout()) ?? null
  );
  if (k(() => {
    if (n)
      return n.onScrollerData(_);
  }, [n]), k(() => {
    i && i.setLayoutReady();
  }, [i]), !o || !u) return null;
  const l = u.getStore().getState();
  return /* @__PURE__ */ f(
    "div",
    {
      ...e,
      style: {
        width: `${o.totalWidth}px`,
        height: `${o.totalHeight}px`,
        position: "relative",
        boxSizing: "border-box",
        margin: "0 auto",
        ...o.strategy === v.Horizontal && {
          display: "flex",
          flexDirection: "row"
        }
      },
      children: [
        /* @__PURE__ */ f(
          "div",
          {
            style: {
              ...o.strategy === v.Horizontal ? {
                width: o.startSpacing,
                height: "100%",
                flexShrink: 0
              } : {
                height: o.startSpacing,
                width: "100%"
              }
            }
          }
        ),
        /* @__PURE__ */ f(
          "div",
          {
            style: {
              gap: o.pageGap,
              display: "flex",
              alignItems: "center",
              position: "relative",
              boxSizing: "border-box",
              ...o.strategy === v.Horizontal ? {
                flexDirection: "row",
                minHeight: "100%"
              } : {
                flexDirection: "column",
                minWidth: "fit-content"
              }
            },
            children: o.items.map((c) => /* @__PURE__ */ f(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "center",
                  gap: o.pageGap
                },
                children: c.pageLayouts.map((d) => /* @__PURE__ */ f(
                  "div",
                  {
                    style: {
                      width: `${d.rotatedWidth}px`,
                      height: `${d.rotatedHeight}px`
                    },
                    children: t({
                      ...d,
                      rotation: l.core.rotation,
                      scale: l.core.scale,
                      document: l.core.document
                    })
                  },
                  d.pageNumber
                ))
              },
              c.pageNumbers[0]
            ))
          }
        ),
        /* @__PURE__ */ f(
          "div",
          {
            style: {
              ...o.strategy === v.Horizontal ? {
                width: o.endSpacing,
                height: "100%",
                flexShrink: 0
              } : {
                height: o.endSpacing,
                width: "100%"
              }
            }
          }
        ),
        r
      ]
    }
  );
}
export {
  Ut as Scroller,
  Rt as useScroll,
  Q as useScrollCapability,
  Ct as useScrollPlugin
};
//# sourceMappingURL=index.js.map
