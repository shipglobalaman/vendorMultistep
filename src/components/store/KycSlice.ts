import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { kycData } from "@/lib/const";

interface KycState {
  records: {
    id: string;
    firstName: string;
    lastName: string;
    completionDate: string;
    doneByEmail: string;
    doneByPhone: string;
    kycStatus: string;
    csbStatus: string;
    lastVerificationDate: string;
    verifiedBy: string;
  }[];
  currentCustomerId: string | null;
}

const initialState: KycState = {
  records: kycData,
  currentCustomerId: "566",
};

export const kycSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {
    updateCsbStatus: (
      state,
      action: PayloadAction<{ id: string; status: string }>
    ) => {
      const { id, status } = action.payload;
      state.records = state.records.map((record) =>
        record.id === id ? { ...record, csbStatus: status } : record
      );
    },
    setCurrentCustomerId: (state, action: PayloadAction<string>) => {
      state.currentCustomerId = action.payload;
    },

    updateKycStatus: (state) => {
      if (state.currentCustomerId) {
        state.records = state.records.map((record) =>
          record.id === state.currentCustomerId
            ? {
                ...record,
                kycStatus: "Done",
                lastVerificationDate: new Date().toISOString().split("T")[0],
              }
            : record
        );
      }
    },
    resetKycData: (state) => {
      state.records = kycData;
    },
  },
});

export const {
  updateKycStatus,
  updateCsbStatus,
  setCurrentCustomerId,
  resetKycData,
} = kycSlice.actions;

export default kycSlice.reducer;
