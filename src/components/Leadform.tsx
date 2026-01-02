"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  ChevronRight,
  ShieldCheck,
  MessageCircleQuestion,
  MapPin,
  Phone,
  User,
  Coffee,
  Info,
} from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabaseClient";

const phonePattern = /^(?:\+62|0)[0-9]{9,14}$/;

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

  // REF untuk input tanggal agar bisa dipicu manual
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Auto Open Logic (Hanya sekali per sesi, delay 10 detik agar user baca konten dulu)
  useEffect(() => {
    const timer = setTimeout(() => {
      // Cek apakah user sudah pernah menutup popup sebelumnya
      const alreadyClosed = sessionStorage.getItem("consultation_popup_closed");
      if (!hasOpened && !alreadyClosed) {
        setIsOpen(true);
        setHasOpened(true);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [hasOpened]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("consultation_popup_closed", "true");
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
      let finalKeterangan = form.keterangan.trim();
      if (form.jadwal) {
        const tgl = new Date(form.jadwal).toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        finalKeterangan = `[Request Jadwal: ${tgl}] \n${finalKeterangan}`;
      }

      // Insert ke Supabase
      const { error } = await supabase.from("leads").insert({
        nama: form.nama.trim(),
        domisili: form.domisili.trim(),
        whatsapp: form.whatsapp.trim(),
        keterangan: finalKeterangan,
        source: "Consultation Popup (390jt)", // Source tag diperjelas
        status: "Baru",
      });

      if (error) throw new Error(error.message);

      // Kirim Notifikasi (Opsional)
      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, jadwal: form.jadwal }),
      }).catch((err) => console.error("Gagal notif telegram:", err));

      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", {
          content_name: "Consultation Request",
        });
      }

      toast.success(
        "Permintaan terkirim. Tim kami akan segera menghubungi Anda."
      );

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
      {/* === FLOATING TRIGGER BUTTON (Consultation Style) === */}
      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={handleOpen}
        className="fixed bottom-6 left-6 z-40 bg-white text-slate-800 pl-2 pr-5 py-2 rounded-full shadow-2xl hover:scale-105 transition group flex items-center gap-3 border border-slate-200"
      >
        {/* Icon Chat/Pertanyaan */}
        <div className="bg-slate-800 text-white p-2.5 rounded-full shadow-md">
          <MessageCircleQuestion size={20} />
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
            Butuh Bantuan?
          </p>
          <p className="text-sm font-bold text-slate-900 leading-none mt-0.5">
            Konsultasi Gratis
          </p>
        </div>
        {/* Mobile Text Only */}
        <span className="sm:hidden font-bold text-sm text-slate-900">
          Tanya Kami
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
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Content Container */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header Visual - Professional Dark Blue/Slate */}
              <div className="bg-slate-900 relative text-white overflow-hidden shrink-0">
                {/* Background Pattern Subtle */}
                <div className="absolute top-0 right-0 p-6 opacity-5">
                  <Coffee size={120} />
                </div>

                <div className="px-6 py-6 relative z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-500/30">
                          PRIORITAS
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white leading-tight">
                        Konsultasi Investasi
                      </h3>
                      <p className="text-sm text-slate-300 mt-1 max-w-[95%] leading-relaxed">
                        Diskusikan potensi ROI, detail unit, dan skema
                        pembayaran dengan konsultan kami.
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="text-white/40 hover:text-white transition p-1 bg-white/5 rounded-full hover:bg-white/10"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Price Info Block (Informational Only) */}
                  <div className="mt-5 bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center relative">
                    <div className="text-left">
                      <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                        <Info size={10} />
                        <p className="text-[10px] uppercase font-semibold tracking-wider">
                          Harga Publik
                        </p>
                      </div>
                      <p className="text-sm font-medium text-slate-400 line-through decoration-slate-500">
                        Rp 395 Juta
                      </p>
                    </div>

                    <div className="h-8 w-[1px] bg-white/10 mx-2"></div>

                    <div className="text-right">
                      <p className="text-[10px] uppercase text-amber-500 font-bold mb-1 tracking-wider">
                        Penawaran Spesial
                      </p>
                      <p className="text-xl font-bold text-white">
                        Rp 390 Juta
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
                    <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-slate-800 transition-colors" />
                    <input
                      type="text"
                      name="nama"
                      value={form.nama}
                      onChange={handleChange}
                      placeholder="Nama Lengkap"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-slate-800 focus:border-slate-800 outline-none transition text-sm text-slate-800 shadow-sm placeholder:text-slate-400"
                      required
                    />
                  </div>

                  {/* Kontak Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative group">
                      <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-slate-800 transition-colors" />
                      <input
                        type="tel"
                        name="whatsapp"
                        value={form.whatsapp}
                        onChange={handleChange}
                        placeholder="WhatsApp (Aktif)"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-slate-800 focus:border-slate-800 outline-none transition text-sm text-slate-800 shadow-sm placeholder:text-slate-400"
                        required
                      />
                    </div>
                    <div className="relative group">
                      <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-slate-800 transition-colors" />
                      <input
                        type="text"
                        name="domisili"
                        value={form.domisili}
                        onChange={handleChange}
                        placeholder="Kota Domisili"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-slate-800 focus:border-slate-800 outline-none transition text-sm text-slate-800 shadow-sm placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Date Picker */}
                  <div className="relative group">
                    <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-slate-800 transition-colors z-10 pointer-events-none" />
                    <input
                      ref={dateInputRef}
                      type="date"
                      name="jadwal"
                      min={today}
                      value={form.jadwal}
                      onChange={handleChange}
                      onClick={() => dateInputRef.current?.showPicker()}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-slate-800 focus:border-slate-800 outline-none transition text-sm text-slate-800 shadow-sm cursor-pointer relative"
                      style={{ colorScheme: "light" }}
                    />
                    {!form.jadwal && (
                      <span
                        onClick={() => dateInputRef.current?.showPicker()}
                        className="absolute left-10 top-3.5 text-sm text-slate-400 pointer-events-none bg-white pr-2"
                      >
                        Jadwalkan Cek Lokasi
                      </span>
                    )}
                  </div>

                  {/* Pesan */}
                  <div className="relative group">
                    <MessageCircleQuestion className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-slate-800 transition-colors" />
                    <textarea
                      name="keterangan"
                      rows={2}
                      value={form.keterangan}
                      onChange={handleChange}
                      placeholder="Apa yang ingin Anda tanyakan?"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-slate-800 focus:border-slate-800 outline-none transition text-sm text-slate-800 shadow-sm resize-none placeholder:text-slate-400"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-base shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        "Sedang Mengirim..."
                      ) : (
                        <>
                          Hubungi Konsultan Kami <ChevronRight size={18} />
                        </>
                      )}
                    </motion.button>
                    <div className="flex justify-center mt-4">
                      <p className="text-[10px] text-slate-500 flex items-center gap-1.5 text-center">
                        <ShieldCheck size={12} className="text-slate-400" />
                        Privasi Anda terjaga. Kami tidak melakukan spam.
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
