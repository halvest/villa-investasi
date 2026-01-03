import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import clsx from "clsx";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

// Load Google Font
const dmSans = DM_Sans({ subsets: ["latin"], display: "swap" });

// --- 1. SETUP VIEWPORT (Next.js 14+ Best Practice) ---
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

// --- 2. SEO METADATA ---
export const metadata: Metadata = {
  metadataBase: new URL("https://www.haspro.me"),
  title: "Villa Lodjisvarga Seturan | Investasi Properti di Yogyakarta",
  description:
    "Miliki villa fully furnished di jantung kota Yogyakarta mulai Rp390 juta. Dapatkan passive income hingga Rp6 juta/bulan & ROI cepat dalam 5 tahun.",
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
    "investasi properti 390 juta jogja",
    "properti di seturan yogyakarta",
    "properti haspro jogja",
    "villa siap huni jogja",
    "villa syariah jogja",
    "peluang investasi properti jogja",
  ],

  verification: {
    google: "F7BmAIc2TrhpbXx5VJqFRf2rSQvKNekU0AsSxxjG4oA",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Villa Lodjisvarga Seturan | Investasi Properti Yogyakarta",
    description:
      "Villa eksklusif siap huni & dikelola profesional. Harga terjangkau, lokasi strategis, dan income stabil.",
    url: "https://www.haspro.me",
    siteName: "Haspro",
    images: [
      {
        url: "https://www.haspro.me/og.jpg",
        width: 1200,
        height: 630,
        alt: "Villa Lodjisvarga Seturan Yogyakarta - Investasi Properti Strategis",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Villa Lodjisvarga Seturan Yogyakarta - Investasi Properti Strategis",
    description:
      "Villa eksklusif dengan ROI cepat & passive income hingga Rp6 juta/bulan. Harga mulai Rp390 juta.",
    images: ["https://www.haspro.me/og.jpg"],
    creator: "@hasproofficial",
  },
  alternates: {
    canonical: "https://www.haspro.me",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ID Pixel (Backup)
  const PIXEL_ID = "750363290827556";
  // ID GTM
  const GTM_ID = "GTM-WT79LLNQ";

  return (
    <html lang="id">
      <body className={clsx(dmSans.className, "antialiased")}>
        {/* --- 1. GOOGLE TAG MANAGER (HEAD SCRIPT) --- */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />

        {/* --- 2. GOOGLE TAG MANAGER (BODY NOSCRIPT) --- */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* --- 3. META PIXEL SCRIPT (BACKUP) --- */}
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* --- 4. MICROSOFT CLARITY (HEATMAP) --- */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "uvr74fo44y");
            `,
          }}
        />

        {children}
        <Analytics />
        <Toaster position="top-center" reverseOrder={false} />
        <WhatsAppButton />

        {/* --- META PIXEL NOSCRIPT --- */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
            alt="Meta Pixel"
          />
        </noscript>
      </body>
    </html>
  );
}
