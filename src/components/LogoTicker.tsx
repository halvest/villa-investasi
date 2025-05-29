import Image from 'next/image';
import Interior from "../assets/images/living-room2.jpg";
import PrivatePool from "../assets/images/private-pool.jpg";
import LivingRoom from "../assets/images/living-room.jpg";
import Bedroom from "../assets/images/bedroom.jpg";
import Bathroom from "../assets/images/bathroom.jpg";
import Pantry from "../assets/images/mini-pantry.jpg";

const fasilitas = [
  { src: Interior, alt: "Interior Villa", label: "Interior" },
  { src: PrivatePool, alt: "Kolam Renang", label: "Private Pool" },
  { src: LivingRoom, alt: "Living Room", label: "Living Room" },
  { src: Bedroom, alt: "Kamar Tidur", label: "Bedroom" },
  { src: Bathroom, alt: "Kamar Mandi", label: "Bathroom" },
  { src: Pantry, alt: "Mini Pantry", label: "Mini Pantry" },
];

export const FasilitasSection = () => {
  return (
    <section className="bg-white text-[#2E2E2E] py-[72px] sm:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Fasilitas Villa <span className="text-yellow-500">Lodji Svarga 2</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {fasilitas.map((item, index) => (
            <div key={index} className="relative group">
              {/* Frame Aesthetic */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-white transition-transform duration-300 group-hover:scale-[1.03] group-hover:shadow-2xl">
                <Image
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Label dengan gaya floating */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md text-sm px-4 py-1 rounded-full shadow-md border border-gray-300 font-semibold">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
