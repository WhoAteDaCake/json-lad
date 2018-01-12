const { pick, flatten, pathOr, filter } = require('ramda');
const utils = require('./utils');

function printScope([{ value, line, col }]) {
  return { action: 'printScope', index: value.length - 1, line, col };
}

function assign(contents) {
  const [to, from] = utils.clean(contents);
  return {
    to,
    from,
    action: 'assign',
  };
}

function program(args) {
  return flatten(args);
}

function line([_, operation]) {
  return operation;
}

function baseData([obj]) {
  return pick(['col', 'line', 'value'], obj);
}

function value([contents]) {
  return contents;
}

function map(contents) {
  const isLax = pathOr('', ['1', '0', '0', 'type'], contents) === '?';
  const [head, property] = utils.clean(contents);
  return { head, property, isLax, type: 'map' };
}

module.exports = {
  base: require('./base'),
  line,
  program,
  // actions
  printScope,
  assign,
  map,
  value,
};
