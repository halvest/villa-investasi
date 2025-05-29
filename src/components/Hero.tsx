'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import VillaImage from '../assets/images/hook.png';

export const Hero = () => {
  return (
    <section className="relative bg-white text-[#2E2E2E] overflow-hidden min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <Image
          src={VillaImage}
          alt="Villa Lodji Svarga 2"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24 max-w-4xl text-center -mt-12">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl font-bold leading-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
        >
          Miliki Villa Eksklusif di Pusat <span className="text-yellow-400">Kota Yogyakarta</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-lg sm:text-xl text-white/90 font-light drop-shadow-sm"
        >
          Dengan harga <span className="font-semibold text-yellow-400">375 JUTA</span> anda sudah mendapatkan Passive Income hingga <span className="font-semibold text-yellow-400">Rp6 Juta/Bulan</span>, Balik Modal Dalam <span className="font-semibold text-yellow-400">5 Tahun</span>, dan <span className="font-semibold text-yellow-400">Fasilitas Lengkap & Full Furnish</span>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto text-white/80"
        >
          Lokasi super strategis belakang UPN & dekat Ambarukmo Plaza. Dikelola profesional, cocok untuk passive income, warisan keluarga, atau bisnis jangka panjang.
        </motion.p>
      </div>
    </section>
  );
};