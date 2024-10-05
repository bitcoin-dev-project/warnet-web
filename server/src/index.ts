import express, { Request, Response } from "express";
import http from "http";
import { wsManager } from "./service/websocket/websocketManager";
import { pollingService } from "./service/polling";
import { db } from "./database";
import { internalDataCache } from "./service/cache/cacheManager";

const app = express();
const port = 3040;

// // Create a HTTP server
const server = http.createServer(app);

// // Example: create a new table
// db.serialize(() => {
//   db.run(`CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     email TEXT
//   )`);
// });

// // Example route to get users
// app.get('/users', (req: Request, res: Response) => {
//   db.all('SELECT * FROM users', [], (err, rows) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// Start the server
const startServer = async () => {
  
  internalDataCache.initialize();
  // initialize websocket manager
  wsManager.initialize(server);
  // start polling
  pollingService.start();

  server
    .listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    })
    .on("error", (err) => {
      pollingService.stop();
      db.close((err) => {
        if (err) {
          console.error("Could not close database", err);
        } else {
          console.log("Closed the database connection");
        }
      });
      console.error(err);
      process.exit(1);
    })
    .on("exit", () => {
      pollingService.stop();
      db.close((err) => {
        if (err) {
          console.error("Could not close database", err);
        } else {
          console.log("Closed the database connection");
        }
      });
      console.info("Server stopped");
    });
};

startServer();

// // Close the database connection
// process.on("SIGINT", () => {
//   db.close((err) => {
//     if (err) {
//       console.error("Could not close database", err);
//     } else {
//       console.log("Closed the database connection");
//     }
//     process.exit();
//   });
// });
