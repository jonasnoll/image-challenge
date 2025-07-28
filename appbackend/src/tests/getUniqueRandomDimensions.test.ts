import { describe, expect, it } from 'vitest';
import { getUniqueRandomDimensions } from '../utils/getUniqueRandomDimensions';

describe('getUniqueRandomDimensions', () => {
  it('should return the correct number of dimensions', () => {
    const amount = 5;
    const result = getUniqueRandomDimensions(amount);

    expect(result).toHaveLength(amount);
  });

  it('should return unique dimensions', () => {
    const amount = 10;
    const result = getUniqueRandomDimensions(amount);

    // Check that all dimensions are unique
    const uniqueDimensions = new Set(result.map((dim) => `${dim.width}x${dim.height}`));

    expect(uniqueDimensions.size).toBe(amount);
  });
});
