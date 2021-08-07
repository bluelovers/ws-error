"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errStackReduce = exports.errStackReduceCore = void 0;
const index_1 = require("err-stack-meta/index");
/**
 * reduce stame stack from sub error with parent error
 *
 * @example
 * const stackReduce = errStackReduceCore(mainError, options.stackReduceOptions);
 *
 * console.dir(stackReduce(error));
 */
function errStackReduceCore(mainError, mainOptions) {
    const stack = (0, index_1.errStackMeta)(mainError).stack;
    const { start = 1, end = 5 } = mainOptions !== null && mainOptions !== void 0 ? mainOptions : {};
    return (error, options) => {
        var _a, _b, _c;
        let _meta = (0, index_1.errStackMeta)(error);
        let _stack = _meta.stack.split('\n');
        let _start = (_a = options === null || options === void 0 ? void 0 : options.start) !== null && _a !== void 0 ? _a : start;
        let _end = (_b = options === null || options === void 0 ? void 0 : options.end) !== null && _b !== void 0 ? _b : end;
        let i = _start;
        do {
            if (((_c = _stack[i]) === null || _c === void 0 ? void 0 : _c.length) && stack.includes(_stack[i].trim())) {
                _stack = _stack.slice(0, i);
                break;
            }
        } while (i++ < _end || i >= _stack.length);
        return {
            ..._meta,
            stack: _stack.join('\n'),
            originalStack: _meta.stack,
        };
    };
}
exports.errStackReduceCore = errStackReduceCore;
/**
 * reduce stame stack from sub error with parent error
 *
 * recommend use {@link errStackReduceCore}
 */
function errStackReduce(error, mainError, mainOptions) {
    return errStackReduceCore(mainError, mainOptions)(error);
}
exports.errStackReduce = errStackReduce;
exports.default = errStackReduceCore;
//# sourceMappingURL=index.js.map