import path from "path";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { AwardedTeamPoints, EVENT, InternalData } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const eventsData = await fetch("http://localhost:3040/api/events", {
      cache: "no-store",
      headers: {
        Pragma: "no-cache",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data.data as EVENT[];
      })
      .catch((err: any) => {
        return new Error(err?.message ?? "Error fetching events");
      });

    if (eventsData instanceof Error) {
      return NextResponse.json(
        { message: eventsData.message, data: null },
        { status: 500 }
      );
    }

    const pointsData = await fetch("http://localhost:3040/api/team-points", {
      cache: "no-store",
      headers: {
        Pragma: "no-cache",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data.data as AwardedTeamPoints;
      })
      .catch((err: any) => {
        return new Error(err?.message ?? "Error fetching team points");
      });

    if (pointsData instanceof Error) {
      return NextResponse.json(
        { message: pointsData.message, data: null },
        { status: 500 }
      );
    }

    const data: InternalData = {
      points: pointsData ?? {},
      events: eventsData ?? [],
    };

    return NextResponse.json({ data, message: "Success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message ?? "Error generating node data", data: null },
      { status: 500 }
    );
  }
}
