import path from "path";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";

// type ConfigData = Record<string, Record<string, number>>;

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
      const file = await fs.readFile(
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

      // await saveDataToJSONFile(data);

      return NextResponse.json({ data, message: "Success" }, { status: 200 });
    }

    const response = await fetch(process.env.NEXT_FORK_OBSERVER_API);
    const data = await response.json();

    await saveDataToJSONFile(data);

    NextResponse.json({ data, message: "Success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message ?? "Error generating node data", data: null },
      { status: 500 }
    );
  }
}