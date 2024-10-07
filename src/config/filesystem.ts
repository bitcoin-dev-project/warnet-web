import path from "path";
import fs from "fs";
import { AwardedTeamPoints, EVENT, GameConfig } from "@/types";

export const teamPath = path.join(process.cwd(), "data", "team-points.json");
export const eventsPath = path.join(process.cwd(), "data", "events.json");
export const configPath = path.join(process.cwd(), "config.json");

export const getConfig = async () => {
  const config = fs.readFileSync(configPath, "utf8");
  try {
    return JSON.parse(config) as GameConfig;
  } catch (error) {
    return new Error("Error parsing config file");
  }
};

export const getTeamPoints = async () => {
  const teamPoints = fs.readFileSync(teamPath, "utf8");
  try {
    return JSON.parse(teamPoints) as AwardedTeamPoints;
  } catch (error) {
    return new Error("Error parsing team points file");
  }
};

export const getEvents = async () => {
  const events = fs.readFileSync(eventsPath, "utf8");
  try {
    return JSON.parse(events) as EVENT[];
  } catch (error) {
    return new Error("Error parsing events file");
  }
};
