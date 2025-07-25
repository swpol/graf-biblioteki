import { Component as s, options as a, createElement as d, Fragment as h, toChildArray as f, createContext as q } from "preact";
import { useContext as G, useRef as I, useLayoutEffect as Z, useState as J, useEffect as K } from "preact/hooks";
import { u as Q } from "../jsxRuntime.module-D89ud_rY.js";
import { V as H } from "../viewport-plugin-CewlD1yp.js";
function X(e, r) {
  for (var t in r) e[t] = r[t];
  return e;
}
function g(e, r) {
  for (var t in e) if (t !== "__source" && !(t in r)) return !0;
  for (var n in r) if (n !== "__source" && e[n] !== r[n]) return !0;
  return !1;
}
function b(e, r) {
  this.props = e, this.context = r;
}
(b.prototype = new s()).isPureReactComponent = !0, b.prototype.shouldComponentUpdate = function(e, r) {
  return g(this.props, e) || g(this.state, r);
};
var w = a.__b;
a.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), w && w(e);
};
var Y = a.__e;
a.__e = function(e, r, t, n) {
  if (e.then) {
    for (var o, _ = r; _ = _.__; ) if ((o = _.__c) && o.__c) return r.__e == null && (r.__e = t.__e, r.__k = t.__k), o.__c(e, r);
  }
  Y(e, r, t, n);
};
var P = a.unmount;
function z(e, r, t) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(n) {
    typeof n.__c == "function" && n.__c();
  }), e.__c.__H = null), (e = X({}, e)).__c != null && (e.__c.__P === t && (e.__c.__P = r), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(n) {
    return z(n, r, t);
  })), e;
}
function T(e, r, t) {
  return e && t && (e.__v = null, e.__k = e.__k && e.__k.map(function(n) {
    return T(n, r, t);
  }), e.__c && e.__c.__P === r && (e.__e && t.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = t)), e;
}
function m() {
  this.__u = 0, this.o = null, this.__b = null;
}
function B(e) {
  var r = e.__.__c;
  return r && r.__a && r.__a(e);
}
function p() {
  this.i = null, this.l = null;
}
a.unmount = function(e) {
  var r = e.__c;
  r && r.__R && r.__R(), r && 32 & e.__u && (e.type = null), P && P(e);
}, (m.prototype = new s()).__c = function(e, r) {
  var t = r.__c, n = this;
  n.o == null && (n.o = []), n.o.push(t);
  var o = B(n.__v), _ = !1, i = function() {
    _ || (_ = !0, t.__R = null, o ? o(u) : u());
  };
  t.__R = i;
  var u = function() {
    if (!--n.__u) {
      if (n.state.__a) {
        var l = n.state.__a;
        n.__v.__k[0] = T(l, l.__c.__P, l.__c.__O);
      }
      var c;
      for (n.setState({ __a: n.__b = null }); c = n.o.pop(); ) c.forceUpdate();
    }
  };
  n.__u++ || 32 & r.__u || n.setState({ __a: n.__b = n.__v.__k[0] }), e.then(i, i);
}, m.prototype.componentWillUnmount = function() {
  this.o = [];
}, m.prototype.render = function(e, r) {
  if (this.__b) {
    if (this.__v.__k) {
      var t = document.createElement("div"), n = this.__v.__k[0].__c;
      this.__v.__k[0] = z(this.__b, t, n.__O = n.__P);
    }
    this.__b = null;
  }
  var o = r.__a && d(h, null, e.fallback);
  return o && (o.__u &= -33), [d(h, null, r.__a ? null : e.children), o];
};
var k = function(e, r, t) {
  if (++t[1] === t[0] && e.l.delete(r), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (t = e.i; t; ) {
    for (; t.length > 3; ) t.pop()();
    if (t[1] < t[0]) break;
    e.i = t = t[2];
  }
};
(p.prototype = new s()).__a = function(e) {
  var r = this, t = B(r.__v), n = r.l.get(e);
  return n[0]++, function(o) {
    var _ = function() {
      r.props.revealOrder ? (n.push(o), k(r, e, n)) : o();
    };
    t ? t(_) : _();
  };
}, p.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var r = f(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && r.reverse();
  for (var t = r.length; t--; ) this.l.set(r[t], this.i = [1, 0, this.i]);
  return e.children;
}, p.prototype.componentDidUpdate = p.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(r, t) {
    k(e, t, r);
  });
};
var ee = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, te = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, re = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, ne = /[A-Z0-9]/g, oe = typeof document < "u", ie = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
s.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(s.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(r) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: r });
  } });
});
var R = a.event;
function le() {
}
function ue() {
  return this.cancelBubble;
}
function _e() {
  return this.defaultPrevented;
}
a.event = function(e) {
  return R && (e = R(e)), e.persist = le, e.isPropagationStopped = ue, e.isDefaultPrevented = _e, e.nativeEvent = e;
};
var ae = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, O = a.vnode;
a.vnode = function(e) {
  typeof e.type == "string" && function(r) {
    var t = r.props, n = r.type, o = {}, _ = n.indexOf("-") === -1;
    for (var i in t) {
      var u = t[i];
      if (!(i === "value" && "defaultValue" in t && u == null || oe && i === "children" && n === "noscript" || i === "class" || i === "className")) {
        var l = i.toLowerCase();
        i === "defaultValue" && "value" in t && t.value == null ? i = "value" : i === "download" && u === !0 ? u = "" : l === "translate" && u === "no" ? u = !1 : l[0] === "o" && l[1] === "n" ? l === "ondoubleclick" ? i = "ondblclick" : l !== "onchange" || n !== "input" && n !== "textarea" || ie(t.type) ? l === "onfocus" ? i = "onfocusin" : l === "onblur" ? i = "onfocusout" : re.test(i) && (i = l) : l = i = "oninput" : _ && te.test(i) ? i = i.replace(ne, "-$&").toLowerCase() : u === null && (u = void 0), l === "oninput" && o[i = l] && (i = "oninputCapture"), o[i] = u;
      }
    }
    n == "select" && o.multiple && Array.isArray(o.value) && (o.value = f(t.children).forEach(function(c) {
      c.props.selected = o.value.indexOf(c.props.value) != -1;
    })), n == "select" && o.defaultValue != null && (o.value = f(t.children).forEach(function(c) {
      c.props.selected = o.multiple ? o.defaultValue.indexOf(c.props.value) != -1 : o.defaultValue == c.props.value;
    })), t.class && !t.className ? (o.class = t.class, Object.defineProperty(o, "className", ae)) : (t.className && !t.class || t.class && t.className) && (o.class = o.className = t.className), r.props = o;
  }(e), e.$$typeof = ee, O && O(e);
};
var C = a.__r;
a.__r = function(e) {
  C && C(e), e.__c;
};
var E = a.diffed;
a.diffed = function(e) {
  E && E(e);
  var r = e.props, t = e.__e;
  t != null && e.type === "textarea" && "value" in r && r.value !== t.value && (t.value = r.value == null ? "" : r.value);
};
function ce(e, r) {
  for (var t in r) e[t] = r[t];
  return e;
}
function S(e, r) {
  for (var t in e) if (t !== "__source" && !(t in r)) return !0;
  for (var n in r) if (n !== "__source" && e[n] !== r[n]) return !0;
  return !1;
}
function x(e, r) {
  this.props = e, this.context = r;
}
(x.prototype = new s()).isPureReactComponent = !0, x.prototype.shouldComponentUpdate = function(e, r) {
  return S(this.props, e) || S(this.state, r);
};
var V = a.__b;
a.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), V && V(e);
};
var se = a.__e;
a.__e = function(e, r, t, n) {
  if (e.then) {
    for (var o, _ = r; _ = _.__; ) if ((o = _.__c) && o.__c) return r.__e == null && (r.__e = t.__e, r.__k = t.__k), o.__c(e, r);
  }
  se(e, r, t, n);
};
var $ = a.unmount;
function D(e, r, t) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(n) {
    typeof n.__c == "function" && n.__c();
  }), e.__c.__H = null), (e = ce({}, e)).__c != null && (e.__c.__P === t && (e.__c.__P = r), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(n) {
    return D(n, r, t);
  })), e;
}
function M(e, r, t) {
  return e && t && (e.__v = null, e.__k = e.__k && e.__k.map(function(n) {
    return M(n, r, t);
  }), e.__c && e.__c.__P === r && (e.__e && t.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = t)), e;
}
function y() {
  this.__u = 0, this.o = null, this.__b = null;
}
function j(e) {
  var r = e.__.__c;
  return r && r.__a && r.__a(e);
}
function v() {
  this.i = null, this.l = null;
}
a.unmount = function(e) {
  var r = e.__c;
  r && r.__R && r.__R(), r && 32 & e.__u && (e.type = null), $ && $(e);
}, (y.prototype = new s()).__c = function(e, r) {
  var t = r.__c, n = this;
  n.o == null && (n.o = []), n.o.push(t);
  var o = j(n.__v), _ = !1, i = function() {
    _ || (_ = !0, t.__R = null, o ? o(u) : u());
  };
  t.__R = i;
  var u = function() {
    if (!--n.__u) {
      if (n.state.__a) {
        var l = n.state.__a;
        n.__v.__k[0] = M(l, l.__c.__P, l.__c.__O);
      }
      var c;
      for (n.setState({ __a: n.__b = null }); c = n.o.pop(); ) c.forceUpdate();
    }
  };
  n.__u++ || 32 & r.__u || n.setState({ __a: n.__b = n.__v.__k[0] }), e.then(i, i);
}, y.prototype.componentWillUnmount = function() {
  this.o = [];
}, y.prototype.render = function(e, r) {
  if (this.__b) {
    if (this.__v.__k) {
      var t = document.createElement("div"), n = this.__v.__k[0].__c;
      this.__v.__k[0] = D(this.__b, t, n.__O = n.__P);
    }
    this.__b = null;
  }
  var o = r.__a && d(h, null, e.fallback);
  return o && (o.__u &= -33), [d(h, null, r.__a ? null : e.children), o];
};
var L = function(e, r, t) {
  if (++t[1] === t[0] && e.l.delete(r), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (t = e.i; t; ) {
    for (; t.length > 3; ) t.pop()();
    if (t[1] < t[0]) break;
    e.i = t = t[2];
  }
};
(v.prototype = new s()).__a = function(e) {
  var r = this, t = j(r.__v), n = r.l.get(e);
  return n[0]++, function(o) {
    var _ = function() {
      r.props.revealOrder ? (n.push(o), L(r, e, n)) : o();
    };
    t ? t(_) : _();
  };
}, v.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var r = f(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && r.reverse();
  for (var t = r.length; t--; ) this.l.set(r[t], this.i = [1, 0, this.i]);
  return e.children;
}, v.prototype.componentDidUpdate = v.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(r, t) {
    L(e, t, r);
  });
};
var fe = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, pe = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, ve = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, de = /[A-Z0-9]/g, he = typeof document < "u", me = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
s.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(s.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(r) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: r });
  } });
});
var N = a.event;
function ye() {
}
function ge() {
  return this.cancelBubble;
}
function be() {
  return this.defaultPrevented;
}
a.event = function(e) {
  return N && (e = N(e)), e.persist = ye, e.isPropagationStopped = ge, e.isDefaultPrevented = be, e.nativeEvent = e;
};
var we = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, U = a.vnode;
a.vnode = function(e) {
  typeof e.type == "string" && function(r) {
    var t = r.props, n = r.type, o = {}, _ = n.indexOf("-") === -1;
    for (var i in t) {
      var u = t[i];
      if (!(i === "value" && "defaultValue" in t && u == null || he && i === "children" && n === "noscript" || i === "class" || i === "className")) {
        var l = i.toLowerCase();
        i === "defaultValue" && "value" in t && t.value == null ? i = "value" : i === "download" && u === !0 ? u = "" : l === "translate" && u === "no" ? u = !1 : l[0] === "o" && l[1] === "n" ? l === "ondoubleclick" ? i = "ondblclick" : l !== "onchange" || n !== "input" && n !== "textarea" || me(t.type) ? l === "onfocus" ? i = "onfocusin" : l === "onblur" ? i = "onfocusout" : ve.test(i) && (i = l) : l = i = "oninput" : _ && pe.test(i) ? i = i.replace(de, "-$&").toLowerCase() : u === null && (u = void 0), l === "oninput" && o[i = l] && (i = "oninputCapture"), o[i] = u;
      }
    }
    n == "select" && o.multiple && Array.isArray(o.value) && (o.value = f(t.children).forEach(function(c) {
      c.props.selected = o.value.indexOf(c.props.value) != -1;
    })), n == "select" && o.defaultValue != null && (o.value = f(t.children).forEach(function(c) {
      c.props.selected = o.multiple ? o.defaultValue.indexOf(c.props.value) != -1 : o.defaultValue == c.props.value;
    })), t.class && !t.className ? (o.class = t.class, Object.defineProperty(o, "className", we)) : (t.className && !t.class || t.class && t.className) && (o.class = o.className = t.className), r.props = o;
  }(e), e.$$typeof = fe, U && U(e);
};
var W = a.__r;
a.__r = function(e) {
  W && W(e), e.__c;
};
var A = a.diffed;
a.diffed = function(e) {
  A && A(e);
  var r = e.props, t = e.__e;
  t != null && e.type === "textarea" && "value" in r && r.value !== t.value && (t.value = r.value == null ? "" : r.value);
};
const Pe = q({
  registry: null,
  isInitializing: !0,
  pluginsReady: !1
});
function ke() {
  const e = G(Pe);
  if (e === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: r, isInitializing: t } = e;
  if (t)
    return e;
  if (r === null)
    throw new Error("PDF registry failed to initialize properly");
  return e;
}
function F(e) {
  const { registry: r } = ke();
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
function Re(e) {
  const { plugin: r, isLoading: t, ready: n } = F(e);
  if (!r)
    return {
      provides: null,
      isLoading: t,
      ready: n
    };
  if (!r.provides)
    throw new Error(`Plugin ${e} does not provide a capability`);
  return {
    provides: r.provides(),
    isLoading: t,
    ready: n
  };
}
const Oe = () => F(H.id), Ce = () => Re(H.id);
function Ee() {
  const { plugin: e } = Oe(), r = I(null);
  return Z(() => {
    if (!e) return;
    const t = r.current;
    if (!t) return;
    const n = () => {
      const u = t.getBoundingClientRect();
      return {
        origin: { x: u.left, y: u.top },
        size: { width: u.width, height: u.height }
      };
    };
    e.registerBoundingRectProvider(n);
    const o = () => {
      e.setViewportScrollMetrics({
        scrollTop: t.scrollTop,
        scrollLeft: t.scrollLeft
      });
    };
    t.addEventListener("scroll", o);
    const _ = new ResizeObserver(() => {
      e.setViewportResizeMetrics({
        width: t.offsetWidth,
        height: t.offsetHeight,
        clientWidth: t.clientWidth,
        clientHeight: t.clientHeight,
        scrollTop: t.scrollTop,
        scrollLeft: t.scrollLeft,
        scrollWidth: t.scrollWidth,
        scrollHeight: t.scrollHeight
      });
    });
    _.observe(t);
    const i = e.onScrollRequest(
      ({ x: u, y: l, behavior: c = "auto" }) => {
        requestAnimationFrame(() => {
          t.scrollTo({ left: u, top: l, behavior: c });
        });
      }
    );
    return () => {
      e.registerBoundingRectProvider(null), t.removeEventListener("scroll", o), _.disconnect(), i();
    };
  }, [e]), r;
}
function Le({ children: e, ...r }) {
  const [t, n] = J(0), o = Ee(), { provides: _ } = Ce();
  K(() => {
    _ && n(_.getViewportGap());
  }, [_]);
  const { style: i, ...u } = r;
  return /* @__PURE__ */ Q(
    "div",
    {
      ...u,
      ref: o,
      style: {
        ...typeof i == "object" ? i : {},
        padding: `${t}px`
      },
      children: e
    }
  );
}
export {
  Le as Viewport,
  Ce as useViewportCapability,
  Oe as useViewportPlugin,
  Ee as useViewportRef
};
//# sourceMappingURL=index.js.map
