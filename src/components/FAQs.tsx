// app/components/FAQs.tsx (Next.js dengan TypeScript)
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PlusIcon from "../assets/icons/plus.svg";
import MinusIcon from "../assets/icons/minus.svg";

const faqItems = [
  {
    question: "Apakah Villa Lodji Svarga 2 sudah SHM?",
    answer:
      "Ya, Villa Lodji Svarga 2 memiliki legalitas Sertifikat Hak Milik (SHM), jadi aman dan bisa langsung balik nama ke pembeli.",
  },
  {
    question: "Berapa estimasi ROI dari investasi villa ini?",
    answer:
      "ROI estimasi hingga 18% per tahun, tergantung tingkat okupansi dan musim liburan. Kami juga menyediakan simulasi ROI lengkap untuk Anda.",
  },
  {
    question: "Apakah villa ini sudah full furnished?",
    answer:
      "Ya, unit sudah lengkap dengan furnitur modern dan desain estetik. Anda tinggal bawa koper!",
  },
  {
    question: "Bagaimana sistem bagi hasil jika disewakan?",
    answer:
      "Kami menggunakan skema bagi hasil 70:30, di mana 70% untuk investor dan 30% untuk manajemen properti.",
  },
];

const AccordionItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="py-6 border-b border-white/20 cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">{question}</span>
        {isOpen ? (
          <MinusIcon className="w-5 h-5 text-white" />
        ) : (
          <PlusIcon className="w-5 h-5 text-white" />
        )}
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3 }}
            className="text-white/80 overflow-hidden"
          >
            <div className="pt-2">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQs = () => {
  return (
    <section className="bg-gradient-to-b from-yellow-400 to-black text-white py-[72px] sm:py-24">
      <div className="container px-4 max-w-4xl mx-auto">
        <h2 className="text-5xl sm:text-6xl text-center font-bold tracking-tight">
          Pertanyaan Umum Seputar Villa Lodji Svarga 2
        </h2>

        <div className="mt-12 space-y-4">
          {faqItems.map(({ question, answer }) => (
            <AccordionItem question={question} answer={answer} key={question} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-white/70 text-lg mb-4">
            Masih punya pertanyaan atau butuh simulasi ROI?
          </p>
          <a
            href="https://wa.me/6281234567890?text=Halo%20saya%20ingin%20tanya-tanya%20tentang%20Villa%20Lodji%20Svarga%202"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
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
};
