import { Component as c, options as l, createElement as d, Fragment as h, toChildArray as p, createContext as ge } from "preact";
import { useContext as be, useState as A, useRef as ze, useEffect as w, useCallback as De, useMemo as Fe } from "preact/hooks";
import { e as ke, g as L, l as M, P as je } from "../selection-plugin-Bns-tQIi.js";
import { u as V } from "../jsxRuntime.module-D89ud_rY.js";
import { w as Be } from "../index-Q-vI1_iw-B7e7p3tz.js";
function Te(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function W(e, t) {
  for (var n in e) if (n !== "__source" && !(n in t)) return !0;
  for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
  return !1;
}
function H(e, t) {
  this.props = e, this.context = t;
}
(H.prototype = new c()).isPureReactComponent = !0, H.prototype.shouldComponentUpdate = function(e, t) {
  return W(this.props, e) || W(this.state, t);
};
var z = l.__b;
l.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), z && z(e);
};
var Ie = l.__e;
l.__e = function(e, t, n, r) {
  if (e.then) {
    for (var o, u = t; u = u.__; ) if ((o = u.__c) && o.__c) return t.__e == null && (t.__e = n.__e, t.__k = n.__k), o.__c(e, t);
  }
  Ie(e, t, n, r);
};
var D = l.unmount;
function Pe(e, t, n) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), e.__c.__H = null), (e = Te({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(r) {
    return Pe(r, t, n);
  })), e;
}
function we(e, t, n) {
  return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(r) {
    return we(r, t, n);
  }), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function $() {
  this.__u = 0, this.o = null, this.__b = null;
}
function Ce(e) {
  var t = e.__.__c;
  return t && t.__a && t.__a(e);
}
function g() {
  this.i = null, this.l = null;
}
l.unmount = function(e) {
  var t = e.__c;
  t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), D && D(e);
}, ($.prototype = new c()).__c = function(e, t) {
  var n = t.__c, r = this;
  r.o == null && (r.o = []), r.o.push(n);
  var o = Ce(r.__v), u = !1, i = function() {
    u || (u = !0, n.__R = null, o ? o(a) : a());
  };
  n.__R = i;
  var a = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var _ = r.state.__a;
        r.__v.__k[0] = we(_, _.__c.__P, _.__c.__O);
      }
      var s;
      for (r.setState({ __a: r.__b = null }); s = r.o.pop(); ) s.forceUpdate();
    }
  };
  r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(i, i);
}, $.prototype.componentWillUnmount = function() {
  this.o = [];
}, $.prototype.render = function(e, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = Pe(this.__b, n, r.__O = r.__P);
    }
    this.__b = null;
  }
  var o = t.__a && d(h, null, e.fallback);
  return o && (o.__u &= -33), [d(h, null, t.__a ? null : e.children), o];
};
var F = function(e, t, n) {
  if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    e.i = n = n[2];
  }
};
(g.prototype = new c()).__a = function(e) {
  var t = this, n = Ce(t.__v), r = t.l.get(e);
  return r[0]++, function(o) {
    var u = function() {
      t.props.revealOrder ? (r.push(o), F(t, e, r)) : o();
    };
    n ? n(u) : u();
  };
}, g.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var t = p(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
  for (var n = t.length; n--; ) this.l.set(t[n], this.i = [1, 0, this.i]);
  return e.children;
}, g.prototype.componentDidUpdate = g.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(t, n) {
    F(e, n, t);
  });
};
var Ze = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, Ge = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, qe = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Je = /[A-Z0-9]/g, Ke = typeof document < "u", Qe = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
c.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(c.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(t) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
  } });
});
var j = l.event;
function Xe() {
}
function Ye() {
  return this.cancelBubble;
}
function et() {
  return this.defaultPrevented;
}
l.event = function(e) {
  return j && (e = j(e)), e.persist = Xe, e.isPropagationStopped = Ye, e.isDefaultPrevented = et, e.nativeEvent = e;
};
var tt = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, B = l.vnode;
l.vnode = function(e) {
  typeof e.type == "string" && function(t) {
    var n = t.props, r = t.type, o = {}, u = r.indexOf("-") === -1;
    for (var i in n) {
      var a = n[i];
      if (!(i === "value" && "defaultValue" in n && a == null || Ke && i === "children" && r === "noscript" || i === "class" || i === "className")) {
        var _ = i.toLowerCase();
        i === "defaultValue" && "value" in n && n.value == null ? i = "value" : i === "download" && a === !0 ? a = "" : _ === "translate" && a === "no" ? a = !1 : _[0] === "o" && _[1] === "n" ? _ === "ondoubleclick" ? i = "ondblclick" : _ !== "onchange" || r !== "input" && r !== "textarea" || Qe(n.type) ? _ === "onfocus" ? i = "onfocusin" : _ === "onblur" ? i = "onfocusout" : qe.test(i) && (i = _) : _ = i = "oninput" : u && Ge.test(i) ? i = i.replace(Je, "-$&").toLowerCase() : a === null && (a = void 0), _ === "oninput" && o[i = _] && (i = "oninputCapture"), o[i] = a;
      }
    }
    r == "select" && o.multiple && Array.isArray(o.value) && (o.value = p(n.children).forEach(function(s) {
      s.props.selected = o.value.indexOf(s.props.value) != -1;
    })), r == "select" && o.defaultValue != null && (o.value = p(n.children).forEach(function(s) {
      s.props.selected = o.multiple ? o.defaultValue.indexOf(s.props.value) != -1 : o.defaultValue == s.props.value;
    })), n.class && !n.className ? (o.class = n.class, Object.defineProperty(o, "className", tt)) : (n.className && !n.class || n.class && n.className) && (o.class = o.className = n.className), t.props = o;
  }(e), e.$$typeof = Ze, B && B(e);
};
var T = l.__r;
l.__r = function(e) {
  T && T(e), e.__c;
};
var I = l.diffed;
l.diffed = function(e) {
  I && I(e);
  var t = e.props, n = e.__e;
  n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
const nt = ge({
  registry: null,
  isInitializing: !0,
  pluginsReady: !1
});
function rt() {
  const e = be(nt);
  if (e === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: t, isInitializing: n } = e;
  if (n)
    return e;
  if (t === null)
    throw new Error("PDF registry failed to initialize properly");
  return e;
}
function $e(e) {
  const { registry: t } = rt();
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
function ot(e) {
  const { plugin: t, isLoading: n, ready: r } = $e(e);
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
const Oe = () => ot(ke.id), Xt = () => $e(ke.id);
function it(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function Z(e, t) {
  for (var n in e) if (n !== "__source" && !(n in t)) return !0;
  for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
  return !1;
}
function G(e, t) {
  this.props = e, this.context = t;
}
(G.prototype = new c()).isPureReactComponent = !0, G.prototype.shouldComponentUpdate = function(e, t) {
  return Z(this.props, e) || Z(this.state, t);
};
var q = l.__b;
l.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), q && q(e);
};
var _t = l.__e;
l.__e = function(e, t, n, r) {
  if (e.then) {
    for (var o, u = t; u = u.__; ) if ((o = u.__c) && o.__c) return t.__e == null && (t.__e = n.__e, t.__k = n.__k), o.__c(e, t);
  }
  _t(e, t, n, r);
};
var J = l.unmount;
function Ee(e, t, n) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), e.__c.__H = null), (e = it({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(r) {
    return Ee(r, t, n);
  })), e;
}
function Se(e, t, n) {
  return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(r) {
    return Se(r, t, n);
  }), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function O() {
  this.__u = 0, this.o = null, this.__b = null;
}
function Re(e) {
  var t = e.__.__c;
  return t && t.__a && t.__a(e);
}
function b() {
  this.i = null, this.l = null;
}
l.unmount = function(e) {
  var t = e.__c;
  t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), J && J(e);
}, (O.prototype = new c()).__c = function(e, t) {
  var n = t.__c, r = this;
  r.o == null && (r.o = []), r.o.push(n);
  var o = Re(r.__v), u = !1, i = function() {
    u || (u = !0, n.__R = null, o ? o(a) : a());
  };
  n.__R = i;
  var a = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var _ = r.state.__a;
        r.__v.__k[0] = Se(_, _.__c.__P, _.__c.__O);
      }
      var s;
      for (r.setState({ __a: r.__b = null }); s = r.o.pop(); ) s.forceUpdate();
    }
  };
  r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(i, i);
}, O.prototype.componentWillUnmount = function() {
  this.o = [];
}, O.prototype.render = function(e, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = Ee(this.__b, n, r.__O = r.__P);
    }
    this.__b = null;
  }
  var o = t.__a && d(h, null, e.fallback);
  return o && (o.__u &= -33), [d(h, null, t.__a ? null : e.children), o];
};
var K = function(e, t, n) {
  if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    e.i = n = n[2];
  }
};
(b.prototype = new c()).__a = function(e) {
  var t = this, n = Re(t.__v), r = t.l.get(e);
  return r[0]++, function(o) {
    var u = function() {
      t.props.revealOrder ? (r.push(o), K(t, e, r)) : o();
    };
    n ? n(u) : u();
  };
}, b.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var t = p(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
  for (var n = t.length; n--; ) this.l.set(t[n], this.i = [1, 0, this.i]);
  return e.children;
}, b.prototype.componentDidUpdate = b.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(t, n) {
    K(e, n, t);
  });
};
var lt = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, ut = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, at = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, st = /[A-Z0-9]/g, ct = typeof document < "u", ft = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
c.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(c.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(t) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
  } });
});
var Q = l.event;
function pt() {
}
function vt() {
  return this.cancelBubble;
}
function dt() {
  return this.defaultPrevented;
}
l.event = function(e) {
  return Q && (e = Q(e)), e.persist = pt, e.isPropagationStopped = vt, e.isDefaultPrevented = dt, e.nativeEvent = e;
};
var ht = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, X = l.vnode;
l.vnode = function(e) {
  typeof e.type == "string" && function(t) {
    var n = t.props, r = t.type, o = {}, u = r.indexOf("-") === -1;
    for (var i in n) {
      var a = n[i];
      if (!(i === "value" && "defaultValue" in n && a == null || ct && i === "children" && r === "noscript" || i === "class" || i === "className")) {
        var _ = i.toLowerCase();
        i === "defaultValue" && "value" in n && n.value == null ? i = "value" : i === "download" && a === !0 ? a = "" : _ === "translate" && a === "no" ? a = !1 : _[0] === "o" && _[1] === "n" ? _ === "ondoubleclick" ? i = "ondblclick" : _ !== "onchange" || r !== "input" && r !== "textarea" || ft(n.type) ? _ === "onfocus" ? i = "onfocusin" : _ === "onblur" ? i = "onfocusout" : at.test(i) && (i = _) : _ = i = "oninput" : u && ut.test(i) ? i = i.replace(st, "-$&").toLowerCase() : a === null && (a = void 0), _ === "oninput" && o[i = _] && (i = "oninputCapture"), o[i] = a;
      }
    }
    r == "select" && o.multiple && Array.isArray(o.value) && (o.value = p(n.children).forEach(function(s) {
      s.props.selected = o.value.indexOf(s.props.value) != -1;
    })), r == "select" && o.defaultValue != null && (o.value = p(n.children).forEach(function(s) {
      s.props.selected = o.multiple ? o.defaultValue.indexOf(s.props.value) != -1 : o.defaultValue == s.props.value;
    })), n.class && !n.className ? (o.class = n.class, Object.defineProperty(o, "className", ht)) : (n.className && !n.class || n.class && n.className) && (o.class = o.className = n.className), t.props = o;
  }(e), e.$$typeof = lt, X && X(e);
};
var Y = l.__r;
l.__r = function(e) {
  Y && Y(e), e.__c;
};
var ee = l.diffed;
l.diffed = function(e) {
  ee && ee(e);
  var t = e.props, n = e.__e;
  n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
function yt(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function te(e, t) {
  for (var n in e) if (n !== "__source" && !(n in t)) return !0;
  for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
  return !1;
}
function ne(e, t) {
  this.props = e, this.context = t;
}
(ne.prototype = new c()).isPureReactComponent = !0, ne.prototype.shouldComponentUpdate = function(e, t) {
  return te(this.props, e) || te(this.state, t);
};
var re = l.__b;
l.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), re && re(e);
};
var mt = l.__e;
l.__e = function(e, t, n, r) {
  if (e.then) {
    for (var o, u = t; u = u.__; ) if ((o = u.__c) && o.__c) return t.__e == null && (t.__e = n.__e, t.__k = n.__k), o.__c(e, t);
  }
  mt(e, t, n, r);
};
var oe = l.unmount;
function xe(e, t, n) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), e.__c.__H = null), (e = yt({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(r) {
    return xe(r, t, n);
  })), e;
}
function Ue(e, t, n) {
  return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(r) {
    return Ue(r, t, n);
  }), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function E() {
  this.__u = 0, this.o = null, this.__b = null;
}
function Ne(e) {
  var t = e.__.__c;
  return t && t.__a && t.__a(e);
}
function k() {
  this.i = null, this.l = null;
}
l.unmount = function(e) {
  var t = e.__c;
  t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), oe && oe(e);
}, (E.prototype = new c()).__c = function(e, t) {
  var n = t.__c, r = this;
  r.o == null && (r.o = []), r.o.push(n);
  var o = Ne(r.__v), u = !1, i = function() {
    u || (u = !0, n.__R = null, o ? o(a) : a());
  };
  n.__R = i;
  var a = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var _ = r.state.__a;
        r.__v.__k[0] = Ue(_, _.__c.__P, _.__c.__O);
      }
      var s;
      for (r.setState({ __a: r.__b = null }); s = r.o.pop(); ) s.forceUpdate();
    }
  };
  r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(i, i);
}, E.prototype.componentWillUnmount = function() {
  this.o = [];
}, E.prototype.render = function(e, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = xe(this.__b, n, r.__O = r.__P);
    }
    this.__b = null;
  }
  var o = t.__a && d(h, null, e.fallback);
  return o && (o.__u &= -33), [d(h, null, t.__a ? null : e.children), o];
};
var ie = function(e, t, n) {
  if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    e.i = n = n[2];
  }
};
(k.prototype = new c()).__a = function(e) {
  var t = this, n = Ne(t.__v), r = t.l.get(e);
  return r[0]++, function(o) {
    var u = function() {
      t.props.revealOrder ? (r.push(o), ie(t, e, r)) : o();
    };
    n ? n(u) : u();
  };
}, k.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var t = p(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
  for (var n = t.length; n--; ) this.l.set(t[n], this.i = [1, 0, this.i]);
  return e.children;
}, k.prototype.componentDidUpdate = k.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(t, n) {
    ie(e, n, t);
  });
};
var gt = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, bt = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, kt = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Pt = /[A-Z0-9]/g, wt = typeof document < "u", Ct = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
c.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(c.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(t) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
  } });
});
var _e = l.event;
function $t() {
}
function Ot() {
  return this.cancelBubble;
}
function Et() {
  return this.defaultPrevented;
}
l.event = function(e) {
  return _e && (e = _e(e)), e.persist = $t, e.isPropagationStopped = Ot, e.isDefaultPrevented = Et, e.nativeEvent = e;
};
var St = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, le = l.vnode;
l.vnode = function(e) {
  typeof e.type == "string" && function(t) {
    var n = t.props, r = t.type, o = {}, u = r.indexOf("-") === -1;
    for (var i in n) {
      var a = n[i];
      if (!(i === "value" && "defaultValue" in n && a == null || wt && i === "children" && r === "noscript" || i === "class" || i === "className")) {
        var _ = i.toLowerCase();
        i === "defaultValue" && "value" in n && n.value == null ? i = "value" : i === "download" && a === !0 ? a = "" : _ === "translate" && a === "no" ? a = !1 : _[0] === "o" && _[1] === "n" ? _ === "ondoubleclick" ? i = "ondblclick" : _ !== "onchange" || r !== "input" && r !== "textarea" || Ct(n.type) ? _ === "onfocus" ? i = "onfocusin" : _ === "onblur" ? i = "onfocusout" : kt.test(i) && (i = _) : _ = i = "oninput" : u && bt.test(i) ? i = i.replace(Pt, "-$&").toLowerCase() : a === null && (a = void 0), _ === "oninput" && o[i = _] && (i = "oninputCapture"), o[i] = a;
      }
    }
    r == "select" && o.multiple && Array.isArray(o.value) && (o.value = p(n.children).forEach(function(s) {
      s.props.selected = o.value.indexOf(s.props.value) != -1;
    })), r == "select" && o.defaultValue != null && (o.value = p(n.children).forEach(function(s) {
      s.props.selected = o.multiple ? o.defaultValue.indexOf(s.props.value) != -1 : o.defaultValue == s.props.value;
    })), n.class && !n.className ? (o.class = n.class, Object.defineProperty(o, "className", St)) : (n.className && !n.class || n.class && n.className) && (o.class = o.className = n.className), t.props = o;
  }(e), e.$$typeof = gt, le && le(e);
};
var ue = l.__r;
l.__r = function(e) {
  ue && ue(e), e.__c;
};
var ae = l.diffed;
l.diffed = function(e) {
  ae && ae(e);
  var t = e.props, n = e.__e;
  n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
const Rt = ge({
  registry: null,
  isInitializing: !0,
  pluginsReady: !1
});
function xt() {
  const e = be(Rt);
  if (e === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: t, isInitializing: n } = e;
  if (n)
    return e;
  if (t === null)
    throw new Error("PDF registry failed to initialize properly");
  return e;
}
function Ut(e) {
  const { registry: t } = xt();
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
function Nt(e) {
  const { plugin: t, isLoading: n, ready: r } = Ut(e);
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
function At(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function se(e, t) {
  for (var n in e) if (n !== "__source" && !(n in t)) return !0;
  for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
  return !1;
}
function ce(e, t) {
  this.props = e, this.context = t;
}
(ce.prototype = new c()).isPureReactComponent = !0, ce.prototype.shouldComponentUpdate = function(e, t) {
  return se(this.props, e) || se(this.state, t);
};
var fe = l.__b;
l.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), fe && fe(e);
};
var Lt = l.__e;
l.__e = function(e, t, n, r) {
  if (e.then) {
    for (var o, u = t; u = u.__; ) if ((o = u.__c) && o.__c) return t.__e == null && (t.__e = n.__e, t.__k = n.__k), o.__c(e, t);
  }
  Lt(e, t, n, r);
};
var pe = l.unmount;
function Ae(e, t, n) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), e.__c.__H = null), (e = At({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(r) {
    return Ae(r, t, n);
  })), e;
}
function Le(e, t, n) {
  return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(r) {
    return Le(r, t, n);
  }), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function S() {
  this.__u = 0, this.o = null, this.__b = null;
}
function Me(e) {
  var t = e.__.__c;
  return t && t.__a && t.__a(e);
}
function P() {
  this.i = null, this.l = null;
}
l.unmount = function(e) {
  var t = e.__c;
  t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), pe && pe(e);
}, (S.prototype = new c()).__c = function(e, t) {
  var n = t.__c, r = this;
  r.o == null && (r.o = []), r.o.push(n);
  var o = Me(r.__v), u = !1, i = function() {
    u || (u = !0, n.__R = null, o ? o(a) : a());
  };
  n.__R = i;
  var a = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var _ = r.state.__a;
        r.__v.__k[0] = Le(_, _.__c.__P, _.__c.__O);
      }
      var s;
      for (r.setState({ __a: r.__b = null }); s = r.o.pop(); ) s.forceUpdate();
    }
  };
  r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(i, i);
}, S.prototype.componentWillUnmount = function() {
  this.o = [];
}, S.prototype.render = function(e, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = Ae(this.__b, n, r.__O = r.__P);
    }
    this.__b = null;
  }
  var o = t.__a && d(h, null, e.fallback);
  return o && (o.__u &= -33), [d(h, null, t.__a ? null : e.children), o];
};
var ve = function(e, t, n) {
  if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    e.i = n = n[2];
  }
};
(P.prototype = new c()).__a = function(e) {
  var t = this, n = Me(t.__v), r = t.l.get(e);
  return r[0]++, function(o) {
    var u = function() {
      t.props.revealOrder ? (r.push(o), ve(t, e, r)) : o();
    };
    n ? n(u) : u();
  };
}, P.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var t = p(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
  for (var n = t.length; n--; ) this.l.set(t[n], this.i = [1, 0, this.i]);
  return e.children;
}, P.prototype.componentDidUpdate = P.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(t, n) {
    ve(e, n, t);
  });
};
var Mt = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, Vt = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Wt = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Ht = /[A-Z0-9]/g, zt = typeof document < "u", Dt = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
c.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(c.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(t) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
  } });
});
var de = l.event;
function Ft() {
}
function jt() {
  return this.cancelBubble;
}
function Bt() {
  return this.defaultPrevented;
}
l.event = function(e) {
  return de && (e = de(e)), e.persist = Ft, e.isPropagationStopped = jt, e.isDefaultPrevented = Bt, e.nativeEvent = e;
};
var Tt = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, he = l.vnode;
l.vnode = function(e) {
  typeof e.type == "string" && function(t) {
    var n = t.props, r = t.type, o = {}, u = r.indexOf("-") === -1;
    for (var i in n) {
      var a = n[i];
      if (!(i === "value" && "defaultValue" in n && a == null || zt && i === "children" && r === "noscript" || i === "class" || i === "className")) {
        var _ = i.toLowerCase();
        i === "defaultValue" && "value" in n && n.value == null ? i = "value" : i === "download" && a === !0 ? a = "" : _ === "translate" && a === "no" ? a = !1 : _[0] === "o" && _[1] === "n" ? _ === "ondoubleclick" ? i = "ondblclick" : _ !== "onchange" || r !== "input" && r !== "textarea" || Dt(n.type) ? _ === "onfocus" ? i = "onfocusin" : _ === "onblur" ? i = "onfocusout" : Wt.test(i) && (i = _) : _ = i = "oninput" : u && Vt.test(i) ? i = i.replace(Ht, "-$&").toLowerCase() : a === null && (a = void 0), _ === "oninput" && o[i = _] && (i = "oninputCapture"), o[i] = a;
      }
    }
    r == "select" && o.multiple && Array.isArray(o.value) && (o.value = p(n.children).forEach(function(s) {
      s.props.selected = o.value.indexOf(s.props.value) != -1;
    })), r == "select" && o.defaultValue != null && (o.value = p(n.children).forEach(function(s) {
      s.props.selected = o.multiple ? o.defaultValue.indexOf(s.props.value) != -1 : o.defaultValue == s.props.value;
    })), n.class && !n.className ? (o.class = n.class, Object.defineProperty(o, "className", Tt)) : (n.className && !n.class || n.class && n.className) && (o.class = o.className = n.className), t.props = o;
  }(e), e.$$typeof = Mt, he && he(e);
};
var ye = l.__r;
l.__r = function(e) {
  ye && ye(e), e.__c;
};
var me = l.diffed;
l.diffed = function(e) {
  me && me(e);
  var t = e.props, n = e.__e;
  n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
const R = () => Nt(Be.id);
function It() {
  const { provides: e } = R();
  return {
    setCursor: (t, n, r = 0) => {
      e == null || e.setCursor(t, n, r);
    },
    removeCursor: (t) => {
      e == null || e.removeCursor(t);
    }
  };
}
function Zt({ modeId: e, pageIndex: t }) {
  const { provides: n } = R();
  return {
    register: (r, o) => {
      const u = (o == null ? void 0 : o.modeId) ?? e, i = (o == null ? void 0 : o.pageIndex) ?? t;
      return u ? n == null ? void 0 : n.registerHandlers({
        modeId: u,
        handlers: r,
        pageIndex: i
      }) : n == null ? void 0 : n.registerAlways({
        scope: i !== void 0 ? { type: "page", pageIndex: i } : { type: "global" },
        handlers: r
      });
    }
  };
}
function Yt({ pageIndex: e, scale: t, background: n = "rgba(33,150,243)" }) {
  const { provides: r } = Oe(), { provides: o } = R(), { register: u } = Zt({ pageIndex: e }), [i, a] = A([]), [_, s] = A(null), { setCursor: Ve, removeCursor: We } = It(), C = ze(null);
  w(() => {
    if (r)
      return r.onSelectionChange(() => {
        (o == null ? void 0 : o.getActiveMode()) === "default" ? (a(r.getHighlightRectsForPage(e)), s(r.getBoundingRectForPage(e))) : (a([]), s(null));
      });
  }, [r, e]);
  const x = De((f) => {
    const v = C.current;
    return v ? L(v, f) : -1;
  }, []);
  w(() => {
    if (!r) return;
    const f = r.getGeometry(e);
    return f.wait((v) => C.current = v, M), () => {
      f.abort({
        code: je.Cancelled,
        message: "Cancelled"
      }), C.current = null;
    };
  }, [r, e]);
  const U = Fe(
    () => ({
      onPointerDown: (f, v, y) => {
        if (!r || !r.isEnabledForMode(y)) return;
        r.clear(), r.getGeometry(e).wait((He) => {
          const N = L(He, f);
          N !== -1 && r.begin(e, N);
        }, M);
      },
      onPointerMove: (f, v, y) => {
        if (!r || !r.isEnabledForMode(y)) return;
        const m = x(f);
        m !== -1 ? Ve("selection-text", "text", 10) : We("selection-text"), m !== -1 && r.update(e, m);
      },
      onPointerUp: (f, v, y) => {
        r && r.isEnabledForMode(y) && r.end();
      },
      onHandlerActiveEnd(f) {
        r && r.isEnabledForMode(f) && r.clear();
      }
    }),
    [r, e, x]
  );
  return w(() => {
    if (u)
      return u(U);
  }, [u, U]), _ ? /* @__PURE__ */ V(
    "div",
    {
      style: {
        position: "absolute",
        left: _.origin.x * t,
        top: _.origin.y * t,
        width: _.size.width * t,
        height: _.size.height * t,
        mixBlendMode: "multiply",
        isolation: "isolate"
      },
      children: i.map((f, v) => /* @__PURE__ */ V(
        "div",
        {
          style: {
            position: "absolute",
            left: (f.origin.x - _.origin.x) * t,
            top: (f.origin.y - _.origin.y) * t,
            width: f.size.width * t,
            height: f.size.height * t,
            background: n,
            pointerEvents: "none"
          }
        },
        v
      ))
    }
  ) : null;
}
function en() {
  const { provides: e } = Oe();
  return w(() => {
    if (e)
      return e.onCopyToClipboard((t) => {
        navigator.clipboard.writeText(t);
      });
  }, [e]), null;
}
export {
  en as CopyToClipboard,
  Yt as SelectionLayer,
  Oe as useSelectionCapability,
  Xt as useSelectionPlugin
};
//# sourceMappingURL=index.js.map
