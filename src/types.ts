import { StatusConfigType } from "./app/config";

export type GameConfig = {
  teams: Team[];
  points_config: { points_per_lagging_node: number; points_per_unreachable_node: number, core_version: Record<string, number> };
  config: { blocks_behind_before_considered_lagging: number };
  fork_observer_api: string;
};

export type Team = {
  name: string;
  nodes: string[];
};

export type ForkObserverData = {
  header_infos: HeaderInfoData[];
  nodes: NodeData[];
  latestTipHeight: number;
  events?: EVENT[];
};

export type NodeData = {
  id: number;
  name: string;
  description: string;
  implementation: string;
  tips: { hash: string; status: string; height: number }[];
  last_changed_timestamp: number;
  version: string;
  reachable: boolean;
};

export type NodeDataWithStatus = NodeData & {status: StatusConfigType, score: number};

export type HeaderInfoData = {
  id: number;
  prev_id: number;
  height: number;
  hash: string;
  version: number;
  prev_blockhash: string;
  merkle_root: string;
  time: number;
  bits: number;
  nonce: number;
  miner: string;
};

export type AwardedTeamPoints = Record<string, number>;

type EventType = StatusConfigType | "style-points";
export type EVENT = {
  message: string;
  date: string;
  type?: EventType;
  meta?: string[];
}

export type InternalData = {
  points: AwardedTeamPoints;
  events: EVENT[];
}

export type StylePoints = {
  name: string;
  score: number;
  reason?: string;
}