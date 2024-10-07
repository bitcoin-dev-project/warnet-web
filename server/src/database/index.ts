import sqlite3 from "sqlite3";

// Connect to a SQLite database or create it if it doesn't exist
export const db = new sqlite3.Database("./src/database/database.db", async (err) => {
  if (err) {
    console.error("Could not connect to database", err);
  } else {
    console.log("Connected to the SQLite database");
    try {
      // Enable foreign key support
      await db.run("PRAGMA foreign_keys = ON");
      console.log('Foreign keys enabled');
    } catch (error) {
      console.error('Failed to enable foreign keys:', error);
    }
  }
});

export const initializeEventsTable = async () => {
  const eventsTable = `CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL,
    date TEXT NOT NULL,
    type TEXT,
    meta TEXT
  )`;

  return db.run(eventsTable);
};
