import { baseUrl } from "@/shared/model/constants/api";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { MeteoApiResponse } from "../model/meteo";

export const meteoApi = createApi({
  reducerPath: "meteoApi",
  tagTypes: ["Meteo"],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getMeteo: build.query<MeteoApiResponse, { latitude: number; longitude: number; forecast_days: number }>({
      query: ({ latitude, longitude, forecast_days = 7 }) => ({
        url: "/forecast",
        params: {
          latitude,
          longitude,
          hourly: "temperature_2m",
          forecast_days,
        },
      }),
    }),
  }),
});

export const { useGetMeteoQuery } = meteoApi;
