/**
 * @type { AggregateError }
 */
let $AggregateError = void 0;

if (typeof AggregateError !== 'undefined' && AggregateError !== null)
{
	$AggregateError = AggregateError
}
else
{
	// @ts-ignore
	$AggregateError = await import('core-js-pure/features/aggregate-error.js')
}

export { $AggregateError }

export default $AggregateError
