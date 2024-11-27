import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function setupDatabase() {
  const db = await open({
    filename: "./auth/mydatabase.db",
    driver: sqlite3.Database,
  });

  await db.exec(`CREATE TABLE IF NOT EXISTS tokens (
    userId TEXT PRIMARY KEY,
    token TEXT NOT NULL
  )`);

  await db.exec(`
    CREATE TRIGGER IF NOT EXISTS insert_or_update_token
    AFTER INSERT ON tokens
    BEGIN
      UPDATE tokens SET token = NEW.token WHERE userId = NEW.userId;
    END;
  `);

  return db;
}

export default setupDatabase;
