// src/widgets/WeatherChartWidget/ui/WeatherChartWidget.tsx
import { MeteoData } from "@/entities/meteo/model/meteo";
import { City } from "@/shared/model/types/city";
import { useMemo } from "react";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface WeatherChartWidgetProps {
  data: MeteoData | undefined;
  range: "24h" | "3d" | "7d";
  selectedCity: City;
}

export const WeatherChartWidget = ({ data, range }: WeatherChartWidgetProps) => {
  const chartData = useMemo(() => {
    if (!data?.hourly?.time || !data.hourly.temperature_2m) return [];

    const now = new Date();
    let timePoints = data.hourly.time as string[];
    let temps = data.hourly.temperature_2m as number[];

    if (range === "24h") {
      const cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const cutoffIndex = timePoints.findIndex((t) => new Date(t) >= cutoff);
      if (cutoffIndex > 0) {
        timePoints = timePoints.slice(cutoffIndex);
        temps = temps.slice(cutoffIndex);
      }
    }

    if (range !== "24h") {
      const dayMap: Record<string, { sum: number; count: number }> = {};
      timePoints.forEach((t, i) => {
        const dateKey = t.split("T")[0];
        if (!dayMap[dateKey]) dayMap[dateKey] = { sum: 0, count: 0 };
        dayMap[dateKey].sum += temps[i];
        dayMap[dateKey].count += 1;
      });

      return Object.entries(dayMap).map(([date, { sum, count }]) => ({
        time: date,
        temperature: parseFloat((sum / count).toFixed(1)),
      }));
    }

    return timePoints.map((t, i) => ({
      time: new Date(t).toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      temperature: temps[i],
      fullDate: new Date(t),
    }));
  }, [data, range]);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <XAxis dataKey="time" angle={range === "24h" ? -45 : 0} textAnchor={range === "24h" ? "end" : "middle"} height={60} />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip
            labelFormatter={(label, payload) => {
              if (range === "24h") {
                return payload[0]?.payload?.fullDate?.toLocaleString("ru-RU") || label;
              }
              return `Дата: ${label}`;
            }}
            formatter={(value) => [`${value} °C`, "Температура"]}
          />
          <Legend />
          <Line type="monotone" dataKey="temperature" name="Температура" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
