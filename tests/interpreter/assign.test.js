const sinon = require('sinon');
const main = require('../../main');
const utils = require('../../mocks/utils');

// jest.unmock('../../interpreter/trace');
const trace = require('../../interpreter/trace');
const tPushSpy = sinon.spy(trace, 'push');
const tRemoveSpy = sinon.spy(trace, 'remove');

describe('assign', () => {
  beforeEach(() => {
    tPushSpy.reset();
    tRemoveSpy.reset();
  });

  it('should add and remove its trace', () => {
    const initialScope = { DATA: 'test' };
    const resp = main('a=DATA;', initialScope);
    expect(utils.calledWithAction('assign', tPushSpy)).toBe(true);
    expect(utils.calledWithAction('assign', tRemoveSpy)).toBe(true);
  });

  it('should be able to create new values', () => {
    const initialScope = { DATA: 'test' };
    const resp = main('a={};', initialScope);
    expect(resp[0].a instanceof Object).toBe(true);
  });

  it('should be able to assign basic values', () => {
    const initialScope = { DATA: 'test' };
    const resp = main('a=DATA;', initialScope);
    expect(resp[0].a).toBe(initialScope.DATA);
  });

  it('should be able to assign nested values', () => {
    const initialScope = { DATA: { value: 'test' } };
    const resp = main('a=DATA.value;', initialScope);
    expect(resp[0].a).toBe(initialScope.DATA.value);
  });

  it('should be able to assign value to a nested variable', () => {
    const initialScope = { DATA: { value: 'test' } };
    const resp = main('a.v1=DATA.value;', initialScope);
    expect(resp[0].a.v1).toBe(initialScope.DATA.value);
  });

  it('should be able to assign multiple nested values to a nested variable', () => {
    const initialScope = { DATA: { value: 'test' } };
    const resp = main('a.v1=DATA.value;a.v2=DATA.value;', initialScope);
    expect(resp[0].a.v1).toBe(initialScope.DATA.value);
    expect(resp[0].a.v2).toBe(initialScope.DATA.value);
  });

  it('should be able to asign mapped values', () => {
    const initialScope = { DATA: [{ k1: 'v1' }, { k1: 'v2' }] };
    const resp = main('a=DATA[me0.k1];', initialScope);
    expect(resp[0].a).toEqual(['v1', 'v2']);
  });
});
