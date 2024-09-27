import { useQuery } from "@tanstack/react-query";
import type { ForkObserverData } from "@/types";


const getData = async (): Promise<ForkObserverData> => {
  return fetch("/api/node-data")
    .then((res) => res.json())
    .then((data) => {
      return data.data;
    })
    .catch((err) => err);
};

export const useForkObserverData = () =>
  useQuery<ForkObserverData, Error>({
    queryFn: () => getData(),
    queryKey: ["fork-observer-data"],
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 5, // 5 seconds
  });
