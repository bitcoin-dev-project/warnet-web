import React from "react";
import Game from "./game";
import { getConfig } from "@/config/filesystem";

const page = async () => {
  const config = await getConfig();

  if (config instanceof Error) {
    throw new Error(`Error loading config: ${config.message}`);
  }

  return (
    <Game gameConfig={config} />
  );
};

export default page;
