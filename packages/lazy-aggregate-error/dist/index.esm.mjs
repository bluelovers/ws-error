import { $AggregateError } from 'aggregate-error-or-core-js';
import { bases, SymbolBases } from '@bluelovers/extend-bases';
import { errStackMeta } from 'err-stack-meta';
import { indentSubErrors, messageWithSubErrors } from 'err-indent';
import { stringifyErrorStack } from 'error-stack2';

const SymbolErrStackMeta = /*#__PURE__*/Symbol.for('err-stack-meta');
const SymbolStackInited = /*#__PURE__*/Symbol.for('stack:inited');
const SymbolStackChanged = /*#__PURE__*/Symbol.for('stack:changed');
class AggregateErrorExtra extends bases($AggregateError, Array) {
  constructor(errors, message) {
    var _errors;

    (_errors = errors) !== null && _errors !== void 0 ? _errors : errors = [];
    errors = [...errors].map(e => {
      if (typeof e === 'string') {
        return new Error(e);
      }

      return e;
    });
    let e = new $AggregateError(errors, message !== null && message !== void 0 ? message : '');
    super(e, e.errors);
    e.name = 'AggregateErrorExtra';
    Error.captureStackTrace(e, AggregateErrorExtra);
  }

  get code() {
    return this[SymbolBases][0].code;
  }

  set code(code) {
    this[SymbolBases][0].code = code;
  }

  set name(value) {
    this[SymbolBases][0].name = value !== null && value !== void 0 ? value : this[SymbolBases][0].name;
  }

  get message() {
    return this[SymbolBases][0].message;
  }

  set message(message) {
    this[SymbolBases][0].message = message;

    if (this[SymbolStackInited]) {
      let meta = this.meta();
      meta.message = String(message !== null && message !== void 0 ? message : '') + '\n' + indentSubErrors(this[SymbolBases][0].errors, {}, this[SymbolBases][0]);
      this[SymbolStackChanged] = true;
    }
  }

  meta(refresh) {
    if (refresh == true || typeof this[SymbolErrStackMeta] === 'undefined') {
      this[SymbolErrStackMeta] = errStackMeta(this[SymbolBases][0]);
      delete this[SymbolErrStackMeta].error;
    }

    this[SymbolStackInited] = true;
    return this[SymbolErrStackMeta];
  }

  get stack() {
    let stack = this[SymbolBases][0].stack;
    let meta = this.meta();

    if (!this[SymbolStackChanged] || this[SymbolStackChanged]) {
      let message = messageWithSubErrors(this[SymbolBases][0]);

      if (message === '') {
        message = void 0;
      }

      stack = stringifyErrorStack({ ...meta,
        message
      });
      this[SymbolBases][0].stack = stack;
      this[SymbolStackChanged] = false;
    }

    return stack;
  }

  set stack(stack) {
    this[SymbolBases][0].stack = stack;
    this.meta();
    this[SymbolStackChanged] = true;
  }

  get errors() {
    return this[SymbolBases][0].errors;
  }

  set errors(errors) {
    this[SymbolBases][1] = this[SymbolBases][0].errors = [...errors];
  }

  toString() {
    return this[SymbolBases][0].toString.call(this);
  }

  toLocaleString() {
    return this.toString();
  }

}

export { AggregateErrorExtra, SymbolErrStackMeta, SymbolStackChanged, SymbolStackInited, AggregateErrorExtra as default };
//# sourceMappingURL=index.esm.mjs.map
