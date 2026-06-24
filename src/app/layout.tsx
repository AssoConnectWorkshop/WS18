import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${nunito.className}`}>{children}</body>
    </html>
  );
}
