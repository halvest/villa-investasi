'use client';

import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { formatRupiah } from '../components/lib/formatRupiah';

export function BEPCalculator() {
  const [price, setPrice] = useState<number>(375_000_000);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(6_250_000);
  const [selectedYear, setSelectedYear] = useState<number>(1);

  const yearlyIncome = monthlyIncome * 12;
  const years = Array.from({ length: 20 }, (_, i) => i + 1);
  const totalIncomes = years.map((year) => yearlyIncome * year);
  const bepIndex = totalIncomes.findIndex((val) => val >= price);
  const bepYear = bepIndex !== -1 ? bepIndex + 1 : 20; // Max 20 tahun

  return (
    <div className="rounded-xl border border-stone-300 bg-white p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4">Simulasi BEP (Break Even Point)</h3>

      <div className="mb-4">
        <label className="block text-sm mb-1" htmlFor="price">
          Harga Villa
        </label>
        <NumericFormat
          id="price"
          value={price}
          thousandSeparator="."
          decimalSeparator=","
          prefix="Rp"
          allowNegative={false}
          className="w-full rounded border px-3 py-2"
          onValueChange={(values) => setPrice(values.floatValue ?? 0)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-1" htmlFor="income">
          Passive Income per Bulan
        </label>
        <NumericFormat
          id="income"
          value={monthlyIncome}
          thousandSeparator="."
          decimalSeparator=","
          prefix="Rp"
          allowNegative={false}
          className="w-full rounded border px-3 py-2"
          onValueChange={(values) => setMonthlyIncome(values.floatValue ?? 0)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-1" htmlFor="yearSlider">
          Simulasi Tahun
        </label>
        <div className="px-2">
          <Slider
            min={1}
            max={20}
            value={selectedYear}
            onChange={(value) => setSelectedYear(Number(value))}
            trackStyle={{ backgroundColor: '#10b981', height: 6 }}
            handleStyle={{
              borderColor: '#10b981',
              height: 20,
              width: 20,
              marginTop: -7,
              backgroundColor: '#10b981',
            }}
            railStyle={{ backgroundColor: '#d1d5db', height: 6 }}
          />
        </div>
        <div className="mt-2 text-sm text-stone-600">
          Tahun ke-{selectedYear} → Total income:{' '}
          <strong>{formatRupiah(totalIncomes[selectedYear - 1] ?? 0)}</strong>
        </div>
      </div>

      <div className="mt-6 text-sm text-green-700 font-medium">
        {bepIndex !== -1 ? (
          <>
            Balik modal dalam <strong>{bepYear} tahun</strong> (
            {formatRupiah(totalIncomes[bepYear - 1] ?? 0)})
          </>
        ) : (
          <>
            Belum balik modal dalam 20 tahun (
            {formatRupiah(totalIncomes[19])})
          </>
        )}
      </div>
    </div>
  );
}
