import { Request, Response, Router } from "express";
import { getEvents } from "../service/sqlite";

const route = Router();

export const eventsRoute = (app: Router) => {
  app.use("/events", route);

  route.get("/", async (_req: Request, res: Response) => {
    const events = await getEvents()
    if (events instanceof Error) {
      return res.status(500).json({
        message: events.message,
        success: false,
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      data: events,
    });
  });
}
