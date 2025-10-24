import { useWeatherChart } from "@/entities/meteo/hook/useWeatherChart";
import { MeteoApiResponse } from "@/entities/meteo/model/meteo";
import { Thermometer } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface WeatherWidgetProps {
  data: MeteoApiResponse | undefined;
  range: "24h" | "3d" | "7d";
  selectedCity: { name: string };
}

export const WeatherWidget = ({ data, range }: WeatherWidgetProps) => {
  const chartData = useWeatherChart(data, range);

  if (chartData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm">
        <Thermometer size={28} className="text-gray-400 dark:text-gray-500 mb-3" />
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Нет данных о погоде</p>
      </div>
    );
  }

  return (
    <div className="w-full h-64 rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis
            dataKey="time"
            angle={range === "24h" ? -45 : 0}
            textAnchor={range === "24h" ? "end" : "middle"}
            height={60}
            tick={{ fontSize: 12, fill: "#6b7280", fontWeight: 500 }}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
          />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fontSize: 12, fill: "#6b7280", fontWeight: 500 }}
            tickLine={false}
            axisLine={false}
            width={36}
            tickMargin={8}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              fontSize: "13px",
              padding: "12px",
            }}
            labelStyle={{ fontWeight: "600", color: "#111827", marginBottom: "4px" }}
            itemStyle={{ color: "#2563eb" }}
            labelFormatter={(label) => {
              if (!label) return "—";

              if (range === "24h") {
                const date = new Date(label);

                if (isNaN(date.getTime())) {
                  return "";
                }
                return date.toLocaleString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }

              return `Дата: ${label}`;
            }}
            formatter={(value) => [`${value}°C`, "Температура"]}
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#2563eb"
            strokeWidth={2.5}
            dot={false}
            activeDot={{
              r: 6,
              stroke: "#2563eb",
              strokeWidth: 2,
              fill: "#fff",
              strokeOpacity: 1,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
