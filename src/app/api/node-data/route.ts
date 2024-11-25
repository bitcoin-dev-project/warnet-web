import { NextRequest, NextResponse } from "next/server";
import { ForkObserverData } from "@/types";

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const responseData = await fetch("http://localhost:3040/api/fork-data", {
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
    return NextResponse.json(
      { message: error?.message ?? "Error generating node data", data: null },
      { status: 500 }
    );
  }
}