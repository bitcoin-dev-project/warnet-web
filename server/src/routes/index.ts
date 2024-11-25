import { Router, Request, Response } from "express"
import { teamPoints } from "./team-points";
import { forkData } from "./fork-data";
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
  forkData(app);
  pollingRoute(app);
  dbRoute(app);

  return app;
}