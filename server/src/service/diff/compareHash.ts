import { internalDataCache } from "../cache/cacheManager"
import crypto from "crypto";

export const createHash = (data: any) => {
  return crypto.createHash("sha256").update(JSON.stringify(data)).digest("hex");
}

export const isSameHash = (data: any) => {
  const oldHash = internalDataCache.get("old")?.hash;
  if (!oldHash) return false;

  const newHash = createHash(data);
  return newHash === oldHash;
};
