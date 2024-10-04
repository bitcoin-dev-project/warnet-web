import { useQuery } from "@tanstack/react-query";
import type { InternalData } from "@/types";

const getData = async (): Promise<InternalData> => {
  return fetch("/api/internal-data")
    .then((res) => res.json())
    .then((data) => {
      return data.data;
    })
    .catch((err) => err);
};

export const useInternalData = ({initialData, shouldPoll = true, pollInterval = 1000 * 3}: {initialData?: InternalData, shouldPoll?: boolean, pollInterval?: number}) =>
  useQuery<InternalData, Error>({
    queryFn: () => getData(),
    queryKey: ["events", "points"],
    refetchOnWindowFocus: true,
    refetchInterval: shouldPoll ? pollInterval : 0, // 3 seconds default
    // initialData: initialData,
  });
