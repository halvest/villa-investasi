'use client';

import Head from 'next/head';
import { motion } from 'framer-motion';
import Image from 'next/image';

import Interior from '../assets/images/living-room2.jpg';
import PrivatePool from '../assets/images/private-pool.jpg';
import LivingRoom from '../assets/images/living-room.jpg';
import Bedroom from '../assets/images/bedroom.jpg';
import Bathroom from '../assets/images/bathroom.jpg';
import Pantry from '../assets/images/mini-pantry.jpg';

const fasilitas = [
  { src: Interior, alt: 'Interior Villa Lodji Svarga 2', label: 'Interior' },
  { src: PrivatePool, alt: 'Kolam Renang Pribadi Villa', label: 'Private Pool' },
  { src: LivingRoom, alt: 'Ruang Keluarga Villa yang Nyaman', label: 'Living Room' },
  { src: Bedroom, alt: 'Kamar Tidur Elegan Villa Lodji', label: 'Bedroom' },
  { src: Bathroom, alt: 'Kamar Mandi Modern di Villa', label: 'Bathroom' },
  { src: Pantry, alt: 'Mini Pantry Multifungsi Villa', label: 'Mini Pantry' },
];

export const FasilitasSection = () => {
  return (
    <>
      <Head>
        <title>Fasilitas Eksklusif Villa Lodji Svarga 2 di Seturan Yogyakarta</title>
        <meta
          name="description"
          content="Jelajahi fasilitas villa Lodji Svarga 2: interior mewah, kolam renang pribadi, kamar elegan, dan ruang fungsional. Investasi properti terbaik di Jogja."
        />
        <meta
          name="keywords"
          content="fasilitas villa Jogja, villa Lodji Svarga 2, kolam renang pribadi, interior villa, investasi properti Jogja, villa Seturan Sleman"
        />
        <meta property="og:title" content="Fasilitas Villa Lodji Svarga 2 - Investasi Properti Jogja" />
        <meta
          property="og:description"
          content="Villa eksklusif dengan kolam renang pribadi, interior lengkap, kamar nyaman, dan pantry fungsional. Ideal untuk passive income."
        />
        <meta property="og:image" content="https://www.haspro.me/og-image.jpg" />
        <meta property="og:url" content="https://www.haspro.me/fasilitas" />
        <link rel="canonical" href="https://www.haspro.me/fasilitas" />
      </Head>

      <section
        id="fasilitas"
        className="bg-[#E8ECE4] text-[#2E2E2E] py-20"
        aria-labelledby="fasilitas-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            id="fasilitas-heading"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-center mb-4 text-[#556B57]"
          >
            <span className="text-[#9BA88D]">Fasilitas Eksklusif di</span> Lodji Svarga 2
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center max-w-2xl mx-auto mb-12 text-[#556B57]/80 leading-relaxed"
          >
            Villa Lodji Svarga 2 menghadirkan fasilitas eksklusif dan fungsional yang dirancang
            untuk kenyamanan penghuni dan daya tarik penyewa. Cocok untuk Anda yang mencari
            properti investasi di Jogja dengan nilai estetika dan ROI tinggi.
          </motion.p>

          {/* Mobile Carousel */}
          <div className="sm:hidden flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 -mx-2 pb-4">
            {fasilitas.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative min-w-[260px] rounded-3xl overflow-hidden shadow-lg border border-[#CBD5C0] bg-white snap-start"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-52 object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#F4F7F1]/80 text-[#556B57] px-4 py-1 rounded-full shadow-md text-sm font-medium border border-[#CED6C3] backdrop-blur-md">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Grid */}
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-10">
            {fasilitas.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#CBD5C0] bg-white transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-2xl">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#F4F7F1]/90 text-[#556B57] px-4 py-1 rounded-full shadow-md text-sm font-semibold border border-[#CED6C3] backdrop-blur-md">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
