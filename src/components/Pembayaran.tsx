'use client';

import { formatRupiah } from '../lib/formatRupiah';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, CheckCircle } from 'lucide-react';

const payments = [
  { title: 'Booking Fee', amount: 5_000_000 },
  { title: 'DP 50%', amount: 182_500_000 },
  { title: 'Termin 1', amount: 93_750_000 },
  { title: 'Termin 2', amount: 93_750_000 },
];

export default function PaymentSchedulePage() {
  const total = payments.reduce((sum, item) => sum + item.amount, 0);

  const totalPendapatan = 12_000_000;
  const biayaOperasional = totalPendapatan * 0.25;
  const profitBersih = totalPendapatan - biayaOperasional;
  const investorShare = profitBersih * 0.7;
  const pengelolaShare = profitBersih * 0.3;

  return (
    <section id="pembayaran" className="py-24 bg-slate-50" aria-labelledby="pembayaran-heading">
      <div className="container px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 id="pembayaran-heading" className="text-4xl sm:text-5xl font-extrabold text-slate-900">
            Skema Pembayaran<span className="text-yellow-400"> & Keuntungan</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Rancang alur pembayaran properti Anda secara mudah dan transparan, serta lihat potensi profit secara jelas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Kolom Kiri: Skema Pembayaran */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
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
                  <h3 className="font-semibold text-lg text-slate-700">{item.title}</h3>
                  <p className="text-2xl font-bold text-slate-900">{formatRupiah(item.amount)}</p>
                </div>
              </div>
            ))}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 rounded-2xl shadow-2xl text-center">
                <h3 className="text-xl font-bold text-yellow-400 flex items-center justify-center gap-2">
                  <Wallet className="w-6 h-6" /> Total Harga
                </h3>
                <p className="mt-2 text-4xl font-extrabold">{formatRupiah(total)}</p>
            </div>
          </motion.div>

          {/* Kolom Kanan: Skema Bagi Hasil */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 sticky top-24"
          >
            <h2 id="bagi-hasil-heading" className="text-3xl font-bold text-center mb-8 text-slate-900">
              Skema <span className="text-yellow-400">Bagi Hasil Investasi</span>
            </h2>
            <div className="space-y-4">
                <div className="flex justify-between items-center text-lg">
                    <h3 className="font-semibold text-slate-700">Perkiraan Pendapatan / Bulan</h3>
                    <p className="font-bold text-slate-800">{formatRupiah(totalPendapatan)}</p>
                </div>
                <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                    <h3 className="text-slate-700">Biaya Operasional (25%)</h3>
                    <p className="text-slate-600">
                      <span className="font-bold text-red-500">- {formatRupiah(biayaOperasional)}</span>
                    </p>
                </div>
                <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                    <h3 className="text-slate-700">Sisa Profit Bersih</h3>
                    <p className="font-bold text-slate-800">{formatRupiah(profitBersih)}</p>
                </div>

                {/* Bagi Hasil */}
                <div className="border-t-2 border-dashed border-slate-300 pt-6 mt-6">
                    <h3 className="font-semibold text-center text-lg text-slate-700 mb-6">🔄 Skema Profit Sharing</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="bg-green-100 text-green-900 p-6 rounded-xl text-center shadow-sm">
                          <p className="font-bold text-lg flex items-center justify-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" /> Investor (70%)
                          </p>
                          <p className="text-3xl font-extrabold text-green-600 mt-2">{formatRupiah(investorShare)}</p>
                      </div>
                      <div className="bg-slate-100 text-slate-800 p-6 rounded-xl text-center shadow-sm">
                          <p className="font-bold text-lg">Pengelola (30%)</p>
                          <p className="text-2xl font-extrabold text-slate-700 mt-2">{formatRupiah(pengelolaShare)}</p>
                      </div>
                    </div>
                </div>
            </div>

            {/* Catatan */}
            <div className="mt-8 bg-yellow-50 text-yellow-800 text-sm p-4 rounded-lg border border-yellow-200">
                <p className="font-medium">📝 Catatan:</p>
                <p className="mt-1">
                  Angka di atas adalah estimasi berdasarkan okupansi & tarif rata-rata. 
                  Bagi hasil ditransfer bulanan langsung ke rekening pemilik unit.
                </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
