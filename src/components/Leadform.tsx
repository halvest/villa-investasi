"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  ChevronRight,
  Clock,
  Percent,
  ShieldCheck,
  ArrowDown,
  MessageSquare,
  Sparkles,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabaseClient";

const phonePattern = /^(?:\+62|0)[0-9]{9,14}$/;

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;
};

export const LeadForm: React.FC = () => {
  const [form, setForm] = useState({
    nama: "",
    domisili: "",
    whatsapp: "",
    jadwal: "",
    keterangan: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  // REF untuk input tanggal agar bisa dipicu manual (UX Friendly)
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Timer Logic (Jalan terus saat mount, konsisten dengan section pembayaran)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto Open Logic (Hanya sekali per sesi, delay 10 detik)
  useEffect(() => {
    const timer = setTimeout(() => {
      const alreadyClosed = sessionStorage.getItem("lead_popup_closed");
      if (!hasOpened && !alreadyClosed) {
        setIsOpen(true);
        setHasOpened(true);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [hasOpened]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("lead_popup_closed", "true");
  };

  const handleOpen = () => setIsOpen(true);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nama || !form.whatsapp) {
      toast.error("Mohon lengkapi Nama & WhatsApp.");
      return;
    }
    if (!phonePattern.test(form.whatsapp)) {
      toast.error("Nomor WhatsApp tidak valid.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Logic: Gabungkan jadwal ke keterangan agar terbaca di DB/Admin
      let finalKeterangan = form.keterangan.trim();
      if (form.jadwal) {
        const tgl = new Date(form.jadwal).toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        finalKeterangan = `[Rencana Cek Lokasi: ${tgl}] \n${finalKeterangan}`;
      }

      // Insert ke Supabase
      const { error } = await supabase.from("leads").insert({
        nama: form.nama.trim(),
        domisili: form.domisili.trim(),
        whatsapp: form.whatsapp.trim(),
        keterangan: finalKeterangan,
        source: "Promo Popup 15jt (30 Mins)",
        status: "Baru",
      });

      if (error) throw new Error(error.message);

      // Kirim Notifikasi ke API Telegram
      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          jadwal: form.jadwal,
        }),
      }).catch((err) => console.error("Gagal notif telegram:", err));

      // Tracking Pixel (Opsional)
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", {
          content_name: "Promo Villa 375jt",
        });
      }

      toast.success("Diskon berhasil dikunci! Tim kami akan menghubungi Anda.");

      // Reset Form & Tutup
      setForm({
        nama: "",
        domisili: "",
        whatsapp: "",
        jadwal: "",
        keterangan: "",
      });
      handleClose();
    } catch (error: any) {
      console.error("Submit Error:", error);
      toast.error("Gagal kirim data: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      {/* === FLOATING TRIGGER BUTTON (Pojok Kiri Bawah) === */}
      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={handleOpen}
        className="fixed bottom-6 left-6 z-40 bg-white text-slate-900 pl-2 pr-5 py-2 rounded-full shadow-2xl hover:scale-105 transition group flex items-center gap-3 border border-amber-200"
      >
        <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-white p-2.5 rounded-full animate-pulse shadow-lg shadow-amber-500/30">
          <Percent size={20} />
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-[10px] text-amber-600 uppercase tracking-widest font-bold">
            Promo Terbatas
          </p>
          <p className="text-sm font-bold text-slate-900 leading-none mt-0.5">
            Klaim Diskon 10 Juta
          </p>
        </div>
        {/* Mobile Text Only */}
        <span className="sm:hidden font-bold text-sm text-slate-900">
          Klaim Diskon
        </span>
      </motion.button>

      {/* === MODAL POPUP === */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            {/* Content Container */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header Visual */}
              <div className="bg-slate-900 relative text-white overflow-hidden shrink-0">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-amber-500">
                  <Sparkles size={80} />
                </div>

                {/* Timer Bar */}
                <div className="bg-amber-500 text-slate-900 text-center py-2 px-4 font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-sm relative z-10">
                  <Clock size={14} className="animate-pulse" />
                  <span>Promo Berakhir: {formatTime(timeLeft)}</span>
                </div>

                <div className="px-6 py-5 relative z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        Selamat! <span className="text-2xl">🎉</span>
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 max-w-[90%]">
                        Anda terpilih mendapatkan{" "}
                        <span className="text-amber-400 font-semibold">
                          DISKON HARGA
                        </span>
                        . Isi formulir sekarang.
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="text-white/50 hover:text-white transition p-1 bg-white/10 rounded-full"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Price Comparison */}
                  <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center relative backdrop-blur-md">
                    <div className="text-left opacity-70">
                      <p className="text-[10px] uppercase text-slate-300 font-semibold line-through decoration-red-500/80">
                        Harga Normal
                      </p>
                      <p className="text-sm font-medium text-slate-300 line-through decoration-red-500/80">
                        Rp 385 Juta
                      </p>
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-slate-900 rounded-full p-1 border-2 border-slate-900">
                      <ArrowDown size={14} className="animate-bounce" />
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase text-amber-400 font-bold animate-pulse">
                        Harga Spesial
                      </p>
                      <p className="text-2xl font-black text-white tracking-tight">
                        Rp 375 Jt
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Body */}
              <div className="px-6 py-6 bg-slate-50 overflow-y-auto flex-1">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Nama */}
                  <div className="relative group">
                    <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                    <input
                      type="text"
                      name="nama"
                      value={form.nama}
                      onChange={handleChange}
                      placeholder="Nama Lengkap"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition text-sm text-slate-800 shadow-sm"
                      required
                    />
                  </div>

                  {/* Kontak Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative group">
                      <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                      <input
                        type="tel"
                        name="whatsapp"
                        value={form.whatsapp}
                        onChange={handleChange}
                        placeholder="WhatsApp (08xx)"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition text-sm text-slate-800 shadow-sm"
                        required
                      />
                    </div>
                    <div className="relative group">
                      <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                      <input
                        type="text"
                        name="domisili"
                        value={form.domisili}
                        onChange={handleChange}
                        placeholder="Domisili"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition text-sm text-slate-800 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Date Picker (Optimized Click) */}
                  <div className="relative group">
                    <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-amber-500 transition-colors z-10 pointer-events-none" />
                    <input
                      ref={dateInputRef}
                      type="date"
                      name="jadwal"
                      min={today}
                      value={form.jadwal}
                      onChange={handleChange}
                      onClick={() => dateInputRef.current?.showPicker()}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition text-sm text-slate-800 shadow-sm cursor-pointer relative"
                      style={{ colorScheme: "light" }}
                    />
                    {/* Placeholder Custom */}
                    {!form.jadwal && (
                      <span
                        onClick={() => dateInputRef.current?.showPicker()}
                        className="absolute left-10 top-3.5 text-sm text-slate-400 pointer-events-none bg-white pr-2"
                      >
                        Rencana Cek Lokasi
                      </span>
                    )}
                  </div>

                  {/* Pesan */}
                  <div className="relative group">
                    <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                    <textarea
                      name="keterangan"
                      rows={2}
                      value={form.keterangan}
                      onChange={handleChange}
                      placeholder="Ada pertanyaan khusus?"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition text-sm text-slate-800 shadow-sm resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        "Memproses..."
                      ) : (
                        <>
                          Ambil Diskon Sekarang <ChevronRight size={18} />
                        </>
                      )}
                    </motion.button>
                    <div className="flex justify-center mt-3">
                      <p className="text-[10px] text-slate-400 flex items-center gap-1.5 text-center">
                        <ShieldCheck size={12} className="text-green-500" />
                        Privasi aman. Detail promo dikirim via WhatsApp.
                      </p>
                    </div>
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
