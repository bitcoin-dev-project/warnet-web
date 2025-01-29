## Getting Started

install dependencies

```bash
yarn install
```

Then, run the development server:

```bash
yarn dev
```


## Configuration

### Core config
There is a configuration file in the root of the project `config.json`. You can change the configurations in this file.

The file has the following key/value configs
- teams: An array of teams. Each team has a name and an array of nodes to attack.
- points_config: An object with the following key/value configs
  - points_per_lagging_node: The points awarded to a node if it is lagging behind the latest block.
  - points_per_unreachable_node: The points awarded to a node if it is unreachable. 
  - core_version: The additional points awarded to a lagging/unreachable node if its version matches the version defined here.
- config: An object with the following key/value configs
  - blocks_behind_before_considered_lagging: The amount of blocks behind the latest tip before a node is considered as lagging
- fork_observer_api: The source of data to poll from

Note: Without the fork_observer_api, the game will start with dummy data located at `/public/header-and-teams.json` and simulate increaing heighest tip from 80 to 82 every 5 seconds.

### Team points config
An editable team-points config can be found in `data/team-points.json`. (Do not worry if you don't have this file, it will be generated for you on first run)

Note: This file is auto-generated and should not be overwritten. Points awarded to teams gets written to this file. Only edit this file if you want to setup initial points for certain teams.

## API
The server starts polling the fork observer api every 10 seconds on startup.

### Polling
POST `/api/polling/start` starts polling the fork observer api.
POST `/api/polling/stop` stops polling the fork observer api.

### Database
POST `/api/db/reset` resets the database.

### Config
GET `api/config` returns the config file

POST `/api/config/raw_update` updates the config file.
- overwrites the config file with the provided config
- overwrites the team points if query param `overwriteTeamPoints` is set to true

POST `api/config/compile-teams` compiles the teams from the fork observer api and populates teams in the config file

### Team Points
GET `api/team-points` returns the team points

POST `api/team-points` updates the team points
body paramter e.g
```json
{
    "name": "zip",
    "score": 5,
    "reason": "test"
}
```

### Node Data
GET `/api/fork-data` returns the header and nodes data

### Reset
POST `/api/db/reset` resets the data db. This is useful if you want to restart the game.

