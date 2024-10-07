import { ForkObserverData } from "../../../shared/types";
import { getGameConfig, getNodeData } from "../file";

let fork_observer_api = ""
const gameConfig = getGameConfig();
if (!(gameConfig instanceof Error)) {
  fork_observer_api = gameConfig.fork_observer_api;
}

export const fetchData = async (): Promise<ForkObserverData | Error> => {
  if (!fork_observer_api.trim()) {
    return getNodeData();
  }

  const response = await fetch(fork_observer_api.trim());
  const data = await response.json();
  return data as ForkObserverData;
};
