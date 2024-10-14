import fs, { write } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { configPath, eventsPath, getConfig, getEvents, teamPath, writeToFile } from "@/config/filesystem";
import { createTeamPoints } from "@/helpers";
import { ForkObserverData, Team } from "@/types";

export async function POST(req: NextRequest) {
  try {
    let config = await getConfig();

    if (config instanceof Error) {
      return NextResponse.json({ message: config.message, success: false }, { status: 500 });
    }

    const { fork_observer_api } = config
    if (!fork_observer_api) {
      return NextResponse.json({ message: "Cannot initialize leaderboard without fork_observer_api", success: false}, {status: 500})
    }
    
    const teams = await createTeamsFromForkObserver(fork_observer_api)
    if (teams instanceof Error) {
      return NextResponse.json({ message: teams.message, success: false }, { status: 500 });
    }
    if (!teams.length) {
      return NextResponse.json({ message: "No teams found", success: false }, { status: 500 });
    }

    config.teams = teams
    // fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    writeToFile(configPath, config)

    const teamPoints = createTeamPoints(config.teams);
    writeToFile(teamPath, teamPoints)

    writeToFile(eventsPath, [])

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message ?? "Error initializing leaderboard", data: null },
      { status: 500 }
    );
  }
}


const createTeamsFromForkObserver = async (fork_observer_api: string) => {
  const responseData = await fetch(fork_observer_api, {
    cache: 'no-store',
    headers: {
      'Pragma': 'no-cache',
    },
  });
  if (responseData.status !== 200) {
    return new Error("Failed to fetch fork observer data");
  }

  const data = (await responseData.json()).data as ForkObserverData;
  if (!data.nodes.length) {
    return new Error("No nodes found");
  }
  
  const teamConfig: Team[] = []
  const lookup: Record<string, number> = {}

  data.nodes.forEach((node: any) => {
    const name = node.name;
    const isTeamNode = node.name.split('-').length === 3
    if (isTeamNode) {
      const [_tank, _id, team] = node.name.split('-')
      if (lookup[team] !== undefined) {
        const position = lookup[team]
        teamConfig[position].nodes.push(name)
      } else {
        teamConfig.push({
          name: team,
          nodes: [name]
        })
        lookup[team] = teamConfig.length - 1
      }
    }
    return;
  })
  return teamConfig
}