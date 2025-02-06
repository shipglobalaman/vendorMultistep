import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { formSchema, orderFormSchema } from "@/zod validation/Schema";
import type * as z from "zod";

type FormData = z.infer<typeof formSchema> &
  z.infer<typeof orderFormSchema> & {
    step: number;
    shippingOption?: {
      id: string;
      name: string;
      price: number;
      transitTime: string;
      hasDuties?: boolean;
      isRecommended?: boolean;
    };
  };

interface AddOrderStore {
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
  setStep: (step: number) => void;
  reset: () => void;
}

const initialState: FormData = {
  step: 1,
  pickupAddress: "",
  shippingFirstName: "",
  shippingLastName: "",
  shippingMobile: "",
  shippingAlternateMobile: "",
  shippingEmail: "",
  shippingCountry: "india",
  shippingAddress1: "",
  shippingLandmark: "",
  shippingAddress2: "",
  shippingPincode: "",
  shippingCity: "",
  shippingState: "",
  sameAsBilling: false,
  billingFirstName: "",
  billingLastName: "",
  billingMobile: "",
  billingAlternateMobile: "",
  billingEmail: "",
  billingCountry: "india",
  billingAddress1: "",
  billingLandmark: "",
  billingAddress2: "",
  billingPincode: "",
  billingCity: "",
  billingState: "",
  shipmentType: "CSB IV",
  actualWeight: "",
  length: "",
  breadth: "",
  height: "",
  invoiceNo: "",
  invoiceDate: "",
  invoiceCurrency: "INR",
  orderId: "",
  iossNumber: "",
  items: [
    {
      productName: "",
      sku: "",
      hsn: "",
      qty: "",
      unitPrice: "",
      igst: "0",
    },
  ],
};

export const useAddOrderStore = create<AddOrderStore>()(
  persist(
    (set) => ({
      formData: initialState,
      setFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),
      setStep: (step) =>
        set((state) => ({ formData: { ...state.formData, step } })),
      reset: () => set({ formData: initialState }),
    }),
    {
      name: "add-order-storage",
    }
  )
);
