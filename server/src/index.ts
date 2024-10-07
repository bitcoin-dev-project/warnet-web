import express from "express";
import http from "http";
import cors from "cors";
import { wsManager } from "./service/websocket/websocketManager";
import { pollingService } from "./service/polling";
import { db, initializeEventsTable } from "./database";
import { internalDataCache } from "./service/cache/cacheManager";
import { routes } from "./routes";
import { initializeLoadedConfig } from "./config";

const app = express();
const port = 3040;

// // Create a HTTP server
const server = http.createServer(app);

// Start the server
const startServer = async () => {
  // initialize team points
  initializeLoadedConfig();
  // initialize database
  await initializeEventsTable();
  internalDataCache.initialize();
  // initialize websocket manager
  wsManager.initialize(server);
  // start polling
  pollingService.start();

  app.use(cors());
  app.use(express.json());
  app.use("/api", routes());
  app.use((_req, _res, next) => {
    const err = new Error("Resource not found!");
    console.log(err);
    next(err);
  });

  // @ts-expect-error next is required
  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }

    const status = err.status || 500;
    res.status(status).json({
      message: err.message,
      status,
    });
  });

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
