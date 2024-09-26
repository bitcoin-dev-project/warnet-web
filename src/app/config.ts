export const StatusCofig = {
  reachable: "bg-green-500",
  unreachable: "bg-red-500",
  lagging: "bg-gray-600",
} as const;

import { GameConfig } from "@/types";
import CONFIG_DATA from "../../public/config.json";

export const getConfig = () => {
  return CONFIG_DATA as GameConfig;
} 

export type StatusCofigType = keyof typeof StatusCofig;