import type { Metadata } from "next";
import "./globals.css";
import "./header.css";
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
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
