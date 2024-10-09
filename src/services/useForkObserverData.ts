import { useQuery } from "@tanstack/react-query";
import type { EVENT, ForkObserverData, GameConfig, Team } from "@/types";
import { isNodeLagging } from "@/helpers";

const getData = async (): Promise<ForkObserverData> => {
  return fetch("/api/node-data", {
      cache: 'no-store',
      headers: {
        'Pragma': 'no-cache',
      },
    })
    .then((res) => res.json())
    .then((data) => {
      return data.data;
    })
    .catch((err) => err);
};

type UseForkObserverDataOptions = {
  shouldPoll?: boolean;
  pollInterval?: number;
  gameConfig: GameConfig;
};

export const useForkObserverData = ({
  shouldPoll = true,
  pollInterval = 1000 * 10,
  gameConfig,
}: UseForkObserverDataOptions) =>
  useQuery<ForkObserverData, Error>({
    queryFn: () => getData(),
    queryKey: ["fork-observer-data"],
    refetchOnWindowFocus: true,
    refetchInterval: shouldPoll ? pollInterval : 0, // 5 seconds default
    refetchIntervalInBackground: true,
    structuralSharing: (prevData, nextData): ForkObserverData => {
      try {
        const generatedEvents = calculateEventFromDiff(
          prevData as ForkObserverData,
          nextData as ForkObserverData,
          gameConfig
        );
        const combinedDataWithEvents = {
          ...nextData as ForkObserverData,
          events: [...generatedEvents, ...((prevData as ForkObserverData)?.events ?? [])].slice(0, 150),
        };
  
        return combinedDataWithEvents;
      } catch (error) {
        console.log("error", error);
        return nextData as ForkObserverData;
      }
    },
  });

const calculateEventFromDiff = (
  prevData: ForkObserverData,
  nextData: ForkObserverData,
  gameConfig: GameConfig
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

  const { config } = gameConfig;

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

      // if (isNextLagging !== isPrevLagging) {
      //   events.push({
      //     message: `${node.name} is at height ${nextLatestTip.height} and is ${isNextLagging ? "now" : "not"} lagging ${isNextLagging ? `behind by ${nextTipHeight - nextLatestTip.height} blocks` : ""}`,
      //     date: new Date().toISOString(),
      //   });
      // }

      if (isNextLagging && !isPrevLagging) {
        events.push({
          message: `${node.name} is at height ${nextLatestTip.height} and is now lagging behind by ${nextTipHeight - nextLatestTip.height} blocks`,
          type: "lagging",
          date: new Date().toISOString(),
          // status: "lagging",
        });
      }

      const prevReachable = prevNode.reachable;
      const nextReachable = node.reachable;

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
