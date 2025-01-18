import React from "react";

interface ChipProps {
  tag: string;
}

const Chip: React.FC<ChipProps> = ({ tag }) => {
  return (
    <span
      className="bg-white text-[#4caf50] border-2 border-[#4caf50] rounded-full px-3 py-1
     text-sm hover:bg-[#6fbf73] hover:text-white transition-colors duration-300 h-[25px] w-auto items-center justify-center"
    >
      {tag}
    </span>
  );
};

export default Chip;
