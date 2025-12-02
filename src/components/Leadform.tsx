"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  User,
  MapPin,
  Phone,
  MessageSquare,
  X,
  FileText,
  Download,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabaseClient";

const phonePattern = /^(?:\+62|0)[0-9]{9,14}$/;

export const LeadForm: React.FC = () => {
  // State untuk form
  const [form, setForm] = useState({
    nama: "",
    domisili: "",
    whatsapp: "",
    keterangan: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // State untuk Modal Popup
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  // Efek Auto-Open setelah 10 detik (Hanya sekali per sesi)
  useEffect(() => {
    const timer = setTimeout(() => {
      const alreadyClosed = sessionStorage.getItem("lead_popup_closed");
      if (!hasOpened && !alreadyClosed) {
        setIsOpen(true);
        setHasOpened(true);
      }
    }, 10000); // 10 Detik delay

    return () => clearTimeout(timer);
  }, [hasOpened]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("lead_popup_closed", "true"); // Tandai user sudah menutup
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nama || !form.whatsapp || !form.domisili) {
      toast.error("Nama, Domisili, dan WhatsApp wajib diisi.");
      return;
    }
    if (!phonePattern.test(form.whatsapp)) {
      toast.error("Format WhatsApp tidak valid.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Simpan ke Supabase
      const { error } = await supabase.from("leads").insert({
        nama: form.nama.trim(),
        domisili: form.domisili.trim(),
        whatsapp: form.whatsapp.trim(),
        keterangan: form.keterangan.trim(),
        source: "Popup Lead Form", // Penanda sumber data
      });

      if (error) throw new Error(error.message);

      // 2. Kirim Notifikasi Telegram
      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }).catch((err) => console.error("Gagal notif telegram:", err));

      // 3. Meta Pixel Tracking (Lead)
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", {
          content_name: "Popup Investasi Villa",
          currency: "IDR",
          value: 0,
        });
      }

      toast.success("Berhasil! Proposal akan kami kirim via WhatsApp.");

      // Reset & Tutup Modal
      setForm({ nama: "", domisili: "", whatsapp: "", keterangan: "" });
      handleClose();
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("Gagal mengirim data. Coba lagi nanti.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* 1. FLOATING TRIGGER BUTTON (Pojok Kiri Bawah) */}
      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        onClick={handleOpen}
        className="fixed bottom-6 left-6 z-40 bg-white text-slate-900 px-5 py-3 rounded-full shadow-2xl border border-amber-200 flex items-center gap-3 hover:scale-105 transition-transform group"
      >
        <div className="bg-amber-500 text-white p-2 rounded-full animate-pulse">
          <FileText size={20} />
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-xs text-slate-500 font-medium">
            Mau info lengkap?
          </p>
          <p className="text-sm font-bold text-slate-800">
            Download Brosur & ROI
          </p>
        </div>
        {/* Mobile Text Only */}
        <span className="sm:hidden font-bold text-sm">Info Brosur</span>
      </motion.button>

      {/* 2. MODAL POPUP */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop Gelap */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Content Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header Modal (Visual Menarik) */}
              <div className="relative bg-slate-900 p-6 text-white overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles size={100} />
                </div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                        <Download size={20} /> Penawaran Eksklusif
                      </h3>
                      <p className="text-sm text-slate-300 mt-1">
                        Dapatkan detail harga, siteplan, dan simulasi passive
                        income.
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="text-white/70 hover:text-white bg-white/10 p-1.5 rounded-full hover:bg-white/20 transition"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Body */}
              <div className="p-6 overflow-y-auto bg-slate-50">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Nama */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                      Nama Lengkap
                    </label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="nama"
                        value={form.nama}
                        onChange={handleChange}
                        placeholder="Nama Anda"
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition bg-white"
                        required
                      />
                    </div>
                  </div>

                  {/* WhatsApp & Domisili (Grid) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                        WhatsApp
                      </label>
                      <div className="relative mt-1">
                        <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                          type="tel"
                          name="whatsapp"
                          value={form.whatsapp}
                          onChange={handleChange}
                          placeholder="08xx..."
                          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition bg-white"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                        Domisili
                      </label>
                      <div className="relative mt-1">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          name="domisili"
                          value={form.domisili}
                          onChange={handleChange}
                          placeholder="Kota..."
                          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition bg-white"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Keterangan */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                      Pesan (Opsional)
                    </label>
                    <div className="relative mt-1">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <textarea
                        name="keterangan"
                        rows={2}
                        value={form.keterangan}
                        onChange={handleChange}
                        placeholder="Ada pertanyaan khusus?"
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition bg-white resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 font-bold py-4 rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          Mengirim...
                        </span>
                      ) : (
                        <>
                          <Send size={18} /> Kirim & Dapatkan Info
                        </>
                      )}
                    </motion.button>
                    <p className="text-center text-[10px] text-slate-400 mt-3">
                      Data Anda aman. Kami akan menghubungi via WhatsApp untuk
                      konsultasi gratis.
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
