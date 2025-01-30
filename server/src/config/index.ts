import fs from "fs";
import { ForkObserverData, GameConfig } from "../../shared/types";
import { getGameConfig, getTeamPoints, teamPointsPath } from "../service/file";
import { z } from "zod";

const TeamSchema = z.object({
  name: z.string(),
  nodes: z.array(z.string()),
});

const GameConfigSchema = z.object({
  teams: z.array(TeamSchema),
  points_config: z.object({
    points_per_lagging_node: z.number(),
    points_per_unreachable_node: z.number(),
    core_version: z.record(z.string(), z.number()),
  }),
  config: z.object({
    blocks_behind_before_considered_lagging: z.number(),
  }),
  fork_observer_api: z.string(),
});

export const initializeTeamPoints = (teams: GameConfig["teams"]) => {
  const teamsJson: {[key: string]: number} = {};

  teams.forEach((team) => {
    teamsJson[team.name] = 0;
  });

  console.log("derived teams json:", teamsJson)
  
  try {
    fs.writeFileSync(
      teamPointsPath,
      JSON.stringify(teamsJson, null, 2),
      "utf-8"
    );
  } catch (error: any) {
    console.error("Failed to write team points to file:", error?.message);
  }
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

export const validateConfig = (config: any): GameConfig | Error => {
  try {
    const parsedConfig = GameConfigSchema.parse(config);
    return config as GameConfig;
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      return error;
    }
    return new Error("Invalid config");
  }
}

export const compileTeams = (data: ForkObserverData) => {
  const teamConfig: GameConfig["teams"] = [] 
  const lookup: Record<string, number> = {}
  data.nodes.forEach((node: any) => {
    const name = node.name;
    const isTeamNode = node.name.split('-').length === 3
    if (isTeamNode) {
      const [_tank, _id, team] = node.name.split('-')
      if (lookup[team] !== undefined) {
        const position = lookup[team]
        teamConfig[position].nodes.push(name)
      } else {
        teamConfig.push({
          name: team,
          nodes: [name]
        })
        lookup[team] = teamConfig.length - 1
      }
    }
    return;
  })
  return teamConfig;
}