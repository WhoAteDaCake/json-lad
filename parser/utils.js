const { compose, filter, flatten } = require('ramda');
const { BASE_TOKEN_TYPES } = require('../constants/parser');

function notBaseOrNull(d) {
  if (d !== null && typeof d === 'object') {
    return !BASE_TOKEN_TYPES.includes(d.type);
  }
  return d !== null;
}

const clean = compose(filter(notBaseOrNull), flatten);

module.exports = {
  clean,
};
