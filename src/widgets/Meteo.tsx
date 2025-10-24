import { useGetMeteoQuery } from "@/entities/meteo/api/meteo";
import { TimeSelector } from "@/features/time/ui/TimeSelector";
import { cities } from "@/shared/model/constants/city";
import { ErrorWeather } from "@/shared/ui/error/ErrorWeather";
import { LoaderWeather } from "@/shared/ui/loader/LoaderWeather";
import { WeatherWidget } from "@/widgets/Recharts";
import { Loader, MapPin } from "lucide-react";
import { useState } from "react";

export const Meteo = () => {
  const [range, setRange] = useState<"24h" | "3d" | "7d">("24h");
  const forecastDays = range === "24h" ? 2 : range === "3d" ? 3 : 7;

  const kazan = cities.find((c) => c.name === "Kazan")!;
  const amsterdam = cities.find((c) => c.name === "Amsterdam")!;
  const newYork = cities.find((c) => c.name === "New York")!;

  const kazanQuery = useGetMeteoQuery({
    latitude: kazan.latitude,
    longitude: kazan.longitude,
    forecast_days: forecastDays,
  });

  const amsterdamQuery = useGetMeteoQuery({
    latitude: amsterdam.latitude,
    longitude: amsterdam.longitude,
    forecast_days: forecastDays,
  });

  const newYorkQuery = useGetMeteoQuery({
    latitude: newYork.latitude,
    longitude: newYork.longitude,
    forecast_days: forecastDays,
  });

  const isLoading = kazanQuery.isLoading || amsterdamQuery.isLoading || newYorkQuery.isLoading;
  const hasError = kazanQuery.error || amsterdamQuery.error || newYorkQuery.error;

  if (isLoading) {
    return <LoaderWeather />;
  }

  if (hasError) {
    return <ErrorWeather />;
  }

  const cityConfigs = [
    { name: "Kazan", data: kazanQuery.data, cityObj: kazan },
    { name: "Amsterdam", data: amsterdamQuery.data, cityObj: amsterdam },
    { name: "New York", data: newYorkQuery.data, cityObj: newYork },
  ];

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-center mb-10">
        <div className="w-full max-w-xs">
          <TimeSelector value={range} onChange={(value) => setRange(value as "24h" | "3d" | "7d")} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cityConfigs.map((config) => (
          <div
            key={config.name}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin size={20} className="text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">{config.name}</h2>
              </div>

              {config.data ? (
                <div className="h-64">
                  <WeatherWidget data={config.data} range={range} selectedCity={config.cityObj} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <Loader className="animate-spin text-gray-400 mb-2" size={24} />
                  <span className="text-sm font-medium">Загрузка...</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
