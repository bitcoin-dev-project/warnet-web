import { EVENT, websocketMessageType } from "../../shared/types";
import { saveEvents } from "../service/sqlite";
import { wsManager } from "../service/websocket/websocketManager";

export const processEvents = async (events: EVENT[]) : Promise<void | Error> => {
  if (!events.length) return;
  const saved = await saveEvents(events);
  if (saved instanceof Error) {
    console.log("Error saving events to database:", saved.message);
    return new Error("Error saving events to database");
  }
  broadcastEvents(events);
};

const broadcastEvents = (events: EVENT[]) => {
  events.forEach((event) => {
    new Promise(() => {
      wsManager.broadcast({
        type: websocketMessageType.Event,
        message: event.message,
        data: {
          type: event.type,
          meta: event.meta,
          date: event.date,
          message: event.message,
        },
      });
    }).catch((error) => {
      console.error(`Broadcast error for event ${event.message}:`, error);
    });
  });
};

export const createEventForStylePoints = (
  name: string,
  score: number,
  reason?: string
) => {
  return {
    message: `${score} points awarded to ${name}`,
    type: "style-points",
    meta: reason ? [reason] : undefined,
    date: new Date().toISOString(),
  } as EVENT;
};
