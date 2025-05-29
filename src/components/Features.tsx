'use client';

export const LocationDetail = () => {
  return (
    <main className="bg-white text-gray-900 min-h-screen py-12 px-6 sm:px-12 lg:px-24 max-w-5xl mx-auto">
      {/* Judul */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 tracking-tight">
        Lokasi Villa <span className="text-yellow-400">Lodji Svarga 2</span>
      </h1>

      {/* Container untuk iframe dengan shadow & rounded */}
      <div className="overflow-hidden rounded-xl shadow-lg mb-12 ring-1 ring-yellow-300">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3953.146395340698!2d110.4034854750049!3d-7.774297092245212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwNDYnMjcuNSJTIDExMMKwMjQnMjEuOCJF!5e0!3m2!1sen!2sid!4v1748560710288!5m2!1sen!2sid"
          title="Lokasi Villa Lodji Svarga 2"
          className="w-full h-[450px] sm:h-[500px]"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Deskripsi */}
      <p className="text-center max-w-3xl mx-auto text-gray-700 text-lg sm:text-xl leading-relaxed">
        Villa Lodji Svarga 2 berlokasi di kawasan premium Yogyakarta yang mudah diakses, dekat pusat pendidikan, hiburan, dan fasilitas umum. Cocok untuk investasi maupun hunian yang nyaman.
      </p>
    </main>
  );
};
