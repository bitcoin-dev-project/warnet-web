import { ForkObserverData } from "../../../shared/types";
import { createHash } from "../diff/compareHash";
import { CacheData } from "./cacheManager";

export const transformToCacheData = (data: ForkObserverData): CacheData => {
  const hash = createHash(data);
  return {
    data,
    hash,
  };
};