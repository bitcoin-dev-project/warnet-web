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
