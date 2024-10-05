import path from "path";
import fs from "fs";
import { GameConfig } from "../../shared/types";

const configPath = path.resolve(process.cwd(), "..", "config.json");

export const getConfig = () => {
  const CONFIG_DATA = fs.readFileSync(configPath, "utf-8");
  try {
    return JSON.parse(CONFIG_DATA) as GameConfig;
  } catch (error) {
    return new Error("Error parsing config file");
  }
} 
