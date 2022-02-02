"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$AggregateError = void 0;
let $AggregateError;
exports.$AggregateError = $AggregateError;
if (typeof AggregateError !== 'undefined' && AggregateError !== null) {
    exports.$AggregateError = $AggregateError = AggregateError;
}
else {
    exports.$AggregateError = $AggregateError = require('core-js-pure/features/aggregate-error');
}
exports.default = $AggregateError;
//# sourceMappingURL=index.cjs.map