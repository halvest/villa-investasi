'use client';

import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { formatRupiah } from './lib/formatRupiah';

export function BEPCalculator() {
  const [price, setPrice] = useState<number>(375_000_000);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(6_300_000);
  const [selectedYear, setSelectedYear] = useState<number>(1);

  const yearlyIncome = monthlyIncome * 12;
  const maxYear = 20;

  const totalIncomeByYear = Array.from({ length: maxYear }, (_, i) => (i + 1) * yearlyIncome);
  const bepIndex = totalIncomeByYear.findIndex((income) => income >= price);
  const bepYear = bepIndex !== -1 ? bepIndex + 1 : null;
  const totalIncomeAtSelectedYear = totalIncomeByYear[selectedYear - 1] ?? 0;
  const roiAfterMaxYear = totalIncomeByYear[maxYear - 1] - price;
  const roiPercent = ((roiAfterMaxYear / price) * 100).toFixed(2);
  const progress = Math.min((totalIncomeAtSelectedYear / price) * 100, 100);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-[#F8FBF5] border border-[#D8E3CE] rounded-3xl shadow-xl p-8 space-y-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#4A6B45]">
          📈 Simulasi Break Even Point (Balik Modal)
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Panel */}
          <div className="space-y-6">
            {/* Harga Villa */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-[#3B4A3A] mb-1">
                Harga Villa
              </label>
              <NumericFormat
                id="price"
                value={price}
                allowNegative={false}
                thousandSeparator="."
                decimalSeparator=","
                prefix="Rp"
                className="w-full rounded-xl border border-[#B1C29E] bg-white px-4 py-3 text-[#3B4A3A] focus:outline-none focus:ring-2 focus:ring-[#8FA87A]"
                onValueChange={({ floatValue }) => setPrice(floatValue ?? 0)}
              />
            </div>

            {/* Passive Income */}
            <div>
              <label htmlFor="income" className="block text-sm font-medium text-[#3B4A3A] mb-1">
                Passive Income / Bulan
              </label>
              <NumericFormat
                id="income"
                value={monthlyIncome}
                allowNegative={false}
                thousandSeparator="."
                decimalSeparator=","
                prefix="Rp"
                className="w-full rounded-xl border border-[#B1C29E] bg-white px-4 py-3 text-[#3B4A3A] focus:outline-none focus:ring-2 focus:ring-[#8FA87A]"
                onValueChange={({ floatValue }) => setMonthlyIncome(floatValue ?? 0)}
              />
            </div>

            {/* Tahun Slider */}
            <div>
              <label htmlFor="yearSlider" className="block text-sm font-medium text-[#3B4A3A] mb-2">
                Simulasi Tahun: <span className="text-[#4A6B45] font-semibold">Tahun ke-{selectedYear}</span>
              </label>
              <Slider
                min={1}
                max={maxYear}
                value={selectedYear}
                onChange={(value) => setSelectedYear(Number(value))}
                trackStyle={{ backgroundColor: '#4A6B45', height: 6 }}
                handleStyle={{
                  borderColor: '#4A6B45',
                  height: 20,
                  width: 20,
                  marginTop: -7,
                  backgroundColor: '#4A6B45',
                }}
                railStyle={{ backgroundColor: '#D1D5DB', height: 6 }}
              />
              <p className="mt-2 text-sm text-stone-600">
                Total passive income tahun ke-{selectedYear}:{' '}
                <strong>{formatRupiah(totalIncomeAtSelectedYear)}</strong>
              </p>
            </div>
          </div>

          {/* Output Panel */}
          <div className="bg-white border border-[#CFE0C2] rounded-xl p-6 space-y-6 shadow-sm">
            {/* Progress Bar */}
            <div>
              <p className="text-sm font-medium text-[#3B4A3A] mb-1">Progress Menuju BEP</p>
              <div className="relative h-4 bg-[#E3EEDF] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#7BAF6D] transition-all duration-500 ease-in-out"
                  style={{ width: `${progress}%` }}
                />
                <div className="absolute inset-0 flex justify-center text-xs text-[#4A6B45] pt-0.5 font-semibold">
                  {progress.toFixed(1)}%
                </div>
              </div>
            </div>

            {/* BEP Info */}
            <div className="bg-[#F1F8EB] border border-[#B9D6AA] rounded-lg px-4 py-3 text-sm text-[#2F5E27] font-medium space-y-2">
              {bepYear ? (
                <>
                  <p>
                    ✅ Anda akan <strong>balik modal</strong> pada{' '}
                    <span className="font-bold text-[#2F5E27]">tahun ke-{bepYear}</span>.
                  </p>
                  <p>
                    Total income saat BEP:{' '}
                    <strong>{formatRupiah(totalIncomeByYear[bepYear - 1])}</strong>
                  </p>
                </>
              ) : (
                <p className="text-[#92400e]">
                  ⚠️ Belum balik modal dalam {maxYear} tahun. Total income:{' '}
                  <strong>{formatRupiah(totalIncomeByYear[maxYear - 1])}</strong>
                </p>
              )}
            </div>

            {/* ROI Estimation */}
            {roiAfterMaxYear > 0 && (
              <div className="bg-[#eaf4dd] text-[#3B4A3A] border border-[#C6D9B8] rounded-lg px-4 py-2 text-sm">
                ROI setelah {maxYear} tahun: <strong>{formatRupiah(roiAfterMaxYear)}</strong> (
                {roiPercent}%)
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
