import { GameConfig, HeaderInfoData } from "../../shared/types";

export const getLatestTipHeight = ({header_infos}: {header_infos: HeaderInfoData[] | []}) => {
  const latestTipHeight = Math.max(...header_infos.map((item) => item?.height ?? 0));

  return { latestTipHeight };
};

export const getVersionNumber = (version: string) => {
  return version.split(":")[1].split("/")[0] ?? false;
}

export const isNodeLagging = (nodeHeight: number, latestTipHeight: number, config: GameConfig["config"]) => {
  return nodeHeight <= latestTipHeight - config.blocks_behind_before_considered_lagging;
}
