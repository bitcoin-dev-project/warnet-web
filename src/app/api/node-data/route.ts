import path from "path";
import { promises as fs, readFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { getLatestTipHeight } from "@/helpers";
import { ForkObserverData } from "@/types";

// type ConfigData = Record<string, Record<string, number>>;

let inMemoryData = readFileSync(
  path.join(process.cwd(), "public", "header-and-teams.json"),
  "utf-8"
);

const saveDataToJSONFile = async (data: any) => {
  try {
    await fs.writeFile(
      path.join(process.cwd(), "public", "header-and-teams.json"), JSON.stringify(data), { encoding: "utf-8" }
    );
  } catch (error: any) {}
};

export async function GET(req: NextRequest) {
  try {
    if (!process.env.NEXT_FORK_OBSERVER_API) {
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
      // data.nodes[1].reachable = !data.nodes[1].reachable;

      // simulate increasing height
      if (data.header_infos[15].height > 81) {
        data.header_infos[15].height = 80;
      } else {
        data.header_infos[15].height += 1;
      }
      inMemoryData = JSON.stringify(data);

      const { latestTipHeight } = getLatestTipHeight({ header_infos: data.header_infos }) ?? 0;

      return NextResponse.json({ data: {...data, latestTipHeight} as ForkObserverData, message: "Success" }, { status: 200 });
    }

    const response = await fetch(process.env.NEXT_FORK_OBSERVER_API);
    const data = await response.json();


    NextResponse.json({ data, message: "Success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message ?? "Error generating node data", data: null },
      { status: 500 }
    );
  }
}