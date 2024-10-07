import { ForkObserverData } from "../../../shared/types";
import { isSameHash } from "../diff/compareHash";
import { internalDataCache } from "./cacheManager";
import { transformToCacheData } from "./utils";

export const processDataToCache = (data: ForkObserverData) => {
  const isSameData = isSameHash(data);
  if (isSameData) {
    return new Error("Data not saved to cache, exact hash already exists");
  }
  const newCacheData = transformToCacheData(data);
  internalDataCache.update(newCacheData);
}