'use client';

import Image from 'next/image';
import villaImage from "../assets/images/9.jpg";
import { motion } from 'framer-motion';

export const PromoLaunchingSection = () => {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <Image
          src={villaImage}
          alt="Promo Launching Villa"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24 text-center max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-bold leading-tight mb-6"
        >
          Grand Launching Villa <span className="text-yellow-400">Lodji Svarga 2</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg sm:text-xl text-white/90 mb-8"
        >
          Dapatkan harga promo <span className="text-yellow-400 font-semibold">Rp375 JUTA</span> saja! Kesempatan emas untuk memiliki villa eksklusif dengan <span className="font-semibold">passive income hingga Rp6 Juta/bulan</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <a
            href="https://wa.me/6283144940611"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-400 text-[#2E2E2E] font-semibold px-8 py-4 rounded-full shadow-xl hover:bg-yellow-300 transition duration-300"
          >
            Klaim Promo Sekarang
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 text-sm text-white/70"
        >
          Promo terbatas hanya untuk <span className="font-medium">10 pembeli pertama</span>. Berlaku hingga akhir bulan ini.
        </motion.p>
      </div>
    </section>
  );
};
