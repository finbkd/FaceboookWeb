import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    auth,
  },
});
