import { AggregateError as _AggregateError } from 'core-js-pure/features/promise';

let $AggregateError: typeof AggregateError;

if (typeof AggregateError !== 'undefined' && AggregateError !== null)
{
	$AggregateError = AggregateError
}
else
{
	$AggregateError = _AggregateError
}

export { $AggregateError as AggregateError }

export default $AggregateError
