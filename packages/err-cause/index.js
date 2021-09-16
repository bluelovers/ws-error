"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errCause = exports.isSupportedErrorCause = exports._isError = void 0;
function _isError(error) {
    return error instanceof Error;
}
exports._isError = _isError;
function isSupportedErrorCause(sc = Error) {
    try {
        const cause = new Error();
        // @ts-ignore
        let err = new sc('', {
            cause,
        });
        // @ts-ignore
        return err.cause === cause;
    }
    catch (e) {
    }
    return null;
}
exports.isSupportedErrorCause = isSupportedErrorCause;
function errCause(error, options) {
    if (!_isError(error)) {
        throw new TypeError(`error should instanceof Error: ${error}`);
    }
    let cause = _isError(options) ? options : options.cause;
    if (!_isError(cause)) {
        throw new TypeError(`cause should instanceof Error: ${cause}`);
    }
    // @ts-ignore
    error.cause = cause;
    return error;
}
exports.errCause = errCause;
exports.default = errCause;
//# sourceMappingURL=index.js.map