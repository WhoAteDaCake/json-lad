const sinon = require('sinon');
const main = require('../../main');
const utils = require('../../mocks/utils');

describe('object', () => {
  it('should be able to create empty object', () => {
    const initialScope = { INPUT: 'test' };
    const resp = main('a={};', initialScope);
    expect(resp[0].a instanceof Object).toBe(true);
  });

  it('should be able to create object with data', () => {
    const initialScope = { INPUT: 'test' };
    const resp = main('a={ test: INPUT };', initialScope);
    expect(resp[0].a).toEqual(
      expect.objectContaining({
        test: 'test',
      })
    );
  });

  it('should handle variables for key', () => {
    const initialScope = { INPUT: { a: 'value', b: 'key' } };
    const resp = main('a={ [INPUT.b]: INPUT.a };', initialScope);
    expect(resp[0].a).toEqual(expect.objectContaining({ key: 'value' }));
  });

  it('should handle spread syntax inside object', () => {
    const initialScope = {
      INPUT: { a: { key: 'val1', extra: 'extra' }, b: { key: 'val2' } },
    };
    const resp = main('a = { key : INPUT.b.key, ...INPUT.a };', initialScope);
    expect(resp[0].a).toEqual(
      expect.objectContaining(
        Object.assign({}, initialScope.INPUT.b, initialScope.INPUT.a)
      )
    );
  });
});
