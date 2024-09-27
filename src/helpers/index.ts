import { NodeData } from "@/node";
import { GameConfig, HeaderInfoData, NodeDataWithStatus } from "@/types";
import { StatusCofigType } from "@/app/config";
import { getConfig } from "@/app/config";

export const getLatestTipHeight = ({header_infos}: {header_infos: HeaderInfoData[] | []}) => {
  const latestTipHeight = Math.max(...header_infos.map((item) => item?.height ?? 0));

  return { latestTipHeight };
};

export const organiseNodesIntoTeams = <K>({nodes, teams, formatNode}: {nodes: NodeData[], teams: GameConfig["teams"], formatNode: (teamNode: NodeData) => K}) => {
  const nodeGroups: Record<string, K[]> = {};

  for (const team of teams) {
    const group = team.name;

    if (!nodeGroups[group]) {
      nodeGroups[group] = [] as K[];
    }

    team.nodes.forEach((nodeName) => {
      const teamNodeExists = nodes.find((item) => item.name === nodeName);
      if (!teamNodeExists) return;
      const compiledNode = formatNode(teamNodeExists);
      nodeGroups[group].push(compiledNode);
    });
  }

  return { nodeGroups };
};

export const compileTeamNode = (teamNode: NodeData, latestTipHeight: number): NodeDataWithStatus => {
  const { points_config, config } = getConfig();
  const { reachable, tips, version } = teamNode;
    const extraStats: {
      status: StatusCofigType;
      score: number;
    } = {
      status: "reachable",
      score: 0,
    }

    if (!reachable) {
      extraStats.status = "unreachable";
      extraStats.score = points_config.points_per_unreachable_node;
    } else {
      const isLagging = tips[0].height <= latestTipHeight - config.blocks_behind_before_considered_lagging;
      if (isLagging) {
        extraStats.status = "lagging";
        extraStats.score = points_config.points_per_lagging_node;
      }
    }

    const versionNumberString = version.split(":")[1].split("/")[0] ?? false;
    if (versionNumberString) {
      const score_for_version = points_config.core_version[version] ?? 0 ;
        if (score_for_version) {
          extraStats.score += score_for_version;
        }
    }
    return {...teamNode, ...extraStats};
};
