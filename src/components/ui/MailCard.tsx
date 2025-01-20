import React from "react";
import mail from "../../../public/mail.png";
import Chip from "./Chip";
import Link from "next/link";

interface MailCardProps {
  id: string;
  title: string;
  tags: string[];
  writer: string;
}

const MailCard: React.FC<MailCardProps> = ({ id, title, tags, writer }) => {
  return (
    <Link href={`/detail/${id}`}>
      <div
        className="w-[300px] h-[200px] bg-[#4caf50] p-3 rounded-lg flex flex-col justify-between text-primary pointer-events-none 
      mt-5"
        style={{
          backgroundImage: `url(${mail.src})`,
        }}
      >
        <h3 className="text-xl font-bold mb-50 text-center">{title}</h3>
        <div
          className="flex flex-row gap-2 justify-start flex-wrap overflow-x-auto"
          id="scrollbar-1"
        >
          {tags.map((tag, index) => (
            <Chip tag={tag} key={index} />
          ))}
        </div>

        <div className="text-center text-xs mt-2 font-bold">{`작성자: ${writer}`}</div>
      </div>
    </Link>
  );
};

export default MailCard;
