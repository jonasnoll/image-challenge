import { ImageDimension } from '../types';

export const getUniqueRandomDimensions = (amount: number) => {
  const dims: ImageDimension[] = [];
  while (dims.length < amount) {
    // ten increments between 10 and 1000
    const width = Math.floor(Math.random() * 100 + 1) * 10;
    const height = Math.floor(Math.random() * 100 + 1) * 10;
    // check if combo extist in array
    if (!dims.some((dim) => dim.width === width && dim.height === height)) {
      dims.push({ width, height });
    }
  }

  return dims;
};
