import { Calendar, Clock, TrendingUp } from "lucide-react";

export const time = [
  { value: "24h", label: "Последние 24 часа", icon: Clock },
  { value: "3d", label: "3 дня (среднее по суткам)", icon: Calendar },
  { value: "7d", label: "7 дней (среднее по суткам)", icon: TrendingUp },
];
