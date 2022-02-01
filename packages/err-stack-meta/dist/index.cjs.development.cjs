'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var errorStack2 = require('error-stack2');

function errStackMeta(error) {
  let es = errorStack2.parseStack(error.stack, error.message);
  return {
    prefix: errorStack2.formatMessagePrefix(es) + ': ',
    message: es.message,
    stack: es.rawTrace.join('\n'),
    error
  };
}
function stringifyStackMeta(meta, stack) {
  var _stack;

  (_stack = stack) !== null && _stack !== void 0 ? _stack : stack = meta.stack;

  if (stack.length) {
    stack = `\n${stack}`;
  }

  return `${meta.prefix}${meta.message}${stack}`;
}

exports["default"] = errStackMeta;
exports.errStackMeta = errStackMeta;
exports.stringifyStackMeta = stringifyStackMeta;
//# sourceMappingURL=index.cjs.development.cjs.map
