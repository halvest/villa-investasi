import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import clsx from "clsx";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next"

// Load Google Font
const dmSans = DM_Sans({ subsets: ["latin"] });

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
  ],
  openGraph: {
    title: "Villa Lodji Svarga 2 | Investasi Properti Yogyakarta",
    description:
      "Villa eksklusif siap huni & dikelola profesional. Harga terjangkau, lokasi strategis, dan income stabil.",
    url: "https://www.haspro.me",
    siteName: "Haspro",
    images: [
      {
        url: "/og.jpg",
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
    images: ["/og.jpg"],
    creator: "@hasproofficial",
  },
  alternates: {
    canonical: "https://www.haspro.me",
  },
};

// Root Layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <meta name="google-site-verification" content="F7BmAIc2TrhpbXx5VJqFRf2rSQvKNekU0AsSxxjG4oA" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={clsx(dmSans.className, "antialiased")}>
        {children}
         <Analytics />
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
