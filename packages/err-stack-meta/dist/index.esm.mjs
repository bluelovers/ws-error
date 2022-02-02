import { parseStack, formatMessagePrefix } from 'error-stack2';

function errStackMeta(error) {
  let es = parseStack(error.stack, error.message);
  return {
    type: es.type,
    prefix: formatMessagePrefix(es) + ': ',
    message: es.message,
    rawTrace: es.rawTrace,
    stack: es.rawTrace.join('\n'),
    error
  };
}
function stringifyStackMeta(meta, stack) {
  var _stack, _meta$message;

  (_stack = stack) !== null && _stack !== void 0 ? _stack : stack = meta.stack;

  if (stack.length) {
    stack = `\n${stack}`;
  }

  return `${meta.prefix}${(_meta$message = meta.message) !== null && _meta$message !== void 0 ? _meta$message : ''}${stack}`;
}

export { errStackMeta as default, errStackMeta, stringifyStackMeta };
//# sourceMappingURL=index.esm.mjs.map
