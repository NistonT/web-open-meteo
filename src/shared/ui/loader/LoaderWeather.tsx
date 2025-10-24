import { Loader } from "lucide-react";

export const LoaderWeather = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 p-6 text-gray-500">
      <Loader className="animate-spin text-gray-400 mb-3" size={28} />
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Загрузка погоды...</span>
    </div>
  );
};
