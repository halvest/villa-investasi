'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  TrendingUp,
  Award,
  Home,
  Gift,
  Briefcase,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { ReactNode } from 'react';

const benefits = [
  {
    icon: <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-amber-900" />,
    title: 'Investasi Aman & Terjamin',
    description:
      'Kontrak jelas dan jaminan BEP 5 tahun dengan notaris. Properti legal dan transparan untuk ketenangan Anda.',
  },
  {
    icon: <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-amber-900" />,
    title: 'Dapatkan Passive Income',
    description:
      'Potensi penghasilan hingga Rp6 Juta/bulan, dikelola penuh oleh tim profesional berpengalaman.',
  },
  {
    icon: <Award className="w-6 h-6 sm:w-7 sm:h-7 text-amber-900" />,
    title: 'Lokasi Super Premium',
    description:
      'Berlokasi di Seturan, pusat mahasiswa & wisata, dengan okupansi tinggi dan nilai properti terus naik.',
  },
  {
    icon: <Home className="w-6 h-6 sm:w-7 sm:h-7 text-amber-900" />,
    title: 'Unit Full Furnished',
    description:
      'Interior modern, elegan, dan siap pakai. Tanpa biaya tambahan, langsung disewakan.',
  },
  {
    icon: <Gift className="w-6 h-6 sm:w-7 sm:h-7 text-amber-900" />,
    title: 'Hak Menginap Gratis',
    description:
      'Nikmati 12x free stay per tahun — ideal untuk liburan keluarga sekaligus investasi.',
  },
  {
    icon: <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-amber-900" />,
    title: 'Manajemen Profesional',
    description:
      'Semua operasional, penyewaan, dan perawatan properti dikelola penuh oleh tim ahli.',
  },
];

const BenefitCard = ({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) => (
  <div className="h-full rounded-2xl border border-white/20 bg-white/60 p-5 sm:p-7 shadow-md backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <div className="mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-amber-100">
      {icon}
    </div>
    <h3 className="mb-2 text-base sm:text-lg font-semibold text-gray-900">
      {title}
    </h3>
    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
      {description}
    </p>
  </div>
);

const sliderVariants = {
  incoming: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.9,
  }),
  active: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
  outgoing: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.35, ease: 'easeIn' },
  }),
};

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export function VillaBenefitsPage() {
  const [[page, direction], setPage] = useState([0, 0]);
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  const benefitIndex =
    ((page % benefits.length) + benefits.length) % benefits.length;

  return (
    <section
      id="benefit"
      className="relative overflow-hidden py-14 sm:py-20 bg-gray-50"
    >
      {/* Background */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 h-52 w-52 sm:h-72 sm:w-72 rounded-full bg-sky-200/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[clamp(1.6rem,5vw,2.5rem)] font-extrabold tracking-tight text-gray-900">
            Kenapa <span className="text-amber-500">Investasi Ini</span> Terbaik
            untuk Anda?
          </h2>
          <p className="mt-3 text-gray-600 text-sm sm:text-base">
            Kombinasi keamanan, kenyamanan, dan keuntungan maksimal dalam satu
            investasi properti eksklusif.
          </p>
        </motion.div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div className="relative mx-auto max-w-xs sm:max-w-sm h-auto min-h-[18rem] sm:min-h-[20rem] overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={page}
                className="absolute inset-0 p-1"
                custom={direction}
                variants={sliderVariants}
                initial="incoming"
                animate="active"
                exit="outgoing"
              >
                <BenefitCard {...benefits[benefitIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => paginate(-1)}
              className="rounded-full bg-white/80 p-2.5 sm:p-3 text-gray-700 shadow-md backdrop-blur-sm transition hover:bg-amber-400 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <div className="flex items-center gap-2">
              {benefits.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === benefitIndex ? 'w-4 bg-amber-500' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => paginate(1)}
              className="rounded-full bg-white/80 p-2.5 sm:p-3 text-gray-700 shadow-md backdrop-blur-sm transition hover:bg-amber-400 hover:text-white"
            >
              <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>

        {/* Desktop grid */}
        <motion.div
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {benefits.map((benefit, i) => (
            <motion.div key={i} variants={gridItemVariants}>
              <BenefitCard {...benefit} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
