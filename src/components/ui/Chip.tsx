import React from "react";
import Link from "next/link";

interface ChipProps {
  tag: string;
  useLink: boolean;
}

const Chip: React.FC<ChipProps> = ({ tag, useLink }) => {
  const chipContent = (
    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 h-[25px] leading-[25px]">
      {tag}
    </span>
  );

  return (
    <>
      {useLink ? (
        <Link href={{ pathname: "/", query: { tag } }}>{chipContent}</Link>
      ) : (
        chipContent
      )}
    </>
  );
};

export default Chip;
