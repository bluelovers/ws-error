import { $AggregateError } from 'aggregate-error-or-core-js';
import { bases, SymbolBases } from '@bluelovers/extend-bases';
import { errStackMeta, IErrStackMeta, stringifyStackMeta } from 'err-stack-meta';
import { messageWithSubErrors, indentSubErrors } from 'err-indent';

const SymbolErrStackMeta = Symbol.for('err-stack-meta');

const SymbolStackInited = Symbol.for('stack:inited');
const SymbolStackChanged = Symbol.for('stack:changed');

export { SymbolErrStackMeta, SymbolStackInited, SymbolStackChanged }

// @ts-ignore
export interface AggregateErrorExtra<T = Error> extends Omit<Array<T>, number | keyof AggregateError | 'toLocaleString'>
{
	[k: number]: T
}

// @ts-ignore
export class AggregateErrorExtra<T = Error> extends bases($AggregateError, Array)
{
	[SymbolErrStackMeta]: IErrStackMeta<this>;

	[SymbolStackInited]: boolean;
	[SymbolStackChanged]: boolean;

	constructor(errors?: Iterable<any>, message?: string)
	{
		errors ??= [];

		errors = [...errors].map(e =>
		{
			if (typeof e === 'string')
			{
				return new Error(e)
			}

			return e
		});

		let e = new $AggregateError(errors, message ?? '');

		super(
			e,
			e.errors,
		);

		e.name = 'AggregateErrorExtra';

		Error.captureStackTrace(e, AggregateErrorExtra);

	}

	get code()
	{
		// @ts-ignore
		return this[SymbolBases][0].code;
	}

	set code(code: string)
	{
		(this[SymbolBases][0] as any).code = code;
	}

	override set name(value: string)
	{
		this[SymbolBases][0].name = value ?? this[SymbolBases][0].name;
	}

	override get message(): string
	{
		return this[SymbolBases][0].message
	}

	override set message(message: string)
	{
		this[SymbolBases][0].message = message;

		if (this[SymbolStackInited])
		{
			let meta = this.meta();

			meta.message = String(message ?? '') + '\n' + indentSubErrors(this[SymbolBases][0].errors, {}, this[SymbolBases][0]);

			this[SymbolStackChanged] = true
		}
	}

	meta(refresh?: boolean): IErrStackMeta<this>
	{
		if (refresh == true || typeof this[SymbolErrStackMeta] === 'undefined')
		{
			this[SymbolErrStackMeta] = errStackMeta<any>(this[SymbolBases][0]);

			delete this[SymbolErrStackMeta].error;
		}

		this[SymbolStackInited] = true;

		return this[SymbolErrStackMeta]
	}

	override get stack(): string
	{
		let stack = this[SymbolBases][0].stack
		let meta = this.meta();

		if (!this[SymbolStackChanged] || this[SymbolStackChanged])
		{
			stack = stringifyStackMeta({
				...meta,
				message: messageWithSubErrors(this[SymbolBases][0]),
			})

			this[SymbolBases][0].stack = stack;

			this[SymbolStackChanged] = false;
		}

		return stack
	}

	override set stack(stack: string)
	{
		this[SymbolBases][0].stack = stack;
		this.meta();
		this[SymbolStackChanged] = true;
	}

	override get errors(): T[]
	{
		return this[SymbolBases][0].errors as T[]
	}

	override set errors(errors: Iterable<T>)
	{
		this[SymbolBases][1] = this[SymbolBases][0].errors = [...errors];
	}

	override toString(): string
	{
		return this[SymbolBases][0].toString.call(this)
	}

	/**
	 * @private
	 */
	protected override toLocaleString()
	{
		return this.toString()
	}

}

export default AggregateErrorExtra
