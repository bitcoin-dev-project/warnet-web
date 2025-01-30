"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/components/styles.module.css";
import { NodeGroupCards } from "@/components/node-group-cards";
import { NodeData } from "@/node";
import { useForkObserverData } from "@/services/useForkObserverData";
import { GameConfig } from "@/types";
import { compileTeamNode, organiseNodesIntoTeams } from "@/helpers";
import ActivityFeed from "@/components/activity-feed";
import Leaderboard from "@/components/leaderboard";
import { useEvents } from "@/services/useEvents";
import { useTeamPoints } from "@/services/useTeamPoints";
import { useQueryClient } from "@tanstack/react-query";

type GameProps = {
  gameConfig: GameConfig;
};

export type WebsocketMessage = {
  type: WebsocketMessageType;
  message: string;
  data?: any;
};

export const websocketMessageType = {
  ForkObserverData: "ForkObserverData",
  Event: "Event",
} as const;

export type WebsocketMessageType = keyof typeof websocketMessageType;

const Game = ({ gameConfig }: GameProps) => {
  const queryClient = useQueryClient();
  const { teams } = gameConfig;
  const { data, isLoading, error, refetch: refetchForkObserverData } = useForkObserverData({});
  const { data: eventsData, refetch: refetchEvents } = useEvents();
  const { data: awardedTeamPoints, refetch: refetchTeamPoints } = useTeamPoints();

  const events = eventsData ?? [];

  // const feedEvents = events.sort(
  //   (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  // );

  const [_socket, setSocket] = useState<WebSocket | null>(null);

  const nodes = data?.nodes || [];

  const latestTipHeight = data?.latestTipHeight || 0;

  const formatNode = (teamNode: NodeData) => {
    return compileTeamNode(teamNode, latestTipHeight, gameConfig);
  };

  const { nodeGroups } = organiseNodesIntoTeams({ nodes, teams, formatNode });

  const teamPoints = Object.entries(nodeGroups).reduce(
    (acc, [key, value]) => {
      const points = value.reduce((acc, item) => acc + item.score, 0);
      return { ...acc, [key]: points };
    },
    {} as Record<string, number>
  );

  const wsConnected = useRef(false);

  useEffect(() => {
    const socketInstance = new WebSocket(gameConfig.websocket_url);

    socketInstance.onopen = () => {
      wsConnected.current = true;
      console.log("connected");
    };

    socketInstance.onclose = () => {
      if (wsConnected.current === true) {
        alert("Connection closed, please reload the page");
      }
      console.log("Connection closed, before connection");
      // alert("Connection closed, please reload the page");
    };

    socketInstance.onmessage = (event) => {
      const data = JSON.parse(event.data) as WebsocketMessage;

      switch (data.type) {
        case "Event":
          queryClient.setQueryData(["events"], (oldData: Event[] | undefined) => {
            if (oldData) {
              return [data.data, ...oldData];
            }
            return [data.data];
          });
          const event = data.data as Event;
          if (event.type === "style-points") {
            refetchTeamPoints();
          }
          break;
        case "ForkObserverData":
          refetchForkObserverData();
          break;
        default:
          break;
      }
    };

    setSocket(socketInstance);

    return () => {
      wsConnected.current = false;
      socketInstance.close();
    };
  }, []);

  return (
    <div className={`flex flex-col min-h-full gap-4`}>
      <div className="rounded-lg flex justify-stretch max-h-[534px] gap-4 ">
        <ActivityFeed feed={events ?? []} currentTip={latestTipHeight} />
        <Leaderboard
          teamPoints={teamPoints}
          awardedPoints={awardedTeamPoints ?? {}}
        />
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
