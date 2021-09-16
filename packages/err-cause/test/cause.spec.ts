import { basename, extname } from 'path';
import { errCause, isSupportedErrorCause } from '../index';
import { gte } from 'semver';

test(`isSupportedErrorCause: node = ${process.versions.node}, v8 = ${process.versions.v8}`, () =>
{

	let actual = isSupportedErrorCause();
	let expected = gte(process.versions.node, '16.9.0') ? true : expect.any(Boolean);

	console.log(`isSupportedErrorCause = ${actual}`)

	expect(actual).toEqual(expected);

});

test(`errCause`, () =>
{
	const cause = new Error();
	const err = new Error();

	let actual = errCause(err, cause);

	expect(actual).toHaveProperty('cause', cause);

});
