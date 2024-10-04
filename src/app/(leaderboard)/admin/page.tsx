"use client";

import React from "react";
import styles from "@/components/styles.module.css";
import { useAwardedPointsContext } from "@/contexts/awarded-points-context";
import { motion } from "framer-motion";

const page = () => {
  const { points, stylePoints, updateStylePoints, savePoints } =
    useAwardedPointsContext();

  return (
    <div
      className={`text-black max-h-screen min-h-screen overflow-hidden h-screen flex flex-col px-[100px] py-20 ${styles.adminWrapper}`}
    >
      <div className="flex flex-col items-center justify-center gap-6 w-full">
        <h2 className="font-medium text-5xl text-white">Award Style Points</h2>
        <div className="flex flex-col gap-6 h-full w-full max-w-[500px]">
          <div className="flex flex-col gap-6 w-full items-center">
            <section className="w-full">
              {Object.entries(points).map(([key, value], index) => (
                <div
                  key={`${key}-${index}`}
                  className="flex justify-between items-center gap-2"
                >
                  <p className="text-xl font-medium text-white capitalize">
                    {key}
                  </p>
                  <p className="text-xl font-medium text-white">{value}</p>
                </div>
              ))}
            </section>
            <section className="w-full max-w-[500px] flex flex-col gap-3">
              <select
                name=""
                id=""
                className="p-3 rounded-md text-white border border-gray-500 w-full bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                onChange={(e) =>
                  updateStylePoints({ type: "name", value: e.target.value })
                }
                value={stylePoints.name}
                required
              >
                <option value="">Select a team</option>
                {Object.keys(points).map((key, index) => (
                  <option key={`${key}-${index}`} value={key}>
                    {key}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min={0}
                className="p-3 rounded-lg text-white border border-gray-500 w-full bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
                onChange={(e) =>
                  updateStylePoints({ type: "score", value: Number(e.target.value) ?? 0 })
                }
                value={stylePoints.score || ""}
                placeholder="style points to award"
                required
              />
              {stylePoints.name && stylePoints.score && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <label htmlFor="points-reason" className="text-gray-200">
                    Reason:
                  </label>
                  <input
                    type="text"
                    id="points-reason"
                    className="p-3 rounded-lg text-white border border-gray-500 w-full bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    onChange={(e) =>
                      updateStylePoints({
                        type: "reason",
                        value: e.target.value,
                      })
                    }
                    value={stylePoints.reason}
                  />
                </motion.div>
              )}
            </section>
          </div>
        </div>

        <button
          type="submit"
          onClick={() => savePoints()}
          disabled={!stylePoints.name || !stylePoints.score}
          className="text-white disabled:bg-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed bg-brand-purple rounded-lg px-4 py-3 text-sm w-full max-w-[500px] "
        >
          Award points
        </button>
      </div>
    </div>
  );
};

export default page;
