"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { ShipmentDetailsFormData } from "@/lib/schemas";
import type { ShippingRate, ShipmentSummary } from "@/lib/types";
import { transformToEasyPost } from "@/lib/schemas";
import ShipmentDetailsForm from "@/components/organisms/ShipmentDetailsForm";
import RateSelection from "@/components/organisms/RateSelection";
import BreadcrumbNavigation from "@/components/organisms/BreadcrumbNavigation";
import { SHIPPING_BREADCRUMB_STEPS } from "@/lib/constants";

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
      <div className="max-w-[62rem] mx-auto px-4 py-8">
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
      </div>
    </>
  );
}
