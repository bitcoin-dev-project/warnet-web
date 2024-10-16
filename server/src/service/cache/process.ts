import { ForkObserverData } from "../../../shared/types";
import { isSameHash } from "../diff/compareHash";
import { internalDataCache } from "./cacheManager";
import { transformToCacheData } from "./utils";

export const processDataToCache = (data: ForkObserverData) => {
  const oldCacheData = internalDataCache.get("old");
  const newCacheData = transformToCacheData(data);
  const isSameData = isSameHash(newCacheData, oldCacheData);
  if (isSameData) {
    return new Error("Data not saved to cache, exact hash already exists");
  }
  internalDataCache.update(newCacheData);
}