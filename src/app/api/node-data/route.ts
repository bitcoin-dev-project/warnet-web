import path from "path";
import { promises as fs, readFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { getLatestTipHeight } from "@/helpers";
import { ForkObserverData } from "@/types";
import { getConfig } from "@/config/filesystem";

let inMemoryData = readFileSync(
  path.join(process.cwd(), "public", "header-and-teams.json"),
  "utf-8"
);

export async function GET(req: NextRequest) {
  try {
    const config = await getConfig();

    if (config instanceof Error) {
      return NextResponse.json({ message: config.message, success: false }, { status: 500 });
    }

    const { fork_observer_api } = config;

    if (!fork_observer_api.trim()) {
      const file = inMemoryData ?? await fs.readFile(
        path.join(process.cwd(), "public", "header-and-teams.json"),
        "utf-8"
      );
      if (!file) {
        return NextResponse.json(
          { message: "File not found", data: null },
          { status: 404 }
        );
      }

      const data = JSON.parse(file);
      // simulate node reachability
      // data.nodes[1].reachable = !data.nodes[1].reachable;

      // simulate increasing height
      if (data.header_infos[15].height > 81) {
        data.header_infos[15].height = 80;
      } else {
        data.header_infos[15].height += 1;
      }
      inMemoryData = JSON.stringify(data);

      const { latestTipHeight } = getLatestTipHeight({ header_infos: data.header_infos }) ?? 0;

      return NextResponse.json({ data: {...data, latestTipHeight } as ForkObserverData, message: "Success" }, { status: 200 });
    }

    const response = await fetch(fork_observer_api);
    const data = await response.json();


    NextResponse.json({ data, message: "Success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message ?? "Error generating node data", data: null },
      { status: 500 }
    );
  }
}