"use client";

import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Resolver } from "react-hook-form";
import {
  shipmentDetailsSchema,
  type ShipmentDetailsFormData,
  usStates,
} from "@/lib/schemas";
import FormField from "@/components/molecules/FormField";
import FormSelectField from "@/components/molecules/FormSelectField";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import Text from "@/components/atoms/Text";

interface ShipmentDetailsFormProps {
  onSubmit: (data: ShipmentDetailsFormData) => Promise<void>;
  defaultValues?: Partial<ShipmentDetailsFormData>;
}

export default function ShipmentDetailsForm({
  onSubmit,
  defaultValues,
}: ShipmentDetailsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    trigger,
  } = useForm<ShipmentDetailsFormData>({
    resolver: zodResolver(
      shipmentDetailsSchema
    ) as Resolver<ShipmentDetailsFormData>,
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues,
  });

  const handleFormSubmit: SubmitHandler<ShipmentDetailsFormData> = async (
    data
  ) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const onError = () => {
    trigger();
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <Heading variant="default">Shipment Details</Heading>
        <Text variant="body">
          Enter the sender and recipient information and package details.
        </Text>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit, onError)}
        noValidate
        className="space-y-8"
      >
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="border-b border-gray-100 pb-4 mb-6">
            <Heading variant="section">From Address</Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Full Name"
              required
              error={errors.fromName?.message}
              {...register("fromName")}
              data-testid="fromName"
            />

            <FormField
              label="Street Address"
              required
              error={errors.fromStreet?.message}
              {...register("fromStreet")}
              data-testid="fromStreet"
            />

            <FormField
              label="Street Address Line 2"
              error={errors.fromStreet2?.message}
              {...register("fromStreet2")}
              data-testid="fromStreet2"
            />

            <FormField
              label="Email"
              type="email"
              error={errors.fromEmail?.message}
              {...register("fromEmail", {
                setValueAs: (v) => (v === "" ? undefined : v),
              })}
              data-testid="fromEmail"
            />

            <FormField
              label="City"
              required
              error={errors.fromCity?.message}
              {...register("fromCity")}
              data-testid="fromCity"
            />

            <FormSelectField
              label="State"
              required
              error={errors.fromState?.message}
              placeholder="Select a state"
              {...register("fromState")}
              data-testid="fromState"
            >
              {usStates.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </FormSelectField>

            <FormField
              label="ZIP Code"
              required
              type="text"
              placeholder="12345"
              error={errors.fromZipCode?.message}
              {...register("fromZipCode")}
              data-testid="fromZipCode"
            />

            <FormField
              label="Phone Number"
              required
              type="tel"
              placeholder="(555) 123-4567"
              error={errors.fromPhone?.message}
              {...register("fromPhone")}
              data-testid="fromPhone"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="border-b border-gray-100 pb-4 mb-6">
            <Heading variant="section">To Address</Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Full Name"
              required
              error={errors.toName?.message}
              {...register("toName")}
              data-testid="toName"
            />

            <FormField
              label="Street Address"
              required
              error={errors.toStreet?.message}
              {...register("toStreet")}
              data-testid="toStreet"
            />

            <FormField
              label="Street Address Line 2"
              error={errors.toStreet2?.message}
              {...register("toStreet2")}
              data-testid="toStreet2"
            />

            <FormField
              label="Email"
              type="email"
              error={errors.toEmail?.message}
              {...register("toEmail", {
                setValueAs: (v) => (v === "" ? undefined : v),
              })}
              data-testid="toEmail"
            />

            <FormField
              label="City"
              required
              error={errors.toCity?.message}
              {...register("toCity")}
              data-testid="toCity"
            />

            <FormSelectField
              label="State"
              required
              error={errors.toState?.message}
              placeholder="Select a state"
              {...register("toState")}
              data-testid="toState"
            >
              {usStates.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </FormSelectField>

            <FormField
              label="ZIP Code"
              required
              type="text"
              placeholder="12345"
              error={errors.toZipCode?.message}
              {...register("toZipCode")}
              data-testid="toZipCode"
            />

            <FormField
              label="Phone Number"
              required
              type="tel"
              placeholder="(555) 123-4567"
              error={errors.toPhone?.message}
              {...register("toPhone")}
              data-testid="toPhone"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="border-b border-gray-100 pb-4 mb-6">
            <Heading variant="section">Package Details</Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Weight (lbs)"
              required
              type="text"
              inputMode="decimal"
              placeholder="0"
              error={errors.weight?.message}
              {...register("weight")}
              data-testid="weight"
            />

            <FormField
              label="Length (inches)"
              required
              type="text"
              inputMode="decimal"
              placeholder="0"
              error={errors.length?.message}
              {...register("length")}
              data-testid="length"
            />

            <FormField
              label="Width (inches)"
              required
              type="text"
              inputMode="decimal"
              placeholder="0"
              error={errors.width?.message}
              {...register("width")}
              data-testid="width"
            />

            <FormField
              label="Height (inches)"
              required
              type="text"
              inputMode="decimal"
              placeholder="0"
              error={errors.height?.message}
              {...register("height")}
              data-testid="height"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            isValid={isValid}
            isDirty={isDirty || isValid}
          >
            {isSubmitting ? "Processing..." : "Continue to Rate Selection"}
          </Button>
        </div>
      </form>
    </div>
  );
}
