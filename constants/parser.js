const TOKEN_CONFIG = {
  word: /[a-zA-Z0-9@]+/,
  newObject: /{}/,
  printScope: /#+/,
  NL: { match: /\n/, lineBreaks: true },
  ' ': ' ',
  ':': ':',
  '.': '.',
  ';': ';',
  ',': ',',
  '{': '{',
  '}': '}',
  '(': '(',
  ')': ')',
  '[': '[',
  ']': ']',
  '=>': '=>',
  '=': '=',
  '#': '#',
  '?': '?',
};

const BASE_TOKEN_TYPES = Object.keys(TOKEN_CONFIG);

module.exports = {
  TOKEN_CONFIG,
  BASE_TOKEN_TYPES,
};
