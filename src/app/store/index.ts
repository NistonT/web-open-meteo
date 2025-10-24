import { meteoApi } from "@/entities/meteo/api/meteo";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [meteoApi.reducerPath]: meteoApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(meteoApi.middleware),
});

export type RooState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
