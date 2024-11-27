import { GameConfig } from "@/types";

export const fetchConfig = async (url: string): Promise<GameConfig> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  try {
    const configResponse = await fetch(url);

    if (!configResponse.ok) {
      switch (configResponse.status) {
        case 404:
          throw new Error("Error: Config not found (404).");
        case 500:
          throw new Error("Error: Server error (500).");
        default:
          throw new Error(`Error: Unexpected response status ${configResponse.status}.`);
      }
    }

    const config = await configResponse.json();
    if (!config.success || !config.data) {
      throw new Error("Error: Invalid configuration response format.");
    }

    return config.data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Error: Network error or URL cannot be reached.");
    } else {
      throw error;
    }
  }
};