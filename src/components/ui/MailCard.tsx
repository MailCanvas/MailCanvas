import React from "react";
// import mail from "../../../public/mail.png";
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
      <div className="w-[350px] aspect-video bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl overflow-hidden border border-gray-200">
        <div className="h-full flex flex-col relative">
          {/* Top Section with Title */}
          <div className="absolute top-0 w-full h-full bg-gradient-to-b from-gray-100 to-gray-50 [clip-path:polygon(50%_50%,_100%_0,_0_0)]">
            <div className="p-2 text-center">
              <h3 className="font-semibold text-gray-800 line-clamp-2 z-10">
                {title}
              </h3>
            </div>
          </div>

          {/* Center Seal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-gradient-to-br from-rose-400 to-rose-600 text-white w-14 aspect-square rounded-full flex items-center justify-center text-xs font-bold border-4 border-rose-700/30 shadow-lg transform hover:scale-105 transition-transform">
              <span className="text-center leading-tight">Mail Canvas</span>
            </div>
          </div>

          {/* Bottom Section with Writer */}
          <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-gray-100 to-gray-50 [clip-path:polygon(50%_50%,_100%_100%,_0_100%)]">
            <div className="absolute bottom-3 w-full text-center">
              <span className="text-sm text-gray-600 font-medium bg-white/50 px-3 py-1 rounded-full">
                {`작성자: ${writer}`}
              </span>
            </div>
          </div>

          {/* Tags Container with Scroll */}
          <div className="absolute top-10 left-0 w-full p-3 z-20">
            <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto scrollbar-hide">
              {tags.map((tag, index) => (
                <Chip key={index} tag={tag} useLink={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MailCard;
