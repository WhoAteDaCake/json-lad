const { filter } = require('ramda');
const utils = require('./utils');

function newObject([{ col, line }]) {
  return { type: 'create', col, line, value: '{}' };
}

function label([{ value, col, line }]) {
  return { type: 'label', value, col, line };
}

function variable(contents, index) {
  const values = utils.clean(contents);
  const head = values.shift();
  return {
    head,
    type: 'variable',
    path: values.length !== 0 ? values : undefined,
  };
}

function pair(spec) {
  return (...contents) => {
    const [key, value] = utils.clean(contents);
    return { key, value, type: 'pair', spec };
  };
}

function object(contents) {
  const pairs = filter(p => p.key !== undefined, utils.clean(contents));
  return { pairs, type: 'object' };
}
module.exports = { label, newObject, variable, pair, object };
