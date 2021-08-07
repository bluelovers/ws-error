import { ITSPickExtra } from 'ts-type';

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

	if (!/\n/.test(error.message))
	{
		let ls = error.stack.split('\n')

		front = ls.shift();
		stack = ls.join('\n');

		i = front.lastIndexOf(error.message);

		prefix = error.stack.slice(0, i);
	}
	else
	{
		i = error.stack.indexOf(error.message, 1);

		if (i !== -1)
		{
			prefix = error.stack.slice(0, i);
			stack = error.stack.slice(i + error.message.length)

			if (stack.trim().indexOf(error.message) === 0)
			{
				i = error.stack.indexOf(error.message, i + error.message.length);

				prefix = error.stack.slice(0, i);
				stack = error.stack.slice(i + error.message.length)
			}
		}
		else
		{
			stack = error.stack
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
