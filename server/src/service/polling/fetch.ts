import { ForkObserverData } from "../../../shared/types";
import { getGameConfig, getNodeData } from "../file";

let inMemoryData = getNodeData();

let fork_observer_api = ""
const gameConfig = getGameConfig();
if (!(gameConfig instanceof Error)) {
  fork_observer_api = gameConfig.fork_observer_api;
}

export const fetchData = async ({allowDummyData = true}: {allowDummyData?: boolean}): Promise<ForkObserverData | Error> => {
  try {
    if (!fork_observer_api.trim()) {
      if (!allowDummyData) {
        return new Error("No fork observer api provided");
      }
      if (inMemoryData instanceof Error) {
        return inMemoryData;
      }

      // parse and stringify to deep copy
      const data = JSON.parse(JSON.stringify(inMemoryData)) as ForkObserverData;

      // invert a node's reachable status to simulate activity
      data.nodes[3].reachable = !data.nodes[3].reachable

      inMemoryData = {...data};

      return data;
    }
  
    const response = await fetch(fork_observer_api.trim());
    if (!response.ok || response.status !== 200) {
      return new Error("Error fetching data");
    }
    const data = await response.json();
    return data as ForkObserverData;
  } catch (error: any) {
    return new Error(`Error fetching data: ${error?.message ?? ""}`);
  }
};
