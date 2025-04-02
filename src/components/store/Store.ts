import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import orderReducer from "./OrderSlice";
import documentsReducer from "./DocumentSlice";
import kycReducer from "./KycSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  order: orderReducer,
  documents: documentsReducer,
  kyc: kycReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
