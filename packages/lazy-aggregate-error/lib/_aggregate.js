"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateError = void 0;
const promise_1 = require("core-js-pure/features/promise");
let $AggregateError;
exports.AggregateError = $AggregateError;
if (typeof AggregateError !== 'undefined' && AggregateError !== null) {
    exports.AggregateError = $AggregateError = AggregateError;
}
else {
    exports.AggregateError = $AggregateError = promise_1.AggregateError;
}
exports.default = $AggregateError;
//# sourceMappingURL=_aggregate.js.map