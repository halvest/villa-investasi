'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

const phonePattern = /^(?:\+62|0)\d{9,14}$/;

export const LeadForm: React.FC = () => {
  const [form, setForm] = useState({ nama: '', whatsapp: '', keterangan: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nama = form.nama.trim();
    const whatsapp = form.whatsapp.trim();
    const keterangan = form.keterangan.trim();

    if (!nama || !whatsapp) {
      toast.error('Nama dan WhatsApp wajib diisi.');
      return;
    }

    if (!phonePattern.test(whatsapp)) {
      toast.error('Nomor WhatsApp tidak valid. Harus diawali 0 atau +62 dan 10–15 digit.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, whatsapp, keterangan }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success('✅ Data formulir berhasil dikirim.');
        setForm({ nama: '', whatsapp: '', keterangan: '' });
      } else {
        toast.error('❌ Gagal mengirim data formulir.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('⚠️ Terjadi kesalahan saat mengirim data.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="relative bg-white text-[#3B4A3A] py-20 sm:py-24 overflow-hidden">

      {/* Container */}
      <div className="container px-4 max-w-2xl mx-auto relative z-10">
        <h2 className="text-4xl sm:text-5xl text-center font-bold tracking-tight mb-4 text-[#4A6B45] drop-shadow-md">
          Tertarik Berinvestasi?
        </h2>
        <p className="text-center text-[#5D6E5A] mb-12 text-lg sm:text-xl leading-relaxed font-light">
          Isi formulir di bawah ini untuk konsultasi gratis atau dapatkan simulasi ROI dari{' '}
          <strong className="text-[#4A6B45]">Villa Lodji Svarga 2</strong>.
        </p>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-[#F4F7F1] p-6 sm:p-8 rounded-3xl shadow-2xl border border-[#C2CCB1] space-y-6"
        >
          {/* Nama */}
          <div>
            <label htmlFor="nama" className="block font-medium mb-2 text-[#4A6B45]">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="nama"
              id="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Contoh: Andi Saputra"
              className="w-full px-4 py-3 border border-[#B1C29E] rounded-lg focus:ring-2 focus:ring-[#8FA87A] bg-white text-[#3B4A3A] shadow-sm"
              autoComplete="name"
              required
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label htmlFor="whatsapp" className="block font-medium mb-2 text-[#4A6B45]">
              No WhatsApp Aktif
            </label>
            <input
              type="tel"
              name="whatsapp"
              id="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              placeholder="081234567890 atau +6281234567890"
              className="w-full px-4 py-3 border border-[#B1C29E] rounded-lg focus:ring-2 focus:ring-[#8FA87A] bg-white text-[#3B4A3A] shadow-sm"
              pattern={phonePattern.source}
              title="Nomor WhatsApp harus terdiri dari 10–15 digit angka dan boleh diawali 0 atau +62."
              autoComplete="tel"
              required
            />
          </div>

          {/* Keterangan */}
          <div>
            <label htmlFor="keterangan" className="block font-medium mb-2 text-[#4A6B45]">
              Keterangan Tambahan
            </label>
            <textarea
              name="keterangan"
              id="keterangan"
              value={form.keterangan}
              onChange={handleChange}
              rows={4}
              placeholder="Contoh: Saya ingin info lebih lanjut tentang ROI dan legalitas."
              className="w-full px-4 py-3 border border-[#B1C29E] rounded-lg focus:ring-2 focus:ring-[#8FA87A] bg-white text-[#3B4A3A] shadow-sm"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className={`w-full bg-[#4A6B45] hover:bg-[#3d583d] text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 flex justify-center items-center ${
              isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                <span>Mengirim...</span>
              </div>
            ) : (
              'Kirim Sekarang'
            )}
          </button>
        </form>
      </div>
    </section>
  );
};
