import React from "react";
import styles from "@/components/styles.module.css";
import { LeaderBoardCards, NodeGroupCards } from "@/components/node-group-cards";
import { getLatestTipHeight, organiseNodesIntoTeams } from "@/helpers";
import Providers from "@/app/providers";
import Game from "./game";
import HEADER_AND_TEAMS_JSON from "@/public/header-and-teams.json";
import { GameConfig, NodeData, NodeDataWithStatus } from "@/types";
import CONFIG_DATA from "@/public/config.json";

const page = () => {
  const config = CONFIG_DATA as GameConfig;

  return (
    <Providers>
      <Game gameConfig={config} />
    </Providers>
  );
};

export default page;
