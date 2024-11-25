import { useQuery } from "@tanstack/react-query";
import type { ForkObserverData, GameConfig } from "@/types";

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
  });
