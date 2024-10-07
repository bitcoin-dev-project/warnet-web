import { websocketMessageType } from "../../shared/types";
import { processDataToCache } from "../service/cache/process";
import { generateEvents } from "../service/diff/events";
import { fetchData } from "../service/polling/fetch";
import { wsManager } from "../service/websocket/websocketManager";
import { processEvents } from "./events";

export async function core() {
  const data = await fetchData();
  if (data instanceof Error) {
    console.log("Error fetching data:", data.message);
    return;
  }
  
  const dataToCache = processDataToCache(data);
  if (dataToCache instanceof Error) {
    console.log("Error processing data to cache:", dataToCache.message);
    return;
  }

  wsManager.broadcast({
    type: websocketMessageType.ForkObserverData,
    message: "ForkObserverData",
  })

  const events = generateEvents();
  if (events instanceof Error) {
    console.log("Error generating events:", events.message);
    return;
  }

  await processEvents(events);
}