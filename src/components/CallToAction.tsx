// app/components/LeadForm.tsx
"use client";

import { useState } from "react";

export const LeadForm = () => {
  const [form, setForm] = useState({
    nama: "",
    whatsapp: "",
    keterangan: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Contoh logika kirim data, bisa disesuaikan ke backend/API/WA
    alert(`Data dikirim:\nNama: ${form.nama}\nWA: ${form.whatsapp}\nKeterangan: ${form.keterangan}`);
    
    // Reset form (opsional)
    setForm({ nama: "", whatsapp: "", keterangan: "" });
  };

  return (
    <section className="bg-gradient-to-b from-white to-yellow-300 text-black py-[72px] sm:py-24">
      <div className="container px-4 max-w-xl mx-auto">
        <h2 className="text-4xl sm:text-5xl text-center font-bold tracking-tight mb-12">
          Tertarik Investasi? Hubungi Kami!
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-lg space-y-6"
        >
          <div>
            <label htmlFor="nama" className="block font-semibold mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="nama"
              id="nama"
              value={form.nama}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Contoh: Andi Saputra"
            />
          </div>

          <div>
            <label htmlFor="whatsapp" className="block font-semibold mb-1">
              No WhatsApp
            </label>
            <input
              type="tel"
              name="whatsapp"
              id="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Contoh: 081234567890"
            />
          </div>

          <div>
            <label htmlFor="keterangan" className="block font-semibold mb-1">
              Keterangan Tambahan
            </label>
            <textarea
              name="keterangan"
              id="keterangan"
              value={form.keterangan}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Contoh: Saya tertarik untuk mendapatkan simulasi ROI."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Kirim Sekarang
          </button>
        </form>
      </div>
    </section>
  );
};
