'use client';

import { formatRupiah } from './lib/formatRupiah';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

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
    <section className="bg-[#445B47] min-h-screen py-16 px-6 text-white">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold leading-snug">
          💵 Skema <span className="text-yellow-300">Pembayaran</span>
        </h1>
        <p className="mt-4 text-lg text-white/90">
          Rancang alur pembayaran properti Anda secara mudah dan transparan.
        </p>
      </div>

      {/* Timeline Pembayaran */}
      <section aria-label="Timeline Pembayaran">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {payments.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-md px-6 py-5 text-[#3B4A3A] flex items-start gap-4"
            >
              <div className="flex-shrink-0 mt-1">
                <CheckCircle className="w-6 h-6 text-[#7BA56E]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-xl font-bold text-[#445B47]">{formatRupiah(item.amount)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Progress Visual */}
      <div className="mt-12" aria-label="Progress Pembayaran">
        <h2 className="text-xl font-semibold text-center mb-6">Visualisasi Tahapan</h2>
        <div className="relative h-3 bg-white/30 rounded-full max-w-2xl mx-auto">
          <div className="absolute top-0 left-0 h-3 bg-yellow-300 rounded-full w-full transition-all" />
        </div>
        <div className="flex justify-between max-w-2xl mx-auto mt-4 text-sm text-white/80">
          {payments.map((item, i) => (
            <span key={i}>{item.title}</span>
          ))}
        </div>
      </div>

      {/* Total Harga */}
      <div className="mt-16 max-w-md mx-auto bg-yellow-300 text-[#3B4A3A] rounded-2xl px-6 py-6 shadow-xl text-center">
        <h3 className="text-xl font-bold">Total Harga</h3>
        <p className="mt-2 text-3xl font-bold">{formatRupiah(total)}</p>
        <p className="text-sm text-[#5D6F5A] mt-1">Termasuk seluruh tahapan pembayaran</p>
      </div>

      {/* Bagi Hasil */}
      <section className="mt-24 max-w-4xl mx-auto text-white" aria-labelledby="bagi-hasil-heading">
        <h2 id="bagi-hasil-heading" className="text-3xl sm:text-4xl font-bold text-center mb-8">
          💰 Skema <span className="text-yellow-300">Bagi Hasil Investasi</span>
        </h2>

        <div className="bg-white/10 rounded-2xl px-6 py-8 space-y-4 text-white/90">
          <div>
            <h3 className="font-semibold text-xl">Perkiraan Pendapatan per Bulan</h3>
            <p className="text-2xl font-bold text-yellow-300">
              {formatRupiah(totalPendapatan)}
            </p>
          </div>

          <div className="border-t border-white/20 pt-4">
            <h3 className="font-semibold text-lg">Biaya Operasional (25%)</h3>
            <p>
              {formatRupiah(totalPendapatan)} × 25% ={' '}
              <span className="font-bold text-white">{formatRupiah(biayaOperasional)}</span>
            </p>
          </div>

          <div className="border-t border-white/20 pt-4">
            <h3 className="font-semibold text-lg">Sisa Profit Bersih</h3>
            <p>
              {formatRupiah(totalPendapatan)} − {formatRupiah(biayaOperasional)} ={' '}
              <span className="font-bold text-white">{formatRupiah(profitBersih)}</span>
            </p>
          </div>

          <div className="border-t border-white/20 pt-4">
            <h3 className="font-semibold text-lg">🔄 Skema Profit Sharing</h3>
            <p>
              Untuk <strong>Pemilik Unit (Investor)</strong> – 70%:{' '}
              <span className="font-bold text-yellow-300">{formatRupiah(investorShare)}</span>
            </p>
            <p>
              Untuk <strong>Pengelola</strong> – 30%:{' '}
              <span className="font-bold text-yellow-300">{formatRupiah(pengelolaShare)}</span>
            </p>
          </div>

          <div className="border-t border-white/20 pt-6 text-sm text-white/70 italic">
            📝 Catatan: Angka di atas merupakan estimasi berdasarkan asumsi rata-rata okupansi dan tarif per bulan.
            <br />
            Bagi hasil dilakukan setiap bulan dan ditransfer langsung ke rekening pemilik unit.
          </div>
        </div>
      </section>
    </section>
  );
}
