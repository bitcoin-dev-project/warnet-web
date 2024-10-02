"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useInternalData } from "@/services/useInternalData";
import { InternalData } from "@/types";

type AwardedPointsContext = {
  internalData: InternalData;
  points: Record<string, number>;
  stylePoints: {name: string, score: string};
  updateStylePoints: ({type, value}: {type: "name" | "score", value: string}) => void;
  savePoints: () => void;
}

export const awardedPointsContext = React.createContext<AwardedPointsContext>(null!);

export const AwardedPointsProvider = ({
  children,
  initialInternalData,
}: {
  children: React.ReactNode;
  initialInternalData: InternalData;
}) => {
  const defaultStylePoints = {
    name: "",
    score: ""
  }
  const [points, setPoints] = useState(initialInternalData.points);
  const {data: internalData} = useInternalData({initialData: initialInternalData, shouldPoll: true});

  const [stylePoints, setStylePoints] = useState(defaultStylePoints);

  const updateStylePoints = ({type, value}: {type: "name" | "score", value: string}) => {
    setStylePoints({...stylePoints, [type]: value});
  }

  const handleSaveConfig = async () => {
    updateClientPoints({name: stylePoints.name, score: Number(stylePoints.score)});
    try {
      const response = await fetch("/api/save-config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [stylePoints.name]: Number(stylePoints.score) }),
      });

      
      if (response.ok) {
        updateClientPoints({name: stylePoints.name, score: Number(stylePoints.score)});
      } else {
        const result = await response.json();
        console.log("Error: ", {result});
      }
      setStylePoints(defaultStylePoints)
    } catch (error) {
      console.error("Failed to save config:", error);
      setStylePoints(defaultStylePoints)
    }
  };

  const updateClientPoints = ({name, score}: {name: string, score: number}) => {
    const newPoints = JSON.parse(JSON.stringify(points));
    newPoints[name] = (newPoints[name] ?? 0) + score;
    setPoints({...newPoints});
  }

  return (
    <awardedPointsContext.Provider
      value={{
        points,
        internalData,
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
