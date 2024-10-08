export const StatusConfig = {
  reachable: "bg-gray-600 text-gray-200",
  unreachable: "bg-gray-600 border-[1px] border-red-300 bg-transparent border-dashed text-gray-400",
  lagging: "bg-gray-600 border-[1px] border-orange-300 bg-transparent border-dashed text-gray-400",
} as const;

// export const getTeamPoints = () => {
//   return AWARDED_TEAM_POINTS as Record<string, number>;
// }

export type StatusConfigType = keyof typeof StatusConfig;
