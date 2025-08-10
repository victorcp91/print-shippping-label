import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(req: Request) {
  try {
    const { shipmentId, rateId } = (await req.json()) as {
      shipmentId?: string;
      rateId?: string;
    };

    if (!shipmentId || !rateId) {
      return NextResponse.json(
        { error: "Missing shipmentId or rateId" },
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

    // Check current status first (avoid double-buy)
    const currentRes = await fetch(
      `${apiUrl}/shipments/${encodeURIComponent(shipmentId)}`,
      {
        headers: { Authorization: `Basic ${basicAuth}` },
        cache: "no-store",
      }
    );

    if (!currentRes.ok) {
      const details = await currentRes.text();
      return NextResponse.json(
        { error: `Failed to load shipment: ${currentRes.status}`, details },
        { status: currentRes.status }
      );
    }

    const current = await currentRes.json();
    if (current?.postage_label?.label_url) {
      // Already bought, just revalidate
      revalidateTag(`shipment-${shipmentId}`);
      revalidatePath(`/label/${shipmentId}`);
      return NextResponse.json(current);
    }

    // Buy once
    const buyRes = await fetch(
      `${apiUrl}/shipments/${encodeURIComponent(shipmentId)}/buy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${basicAuth}`,
        },
        body: JSON.stringify({ rate: { id: rateId } }),
        cache: "no-store",
      }
    );

    const data = await buyRes.json();

    // Revalidate ISR cache for this shipment page
    revalidateTag(`shipment-${shipmentId}`);
    revalidatePath(`/label/${shipmentId}`);

    return NextResponse.json(data, { status: buyRes.status });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
