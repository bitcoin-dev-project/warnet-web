import { useQuery } from "@tanstack/react-query";
import type { EVENT, ForkObserverData, Team } from "@/types";
import next from "next";
import { getConfig } from "@/app/config";
import { isNodeLagging } from "@/helpers";

const getData = async (): Promise<ForkObserverData> => {
  return fetch("/api/node-data")
    .then((res) => res.json())
    .then((data) => {
      return data.data;
    })
    .catch((err) => err);
};

type UseForkObserverDataOptions = {
  shouldPoll?: boolean;
  pollInterval?: number;
  teams: Team[];
};

export const useForkObserverData = ({
  shouldPoll = true,
  pollInterval = 1000 * 5,
  teams,
}: UseForkObserverDataOptions) =>
  useQuery<ForkObserverData, Error>({
    queryFn: () => getData(),
    queryKey: ["fork-observer-data"],
    refetchOnWindowFocus: true,
    refetchInterval: shouldPoll ? pollInterval : 0, // 5 seconds default
    refetchIntervalInBackground: true,
    structuralSharing: (prevData, nextData): ForkObserverData => {
      try {
        const events = calculateEventFromDiff(
          prevData as ForkObserverData,
          nextData as ForkObserverData,
          teams
        );
        const combinedDataWithEvents = {
          ...nextData as ForkObserverData,
          events: [...events, ...((prevData as ForkObserverData)?.events ?? [])].slice(0, 20),
        };
        // console.log("aggEvents", combinedDataWithEvents.events);
        console.log("oldTipHeight", (prevData as ForkObserverData).latestTipHeight);
        console.log("newTipHeight", (nextData as ForkObserverData).latestTipHeight);
        console.log("aggEvents", combinedDataWithEvents.events.slice(0, 5));
  
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
  teams: Team[]
) => {
  if (!prevData || !nextData) return [];

  const events: EVENT[] = [];
  const prevNodes = prevData.nodes;
  const nextNodes = nextData.nodes;
  const prevTipHeight = prevData.latestTipHeight;
  const nextTipHeight = nextData.latestTipHeight;

  const { config } = getConfig();

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
