import { GameConfig } from "@/types";

export const fetchConfig = async (url: string): Promise<GameConfig | Error> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  try {
    const configResponse = await fetch(url, {
      cache: "no-store",
      headers: {
        Pragma: "no-cache",
      },
    });

    if (!configResponse.ok) {
      switch (configResponse.status) {
        case 404:
          return new Error("Error: Config not found (404).");
        case 500:
          return new Error("Error: Server error (500).");
        default:
          return new Error(
            `Error: Unexpected response status ${configResponse.status}.`
          );
      }
    }

    const config = await configResponse.json();
    if (!config.success || !config.data) {
      return new Error("Error: Invalid configuration response format.");
    }

    return config.data;
  } catch (error) {
    if (error instanceof TypeError) {
      return new Error("Error: Network error or URL cannot be reached.");
    } else if (error instanceof Error) {
      return error;
    } else {
      return new Error("Error: An error occurred connecting to the server.");
    }
  }
};

export function toWebSocketURL(httpUrl: string) {
  const url = new URL(httpUrl);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.pathname += "/websocket";
  return url.toString();
}