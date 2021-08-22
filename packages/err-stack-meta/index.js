"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyStackMeta = exports.errStackMeta = void 0;
const error_stack2_1 = require("error-stack2");
function errStackMeta(error) {
    let es = (0, error_stack2_1.parseStack)(error.stack, error.message);
    return {
        prefix: es.type + ': ',
        message: es.message,
        stack: es.rawTrace.join('\n'),
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