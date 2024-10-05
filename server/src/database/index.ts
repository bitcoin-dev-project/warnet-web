import sqlite3 from "sqlite3";

// Connect to a SQLite database or create it if it doesn't exist
export const db = new sqlite3.Database("./src/database/database.db", (err) => {
  if (err) {
    console.log("from db", process.cwd());
    console.error("Could not connect to database", err);
  } else {
    console.log("Connected to the SQLite database");
  }
});

export const initializeEventsTable = async () => {
  const eventsTable = `CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT,
    date TEXT
  )`;

  return await db.run(eventsTable);
};
