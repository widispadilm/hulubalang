import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PT Putra Seganti Setungguan — TMS Hulubalang",
  description: "Jasa ekspedisi kendaraan darat & laut ke seluruh Indonesia — Self Drive & Tow Car",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#fcfbf7] text-[#171717]">
        {children}
      </body>
    </html>
  );
}
