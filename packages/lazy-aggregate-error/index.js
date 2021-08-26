"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateErrorExtra = exports.SymbolStackChanged = exports.SymbolStackInited = exports.SymbolErrStackMeta = void 0;
const _aggregate_1 = require("./lib/_aggregate");
const extend_bases_1 = require("@bluelovers/extend-bases");
const index_1 = require("err-stack-meta/index");
const index_2 = require("err-indent/index");
const SymbolErrStackMeta = Symbol.for('err-stack-meta');
exports.SymbolErrStackMeta = SymbolErrStackMeta;
const SymbolStackInited = Symbol.for('stack:inited');
exports.SymbolStackInited = SymbolStackInited;
const SymbolStackChanged = Symbol.for('stack:changed');
exports.SymbolStackChanged = SymbolStackChanged;
// @ts-ignore
class AggregateErrorExtra extends (0, extend_bases_1.bases)(_aggregate_1.$AggregateError, Array) {
    constructor(errors, message) {
        errors !== null && errors !== void 0 ? errors : (errors = []);
        errors = [...errors].map(e => {
            if (typeof e === 'string') {
                return new Error(e);
            }
            return e;
        });
        let e = new _aggregate_1.$AggregateError(errors, message !== null && message !== void 0 ? message : '');
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
        if (this[SymbolStackInited]) {
            let meta = this.meta();
            meta.message = String(message !== null && message !== void 0 ? message : '') + '\n' + (0, index_2.indentSubErrors)(this[extend_bases_1.SymbolBases][0].errors, {}, this[extend_bases_1.SymbolBases][0]);
            this[SymbolStackChanged] = true;
        }
    }
    meta(refresh) {
        if (refresh == true || typeof this[SymbolErrStackMeta] === 'undefined') {
            this[SymbolErrStackMeta] = (0, index_1.errStackMeta)(this[extend_bases_1.SymbolBases][0]);
            delete this[SymbolErrStackMeta].error;
        }
        this[SymbolStackInited] = true;
        return this[SymbolErrStackMeta];
    }
    get stack() {
        let stack = this[extend_bases_1.SymbolBases][0].stack;
        let meta = this.meta();
        if (!this[SymbolStackChanged] || this[SymbolStackChanged]) {
            stack = (0, index_1.stringifyStackMeta)({
                ...meta,
                message: (0, index_2.messageWithSubErrors)(this[extend_bases_1.SymbolBases][0]),
            });
            this[extend_bases_1.SymbolBases][0].stack = stack;
            this[SymbolStackChanged] = false;
        }
        return stack;
    }
    set stack(stack) {
        this[extend_bases_1.SymbolBases][0].stack = stack;
        this.meta();
        this[SymbolStackChanged] = true;
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
    /**
     * @private
     */
    toLocaleString() {
        return this.toString();
    }
}
exports.AggregateErrorExtra = AggregateErrorExtra;
exports.default = AggregateErrorExtra;
//# sourceMappingURL=index.js.map