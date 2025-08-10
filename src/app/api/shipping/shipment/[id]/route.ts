import { NextResponse } from "next/server";

export async function GET(_req: Request, context: unknown) {
  try {
    const { params } = (context as { params?: Record<string, string> }) ?? {};
    const shipmentId = params?.id;
    if (!shipmentId) {
      return NextResponse.json(
        { error: "Missing shipment id" },
        { status: 400 }
      );
    }

    const apiUrl = process.env.EASYPOST_API_URL;
    const apiKey = process.env.EASYPOST_API_KEY;
    if (!apiUrl || !apiKey) {
      return NextResponse.json(
        { error: "Missing EASYPOST_API_URL or EASYPOST_API_KEY" },
        { status: 500 }
      );
    }

    const basicAuth = Buffer.from(`${apiKey}:`).toString("base64");
    const res = await fetch(
      `${apiUrl}/shipments/${encodeURIComponent(shipmentId)}`,
      {
        headers: { Authorization: `Basic ${basicAuth}` },
        cache: "no-store",
      }
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
