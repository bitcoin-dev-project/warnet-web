import { Request, Response, Router } from "express";
import { adminAuth } from "../middleware/auth";
import { pollingService } from "../service/polling";
import { clearAllEvents } from "../service/sqlite";
import { getGameConfig, teamPointsPath } from "../service/file";
import { initializeTeamPoints } from "../config";
import { internalDataCache } from "../service/cache/cacheManager";

const route = Router();

export const resetRoute = (app: Router) => {
  app.use("/reset", adminAuth, route);

  route.post("/", async (_req: Request, res: Response) => {
    try {
      const isRunning = pollingService.isRunning();
      if (isRunning) {
        pollingService.stop();
      }

      try {
        // reset team points
        console.log("resetting team points")

        const gameConfig = getGameConfig();
  
        if (gameConfig instanceof Error) {
          return res.status(500).json({
            message: gameConfig.message,
            success: false,
            data: null,
          });
        }
  
        const { teams } = gameConfig;
        initializeTeamPoints(teams);
      } catch (error: any) {
        console.error("Error resetting team points:", error);
        return res.status(500).json({
          message: "Error resetting team points: " + error?.message,
          success: false,
          data: null,
        });
      }

      // clear cache
      console.log("clearing cache")
      internalDataCache.reset();

      return res.status(200).json({
        message: "Database reset",
        success: true,
        data: null,
      });

    } catch (error: any) {
      console.error("Error resetting", error);
      return res.status(500).json({
        message: error?.message ?? "Error resetting",
        success: false,
        data: null,
      });
    }
  });
}
