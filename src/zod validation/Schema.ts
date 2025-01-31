import * as z from "zod";

export const formSchema = z.object({
  pickupAddress: z.string().min(1, "Please select a pickup address"),
  shippingFirstName: z.string().min(1, "First name is required"),
  shippingLastName: z.string().min(1, "Last name is required"),
  shippingMobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits"),
  shippingAlternateMobile: z.string().optional(),
  shippingEmail: z.string().email("Invalid email address"),
  shippingCountry: z.string().min(1, "Country is required"),
  shippingAddress1: z.string().min(1, "Address 1 is required"),
  shippingLandmark: z.string().optional(),
  shippingAddress2: z.string().min(1, "Address 2 is required"),
  shippingPincode: z.string().min(6, "Pincode must be at least 6 digits"),
  shippingCity: z.string().min(1, "City is required"),
  shippingState: z.string().min(1, "State is required"),
  sameAsBilling: z.boolean().default(false),
  billingFirstName: z.string().min(1, "First name is required"),
  billingLastName: z.string().min(1, "Last name is required"),
  billingMobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  billingAlternateMobile: z.string().optional(),
  billingEmail: z.string().email("Invalid email address"),
  billingCountry: z.string().min(1, "Country is required"),
  billingAddress1: z.string().min(1, "Address 1 is required"),
  billingLandmark: z.string().optional(),
  billingAddress2: z.string().min(1, "Address 2 is required"),
  billingPincode: z.string().min(6, "Pincode must be at least 6 digits"),
  billingCity: z.string().min(1, "City is required"),
  billingState: z.string().min(1, "State is required"),
});
