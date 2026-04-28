import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Analytics from "./components/Analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Teton Group - Custom AI Solutions for Your Business",
  description: "Expert AI automation services. We build custom AI solutions to decrease costs and increase efficiency for your business.",
  keywords: "Teton Group, AI automation, custom AI, business AI, AI solutions, business automation",
  openGraph: {
    title: "Teton Group - Custom AI Solutions for Your Business",
    description: "Transform your business with custom AI solutions from Teton Group.",
    type: "website",
    locale: "en_US",
    siteName: "Teton Group",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Ads Conversion Tracking - Global Tag */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17943114805"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17943114805');
              gtag('config', 'AW-18099790158');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}