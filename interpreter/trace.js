const sid = require('shortid');
const utils = require('./utils');

const stack = [];

function push(data) {
  stack.push(data);
  return { action: data.action, id: sid.generate() };
}
// Use this entry argument for future, when we want better error tracing
function remove(entry) {
  stack.pop();
}

function crash(message) {
  utils.print('-----------------------------------');
  utils.print(message);
  utils.print('-----------------------------------');
  stack.reverse();
  throw JSON.stringify(stack.slice(0, 20), null, 2);
}

module.exports = {
  push,
  remove,
  crash,
};
