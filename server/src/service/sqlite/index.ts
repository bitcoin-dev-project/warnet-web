import { EVENT } from "../../../shared/types";
import { db } from "../../database";

export const saveEvents = async (events: EVENT[]) => {
  await db.run("BEGIN TRANSACTION");
  try {
    for (const event of events) {
      const meta = event.meta ? JSON.stringify(event.meta) : null;
      await db.run("INSERT INTO events (message, date, type, meta) VALUES (?, ?, ?, ?)", [event.message, event.date, event.type, meta]);
    }
    await db.run("COMMIT TRANSACTION");
    return;
  } catch (error) {
    await db.run("ROLLBACK TRANSACTION");
    console.error("Error saving events to database:", error);
    return new Error("Error saving events to database");
  }
};

export const getEvents = async (): Promise<Error | EVENT[]> => {
  return new Promise((resolve) => {
    db.all("SELECT * FROM events ORDER BY id DESC", [], (err, rows) => {
      if (err) {
        console.error("Error fetching events from database:", err);
        resolve(new Error("Error fetching events from database"));
      } else {
        (rows as EVENT[]).map((item) => {
          try {
            item.meta = item.meta ? JSON.parse((item.meta as unknown as string)) : null;
            return item;
          } catch (error) {
            return item;
          }
        });
        resolve(rows as EVENT[]);
      }
    });
  });
};

export const clearAllEvents = async () => {
  await db.run("BEGIN TRANSACTION");
  try {
    await db.run("DELETE FROM events");
    await db.run("COMMIT TRANSACTION");
    return;
  } catch (error) {
    await db.run("ROLLBACK TRANSACTION");
    console.error("Error clearing events:", error);
    return new Error("Error clearing events");
  }
}