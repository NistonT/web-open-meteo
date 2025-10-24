import { AlertCircle } from "lucide-react";

export const ErrorWeather = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 p-6 text-red-500">
      <AlertCircle className="mb-3 text-red-500" size={28} />
      <span className="text-sm font-medium text-center max-w-xs">Не удалось загрузить данные о погоде</span>
    </div>
  );
};
