"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyStackMeta = exports.errStackMeta = void 0;
const stackRegex = /(?:\n {4}at .*)+/;
function errStackMeta(error) {
    let prefix;
    let message = error.message;
    let stack;
    let front;
    let i;
    const _stack = error.stack;
    const _message = message;
    if (!/\n/.test(_message)) {
        let ls = _stack.split('\n');
        front = ls.shift();
        stack = ls.join('\n');
        i = front.lastIndexOf(_message);
        prefix = _stack.slice(0, i);
    }
    else {
        i = _stack.indexOf(_message, 1);
        if (i !== -1) {
            prefix = _stack.slice(0, i);
            stack = _stack.slice(i + _message.length);
            if (stack.trim().indexOf(_message) === 0) {
                i = _stack.indexOf(_message, i + _message.length);
                prefix = _stack.slice(0, i);
                stack = _stack.slice(i + _message.length);
            }
        }
        else {
            stack = _stack;
        }
    }
    stack = stack.replace(/^[\r\n]+/, '');
    return {
        prefix,
        message,
        stack,
        error,
    };
}
exports.errStackMeta = errStackMeta;
function stringifyStackMeta(meta, stack) {
    stack !== null && stack !== void 0 ? stack : (stack = meta.stack);
    if (stack.length) {
        stack = `\n${stack}`;
    }
    return `${meta.prefix}${meta.message}${stack}`;
}
exports.stringifyStackMeta = stringifyStackMeta;
exports.default = errStackMeta;
//# sourceMappingURL=index.js.map