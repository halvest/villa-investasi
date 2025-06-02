'use client';

import { useEffect } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

export const LocationDetail = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Place",
      "name": "Villa Lodji Svarga 2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jl. Magersari No.8, Seturan",
        "addressLocality": "Sleman",
        "addressRegion": "DI Yogyakarta",
        "postalCode": "55281",
        "addressCountry": "ID"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -7.7743397,
        "longitude": 110.4054239
      }
    });
    document.head.appendChild(script);
  }, []);

  return (
    <section
      id="lokasi"
      className="bg-[#445B47] text-white py-20"
      aria-labelledby="lokasi-heading"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="flex justify-center items-center mb-4">
            <MapPin size={36} className="text-yellow-400" aria-hidden="true" />
          </div>
          <h2
            id="lokasi-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight drop-shadow"
          >
            Lokasi Strategis <span className="text-yellow-400">Villa Lodji Svarga 2</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto text-white/90 font-light drop-shadow-sm leading-relaxed">
            📍 <strong>Investasi Properti Premium di Jantung Yogyakarta</strong>
            <br />
            Terletak di{' '}
            <span className="underline underline-offset-2 decoration-yellow-400/60">
              Jl. Magersari No.8, Seturan – Sleman, Yogyakarta
            </span>
            , Villa Lodji Svarga 2 menawarkan akses cepat ke kampus, pusat perbelanjaan, dan ikon kota – menjadikannya pilihan unggul untuk passive income dan pertumbuhan aset.
          </p>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* List */}
          <div className="space-y-6">
            <ul className="list-disc list-inside text-yellow-400 font-semibold text-base sm:text-lg space-y-2">
              <li>2 menit ke UPN Veteran Yogyakarta</li>
              <li>5 menit ke Ambarukmo Plaza (Amplaz)</li>
              <li>8 menit ke Pakuwon Mall Yogyakarta</li>
              <li>10 menit ke Universitas Gadjah Mada (UGM)</li>
              <li>18 menit ke Tugu Jogja</li>
              <li>20 menit ke Stasiun Tugu Yogyakarta</li>
              <li>25 menit ke Malioboro & Titik Nol Kilometer</li>
            </ul>
            <p className="text-white/90 font-light drop-shadow-sm leading-relaxed text-sm sm:text-base">
              🎯 Berada di pusat area pertumbuhan Yogyakarta, dikelilingi pusat kuliner, kampus unggulan, dan fasilitas publik utama. Cocok untuk hunian harian, bulanan, maupun jangka panjang.
            </p>
          </div>

          {/* Map + Button */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-3xl shadow-2xl ring-2 ring-yellow-400/30 aspect-[4/3]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1043.6202478347807!2d110.40542392847621!3d-7.774339670734995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59005e3edcb7%3A0x50ef67788e5e207e!2sLodjisvarga%202!5e1!3m2!1sid!2sid!4v1748873264096!5m2!1sid!2sid"
                title="Peta lokasi Villa Lodji Svarga 2 di Seturan Sleman, Yogyakarta"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="text-center">
              <a
                href="https://www.google.com/maps/place/Lodjisvarga+2/@-7.77434,110.40542,19z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-yellow-400 text-[#445B47] font-semibold hover:bg-yellow-300 transition shadow-md"
              >
                <ExternalLink size={18} />
                Buka di Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <p className="text-center max-w-4xl mx-auto mt-16 text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed font-light drop-shadow-sm">
          <strong className="text-yellow-400">Villa Lodji Svarga 2</strong> terletak di lokasi emas dengan potensi okupansi tinggi dan ROI menarik. Pilihan ideal untuk investor properti yang mencari{' '}
          <strong className="text-yellow-400">income pasif dan nilai aset jangka panjang</strong>.
        </p>
      </div>
    </section>
  );
};
