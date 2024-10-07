import path from "path";
import fs from "fs";
import { GameConfig } from "../../shared/types";
import { getGameConfig, getTeamPoints } from "../service/file";

const teamPath = path.resolve(process.cwd(), "..", "data", "team-points.json");

// const savedDefaultDataPath = path.resolve(process.cwd(), "..", "_default", "data.json");

export const initializeTeamPoints = (teams: GameConfig["teams"]) => {
  const teamPoints = fs.readFileSync(teamPath, "utf-8");
  if (!teamPoints) {
    return;
  }

  const teamsJson: {[key: string]: number} = {};

  teams.forEach((team) => {
    teamsJson[team.name] = 0;
  });
  
  fs.writeFileSync(
    teamPath,
    JSON.stringify(teamsJson, null, 2),
    "utf-8"
  );
};

export function initializeLoadedConfig() {
  const config = getGameConfig();
  if (config instanceof Error) {
    console.log("Error loading config:", config.message);
    process.exit(1);
  }

  const teamPoints = getTeamPoints();

  if (!(teamPoints instanceof Error)) {
    return;
  }
  
  const { teams } = config;
  initializeTeamPoints(teams)
}
