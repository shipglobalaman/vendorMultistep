import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { z } from "zod";
import type {
  formSchema,
  orderFormSchema,
  consignorSchema,
} from "@/zod validation/Schema";

type FormData = z.infer<typeof formSchema> &
  z.infer<typeof consignorSchema> &
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
type OrderFormData = z.infer<typeof orderFormSchema>;

interface OrderState extends FormData, OrderFormData {
  step: number;
  activeSection: string;
  activeStep: number;
}

const initialState: OrderState = {
  step: 1,
  activeSection: "consignor",
  activeStep: 0,
  pickupAddress: "",
  shippingFirstName: "",
  shippingLastName: "",
  shippingMobile: "",
  shippingAlternateMobile: "",
  shippingEmail: "",
  shippingCountry: "",
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
  billingAddress1: "",
  billingLandmark: "",
  billingAddress2: "",
  billingPincode: "",
  billingCity: "",
  billingCountry: "",
  billingState: "",
  shipmentType: "CSB IV",
  actualWeight: "",
  length: "",
  breadth: "",
  height: "",
  invoiceNo: "",
  invoiceDate: "",
  invoiceCurrency: "",
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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<OrderState>>) => {
      return { ...state, ...action.payload };
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const {
  setFormData,
  setStep,
  setActiveSection,
  setActiveStep,
  resetForm,
} = orderSlice.actions;
export default orderSlice.reducer;
