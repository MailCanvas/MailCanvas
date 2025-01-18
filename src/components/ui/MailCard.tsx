import React from "react";
import mail from "../../../public/mail.png";
import Chip from "./Chip";

interface MailCardProps {
  id: string;
  title: string;
  tags: string[];
  writer: string;
}

const MailCard: React.FC<MailCardProps> = ({ id, title, tags, writer }) => {
  return (
    <div
      className="w-[300px] h-[200px] bg-[#4caf50] p-3 rounded-lg flex flex-col justify-between text-primary
      mt-5"
      style={{
        backgroundImage: `url(${mail.src})`,
        display: "grid",
        gridTemplateRows: "50px 1fr 30px",
      }}
    >
      <h3 className="text-xl font-bold mb-50 " style={{ gridRow: 1 }}>
        {title}
      </h3>
      <div
        className="flex flex-row gap-2 justify-start flex-wrap overflow-x-auto scrollbar-hide"
        style={{ gridRow: 2 }}
      >
        {tags.map((tag, index) => (
          <Chip tag={tag} key={index} />
        ))}
      </div>

      <div
        className="text-right text-xs mt-2 font-bold"
        style={{ gridRow: 3 }}
      >{`작성자: ${writer}`}</div>
    </div>
  );
};

export default MailCard;
