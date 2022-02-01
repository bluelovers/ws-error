import { parseStack, formatMessagePrefix } from 'error-stack2';

function errStackMeta(error) {
  let es = parseStack(error.stack, error.message);
  return {
    prefix: formatMessagePrefix(es) + ': ',
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

export { errStackMeta as default, errStackMeta, stringifyStackMeta };
//# sourceMappingURL=index.esm.mjs.map
