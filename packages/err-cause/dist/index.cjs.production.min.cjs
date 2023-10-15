"use strict";

function _isError(r) {
  return r instanceof Error;
}

function errCause(r, e) {
  if (!_isError(r)) throw new TypeError(`error should instanceof Error: ${r}`);
  let u = _isError(e) ? e : e.cause;
  if (!_isError(u)) throw new TypeError(`cause should instanceof Error: ${u}`);
  return r.cause = u, r;
}

Object.defineProperty(errCause, "__esModule", {
  value: !0
}), Object.defineProperty(errCause, "errCause", {
  value: errCause
}), Object.defineProperty(errCause, "default", {
  value: errCause
}), Object.defineProperty(errCause, "_isError", {
  value: _isError
}), Object.defineProperty(errCause, "isSupportedErrorCause", {
  value: function isSupportedErrorCause(r = Error) {
    try {
      const e = new Error;
      return new r("", {
        cause: e
      }).cause === e;
    } catch (r) {}
    return null;
  }
}), module.exports = errCause;
//# sourceMappingURL=index.cjs.production.min.cjs.map
