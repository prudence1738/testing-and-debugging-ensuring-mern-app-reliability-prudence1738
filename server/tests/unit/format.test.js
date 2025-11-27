const { titleCase } = require('../../src/utils/format');

describe('titleCase util', () => {
  test('capitalizes words', () => {
    expect(titleCase('hello world')).toBe('Hello World');
  });

  test('handles empty string', () => {
    expect(titleCase('')).toBe('');
  });
});
