"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubErrors = void 0;
/**
 * support
 * - {@link AggregateError}
 * - {@link Bluebird.AggregateError}
 */
function getSubErrors(mainError) {
    var _a, _b, _c, _d, _e, _f;
    return (_d = (_a = mainError.errors) !== null && _a !== void 0 ? _a : (_c = (_b = mainError)[Symbol.iterator]) === null || _c === void 0 ? void 0 : _c.call(_b)) !== null && _d !== void 0 ? _d : (_f = (_e = mainError).slice) === null || _f === void 0 ? void 0 : _f.call(_e);
}
exports.getSubErrors = getSubErrors;
exports.default = getSubErrors;
//# sourceMappingURL=index.js.map