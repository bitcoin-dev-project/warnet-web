import { EVENT } from "@/types";
import React from "react";

type ActivityFeedProps = {
  feed: EVENT[];
};

const OnlineIndicator = () => {
  return (
    <div className="absolute right-3 top-3 text-xs flex items-center gap-1">
      <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
      <span>online</span>
    </div>
  );
};

const ActivityFeed = ({ feed }: ActivityFeedProps) => {
  return (
    <section className="flex flex-col gap-4 w-full text-white">
      <h2 className="font-medium text-2xl">Activity Feed</h2>
      <section className="relative flex flex-col gap-6 p-4 rounded-lg w-full h-full overflow-scroll border border-neutral-800 bg-zinc-800/30 from-inherit bg-gradient-to-b backdrop-blur-2xl">
        <OnlineIndicator />
      </section>
    </section>
  );
};

export default ActivityFeed;
