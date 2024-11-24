import { core } from "../../domain/core";

class PollingService {
  private interval: NodeJS.Timeout | null = null;
  private pollingInterval: number = 1000 * 10; // defaults to every 10 seconds

  constructor(pollingInterval?: number) {
    if (pollingInterval) {
      this.pollingInterval = pollingInterval;
    };
  }

  start() {
    this.interval = setInterval(() => {
      core();
    }, this.pollingInterval);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  isRunning() {
    return this.interval !== null;
  }
}

export const pollingService = new PollingService();