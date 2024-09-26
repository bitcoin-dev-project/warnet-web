"use client";

import React, { useState } from "react";
import styles from "@/components/styles.module.css";
import { useRouter } from "next/navigation";
import AWARDED_TEAM_POINTS from "../../../public/team-points.json";

const page = () => {
  const points = AWARDED_TEAM_POINTS ?? {};
  const [pointMapper, setPointMapper] = useState<{ [key: string]: number }>(points);

  const handleSaveConfig = async () => {
    try {
      const response = await fetch("/api/save-config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: pointMapper }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("updated config result");
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Failed to save config:", error);
    }
  };

  return (
    <div className={`text-black max-h-screen min-h-screen overflow-hidden h-screen flex flex-col px-[100px] py-20 ${styles.adminWrapper}`}>
      <div className='flex flex-col items-center justify-center gap-6 w-full'>
        <h2 className='font-medium text-5xl text-white'>Award Style Points</h2>
        <div className='flex flex-col gap-6 h-full w-full max-w-[500px]'>
          <div className='flex flex-col gap-6 w-full items-center'>
            <section className='w-full'>
              {Object.entries(pointMapper).map(([key, value], index) => (
                <div key={`${key}-${index}`} className='flex justify-between items-center gap-2'>
                  <p className='text-xl font-medium text-white capitalize'>{key}</p>
                  <p className='text-xl font-medium text-white'>{value}</p>
                </div>
              ))}
            </section>
            <section className='w-full max-w-[500px] flex flex-col gap-3'>
              <select
                name=''
                id=''
                className='p-3 rounded-lg text-white border border-gray-500 w-full bg-[#0000007f] bg-gray-600'
                onChange={(e) => setPointMapper({ ...pointMapper, [e.target.value]: Number(e.target.value) })}
              >
                <option value=''>Selected</option>
                {Object.entries(pointMapper).map(([key, value], index) => (
                  <React.Fragment key={`${key}-${index}`}>
                    <option key={`${key}-${index}`} value={value}>
                      {key}
                    </option>
                  </React.Fragment>
                ))}
              </select>
            </section>
          </div>
        </div>

        <button onClick={handleSaveConfig} className='text-white bg-brand-purple rounded-lg px-4 py-3 text-sm w-full max-w-[500px] '>
          Update
        </button>
      </div>
    </div>
  );
};

export default page;
