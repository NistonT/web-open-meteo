import { MeteoApiResponse } from "@/entities/meteo/model/meteo";
import { useMemo } from "react";

type Range = "24h" | "3d" | "7d";

export const useWeatherChart = (data: MeteoApiResponse | undefined, range: Range) => {
  return useMemo(() => {
    if (!data?.hourly?.time || !data.hourly.temperature_2m) return [];

    const now = new Date();
    let timePoints = data.hourly.time as string[];
    let temps = data.hourly.temperature_2m as (number | null)[];

    const len = Math.min(timePoints.length, temps.length);
    if (len === 0) return [];

    if (range === "24h") {
      const cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const cutoffIndex = timePoints.findIndex((t) => new Date(t) >= cutoff);
      const startIndex = cutoffIndex > 0 ? cutoffIndex : 0;
      timePoints = timePoints.slice(startIndex, len);
      temps = temps.slice(startIndex, len);
    }

    const isValidTemp = (val: unknown): val is number => typeof val === "number" && !isNaN(val);

    if (range !== "24h") {
      const dayMap: Record<string, { sum: number; count: number }> = {};
      for (let i = 0; i < timePoints.length; i++) {
        const t = timePoints[i];
        const temp = temps[i];
        if (!isValidTemp(temp)) continue;

        const date = new Date(t);
        if (isNaN(date.getTime())) continue;

        const dateKey = t.split("T")[0];
        if (!dayMap[dateKey]) dayMap[dateKey] = { sum: 0, count: 0 };
        dayMap[dateKey].sum += temp;
        dayMap[dateKey].count += 1;
      }

      return Object.entries(dayMap)
        .map(([date, { sum, count }]) => ({
          time: date,
          temperature: parseFloat((sum / count).toFixed(1)),
        }))
        .slice(0, range === "3d" ? 3 : 7);
    }

    const result = [];
    for (let i = 0; i < timePoints.length; i++) {
      const t = timePoints[i];
      const temp = temps[i];
      if (!isValidTemp(temp)) continue;

      const date = new Date(t);
      if (isNaN(date.getTime())) continue;

      result.push({
        time: date.toLocaleString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
        temperature: temp,
      });
    }

    return result;
  }, [data, range]);
};
