import { ForkObserverData } from "../../../shared/types";
import { getGameConfig, getNodeData } from "../file";

let inMemoryData = getNodeData();

let fork_observer_api = ""
const gameConfig = getGameConfig();
if (!(gameConfig instanceof Error)) {
  fork_observer_api = gameConfig.fork_observer_api;
}

export const fetchData = async (): Promise<ForkObserverData | Error> => {
  try {
    // if (!fork_observer_api.trim()) {
    //   return getNodeData();
    // }

    if (!fork_observer_api.trim()) {
      if (inMemoryData instanceof Error) {
        return inMemoryData;
      }
      const data = JSON.parse(JSON.stringify(inMemoryData));
      if (data.header_infos[15].height > 81) {
            data.header_infos[15].height = 80;
          } else {
            data.header_infos[15].height += 1;
          }
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
