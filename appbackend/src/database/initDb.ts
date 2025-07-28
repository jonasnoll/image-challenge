import db from './connection';

export function initDb(): void {
  try {
    const createImagesTable = `
    CREATE TABLE IF NOT EXISTS images (
      id TEXT PRIMARY KEY,
      createdAt TEXT NOT NULL,
      width INTEGER NOT NULL,
      height INTEGER NOT NULL,
      imageType TEXT NOT NULL,
      imageString TEXT NOT NULL,
      contentType TEXT NOT NULL
      );
    `;
    db.exec(createImagesTable);
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
