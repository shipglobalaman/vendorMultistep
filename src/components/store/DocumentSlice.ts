import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialdocuments } from "@/lib/const";

export interface Document {
  id: number;
  documentName: string;
  fileName: string;
  lastUpdated: string;
  documentStatus: string;
  selected: boolean;
  documentNo?: string;
}

export interface VendorDocuments {
  [vendorId: string]: Document[];
}

export interface DocumentsState {
  documents: {
    [customerId: string]: Document[];
  };
  isSubmitted: boolean;
  currentCustomerId: string | null;
}

const initialState: DocumentsState = {
  documents: initialdocuments,
  isSubmitted: false,
  currentCustomerId: null,
};

export const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    toggleDocumentSelection: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const customerId = state.currentCustomerId;

      if (customerId && state.documents[customerId]) {
        state.documents[customerId] = state.documents[customerId].map((doc) =>
          doc.id === id ? { ...doc, selected: !doc.selected } : doc
        );
      }
    },
    updateDocumentStatus: (
      state,
      action: PayloadAction<{ id: number; status: string; customerId?: string }>
    ) => {
      const {
        id,
        status,
        customerId = state.currentCustomerId,
      } = action.payload;

      if (customerId && state.documents[customerId]) {
        state.documents[customerId] = state.documents[customerId].map((doc) =>
          doc.id === id ? { ...doc, documentStatus: status } : doc
        );
      }
    },
    setSubmitted: (state, action: PayloadAction<boolean>) => {
      state.isSubmitted = action.payload;
    },
    setCurrentCustomerId: (state, action: PayloadAction<string>) => {
      state.currentCustomerId = action.payload;
      state.isSubmitted = false;
    },
  },
});

export const {
  toggleDocumentSelection,
  updateDocumentStatus,
  setSubmitted,
  setCurrentCustomerId,
} = documentsSlice.actions;

export default documentsSlice.reducer;
