'use client';

import React, { useState, useMemo } from 'react';
import { NumericFormat } from 'react-number-format';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Calendar, ChevronDown } from 'lucide-react';

// --- Helper Function ---
const formatRupiah = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

// --- Konstanta ---
const MODAL_INVESTASI = 375_000_000;
const BIAYA_OPERASIONAL_PERSEN = 0.25;
const BAGI_HASIL_INVESTOR_PERSEN = 0.7;

export function BEPCalculator() {
  const [hargaSewa, setHargaSewa] = useState(600_000);
  const [hariTerisi, setHariTerisi] = useState(20);
  const [showDetails, setShowDetails] = useState(false);

  // --- Kalkulasi Inti ---
  const { pendapatanKotor, biayaOperasional, profitBersih, investorBulanan, bepTahun } = useMemo(() => {
    const gross = hariTerisi * hargaSewa;
    const operational = gross * BIAYA_OPERASIONAL_PERSEN;
    const net = gross - operational;
    const investor = net * BAGI_HASIL_INVESTOR_PERSEN;
    const tahunan = investor * 12;
    const bep = tahunan > 0 ? MODAL_INVESTASI / tahunan : 0;
    return {
      pendapatanKotor: gross,
      biayaOperasional: operational,
      profitBersih: net,
      investorBulanan: investor,
      bepTahun: bep > 0 ? bep.toFixed(1) : 'N/A',
    };
  }, [hargaSewa, hariTerisi]);

  return (
    <section
      id="kalkulator"
      className="py-20 bg-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(250,204,21,0.08),rgba(255,255,255,0))]"
      aria-labelledby="kalkulator-heading"
    >
      <div className="container px-6 mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center mb-14"
        >
          <h2
            id="kalkulator-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white"
          >
            Kalkulasi <span className="text-yellow-400">Balik Modal</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Simulasikan potensi keuntungan pasif dari investasi villa Anda.
          </p>
        </motion.div>

        {/* Card Kalkulator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="max-w-3xl mx-auto bg-slate-800/40 backdrop-blur-lg p-6 sm:p-10 rounded-3xl shadow-2xl border border-white/20"
        >
          {/* Hasil Utama */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
            <div>
              <p className="text-sm sm:text-base font-semibold text-yellow-300 flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5" /> Profit Bersih / Bulan
              </p>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mt-2 drop-shadow-lg">
                {formatRupiah(investorBulanan)}
              </p>
            </div>
            <div>
              <p className="text-sm sm:text-base font-semibold text-yellow-300 flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" /> Estimasi Balik Modal
              </p>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mt-2 drop-shadow-lg">
                {bepTahun} <span className="text-lg sm:text-xl text-slate-300">Tahun</span>
              </p>
            </div>
          </div>

          {/* Input & Slider */}
          <div className="space-y-8 my-10 border-y border-white/10 py-8">
            <div>
              <label className="block text-base font-bold text-white mb-2">
                Harga Sewa / Malam
              </label>
              <NumericFormat
                value={hargaSewa}
                onValueChange={({ floatValue }) => setHargaSewa(floatValue ?? 0)}
                thousandSeparator="."
                decimalSeparator=","
                prefix="Rp "
                className="w-full px-4 py-3 text-lg sm:text-xl font-semibold bg-white/5 border-2 border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
              />
            </div>

            <div>
              <label className="block text-base font-bold text-white mb-3">
                Hari Terisi / Bulan
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Slider
                  min={1}
                  max={30}
                  value={hariTerisi}
                  onChange={(v) => setHariTerisi(Number(v))}
                  trackStyle={{ backgroundColor: '#facc15', height: 8 }}
                  handleStyle={{
                    borderColor: '#facc15',
                    height: 24,
                    width: 24,
                    marginTop: -8,
                    backgroundColor: '#facc15',
                    boxShadow: '0 0 0 4px rgba(30, 41, 59, 0.5)',
                  }}
                  railStyle={{ backgroundColor: 'rgba(255,255,255,0.1)', height: 8 }}
                />
                <span className="text-xl sm:text-2xl font-bold text-white px-4 py-2 rounded-lg border border-white/20 bg-white/5">
                  {hariTerisi} hari
                </span>
              </div>
            </div>
          </div>

          {/* Detail Breakdown */}
          <div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex justify-center items-center gap-2 text-sm sm:text-base font-semibold text-yellow-300 hover:text-white transition-colors"
            >
              <span>Lihat Rincian Perhitungan</span>
              <motion.div animate={{ rotate: showDetails ? 180 : 0 }}>
                <ChevronDown />
              </motion.div>
            </button>
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: '20px' }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="text-white/80 overflow-hidden"
                >
                  <div className="space-y-3 bg-black/20 p-6 rounded-lg">
                    <div className="flex justify-between">
                      <span>Pendapatan Kotor Bulanan:</span>
                      <span className="font-semibold text-white">
                        {formatRupiah(pendapatanKotor)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Biaya Operasional (25%):</span>
                      <span className="font-semibold text-red-400">
                        - {formatRupiah(biayaOperasional)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-white/20 pt-3 mt-3">
                      <span>Profit Bersih (sblm. bagi hasil):</span>
                      <span className="font-semibold text-white">
                        {formatRupiah(profitBersih)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
