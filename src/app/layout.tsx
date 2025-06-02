import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import clsx from "clsx";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";

// Load Google Font
const dmSans = DM_Sans({ subsets: ["latin"], display: "swap" });

// SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://www.haspro.me"),
  title: "Villa Lodji Svarga 2 | Investasi Properti di Yogyakarta",
  description:
    "Miliki villa fully furnished di jantung kota Yogyakarta mulai Rp375 juta. Dapatkan passive income hingga Rp6 juta/bulan & ROI cepat dalam 5 tahun.",
  keywords: [
    "villa dijual yogyakarta",
    "investasi properti seturan",
    "passive income properti",
    "villa murah jogja",
    "villa dekat UPN",
    "haspro villa yogyakarta",
    "investasi villa jogja",
    "villa fully furnished jogja",
    "villa ROI tinggi yogyakarta",
    "villa strategis dekat kampus jogja",
    "villa untuk disewakan di jogja",
    "villa cashflow positif jogja",
    "villa disewakan harian jogja",
    "investasi properti yogyakarta murah",
    "villa eksklusif yogyakarta",
    "beli villa di sleman",
    "villa dekat kampus di yogyakarta",
    "villa untuk passive income di jogja",
    "properti investasi dekat UGM",
    "proyek villa jogja 2025",
    "unit villa baru di jogja",
    "villa dengan kolam renang di jogja",
    "villa modern minimalis jogja",
    "villa dijual dekat pusat kota jogja",
    "investasi properti 375 juta jogja",
    "properti di seturan yogyakarta",
    "properti haspro jogja",
    "villa siap huni jogja",
    "villa syariah jogja",
    "peluang investasi properti jogja",
    ],
  openGraph: {
    title: "Villa Lodji Svarga 2 | Investasi Properti Yogyakarta",
    description:
      "Villa eksklusif siap huni & dikelola profesional. Harga terjangkau, lokasi strategis, dan income stabil.",
    url: "https://www.haspro.me",
    siteName: "Haspro",
    images: [
      {
        url: "https://www.haspro.me/og.jpg",
        width: 1200,
        height: 630,
        alt: "Villa Lodji Svarga 2",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Villa Lodji Svarga 2 - Properti Strategis Yogyakarta",
    description:
      "Villa eksklusif dengan ROI cepat & passive income hingga Rp6 juta/bulan. Harga mulai Rp375 juta.",
    images: ["https://www.haspro.me/og.jpg"],
    creator: "@hasproofficial",
  },
  alternates: {
    canonical: "https://www.haspro.me",
  },
};

// Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta
          name="google-site-verification"
          content="F7BmAIc2TrhpbXx5VJqFRf2rSQvKNekU0AsSxxjG4oA"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={clsx(dmSans.className, "antialiased")}>
        {children}
        <Analytics />
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
