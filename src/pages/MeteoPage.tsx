import { useGetMeteoQuery } from "@/entities/meteo/api/meteo";
import { CitySelector } from "@/features/city/ui/CitySelector";
import { TimeSelector } from "@/features/time/ui/TimeSelector";
import { cities } from "@/shared/model/constants/city";
import { MeteoWidget } from "@/widgets/Recharts";
import { useState } from "react";

export const MeteoPage = () => {
  const [range, setRange] = useState<"24h" | "3d" | "7d">("24h");
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  const forecastDays = range === "24h" ? 2 : range === "3d" ? 3 : 7;
  const { data, isLoading, error } = useGetMeteoQuery({
    latitude: selectedCity.latitude,
    longitude: selectedCity.longitude,
    forecast_days: forecastDays,
  });

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки данных</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2>Погода: {selectedCity.name}</h2>

      <div style={{ marginBottom: "16px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <CitySelector
          value={selectedCity.name}
          onChange={(e) => {
            const city = cities.find((c) => c.name === e.target.value);
            if (city) setSelectedCity(city);
          }}
        />
        <TimeSelector value={range} onChange={(e) => setRange(e.target.value as "24h" | "3d" | "7d")} />
      </div>

      <MeteoWidget data={data} range={range} selectedCity={selectedCity} />
    </div>
  );
};
