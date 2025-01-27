import Image from "next/image";
import Link from "next/link";
import MAIL_IMG from "../../../public/mail.png";
export default function Header() {
  return (
    <div className="w-full p-4 shadow text-4xl bg-gradient-to-t from-green-300 to-purple-300 text-center text-slate-100 font-extrabold">
      <a href="/" className="flex justify-center gap-3">
        <Image src={MAIL_IMG} alt="logo" height={30} /> MailCanvas
      </a>
    </div>
  );
}
