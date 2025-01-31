import { Request, Response, Router } from "express";
import { internalDataCache } from "../service/cache/cacheManager";
import { cacheDataToForkObserverResponseData } from "../service/transformers";

const route = Router();

export const forkData = (app: Router) => {
  app.use("/fork-data", route);

  route.get("/", (req: Request, res: Response) => {
    // debugging
    console.log("Cache on forkdata:", internalDataCache.get("new"));
    const cacheData = internalDataCache.get("new");

    if (cacheData === null) {
      return res.status(500).json({
        success: false,
        data: null
      })
    }
    const data = cacheDataToForkObserverResponseData(cacheData);
    
    return res.status(200).json({
      success: true,
      data: data,
    });
  });
}
