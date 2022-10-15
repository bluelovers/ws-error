"use strict";

function _isError(r) {
  return r instanceof Error;
}

function errCause(r, e) {
  if (!_isError(r)) throw new TypeError(`error should instanceof Error: ${r}`);
  let o = _isError(e) ? e : e.cause;
  if (!_isError(o)) throw new TypeError(`cause should instanceof Error: ${o}`);
  return r.cause = o, r;
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports._isError = _isError, exports.default = errCause, exports.errCause = errCause, 
exports.isSupportedErrorCause = function isSupportedErrorCause(r = Error) {
  try {
    const e = new Error;
    return new r("", {
      cause: e
    }).cause === e;
  } catch (r) {}
  return null;
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
