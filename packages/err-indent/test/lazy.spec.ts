import { basename, extname } from 'path';
import messageWithSubErrors, { indentSubErrorsFromError } from '../src/index';

describe(basename(__filename, extname(__filename)), () =>
{

	test(`test`, () =>
	{

		let e = new AggregateError([new Error('1'), new Error('3')], 'ggregateError:\n' +
			'    at Object');

		let actual01 = messageWithSubErrors(e);
		let actual02 = indentSubErrorsFromError(e);

		console.log(actual01);

		console.log(actual02);

		expect(typeof actual01).toStrictEqual('string');
		expect(typeof actual02).toStrictEqual('string');

	});

})
