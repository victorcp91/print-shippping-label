"use client";

import React from "react";
import Text from "@/components/atoms/Text";
import Icon from "@/components/atoms/Icon";
import Button from "@/components/atoms/Button";
import type { ShippingRate } from "@/lib/types";

export interface RateItemProps {
  rate: ShippingRate;
  selected: boolean;
  onSelect: (rateId: string) => void;
}

const RateItem: React.FC<RateItemProps> = ({ rate, selected, onSelect }) => {
  return (
    <div
      className={`relative px-4 py-4 transition ${
        selected ? "bg-blue-50" : "hover:bg-gray-50"
      }`}
      aria-selected={selected}
      data-testid={`rate-item-${rate.id}`}
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-12 flex items-center gap-3 md:col-span-5">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-primary-600">
            <Icon name="truck" />
          </span>
          <div className="min-w-0 flex flex-col">
            <Text className="truncate text-base font-semibold text-gray-900">
              {rate.service}
            </Text>
            <Text className="text-sm text-gray-500">{rate.carrier}</Text>
          </div>
        </div>

        <div className="col-span-6 md:col-span-3">
          {rate.delivery_days && (
            <Text className="text-sm text-gray-700">
              {rate.delivery_days} days
            </Text>
          )}
        </div>

        <div className="col-span-6 md:col-span-2">
          {rate.rate && (
            <Text className="text-base font-semibold text-gray-900">
              ${rate.rate}
            </Text>
          )}
        </div>

        <div className="col-span-12 flex justify-end md:col-span-2">
          <Button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(rate.id);
            }}
          >
            Select
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RateItem;
