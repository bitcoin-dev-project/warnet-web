import express, { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { WebSocketServer } from 'ws';
import http from 'http';
import { startPolling } from './service/polldata';
import { wsManager } from './service/websocket/websocketManager';

const app = express();
const port = 3040;

// // Create a HTTP server
const server = http.createServer(app);

// // Create a WebSocket server
// export const wss = new WebSocketServer({ server });

const wss = wsManager.initialize(server);

startPolling();

// Connect to a SQLite database or create it if it doesn't exist
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to the SQLite database');
  }
});

// Example: create a new table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
  )`);
});

// Example route to get users
app.get('/users', (req: Request, res: Response) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Close the database connection
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Could not close database', err);
    } else {
      console.log('Closed the database connection');
    }
    process.exit();
  });
});
