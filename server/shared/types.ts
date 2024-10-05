export const StatusConfig = {
  reachable: "reachable",
  unreachable: "unreachable",
  lagging: "lagging",
} as const;

export type StatusConfigType = keyof typeof StatusConfig;

export type GameConfig = {
  teams: Team[];
  points_config: { points_per_lagging_node: number; points_per_unreachable_node: number, core_version: Record<string, number> };
  config: { blocks_behind_before_considered_lagging: number };
};

export type Team = {
  name: string;
  nodes: string[];
};

export type ForkObserverData = {
  header_infos: HeaderInfoData[];
  nodes: NodeData[];
};

export type ForkObserverResponseData = {
  header_infos: HeaderInfoData[];
  nodes: NodeData[];
  latestTipHeight: number;
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
export type EVENT = {
  message: string;
  date: string;
}

export type InternalData = {
  points: AwardedTeamPoints;
  events: EVENT[];
}

export type WebsocketMessage = {
  type: WebsocketMessageType;
  message: string;
  data?: any;
};

export const websocketMessageType = {
  "ForkObserverData": "ForkObserverData",
  "Event": "Event",
} as const;

export type WebsocketMessageType = keyof typeof websocketMessageType;
