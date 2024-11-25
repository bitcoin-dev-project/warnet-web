import { Router, Request, Response } from "express"
import { teamPoints } from "./team-points";
import { forkData } from "./fork-data";
import { pollingRoute } from "./polling";
import { dbRoute } from "./db";
import { eventsRoute } from "./events";
import { resetRoute } from "./reset";
import { configRoute } from "./config";

export const routes = () => {
  const app = Router()
  app.get("/", (_req: Request, res: Response) => {
    return res.status(200).json({ message: "Hello World" });
  });

  teamPoints(app);
  eventsRoute(app)
  forkData(app);
  pollingRoute(app);
  dbRoute(app);
  configRoute(app);
  resetRoute(app);

  return app;
}