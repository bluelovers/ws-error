function _isError(r) {
  return r instanceof Error;
}

function isSupportedErrorCause(r = Error) {
  try {
    const e = new Error;
    return new r("", {
      cause: e
    }).cause === e;
  } catch (r) {}
  return null;
}

function errCause(r, e) {
  if (!_isError(r)) throw new TypeError(`error should instanceof Error: ${r}`);
  let o = _isError(e) ? e : e.cause;
  if (!_isError(o)) throw new TypeError(`cause should instanceof Error: ${o}`);
  return r.cause = o, r;
}

export { _isError, errCause as default, errCause, isSupportedErrorCause };
//# sourceMappingURL=index.esm.mjs.map
