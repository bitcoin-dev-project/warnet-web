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
      
      await clearAllEvents();

      const gameConfig = getGameConfig();

      if (gameConfig instanceof Error) {
        return res.status(500).json({
          message: gameConfig.message,
          success: false,
          data: null,
        });
      }

      const { teams } = gameConfig;
      // reset team points
      console.log("resetting team points")
      initializeTeamPoints(teams);

      // clear cache
      console.log("clearing cache")
      internalDataCache.reset();

      return res.status(200).json({
        message: "All data reset",
        success: true,
        data: null,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error?.message ?? "Error resetting",
        success: false,
        data: null,
      });
    }
  });
}
