// import Footer from "@/components/ui/Footer";
import RQProvider from "@/components/RQProvider";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import AnalyticsWrapper from "./analytics";

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
        <Header />
        <RQProvider>
          <main>{children}</main>
        </RQProvider>
        <Footer />
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
