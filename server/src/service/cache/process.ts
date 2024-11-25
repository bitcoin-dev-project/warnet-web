import { ForkObserverData } from "../../../shared/types";
import { isSameHash } from "../diff/compareHash";
import { internalDataCache } from "./cacheManager";
import { transformToCacheData } from "./utils";

export const processDataToCache = (data: ForkObserverData): Error | void => {
  const currentCacheData = internalDataCache.get("new");
  const newData = transformToCacheData(data);

  const isSameData = isSameHash(newData, currentCacheData);
  if (isSameData) {
    return new Error("Data not saved to cache, exact hash already exists");
  }
  internalDataCache.update(newData);
}