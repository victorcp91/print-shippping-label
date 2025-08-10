import { z } from "zod";

// Validation schemas
export const addressSchema = z.object({
  name: z.string().min(1, "Name is required"),
  street1: z.string().min(1, "Street address is required"),
  street2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
});

export const parcelSchema = z.object({
  length: z.string().min(1, "Length is required"),
  width: z.string().min(1, "Width is required"),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
});

export const shipmentSchema = z.object({
  to_address: addressSchema,
  from_address: addressSchema,
  parcel: parcelSchema,
});

// Types based on the schemas
export type Address = z.infer<typeof addressSchema>;
export type Parcel = z.infer<typeof parcelSchema>;
export type ShipmentData = z.infer<typeof shipmentSchema>;

// Helper function to get shipping rates
export async function getShippingRates(shipmentData: ShipmentData) {
  const response = await fetch("/api/shipping/rates", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shipmentData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to get shipping rates");
  }

  return response.json();
}
