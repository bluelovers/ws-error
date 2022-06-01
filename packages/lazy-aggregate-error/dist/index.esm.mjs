import { $AggregateError as r } from "aggregate-error-or-core-js";

import { bases as t, SymbolBases as e } from "@bluelovers/extend-bases";

import { errStackMeta as s } from "err-stack-meta";

import { indentSubErrors as o, messageWithSubErrors as a } from "err-indent";

import { stringifyErrorStack as i } from "error-stack2";

const g = Symbol.for("err-stack-meta"), h = Symbol.for("stack:inited"), n = Symbol.for("stack:changed");

class AggregateErrorExtra extends(t(r, Array)){
  constructor(t, e) {
    var s;
    null !== (s = t) && void 0 !== s || (t = []), t = [ ...t ].map((r => "string" == typeof r ? new Error(r) : r));
    let o = new r(t, null != e ? e : "");
    super(o, o.errors), o.name = "AggregateErrorExtra", Error.captureStackTrace(o, AggregateErrorExtra);
  }
  get code() {
    return this[e][0].code;
  }
  set code(r) {
    this[e][0].code = r;
  }
  set name(r) {
    this[e][0].name = null != r ? r : this[e][0].name;
  }
  get message() {
    return this[e][0].message;
  }
  set message(r) {
    this[e][0].message = r, this[h] && (this.meta().message = String(null != r ? r : "") + "\n" + o(this[e][0].errors, {}, this[e][0]), 
    this[n] = !0);
  }
  meta(r) {
    return 1 != r && void 0 !== this[g] || (this[g] = s(this[e][0]), delete this[g].error), 
    this[h] = !0, this[g];
  }
  get stack() {
    let r = this[e][0].stack, t = this.meta();
    if (!this[n] || this[n]) {
      let s = a(this[e][0]);
      "" === s && (s = void 0), r = i({
        ...t,
        message: s
      }), this[e][0].stack = r, this[n] = !1;
    }
    return r;
  }
  set stack(r) {
    this[e][0].stack = r, this.meta(), this[n] = !0;
  }
  get errors() {
    return this[e][0].errors;
  }
  set errors(r) {
    this[e][1] = this[e][0].errors = [ ...r ];
  }
  toString() {
    return this[e][0].toString.call(this);
  }
  toLocaleString() {
    return this.toString();
  }
}

export { AggregateErrorExtra, g as SymbolErrStackMeta, n as SymbolStackChanged, h as SymbolStackInited, AggregateErrorExtra as default };
//# sourceMappingURL=index.esm.mjs.map
