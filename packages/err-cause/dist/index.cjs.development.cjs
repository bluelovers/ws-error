'use strict';

function _isError(error) {
  return error instanceof Error;
}
function isSupportedErrorCause(sc = Error) {
  try {
    const cause = new Error();
    // @ts-ignore
    let err = new sc('', {
      cause
    });
    // @ts-ignore
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
  // @ts-ignore
  error.cause = cause;
  return error;
}
// @ts-ignore
{
  Object.defineProperty(errCause, "__esModule", {
    value: true
  });
  Object.defineProperty(errCause, 'errCause', {
    value: errCause
  });
  Object.defineProperty(errCause, 'default', {
    value: errCause
  });
  Object.defineProperty(errCause, '_isError', {
    value: _isError
  });
  Object.defineProperty(errCause, 'isSupportedErrorCause', {
    value: isSupportedErrorCause
  });
}

// @ts-ignore
module.exports = errCause;
//# sourceMappingURL=index.cjs.development.cjs.map
