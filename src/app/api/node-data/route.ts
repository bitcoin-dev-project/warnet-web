import { NextRequest, NextResponse } from "next/server";
import { ForkObserverData } from "@/types";
import { headers } from 'next/headers'
import { decryptSlug } from "@/lib/urlObfuscator";

export const dynamic = 'force-dynamic'

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

    const responseData = await fetch(server_url +"/fork-data", {
      cache: 'no-store',
      headers: {
        'Pragma': 'no-cache',
      },
    });
    const data = (await responseData.json()).data as ForkObserverData;

    const response = NextResponse.json({ data, message: "Success" }, { status: 200 });
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')

    return response;

  } catch (error: any) {
    console.error({error: error?.message})
    return NextResponse.json(
      { message: error?.message ?? "Error generating node data", data: null },
      { status: 500 }
    );
  }
}