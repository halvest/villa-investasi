'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import VillaImage from '../assets/images/9.jpg';

export const Hero = () => {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="relative bg-[#E8ECE4] text-white min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={VillaImage}
            alt="Tampak luar Villa Lodji Svarga 2"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 py-20 sm:py-28 text-center max-w-4xl">
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl font-bold leading-tight drop-shadow-xl"
          >
            Investasi Villa Leasehold 20 Tahun di Pusat{' '}
            <span className="text-yellow-300">Kota Yogyakarta</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 text-base sm:text-lg font-light text-white/90 drop-shadow-sm"
          >
            Hanya dengan <span className="font-semibold text-yellow-300">Rp375 JUTA</span>, dapatkan{' '}
            <span className="font-semibold text-yellow-300">Passive Income hingga Rp6 Juta/Bulan</span>. Jaminan BEP dalam{' '}
            <span className="font-semibold text-yellow-300">5 Tahun DI NOTARISKAN!</span> dengan{' '}
            <span className="font-semibold text-yellow-300">Fasilitas Lengkap & Full Furnish</span>.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6 text-sm sm:text-base max-w-3xl mx-auto text-white/80"
          >
            Berlokasi strategis di belakang UPN & dekat Ambarukmo Plaza. Cocok untuk passive income atau bisnis properti jangka panjang, dengan manajemen profesional.
          </motion.p>
        </div>
      </section>

      {/* Popup Promo */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-heading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-[#445B47] text-white rounded-xl overflow-hidden max-w-xl w-full shadow-2xl p-8 text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-white text-2xl hover:text-yellow-300"
                aria-label="Tutup promo"
              >
                &times;
              </button>

              {/* Promo Content */}
              <motion.h2
                id="popup-heading"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl sm:text-3xl font-bold mb-4"
              >
                Promo Launching{' '}
                <span className="text-yellow-300">Lodjisvarga 2</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-sm sm:text-base text-white/90 mb-6"
              >
                Kesempatan emas memiliki{' '}
                <span className="text-yellow-200 font-semibold">villa eksklusif</span> di Yogyakarta. <br />
                Cukup <span className="font-bold text-yellow-300">Rp375 JUTA</span>, dapatkan{' '}
                <span className="font-semibold">passive income hingga Rp6 Juta/bulan</span>.
              </motion.p>

              <motion.a
                href="https://wa.me/6283144940611?text=Halo%2C%20saya%20tertarik%20dengan%20Villa%20Lodji%20Svarga%202%20di%20Yogyakarta%20%F0%9F%8F%A1.%20Boleh%20minta%20info%20lengkapnya%3F&utm_source=landingpage&utm_medium=cta_button&utm_campaign=promo_launching"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="inline-block bg-yellow-300 text-[#2E2E2E] font-semibold px-8 py-3 rounded-full shadow hover:bg-yellow-200 transition"
              >
                Ambil Promo Sekarang
              </motion.a>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-4 text-xs sm:text-sm text-white/70"
              >
                Promo terbatas untuk <span className="font-semibold">4 pembeli pertama</span>.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
