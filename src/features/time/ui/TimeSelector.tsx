import { SelectHTMLAttributes } from "react";

export const TimeSelector = ({ value, onChange, ...props }: SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select value={value} onChange={onChange} {...props}>
      <option value="24h">Последние 24 часа</option>
      <option value="3d">3 дня (среднее по суткам)</option>
      <option value="7d">7 дней (среднее по суткам)</option>
    </select>
  );
};
