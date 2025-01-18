import React from "react";
import mail from "../../../public/mail.png";

interface MailCardProps {
  id: string;
  title: string;
  tags: string[];
  writer: string;
}

const MailCard: React.FC<MailCardProps> = ({ id, title, tags, writer }) => {
  return (
    <div
      className="w-[300px] h-[200px] bg-[#4caf50] p-3 rounded-lg flex flex-col justify-between text-primary"
      style={{ backgroundImage: `url(${mail.src})` }}
    >
      <h3 className="text-xl font-bold mb-50 ">{title}</h3>
      <div className="flex gap-2 ">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-white text-[#4caf50] px-3 py-1 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="text-right text-xs mt-2 font-bold">{`작성자: ${writer}`}</div>
    </div>
  );
};

export default MailCard;
