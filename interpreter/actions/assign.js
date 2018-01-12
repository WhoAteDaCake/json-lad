const variable = require('../variable');
const trace = require('../trace');

function assign(scopes, { to, from }) {
  const tEntry = trace.push({ action: 'assign', col: to.col, line: to.line });
  const value = variable.from(scopes, from);
  const newScopes = variable.set(scopes, to, value);
  trace.remove(tEntry);
  return newScopes;
}
module.exports = assign;
