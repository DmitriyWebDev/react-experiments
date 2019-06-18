/**
 * Removes all non-numeric from string
 * @param {string} str - input string
 */
export const removeAllNonNumeric = (str = '') => str.replace(/\D/g, '');

/**
 * Removes all non-numeric from string
 * @param {string} str - input string
 */
export const getValidFloatString = (str = '') => {
  let foo = str.replace(/[^\d.]/g, ''); // get numeric and dots only
  if (!foo) return '';
  if (foo.indexOf('.') === -1) return foo.toLocaleString();
  foo = foo.split('.');
  if (foo.length > 1) {
    foo = foo[0].toLocaleString() + '.' + foo[1];
  } else {
    foo = foo[0].toLocaleString();
  }
  return foo;
};

/**
 * Checks string in 'float' format like "1.789", on invalid
 * @param {string} string - string for check
 */
export function checkFloatStringIsInvalid(string = '') {
  const checkedStr = string + '';
  if (!checkedStr || !removeAllNonNumeric(checkedStr).length) {
    return true;
  }
  if (checkedStr[0] === '.' || !checkedStr[0] || Number(checkedStr[0]) <= 0) {
    return true;
  }
  return false;
}

/**
 * Converts to number valid string which
 * in 'number' or 'float' format like "1.789" or "576"
 * @param {string} string - valid string for converting,
 * string must contain only one dot maximum
 */
export function convertNumbFloatStringToNumber(string = '') {
  if (string.indexOf('.') > -1) return parseFloat(string);
  return Number(string);
}
