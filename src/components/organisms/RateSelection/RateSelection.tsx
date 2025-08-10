"use client";

import React, { useState } from "react";
import type { RateSelectionProps } from "@/lib/types";
import Heading from "@/components/atoms/Heading";
import Text from "@/components/atoms/Text";
import RateItem from "./RateItem";
import BackButton from "@/components/atoms/BackButton";

export default function RateSelection({
  rates,
  shipmentSummary,
  selectedRateId,
  onRateSelect,
  onBack,
}: RateSelectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRateSelect = async (rateId: string) => {
    try {
      setIsSubmitting(true);
      await onRateSelect(rateId);
    } catch (error) {
      console.error("Error selecting rate:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[62rem] mx-auto px-4 py-8">
      <div className="mb-6">
        <BackButton onClick={onBack} />
      </div>

      <div className="mb-8">
        <Heading variant="default">Select Shipping Rate</Heading>
        <Text variant="body">
          Choose the shipping option that best fits your needs
        </Text>
      </div>

      <div className="mb-8">
        <Heading variant="section" className="mb-4">
          Shipment Summary
        </Heading>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Text className="mb-2 font-medium text-gray-800">From:</Text>
              <div className="text-gray-700">
                <p>{shipmentSummary.from_address.name}</p>
                <p>{shipmentSummary.from_address.street1}</p>
                <p>
                  {shipmentSummary.from_address.city},{" "}
                  {shipmentSummary.from_address.state}{" "}
                  {shipmentSummary.from_address.zip}
                </p>
              </div>
            </div>
            <div>
              <Text className="mb-2 font-medium text-gray-800">To:</Text>
              <div className="text-gray-700">
                <p>{shipmentSummary.to_address.name}</p>
                <p>{shipmentSummary.to_address.street1}</p>
                <p>
                  {shipmentSummary.to_address.city},{" "}
                  {shipmentSummary.to_address.state}{" "}
                  {shipmentSummary.to_address.zip}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Text className="mb-2 font-medium text-gray-800">Package:</Text>
            <div className="text-gray-700">
              <p>
                {shipmentSummary.parcel.length}&quot; ×{" "}
                {shipmentSummary.parcel.width}&quot; ×{" "}
                {shipmentSummary.parcel.height}&quot; •{" "}
                {shipmentSummary.parcel.weight} oz
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Heading variant="section" className="mb-4">
          Available Rates
        </Heading>
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 bg-white">
          {rates.map((rate) => (
            <RateItem
              key={rate.id}
              rate={rate}
              selected={selectedRateId === rate.id}
              onSelect={handleRateSelect}
            />
          ))}
        </div>
      </div>

      {selectedRateId && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => handleRateSelect(selectedRateId)}
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Continue with Selected Rate"}
          </button>
        </div>
      )}
    </div>
  );
}
