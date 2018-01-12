const { clone, mergeDeepRight } = require('ramda');
const trace = require('./trace');

function get(scopes, index) {
  const tEntry = trace.push({ action: 'get scope', scopes });
  if (scopes.length <= index) {
    trace.crash(
      `Tried to access non existing scope. Size: ${
        scopes.length
      }, tried to scope at index: ${index}`
    );
  }
  trace.remove(tEntry);
  return scopes[index];
}

function findVariable(scopes, name) {
  const tEntry = trace.push({
    action: 'find variable in scope',
    name: `${name}`,
  });
  let value = 'not-found';

  for (let i = scopes.length - 1; i >= 0; i -= 1) {
    if (scopes[i][name] !== undefined) {
      value = scopes[i][name];
      break;
    }
  }
  if (value === 'not-found') {
    trace.crash(`Could not find '${name}' variable`);
    return undefined;
  }
  trace.remove(tEntry);
  return value;
}

function update(scopes, entry) {
  const tEntry = trace.push({ action: 'update scope', entry });
  const newScopes = clone(scopes);
  const lastScope = newScopes.length - 1;
  newScopes[lastScope] = mergeDeepRight(newScopes[lastScope], entry);
  return newScopes;
}

module.exports = {
  get,
  update,
  findVariable,
};
