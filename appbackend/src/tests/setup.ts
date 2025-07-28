import { beforeAll } from 'vitest';
import { initDb } from '../database/initDb';

// Set up test environment
beforeAll(() => {
  // Set test database path
  process.env.DB_PATH = ':memory:';

  // Initialize the database
  initDb();
});
