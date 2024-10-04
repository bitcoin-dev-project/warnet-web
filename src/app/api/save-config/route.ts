import path from "path";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { EVENT, StylePoints } from "@/types";

type ConfigData = Record<string, number>;

export async function POST(req: NextRequest) {
  try {
    const data: StylePoints = await req.json();

    // const key = Object.keys(data)[0];
    // const value = data[key];

    const { name, score, reason } = data;

    const filePath = path.join(process.cwd(), "data", "team-points.json");
    const eventPath = path.join(process.cwd(), "data", "events.json");
    const existingPoints = await fs.readFile(filePath, "utf-8");

    const parseExistingPoints: ConfigData = JSON.parse(existingPoints);
    const currentValue = parseExistingPoints[name] ?? 0;

    const newPoints = { ...parseExistingPoints, [name]: score + currentValue };

    const updatedData = { ...newPoints };
    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), "utf-8");

    const existingEvents = await fs.readFile(eventPath, "utf-8");
    const parsedEvents: EVENT[] = JSON.parse(existingEvents);

    const meta = reason ? [reason] : undefined
    const newEvents: EVENT[] = [{ message: `${score} points awarded to ${name}`, type: "style-points", meta, date: new Date().toISOString() }, ...parsedEvents];

    await fs.writeFile(eventPath, JSON.stringify(newEvents, null, 2), "utf-8");


    // if (io) {
    //   io.emit('update', {data: data});
    //   return NextResponse.json({ success: true, message: 'Update broadcasted' }, { status: 200 });
    // } 
    // wsManager.broadcast({ type: 'message', data: "Config saved successfully!" });

    return NextResponse.json({ message: "Config saved successfully!", success: true }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Failed to save config", error, success: false }, { status: 500 });
  }
}
