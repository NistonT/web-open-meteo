import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
  name: string;
  icon: ReactNode;
};

export const ButtonChevronDown = ({ setIsOpen, name, isOpen, icon }: Props) => {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-left shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{name}</span>
      </div>
      <ChevronDown size={20} className={`text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
    </button>
  );
};
