'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import VillaImage from '../assets/images/9.jpg';

export function VillaBenefitsPage() {
  const benefits = [
    {
      title: 'Full Furnished & Siap Huni',
      desc: 'Dilengkapi perabotan modern berkualitas – tinggal bawa koper, langsung bisa disewakan atau dihuni.',
    },
    {
      title: 'Harga Terjangkau di Kawasan Premium',
      desc: 'Hanya Rp375 juta untuk villa eksklusif di Seturan – Sleman, dekat kampus dan pusat hiburan.',
    },
    {
      title: 'Passive Income Hingga Rp6 Juta/Bulan',
      desc: 'Dapatkan penghasilan rutin dari penyewaan harian atau bulanan, dikelola oleh tim profesional.',
    },
    {
      title: 'ROI Cepat – Balik Modal Dalam 5 Tahun',
      desc: 'Dengan pemasukan hingga Rp75 juta per tahun, balik modal lebih cepat dengan risiko rendah.',
    },
    {
      title: 'Free Stay 12x per Tahun',
      desc: 'Nikmati villa Anda sendiri untuk liburan keluarga hingga 12 kali setiap tahun, selama 20 tahun!',
    },
    {
      title: 'Dikelola Tim Profesional',
      desc: 'Tidak perlu repot urus tamu, kebersihan, atau promosi – semua sudah ditangani.',
    },
  ];

  return (
    <main className="bg-white text-gray-900">
      <section className="relative h-[60vh] w-full">
        <Image
          src={VillaImage}
          alt="Interior Villa"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          className="brightness-75"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white text-center px-4">
            Detail Keuntungan Memiliki Villa Lodji Svarga 2
          </h1>
        </div>
      </section>

      <section className="py-20 px-6 sm:px-10 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-12">
          Mengapa Investasi Ini Layak Dimiliki?
        </h2>

        <div className="grid sm:grid-cols-2 gap-10">
          {benefits.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-6 rounded-2xl shadow-lg bg-white border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-2 text-yellow-500">
                {item.title}
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
