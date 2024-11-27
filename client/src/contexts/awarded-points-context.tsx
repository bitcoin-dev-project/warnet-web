"use client";
import { useState } from "react";
import { StylePoints } from "@/types";

type updateStylePointsType = ({
  type,
  value,
}: {
  type: "name" | "score" | "reason";
  value: string | number;
}) => void;

export const useAwardedPoints = () => {
  const defaultStylePoints: StylePoints = {
    name: "",
    score: 0,
    reason: "",
  };

  const [stylePoints, setStylePoints] = useState(defaultStylePoints);

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
        setStylePoints(defaultStylePoints);
        return { success: true, message: "Config saved successfully!" };
      } else if (response.status === 401) {
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

  return { stylePoints, updateStylePoints, handleSaveConfig };
};