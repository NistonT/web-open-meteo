import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type Props = {
  value: string;
  onChange: (range: string) => void;
  setIsOpen: (value: boolean) => void;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  label: string;
};

export const ButtonTimeName = ({ value, onChange, setIsOpen, icon: Icon, label }: Props) => {
  return (
    <button
      key={value}
      type="button"
      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-gray-800 hover:bg-gray-50 focus:bg-gray-100"
      onClick={() => {
        onChange(value);
        setIsOpen(false);
      }}
    >
      <Icon size={16} className="text-gray-500" />
      <span>{label}</span>
    </button>
  );
};
