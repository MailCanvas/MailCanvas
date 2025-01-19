import Footer from "@/components/ui/Footer";
import RQProvider from "@/components/RQProvider";
import type { Metadata } from "next";
import "./globals.css";

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
          <main>{children}</main>
        </RQProvider>
      </body>
    </html>
  );
}
