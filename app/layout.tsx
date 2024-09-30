import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "AccessiScan",
  description: "Making accessible possible", // WHEN WE HAVE SOMETHING, REPLACE
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen min-w-screen flex flex-col items-center">
        <Header />
        {children}
      </body>
    </html>
  );
}
