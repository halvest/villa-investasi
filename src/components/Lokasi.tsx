'use client';

import { motion } from 'framer-motion';
import {
  MapPin,
  ExternalLink,
  University,
  ShoppingBag,
  Train,
  Landmark,
} from 'lucide-react';
import { ReactNode } from 'react';

const nearbyPlaces = [
  { icon: <University className="w-5 h-5 sm:w-6 sm:h-6" />, name: 'UPN Veteran Yogyakarta', time: '5 menit' },
  { icon: <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />, name: 'Ambarukmo Plaza', time: '5 menit' },
  { icon: <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />, name: 'Pakuwon Mall', time: '10 menit' },
  { icon: <University className="w-5 h-5 sm:w-6 sm:h-6" />, name: 'Universitas Gadjah Mada', time: '10 menit' },
  { icon: <Landmark className="w-5 h-5 sm:w-6 sm:h-6" />, name: 'Tugu Jogja', time: '15 menit' },
  { icon: <Train className="w-5 h-5 sm:w-6 sm:h-6" />, name: 'Stasiun & Malioboro', time: '20 menit' },
];

const PlaceCard = ({
  icon,
  name,
  time,
  delay,
}: {
  icon: ReactNode;
  name: string;
  time: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="flex items-start gap-3 sm:gap-4"
  >
    <div className="flex-shrink-0 text-yellow-500 bg-yellow-100 p-2 sm:p-3 rounded-lg">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-slate-800 text-sm sm:text-base">{name}</h4>
      <p className="text-xs sm:text-sm text-slate-500">{time} dari lokasi</p>
    </div>
  </motion.div>
);

export const LocationDetail = () => {
  return (
    <section
      id="lokasi"
      className="py-16 sm:py-24 bg-white"
      aria-labelledby="lokasi-heading"
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 mx-auto mb-4" />
          <h2
            id="lokasi-heading"
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900"
          >
            Lokasi Strategis di{' '}
            <span className="text-yellow-400">Seturan Yogyakarta</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg max-w-2xl mx-auto text-slate-600">
            Terletak di Jl. Duwet, Kledokan, Caturtunggal Villa Lodjisvarga Seturan
            menawarkan akses cepat ke berbagai destinasi penting di kota.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          {/* Destinasi list */}
          <div className="space-y-5 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
              Destinasi Terdekat:
            </h3>
            {nearbyPlaces.map((place, index) => (
              <PlaceCard key={place.name} {...place} delay={index * 0.1} />
            ))}
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1043.6202478347807!2d110.40542392847621!3d-7.774339670734995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59005e3edcb7%3A0x50ef67788e5e207e!2sLodjisvarga%202!5e1!3m2!1sid!2sid!4v1748873264096!5m2!1sid!2sid"
                title="Peta lokasi Villa Lodji Svarga 2 di Seturan Sleman, Yogyakarta"
                className="w-full h-64 sm:h-80 lg:h-96 border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="text-center">
              <a
                href="https://maps.app.goo.gl/HwZywqmpJmWyaS8b9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-slate-900 text-white text-sm sm:text-base font-semibold hover:bg-slate-700 transition shadow-md"
              >
                <ExternalLink size={16} className="sm:w-5 sm:h-5" />
                Buka di Google Maps
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
