import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialdocuments } from "@/lib/const";

export interface DocumentsState {
  documents: {
    id: number;
    documentName: string;
    fileName: string;
    lastUpdated: string;
    documentStatus: string;
    documentNo?: string;
    selected: boolean;
  }[];
  isSubmitted: boolean;
}

const initialState: DocumentsState = {
  documents: initialdocuments,
  isSubmitted: false,
};

export const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    toggleDocumentSelection: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.documents = state.documents.map((doc) =>
        doc.id === id ? { ...doc, selected: !doc.selected } : doc
      );
    },
    updateDocumentStatus: (
      state,
      action: PayloadAction<{ id: number; status: string }>
    ) => {
      const { id, status } = action.payload;
      state.documents = state.documents.map((doc) =>
        doc.id === id ? { ...doc, documentStatus: status } : doc
      );
    },
    setSubmitted: (state, action: PayloadAction<boolean>) => {
      state.isSubmitted = action.payload;
    },
    resetDocuments: (state) => {
      state.documents = initialdocuments;
      state.isSubmitted = false;
    },
  },
});

export const {
  toggleDocumentSelection,
  updateDocumentStatus,
  setSubmitted,
  resetDocuments,
} = documentsSlice.actions;

export default documentsSlice.reducer;

// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import { vendorDocuments } from "@/lib/const";

// export interface Document {
//   id: number;
//   documentName: string;
//   fileName: string;
//   lastUpdated: string;
//   documentStatus: string;
//   documentNo?: string;
//   selected: boolean;
// }

// export interface DocumentsState {
//   vendorDocuments: Record<string, Document[]>;
//   isSubmitted: boolean;
// }

// const initialState: DocumentsState = {
//   vendorDocuments: {},
//   isSubmitted: false,
// };

// export const documentsSlice = createSlice({
//   name: "documents",
//   initialState,
//   reducers: {
//     toggleDocumentSelection: (
//       state,
//       action: PayloadAction<{ vendorId: string; documentId: number }>
//     ) => {
//       const { vendorId, documentId } = action.payload;
//       if (state.vendorDocuments[vendorId]) {
//         state.vendorDocuments[vendorId] = state.vendorDocuments[vendorId].map(
//           (doc) =>
//             doc.id === documentId ? { ...doc, selected: !doc.selected } : doc
//         );
//       }
//     },
//     updateDocumentStatus: (
//       state,
//       action: PayloadAction<{
//         vendorId: string;
//         documentId: number;
//         status: string;
//       }>
//     ) => {
//       const { vendorId, documentId, status } = action.payload;
//       if (state.vendorDocuments[vendorId]) {
//         state.vendorDocuments[vendorId] = state.vendorDocuments[vendorId].map(
//           (doc) =>
//             doc.id === documentId ? { ...doc, documentStatus: status } : doc
//         );
//       }
//     },
//     setSubmitted: (state, action: PayloadAction<boolean>) => {
//       state.isSubmitted = action.payload;
//     },
//     resetDocuments: (state) => {
//       state.vendorDocuments = vendorDocuments;
//       state.isSubmitted = false;
//     },
//   },
// });

// export const {
//   toggleDocumentSelection,
//   updateDocumentStatus,
//   setSubmitted,
//   resetDocuments,
// } = documentsSlice.actions;

// export default documentsSlice.reducer;
