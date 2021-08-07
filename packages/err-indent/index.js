"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageWithSubErrors = exports.indentSubErrorsFromError = exports.indentSubErrors = exports.indentSubErrorMessage = exports.errorsToMessageList = exports._isAllowedIterable = void 0;
const tslib_1 = require("tslib");
const indent_string_1 = (0, tslib_1.__importDefault)(require("indent-string"));
const clean_stack_1 = (0, tslib_1.__importDefault)(require("clean-stack"));
const util_1 = require("util");
const check_iterable_1 = require("check-iterable");
const array_hyper_unique_1 = require("array-hyper-unique");
const index_1 = require("err-errors/index");
const index_2 = require("err-stack-reduce/index");
const index_3 = require("../err-stack-meta/index");
function _isAllowedIterable(arr) {
    return (typeof arr !== 'string' && !(arr instanceof String) && (0, check_iterable_1.isIterable)(arr));
}
exports._isAllowedIterable = _isAllowedIterable;
function errorsToMessageList(errors, options, mainError) {
    if (!errors || !_isAllowedIterable(errors)) {
        throw new TypeError(`Invalid input errors: ${errors}`);
    }
    options !== null && options !== void 0 ? options : (options = {});
    const { handleStack = (stack) => (0, clean_stack_1.default)(stack) } = options;
    mainError !== null && mainError !== void 0 ? mainError : (mainError = options.error);
    let _main;
    let ls = [];
    const stackReduce = (0, index_2.errStackReduceCore)(mainError, options.stackReduceOptions);
    errors
        .forEach((error) => {
        if (error === void 0 || error === null) {
            return;
        }
        if (mainError === error) {
            _main = String(error);
        }
        else if (typeof error.stack === 'string') {
            ls.push(handleStack((0, index_3.stringifyStackMeta)(stackReduce(error)), error));
        }
        else {
            ls.push((0, util_1.inspect)(error));
        }
    });
    ls = ls.filter(s => s === null || s === void 0 ? void 0 : s.length);
    if (_main === null || _main === void 0 ? void 0 : _main.length) {
        ls.unshift(_main);
    }
    return (0, array_hyper_unique_1.array_unique_overwrite)(ls);
}
exports.errorsToMessageList = errorsToMessageList;
function indentSubErrorMessage(sub_message, options) {
    var _a;
    if (_isAllowedIterable(sub_message)) {
        sub_message = [...sub_message].join('\n');
    }
    options !== null && options !== void 0 ? options : (options = {});
    return (0, indent_string_1.default)(sub_message, (_a = options.indent) !== null && _a !== void 0 ? _a : 4, options.indentOptions);
}
exports.indentSubErrorMessage = indentSubErrorMessage;
function indentSubErrors(errors, options, mainError) {
    const sub_message = errorsToMessageList(errors, options, mainError);
    return indentSubErrorMessage(sub_message, options);
}
exports.indentSubErrors = indentSubErrors;
function indentSubErrorsFromError(mainError, options) {
    let errors = (0, index_1.getSubErrors)(mainError);
    return indentSubErrors(errors, options, mainError);
}
exports.indentSubErrorsFromError = indentSubErrorsFromError;
function messageWithSubErrors(mainError, errors, options) {
    errors !== null && errors !== void 0 ? errors : (errors = (0, index_1.getSubErrors)(mainError));
    return String(mainError.message) + '\n' + indentSubErrors(errors, options, mainError);
}
exports.messageWithSubErrors = messageWithSubErrors;
exports.default = messageWithSubErrors;
//# sourceMappingURL=index.js.map