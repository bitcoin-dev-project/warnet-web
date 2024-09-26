import { useQuery } from "@tanstack/react-query";
import type { ForkObserverData } from "@/types";


const getData = async (): Promise<ForkObserverData> => {
  // return axios
  //   .get(endpoints.REVIEW_BY_ID(reviewId))
  //   .then((res) => res.data)
  //   .catch((err) => err);
  return fetch("http://localhost:3000/api/node-data")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data);
      return data.data;
    })
    .catch((err) => err);
};

export const useForkObserverData = () =>
  useQuery<ForkObserverData, Error>({
    queryFn: () => getData(),
    queryKey: ["fork-observer-data"],
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 5, // 10 seconds
  });
