import { removeObjectProperty } from '../../src/utils/removeObjectProperty';

describe('tests removeObjectProperty util', () => {
  const testObject = {
    test: 'test',
    number: 123,
    frog: 'kermit',
    array: [1, 1, 1, 1],
    object: {
      test: 'test',
      number: 123
    }
  };

  const objectKeys = Object.keys(testObject);

  it.each(objectKeys)('should remove %s from testObject', (key) => {
    const removedPropObject = removeObjectProperty(testObject, key);

    expect(removedPropObject).not.toHaveProperty(key);
  });
});
