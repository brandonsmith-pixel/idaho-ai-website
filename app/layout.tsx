import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Idaho AI - Custom AI Solutions for Idaho Businesses",
  description: "Local AI automation services in Idaho. We build custom AI solutions to decrease costs and increase efficiency for your business.",
  keywords: "Idaho AI, AI automation, custom AI, Idaho business, AI solutions, business automation",
  openGraph: {
    title: "Idaho AI - Custom AI Solutions for Idaho Businesses",
    description: "Local AI automation services in Idaho. Transform your business with custom AI.",
    type: "website",
    locale: "en_US",
    siteName: "Idaho AI",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}