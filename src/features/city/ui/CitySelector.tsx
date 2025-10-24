import { cities } from "@/shared/model/constants/city";
import { ButtonChevronDown } from "@/shared/ui/button/ButtonChevronDown";
import { ButtonCityName } from "@/shared/ui/button/ButtonCityName";
import { MapPin } from "lucide-react";
import { useState } from "react";

interface CitySelectorProps {
  value: string;
  onChange: (cityName: string) => void;
}

export const CitySelector = ({ value, onChange }: CitySelectorProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectedCity = cities.find((c) => c.name === value) || cities[0];

  return (
    <div className="relative w-full max-w-xs">
      <ButtonChevronDown setIsOpen={setIsOpen} isOpen={isOpen} icon={<MapPin size={16} className="text-gray-500" />} name={selectedCity.name} />

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          {cities.map((city) => (
            <ButtonCityName name={city.name} onChange={onChange} setIsOpen={setIsOpen} />
          ))}
        </div>
      )}
    </div>
  );
};
