"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    window.open("https://wa.me/6283144940611", "_blank"); // ganti nomor WA
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popup Bubble */}
      {open && (
        <div className="relative mb-3 max-w-xs bg-[#dcf8c6] rounded-3xl p-4 animate-fadeIn shadow-green-glow">
          {/* Tombol Close */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>

          {/* Isi pesan */}
          <p className="text-sm text-gray-800 pr-6">
            Halo 👋 <br />
            Tertarik dengan{" "}
            <span className="font-semibold text-green-700">
              Investasi Villa
            </span>
            ? Yuk diskusi langsung via WhatsApp!
          </p>

          {/* Tombol WA */}
          <button
            onClick={handleClick}
            className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-xl transition-all duration-300 shadow-md"
          >
            Chat Sekarang
          </button>

          {/* Tail Bubble */}
          <div className="absolute -bottom-2 right-6 w-5 h-5 bg-[#dcf8c6] rounded-bl-3xl rotate-45 border-r border-b border-green-300"></div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-xl transition-all duration-300 animate-float shadow-green-glow"
      >
        <MessageCircle size={28} className="relative z-10" />
      </button>

      {/* Animasi & Glow */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        .shadow-green-glow {
          box-shadow: 0 0 15px rgba(34, 197, 94, 0.4),
            0 0 30px rgba(34, 197, 94, 0.3);
        }
      `}</style>
    </div>
  );
}
