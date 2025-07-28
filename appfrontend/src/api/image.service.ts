import type { CategoryImage } from '../types';

const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3030';

export class ImageService {
  private static readonly PATH = `${apiUrl}/images`;

  static async getImages(imageType: string, amount: number): Promise<CategoryImage[]> {
    try {
      const response = await fetch(`${this.PATH}?imageType=${imageType}&amount=${amount}`);
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData?.error || 'Failed to fetch images');
      }
      return responseData.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
        throw error;
      } else {
        console.error('Unknown error:', error);
        throw new Error('Unknown error occurred');
      }
    }
  }

  static async getLatestImage(): Promise<CategoryImage> {
    try {
      const response = await fetch(`${this.PATH}/latest`);
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData?.error || 'Failed to fetch latest image');
      }
      return responseData.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
        throw error;
      } else {
        console.error('Unknown error:', error);
        throw new Error('Unknown error occurred');
      }
    }
  }
}
