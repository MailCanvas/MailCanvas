import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import RQProvider from "@/components/RQProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MailCanvas",
  description: "Mail to professor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RQProvider>
          <Nav />
          <main className="mx-[60px]">{children}</main>
          <Footer />
        </RQProvider>
      </body>
    </html>
  );
}
