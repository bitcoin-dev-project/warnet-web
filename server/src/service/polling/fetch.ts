import path from "path";
import { promises as fs, readFileSync } from "fs";
import { ForkObserverData } from "../../../shared/types";

const staticPath = path.join(process.cwd(), "public", "header-and-teams.json");

export const fetchData = async (): Promise<ForkObserverData | Error> => {
  if (!process.env.FORK_OBSERVER_API) {
    const file = readFileSync(staticPath, "utf-8");
    if (!file) {
      return new Error("File not found");
    }
    try {
      const data = JSON.parse(file);
      return data as ForkObserverData;
    }
    catch (error) {
      return new Error("Error parsing file");
    }
  }

  const response = await fetch(process.env.FORK_OBSERVER_API);
  const data = await response.json();
  return data as ForkObserverData;
};
