import { describe, expect, it } from 'vitest';
import { toImagesResponseDTO } from '../controllers/toDTO';
import { Image } from '../types';

describe('toDTO tests', () => {
  const images: Image[] = [
    {
      id: '1',
      createdAt: new Date(),
      width: 100,
      height: 100,
      imageType: 'bear',
      imageString: 'xxxxx',
      contentType: 'image/jpeg'
    },
    {
      id: '2',
      createdAt: new Date(),
      width: 100,
      height: 100,
      imageType: 'keanu',
      imageString: 'xxxxx',
      contentType: 'image/svg+xml'
    }
  ];

  describe('toImagesResponseDTO', () => {
    it('should convert Image array to ImageResponse array', () => {
      const result = toImagesResponseDTO(images);

      expect(result).toHaveLength(2);
      expect(result).toEqual(
        expect.arrayContaining([
          {
            id: '1',
            createdAt: images[0].createdAt,
            width: 100,
            height: 100,
            imageType: 'bear',
            imageURI: 'data:image/jpeg;base64,xxxxx'
          },
          {
            id: '2',
            createdAt: images[1].createdAt,
            width: 100,
            height: 100,
            imageType: 'keanu',
            imageURI: 'data:image/svg+xml;base64,xxxxx'
          }
        ])
      );
    });

    it('should handle empty array', () => {
      const result = toImagesResponseDTO([]);
      expect(result).toHaveLength(0);
    });
  });
});
