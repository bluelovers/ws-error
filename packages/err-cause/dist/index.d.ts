export declare function _isError<E extends Error>(error: unknown): error is E;
export declare type IErrorWithCause<E extends Error = Error, C extends Error = Error> = E & {
	cause: C;
};
export declare function isSupportedErrorCause<EC = ErrorConstructor>(sc?: EC): boolean;
export declare function errCause<E extends Error, C extends Error>(error: E, options: C | {
	cause: C;
}): IErrorWithCause<E, C>;
export default errCause;

export {};
