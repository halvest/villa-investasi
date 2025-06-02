'use client';

import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { formatRupiah } from './lib/formatRupiah';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';

const MAX_YEAR = 20;
const OPERATIONAL_COST_PERCENTAGE = 0.25;
const INVESTOR_SHARE_PERCENTAGE = 0.7;

export function BEPCalculator() {
  const [price, setPrice] = useState(375_000_000);
  const [rentPerDay, setRentPerDay] = useState(1_000_000);
  const [occupiedDays, setOccupiedDays] = useState(12);
  const [selectedYear, setSelectedYear] = useState(1);

  const grossMonthly = rentPerDay * occupiedDays;
  const operationalCost = grossMonthly * OPERATIONAL_COST_PERCENTAGE;
  const netMonthly = grossMonthly - operationalCost;
  const investorMonthly = netMonthly * INVESTOR_SHARE_PERCENTAGE;
  const yearlyIncome = investorMonthly * 12;

  const totalIncomeByYear = Array.from({ length: MAX_YEAR }, (_, i) => (i + 1) * yearlyIncome);
  const bepIndex = totalIncomeByYear.findIndex((income) => income >= price);
  const bepYear = bepIndex !== -1 ? bepIndex + 1 : null;
  const totalIncomeNow = totalIncomeByYear[selectedYear - 1] ?? 0;
  const roiAfterMax = totalIncomeByYear[MAX_YEAR - 1] - price;
  const roiPercent = ((roiAfterMax / price) * 100).toFixed(2);
  const progress = Math.min((totalIncomeNow / price) * 100, 100);

  const roiChartData = totalIncomeByYear.map((value, i) => ({
    year: `Tahun ${i + 1}`,
    pendapatan: Math.round(value),
  }));

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-6 sm:p-10 space-y-10">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <LabeledInput label="Harga Villa" value={price} onChange={setPrice} />
            <LabeledInput label="Harga Sewa / Hari" value={rentPerDay} onChange={setRentPerDay} />
            <SliderInput
              label="Hari Terisi / Bulan"
              value={occupiedDays}
              min={0}
              max={30}
              onChange={setOccupiedDays}
              hint={`${occupiedDays} hari x ${formatRupiah(rentPerDay)} = ${formatRupiah(grossMonthly)} / bulan`}
            />
            <SliderInput
              label={`Simulasi Tahun ke-${selectedYear}`}
              value={selectedYear}
              min={1}
              max={MAX_YEAR}
              onChange={setSelectedYear}
              hint={`Pendapatan investor tahun ke-${selectedYear}: ${formatRupiah(totalIncomeNow)}`}
            />
          </div>
          <IncomeBreakdown
            gross={grossMonthly}
            operational={operationalCost}
            net={netMonthly}
            investor={investorMonthly}
            bepYear={bepYear}
            totalIncomeByYear={totalIncomeByYear}
            progress={progress}
            price={price}
          />
        </div>
        <ROIChart data={roiChartData} price={price} />
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
        🏡 Kalkulator ROI Investasi Villa Lodji Svarga 2
      </h2>
      <p className="text-gray-500 text-base max-w-2xl mx-auto">
        Simulasikan potensi pengembalian investasi Anda dengan visualisasi modern dan data transparan.
      </p>
    </div>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <NumericFormat
        value={value}
        allowNegative={false}
        thousandSeparator="."
        decimalSeparator=","
        prefix="Rp"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        onValueChange={({ floatValue }) => onChange(floatValue ?? 0)}
      />
    </div>
  );
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  hint,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  hint: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <Slider
        min={min}
        max={max}
        value={value}
        onChange={(v) => onChange(Number(v))}
        trackStyle={{ backgroundColor: '#22c55e', height: 6 }}
        handleStyle={{
          borderColor: '#22c55e',
          height: 20,
          width: 20,
          marginTop: -7,
          backgroundColor: '#22c55e',
        }}
        railStyle={{ backgroundColor: '#D1D5DB', height: 6 }}
      />
      <p className="mt-2 text-sm text-gray-500">{hint}</p>
    </div>
  );
}

function IncomeBreakdown({
  gross,
  operational,
  net,
  investor,
  bepYear,
  totalIncomeByYear,
  progress,
  price,
}: {
  gross: number;
  operational: number;
  net: number;
  investor: number;
  bepYear: number | null;
  totalIncomeByYear: number[];
  progress: number;
  price: number;
}) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4 shadow-inner">
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <p>💰 Pendapatan Kotor:</p>
        <p className="text-right font-medium">{formatRupiah(gross)} / bulan</p>
        <p>🔧 Biaya Operasional (25%):</p>
        <p className="text-right">{formatRupiah(operational)}</p>
        <p>💼 Pendapatan Bersih:</p>
        <p className="text-right">{formatRupiah(net)}</p>
        <p>👤 Investor (70%):</p>
        <p className="text-right">{formatRupiah(investor)} / bulan</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">Progress Menuju Balik Modal</p>
        <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-green-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
          <span className="absolute w-full text-center text-xs font-semibold text-white">
            {progress.toFixed(1)}%
          </span>
        </div>
      </div>
      <div className="bg-green-100 border border-green-300 rounded-lg p-4 text-sm text-green-900 font-medium">
        {bepYear ? (
          <>
            <p>📈 Estimasi balik modal di <strong>tahun ke-{bepYear}</strong></p>
            <p>Total akumulasi saat BEP: <strong>{formatRupiah(totalIncomeByYear[bepYear - 1])}</strong></p>
          </>
        ) : (
          <p className="text-red-600">
            ⚠️ Belum balik modal dalam {MAX_YEAR} tahun (Total: {formatRupiah(totalIncomeByYear[MAX_YEAR - 1])})
          </p>
        )}
      </div>
    </div>
  );
}

function ROIChart({ data, price }: { data: any[]; price: number }) {
  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">📊 Proyeksi ROI Investor</h3>
      <p className="text-sm text-gray-500 mb-4">
        Grafik ini menunjukkan proyeksi pertumbuhan akumulasi pendapatan investor.
      </p>
      <div className="w-full h-80 bg-white rounded-xl border border-gray-200 shadow-inner p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              tickFormatter={(val: string) => {
                const yearNum = parseInt(val.replace('Tahun ', ''), 10);
                return yearNum === 1 || yearNum % 5 === 0 ? `Tahun ${yearNum}` : '';
              }}
              interval={0}
            />
            <YAxis
  tickFormatter={(val) => {
    if (val >= 1_000_000_000) {
      return `Rp${(val / 1_000_000_000).toFixed(1)}m`;
    } else if (val >= 1_000_000) {
      return `Rp${(val / 1_000_000).toFixed(0)}jt`;
    } else {
      return `Rp${val.toLocaleString('id-ID')}`;
    }
  }}
/>

            <Tooltip
              formatter={(val: number) => formatRupiah(val)}
              contentStyle={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                borderColor: '#e5e7eb',
              }}
            />
            <ReferenceLine
              y={price}
              stroke="#ef4444"
              strokeDasharray="5 5"
              label={{
                value: 'Modal Awal',
                position: 'insideTopRight',
                fill: '#ef4444',
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="pendapatan"
              stroke="#22c55e"
              fillOpacity={1}
              fill="url(#colorIncome)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
