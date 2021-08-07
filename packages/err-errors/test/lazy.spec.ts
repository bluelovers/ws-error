import getSubErrors from '../index';
import { AggregateError as BluebirdAggregateError } from 'bluebird';
import { basename } from 'path';

const arr = [new Error('1'), new Error('3')] as const;

describe(basename(__filename), () =>
{


	test(`AggregateError`, () =>
	{
		let e = new AggregateError(arr);

		let actual = _check(e);

		expect(actual).toStrictEqual(e.errors);

	});

	test(`Bluebird.AggregateError`, () =>
	{
		let e = new BluebirdAggregateError();

		e.push(...arr);

		let actual = _check(e);

		expect(actual).toStrictEqual(e.slice());

	});

})

function _check(e: Error)
{
	let actual = getSubErrors(e);

	expect(actual).toStrictEqual(arr);
	expect(actual).toMatchSnapshot();

	return actual
}
