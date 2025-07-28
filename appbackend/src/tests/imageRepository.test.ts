import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import db from '../database/connection';
import { retrieveLatestImage, saveImages } from '../database/imageRepository';
import { Image } from '../types';

describe('ImageRepository', () => {
  // Clean up database before and after each test
  beforeEach(() => {
    // Clear all data from the images table
    db.prepare('DELETE FROM images').run();
  });

  afterEach(() => {
    // Clean up after each test
    db.prepare('DELETE FROM images').run();
  });

  describe('saveImages', () => {
    it('should save images to database', () => {
      const testImages: Image[] = [
        {
          id: 'test-id-1',
          createdAt: new Date('2024-01-01'),
          width: 100,
          height: 200,
          imageType: 'bear',
          imageString: 'base64-image-data-1',
          contentType: 'image/jpeg'
        },
        {
          id: 'test-id-2',
          createdAt: new Date('2024-01-02'),
          width: 300,
          height: 400,
          imageType: 'cat',
          imageString: 'base64-image-data-2',
          contentType: 'image/png'
        }
      ];

      // Save images
      saveImages(testImages);

      // Verify images were saved
      const savedImages = db.prepare('SELECT * FROM images').all() as any[];
      expect(savedImages).toHaveLength(2);
      expect(savedImages[0].id).toBe('test-id-1');
      expect(savedImages[1].id).toBe('test-id-2');
    });

    it('should handle empty array gracefully', () => {
      // This should not throw an error
      expect(() => saveImages([])).not.toThrow();

      // Verify no images were saved
      const savedImages = db.prepare('SELECT * FROM images').all() as any[];
      expect(savedImages).toHaveLength(0);
    });

    it('should handle database errors', () => {
      // Create an invalid image (missing required fields)
      const invalidImages: any[] = [
        {
          id: 'test-id'
          // Missing other required fields
        }
      ];

      // This should throw an error due to missing fields
      expect(() => saveImages(invalidImages)).toThrow();
    });
  });

  describe('retrieveLatestImage', () => {
    it('should return latest image when exists', () => {
      const testImages: Image[] = [
        {
          id: 'older-id',
          createdAt: new Date('2025-01-01'),
          width: 100,
          height: 200,
          imageType: 'bear',
          imageString: 'base64-old',
          contentType: 'image/jpeg'
        },
        {
          id: 'newer-id',
          createdAt: new Date('2025-01-02'),
          width: 300,
          height: 400,
          imageType: 'cat',
          imageString: 'base64-new',
          contentType: 'image/png'
        }
      ];

      saveImages(testImages);

      const latestImage = retrieveLatestImage();
      expect(latestImage).not.toBeNull();
      expect(latestImage?.id).toBe('newer-id');
      expect(latestImage?.imageType).toBe('cat');
    });

    it('should return null when no images exist', () => {
      const latestImage = retrieveLatestImage();
      expect(latestImage).toBeNull();
    });
  });
});
