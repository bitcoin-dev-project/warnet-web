import React from "react";
import { getRelativeTimeString } from "@/helpers";
import { EVENT } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

type ActivityFeedProps = {
  feed: EVENT[];
  currentTip: number;
};

const EventColorConfig = {
  lagging: "text-orange-300 font-medium",
  unreachable: "text-red-400 font-medium",
  reachable: "",
  "style-points": "text-green-400 font-medium",
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
    <section className="relative flex flex-col gap-4 w-full text-white">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.1)] via-50% to-[rgba(0,0,0,0.4)] z-10 pointer-events-none"></div>
      <div className="flex justify-between items-center">
        <h2 className="font-medium text-2xl">Activity Feed</h2>
        <div className="text-base">
          <span className="text-gray-300">Current Tip: </span>
          <span className="text-green-400 font-bold">{currentTip}</span>
        </div>
      </div>
      <section className="relative flex flex-col gap-4 p-4 pt-[48px] rounded-lg w-full h-full overflow-scroll border border-neutral-800">
        <OnlineIndicator />
        <AnimatePresence>
          {feed.map((item, index) => (
            <motion.div
              key={`feed-${item.date}-${item.message}`}
              initial={
                index === 0 ? { opacity: 0, y: -30 } : { opacity: 1, y: 0 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                mass: 1,
              }}
            >
              <div
                key={`${item.message}-${index}`}
                className="flex gap-2 text-gray-300 text-sm justify-between w-full"
              >
                <div>
                  <p
                    className={`${item?.type ? EventColorConfig[item?.type] : ""} text-[18px]`}
                  >
                    {item.message}
                  </p>
                  {item.meta ? (
                    <ul className="list-disc ml-4">
                      <li>
                        {item.meta.map((meta, index) => (
                          <p className="text-[14px]" key={`${index}`}>{meta}</p>
                        ))}
                      </li>
                    </ul>
                  ) : null}
                </div>
                <p className="text-[14px]">{getRelativeTimeString(item.date)}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>
    </section>
  );
};

export default ActivityFeed;
