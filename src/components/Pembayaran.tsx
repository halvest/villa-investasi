"use client";

import { useState, useEffect, useRef } from "react";
import { formatRupiah } from "../lib/formatRupiah";
import { motion } from "framer-motion";
import {
  Wallet,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowDown,
  User,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabaseClient";

// --- Helper Timer ---
const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;
};

// --- KOMPONEN FORMULIR PROMO (Disamakan dengan LeadForm) ---
const InlinePromoForm = () => {
  const [form, setForm] = useState({
    nama: "",
    domisili: "",
    whatsapp: "",
    jadwal: "",
    keterangan: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const today = new Date().toISOString().split("T")[0];

  // Timer Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phonePattern = /^(?:\+62|0)[0-9]{9,14}$/;

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
      // Logic Gabung Jadwal ke Keterangan
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

      // Insert Supabase
      const { error } = await supabase.from("leads").insert({
        nama: form.nama.trim(),
        domisili: form.domisili.trim(),
        whatsapp: form.whatsapp.trim(),
        keterangan: finalKeterangan,
        source: "Promo Pembayaran (Inline)",
        status: "Baru",
      });

      if (error) throw new Error(error.message);

      // Notifikasi Telegram
      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          jadwal: form.jadwal,
        }),
      }).catch((err) => console.error("Gagal notif telegram:", err));

      // Pixel Tracking
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", {
          content_name: "Promo Villa 375jt",
          value: 15000000,
          currency: "IDR",
        });
      }

      toast.success("Diskon berhasil dikunci! Tim kami akan menghubungi Anda.");
      setForm({
        nama: "",
        domisili: "",
        whatsapp: "",
        jadwal: "",
        keterangan: "",
      });
    } catch (error: any) {
      console.error("Submit Error:", error);
      toast.error("Gagal kirim data: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 relative">
      {/* Header Visual (Disamakan dengan LeadForm Popup) */}
      <div className="bg-slate-900 relative text-white overflow-hidden p-6">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-amber-500">
          <Sparkles size={100} />
        </div>

        {/* Timer Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-amber-500 text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide flex items-center gap-2 shadow-lg animate-pulse">
            <Clock size={14} />
            <span>Promo Berakhir: {formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
            Selamat! <span className="text-2xl">🎉</span>
          </h3>
          <p className="text-sm text-slate-300 mb-6">
            Anda terpilih mendapatkan{" "}
            <span className="text-amber-400 font-semibold">DISKON HARGA</span>.
            Isi form di bawah untuk mendapatkan harga spesial ini.
          </p>

          {/* Price Comparison Card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center relative backdrop-blur-md">
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
      <div className="px-6 py-8 bg-slate-50">
        <form onSubmit={handleSubmit} className="space-y-4">
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
            {!form.jadwal && (
              <span
                onClick={() => dateInputRef.current?.showPicker()}
                className="absolute left-10 top-3.5 text-sm text-slate-400 pointer-events-none bg-white pr-2"
              >
                Rencana Cek Lokasi
              </span>
            )}
          </div>

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
    </div>
  );
};

// --- DATA PEMBAYARAN ---
const payments = [
  { title: "Booking Fee", amount: 5_000_000 },
  { title: "DP 50%", amount: 187_500_000 },
  { title: "Termin 1", amount: 96_250_000 },
  { title: "Termin 2", amount: 96_250_000 },
];

export default function PaymentSchedulePage() {
  const total = payments.reduce((sum, item) => sum + item.amount, 0);

  const totalPendapatan = 12_000_000;
  const biayaOperasional = totalPendapatan * 0.25;
  const profitBersih = totalPendapatan - biayaOperasional;
  const investorShare = profitBersih * 0.7;
  const pengelolaShare = profitBersih * 0.3;

  return (
    <section
      id="pembayaran"
      className="py-24 bg-slate-50"
      aria-labelledby="pembayaran-heading"
    >
      <div className="container px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1
            id="pembayaran-heading"
            className="text-4xl sm:text-5xl font-extrabold text-slate-900"
          >
            Skema Pembayaran
            <span className="text-yellow-400"> & Keuntungan</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Rancang alur pembayaran properti Anda secara mudah dan transparan,
            serta lihat potensi profit secara jelas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Kolom Kiri: Skema Pembayaran */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full space-y-6"
          >
            {payments.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 flex items-center gap-5 hover:shadow-xl transition"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 text-yellow-600 font-bold text-xl flex items-center justify-center rounded-full">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-700">
                    {item.title}
                  </h3>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatRupiah(item.amount)}
                  </p>
                </div>
              </div>
            ))}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 rounded-2xl shadow-2xl text-center">
              <h3 className="text-xl font-bold text-yellow-400 flex items-center justify-center gap-2">
                <Wallet className="w-6 h-6" /> Total Harga
              </h3>
              <p className="mt-2 text-4xl font-extrabold">
                {formatRupiah(total)}
              </p>
            </div>

            {/* --- FORM PROMO (DITARUH DISINI) --- */}
            <InlinePromoForm />
          </motion.div>

          {/* Kolom Kanan: Skema Bagi Hasil */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 sticky top-24"
          >
            <h2
              id="bagi-hasil-heading"
              className="text-3xl font-bold text-center mb-8 text-slate-900"
            >
              Skema{" "}
              <span className="text-yellow-400">Bagi Hasil Investasi</span>
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg">
                <h3 className="font-semibold text-slate-700">
                  Perkiraan Pendapatan / Bulan
                </h3>
                <p className="font-bold text-slate-800">
                  {formatRupiah(totalPendapatan)}
                </p>
              </div>
              <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                <h3 className="text-slate-700">Biaya Operasional (25%)</h3>
                <p className="text-slate-600">
                  <span className="font-bold text-red-500">
                    - {formatRupiah(biayaOperasional)}
                  </span>
                </p>
              </div>
              <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                <h3 className="text-slate-700">Sisa Profit Bersih</h3>
                <p className="font-bold text-slate-800">
                  {formatRupiah(profitBersih)}
                </p>
              </div>

              {/* Bagi Hasil */}
              <div className="border-t-2 border-dashed border-slate-300 pt-6 mt-6">
                <h3 className="font-semibold text-center text-lg text-slate-700 mb-6">
                  🔄 Skema Profit Sharing
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-green-100 text-green-900 p-6 rounded-xl text-center shadow-sm">
                    <p className="font-bold text-lg flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />{" "}
                      Investor (70%)
                    </p>
                    <p className="text-3xl font-extrabold text-green-600 mt-2">
                      {formatRupiah(investorShare)}
                    </p>
                  </div>
                  <div className="bg-slate-100 text-slate-800 p-6 rounded-xl text-center shadow-sm">
                    <p className="font-bold text-lg">Pengelola (30%)</p>
                    <p className="text-2xl font-extrabold text-slate-700 mt-2">
                      {formatRupiah(pengelolaShare)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Catatan */}
            <div className="mt-8 bg-yellow-50 text-yellow-800 text-sm p-4 rounded-lg border border-yellow-200">
              <p className="font-medium">📝 Catatan:</p>
              <p className="mt-1">
                Angka di atas adalah estimasi berdasarkan okupansi & tarif
                rata-rata. Bagi hasil ditransfer bulanan langsung ke rekening
                pemilik unit.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
