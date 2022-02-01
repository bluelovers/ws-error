import errStackMeta from '../src/index';
import { basename } from 'path';

describe(basename(__filename), () =>
{

	test(`test`, () =>
	{
		let e = new AggregateError([new Error('1'), new Error('3')], 'ggregateError:\n' +
			'    at Object');

		_check(e);

	});

	test(`test2`, () =>
	{
		let e = new AggregateError([new Error('1'), new Error('3')], 'ggregateError:');

		_check(e);

	});

	test(`test3`, () =>
	{
		let e = new AggregateError([new Error('1'), new Error('3')], 'AggregateError:');

		_check(e);

	});

	test(`test4`, () =>
	{
		let e = new AggregateError([new AggregateError([new Error('1'), new Error('3')]), new Error('3')], 'AggregateError:');

		e.name = 'AggregateError2';

		_check(e);

	});

})

function _check(e: Error)
{
	let actual = errStackMeta(e);

	expect(actual.prefix).toContain(e.name);
	expect(actual.stack.length).toBeGreaterThan(0);
	expect(actual.stack).toMatch(/^\s+at /);

	expect(actual).toMatchSnapshot({
		stack: expect.any(String),
	});
}
