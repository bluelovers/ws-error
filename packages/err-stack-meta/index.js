"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyStackMeta = exports.errStackMeta = void 0;
function errStackMeta(error) {
    let prefix;
    let message = error.message;
    let stack;
    let front;
    let i;
    if (!/\n/.test(error.message)) {
        let ls = error.stack.split('\n');
        front = ls.shift();
        stack = ls.join('\n');
        i = front.lastIndexOf(error.message);
        prefix = error.stack.slice(0, i);
    }
    else {
        i = error.stack.indexOf(error.message, 1);
        if (i !== -1) {
            prefix = error.stack.slice(0, i);
            stack = error.stack.slice(i + error.message.length);
            if (stack.trim().indexOf(error.message) === 0) {
                i = error.stack.indexOf(error.message, i + error.message.length);
                prefix = error.stack.slice(0, i);
                stack = error.stack.slice(i + error.message.length);
            }
        }
        else {
            stack = error.stack;
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