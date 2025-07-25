import { Component as s, options as l, createElement as h, Fragment as y, toChildArray as f, createContext as oe } from "preact";
import { useContext as ue, useState as F, useEffect as m, useRef as T, useCallback as ie } from "preact/hooks";
import { I as Z, i as _e } from "../reducer-Dda407Go.js";
import { u as k } from "../jsxRuntime.module-D89ud_rY.js";
import { c as G, r as le } from "../index-Q-vI1_iw.js";
function ae(e, n) {
  for (var t in n) e[t] = n[t];
  return e;
}
function E(e, n) {
  for (var t in e) if (t !== "__source" && !(t in n)) return !0;
  for (var r in n) if (r !== "__source" && e[r] !== n[r]) return !0;
  return !1;
}
function O(e, n) {
  this.props = e, this.context = n;
}
(O.prototype = new s()).isPureReactComponent = !0, O.prototype.shouldComponentUpdate = function(e, n) {
  return E(this.props, e) || E(this.state, n);
};
var S = l.__b;
l.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), S && S(e);
};
var ce = l.__e;
l.__e = function(e, n, t, r) {
  if (e.then) {
    for (var o, _ = n; _ = _.__; ) if ((o = _.__c) && o.__c) return n.__e == null && (n.__e = t.__e, n.__k = t.__k), o.__c(e, n);
  }
  ce(e, n, t, r);
};
var I = l.unmount;
function X(e, n, t) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), e.__c.__H = null), (e = ae({}, e)).__c != null && (e.__c.__P === t && (e.__c.__P = n), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(r) {
    return X(r, n, t);
  })), e;
}
function q(e, n, t) {
  return e && t && (e.__v = null, e.__k = e.__k && e.__k.map(function(r) {
    return q(r, n, t);
  }), e.__c && e.__c.__P === n && (e.__e && t.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = t)), e;
}
function b() {
  this.__u = 0, this.o = null, this.__b = null;
}
function J(e) {
  var n = e.__.__c;
  return n && n.__a && n.__a(e);
}
function v() {
  this.i = null, this.l = null;
}
l.unmount = function(e) {
  var n = e.__c;
  n && n.__R && n.__R(), n && 32 & e.__u && (e.type = null), I && I(e);
}, (b.prototype = new s()).__c = function(e, n) {
  var t = n.__c, r = this;
  r.o == null && (r.o = []), r.o.push(t);
  var o = J(r.__v), _ = !1, u = function() {
    _ || (_ = !0, t.__R = null, o ? o(a) : a());
  };
  t.__R = u;
  var a = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var i = r.state.__a;
        r.__v.__k[0] = q(i, i.__c.__P, i.__c.__O);
      }
      var c;
      for (r.setState({ __a: r.__b = null }); c = r.o.pop(); ) c.forceUpdate();
    }
  };
  r.__u++ || 32 & n.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(u, u);
}, b.prototype.componentWillUnmount = function() {
  this.o = [];
}, b.prototype.render = function(e, n) {
  if (this.__b) {
    if (this.__v.__k) {
      var t = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = X(this.__b, t, r.__O = r.__P);
    }
    this.__b = null;
  }
  var o = n.__a && h(y, null, e.fallback);
  return o && (o.__u &= -33), [h(y, null, n.__a ? null : e.children), o];
};
var R = function(e, n, t) {
  if (++t[1] === t[0] && e.l.delete(n), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (t = e.i; t; ) {
    for (; t.length > 3; ) t.pop()();
    if (t[1] < t[0]) break;
    e.i = t = t[2];
  }
};
(v.prototype = new s()).__a = function(e) {
  var n = this, t = J(n.__v), r = n.l.get(e);
  return r[0]++, function(o) {
    var _ = function() {
      n.props.revealOrder ? (r.push(o), R(n, e, r)) : o();
    };
    t ? t(_) : _();
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
    R(e, t, n);
  });
};
var se = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, fe = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, pe = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, ve = /[A-Z0-9]/g, de = typeof document < "u", he = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
s.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(s.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(n) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: n });
  } });
});
var $ = l.event;
function ye() {
}
function me() {
  return this.cancelBubble;
}
function ge() {
  return this.defaultPrevented;
}
l.event = function(e) {
  return $ && (e = $(e)), e.persist = ye, e.isPropagationStopped = me, e.isDefaultPrevented = ge, e.nativeEvent = e;
};
var be = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, N = l.vnode;
l.vnode = function(e) {
  typeof e.type == "string" && function(n) {
    var t = n.props, r = n.type, o = {}, _ = r.indexOf("-") === -1;
    for (var u in t) {
      var a = t[u];
      if (!(u === "value" && "defaultValue" in t && a == null || de && u === "children" && r === "noscript" || u === "class" || u === "className")) {
        var i = u.toLowerCase();
        u === "defaultValue" && "value" in t && t.value == null ? u = "value" : u === "download" && a === !0 ? a = "" : i === "translate" && a === "no" ? a = !1 : i[0] === "o" && i[1] === "n" ? i === "ondoubleclick" ? u = "ondblclick" : i !== "onchange" || r !== "input" && r !== "textarea" || he(t.type) ? i === "onfocus" ? u = "onfocusin" : i === "onblur" ? u = "onfocusout" : pe.test(u) && (u = i) : i = u = "oninput" : _ && fe.test(u) ? u = u.replace(ve, "-$&").toLowerCase() : a === null && (a = void 0), i === "oninput" && o[u = i] && (u = "oninputCapture"), o[u] = a;
      }
    }
    r == "select" && o.multiple && Array.isArray(o.value) && (o.value = f(t.children).forEach(function(c) {
      c.props.selected = o.value.indexOf(c.props.value) != -1;
    })), r == "select" && o.defaultValue != null && (o.value = f(t.children).forEach(function(c) {
      c.props.selected = o.multiple ? o.defaultValue.indexOf(c.props.value) != -1 : o.defaultValue == c.props.value;
    })), t.class && !t.className ? (o.class = t.class, Object.defineProperty(o, "className", be)) : (t.className && !t.class || t.class && t.className) && (o.class = o.className = t.className), n.props = o;
  }(e), e.$$typeof = se, N && N(e);
};
var U = l.__r;
l.__r = function(e) {
  U && U(e), e.__c;
};
var A = l.diffed;
l.diffed = function(e) {
  A && A(e);
  var n = e.props, t = e.__e;
  t != null && e.type === "textarea" && "value" in n && n.value !== t.value && (t.value = n.value == null ? "" : n.value);
};
const Pe = oe({
  registry: null,
  isInitializing: !0,
  pluginsReady: !1
});
function ke() {
  const e = ue(Pe);
  if (e === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: n, isInitializing: t } = e;
  if (t)
    return e;
  if (n === null)
    throw new Error("PDF registry failed to initialize properly");
  return e;
}
function K(e) {
  const { registry: n } = ke();
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
function Ce(e) {
  const { plugin: n, isLoading: t, ready: r } = K(e);
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
function we(e, n) {
  for (var t in n) e[t] = n[t];
  return e;
}
function M(e, n) {
  for (var t in e) if (t !== "__source" && !(t in n)) return !0;
  for (var r in n) if (r !== "__source" && e[r] !== n[r]) return !0;
  return !1;
}
function V(e, n) {
  this.props = e, this.context = n;
}
(V.prototype = new s()).isPureReactComponent = !0, V.prototype.shouldComponentUpdate = function(e, n) {
  return M(this.props, e) || M(this.state, n);
};
var L = l.__b;
l.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), L && L(e);
};
var xe = l.__e;
l.__e = function(e, n, t, r) {
  if (e.then) {
    for (var o, _ = n; _ = _.__; ) if ((o = _.__c) && o.__c) return n.__e == null && (n.__e = t.__e, n.__k = t.__k), o.__c(e, n);
  }
  xe(e, n, t, r);
};
var H = l.unmount;
function Q(e, n, t) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), e.__c.__H = null), (e = we({}, e)).__c != null && (e.__c.__P === t && (e.__c.__P = n), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(r) {
    return Q(r, n, t);
  })), e;
}
function Y(e, n, t) {
  return e && t && (e.__v = null, e.__k = e.__k && e.__k.map(function(r) {
    return Y(r, n, t);
  }), e.__c && e.__c.__P === n && (e.__e && t.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = t)), e;
}
function P() {
  this.__u = 0, this.o = null, this.__b = null;
}
function ee(e) {
  var n = e.__.__c;
  return n && n.__a && n.__a(e);
}
function d() {
  this.i = null, this.l = null;
}
l.unmount = function(e) {
  var n = e.__c;
  n && n.__R && n.__R(), n && 32 & e.__u && (e.type = null), H && H(e);
}, (P.prototype = new s()).__c = function(e, n) {
  var t = n.__c, r = this;
  r.o == null && (r.o = []), r.o.push(t);
  var o = ee(r.__v), _ = !1, u = function() {
    _ || (_ = !0, t.__R = null, o ? o(a) : a());
  };
  t.__R = u;
  var a = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var i = r.state.__a;
        r.__v.__k[0] = Y(i, i.__c.__P, i.__c.__O);
      }
      var c;
      for (r.setState({ __a: r.__b = null }); c = r.o.pop(); ) c.forceUpdate();
    }
  };
  r.__u++ || 32 & n.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(u, u);
}, P.prototype.componentWillUnmount = function() {
  this.o = [];
}, P.prototype.render = function(e, n) {
  if (this.__b) {
    if (this.__v.__k) {
      var t = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = Q(this.__b, t, r.__O = r.__P);
    }
    this.__b = null;
  }
  var o = n.__a && h(y, null, e.fallback);
  return o && (o.__u &= -33), [h(y, null, n.__a ? null : e.children), o];
};
var W = function(e, n, t) {
  if (++t[1] === t[0] && e.l.delete(n), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (t = e.i; t; ) {
    for (; t.length > 3; ) t.pop()();
    if (t[1] < t[0]) break;
    e.i = t = t[2];
  }
};
(d.prototype = new s()).__a = function(e) {
  var n = this, t = ee(n.__v), r = n.l.get(e);
  return r[0]++, function(o) {
    var _ = function() {
      n.props.revealOrder ? (r.push(o), W(n, e, r)) : o();
    };
    t ? t(_) : _();
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
    W(e, t, n);
  });
};
var Ee = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, Oe = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Se = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Ie = /[A-Z0-9]/g, Re = typeof document < "u", $e = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
s.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(s.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(n) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: n });
  } });
});
var z = l.event;
function Ne() {
}
function Ue() {
  return this.cancelBubble;
}
function Ae() {
  return this.defaultPrevented;
}
l.event = function(e) {
  return z && (e = z(e)), e.persist = Ne, e.isPropagationStopped = Ue, e.isDefaultPrevented = Ae, e.nativeEvent = e;
};
var Me = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, D = l.vnode;
l.vnode = function(e) {
  typeof e.type == "string" && function(n) {
    var t = n.props, r = n.type, o = {}, _ = r.indexOf("-") === -1;
    for (var u in t) {
      var a = t[u];
      if (!(u === "value" && "defaultValue" in t && a == null || Re && u === "children" && r === "noscript" || u === "class" || u === "className")) {
        var i = u.toLowerCase();
        u === "defaultValue" && "value" in t && t.value == null ? u = "value" : u === "download" && a === !0 ? a = "" : i === "translate" && a === "no" ? a = !1 : i[0] === "o" && i[1] === "n" ? i === "ondoubleclick" ? u = "ondblclick" : i !== "onchange" || r !== "input" && r !== "textarea" || $e(t.type) ? i === "onfocus" ? u = "onfocusin" : i === "onblur" ? u = "onfocusout" : Se.test(u) && (u = i) : i = u = "oninput" : _ && Oe.test(u) ? u = u.replace(Ie, "-$&").toLowerCase() : a === null && (a = void 0), i === "oninput" && o[u = i] && (u = "oninputCapture"), o[u] = a;
      }
    }
    r == "select" && o.multiple && Array.isArray(o.value) && (o.value = f(t.children).forEach(function(c) {
      c.props.selected = o.value.indexOf(c.props.value) != -1;
    })), r == "select" && o.defaultValue != null && (o.value = f(t.children).forEach(function(c) {
      c.props.selected = o.multiple ? o.defaultValue.indexOf(c.props.value) != -1 : o.defaultValue == c.props.value;
    })), t.class && !t.className ? (o.class = t.class, Object.defineProperty(o, "className", Me)) : (t.className && !t.class || t.class && t.className) && (o.class = o.className = t.className), n.props = o;
  }(e), e.$$typeof = Ee, D && D(e);
};
var j = l.__r;
l.__r = function(e) {
  j && j(e), e.__c;
};
var B = l.diffed;
l.diffed = function(e) {
  B && B(e);
  var n = e.props, t = e.__e;
  t != null && e.type === "textarea" && "value" in n && n.value !== t.value && (t.value = n.value == null ? "" : n.value);
};
const je = () => K(Z.id), p = () => Ce(Z.id);
function Be() {
  const { provides: e } = p(), [n, t] = F(_e);
  return m(() => {
    if (e)
      return e.onStateChange((r) => {
        t(r);
      });
  }, [e]), {
    provides: e,
    state: n
  };
}
function Fe() {
  const { provides: e } = p();
  return {
    setCursor: (n, t, r = 0) => {
      e == null || e.setCursor(n, t, r);
    },
    removeCursor: (n) => {
      e == null || e.removeCursor(n);
    }
  };
}
function Te({ modeId: e, pageIndex: n }) {
  const { provides: t } = p();
  return {
    register: (r, o) => {
      const _ = (o == null ? void 0 : o.modeId) ?? e, u = (o == null ? void 0 : o.pageIndex) ?? n;
      return _ ? t == null ? void 0 : t.registerHandlers({
        modeId: _,
        handlers: r,
        pageIndex: u
      }) : t == null ? void 0 : t.registerAlways({
        scope: u !== void 0 ? { type: "page", pageIndex: u } : { type: "global" },
        handlers: r
      });
    }
  };
}
function Ve() {
  const { provides: e } = p(), [n, t] = F(() => {
    const r = e == null ? void 0 : e.getActiveInteractionMode();
    return (r == null ? void 0 : r.scope) === "page" && !!r.exclusive;
  });
  return m(() => {
    if (e)
      return e.onModeChange(() => {
        const r = e.getActiveInteractionMode();
        t((r == null ? void 0 : r.scope) === "page" && !!(r != null && r.exclusive));
      });
  }, [e]), n;
}
const Ze = ({
  children: e,
  style: n,
  ...t
}) => {
  const r = T(null), { provides: o } = p();
  return m(() => {
    if (!(!o || !r.current))
      return G(o, { type: "global" }, r.current);
  }, [o]), /* @__PURE__ */ k(
    "div",
    {
      ref: r,
      style: {
        width: "100%",
        height: "100%",
        ...n
      },
      ...t,
      children: e
    }
  );
}, Ge = ({
  pageIndex: e,
  children: n,
  pageWidth: t,
  pageHeight: r,
  rotation: o,
  scale: _,
  convertEventToPoint: u,
  style: a,
  ...i
}) => {
  const c = T(null), { provides: g } = p(), te = Ve(), C = ie(
    (w, ne) => {
      const x = ne.getBoundingClientRect(), re = {
        x: w.clientX - x.left,
        y: w.clientY - x.top
      };
      return le(
        { width: t, height: r },
        re,
        o,
        _
      );
    },
    [t, r, o, _]
  );
  return m(() => {
    if (!(!g || !c.current))
      return G(
        g,
        { type: "page", pageIndex: e },
        c.current,
        u || C
      );
  }, [g, e, u, C]), /* @__PURE__ */ k(
    "div",
    {
      ref: c,
      style: {
        ...a
      },
      ...i,
      children: [
        n,
        te && /* @__PURE__ */ k("div", { style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 } })
      ]
    }
  );
};
export {
  Ze as GlobalPointerProvider,
  Ge as PagePointerProvider,
  Fe as useCursor,
  Be as useInteractionManager,
  p as useInteractionManagerCapability,
  je as useInteractionManagerPlugin,
  Ve as useIsPageExclusive,
  Te as usePointerHandlers
};
//# sourceMappingURL=index.js.map
