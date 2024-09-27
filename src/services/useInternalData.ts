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

export const useInternalData = ({initialData}: {initialData: InternalData}) =>
  useQuery<InternalData, Error>({
    queryFn: () => getData(),
    queryKey: ["events", "points"],
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 3, // 3 seconds
    initialData: initialData,
  });
