import { useQuery } from "@tanstack/react-query";
import type { AwardedTeamPoints, InternalData } from "@/types";

const getData = async (): Promise<AwardedTeamPoints> => {
  return fetch("/api/team-points", {
    cache: "no-store",
    headers: {
      Pragma: "no-cache",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data.data;
    })
    .catch((err) => err);
};

export const useTeamPoints = () =>
  useQuery<AwardedTeamPoints, Error>({
    queryFn: () => getData(),
    queryKey: ["team-points"],
    // keeps previous data in case of error
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: true,
    // refetchInterval: shouldPoll ? pollInterval : 0, // 3 seconds default
    // initialData: initialData,
  });
