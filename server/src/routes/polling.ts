import { Request, Response, Router } from "express";
import { adminAuth } from "../middleware/auth";
import { pollingService } from "../service/polling";

const route = Router();

export const pollingRoute = (app: Router) => {
  app.use("/polling", adminAuth, route);

  route.post("/start", (_req: Request, res: Response) => {
    const isRunning = pollingService.isRunning();
    if (isRunning) {
      return res.status(200).json({
        message: "Polling service is already running",
        success: false,
        data: null,
      });
    }
    pollingService.start();
    return res.status(200).json({
      message: "Polling service started",
      success: true,
      data: null,
    });
  });

  route.post("/stop", (_req: Request, res: Response) => {
    const isRunning = pollingService.isRunning();
    if (!isRunning) {
      return res.status(200).json({
        message: "Polling service is not running",
        success: false,
        data: null,
      });
    }
    pollingService.stop();
    return res.status(200).json({
      message: "Polling service stopped",
      success: true,
      data: null,
    });
  });

}
