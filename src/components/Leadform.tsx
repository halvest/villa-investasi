'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, MapPin, Phone, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabaseClient';

const phonePattern = /^(?:\+62|0)[0-9]{9,14}$/;

export const LeadForm: React.FC = () => {
  const [form, setForm] = useState({
    nama: '',
    domisili: '',
    whatsapp: '',
    keterangan: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nama || !form.whatsapp || !form.domisili) {
      toast.error('Nama Lengkap, Domisili, dan No. WhatsApp wajib diisi.');
      return;
    }
    if (!phonePattern.test(form.whatsapp)) {
      toast.error('Format Nomor WhatsApp tidak valid.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('leads')
        .insert({
          nama: form.nama.trim(),
          domisili: form.domisili.trim(),
          whatsapp: form.whatsapp.trim(),
          keterangan: form.keterangan.trim(),
        });

      if (error) throw new Error(error.message);

      toast.success('✅ Data berhasil dikirim! Tim kami akan segera menghubungi Anda.');

      // Reset form
      setForm({ nama: '', domisili: '', whatsapp: '', keterangan: '' });

    } catch (error) {
      console.error('Error saat submit ke Supabase:', error);
      toast.error('❌ Gagal mengirim data. Silakan coba lagi nanti.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 max-w-lg mx-auto p-8">
        <h2 className="text-3xl font-bold text-slate-900 text-center">
          Tertarik Berinvestasi?
        </h2>
        <p className="mt-2 text-slate-600 mb-8 text-center">
          Isi formulir di bawah ini untuk konsultasi gratis atau dapatkan simulasi ROI dari{' '}
          <strong className="text-yellow-600">Villa Lodjisvarga Seturan</strong>.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Input Nama */}
          <div className="relative">
            <label htmlFor="nama" className="block text-sm font-semibold text-slate-700 mb-1">
              Nama
            </label>
            <User className="absolute left-3 top-10 w-5 h-5 text-slate-400" />
            <input
              id="nama"
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Contoh: Budi"
              aria-label="Nama"
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-500 transition"
              required
            />
          </div>

          {/* Input Domisili */}
          <div className="relative">
            <label htmlFor="domisili" className="block text-sm font-semibold text-slate-700 mb-1">
              Domisili
            </label>
            <MapPin className="absolute left-3 top-10 w-5 h-5 text-slate-400" />
            <input
              id="domisili"
              type="text"
              name="domisili"
              value={form.domisili}
              onChange={handleChange}
              placeholder="Contoh: Jakarta"
              aria-label="Domisili"
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-500 transition"
              required
            />
          </div>

          {/* Input WhatsApp */}
          <div className="relative">
            <label htmlFor="whatsapp" className="block text-sm font-semibold text-slate-700 mb-1">
              No. WhatsApp Aktif
            </label>
            <Phone className="absolute left-3 top-10 w-5 h-5 text-slate-400" />
            <input
              id="whatsapp"
              type="tel"
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              placeholder="08xx / 628xx"
              aria-label="Nomor WhatsApp"
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-500 transition"
              required
            />
          </div>

          {/* Input Keterangan */}
          <div className="relative">
            <label htmlFor="keterangan" className="block text-sm font-semibold text-slate-700 mb-1">
              Keterangan Tambahan (Opsional)
            </label>
            <MessageSquare className="absolute left-3 top-10 w-5 h-5 text-slate-400" />
            <textarea
              id="keterangan"
              name="keterangan"
              value={form.keterangan}
              onChange={handleChange}
              rows={3}
              placeholder="Contoh: Saya ingin info lebih lanjut tentang ROI dan legalitas."
              aria-label="Keterangan tambahan"
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-500 transition"
            />
          </div>

          {/* Tombol Submit */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-yellow-500 text-slate-900 font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-yellow-400 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
            {isSubmitting ? 'Mengirim...' : 'Kirim Sekarang'}
          </motion.button>
        </form>
      </div>
    </div>
  );
};
