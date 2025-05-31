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
      <section className="relative bg-[#E8ECE4] text-[#2E2E2E] min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={VillaImage}
            alt="Tampak luar Villa Lodji Svarga 2 di Yogyakarta"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24 text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl font-bold leading-tight text-white drop-shadow-md"
          >
            Miliki Villa Eksklusif di Pusat{' '}
            <span className="text-yellow-300">Kota Yogyakarta</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 text-lg sm:text-xl text-white/90 font-light drop-shadow-sm"
          >
            Dengan harga <span className="font-semibold text-yellow-300">375 JUTA</span> anda sudah mendapatkan Passive Income hingga{' '}
            <span className="font-semibold text-yellow-300">Rp6 Juta/Bulan</span>, Balik Modal Dalam{' '}
            <span className="font-semibold text-yellow-300">5 Tahun</span>, dan{' '}
            <span className="font-semibold text-yellow-300">Fasilitas Lengkap & Full Furnish</span>.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto text-white/80"
          >
            Lokasi super strategis belakang UPN & dekat Ambarukmo Plaza. Dikelola profesional, cocok untuk passive income, atau bisnis jangka panjang.
          </motion.p>
        </div>
      </section>

      {/* Popup Promo */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
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
              className="relative bg-[#445B47] text-white rounded-xl overflow-hidden max-w-2xl w-full shadow-2xl p-8 text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-white text-2xl z-10 hover:text-yellow-300"
              >
                &times;
              </button>

              {/* Promo Content */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-extrabold mb-4"
              >
                Grand Launching{' '}
                <span className="text-yellow-300">Villa Lodjisvarga 2</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white/90 mb-6"
              >
                Kesempatan emas memiliki{' '}
                <span className="text-yellow-200 font-semibold">villa eksklusif</span> di Yogyakarta. <br />
                Cukup <span className="font-bold text-yellow-300">Rp375 JUTA</span>, dapatkan{' '}
                <span className="font-semibold">passive income hingga Rp6 Juta/bulan</span>.
              </motion.p>

              <motion.a
                href="https://wa.me/6283144940611"
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
                className="mt-4 text-sm text-white/70"
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
