const { filter } = require('ramda');
const utils = require('./utils');

function objectEntry(type) {
  return contents => {
    const data = utils.clean(contents);
    return { type, data: data[0] };
  };
}

function newObject([{ col, line }]) {
  return { type: 'create', col, line, value: '{}' };
}

function object(contents) {
  const entries = utils.clean(contents);
  return { entries, type: 'object' };
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

module.exports = { label, newObject, variable, pair, object, objectEntry };
