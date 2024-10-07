import { EVENT, ForkObserverResponseData, GameConfig } from "../../../shared/types";
import { isNodeLagging } from "../../helpers";
import { internalDataCache } from "../cache/cacheManager";
import { getGameConfig } from "../file";
import { cacheDataToForkObserverResponseData } from "../transformers";

export const generateEvents = () => {
  const prevData = internalDataCache.get("old");
  const nextData = internalDataCache.get("new");

  if (!prevData || !nextData) {
    return [];
  }

  const prevResData = cacheDataToForkObserverResponseData(prevData);
  const nextResData = cacheDataToForkObserverResponseData(nextData);

  const rootConfig = getGameConfig();

  if (rootConfig instanceof Error) {
    return new Error("Error getting config");
  }

  const events = calculateEventFromDiff(prevResData, nextResData, rootConfig);
  return events;
}



const calculateEventFromDiff = (
  prevData: ForkObserverResponseData,
  nextData: ForkObserverResponseData,
  rootConfig: GameConfig
) => {
  const events: EVENT[] = [];

  if (!prevData || !nextData) return events;

  const prevNodes = prevData.nodes;
  const nextNodes = nextData.nodes;
  const prevTipHeight = prevData.latestTipHeight;
  const nextTipHeight = nextData.latestTipHeight;

  const { config } = rootConfig;

  for (const node of nextNodes) {
    const prevNode = prevNodes.find((item) => item.name === node.name);
    if (!prevNode) {
      events.push({
        message: `Node ${node.name} added`,
        date: new Date().toISOString(),
      });
    } else {
      const prevLatestTip = prevNode.tips[0];
      const nextLatestTip = node.tips[0];

      const isPrevLagging = isNodeLagging(
        prevLatestTip.height,
        prevTipHeight,
        config
      );
      const isNextLagging = isNodeLagging(
        nextLatestTip.height,
        nextTipHeight,
        config
      );

      if (isNextLagging !== isPrevLagging) {
        events.push({
          message: `${node.name} is at height ${nextLatestTip.height} and is ${isNextLagging ? "now" : "not"} lagging ${isNextLagging ? `behind by ${nextTipHeight - nextLatestTip.height} blocks` : ""}`,
          date: new Date().toISOString(),
        });
      }

      const prevReachable = prevNode.reachable;
      const nextReachable = node.reachable;

      if (prevReachable !== nextReachable) {
        events.push({
          message: `${node.name} is now ${nextReachable ? "reachable" : "unreachable"}`,
          date: new Date().toISOString(),
        });
      }
    }
  }
  return events;
};