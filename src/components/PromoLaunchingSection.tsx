'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import villaImage from '../assets/images/10.jpg';

export const PromoLaunchingSection = () => {
  return (
    <section
      id="promo"
      className="relative bg-black text-white overflow-hidden min-h-screen flex items-center justify-center"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={villaImage}
          alt="Promo Launching Villa Lodji Svarga 2"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 sm:py-32 text-center max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl font-extrabold leading-tight mb-6 drop-shadow-xl"
        >
          Promo Launching{' '}
          <span className="text-yellow-400">Villa Lodjisvarga 2</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-base sm:text-lg text-white/90 mb-6 font-light leading-relaxed"
        >
          Miliki <span className="text-yellow-400 font-semibold">villa eksklusif</span> di lokasi strategis Jogja. <br />
          Cukup <span className="text-yellow-400 font-bold">Rp375 JUTA</span>, dapatkan{' '}
          <span className="font-semibold">passive income hingga Rp6 Juta/bulan</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <a
            href="https://wa.me/6283144940611?text=Halo%2C%20saya%20tertarik%20dengan%20Villa%20Lodji%20Svarga%202%20di%20Yogyakarta%20%F0%9F%8F%A1.%20Boleh%20minta%20info%20lengkapnya%3F&utm_source=landingpage&utm_medium=cta_button&utm_campaign=promo_launching"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-400 text-[#2E2E2E] font-semibold px-10 py-4 rounded-full shadow-xl hover:bg-yellow-300 hover:scale-105 transition-transform duration-300 text-base sm:text-lg"
          >
            Ambil Promo Sekarang
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-6 text-sm sm:text-base text-white/70 font-light"
        >
          Promo eksklusif hanya untuk{' '}
          <span className="font-semibold text-white">4 pembeli pertama</span>.
        </motion.p>
      </div>
    </section>
  );
};
