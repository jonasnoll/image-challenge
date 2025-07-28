import { Image } from '../types';
import { ImageResponse } from './dto.types';

export const toImagesResponseDTO = (images: Image[]): ImageResponse[] => {
  return images.map((record) => ({
    id: record.id,
    createdAt: record.createdAt,
    width: record.width,
    height: record.height,
    imageType: record.imageType,
    imageURI: `data:${record.contentType};base64,${record.imageString}`
  }));
};
