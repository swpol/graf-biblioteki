function j(e, r, o, l) {
  let n = e.getHandlersForScope(r);
  const f = e.onModeChange(() => {
    if (r.type === "global") {
      const t = e.getActiveInteractionMode();
      o.style.cursor = (t == null ? void 0 : t.scope) === "global" ? t.cursor ?? "auto" : "auto";
    }
    n = e.getHandlersForScope(r);
  }), y = e.onHandlerChange(() => {
    n = e.getHandlersForScope(r);
  }), d = e.getActiveInteractionMode(), b = e.getCurrentCursor();
  r.type === "global" ? o.style.cursor = (d == null ? void 0 : d.scope) === "global" ? b : "auto" : o.style.cursor = b;
  const h = e.onCursorChange((t) => {
    var s;
    r.type === "global" && !(((s = e.getActiveInteractionMode()) == null ? void 0 : s.scope) === "global") || (o.style.cursor = t);
  }), i = {
    onPointerDown: "pointerdown",
    onPointerUp: "pointerup",
    onPointerMove: "pointermove",
    onPointerEnter: "pointerenter",
    onPointerLeave: "pointerleave",
    onPointerCancel: "pointercancel"
  }, c = {}, v = (t, s) => {
    if (l) return l(t, s);
    const a = s.getBoundingClientRect();
    return { x: t.clientX - a.left, y: t.clientY - a.top };
  };
  return Object.keys(i).forEach((t) => {
    c[t] = (s) => {
      var g;
      if (e.isPaused()) return;
      const a = s, F = e.getActiveMode();
      (g = n == null ? void 0 : n[t]) == null || g.call(n, v(a, o), a, F);
    }, o.addEventListener(i[t], c[t]);
  }), () => {
    Object.keys(i).forEach(
      (t) => o.removeEventListener(i[t], c[t])
    ), f(), h(), y();
  };
}
function P(e, r, o) {
  let l = r.x, n = r.y;
  switch (o) {
    case 0:
      l = r.x, n = r.y;
      break;
    case 1:
      l = e.height - r.y, n = r.x;
      break;
    case 2:
      l = e.width - r.x, n = e.height - r.y;
      break;
    case 3:
      l = r.y, n = e.width - r.x;
      break;
  }
  return {
    x: l,
    y: n
  };
}
function x(e, r) {
  return {
    x: e.x * r,
    y: e.y * r
  };
}
function k(e, r, o, l) {
  return x(
    P(e, r, (4 - o) % 4),
    1 / l
  );
}
var C = "­", M = "​", E = "⁠", O = "\uFEFF", w = "￾", H = "￿", L = Object.freeze([
  C,
  M,
  E,
  O,
  w,
  H
]);
new RegExp(`[${L.join("")}]`, "g");
var u = Object.freeze([
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
u.reduce(
  (e, r) => (e[r.id] = r, e),
  {}
);
u.reduce((e, r) => (e[r.css] = r.id, e), {});
u.map((e) => ({
  value: e.id,
  label: e.label
}));
var N = Object.freeze({
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
  N
).reduce(
  (e, [r, o]) => (e[o] = Number(r), e),
  {}
);
export {
  j as c,
  k as r
};
//# sourceMappingURL=index-Q-vI1_iw.js.map
