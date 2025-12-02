"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, Tag, ChevronLeft, ChevronRight } from "lucide-react";

import VillaExterior from "../assets/images/fasad-villa.jpg";
import LivingRoom from "../assets/images/fasadvilla.jpg";
import Bedroom from "../assets/images/private-pool-villa.jpg";

const images = [
  {
    src: VillaExterior,
    alt: "Tampak eksterior Villa Lodji Svarga 2 yang elegan dan mewah di Yogyakarta",
  },
  {
    src: LivingRoom,
    alt: "Ruang tamu modern dan nyaman di Villa Lodji Svarga 2 sebagai investasi properti",
  },
  {
    src: Bedroom,
    alt: "Kamar tidur mewah dengan furniture lengkap, siap untuk disewakan",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () =>
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevImage = () =>
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(nextImage, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-gray-950"
    >
      {/* Background slider */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={images[currentImage].src}
            alt={images[currentImage].alt}
            fill
            priority={currentImage === 0}
            loading={currentImage === 0 ? "eager" : "lazy"}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 lg:justify-start">
        <div className="container mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl rounded-2xl border border-white/10 bg-black/40 p-6 text-center shadow-2xl backdrop-blur-md md:p-8 lg:text-left"
          >
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs sm:text-sm font-semibold text-amber-300">
                <Tag className="h-4 w-4" />
                <span>Investasi Properti</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-4 font-extrabold tracking-tighter text-white text-[clamp(2rem,5vw,3.5rem)] leading-tight"
            >
              Miliki Villa Mewah, <br />
              <span className="text-amber-400">Juga Passive Income.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-5 text-sm text-gray-300 sm:text-base md:text-lg"
            >
              Investasi cerdas di jantung pariwisata Yogyakarta. Mulai dari{" "}
              <strong className="font-semibold text-white">Rp375 Juta</strong>,
              dapatkan jaminan BEP 5 tahun dengan legalitas notaris resmi.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-7 flex flex-col items-center gap-6 sm:flex-row sm:justify-center lg:justify-start"
            >
              <a
                href="#benefit"
                aria-label="Lihat detail investasi villa"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-amber-400 px-7 py-3 text-sm sm:text-base font-bold text-gray-900 shadow-lg ring-2 ring-transparent ring-offset-2 ring-offset-gray-950 transition-all duration-300 hover:scale-105 hover:bg-amber-300 focus:outline-none focus:ring-amber-400"
              >
                <span>Lihat Detail Investasi</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 sm:h-5 sm:w-5 fill-current"
                    />
                  ))}
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-400">
                  (5.0) Dipercaya 50+ Investor
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Slider navigation */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 sm:gap-4">
        <button
          onClick={prevImage}
          aria-label="Gambar Sebelumnya"
          className="rounded-full bg-black/30 p-2 sm:p-3 text-white/70 transition hover:bg-black/50 hover:text-white"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <div className="flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              aria-label={`Lihat gambar ${index + 1}`}
              className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition-all duration-300 ${
                currentImage === index
                  ? "w-4 bg-white"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
        <button
          onClick={nextImage}
          aria-label="Gambar Berikutnya"
          className="rounded-full bg-black/30 p-2 sm:p-3 text-white/70 transition hover:bg-black/50 hover:text-white"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>
    </header>
  );
};
