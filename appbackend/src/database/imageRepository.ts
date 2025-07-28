import { Image } from '../types';
import db from './connection';

// save images in batch
export function saveImages(images: Image[]): void {
  if (!images.length) return;

  const insertStatement = db.prepare(`
    INSERT INTO images (
      id,
      createdAt,
      width,
      height,
      imageType,
      imageString,
      contentType
    ) VALUES (
      @id,
      @createdAt,
      @width,
      @height,
      @imageType,
      @imageString,
      @contentType
    )
  `);
  // batch insert
  const insertAll = db.transaction((images: Image[]) => {
    for (const img of images) {
      insertStatement.run({
        id: img.id,
        createdAt: img.createdAt.toISOString(), // Iso string for sorting
        width: img.width,
        height: img.height,
        imageType: img.imageType,
        imageString: img.imageString,
        contentType: img.contentType
      });
    }
  });

  insertAll(images);
}

// Retrieve the most recently created Image.
export function retrieveLatestImage(): Image | null {
  const row = db
    .prepare(
      `
      SELECT
        id,
        createdAt,
        width,
        height,
        imageType,
        imageString,
        contentType
      FROM images
      ORDER BY createdAt DESC
      LIMIT 1
    `
    )
    .get() as any;

  if (!row) {
    return null;
  }

  return {
    id: row.id,
    createdAt: new Date(row.createdAt),
    width: row.width,
    height: row.height,
    imageType: row.imageType,
    imageString: row.imageString,
    contentType: row.contentType
  };
}
