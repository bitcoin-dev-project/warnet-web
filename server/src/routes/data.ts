import { Request, Response, Router } from "express";
// import { getNodeData } from "../service/file";
import { internalDataCache } from "../service/cache/cacheManager";
import { cacheDataToForkObserverResponseData } from "../service/transformers";

const route = Router();

export const nodeData = (app: Router) => {
  app.use("/fork-data", route);

  route.get("/", (req: Request, res: Response) => {
    const cacheData = internalDataCache.get("new");
    // if (cacheData instanceof Error) {
    //   const nodeData = getNodeData()
    //   if (nodeData instanceof Error) {
    //     return res.status(500).json({
    //       message: nodeData.message,
    //       success: false,
    //       data: null,
    //     });
    //   }
    // }

    const data = cacheDataToForkObserverResponseData(cacheData);
    
    return res.status(200).json({
      success: true,
      data: data,
    });
  });
}
