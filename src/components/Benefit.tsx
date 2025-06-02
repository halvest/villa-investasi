'use client';

import Head from 'next/head';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export function VillaBenefitsPage() {
  const benefits = [
    {
      title: 'Full Furnished',
      desc: 'Interior modern & lengkap. Tidak perlu renovasi atau tambahan biaya. Bisa langsung menghasilkan.',
    },
    {
      title: 'Lokasi Premium',
      desc: 'Hanya Rp375 juta untuk villa eksklusif di Seturan, Sleman – dekat kampus, pusat kuliner, dan wisata.',
    },
    {
      title: 'Passive Income',
      desc: 'Potensi penghasilan hingga Rp6 juta per bulan dari penyewaan, dikelola secara profesional.',
    },
    {
      title: 'Balik Modal Cepat',
      desc: 'ROI optimal – proyeksi pengembalian dalam 5 tahun dengan estimasi pendapatan Rp75 juta/tahun.',
    },
    {
      title: '12x Free Stay per Tahun',
      desc: 'Nikmati villa Anda pribadi 12 kali setiap tahun – cocok untuk liburan keluarga selama 20 tahun ke depan.',
    },
    {
      title: 'Manajemen Profesional',
      desc: 'Tidak perlu repot. Tim kami menangani reservasi, kebersihan, hingga pemasaran secara menyeluruh.',
    },
  ];

  return (
    <>
      <Head>
        <title>Keunggulan Investasi Villa di Jogja | Villa Lodji Svarga 2</title>
        <meta
          name="description"
          content="Temukan benefit eksklusif investasi villa di Seturan, Jogja. Full furnished, ROI tinggi, dan dikelola profesional. Mulai hanya Rp375 juta!"
        />
        <meta
          name="keywords"
          content="investasi villa Jogja, villa Lodji Svarga, passive income Jogja, properti Sleman, ROI properti Jogja, villa dekat UPN Jogja"
        />
        <meta property="og:title" content="Investasi Villa di Jogja - Villa Lodji Svarga 2" />
        <meta
          property="og:description"
          content="Miliki villa eksklusif dengan potensi cuan hingga Rp6 juta/bulan. Lokasi premium, pengelolaan profesional, dan full furnished."
        />
        <meta property="og:image" content="https://www.haspro.me/og-image.jpg" />
        <meta property="og:url" content="https://www.haspro.me/benefit" />
        <link rel="canonical" href="https://www.haspro.me/benefit" />
      </Head>

      <main className="bg-[#E8ECE4] text-[#2E2E2E]">
        {/* Transition */}
        <div className="h-12 bg-gradient-to-b from-transparent to-[#E8ECE4]" />

        {/* Benefit Section */}
        <section
          id="benefit"
          aria-label="Keunggulan Investasi Villa Lodji Svarga 2"
          className="py-24 px-4 sm:px-8 max-w-7xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-[#445B47] mb-12 leading-tight">
            Benefit Investasi di Villa Lodji Svarga 2
          </h2>

          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-[#D5DACF] rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition duration-300"
              >
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle className="text-[#7A9E7E] w-6 h-6 mt-1" aria-hidden="true" />
                  <h3 className="text-xl font-semibold text-[#2E3E2D]">{item.title}</h3>
                </div>
                <p className="text-base text-[#444] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#445B47] py-20 px-6 text-white text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-snug">
            Siap Miliki <span className="text-yellow-300">Villa Investasi</span> Anda?
          </h2>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-8 text-white/90">
            Hubungi kami sekarang untuk informasi lengkap dan jadwal survei lokasi.
            <br className="hidden sm:block" />
            Kesempatan terbatas — jangan sampai terlewat!
          </p>

          <a
            href="https://wa.me/6283144940611?text=Halo%20saya%20ingin%20tanya-tanya%20tentang%20Villa%20Lodji%20Svarga%202&utm_source=landingpage&utm_medium=chat_button&utm_campaign=benefit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#445B47] font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-md hover:bg-[#f0f4ef] transition duration-300 text-base sm:text-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.52 3.48A11.958 11.958 0 0012 0C5.373 0 0 5.373 0 12a11.94 11.94 0 001.608 6.01L0 24l6.144-1.608A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12a11.958 11.958 0 00-3.48-8.52zm-8.52 18c-1.615 0-3.169-.39-4.56-1.128l-.325-.174-3.648.96.974-3.556-.212-.366A9.97 9.97 0 012 12C2 6.486 6.486 2 12 2c2.668 0 5.157 1.038 7.038 2.922A9.935 9.935 0 0122 12c0 5.514-4.486 10-10 10zm5.38-7.57c-.295-.148-1.742-.859-2.012-.956-.271-.098-.47-.148-.669.148-.197.295-.768.956-.941 1.154-.174.197-.346.222-.64.074-.295-.148-1.246-.459-2.373-1.462-.878-.782-1.47-1.748-1.641-2.043-.174-.296-.018-.456.13-.603.134-.132.297-.347.446-.521.149-.174.198-.297.297-.495.099-.198.05-.371-.025-.52-.075-.148-.669-1.611-.916-2.204-.242-.582-.487-.502-.669-.512-.174-.009-.372-.011-.57-.011-.198 0-.52.074-.793.371-.272.297-1.042 1.016-1.042 2.48s1.066 2.873 1.215 3.069c.148.198 2.099 3.204 5.088 4.491.71.306 1.263.489 1.694.626.712.226 1.361.194 1.872.118.571-.085 1.742-.712 1.99-1.4.248-.69.248-1.282.174-1.4-.074-.119-.271-.198-.566-.346z" />
            </svg>
            Konsultasi via WhatsApp
          </a>
        </section>
      </main>
    </>
  );
}
