const nearley = require('nearley');
const grammar = require('./grammar.js');
const interpreter = require('./interpreter');

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
module.exports = (program, data) => {
  parser.feed(program);
  return interpreter(parser.results[0], data, 'main');
};
