'use client';

import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PlusIcon from "../assets/icons/plus.svg";
import MinusIcon from "../assets/icons/minus.svg";

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

const AccordionItem = memo(
  ({ question, answer, index }: { question: string; answer: string; index: number }) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonId = `faq-button-${index}`;
    const panelId = `faq-panel-${index}`;

    return (
      <div className="border-b border-[#CBD5C0] py-5">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          id={buttonId}
          className="flex items-center justify-between w-full text-left group transition-colors"
        >
          <span className="text-lg sm:text-xl font-medium text-[#556B57] group-hover:text-[#7A8C74]">
            {question}
          </span>
          <span className="transition-transform duration-300 ease-in-out">
            {isOpen ? (
              <MinusIcon className="w-5 h-5 text-[#7A8C74]" />
            ) : (
              <PlusIcon className="w-5 h-5 text-[#7A8C74]" />
            )}
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-3 text-base leading-relaxed text-[#5B5B5B]"
            >
              {answer}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

export function FAQs() {
  return (
    <section id="faq" className="bg-[#E8ECE4] py-20 sm:py-28 text-[#2E2E2E]">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-[#556B57]">
          Pertanyaan Umum
        </h2>

        <div className="space-y-4">
          {faqItems.map((item, idx) => (
            <AccordionItem
              key={idx}
              index={idx}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-[#556B57] mb-4">
            Masih ada pertanyaan atau ingin simulasi ROI?
          </p>
          <a
            href="https://wa.me/6283144940611?text=Halo%20saya%20ingin%20tanya-tanya%20tentang%20Villa%20Lodji%20Svarga%202&utm_source=landingpage&utm_medium=chat_button&utm_campaign=info_request"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full font-semibold transition-shadow shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 32 32">
              <path d="M16 .396c-8.837 0-16 7.163-16 16 0 2.837.744 5.617 2.155 8.051l-2.25 6.553 6.719-2.219c2.353 1.27 5.012 1.938 7.782 1.938 8.837 0 16-7.163 16-16s-7.163-16-16-16zm0 29.604c-2.497 0-4.956-.676-7.102-1.959l-.508-.305-3.992 1.32 1.34-3.914-.328-.511c-1.347-2.099-2.057-4.525-2.057-7.145 0-7.168 5.832-13 13-13s13 5.832 13 13-5.832 13-13 13zm7.175-9.689c-.391-.195-2.309-1.14-2.666-1.27-.358-.132-.619-.195-.879.195-.258.391-1.008 1.27-1.236 1.533-.227.258-.454.292-.844.098-.391-.195-1.651-.607-3.145-1.938-1.162-1.036-1.946-2.313-2.173-2.703-.227-.391-.024-.602.17-.797.175-.175.391-.454.586-.681.195-.227.258-.391.391-.652.132-.258.066-.487-.033-.681-.098-.195-.879-2.121-1.204-2.906-.316-.762-.639-.658-.879-.658-.227-.011-.487-.011-.747-.011s-.681.098-1.036.487c-.358.391-1.358 1.328-1.358 3.236s1.389 3.754 1.581 4.015c.195.258 2.729 4.164 6.601 5.84.924.398 1.643.636 2.204.814.926.293 1.77.252 2.438.153.744-.111 2.309-.943 2.636-1.854.324-.91.324-1.689.227-1.854-.093-.162-.358-.258-.749-.454z" />
            </svg>
            Tanya via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
