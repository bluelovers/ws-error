import { AggregateError as _AggregateError } from 'core-js-pure/features/promise';

let $AggregateError: typeof AggregateError;

if (typeof AggregateError !== 'undefined' && AggregateError !== null)
{
	$AggregateError = AggregateError
}
else
{
	$AggregateError = require('core-js-pure/features/promise').AggregateError
}

export { $AggregateError }

export default $AggregateError
