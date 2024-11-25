import { websocketMessageType } from "../../shared/types";
import { processDataToCache } from "../service/cache/process";
import { generateEvents } from "../service/diff/events";
import { fetchData } from "../service/polling/fetch";
import { wsManager } from "../service/websocket/websocketManager";
import { processEvents } from "./events";

export async function core() {
  const canFallbackToDummyData = process.env.NODE_ENV === "development";
  const data = await fetchData({allowDummyData: canFallbackToDummyData});
  if (data instanceof Error) {
    console.log("Error fetching data:", data.message);
    return;
  }
  
  // If new data from poll, update cache and continue processing else early return
  const dataToCache = processDataToCache(data);
  if (dataToCache instanceof Error) {
    console.log("Error processing data to cache:", dataToCache.message);
    return;
  }

  // Broadcast new data to all connected clients
  wsManager.broadcast({
    type: websocketMessageType.ForkObserverData,
    message: "ForkObserverData",
  })

  // Generate events from cache diff
  const events = generateEvents();
  if (events instanceof Error) {
    console.log("Error generating events:", events.message);
    return;
  }

  await processEvents(events);
}