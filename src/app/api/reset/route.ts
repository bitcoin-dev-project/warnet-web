import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { eventsPath, getConfig, getEvents, teamPath } from "@/config/filesystem";
import { createTeamPoints } from "@/helpers";

export async function POST(req: NextRequest) {
  try {
    const config = await getConfig();
    if (config instanceof Error) {
      return NextResponse.json({ message: config.message, success: false }, { status: 500 });
    }

    if (fs.existsSync(teamPath)) {
      const teamPoints = createTeamPoints(config.teams);
      fs.writeFileSync(teamPath, JSON.stringify(teamPoints, null, 2));
    }

    if (fs.existsSync(eventsPath)) {
      const events = await getEvents();
      console.log("events before deleted", {events})
      fs.writeFileSync(eventsPath, JSON.stringify([], null, 2));
    }

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message ?? "Error resetting data", data: null },
      { status: 500 }
    );
  }
}
