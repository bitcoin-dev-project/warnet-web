import { Request, Response, Router } from "express";
import { adminAuth } from "../middleware/auth";
import { pollingService } from "../service/polling";
import { clearAllEvents } from "../service/sqlite";

const route = Router();

export const dbRoute = (app: Router) => {
  app.use("/db", adminAuth, route);

  route.post("/reset", (_req: Request, res: Response) => {
    const isRunning = pollingService.isRunning();
    if (isRunning) {
      pollingService.stop();
    }
    const clearEvents = clearAllEvents();
    if (clearEvents instanceof Error) {
      return res.status(500).json({
        message: clearEvents.message,
        success: false,
        data: null,
      });
    }
    return res.status(200).json({
      message: "Database reset",
      success: true,
      data: null,
    });
  });
}
