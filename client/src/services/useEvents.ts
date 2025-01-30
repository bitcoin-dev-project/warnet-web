import { useQuery } from "@tanstack/react-query";
import type { EVENT } from "@/types";

const getData = async (): Promise<EVENT[]> => {
  return fetch("/api/events")
    .then((res) => res.json())
    .then((data) => {
      return data.data;
    })
    .catch((err) => err);
};

export const useEvents = () =>
  useQuery<EVENT[], Error>({
    queryFn: () => getData(),
    queryKey: ["events"],
    // keeps previous data in case of error
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: true,
    // refetchInterval: shouldPoll ? pollInterval : 0, // 3 seconds default
    // initialData: initialData,
  });
