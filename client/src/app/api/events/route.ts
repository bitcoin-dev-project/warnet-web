import { NextRequest, NextResponse } from "next/server";
import { EVENT } from "@/types";
import { headers } from "next/headers";
import { decryptSlug } from "@/lib/urlObfuscator";

export async function GET(req: NextRequest) {
  try {
    const headersList = headers()
    const referer = headersList.get('referer')
    if (!referer) return NextResponse.json({ message: "No referer found", data: null }, { status: 400 });
    
    const slug = new URL(referer).pathname.split("/")[2] ?? "";
    if (!slug) return NextResponse.json({ message: "No server url from request", data: null }, { status: 400 });
    
    const server_url = decryptSlug(slug);

    if (server_url instanceof Error) {
      return NextResponse.json({ message: server_url.message, data: null }, { status: 500 });
    }

    const eventsData = await fetch(server_url + "/events", {
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

    const data = eventsData ?? [];

    return NextResponse.json({ data, message: "Success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message ?? "Error generating node data", data: null },
      { status: 500 }
    );
  }
}
