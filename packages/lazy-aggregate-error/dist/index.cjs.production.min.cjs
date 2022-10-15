"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("aggregate-error-or-core-js"), r = require("@bluelovers/extend-bases"), s = require("err-stack-meta"), t = require("err-indent"), a = require("error-stack2");

const o = Symbol.for("err-stack-meta"), i = Symbol.for("stack:inited"), g = Symbol.for("stack:changed");

class AggregateErrorExtra extends(r.bases(e.$AggregateError, Array)){
  constructor(r, s) {
    var t;
    null !== (t = r) && void 0 !== t || (r = []), r = [ ...r ].map((e => "string" == typeof e ? new Error(e) : e));
    let a = new e.$AggregateError(r, null != s ? s : "");
    super(a, a.errors), a.name = "AggregateErrorExtra", Error.captureStackTrace(a, AggregateErrorExtra);
  }
  get code() {
    return this[r.SymbolBases][0].code;
  }
  set code(e) {
    this[r.SymbolBases][0].code = e;
  }
  set name(e) {
    this[r.SymbolBases][0].name = null != e ? e : this[r.SymbolBases][0].name;
  }
  get message() {
    return this[r.SymbolBases][0].message;
  }
  set message(e) {
    this[r.SymbolBases][0].message = e, this[i] && (this.meta().message = String(null != e ? e : "") + "\n" + t.indentSubErrors(this[r.SymbolBases][0].errors, {}, this[r.SymbolBases][0]), 
    this[g] = !0);
  }
  meta(e) {
    return 1 != e && void 0 !== this[o] || (this[o] = s.errStackMeta(this[r.SymbolBases][0]), 
    delete this[o].error), this[i] = !0, this[o];
  }
  get stack() {
    let e = this[r.SymbolBases][0].stack, s = this.meta();
    if (!this[g] || this[g]) {
      let o = t.messageWithSubErrors(this[r.SymbolBases][0]);
      "" === o && (o = void 0), e = a.stringifyErrorStack({
        ...s,
        message: o
      }), this[r.SymbolBases][0].stack = e, this[g] = !1;
    }
    return e;
  }
  set stack(e) {
    this[r.SymbolBases][0].stack = e, this.meta(), this[g] = !0;
  }
  get errors() {
    return this[r.SymbolBases][0].errors;
  }
  set errors(e) {
    this[r.SymbolBases][1] = this[r.SymbolBases][0].errors = [ ...e ];
  }
  toString() {
    return this[r.SymbolBases][0].toString.call(this);
  }
  toLocaleString() {
    return this.toString();
  }
}

exports.AggregateErrorExtra = AggregateErrorExtra, exports.SymbolErrStackMeta = o, 
exports.SymbolStackChanged = g, exports.SymbolStackInited = i, exports.default = AggregateErrorExtra;
//# sourceMappingURL=index.cjs.production.min.cjs.map
