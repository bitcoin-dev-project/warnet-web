import { NodeData } from "@/node";
import CONFIG_DATA from "../../public/config.json";
import HEADER_AND_TEAMS_JSON from "../../public/header-and-teams.json";

const {
  teams,
  points_config: { points_per_lagging_node, points_per_unreachable_node },
  config: { blocks_behind_before_considered_lagging },
} = CONFIG_DATA;

const { header_infos, nodes } = HEADER_AND_TEAMS_JSON;

export const getLatestTipHeight = () => {
  const latestTipHeight = Math.max(...header_infos.map((item) => item.height));

  return { latestTipHeight };
};

export const calculateTeamPoints = (data: NodeData[]) => {
  const { latestTipHeight } = getLatestTipHeight();

  const reachable = data.filter((item) => item.reachable && latestTipHeight - item.tips[0].height < blocks_behind_before_considered_lagging);
  const unreachable = data.filter((item) => !item.reachable);
  const laggingNodes = data.filter((item) => item.reachable && latestTipHeight - item.tips[0].height >= blocks_behind_before_considered_lagging);

  const points = reachable.length + unreachable.length * points_per_unreachable_node + laggingNodes.length * points_per_lagging_node;
  const reachableNodes = reachable.length;
  const unReachableNodes = unreachable.length;

  return { points, reachableNodes, unReachableNodes, laggingNodes };
};

export const organiseNodesIntoTeams = () => {
  const nodeGroups: Record<string, NodeData[]> = {};

  for (const team of teams) {
    const group = team.name;

    if (!nodeGroups[group]) {
      nodeGroups[group] = [];
    }

    team.nodes.forEach((nodeName) => {
      const findTeamNode = nodes.find((item) => item.name === nodeName);
      if (findTeamNode) nodeGroups[group].push(findTeamNode);
      return findTeamNode;
    });
  }

  return { nodeGroups };
};

export const getAllTeamPoints = () => {
  const { nodeGroups } = organiseNodesIntoTeams();

  const teamPoints = Object.fromEntries(
    Object.entries(nodeGroups).map(([key, value]) => {
      const { points } = calculateTeamPoints(value);

      return [key, points];
    })
  );

  return teamPoints;
};

export const sortNodesAccordingToPoints = () => {
  const { nodeGroups } = organiseNodesIntoTeams();

  const sortedNodes = Object.fromEntries(
    Object.entries(nodeGroups).sort((a, b) => {
      const aPoints = calculateTeamPoints(a[1]);
      const bPoints = calculateTeamPoints(b[1]);
      return bPoints.points - aPoints.points;
    })
  );

  return sortedNodes;
};
