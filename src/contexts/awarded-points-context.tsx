"use client"
import React, { useState } from "react";

import AWARDED_TEAM_POINTS from "@/public/team-points.json";

type AwardedPointsContext = {
  points: Record<string, number>;
  stylePoints: {name: string, score: string};
  updateStylePoints: ({type, value}: {type: "name" | "score", value: string}) => void;
  savePoints: () => void;
}

export const awardedPointsContext = React.createContext<AwardedPointsContext>(null!);

export const AwardedPointsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const defaultStylePoints = {
    name: "",
    score: ""
  }
  const [points, setPoints] = useState(AWARDED_TEAM_POINTS as Record<string, number>);

  const [stylePoints, setStylePoints] = useState(defaultStylePoints);

  const updateStylePoints = ({type, value}: {type: "name" | "score", value: string}) => {
    setStylePoints({...stylePoints, [type]: value});
  }

  const handleSaveConfig = async () => {
    try {
      const response = await fetch("/api/save-config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [stylePoints.name]: Number(stylePoints.score) }),
      });

      const result = await response.json();
      if (response.ok) {
        updateClientPoints({name: stylePoints.name, score: Number(stylePoints.score)});
        console.log("updated config result");
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Failed to save config:", error);
    }
  };

  const updateClientPoints = ({name, score}: {name: string, score: number}) => {
    const newPoints = { ...points };
    newPoints[name] = newPoints[name] ?? 0 + score;
    setPoints(newPoints);
  }

  return (
    <awardedPointsContext.Provider
      value={{
        points,
        stylePoints,
        updateStylePoints,
        savePoints: handleSaveConfig,
      }}
    >
      {children}
    </awardedPointsContext.Provider>
  );
};

export const useAwardedPointsContext = () => {
  const context = React.useContext(awardedPointsContext);
  if (context === undefined) {
    throw new Error("useNetworkContext must be used within a AwardedPointsProvider");
  }
  return context;
};
