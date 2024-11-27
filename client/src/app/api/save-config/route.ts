import path from "path";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { EVENT, StylePoints } from "@/types";
import { headers } from "next/headers";
import { decryptSlug } from "@/lib/urlObfuscator";

type ConfigData = Record<string, number>;

export async function POST(req: NextRequest) {
  try {
    const body: StylePoints = await req.json();

    // authkey will always be available from the middleware
    const authKey = req.headers.get('x-auth-key') as string
    console.log({authKey})
    const { name, score, reason } = body;

    if (!name || !score) {
      return NextResponse.json({ message: "Invalid request, name and score are required", data: null }, { status: 400 });
    }

    const headersList = headers()
    const referer = headersList.get('referer')
    if (!referer) return NextResponse.json({ message: "No referer found", data: null }, { status: 400 });
    
    const slug = new URL(referer).pathname.split("/")[2] ?? "";
    if (!slug) return NextResponse.json({ message: "No server url from request", data: null }, { status: 400 });
    
    const server_url = decryptSlug(slug);
    console.log({server_url})

    const saveConfigResponse = await fetch(server_url + "/team-points", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-key": authKey,
      },
      body: JSON.stringify({ name, score, reason }),
    })

    if (!saveConfigResponse.ok || saveConfigResponse.status !== 200) {
      return NextResponse.json({ message: saveConfigResponse.statusText ?? "Failed to update team points", success: false }, { status: saveConfigResponse.status });
    }

    const data = await saveConfigResponse.json();

    if (!data.success) {
      return NextResponse.json({ message: data.message, success: false }, { status: 500 });
    }

    return NextResponse.json({ message: "Team points saved successfully!", success: true }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Failed to save config", error, success: false }, { status: 500 });
  }
}
