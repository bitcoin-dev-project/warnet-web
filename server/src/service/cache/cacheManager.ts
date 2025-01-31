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
    if (this.cache.old === null) {
      this.set("old", data);
      this.set("new", data);
      return;
    }
    // console.log(`old: ${this.cache.new?.hash} oldHeight: ${this.cache.new?.data.header_infos[15].height} \n new: ${data?.hash} newHeight: ${data?.data.header_infos[15].height}`)
    
    this.set("old", this.cache.new);
    this.set("new", data);
  }

  reset() {
    this.set("old", null);
    this.set("new", null);
  }
}

export const internalDataCache = new CacheManager();