import { cities } from "@/shared/model/constants/city";
import { SelectHTMLAttributes } from "react";

export const CitySelector = ({ value, onChange, ...props }: SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select value={value} onChange={onChange} {...props}>
      {cities.map((city) => (
        <option key={city.name} value={city.name}>
          {city.name}
        </option>
      ))}
    </select>
  );
};
