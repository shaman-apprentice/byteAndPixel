import { isAdjacent } from './utils'

describe('adjacent', () => {
  test('(1, 2) is adjacent to (2, 2)', () => {
    expect(isAdjacent(1, 2, 2, 2)).toBe(true);
  });

  test('(2, 1) is adjacent to (2, 2)', () => {
    expect(isAdjacent(2, 1, 2, 2)).toBe(true);
  });

  test('(3, 3) is adjacent to (2, 2)', () => {
    expect(isAdjacent(3, 3, 2, 2)).toBe(true);
  });

  test('(2, 3) is not adjacent to (2, 2)', () => {
    expect(isAdjacent(2, 3, 2, 2)).toBe(true);
  });

  test('(1, 2) is adjacent to (2, 1)', () => {
    expect(isAdjacent(1, 2, 2, 1)).toBe(true);
  })

  test('(2, 1) is adjacent to (1, 2)', () => {
    expect(isAdjacent(2, 1, 1, 2)).toBe(true);
  })

  test('(1, 3) is adjacent to (2, 2)', () => {
    expect(isAdjacent(1, 3, 2, 2)).toBe(false);
  });

  test('(4, 3) is not adjacent to (2, 2)', () => {
    expect(isAdjacent(4, 3, 2, 2)).toBe(false);
  });
});
