'use client';

import { MapPin } from 'lucide-react';

export const LocationDetail = () => {
  return (
    <section
      id="lokasi"
      className="bg-[#445B47] text-white py-20"
      aria-labelledby="lokasi-heading"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <header className="text-center mb-16">
          <div className="flex justify-center items-center mb-4">
            <MapPin size={36} className="text-yellow-400" aria-hidden="true" />
          </div>
          <h2
            id="lokasi-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight drop-shadow"
          >
            Lokasi <span className="text-yellow-400">Villa Lodji Svarga 2</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto text-white/90 font-light drop-shadow-sm leading-relaxed">
            📍 <strong>Lokasi Super Strategis di Jantung Jogja</strong>
            <br />
            Beralamat di{' '}
            <span className="underline underline-offset-2 decoration-yellow-400/60">
              Jl. Magersari No.8, Seturan – Sleman, Yogyakarta
            </span>
            , hanya beberapa menit dari titik-titik penting kota.
          </p>
        </header>

        {/* Grid: List + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Location List */}
          <div className="space-y-6">
            <ul className="list-disc list-inside text-yellow-400 font-semibold text-base sm:text-lg space-y-2">
              <li>2 menit ke Kampus UPN &quot;Veteran&quot; Yogyakarta</li>
              <li>5 menit ke Ambarukmo Plaza (Amplaz)</li>
              <li>8 menit ke Pakuwon Mall Yogyakarta</li>
              <li>10 menit ke Universitas Gadjah Mada (UGM)</li>
              <li>18 menit ke Tugu Jogja</li>
              <li>20 menit ke Stasiun Tugu Yogyakarta</li>
              <li>25 menit ke Malioboro / Titik Nol Kilometer</li>
            </ul>

            <p className="text-white/90 font-light drop-shadow-sm leading-relaxed text-sm sm:text-base">
              🎯 Dikelilingi pusat kuliner, kampus ternama, pusat perbelanjaan, dan fasilitas umum.
              Lokasi ini menjamin <strong>tingkat hunian tinggi</strong> dan{' '}
              <strong>potensi investasi jangka panjang</strong>.
            </p>
          </div>

          {/* Google Map Embed */}
          <div className="overflow-hidden rounded-3xl shadow-2xl ring-2 ring-yellow-400/30 aspect-[4/3]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3953.146395340698!2d110.4034854750049!3d-7.774297092245212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwNDYnMjcuNSJTIDExMMKwMjQnMjEuOCJF!5e0!3m2!1sen!2sid!4v1748560710288!5m2!1sen!2sid"
              title="Peta lokasi Villa Lodji Svarga 2 di Seturan Sleman, Yogyakarta"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Footer Info */}
        <p className="text-center max-w-4xl mx-auto mt-16 text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed font-light drop-shadow-sm">
          <strong className="text-yellow-400">Villa Lodji Svarga 2</strong> hadir di lokasi premium{' '}
          dengan akses mudah, lingkungan asri, dan potensi sewa tinggi. Investasi properti ini ideal untuk{' '}
          <strong className="text-yellow-400">passive income dan pertumbuhan aset jangka panjang</strong>.
        </p>
      </div>
    </section>
  );
};
