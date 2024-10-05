import { ForkObserverData } from "../../../shared/types";

export type CacheData = {
  data: ForkObserverData;
  hash: string;
} | null;

type InternalDataCache = {
  old: CacheData;
  new: CacheData;
};

class CacheManager {
  private cache: InternalDataCache = {
    old: null,
    new: null,
  };

  private set(key: keyof InternalDataCache, value: CacheData) {
    this.cache[key] = value;
  }

  initialize() {
    this.cache = {
      old: null,
      new: null,
    };
  }

  get(key: keyof InternalDataCache) {
    return this.cache[key];
  }

  update(data: CacheData) {
    this.set("old", this.cache.new);
    this.set("new", data);
  }
}

export const internalDataCache = new CacheManager();