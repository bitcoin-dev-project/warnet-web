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

export const useForkObserverData = ({server_url}: {server_url?: string}) =>
  useQuery<ForkObserverData, Error>({
    queryFn: () => getData(),
    queryKey: ["fork-observer-data"],
    // keeps previous data in case of error
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: true,
    // maintains refetch even when browser tab is in background
    // refetchIntervalInBackground: true,
  });
