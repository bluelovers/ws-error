import { AggregateError } from './lib/_aggregate';
import { bases, SymbolBases } from '@bluelovers/extend-bases';
import { errStackMeta, IErrStackMeta } from 'err-stack-meta/index';

const SymbolErrStackMeta = Symbol.for('err-stack-meta');

export { SymbolErrStackMeta }

export class AggregateErrorExtra<T> extends bases(AggregateError, Array)
{
	[SymbolErrStackMeta]: IErrStackMeta<this>;

	constructor(errors?: Iterable<any>, message?: string)
	{
		errors ??= [];

		let e = new AggregateError(errors, message);

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

	set code(value: string)
	{
		// @ts-ignore
		this[SymbolBases][0].code = code;
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
	}

	meta(refresh?: boolean)
	{
		if (refresh == true || typeof this[SymbolErrStackMeta] === 'undefined')
		{
			// @ts-ignore
			this[SymbolErrStackMeta] = errStackMeta(this[SymbolBases][0]);
		}

		return this[SymbolErrStackMeta]
	}

	override get stack(): string
	{
		let stack = this[SymbolBases][0].stack

		this.meta();

		return stack
	}

	override set stack(stack: string)
	{
		this[SymbolBases][0].stack = stack;
	}

	override get errors(): T[]
	{
		return this[SymbolBases][0].errors as T[]
	}

	override set errors(errors: Iterable<T>)
	{
		this[SymbolBases][1] = this[SymbolBases][0].errors = [...errors];
	}

	override toString()
	{
		return this[SymbolBases][0].toString.call(this)
	}

}

export default AggregateErrorExtra
