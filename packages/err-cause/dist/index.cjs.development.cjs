'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _isError(error) {
  return error instanceof Error;
}
function isSupportedErrorCause(sc = Error) {
  try {
    const cause = new Error();
    let err = new sc('', {
      cause
    });
    return err.cause === cause;
  } catch (e) {}

  return null;
}
function errCause(error, options) {
  if (!_isError(error)) {
    throw new TypeError(`error should instanceof Error: ${error}`);
  }

  let cause = _isError(options) ? options : options.cause;

  if (!_isError(cause)) {
    throw new TypeError(`cause should instanceof Error: ${cause}`);
  }

  error.cause = cause;
  return error;
}

exports._isError = _isError;
exports["default"] = errCause;
exports.errCause = errCause;
exports.isSupportedErrorCause = isSupportedErrorCause;
//# sourceMappingURL=index.cjs.development.cjs.map
