import { Request, Response, Router } from "express";
import { getTeamPoints, updateTeamPoints } from "../service/file";
import { createEventForStylePoints, processEvents } from "../domain/events";
import { adminAuth } from "../middleware/auth";

const route = Router();

export const teamPoints = (app: Router) => {
  app.use("/team-points", route);

  route.get("/", (_req: Request, res: Response) => {
    const teamPoints = getTeamPoints()
    if (teamPoints instanceof Error) {
      return res.status(500).json({
        message: teamPoints.message,
        success: false,
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      data: teamPoints,
    });
  });

  route.post("/", adminAuth, async (req: Request, res: Response) => {
    const { name, score, reason } = req.body;
    if (!name || !score) {
      return res.json({
        message: "Invalid request",
        success: false,
        data: null,
      }).status(400);
    }
    const updatedTeamPoints = await updateTeamPoints(name, score);
    if (updatedTeamPoints instanceof Error) {
      return res.status(500).json({
        message: updatedTeamPoints.message,
        success: false,
        data: null,
      });
    }

    const event = createEventForStylePoints(name, score, reason);
    await processEvents([event]);

    return res.status(200).json({
      success: true,
      data: updatedTeamPoints,
    });
  });

}
