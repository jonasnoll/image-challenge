import Database from 'better-sqlite3';

const dbPath = process.env.DB_PATH;

if (!dbPath) {
  throw new Error('Environment variable DB_PATH is not set');
}
// open (or create) the db file
const db = new Database(dbPath, {});

export default db;
