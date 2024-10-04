import { wsManager } from "./websocket/websocketManager";

export const startPolling = async () => {
  const interval = setInterval(async () => {
    try {
      // const data = await fetch('http://localhost:3000/api/internal-data');
      // const json = await data.json();
      // console.log(json);
      wsManager.broadcast({ type: 'message', data: "test" });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, 3000);

  return () => {
    clearInterval(interval);
  };
};

