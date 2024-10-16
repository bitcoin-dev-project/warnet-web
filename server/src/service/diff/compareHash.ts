import { CacheData, internalDataCache } from "../cache/cacheManager"
import crypto from "crypto";

export const createHash = (data: any) => {
  return crypto.createHash("sha256").update(JSON.stringify(data)).digest("hex");
}

export const isSameHash = <T extends CacheData>(newCache: T, oldCache: T) => {
  const oldHash = oldCache?.hash;
  if (!oldHash) return false;

  const newHash = newCache?.hash;
  return newHash === oldHash;
};
