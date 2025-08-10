"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import type { ShipmentDetailsFormData } from "@/lib/schemas";
import type { ShippingRate, ShipmentSummary } from "@/lib/types";
import { transformToEasyPost } from "@/lib/schemas";
import ShipmentDetailsForm from "@/components/organisms/ShipmentDetailsForm";
import BreadcrumbNavigation from "@/components/organisms/BreadcrumbNavigation";
import { SHIPPING_BREADCRUMB_STEPS } from "@/lib/constants";

const RateSelection = dynamic(
  () => import("@/components/organisms/RateSelection"),
  {
    loading: () => (
      <div className="text-sm text-gray-600">Loading rates…</div>
    ),
  }
);

export default function ShipmentPage() {
  const [step, setStep] = useState<number>(1);

  const [rates, setRates] = useState<ShippingRate[]>([]);
  const [shipmentSummary, setShipmentSummary] =
    useState<ShipmentSummary | null>(null);
  const [shipmentId, setShipmentId] = useState<string | null>(null);
  const router = useRouter();

  const handleShipmentSubmit = async (data: ShipmentDetailsFormData) => {
    try {
      const easyPostData = transformToEasyPost(data);
      // Pre-warm Step 2 chunk right when submission begins
      void import("@/components/organisms/RateSelection");

      const response = await fetch("/api/shipping/rates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(easyPostData),
      });

      if (!response.ok) {
        throw new Error("Failed to get shipping rates");
      }

      const responseData = await response.json();

      setRates(responseData.rates);
      setShipmentId(responseData.shipment_id);
      setShipmentSummary({
        from_address: easyPostData.from_address,
        to_address: easyPostData.to_address,
        parcel: easyPostData.parcel,
      });
      setStep(2);
    } catch (error) {
      console.error("Error getting shipping rates:", error);
      alert("Error getting shipping rates. Please try again.");
    }
  };

  const handleRateSelect = async (rateId: string) => {
    if (!shipmentId) {
      console.error("Missing shipment id for label purchase navigation");
      return;
    }
    router.push(`/label/${shipmentId}?rateId=${encodeURIComponent(rateId)}`);
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <>
      <BreadcrumbNavigation
        steps={SHIPPING_BREADCRUMB_STEPS}
        currentStep={step}
      />
      <main className="max-w-[62rem] mx-auto px-4 py-8">
        {step === 1 && <ShipmentDetailsForm onSubmit={handleShipmentSubmit} />}
        {step === 2 && shipmentSummary && (
          <RateSelection
            rates={rates}
            shipmentSummary={shipmentSummary}
            selectedRateId={""}
            onRateSelect={handleRateSelect}
            onBack={handleBack}
          />
        )}
      </main>
    </>
  );
}
