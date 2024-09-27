import { NodeData } from "@/node";
import CONFIG_DATA from "../../public/config.json";
import HEADER_AND_TEAMS_JSON from "../../public/header-and-teams.json";
import { GameConfig, HeaderInfoData, NodeDataWithStatus } from "@/types";
import { StatusCofigType } from "@/app/config";
import { getConfig } from "@/app/config";


// const { header_infos, nodes } = HEADER_AND_TEAMS_JSON;

export const getLatestTipHeight = ({header_infos}: {header_infos: HeaderInfoData[] | []}) => {
  const latestTipHeight = Math.max(...header_infos.map((item) => item?.height ?? 0));

  return { latestTipHeight };
};

// export const calculateTeamPoints = (data: NodeData[], header_infos: HeaderInfoData[]) => {
//   const { latestTipHeight } = getLatestTipHeight({header_infos});

//   const reachable = data.filter((item) => item.reachable && latestTipHeight - item.tips[0].height < blocks_behind_before_considered_lagging);
//   const unreachable = data.filter((item) => !item.reachable);
//   const laggingNodes = data.filter((item) => item.reachable && latestTipHeight - item.tips[0].height >= blocks_behind_before_considered_lagging);

//   const points = reachable.length + unreachable.length * points_per_unreachable_node + laggingNodes.length * points_per_lagging_node;
//   const reachableNodes = reachable.length;
//   const unReachableNodes = unreachable.length;

//   return { points, reachableNodes, unReachableNodes, laggingNodes };
// };

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
}

// export const getAllTeamPoints = () => {
//   const { nodeGroups } = organiseNodesIntoTeams();

//   const teamPoints = Object.fromEntries(
//     Object.entries(nodeGroups).map(([key, value]) => {
//       const { points } = calculateTeamPoints(value);

//       return [key, points];
//     })
//   );

//   return teamPoints;
// };

// export const sortNodesAccordingToPoints = () => {
//   const { nodeGroups } = organiseNodesIntoTeams();

//   const sortedNodes = Object.fromEntries(
//     Object.entries(nodeGroups).sort((a, b) => {
//       const aPoints = calculateTeamPoints(a[1]);
//       const bPoints = calculateTeamPoints(b[1]);
//       return bPoints.points - aPoints.points;
//     })
//   );

//   return sortedNodes;
// };
