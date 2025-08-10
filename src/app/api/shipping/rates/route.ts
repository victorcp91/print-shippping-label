import { NextResponse } from "next/server";

interface ShippingAddress {
  name: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
}

interface ParcelDetails {
  length: string;
  width: string;
  height: string;
  weight: string;
}

interface ShipmentRequest {
  to_address: ShippingAddress;
  from_address: ShippingAddress;
  parcel: ParcelDetails;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to_address, from_address, parcel } = body as ShipmentRequest;

    if (!to_address || !from_address || !parcel) {
      return NextResponse.json(
        { error: "Missing required shipping information" },
        { status: 400 }
      );
    }

    const shipmentData = {
      shipment: {
        to_address,
        from_address,
        parcel,
      },
    };

    const basicAuth = Buffer.from(`${process.env.EASYPOST_API_KEY}:`).toString(
      "base64"
    );
    const response = await fetch(`${process.env.EASYPOST_API_URL}/shipments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuth}`,
      },
      body: JSON.stringify(shipmentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: "Failed to get shipping rates", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      rates: data.rates,
      shipment_id: data.id,
    });
  } catch (error) {
    console.error("Error processing shipping rate request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
