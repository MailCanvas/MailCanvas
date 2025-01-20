import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full p-4 shadow text-4xl bg-green-300 text-center text-slate-900 font-extrabold">
      <Link href="/"> MailCanvas</Link>
    </div>
  );
}
