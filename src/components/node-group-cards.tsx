import React from "react";
import { NodeDataWithStatus } from "@/types";
import { StatusCofig, StatusCofigType } from "@/app/config";
import { getVersionNumber } from "@/helpers";
import ClockIcon from "@/components/icons/clock";
import XIcon from "@/components/icons/xIcon";
import SkullIcon from "./icons/skull";

type NodeItemProps = {
  data: NodeDataWithStatus;
  latestTipHeight: number;
};

const Badge = ({status, blocksBehind}: {status: StatusCofigType, blocksBehind: number}) => {
  switch (status) {
    case "lagging":
      return (
        <div className="flex gap-1 px-1 bg-orange-500 text-gray-200 items-center rounded-lg">
          <ClockIcon className="w-3 font-medium" />
          <p className="text-sm font-medium">{blocksBehind}</p>
        </div>
      );
    
    case "unreachable":
      return (
        <div className="flex gap-1 px-1 text-gray-200 items-center rounded-lg">
          <SkullIcon className="w-4 text-red-600" />
        </div>
      );
      
    default:
      return null;
  }
};

const NodeItem = ({ data, latestTipHeight }: NodeItemProps) => {
  const { status, tips, version } = data;

  const coreVersion = getVersionNumber(version) ?? version;

  const blocksBehind = latestTipHeight - tips[0].height;

  const color = StatusCofig[data.status as keyof typeof StatusCofig];

  return (
    <div
      className={`${color} relative py-1 px-2 flex gap-2 rounded cursor-pointer group/node z-0`}
    >
      <p className="font-semibold">{coreVersion}</p>
      <Badge status={status} blocksBehind={blocksBehind} />
      <div className="absolute bottom-[calc(100%+8px)] left-0 transform bg-purple-900/90 rounded-md shadow-lg w-40 py-2 px-3 opacity-0 invisible group-hover/node:opacity-100 group-hover/node:visible transition-all duration-200 delay-500 z-50 text-gray-200">
        <p className="capitalize">{data.name}</p>
        <p>{data.implementation}</p>
        <p>Tip: {tips[0].height}</p>
        <p>Score: {data.score}</p>
      </div>
    </div>
  );
};

type NodeGroupCardsProps = {
  data: NodeDataWithStatus[];
  teamName: string;
  pointsMapper: Record<string, number>;
  latestTipHeight: number;
};

export const NodeGroupCards = ({
  data,
  teamName,
  pointsMapper,
  latestTipHeight,
}: NodeGroupCardsProps) => {
  const reachableNodes = data.filter((item) => item.reachable).length;
  const laggingNodes = data.filter((item) => item.status === "lagging").length;
  const unreachableNodes = data.filter(
    (item) => item.status === "unreachable"
  ).length;

  return (
    <div className="border p-3 rounded-xl w-full text-gray-200 flex flex-col items-start relative border-b border-gray-200 bg-white dark:bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30 ">
      <div className="w-full flex gap-2 items-center justify-between">
        <h3 className="font-medium text-xl capitalize">{teamName}</h3>

        <div className="flex gap-4 items-center text-sm font-bold">
          <div
            className={`flex gap-2 items-center ${laggingNodes ? "opacity-80" : "opacity-40"}`}
          >
            <ClockIcon className="text-orange-500 w-4" />
            <span className="inline-block w-1 h-1 rounded-full bg-gray-400"></span>
            {laggingNodes}
          </div>

          <div
            className={`flex gap-2 items-center ${unreachableNodes ? "opacity-80" : "opacity-40"}`}
          >
            <SkullIcon className="text-red-500 w-4" />
            <span className="inline-block w-1 h-1 rounded-full bg-gray-400"></span>
            {unreachableNodes}
          </div>
        </div>
      </div>

      <div className="pt-5 flex flex-col gap-3 w-full">
        <section className="flex gap-2 w-fit max-w-fit flex-wrap">
          {data.map((item, index) => (
            <NodeItem
              data={item}
              key={`${item.id}-${index}`}
              latestTipHeight={latestTipHeight}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

type LeaderBoardCardsProps = {
  teamName: string;
  index: number;
  earnedPoints: number;
  awardedPoints: number;
  totalPoints: number;
};

export const LeaderBoardCards = ({
  teamName,
  index,
  earnedPoints,
  awardedPoints,
  totalPoints,
}: LeaderBoardCardsProps) => {
  return (
    <tr
      className={`border-b border-white border-opacity-10 last:border-b-0 hover:bg-gray-800 text-lg`}
    >
      <td className="px-1 py-2 text-gray-400">{index + 1}</td>
      <td className="px-6 py-2 font-medium text-white capitalize">
        Team {teamName}
      </td>
      <td className="px-6 py-2 text-center">{earnedPoints}</td>
      <td className="px-6 py-2 text-center">{awardedPoints}</td>
      <td className="px-6 py-2 text-center font-bold text-white">
        {totalPoints}
      </td>
      <td className="px-6 py-2 text-gray-400">pts</td>
    </tr>
  );
};
