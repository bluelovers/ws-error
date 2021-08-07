import indentString, { Options as IIndentOptions } from 'indent-string';
import _cleanStack from 'clean-stack';
import { inspect } from 'util';
import { isIterable } from 'check-iterable';
import { array_unique_overwrite } from 'array-hyper-unique';

export interface IOptions<T = any>
{
	error?: Error;
	handleStack?(stack: string, error: T): string;

	/**
	 * @default 4
	 */
	indent?: number,

	/**
	 * options for `indent-string`
	 */
	indentOptions?: IIndentOptions,
}

export function errorsToMessageList<T>(errors: T[], options?: IOptions<T>, mainError?: Error)
{
	const { handleStack = (stack: string) => _cleanStack(stack) } = options;

	mainError ??= options.error;

	let _main: string;

	const ls = (errors as any as Error[])
		.reduce((ls, error) =>
		{
			if (error === void 0 || error === null)
			{
				return ls
			}

			if (mainError === error)
			{
				_main = String(error)
			}
			else if (typeof error.stack === 'string')
			{
				ls.push(handleStack(error.stack, error as any as T))
			}
			else
			{
				ls.push(inspect(error))
			}

			return ls
		}, [] as string[])
		.filter(s => s?.length)
	;

	if (_main?.length)
	{
		ls.unshift(_main)
	}

	return array_unique_overwrite(ls)
}

export function indentSubErrorMessage(sub_message: string | string[], options?: IOptions)
{
	if (typeof sub_message !== 'string' && isIterable(sub_message))
	{
		sub_message = [...sub_message].join('\n');
	}

	options ??= {};

	return indentString(sub_message, options.indent ?? 4, options.indentOptions)
}

export function indentSubErrors<T>(errors: T[], options?: IOptions<T>, mainError?: Error)
{
	const sub_message = errorsToMessageList(errors, options, mainError);
	return indentSubErrorMessage(sub_message, options);
}

export function messageWithSubErrors<T>(mainError: Error, errors: T[], options?: IOptions<T>)
{
	return String(mainError.message) + '\n' + indentSubErrors(errors, options, mainError);
}
