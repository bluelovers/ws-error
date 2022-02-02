'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var aggregateErrorOrCoreJs = require('aggregate-error-or-core-js');
var extendBases = require('@bluelovers/extend-bases');
var errStackMeta = require('err-stack-meta');
var errIndent = require('err-indent');
var errorStack2 = require('error-stack2');

const SymbolErrStackMeta = /*#__PURE__*/Symbol.for('err-stack-meta');
const SymbolStackInited = /*#__PURE__*/Symbol.for('stack:inited');
const SymbolStackChanged = /*#__PURE__*/Symbol.for('stack:changed');
class AggregateErrorExtra extends extendBases.bases(aggregateErrorOrCoreJs.$AggregateError, Array) {
  constructor(errors, message) {
    var _errors;

    (_errors = errors) !== null && _errors !== void 0 ? _errors : errors = [];
    errors = [...errors].map(e => {
      if (typeof e === 'string') {
        return new Error(e);
      }

      return e;
    });
    let e = new aggregateErrorOrCoreJs.$AggregateError(errors, message !== null && message !== void 0 ? message : '');
    super(e, e.errors);
    e.name = 'AggregateErrorExtra';
    Error.captureStackTrace(e, AggregateErrorExtra);
  }

  get code() {
    return this[extendBases.SymbolBases][0].code;
  }

  set code(code) {
    this[extendBases.SymbolBases][0].code = code;
  }

  set name(value) {
    this[extendBases.SymbolBases][0].name = value !== null && value !== void 0 ? value : this[extendBases.SymbolBases][0].name;
  }

  get message() {
    return this[extendBases.SymbolBases][0].message;
  }

  set message(message) {
    this[extendBases.SymbolBases][0].message = message;

    if (this[SymbolStackInited]) {
      let meta = this.meta();
      meta.message = String(message !== null && message !== void 0 ? message : '') + '\n' + errIndent.indentSubErrors(this[extendBases.SymbolBases][0].errors, {}, this[extendBases.SymbolBases][0]);
      this[SymbolStackChanged] = true;
    }
  }

  meta(refresh) {
    if (refresh == true || typeof this[SymbolErrStackMeta] === 'undefined') {
      this[SymbolErrStackMeta] = errStackMeta.errStackMeta(this[extendBases.SymbolBases][0]);
      delete this[SymbolErrStackMeta].error;
    }

    this[SymbolStackInited] = true;
    return this[SymbolErrStackMeta];
  }

  get stack() {
    let stack = this[extendBases.SymbolBases][0].stack;
    let meta = this.meta();

    if (!this[SymbolStackChanged] || this[SymbolStackChanged]) {
      let message = errIndent.messageWithSubErrors(this[extendBases.SymbolBases][0]);

      if (message === '') {
        message = void 0;
      }

      stack = errorStack2.stringifyErrorStack({ ...meta,
        message
      });
      this[extendBases.SymbolBases][0].stack = stack;
      this[SymbolStackChanged] = false;
    }

    return stack;
  }

  set stack(stack) {
    this[extendBases.SymbolBases][0].stack = stack;
    this.meta();
    this[SymbolStackChanged] = true;
  }

  get errors() {
    return this[extendBases.SymbolBases][0].errors;
  }

  set errors(errors) {
    this[extendBases.SymbolBases][1] = this[extendBases.SymbolBases][0].errors = [...errors];
  }

  toString() {
    return this[extendBases.SymbolBases][0].toString.call(this);
  }

  toLocaleString() {
    return this.toString();
  }

}

exports.AggregateErrorExtra = AggregateErrorExtra;
exports.SymbolErrStackMeta = SymbolErrStackMeta;
exports.SymbolStackChanged = SymbolStackChanged;
exports.SymbolStackInited = SymbolStackInited;
exports["default"] = AggregateErrorExtra;
//# sourceMappingURL=index.cjs.development.cjs.map
