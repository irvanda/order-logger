const FORMATTERS = {
  DD: (date) => addZeroPads(2, '' + date.getDate()),
  D: (date) => '' + date.getDate(),
  MM: (date) => addZeroPads(2, '' + (date.getMonth() + 1)),
  M: (date) => '' + (date.getMonth() + 1),
  YYYY: (date) => addZeroPads(4, '' + date.getFullYear()),
  YY: (date) => ('' + date.getFullYear()).substr(-2),
  HH: (date) => addZeroPads(2, '' + date.getHours()),
  H: (date) => '' + date.getHours(),
  mm: (date) => addZeroPads(2, '' + date.getMinutes()),
  m: (date) => '' + date.getMinutes(),
  ss: (date) => addZeroPads(2, '' + date.getSeconds()),
  s: (date) => '' + date.getSeconds(),
};

const ESCAPE = '\\[[^\\[\\]]*\\]';

function createMatcher() {
  const matchers = Object.keys(FORMATTERS).concat(ESCAPE);
  return new RegExp(matchers.join('|'), 'g');
}

function addZeroPads(length, text) {
  if (text.length >= length) return text;
  return addZeroPads(length, '0' + text);
}

/**
 * formatDate(new Date(), "[Day] D [at] h'mm");
 * //=> "Day 25 at 11'59"
 * @param {Number | String} date - A date value (unix / iso date string).
 * @param {String} format - A string with tokens (like Moment.js tokens).
 * @returns {String}
 */
export default function formatDate(value, format) {
  const date = new Date(value);
  return format.replace(createMatcher(), (token) => {
    if (FORMATTERS.hasOwnProperty(token)) return FORMATTERS[token](date);
    return token.replace(/\[|\]/g, '');
  });
}
