"use client";
import React from "react";
import styles from "@/components/styles.module.css";
import {
  LeaderBoardCards,
  NodeGroupCards,
} from "@/components/node-group-cards";
import { NodeData } from "@/node";
import { useForkObserverData } from "@/services/useForkObserverData";
import { GameConfig } from "@/types";
import {
  compileTeamNode,
  getLatestTipHeight,
  organiseNodesIntoTeams,
} from "@/helpers";
import { useAwardedPointsContext } from "@/contexts/awarded-points-context";
import ActivityFeed from "@/components/activity-feed";
import Leaderboard from "@/components/leaderboard";

type GameProps = {
  gameConfig: GameConfig;
};

const Game = ({ gameConfig }: GameProps) => {
  const { teams } = gameConfig;
  const { data, isLoading, error } = useForkObserverData({
    shouldPoll: true,
    teams
  });
  const {
    internalData: { points: awardedPoints },
  } = useAwardedPointsContext();

  console.log("height at 15", data?.header_infos[15]?.height);

  // const [socket, setSocket] = useState<Socket | null>(null);

  // console.log("data from fork observer", data);
  // const header_infos = data?.header_infos || [];
  const nodes = data?.nodes || [];

  const latestTipHeight = data?.latestTipHeight || 0;

  const formatNode = (teamNode: NodeData) => {
    return compileTeamNode(teamNode, latestTipHeight);
  };

  const { nodeGroups } = organiseNodesIntoTeams({ nodes, teams, formatNode });

  const teamPoints = Object.entries(nodeGroups).reduce(
    (acc, [key, value]) => {
      const points = value.reduce((acc, item) => acc + item.score, 0);
      return { ...acc, [key]: points };
    },
    {} as Record<string, number>
  );

  const sorted = nodeGroups;

  // useEffect(() => {
  //   const socketInstance = new (ClientIO as any)("ws://localhost:3000", {
  //     path: "/api/websocket",
  //     addTrailingSlash: false,
  //   });

  //   socketInstance.on("connect", () => {
  //     console.log("connected");
  //   });

  //   socketInstance.on("disconnect", () => {
  //     console.log("disconnected");
  //   });

  //   setSocket(socketInstance);

  //   return () => {
  //     socketInstance.disconnect();
  //   }
  // }, []);

  return (
    <div className={`flex flex-col min-h-full gap-4`}>

      <div className="rounded-lg flex justify-stretch max-h-[507px] gap-4 ">
        <ActivityFeed feed={data?.events ?? []} currentTip={latestTipHeight} />
        <Leaderboard teamPoints={teamPoints} awardedPoints={awardedPoints} />
      </div>

      {/* TEAMS */}
      <div className="pb-6 rounded-lg flex flex-col gap-3">
        <h2 className="font-medium text-2xl text-white">Teams</h2>
        <section className={styles.gridStyles}>
          {Object.entries(nodeGroups).map(([key, value], index) => (
            <NodeGroupCards
              teamName={key}
              data={value}
              key={`${key}-${index}`}
              pointsMapper={teamPoints}
              latestTipHeight={latestTipHeight}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Game;
