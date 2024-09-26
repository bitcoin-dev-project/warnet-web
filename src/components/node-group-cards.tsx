import React from "react";
import { calculateTeamPoints, getLatestTipHeight } from "@/helpers";
import CONFIG_DATA from "../../public/config.json";
import { NodeData } from "@/node";

const NodeItem = ({ data }: { data: NodeData }) => {
  const { reachable, id, tips } = data;

  const {
    config: { blocks_behind_before_considered_lagging },
  } = CONFIG_DATA;
  const { latestTipHeight } = getLatestTipHeight();

  const nodeHeightRange = reachable && latestTipHeight - tips[0].height >= blocks_behind_before_considered_lagging;

  return (
    <div
      className={`${nodeHeightRange ? "bg-gray-600" : reachable ? "bg-green-500" : "bg-red-500"} py-1 px-2.5 border border-[#2d2d2d]  flex items-center justify-center rounded cursor-pointer`}
    >
      <p className='font-semibold text-white'>{id}</p>
    </div>
  );
};

export const NodeGroupCards = ({ data, teamName, pointsMapper }: { data: NodeData[]; teamName: string; pointsMapper: Record<string, number> }) => {
  const { reachableNodes, unReachableNodes } = calculateTeamPoints(data);

  return (
    <div className='border p-3 rounded-xl w-full text-black dark:text-white flex flex-col items-start relative border-b border-gray-200 bg-white dark:bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30 '>
      <section className='flex flex-col gap-2'>
        <section className='flex gap-2 items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <h3 className='font-medium text-xl capitalize'>Team {teamName}</h3>
            {/* <span className={`rounded-full font-medium text-sm leading-[120%] px-3 py-1.5 shadow-sm border-[0.5px] border-[#2d2d2d] text-[#2EAE4E]`}>
              health
            </span> */}
          </div>

          {/* <button className='border border-[#2d2d2d] px-4 py-2 rounded-lg' onClick={() => addTeamPoint(teamName)}>
            Award points
          </button> */}
        </section>
        {/* <p className='text-white text-sm opacity-75'>
          <span className=' capitalize'>{teamName} </span> is a team of {data.length} nodes. They are {reachableNodes} reachable nodes and{" "}
          {unReachableNodes} unreachable nodes.
        </p> */}
      </section>

      <div className='pt-5 flex flex-col gap-3 w-full'>
        <aside className='flex gap-2 items-center'>
          <p className=' font-medium text-white text-sm'>Nodes ({reachableNodes} active)</p>
          <div className='rounded-full bg-white h-2 w-2 opacity-40'></div>
          <p className=' font-medium text-white text-sm'>Total Points : {pointsMapper[teamName]}</p>
        </aside>
        <section className='flex gap-2 overflow-scroll w-fit max-w-fit flex-wrap'>
          {data.map((item, index) => (
            <NodeItem data={item} key={`${item.id}-${index}`} />
          ))}
        </section>
      </div>
    </div>
  );
};

export const LeaderBoardCards = ({ teamName, index, pointsMapper }: { teamName: string; index: number; pointsMapper: Record<string, number> }) => {
  return (
    <div className='flex gap-3 items-center'>
      <p className=' text-white font-semibold'>{index}.</p>
      <div className='flex justify-between w-full items-center'>
        <section>
          <p className='text-xl capitalize font-medium'>Team {teamName}</p>
        </section>
        <section>
          <p className=' text-xl font-medium'>
            {pointsMapper[teamName]} <span className='font-normal opacity-75'>pts</span>
          </p>
        </section>
      </div>
    </div>
  );
};
