import { Router, Request, Response } from "express"
import { teamPoints } from "./team-points";
import { nodeData } from "./data";
import { pollingRoute } from "./polling";
import { dbRoute } from "./db";
import { eventsRoute } from "./events";

export const routes = () => {
  const app = Router()
  app.get("/", (_req: Request, res: Response) => {
    return res.status(200).json({ message: "Hello World" });
  });

  teamPoints(app);
  eventsRoute(app)
  nodeData(app);
  pollingRoute(app);
  dbRoute(app);

  return app;
}