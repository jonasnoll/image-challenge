import { fetchActorImage, fetchBearImage, fetchCatImage } from '../api/externalApis';
import { retrieveLatestImage, saveImages } from '../database/imageRepository';
import { Image, ImageDimension } from '../types';
import { getUniqueRandomDimensions } from '../utils/getUniqueRandomDimensions';

export class ImageService {
  // get images from external api
  static async getImages(imageType: string, amount: number) {
    // get fetch function based on image type
    const fetchImage = {
      bear: fetchBearImage,
      cat: fetchCatImage,
      actor: fetchActorImage
    }[imageType];

    if (!fetchImage) {
      throw new Error('Invalid image type');
    }

    // get dimensions
    const dimensions = getUniqueRandomDimensions(amount);
    // promises to fetch images in parallel
    const imagePromises = dimensions.map(async ({ width, height }: ImageDimension) => {
      try {
        const resp = await fetchImage(width, height);
        const contentType = resp.headers.get('content-type') ?? 'image/jpeg'; // todo: could be better null handling
        // image string for now
        const buffer = await resp.arrayBuffer();
        const imageString = Buffer.from(buffer).toString('base64');

        const img: Image = {
          id: crypto.randomUUID(),
          createdAt: new Date(),
          width,
          height,
          imageType,
          imageString,
          contentType
        };
        return img;
      } catch (error) {
        console.warn(`Failed to fetch dimensions ${width}×${height}:`, error);
        return null;
      }
    });

    const fetchedImages = await Promise.all(imagePromises);
    // only use valid images, filter out nulls
    const images = fetchedImages.filter((img) => img !== null);

    // batch save to db
    saveImages(images);

    return images;
  }

  // get latest image from db
  static async getLatestImage() {
    try {
      const latestImage = retrieveLatestImage();
      if (!latestImage) {
        return null;
      }
      return latestImage;
    } catch (error) {
      console.warn('Failed to retrieve latest image:', error);
      return null;
    }
  }
}
