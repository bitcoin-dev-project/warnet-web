import { ForkObserverResponseData } from "../../../shared/types";
import { getLatestTipHeight } from "../../helpers"
import { CacheData } from "../cache/cacheManager"

export const cacheDataToForkObserverResponseData = (data: CacheData): ForkObserverResponseData => {
  const { latestTipHeight } = getLatestTipHeight({header_infos: data!.data.header_infos});
  return {
    ...data!.data,
    latestTipHeight,
  }
}