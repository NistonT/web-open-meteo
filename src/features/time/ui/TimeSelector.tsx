import { time } from "@/shared/model/constants/time";
import { ButtonChevronDown } from "@/shared/ui/button/ButtonChevronDown";
import { ButtonTimeName } from "@/shared/ui/button/ButtonTimeName";
import { useState } from "react";

interface TimeSelectorProps {
  value: string;
  onChange: (range: string) => void;
}

export const TimeSelector = ({ value, onChange }: TimeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = time.find((opt) => opt.value === value) || time[0];

  return (
    <div className="relative w-full max-w-xs">
      <ButtonChevronDown
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        name={selectedOption.label}
        icon={<selectedOption.icon size={16} className="text-gray-500" />}
      />

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          {time.map((option) => {
            const Icon = option.icon;
            return <ButtonTimeName value={option.value} onChange={onChange} setIsOpen={setIsOpen} icon={Icon} label={option.label} />;
          })}
        </div>
      )}
    </div>
  );
};
