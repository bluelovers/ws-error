import AggregateErrorExtra from '../src/index';

test(`not.toThrow`, () =>
{

	let actual = new AggregateErrorExtra();

	expect(() => actual.stack).not.toThrow();

});

