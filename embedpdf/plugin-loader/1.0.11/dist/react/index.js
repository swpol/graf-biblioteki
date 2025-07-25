import { Component as s, options as i, createElement as h, Fragment as p, toChildArray as f, createContext as Z } from "preact";
import { useContext as q, useRef as G, useEffect as J } from "preact/hooks";
import { L as F } from "../loader-plugin-DC0zA4Bl.js";
import { u as b } from "../jsxRuntime.module-Bzuv3cXw.js";
function K(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function g(e, t) {
  for (var n in e) if (n !== "__source" && !(n in t)) return !0;
  for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
  return !1;
}
function k(e, t) {
  this.props = e, this.context = t;
}
(k.prototype = new s()).isPureReactComponent = !0, k.prototype.shouldComponentUpdate = function(e, t) {
  return g(this.props, e) || g(this.state, t);
};
var P = i.__b;
i.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), P && P(e);
};
var Q = i.__e;
i.__e = function(e, t, n, r) {
  if (e.then) {
    for (var o, l = t; l = l.__; ) if ((o = l.__c) && o.__c) return t.__e == null && (t.__e = n.__e, t.__k = n.__k), o.__c(e, t);
  }
  Q(e, t, n, r);
};
var w = i.unmount;
function H(e, t, n) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), e.__c.__H = null), (e = K({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(r) {
    return H(r, t, n);
  })), e;
}
function z(e, t, n) {
  return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(r) {
    return z(r, t, n);
  }), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function y() {
  this.__u = 0, this.o = null, this.__b = null;
}
function M(e) {
  var t = e.__.__c;
  return t && t.__a && t.__a(e);
}
function v() {
  this.i = null, this.l = null;
}
i.unmount = function(e) {
  var t = e.__c;
  t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), w && w(e);
}, (y.prototype = new s()).__c = function(e, t) {
  var n = t.__c, r = this;
  r.o == null && (r.o = []), r.o.push(n);
  var o = M(r.__v), l = !1, _ = function() {
    l || (l = !0, n.__R = null, o ? o(a) : a());
  };
  n.__R = _;
  var a = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var u = r.state.__a;
        r.__v.__k[0] = z(u, u.__c.__P, u.__c.__O);
      }
      var c;
      for (r.setState({ __a: r.__b = null }); c = r.o.pop(); ) c.forceUpdate();
    }
  };
  r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(_, _);
}, y.prototype.componentWillUnmount = function() {
  this.o = [];
}, y.prototype.render = function(e, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = H(this.__b, n, r.__O = r.__P);
    }
    this.__b = null;
  }
  var o = t.__a && h(p, null, e.fallback);
  return o && (o.__u &= -33), [h(p, null, t.__a ? null : e.children), o];
};
var C = function(e, t, n) {
  if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    e.i = n = n[2];
  }
};
(v.prototype = new s()).__a = function(e) {
  var t = this, n = M(t.__v), r = t.l.get(e);
  return r[0]++, function(o) {
    var l = function() {
      t.props.revealOrder ? (r.push(o), C(t, e, r)) : o();
    };
    n ? n(l) : l();
  };
}, v.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var t = f(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
  for (var n = t.length; n--; ) this.l.set(t[n], this.i = [1, 0, this.i]);
  return e.children;
}, v.prototype.componentDidUpdate = v.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(t, n) {
    C(e, n, t);
  });
};
var X = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, Y = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, ee = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, te = /[A-Z0-9]/g, ne = typeof document < "u", re = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
s.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(s.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(t) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
  } });
});
var O = i.event;
function oe() {
}
function _e() {
  return this.cancelBubble;
}
function ue() {
  return this.defaultPrevented;
}
i.event = function(e) {
  return O && (e = O(e)), e.persist = oe, e.isPropagationStopped = _e, e.isDefaultPrevented = ue, e.nativeEvent = e;
};
var ie = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, E = i.vnode;
i.vnode = function(e) {
  typeof e.type == "string" && function(t) {
    var n = t.props, r = t.type, o = {}, l = r.indexOf("-") === -1;
    for (var _ in n) {
      var a = n[_];
      if (!(_ === "value" && "defaultValue" in n && a == null || ne && _ === "children" && r === "noscript" || _ === "class" || _ === "className")) {
        var u = _.toLowerCase();
        _ === "defaultValue" && "value" in n && n.value == null ? _ = "value" : _ === "download" && a === !0 ? a = "" : u === "translate" && a === "no" ? a = !1 : u[0] === "o" && u[1] === "n" ? u === "ondoubleclick" ? _ = "ondblclick" : u !== "onchange" || r !== "input" && r !== "textarea" || re(n.type) ? u === "onfocus" ? _ = "onfocusin" : u === "onblur" ? _ = "onfocusout" : ee.test(_) && (_ = u) : u = _ = "oninput" : l && Y.test(_) ? _ = _.replace(te, "-$&").toLowerCase() : a === null && (a = void 0), u === "oninput" && o[_ = u] && (_ = "oninputCapture"), o[_] = a;
      }
    }
    r == "select" && o.multiple && Array.isArray(o.value) && (o.value = f(n.children).forEach(function(c) {
      c.props.selected = o.value.indexOf(c.props.value) != -1;
    })), r == "select" && o.defaultValue != null && (o.value = f(n.children).forEach(function(c) {
      c.props.selected = o.multiple ? o.defaultValue.indexOf(c.props.value) != -1 : o.defaultValue == c.props.value;
    })), n.class && !n.className ? (o.class = n.class, Object.defineProperty(o, "className", ie)) : (n.className && !n.class || n.class && n.className) && (o.class = o.className = n.className), t.props = o;
  }(e), e.$$typeof = X, E && E(e);
};
var S = i.__r;
i.__r = function(e) {
  S && S(e), e.__c;
};
var x = i.diffed;
i.diffed = function(e) {
  x && x(e);
  var t = e.props, n = e.__e;
  n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
const le = Z({
  registry: null,
  isInitializing: !0,
  pluginsReady: !1
});
function ae() {
  const e = q(le);
  if (e === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: t, isInitializing: n } = e;
  if (n)
    return e;
  if (t === null)
    throw new Error("PDF registry failed to initialize properly");
  return e;
}
function j(e) {
  const { registry: t } = ae();
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
function ce(e) {
  const { plugin: t, isLoading: n, ready: r } = j(e);
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
const xe = () => j(F.id), se = () => ce(F.id);
function fe(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function R(e, t) {
  for (var n in e) if (n !== "__source" && !(n in t)) return !0;
  for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
  return !1;
}
function $(e, t) {
  this.props = e, this.context = t;
}
($.prototype = new s()).isPureReactComponent = !0, $.prototype.shouldComponentUpdate = function(e, t) {
  return R(this.props, e) || R(this.state, t);
};
var N = i.__b;
i.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), N && N(e);
};
var pe = i.__e;
i.__e = function(e, t, n, r) {
  if (e.then) {
    for (var o, l = t; l = l.__; ) if ((o = l.__c) && o.__c) return t.__e == null && (t.__e = n.__e, t.__k = n.__k), o.__c(e, t);
  }
  pe(e, t, n, r);
};
var U = i.unmount;
function B(e, t, n) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), e.__c.__H = null), (e = fe({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(r) {
    return B(r, t, n);
  })), e;
}
function T(e, t, n) {
  return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(r) {
    return T(r, t, n);
  }), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function m() {
  this.__u = 0, this.o = null, this.__b = null;
}
function I(e) {
  var t = e.__.__c;
  return t && t.__a && t.__a(e);
}
function d() {
  this.i = null, this.l = null;
}
i.unmount = function(e) {
  var t = e.__c;
  t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), U && U(e);
}, (m.prototype = new s()).__c = function(e, t) {
  var n = t.__c, r = this;
  r.o == null && (r.o = []), r.o.push(n);
  var o = I(r.__v), l = !1, _ = function() {
    l || (l = !0, n.__R = null, o ? o(a) : a());
  };
  n.__R = _;
  var a = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var u = r.state.__a;
        r.__v.__k[0] = T(u, u.__c.__P, u.__c.__O);
      }
      var c;
      for (r.setState({ __a: r.__b = null }); c = r.o.pop(); ) c.forceUpdate();
    }
  };
  r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(_, _);
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
  var o = t.__a && h(p, null, e.fallback);
  return o && (o.__u &= -33), [h(p, null, t.__a ? null : e.children), o];
};
var L = function(e, t, n) {
  if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    e.i = n = n[2];
  }
};
(d.prototype = new s()).__a = function(e) {
  var t = this, n = I(t.__v), r = t.l.get(e);
  return r[0]++, function(o) {
    var l = function() {
      t.props.revealOrder ? (r.push(o), L(t, e, r)) : o();
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
    L(e, n, t);
  });
};
var ve = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, de = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, he = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, ye = /[A-Z0-9]/g, me = typeof document < "u", be = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
s.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(s.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(t) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
  } });
});
var A = i.event;
function ge() {
}
function ke() {
  return this.cancelBubble;
}
function Pe() {
  return this.defaultPrevented;
}
i.event = function(e) {
  return A && (e = A(e)), e.persist = ge, e.isPropagationStopped = ke, e.isDefaultPrevented = Pe, e.nativeEvent = e;
};
var we = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, V = i.vnode;
i.vnode = function(e) {
  typeof e.type == "string" && function(t) {
    var n = t.props, r = t.type, o = {}, l = r.indexOf("-") === -1;
    for (var _ in n) {
      var a = n[_];
      if (!(_ === "value" && "defaultValue" in n && a == null || me && _ === "children" && r === "noscript" || _ === "class" || _ === "className")) {
        var u = _.toLowerCase();
        _ === "defaultValue" && "value" in n && n.value == null ? _ = "value" : _ === "download" && a === !0 ? a = "" : u === "translate" && a === "no" ? a = !1 : u[0] === "o" && u[1] === "n" ? u === "ondoubleclick" ? _ = "ondblclick" : u !== "onchange" || r !== "input" && r !== "textarea" || be(n.type) ? u === "onfocus" ? _ = "onfocusin" : u === "onblur" ? _ = "onfocusout" : he.test(_) && (_ = u) : u = _ = "oninput" : l && de.test(_) ? _ = _.replace(ye, "-$&").toLowerCase() : a === null && (a = void 0), u === "oninput" && o[_ = u] && (_ = "oninputCapture"), o[_] = a;
      }
    }
    r == "select" && o.multiple && Array.isArray(o.value) && (o.value = f(n.children).forEach(function(c) {
      c.props.selected = o.value.indexOf(c.props.value) != -1;
    })), r == "select" && o.defaultValue != null && (o.value = f(n.children).forEach(function(c) {
      c.props.selected = o.multiple ? o.defaultValue.indexOf(c.props.value) != -1 : o.defaultValue == c.props.value;
    })), n.class && !n.className ? (o.class = n.class, Object.defineProperty(o, "className", we)) : (n.className && !n.class || n.class && n.className) && (o.class = o.className = n.className), t.props = o;
  }(e), e.$$typeof = ve, V && V(e);
};
var W = i.__r;
i.__r = function(e) {
  W && W(e), e.__c;
};
var D = i.diffed;
i.diffed = function(e) {
  D && D(e);
  var t = e.props, n = e.__e;
  n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
function Re() {
  const { provides: e } = se(), t = G(null);
  return J(() => e ? e.onOpenFileRequest((o) => {
    o === "open" && t.current && t.current.click();
  }) : void 0, [e]), /* @__PURE__ */ b(p, { children: /* @__PURE__ */ b(
    "input",
    {
      ref: t,
      type: "file",
      accept: "application/pdf",
      style: { display: "none" },
      onChange: async (r) => {
        var l;
        const o = (l = r.currentTarget.files) == null ? void 0 : l[0];
        o && e && await e.loadDocument({
          type: "buffer",
          pdfFile: {
            id: Math.random().toString(36).substring(2, 15),
            content: await o.arrayBuffer()
          }
        });
      }
    }
  ) });
}
export {
  Re as FilePicker,
  se as useLoaderCapability,
  xe as useLoaderPlugin
};
//# sourceMappingURL=index.js.map
