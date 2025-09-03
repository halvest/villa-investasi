'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X } from 'lucide-react';
import Link from 'next/link';

export const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 overflow-hidden"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-center relative">
              <Gift className="h-5 w-5 mr-3 hidden sm:block" />
              <p className="text-sm sm:text-base font-semibold text-center">
                <span className="font-bold">Promo Spesial! 🎉</span> Dapatkan potongan Rp25 Juta hanya di bulan ini.
                <Link href="#promo-launching" passHref>
                  <span className="ml-2 font-bold underline hover:text-white transition-colors cursor-pointer">
                    Hubungi kami sekarang!
                  </span>
                </Link>
              </p>
              <button
                onClick={() => setIsVisible(false)}
                aria-label="Tutup banner promo"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-800 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};