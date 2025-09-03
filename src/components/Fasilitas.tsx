"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Import gambar
import Interior from "../assets/images/living-room2.jpg";
import PrivatePool from "../assets/images/private-pool.jpg";
import LivingRoom from "../assets/images/living-room.jpg";
import Bedroom from "../assets/images/bedroom.jpg";
import Bathroom from "../assets/images/bathroom.jpg";
import Pantry from "../assets/images/mini-pantry.jpg";

const fasilitas = [
  { src: PrivatePool, alt: "Kolam Renang Pribadi Villa", label: "Private Pool" },
  { src: LivingRoom, alt: "Ruang Keluarga Villa yang Nyaman", label: "Living Room" },
  { src: Bedroom, alt: "Kamar Tidur Elegan Villa Lodji", label: "Bedroom" },
  { src: Bathroom, alt: "Kamar Mandi Modern di Villa", label: "Bathroom" },
  { src: Pantry, alt: "Mini Pantry Multifungsi Villa", label: "Mini Pantry" },
  { src: Interior, alt: "Interior Villa Lodji Svarga 2", label: "Interior Modern" },
];

export const FasilitasSection = () => {
  const [selected, setSelected] = useState(fasilitas[0]);

  return (
    <section
      id="fasilitas"
      className="py-20 bg-white"
      aria-labelledby="fasilitas-heading"
    >
      <div className="container mx-auto px-4">
        {/* Judul */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto mb-12 text-center"
        >
          <h2
            id="fasilitas-heading"
            className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
          >
            Fasilitas <span className="text-yellow-400">Premium & Lengkap</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Setiap sudut Villa Lodjisvarga Seturan dirancang untuk kenyamanan
            maksimal, baik untuk liburan maupun investasi sewa Anda.
          </p>
        </motion.div>

        {/* Galeri */}
        <div className="flex flex-col items-center">
          {/* Viewer utama */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl mb-6 sm:mb-8"
            >
              <Image
                src={selected.src}
                alt={selected.alt}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-black/50 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg backdrop-blur-sm">
                <h3 className="text-sm sm:text-xl font-semibold">
                  {selected.label}
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Thumbnails */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {fasilitas.map((item) => (
              <motion.div
                key={item.label}
                onClick={() => setSelected(item)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className={`relative w-20 h-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden cursor-pointer border-2 sm:border-4 transition-colors ${
                  selected.label === item.label
                    ? "border-yellow-400"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={item.src}
                  alt={`Thumbnail of ${item.alt}`}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
