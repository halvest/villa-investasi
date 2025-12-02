"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle } from "lucide-react";

const faqItems = [
  {
    question: "Apa legalitas Villa Lodji Svarga 2?",
    answer:
      "Villa Lodji Svarga 2 menggunakan skema leasehold selama 20 tahun yang sudah dinotariskan secara resmi. Legalitas aman dan transparan, cocok untuk investasi jangka menengah hingga panjang.",
  },
  {
    question: "Berapa estimasi passive income dari investasi ini?",
    answer:
      "Estimasi passive income bisa mencapai Rp6 juta per bulan atau sekitar Rp75 juta per tahun, tergantung okupansi dan musim. Proyeksi balik modal dalam 5 tahun, didukung dengan akta notaris.",
  },
  {
    question: "Apakah villa sudah full furnished dan siap disewakan?",
    answer:
      "Ya, villa sudah dilengkapi furnitur lengkap dan desain interior estetik. Siap disewakan tanpa perlu renovasi tambahan.",
  },
  {
    question: "Bagaimana mekanisme bagi hasil dari penyewaan villa?",
    answer:
      "Bagi hasil adalah 70:30, di mana investor menerima 70% dari hasil sewa, dan 30% untuk manajemen operasional, pemasaran, dan perawatan villa.",
  },
];

const AccordionItem = ({
  item,
  isOpen,
  onClick,
}: {
  item: any;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div className="border-b border-slate-200">
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center text-left gap-4 py-6"
    >
      <h3 className="text-lg font-semibold text-slate-800">{item.question}</h3>
      <div className="flex-shrink-0">
        {isOpen ? (
          <Minus className="w-6 h-6 text-slate-500" />
        ) : (
          <Plus className="w-6 h-6 text-slate-500" />
        )}
      </div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="text-slate-600 leading-relaxed pb-6">{item.answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Pertanyaan pertama terbuka secara default

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-slate-900">
            Pertanyaan Umum
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200"
        >
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center bg-white p-8 rounded-2xl shadow-xl border border-slate-200"
        >
          <p className="text-xl font-semibold text-slate-800 mb-4">
            Masih ada pertanyaan atau ingin simulasi ROI?
          </p>
          <a
            href="https://wa.me/6289509888404?text=Halo%20saya%20ingin%20tanya-tanya%20tentang%20Villa%20Lodji%20Svarga%202&utm_source=landingpage&utm_medium=chat_button&utm_campaign=info_request"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold transition-transform hover:scale-105 shadow-lg"
          >
            <MessageCircle className="w-6 h-6" />
            Tanya via WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
