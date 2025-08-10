import { z } from "zod";

export const shipmentDetailsSchema = z.object({
  fromName: z.string().min(1, "Full name is required"),
  fromStreet: z.string().min(1, "Street address is required"),
  fromStreet2: z.string().optional(),
  fromCity: z.string().min(1, "City is required"),
  fromState: z.string().min(1, "State is required"),
  fromZipCode: z
    .string()
    .min(5, "ZIP code must be at least 5 characters")
    .max(10, "ZIP code must be at most 10 characters"),
  fromPhone: z.string().min(10, "Phone number must be at least 10 characters"),
  fromEmail: z.string().email("Invalid email format").optional(),
  fromCountry: z.string().default("US"),

  toName: z.string().min(1, "Full name is required"),
  toStreet: z.string().min(1, "Street address is required"),
  toStreet2: z.string().optional(),
  toCity: z.string().min(1, "City is required"),
  toState: z.string().min(1, "State is required"),
  toZipCode: z
    .string()
    .min(5, "ZIP code must be at least 5 characters")
    .max(10, "ZIP code must be at most 10 characters"),
  toPhone: z.string().min(10, "Phone number must be at least 10 characters"),
  toEmail: z.string().email("Invalid email format").optional(),
  toCountry: z.string().default("US"),

  weight: z
    .string()
    .min(1, "Weight is required")
    .refine((val) => parseFloat(val) > 0 && parseFloat(val) <= 70, {
      message: "Weight must be between 0 and 70 lbs",
    }),
  length: z
    .string()
    .min(1, "Length is required")
    .refine((val) => parseFloat(val) > 0 && parseFloat(val) <= 108, {
      message: "Length must be between 0 and 108 inches",
    }),
  width: z
    .string()
    .min(1, "Width is required")
    .refine((val) => parseFloat(val) > 0 && parseFloat(val) <= 108, {
      message: "Width must be between 0 and 108 inches",
    }),
  height: z
    .string()
    .min(1, "Height is required")
    .refine((val) => parseFloat(val) > 0 && parseFloat(val) <= 108, {
      message: "Height must be between 0 and 108 inches",
    }),
});

export type ShipmentDetailsFormData = z.infer<typeof shipmentDetailsSchema>;

export const transformToEasyPost = (data: ShipmentDetailsFormData) => ({
  to_address: {
    name: data.toName,
    street1: data.toStreet,
    street2: data.toStreet2,
    city: data.toCity,
    state: data.toState,
    zip: data.toZipCode,
    country: data.toCountry,
    phone: data.toPhone,
    email: data.toEmail,
  },
  from_address: {
    name: data.fromName,
    street1: data.fromStreet,
    street2: data.fromStreet2,
    city: data.fromCity,
    state: data.fromState,
    zip: data.fromZipCode,
    country: data.fromCountry,
    phone: data.fromPhone,
    email: data.fromEmail,
  },
  parcel: {
    length: data.length,
    width: data.width,
    height: data.height,
    weight: data.weight,
  },
});

export const usStates = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
  { value: "DC", label: "District of Columbia" },
] as const;
