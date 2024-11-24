import { EVENT } from "../../../shared/types";
import { db } from "../../database";

export const saveEvents = async (events: EVENT[]): Promise<{ success: boolean }> => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("BEGIN TRANSACTION", (err) => {
        if (err) {
          console.error("Error starting transaction:", err);
          return reject(err);
        }

        const stmt = db.prepare("INSERT INTO events (message, date, type, meta) VALUES (?, ?, ?, ?)");
        
        try {
          for (const event of events) {
            const meta = event.meta ? JSON.stringify(event.meta) : null;
            stmt.run([event.message, event.date, event.type, meta]);
          }
          
          stmt.finalize();
          
          db.run("COMMIT", (commitErr) => {
            if (commitErr) {
              console.error("Error committing transaction:", commitErr);
              db.run("ROLLBACK");
              return reject(commitErr);
            }
            resolve({ success: true });
          });
        } catch (error) {
          console.error("Error saving events to database:", error);
          db.run("ROLLBACK");
          reject(new Error("Error saving events to database"));
        }
      });
    });
  });
};

export const getEvents = async (): Promise<EVENT[]> => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM events ORDER BY id DESC", [], (err, rows) => {
      if (err) {
        console.error("Error fetching events from database:", err);
        return reject(new Error("Error fetching events from database"));
      }
      
      const events = (rows as EVENT[]).map((item) => {
        try {
          return {
            ...item,
            meta: item.meta ? JSON.parse(item.meta as unknown as string) : null
          };
        } catch (error) {
          return item;
        }
      });
      
      resolve(events);
    });
  });
};

export const clearAllEvents = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("BEGIN TRANSACTION", (err) => {
        if (err) {
          console.error("Error starting transaction:", err);
          return reject(err);
        }

        db.run("DELETE FROM events", (deleteErr) => {
          if (deleteErr) {
            console.error("Error clearing events:", deleteErr);
            db.run("ROLLBACK");
            return reject(new Error("Error clearing events"));
          }

          db.run("COMMIT", (commitErr) => {
            if (commitErr) {
              console.error("Error committing transaction:", commitErr);
              db.run("ROLLBACK");
              return reject(commitErr);
            }
            console.log("DB cleared");
            resolve();
          });
        });
      });
    });
  });
};
