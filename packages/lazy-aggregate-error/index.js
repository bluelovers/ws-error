"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateErrorExtra = exports.SymbolErrStackMeta = void 0;
const _aggregate_1 = require("./lib/_aggregate");
const extend_bases_1 = require("@bluelovers/extend-bases");
const index_1 = require("err-stack-meta/index");
const SymbolErrStackMeta = Symbol.for('err-stack-meta');
exports.SymbolErrStackMeta = SymbolErrStackMeta;
class AggregateErrorExtra extends (0, extend_bases_1.bases)(_aggregate_1.AggregateError, Array) {
    constructor(errors, message) {
        errors !== null && errors !== void 0 ? errors : (errors = []);
        let e = new _aggregate_1.AggregateError(errors, message);
        super(e, e.errors);
        e.name = 'AggregateErrorExtra';
        Error.captureStackTrace(e, AggregateErrorExtra);
    }
    get code() {
        // @ts-ignore
        return this[extend_bases_1.SymbolBases][0].code;
    }
    set code(value) {
        // @ts-ignore
        this[extend_bases_1.SymbolBases][0].code = code;
    }
    set name(value) {
        this[extend_bases_1.SymbolBases][0].name = value !== null && value !== void 0 ? value : this[extend_bases_1.SymbolBases][0].name;
    }
    get message() {
        return this[extend_bases_1.SymbolBases][0].message;
    }
    set message(message) {
        this[extend_bases_1.SymbolBases][0].message = message;
    }
    meta(refresh) {
        if (refresh == true || typeof this[SymbolErrStackMeta] === 'undefined') {
            // @ts-ignore
            this[SymbolErrStackMeta] = (0, index_1.errStackMeta)(this[extend_bases_1.SymbolBases][0]);
        }
        return this[SymbolErrStackMeta];
    }
    get stack() {
        let stack = this[extend_bases_1.SymbolBases][0].stack;
        this.meta();
        return stack;
    }
    set stack(stack) {
        this[extend_bases_1.SymbolBases][0].stack = stack;
    }
    get errors() {
        return this[extend_bases_1.SymbolBases][0].errors;
    }
    set errors(errors) {
        this[extend_bases_1.SymbolBases][1] = this[extend_bases_1.SymbolBases][0].errors = [...errors];
    }
    toString() {
        return this[extend_bases_1.SymbolBases][0].toString.call(this);
    }
}
exports.AggregateErrorExtra = AggregateErrorExtra;
exports.default = AggregateErrorExtra;
//# sourceMappingURL=index.js.map