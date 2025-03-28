import * as z from "zod";

export const consignorSchema = z.object({
  pickupAddress: z.string().min(1, "Please select a pickup address"),
});
export const formSchema = z.object({
  shippingFirstName: z.string().min(1, "First name is required"),
  shippingLastName: z.string().min(1, "Last name is required"),
  shippingMobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  shippingAlternateMobile: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{10}$/.test(val), {
      message: "Alternate mobile number must be exactly 10 digits",
    }),
  shippingEmail: z.string().email("Invalid email address"),
  shippingCountry: z.object({
    value: z.string().min(1, "Country code is required"),
    label: z.string().min(1, "Country name is required"),
  }),
  shippingAddress1: z.string().min(1, "Address 1 is required"),
  shippingLandmark: z.string().optional(),
  shippingAddress2: z.string().min(1, "Address 2 is required"),
  shippingPincode: z.string().min(1, "Pincode is required"),
  shippingCity: z.string().min(1, "City is required"),
  shippingState: z.string().min(1, "State is required"),
  sameAsBilling: z.boolean().default(false),
  billingFirstName: z.string().min(1, "First name is required"),
  billingLastName: z.string().min(1, "Last name is required"),
  billingMobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  billingAlternateMobile: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{10}$/.test(val), {
      message: "Alternate mobile number must be exactly 10 digits",
    }),
  billingEmail: z.string().email("Invalid email address"),
  billingCountry: z.object({
    value: z.string().min(1, "Country code is required"),
    label: z.string().min(1, "Country name is required"),
  }),
  billingAddress1: z.string().min(1, "Address 1 is required"),
  billingLandmark: z.string().optional(),
  billingAddress2: z.string().min(1, "Address 2 is required"),
  billingPincode: z.string().min(1, "Pincode is required"),
  billingCity: z.string().min(1, "City is required"),
  billingState: z.string().min(1, "State is required"),
});

export const itemSchema = z.object({
  productName: z.string().min(1, { message: "Product name is required" }),
  sku: z.string().optional(),
  hsn: z
    .string()
    .min(1, { message: "HSN is required" })
    .regex(/^\d{8}$/, "HSN must be of 8 digits"),
  qty: z
    .string()
    .min(1, { message: "Quantity is required" })
    .regex(/^\d+(\.\d+)?$/, "Quantity must be a valid number")
    .refine((val) => parseFloat(val) > 0, {
      message: "Quantity must not be zero",
    }),

  unitPrice: z
    .string()
    .min(1, { message: "Unit price is required" })
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Unit price must be a valid number with up to two decimal places"
    )
    .refine((val) => parseFloat(val) > 0, {
      message: "Unit price must not be zero",
    }),

  igst: z
    .string()
    .min(1, { message: "IGST is required" })
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "IGST must be a valid percentage or number with up to two decimal places"
    ),
});

export const orderFormSchema = z.object({
  shipmentType: z.enum(["CSB IV", "CSB V"]),

  actualWeight: z
    .string()
    .min(1, { message: "Actual weight is required" })
    .regex(/^\d+(\.\d+)?$/, { message: "Weight must be a valid number" })
    .refine((val) => parseFloat(val) <= 300, {
      message: "Weight must be not more than 300",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "Weight must be atleast 0.01 KG",
    }),
  length: z
    .string()
    .min(1, { message: "Length is required" })
    .regex(/^\d+(\.\d+)?$/, { message: "Length must be a valid number" })
    .refine((val) => parseFloat(val) <= 120, {
      message: "Length must be not more than 120",
    })
    .refine((val) => parseFloat(val) >= 1, {
      message: "Length must be atleast 1 cm",
    }),
  breadth: z
    .string()
    .min(1, { message: "Breadth is required" })
    .regex(/^\d+(\.\d+)?$/, { message: "Breadth must be a valid number" })
    .refine((val) => parseFloat(val) <= 120, {
      message: "Breadth must be not more than 120",
    })
    .refine((val) => parseFloat(val) >= 1, {
      message: "Breadth must be atleast 1 cm",
    }),
  height: z
    .string()
    .min(1, { message: "Height is required" })
    .regex(/^\d+(\.\d+)?$/, { message: "Height must be a valid number" })
    .refine((val) => parseFloat(val) <= 120, {
      message: "Height must be not more than 120",
    })
    .refine((val) => parseFloat(val) >= 1, {
      message: "Height must be atleast 1 cm",
    }),
  invoiceNo: z
    .string()
    .min(1, { message: "Invoice number is required" })
    .regex(/^[A-Za-z0-9]+$/, "Invoice number must be alphanumeric"),
  invoiceDate: z.date({ required_error: "Invoice date is required" }),
  invoiceCurrency: z
    .string()
    .min(1, { message: "Invoice currency is required" })
    .regex(
      /^[A-Za-z]{3}$/,
      "Invoice currency must be a 3-letter currency code"
    ),
  orderId: z.string(),
  iossNumber: z.string().optional(),
  items: z
    .array(itemSchema)
    .min(1, { message: "At least one item is required" }),
});
