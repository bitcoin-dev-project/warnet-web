import { NextRequest, NextResponse } from "next/server";
import { eventsPath, getConfig, teamPath, writeToFile } from "@/config/filesystem";
import { createTeamPoints } from "@/helpers";

export async function POST(req: NextRequest) {
  try {
    const config = await getConfig();

    if (config instanceof Error) {
      return NextResponse.json({ message: config.message, success: false }, { status: 500 });
    }

    const teamPoints = createTeamPoints(config.teams);
    writeToFile(teamPath, teamPoints)

    writeToFile(eventsPath, [])

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message ?? "Error resetting data", data: null },
      { status: 500 }
    );
  }
}