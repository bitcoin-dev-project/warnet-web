import { Request, Response, Router } from "express";
import { adminAuth } from "../middleware/auth";
import { gameConfigPath, getGameConfig } from "../service/file";
import { z } from "zod";
import fs from "fs";
import { compileTeams, initializeTeamPoints, validateConfig } from "../config";

const route = Router();

export const configRoute = (app: Router) => {
  app.use("/config", adminAuth, route);

  route.post("/raw_update", async (req: Request, res: Response) => {
    const config = req.body

    const overWriteTeamPoints = req.params.overwriteTeamPoints;
    const overWriteTeamPointsBool = overWriteTeamPoints === "true";

    const isValidConfig = validateConfig(config)

    if (isValidConfig instanceof Error) {
      return res.status(400).json({
        message: isValidConfig.message,
        success: false,
        data: null,
      });
    }

    if (isValidConfig instanceof z.ZodError) {
      return res.status(400).json({
        message: isValidConfig.errors.map((error) => error.message).join(", "),
        success: false,
        data: null,
      });
    }

    fs.writeFileSync(gameConfigPath, JSON.stringify(config, null, 2));

    if (overWriteTeamPointsBool) {
      initializeTeamPoints(config.teams);
    }
    
    return res.status(200).json({
      success: true,
      data: "events",
    });
  });

  route.post("/compile-teams", async (req: Request, res: Response) => {

    try {
      const overWriteTeamPoints = req.params.overwriteTeamPoints;
      const overWriteTeamPointsBool = overWriteTeamPoints === "true";

      const config = getGameConfig();
    
      if (config instanceof Error) {
        return res.status(500).json({
          message: config.message,
          success: false,
          data: null,
        });
      }
    
      const response = await fetch(config.fork_observer_api.trim());
      
      if (!response.ok || response.status !== 200) {
        return res.status(500).json({
          message: "Error fetching data from fork_observer_api in config",
          success: false,
          data: null,
        });
      }
    
      const data = await response.json();
    
      const isValidData = data.header_infos.length > 0 && data.nodes.length > 0
    
      if (!isValidData) {
        return res.status(400).json({
          message: "Invalid data from fork_observer_api in config",
          success: false,
          data: null,
        });
      }
    
      const teamConfig = compileTeams(data)
    
      const newConfig = {...config}
      newConfig.teams = teamConfig
    
      fs.writeFileSync(gameConfigPath, JSON.stringify(newConfig, null, 2));

      if (overWriteTeamPointsBool) {
        initializeTeamPoints(teamConfig);
      }
    
      return res.status(200).json({
        message: "Teams compiled successfully",
        success: true,
        data: teamConfig,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error compiling teams",
        success: false,
        data: null,
      });
    }
  });
}
