"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X } from "lucide-react";

export const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0, y: -20 }}
          animate={{ height: "auto", opacity: 1, y: 0 }}
          exit={{ height: 0, opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="relative overflow-hidden"
        >
          {/* Background gradient with shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 animate-shimmer bg-[length:200%_100%]" />

          <div className="relative container mx-auto px-4 py-3">
            <div className="flex items-center justify-center relative text-slate-900">
              {/* Icon with subtle bounce */}
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Gift className="h-5 w-5 mr-2 text-amber-700 drop-shadow-sm hidden sm:block" />
              </motion.div>

              <p className="text-sm sm:text-base font-semibold text-center leading-relaxed">
                <span className="font-bold">Promo Spesial Akhir Tahun!</span> 🎉{" "}
                <br />
                Dari{" "}
                <span className="line-through text-red-700 font-semibold">
                  Rp385 Juta
                </span>{" "}
                jadi{" "}
                <motion.span
                  className="font-extrabold text-slate-900"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Rp375 Juta
                </motion.span>{" "}
                ✨ <br />
                potongan harga <span className="font-bold">Rp15 Juta</span>{" "}
              </p>

              {/* Close button */}
              <button
                onClick={() => setIsVisible(false)}
                aria-label="Tutup banner promo"
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/20 transition"
              >
                <X className="h-5 w-5 text-slate-800 hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
