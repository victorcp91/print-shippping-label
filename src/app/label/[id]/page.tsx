export const revalidate = 5 * 24 * 60 * 60; // 5 days

import Heading from "@/components/atoms/Heading";
import Text from "@/components/atoms/Text";
import BreadcrumbNavigation from "@/components/organisms/BreadcrumbNavigation";
import { SHIPPING_BREADCRUMB_STEPS } from "@/lib/constants";
import Image from "next/image";
import BuyOnceAndRefresh from "./BuyOnceAndRefresh";
import Button from "@/components/atoms/Button";

async function getShipment(shipmentId: string) {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_PATH ?? ""
    }/api/shipping/shipment/${encodeURIComponent(shipmentId)}`,
    {
      next: { revalidate, tags: [`shipment-${shipmentId}`] },
    }
  );
  if (!res.ok) {
    const details = await res.text();
    throw new Error(`Failed to load shipment: ${res.status} ${details}`);
  }
  return res.json();
}

export default async function LabelPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const data = await getShipment(id);
  const labelUrl: string | undefined = data?.postage_label?.label_url;
  const trackingCode: string | undefined = data?.tracking_code ?? undefined;

  const width = 600;
  const height = 900;

  return (
    <>
      <BreadcrumbNavigation steps={SHIPPING_BREADCRUMB_STEPS} currentStep={3} />
      <div className="max-w-[62rem] mx-auto px-4 py-8">
        <div className="mb-8">
          <Heading variant="default">USPS Shipping Label</Heading>
          {trackingCode && <Text variant="body">Tracking: {trackingCode}</Text>}
        </div>

        {labelUrl ? (
          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="bg-white p-4 shadow-sm border rounded print:shadow-none print:border-0">
              <Image
                src={labelUrl}
                alt="USPS Shipping Label"
                width={width}
                height={height}
                className="h-auto w-auto max-w-full"
                priority
              />
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="print"
                href={labelUrl}
                target="_blank"
                rel="noopener noreferrer"
                isDirty
                isValid
              >
                Print Label
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <BuyOnceAndRefresh shipmentId={id} />
          </div>
        )}
      </div>
    </>
  );
}
