import path from "path";
import { promises as fs, readFileSync } from "fs";
import { AwardedTeamPoints, ForkObserverData, GameConfig } from "../../../shared/types";

const teamPointsPath = path.resolve(process.cwd(), "..", "data", "team-points.json");
const nodeDataPath = path.resolve(process.cwd(), "..", "public", "header-and-teams.json");
const gameConfigPath = path.resolve(process.cwd(), "..", "config.json");

export const getTeamPoints = () => {
  const file = readFileSync(teamPointsPath, "utf-8");
    if (!file) {
      return new Error("File not found");
    }
    try {
      const data = JSON.parse(file);
      return data as Record<string, number>;
    }
    catch (error) {
      return new Error("Error parsing file");
    }
}

export const updateTeamPoints = async (name: string, score: number) => {
  try {
    const file = await fs.readFile(teamPointsPath, "utf-8");
    if (!file) {
      return new Error("File not found");
    }

    const data = JSON.parse(file);
    data[name] = (data[name] ?? 0) + score;

    await fs.writeFile(teamPointsPath, JSON.stringify(data, null, 2), "utf-8");
    return data as AwardedTeamPoints;
    
  } catch (error: any) {
    return new Error(`Error saving file: ${error?.message ?? ""}`);
  }
}

export const getGameConfig = () => {
  const file = readFileSync(gameConfigPath, "utf-8");
    if (!file) {
      return new Error("File not found");
    }
    try {
      const data = JSON.parse(file);
      return data as GameConfig;
    }
    catch (error) {
      return new Error("Error parsing file");
    }
}

export const getNodeData = () => {
  const file = readFileSync(nodeDataPath, "utf-8");
    if (!file) {
      return new Error("File not found");
    }
    try {
      const data = JSON.parse(file);
      return data as ForkObserverData;
    }
    catch (error) {
      return new Error("Error parsing file");
    }
}