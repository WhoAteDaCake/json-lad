const trace = require('../trace');
const scope = require('../scope');
const utils = require('../utils');

function printScope(scopes, { index, line, col }) {
  const tEntry = trace.push({ action: 'print scope', line, col });
  const resp = scope.get(scopes, index);
  utils.print('<Print scope>');
  utils.nicePrint(resp);
  utils.print('</Print scope>');
  trace.remove(tEntry);
}
module.exports = printScope;
