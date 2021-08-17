import { ITSPickExtra } from 'ts-type';

const stackRegex = /(?:\n {4}at .*)+/;

export interface IErrStackMeta<E extends Error>
{
	prefix: string;
	message: string;
	stack: string;
	error: E;
}

export function errStackMeta<E extends Error>(error: E): IErrStackMeta<E>
{
	let prefix: string;
	let message: string = error.message;
	let stack: string;

	let front: string;
	let i: number;

	const _stack = error.stack;
	const _message = message;

	if (!/\n/.test(_message))
	{
		let ls = _stack.split('\n')

		front = ls.shift();
		stack = ls.join('\n');

		i = front.lastIndexOf(_message);

		prefix = _stack.slice(0, i);
	}
	else
	{
		i = _stack.indexOf(_message, 1);

		if (i !== -1)
		{
			prefix = _stack.slice(0, i);
			stack = _stack.slice(i + _message.length)

			if (stack.trim().indexOf(_message) === 0)
			{
				i = _stack.indexOf(_message, i + _message.length);

				prefix = _stack.slice(0, i);
				stack = _stack.slice(i + _message.length)
			}
		}
		else
		{
			stack = _stack
		}
	}

	stack = stack.replace(/^[\r\n]+/, '')

	return {
		prefix,
		message,
		stack,
		error,
	}
}

export function stringifyStackMeta(meta: ITSPickExtra<IErrStackMeta<any>, 'prefix' | 'message'>, stack?: string)
{
	stack ??= meta.stack;

	if (stack.length)
	{
		stack = `\n${stack}`;
	}

	return `${meta.prefix}${meta.message}${stack}`
}

export default errStackMeta
