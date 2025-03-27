# Getting Started

Install dependencies:

```bash
yarn install
```

Then, run the development server:

```bash
yarn dev
```

---

# Configuration

## Core Config

There is a configuration file in the root of the project: **`config.json`**.  
You can modify this file to change the configurations.

### Structure:
- **`teams`**: An array of teams. Each team has:
  - A `name`
  - An array of `nodes` to attack.
- **`points_config`**: An object containing:
  - `points_per_lagging_node`: Points awarded to a node lagging behind the latest block.
  - `points_per_unreachable_node`: Points awarded to an unreachable node.
  - `core_version`: Additional points for a lagging/unreachable node if its version matches the one defined here.
- **`config`**:
  - `blocks_behind_before_considered_lagging`: Number of blocks a node must lag before being considered "lagging."
- **`fork_observer_api`**: The data source for polling.

> **Note:**  
> Without `fork_observer_api`, the game will use dummy data from `/public/header-and-teams.json`,  
> simulating an increasing highest tip from 80 to 82 every 5 seconds.

---

## Team Points Config

An editable **team-points** config can be found in **`data/team-points.json`**.  

> **Note:**  
> - This file is auto-generated and should **not** be overwritten manually.  
> - Points awarded to teams are written to this file.  
> - You can manually edit it **only** to set up initial points for teams.

---

# API

The server starts polling the fork observer API every **10 seconds** on startup.

## Authentication

Endpoints requiring authentication must include the `x-auth-key` header in the request.

**Example:**
```http
x-auth-key: YOUR_SECRET_KEY
```

---

## Polling **(Auth required)**

- **Start polling:**  
  ```http
  POST /api/polling/start
  ```
- **Stop polling:**  
  ```http
  POST /api/polling/stop
  ```

---

## Config

- **Get config file:**  
  ```http
  GET /api/config
  ```
- **Update config file (Auth required):**  
  ```http
  POST /api/config/raw_update
  ```
  - Overwrites the config file with the provided data.
  - If `overwriteTeamPoints=true` (query param), team points will be overwritten.

### Compile Teams **(Auth required)**

```http
POST /api/config/compile-teams
```

**Query Parameters:**
1. `fork_observer_api` (string) **required**
2. `overwriteTeamPoints` (boolean)  
   - If `overwriteTeamPoints=true`, resets all team points to **0**.

This **compiles the teams** from the fork observer API and populates the `teams` field in the config file.

---

## Team Points

- **Get team points:**  
  ```http
  GET /api/team-points
  ```
- **Update team points (Auth required):**  
  ```http
  POST /api/team-points
  ```

**Request Body Example:**
```json
{
    "name": "zip",
    "score": 5,
    "reason": "test"
}
```

---

## Events

- **Get all events (header height changes, fork observer data changes, awarded points):**  
  ```http
  GET /api/events
  ```

---

## Node Data

- **Get header and nodes data:**  
  ```http
  GET /api/fork-data
  ```

---

## Reset **(Auth required)**

- **Reset all data (cache, events, team points):**  
  ```http
  POST /api/reset
  ```
  - Useful for a restart or a new game.

- **Reset database (Auth required):**  
  ```http
  POST /api/db/reset
  ```
  - Clears all events.

---

# Setup to Start a New Game 🚀🚀

This is my usual process to initialize a new game:

1. **Reset everything:** Call the [reset endpoint](#reset-auth-required).  
2. **Stop polling:** Call [stop polling](#polling-auth-required).  
3. **Compile teams:** Call [compile teams](#compile-teams-auth-required) (`api/config/compile-teams`).  
   - You need to provide `fork_observer_api` here.
   - pass `overwriteTeamPoints` in queryparams as true

And that’s it! 🎉
