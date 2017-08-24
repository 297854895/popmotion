const varType = (variable) => Object.prototype.toString.call(variable).slice(8, -1);

const CAMEL_CASE_PATTERN = /([a-z])([A-Z])/g;
const REPLACE_TEMPLATE = '$1-$2';
const HAS_PERFORMANCE_NOW = (typeof performance !== 'undefined' && performance.now);

/*
  Convert camelCase to dash-case

  @param [string]
  @return [string]
*/
export const camelToDash = (string) => string.replace(CAMEL_CASE_PATTERN, REPLACE_TEMPLATE).toLowerCase();

/*
  Generate current timestamp
  
  @return [timestamp]: Current UNIX timestamp
*/
export const currentTime = HAS_PERFORMANCE_NOW ? () => performance.now() : () => new Date().getTime();

export const setDOMAttrs = (element, attrs) => {
  for (let key in attrs) {
    if (attrs.hasOwnProperty(key)) {
      element.setAttribute(key, attrs[key]);
    }
  }
};
/*
  Split comma-delimited string

  "foo,bar" -> ["foo", "bar"]

  @param [string]
  @return [array]
*/
export const splitCommaDelimited = (value) => isString(value) ? value.split(/,\s*/) : [value];

/**
 *  Returns a function that will check any argument for `term`
 * `contains('needle')('haystack')`
 */
export const contains = (term) => (v) => {
  return (isString(term) && v.indexOf(term) !== -1);
};

/**
 *  Returns a function that will check to see if an argument is
 *  the first characters in the provided `term`
 * `isFirstChars('needle')('haystack')`
 */
export const isFirstChars = (term) => (v) => {
  return (isString(term) && v.indexOf(term) === 0);
};

/**
 * Create a unit value type
 */
export const createUnitType = (type, transform) => {
  return {
    test: contains(type),
    parse: parseFloat,
    transform
  };
};

/*
  Get value from function string
  "translateX(20px)" -> "20px"
*/
export const getValueFromFunctionString = (value) => value.substring(value.indexOf('(') + 1, value.lastIndexOf(')'));

/**
 * Creates a function that will split color
 * values from string into an object of properties
 * `mapArrayToObject(['red', 'green', 'blue'])('rgba(0,0,0)')`
 */
export function splitColorValues(terms) {
  const numTerms = terms.length;

  return function (v) {
    const values = {};
    const valuesArray = splitCommaDelimited(getValueFromFunctionString(v));

    for (let i = 0; i < numTerms; i++) {
      values[terms[i]] = (valuesArray[i] !== undefined) ? parseFloat(valuesArray[i]) : 1;
    }

    return values;
  };
}

/*
  Is utils var an array ? 
  
  @param: Variable to test
  @return [boolean]: Returns true if utils.varType === 'Array'
*/
export const isArray = (arr) => varType(arr) === 'Array';

/*
  Is utils var a function ? 
  
  @param: Variable to test
  @return [boolean]: Returns true if utils.varType === 'Function'
*/
export const isFunc = (obj) => varType(obj) === 'Function';

/*
  Is utils var a number?
  
  @param: Variable to test
  @return [boolean]: Returns true if typeof === 'number'
*/
export const isNum = (num) => typeof num === 'number';

/*
  Is utils var an object?
  
  @param: Variable to test
  @return [boolean]: Returns true if typeof === 'object'
*/
export const isObj = (obj) => typeof obj === 'object';

/*
  Is utils var a string ? 
  
  @param: Variable to test
  @return [boolean]: Returns true if typeof str === 'string'
*/
export const isString = (str) => typeof str === 'string';

export const isHex = isFirstChars('#');
export const isRgb = isFirstChars('rgb');
export const isHsl = isFirstChars('hsl');
export const isColor = (v) => (isHex(v) || isRgb(v) || isHsl(v));

/*
  Cheap implementation of Facebook's invariant

  @param [boolean]: If false, throw
  @param [string]: Message to throw
 */
const isDev = (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development');
const noop = () => {};
export const invariant = isDev ? (condition, message) => {
  if (!condition) return;

  const error = new Error(message);
  error.name = 'Invariant violation';
  error.framesToPop = 1;
  throw error;
} : noop;
