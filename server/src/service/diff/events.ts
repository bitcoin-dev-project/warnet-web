import { EVENT, ForkObserverResponseData, GameConfig } from "../../../shared/types";
import { getLatestTipHeightForNode, isNodeLagging } from "../../helpers";
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

  if (nextTipHeight > prevTipHeight) {
    events.push({
      message: `Tip height increased from ${prevTipHeight} to ${nextTipHeight}`,
      date: new Date().toISOString(),
    });
  }

  const { config } = rootConfig;

  for (const node of nextNodes) {
    const prevNode = prevNodes.find((item) => item.name === node.name);
    if (!prevNode) {
      events.push({
        message: `Node ${node.name} added`,
        date: new Date().toISOString(),
      });
    } else {

      const prevNodeLatestTipHeight = getLatestTipHeightForNode(prevNode);
      const nextNodeLatestTipHeight = getLatestTipHeightForNode(node);

      const isPrevLagging = isNodeLagging(
        prevNodeLatestTipHeight,
        prevTipHeight,
        config
      );
      const isNextLagging = isNodeLagging(
        nextNodeLatestTipHeight,
        nextTipHeight,
        config
      );

      const prevReachable = prevNode.reachable;
      const nextReachable = node.reachable;

      // can only be lagging if node is reachable
      if (isNextLagging && !isPrevLagging && nextReachable) {
        events.push({
          message: `${node.name} is at height ${nextNodeLatestTipHeight} and is now lagging behind by ${nextTipHeight - nextNodeLatestTipHeight} blocks`,
          type: "lagging",
          date: new Date().toISOString(),
        });
      }

      // trigger event when node is reachable or unreachable
      if (prevReachable !== nextReachable) {
        events.push({
          message: `${node.name} is now ${nextReachable ? "reachable" : "unreachable"}`,
          type: nextReachable ? "reachable" : "unreachable",
          date: new Date().toISOString(),
        });
      }
    }
  }
  return events;
};
