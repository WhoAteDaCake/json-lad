const { reduce } = require('ramda');
const trace = require('./trace');
const { hasTrace, traceIfFailed } = require('./trace');
const utils = require('./utils');

const printScope = require('./actions/printScope');
const assign = require('./actions/assign');

function run(instructions, initialScope, funcName) {
  let scopes = [initialScope];
  const traceEntry = trace.push({ action: `call ${funcName}` });
  for (let i = 0, len = instructions.length; i < len; i += 1) {
    const { action, ...data } = instructions[i];
    let newScope;
    switch (action) {
      case 'printScope':
        printScope(scopes, data);
        break;
      case 'assign':
        newScopes = assign(scopes, data);
        break;
    }
    scopes = newScopes;
  }
  trace.remove(traceEntry);
  return scopes;
}

module.exports = run;
