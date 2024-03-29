export function _isError<E extends Error>(error: unknown): error is E
{
	return error instanceof Error
}

export type IErrorWithCause<E extends Error = Error, C extends Error = Error> = E & {
	cause: C
}

export function isSupportedErrorCause<EC = ErrorConstructor>(sc: EC = Error as any)
{
	try
	{
		const cause = new Error();

		// @ts-ignore
		let err = new sc('', {
			cause,
		});

		// @ts-ignore
		return err.cause === cause
	}
	catch (e)
	{

	}

	return null
}

export function errCause<E extends Error, C extends Error>(error: E, options: C | {
	cause: C
}): IErrorWithCause<E, C>
{
	if (!_isError(error))
	{
		throw new TypeError(`error should instanceof Error: ${error}`)
	}

	let cause = _isError(options) ? options : options.cause;

	if (!_isError(cause))
	{
		throw new TypeError(`cause should instanceof Error: ${cause}`)
	}

	// @ts-ignore
	error.cause = cause;

	return error as any
}

export default errCause

// @ts-ignore
if (process.env.TSDX_FORMAT !== 'esm')
{
	Object.defineProperty(errCause, "__esModule", { value: true });

	Object.defineProperty(errCause, 'errCause', { value: errCause });
	Object.defineProperty(errCause, 'default', { value: errCause });

	Object.defineProperty(errCause, '_isError', { value: _isError });
	Object.defineProperty(errCause, 'isSupportedErrorCause', { value: isSupportedErrorCause });
}
