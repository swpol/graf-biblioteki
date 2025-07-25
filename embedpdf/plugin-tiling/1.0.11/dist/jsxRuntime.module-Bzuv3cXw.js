import { options as i } from "preact";
var v = 0;
function t(f, _, u, c, l, p) {
  _ || (_ = {});
  var n, o, r = _;
  if ("ref" in r) for (o in r = {}, _) o == "ref" ? n = _[o] : r[o] = _[o];
  var e = { type: f, props: r, key: u, ref: n, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --v, __i: -1, __u: 0, __source: l, __self: p };
  if (typeof f == "function" && (n = f.defaultProps)) for (o in n) r[o] === void 0 && (r[o] = n[o]);
  return i.vnode && i.vnode(e), e;
}
export {
  t as u
};
//# sourceMappingURL=jsxRuntime.module-Bzuv3cXw.js.map
