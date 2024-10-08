"use client";
import React, { useState } from "react";
import { useInternalData } from "@/services/useInternalData";
import { AwardedTeamPoints, InternalData, StylePoints } from "@/types";

type updateStylePointsType = ({
  type,
  value,
}: {
  type: "name" | "score" | "reason";
  value: string | number;
}) => void;

type AwardedPointsContext = {
  internalData: InternalData | undefined;
  points: Record<string, number>;
  stylePoints: StylePoints;
  updateStylePoints: updateStylePointsType;
  savePoints: () => Promise<{
    success: boolean;
    message: any;
    unauthorized?: boolean;
  }>;
};

export const awardedPointsContext = React.createContext<AwardedPointsContext>(
  null!
);

export const AwardedPointsProvider = ({
  children,
  // initialInternalData,
}: {
  children: React.ReactNode;
  // initialInternalData: InternalData;
}) => {
  const defaultStylePoints: StylePoints = {
    name: "",
    score: 0,
    reason: "",
  };

  const [points, setPoints] = useState<AwardedTeamPoints>({});
  // const [points, setPoints] = useState(initialInternalData.points);
  const { data: internalData } = useInternalData({ shouldPoll: true });
  // const {data: internalData} = useInternalData({initialData: initialInternalData, shouldPoll: true});

  const [stylePoints, setStylePoints] = useState(defaultStylePoints);

  if (
    Object.keys(points).length === 0 &&
    Object.keys(internalData?.points ?? {}).length > 0
  ) {
    setPoints(internalData!.points);
  }

  const updateStylePoints: updateStylePointsType = ({ type, value }) => {
    setStylePoints({ ...stylePoints, [type]: value });
  };

  const handleSaveConfig = async () => {
    const { name, score, reason } = stylePoints;

    try {
      const response = await fetch("/api/save-config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, score, reason }),
      });

      if (response.ok) {
        updateClientPoints({ name, score });
        setStylePoints(defaultStylePoints);
        return { success: true, message: "Config saved successfully!" };
      } else if (response.status === 401) {
        // setAdminForm({isOpen: true, invalidReason: "Invalid auth key"})
        return { success: false, message: "Invalid auth key", unauthorized: true};
      } else {
        const result = await response.json();
        setStylePoints(defaultStylePoints);
        return {
          success: false,
          message: result?.message ?? "An error occurred",
        };
      }
    } catch (error: any) {
      setStylePoints(defaultStylePoints);
      return { success: false, message: error?.message ?? "An error occurred" };
    }
  };

  const updateClientPoints = ({
    name,
    score,
  }: {
    name: string;
    score: number;
  }) => {
    const newPoints = JSON.parse(JSON.stringify(points));
    newPoints[name] = (newPoints[name] ?? 0) + score;
    setPoints({ ...newPoints });
  };

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
    throw new Error(
      "useNetworkContext must be used within a AwardedPointsProvider"
    );
  }
  return context;
};
