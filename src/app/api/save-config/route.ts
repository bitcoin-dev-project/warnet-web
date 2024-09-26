import path from "path";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";

type ConfigData = Record<string, Record<string, number>>;

export async function POST(req: NextRequest) {
  try {
    const data: { [key: string]: number } = await req.json();

    const filePath = path.join(process.cwd(), "public", "team-points.json");
    const existingData = await fs.readFile(filePath, "utf-8");

    const parseExistingData: ConfigData = JSON.parse(existingData);

    const constantsConfig = { ...parseExistingData, ...data };

    const updatedData = { ...constantsConfig };
    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), "utf-8");

    return NextResponse.json({ message: "Config saved successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to save config", error }, { status: 500 });
  }
}
