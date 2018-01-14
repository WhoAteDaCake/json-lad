const trace = require('../trace');
const scope = require('../scope');

const {
  pathOr,
  assocPath,
  append,
  clone,
  map,
  concat,
  reduce,
} = require('ramda');

const takePath = map(entry => entry.value);

function objectPairEntry(scopes, entry) {
  const valueKey =
    entry.spec === 'variableKey' ? from(scopes, entry.key) : entry.key.value;
  return { [valueKey]: from(scopes, entry.value) };
}

function objectSpreadEntry(scopes, entry) {
  return clone(from(scopes, entry));
}

function fromObject(scopes, { entries }) {
  return reduce(
    (me, entry) => {
      let value = {};
      if (entry.type === 'pair') {
        value = objectPairEntry(scopes, entry.data);
      } else if (entry.type === 'spread-object') {
        value = objectSpreadEntry(scopes, entry.data);
      }

      return Object.assign({}, me, value);
    },
    {},
    entries
  );
}

function fromVariable(scopes, data) {
  const head = from(scopes, data.head);
  let result = head;
  if (data.path) {
    result = pathOr(undefined, takePath(data.path), head);
  }
  return result;
}

function fromLabel(scopes, data) {
  return get(scopes, data);
}

function fromCreate(scopes, data) {
  if (data.value === '{}') {
    return {};
  }
}

function fromMap(scopes, data, options) {
  const head = from(scopes, data.head);
  if (!Array.isArray(head)) {
    if (data.isLax) {
      return undefined;
    }
    trace.crash('Tried to map non array type. Use ?[] for lax map');
  }
  const level = typeof options.level === 'number' ? options.level + 1 : 0;
  const newOptions = { ...options, level };
  return head.map(entry => {
    const arrayScope = [{ [`me${level}`]: entry }];
    const newScopes = concat(scopes, arrayScope);
    return from(newScopes, data.property, newOptions);
  });
}

const valueHandlers = {
  object: fromObject,
  variable: fromVariable,
  label: fromLabel,
  create: fromCreate,
  map: fromMap,
};

function from(scopes, data, opts = {}) {
  const tEntry = trace.push({ action: 'get value', data });
  const value = valueHandlers[data.type](scopes, data, opts);
  trace.remove(tEntry);
  return value;
}

function get(scopes, variable) {
  const tEntry = trace.push({ action: 'get variable', variable });
  const value = scope.findVariable(scopes, variable.value);
  trace.remove(tEntry);
  return value;
}

function set(scopes, data, value) {
  const tEntry = trace.push({ action: 'update variable' });
  const { head } = data;

  const path =
    data.path === undefined
      ? [head.value]
      : [head.value].concat(takePath(data.path));

  const entry = assocPath(path, value, {});
  const newScopes = scope.update(scopes, entry);
  trace.remove(tEntry);
  return newScopes;
}

module.exports = {
  get,
  set,
  from,
};
