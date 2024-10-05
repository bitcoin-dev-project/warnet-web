import { websocketMessageType } from "../../../shared/types";
import { internalDataCache } from "../cache/cacheManager";
import { transformToCacheData } from "../cache/utils";
import { isSameHash } from "../diff/compareHash";
import { generateEvents } from "../diff/events";
import { wsManager } from "../websocket/websocketManager";
import { fetchData } from "./fetch";

class PollingService {
  private interval: NodeJS.Timeout | null = null;
  private pollingInterval: number = 1000 * 5;

  constructor(pollingInterval: number) {
    this.pollingInterval = pollingInterval;
  }

  start() {
    this.interval = setInterval(() => {
      this.core();
    }, this.pollingInterval);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  async core() {
    const data = await fetchData();
    if (data instanceof Error) {
      console.log("Error fetching data:", data.message);
      return;
    }
    // move code in block to db repository
    const isSameData = isSameHash(data);
    if (isSameData) {
      console.log("Same data");
      return;
    }
    const newCacheData = transformToCacheData(data);
    internalDataCache.update(newCacheData);
    wsManager.broadcast({
      type: websocketMessageType.ForkObserverData,
      message: "ForkObserverData",
    })
    // end of block
    const events = generateEvents();
    if (events instanceof Error) {
      console.log("Error generating events:", events.message);
      return;
    }
    // implement save events to database
  }
}

export const pollingService = new PollingService(1000 * 5);