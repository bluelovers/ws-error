import indentString from 'indent-string';
import _cleanStack from 'clean-stack';
import { inspect } from 'util';
import { isIterable } from 'check-iterable';
import { array_unique_overwrite } from 'array-hyper-unique';
import { getSubErrors } from 'err-errors';
import { errStackReduceCore } from 'err-stack-reduce';
import { stringifyStackMeta } from 'err-stack-meta';
import { parseStack } from 'error-stack2';

function _isAllowedIterable(arr) {
  return typeof arr !== 'string' && !(arr instanceof String) && isIterable(arr);
}
function errorsToMessageList(errors, options, mainError) {
  var _options, _mainError, _main2;

  if (!errors || !_isAllowedIterable(errors)) {
    throw new TypeError(`Invalid input errors: ${errors}`);
  }

  (_options = options) !== null && _options !== void 0 ? _options : options = {};
  const {
    handleStack = stack => _cleanStack(stack)
  } = options;
  (_mainError = mainError) !== null && _mainError !== void 0 ? _mainError : mainError = options.error;

  let _main;

  let ls = [];
  const stackReduce = errStackReduceCore(mainError, options.stackReduceOptions);
  errors.forEach(error => {
    if (error === void 0 || error === null) {
      return;
    }

    if (mainError === error) {
      _main = String(error);
    } else if (typeof error.stack === 'string') {
      ls.push(handleStack(stringifyStackMeta(stackReduce(error)), error));
    } else {
      ls.push(inspect(error));
    }
  });
  ls = ls.filter(s => s === null || s === void 0 ? void 0 : s.length);

  if ((_main2 = _main) !== null && _main2 !== void 0 && _main2.length) {
    ls.unshift(_main);
  }

  return array_unique_overwrite(ls);
}
function indentSubErrorMessage(sub_message, options) {
  var _options2, _options$indent;

  if (_isAllowedIterable(sub_message)) {
    sub_message = [...sub_message].join('\n');
  }

  (_options2 = options) !== null && _options2 !== void 0 ? _options2 : options = {};
  return indentString(sub_message, (_options$indent = options.indent) !== null && _options$indent !== void 0 ? _options$indent : 4, options.indentOptions);
}
function indentSubErrors(errors, options, mainError) {
  const sub_message = errorsToMessageList(errors, options, mainError);
  return indentSubErrorMessage(sub_message, options);
}
function indentSubErrorsFromError(mainError, options) {
  let errors = getSubErrors(mainError);
  return indentSubErrors(errors, options, mainError);
}
function messageWithSubErrors(mainError, errors, options) {
  var _errors;

  (_errors = errors) !== null && _errors !== void 0 ? _errors : errors = getSubErrors(mainError);

  let _e = parseStack(mainError.stack, mainError.message);

  let lines = [];

  if (typeof _e.message !== 'undefined') {
    lines.push(_e.message);
  }

  let _em2 = indentSubErrors(errors, options, mainError);

  if (_em2.length) {
    if (lines.length === 0) {
      lines.push('');
    }

    lines.push(_em2);
  }

  if (lines.length) {
    return lines.join('\n');
  }

  return void 0;
}

export { _isAllowedIterable, messageWithSubErrors as default, errorsToMessageList, indentSubErrorMessage, indentSubErrors, indentSubErrorsFromError, messageWithSubErrors };
//# sourceMappingURL=index.esm.mjs.map
