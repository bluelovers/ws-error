import errStackReduceCore from '../index';
import { basename } from 'path';

describe(basename(__filename), () =>
{

	test(`test`, () =>
	{
		let mainError = new Error();
		let error = new Error();

		let { fn, actual } = _check(mainError, error);

	});

})

function _check(mainError: Error, error: Error)
{
	let fn = errStackReduceCore(mainError);
	let actual = fn(error);

	expect(actual.prefix).toContain(error.name);
	expect(actual.stack.length).toBeGreaterThan(0);
	expect(actual.stack).toMatch(/^\s+at /);

	expect(actual).toMatchSnapshot({
		stack: expect.any(String),
		originalStack: expect.any(String),
	});

	return {
		fn,
		actual,
	}
}
