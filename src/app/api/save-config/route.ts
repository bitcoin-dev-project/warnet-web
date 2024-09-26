import path from "path";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";

type ConfigData = Record<string, number>;

export async function POST(req: NextRequest) {
  try {
    const data: { [key: string]: number } = await req.json();

    const key = Object.keys(data)[0];
    const value = data[key];

    const filePath = path.join(process.cwd(), "public", "team-points.json");
    const existingPoints = await fs.readFile(filePath, "utf-8");

    const parseExistingPoints: ConfigData = JSON.parse(existingPoints);
    const currentValue = parseExistingPoints[key] ?? 0;

    const newPoints = { ...parseExistingPoints, [key]: value + currentValue };

    const updatedData = { ...newPoints };
    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), "utf-8");

    return NextResponse.json({ message: "Config saved successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to save config", error }, { status: 500 });
  }
}
