import { MapPin } from "lucide-react";

type Props = {
  name: string;
  onChange: (cityName: string) => void;
  setIsOpen: (value: boolean) => void;
};

export const ButtonCityName = ({ name, onChange, setIsOpen }: Props) => {
  return (
    <button
      key={name}
      type="button"
      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-gray-800 hover:bg-gray-50 focus:bg-gray-100"
      onClick={() => {
        onChange(name);
        setIsOpen(false);
      }}
    >
      <MapPin size={16} className="text-gray-500" />
      <span>{name}</span>
    </button>
  );
};
