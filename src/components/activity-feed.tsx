import React from "react";
import { getRelativeTimeString } from "@/helpers";
import { EVENT } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

type ActivityFeedProps = {
  feed: EVENT[];
  currentTip: number;
};

const OnlineIndicator = () => {
  return (
    <div className="absolute right-3 top-2 text-xs flex items-center gap-1">
      <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
      <span>online</span>
    </div>
  );
};

const ActivityFeed = ({ feed, currentTip }: ActivityFeedProps) => {
  return (
    <section className="flex flex-col gap-4 w-full text-white">
      <div className="flex justify-between items-center">
        <h2 className="font-medium text-2xl">Activity Feed</h2>
        <div className="text-base">
          <span className="text-gray-300">Current Tip: </span>
          <span className="text-green-400 font-bold">{currentTip}</span>
        </div>
      </div>
      <section className="relative flex flex-col gap-4 p-4 pt-[60px] rounded-lg w-full h-full overflow-scroll border border-neutral-800 bg-zinc-800/30 from-inherit bg-gradient-to-b backdrop-blur-2xl">
        <OnlineIndicator />
        <AnimatePresence>
          {feed.map((item, index) => (
            <motion.div
              key={`feed-${item.date}-${item.message}`}
              initial={
                index === 0 ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 1,
              }}
              className=""
            >
              <div
                key={`${item.message}-${index}`}
                className="flex gap-2 items-center text-gray-300 text-sm justify-between w-full"
              >
                <p>{item.message}</p>
                <p>{getRelativeTimeString(item.date)}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>
    </section>
  );
};

export default ActivityFeed;
