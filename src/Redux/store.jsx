import { configureStore } from "@reduxjs/toolkit";
import shipmentReducer from "./shipments/ShipmentsSlice";

export const store = configureStore({
  reducer: {
    shipmentsData: shipmentReducer,
  },
});

export default store;
