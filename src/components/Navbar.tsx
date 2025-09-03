"use client";

import { useState, useEffect } from "react";
import LogoImage from "../assets/icons/lodji.svg";
import MenuIcon from "../assets/icons/menu.svg";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-white/60 backdrop-blur-xl border-b border-white/30 shadow-md py-2"
          : "bg-white/30 backdrop-blur-md border-b border-white/10 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center transition-all duration-500 ease-in-out">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LogoImage
            className={`transition-all duration-500 ease-in-out ${
              scrolled ? "h-8 w-8" : "h-10 w-10"
            }`}
          />
          <span
            className={`font-bold tracking-tight transition-all duration-500 ease-in-out ${
              scrolled ? "text-lg text-slate-800" : "text-xl text-slate-900"
            }`}
          >
            Villa Lodjisvarga Seturan
          </span>
        </div>

        {/* Desktop Menu */}
        <nav
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700"
          role="navigation"
          aria-label="Main menu"
        >
          <a href="#hero" className="hover:text-amber-500 transition-colors">
            Beranda
          </a>
          <a href="#benefit" className="hover:text-amber-500 transition-colors">
            Benefit
          </a>
          <a
            href="#fasilitas"
            className="hover:text-amber-500 transition-colors"
          >
            Fasilitas Unit
          </a>
          <a href="#lokasi" className="hover:text-amber-500 transition-colors">
            Lokasi
          </a>
          <a href="#faq" className="hover:text-amber-500 transition-colors">
            FAQ
          </a>
          <a
            href="https://wa.me/6283144940611?text=Halo%20saya%20ingin%20tanya-tanya%20tentang%20Villa%20Lodji%20Svarga%202&utm_source=landingpage&utm_medium=chat_button&utm_campaign=info_request"
            className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-full transition-all duration-300 ease-in-out shadow-md"
          >
            Booking Sekarang
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden border border-slate-400/40 p-2 rounded-lg bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all duration-300 ease-in-out"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle mobile menu"
        >
          <MenuIcon className="h-6 w-6 text-slate-700" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-4 px-4 pb-6 pt-3 text-sm font-medium text-slate-800 bg-white/70 backdrop-blur-xl rounded-b-2xl shadow-lg">
          <a href="#hero" className="hover:text-amber-500 transition-colors">
            Beranda
          </a>
          <a href="#benefit" className="hover:text-amber-500 transition-colors">
            Benefit
          </a>
          <a
            href="#fasilitas"
            className="hover:text-amber-500 transition-colors"
          >
            Fasilitas Unit
          </a>
          <a href="#lokasi" className="hover:text-amber-500 transition-colors">
            Lokasi
          </a>
          <a href="#faq" className="hover:text-amber-500 transition-colors">
            FAQ
          </a>
          <a
            href="https://wa.me/6283144940611?text=Halo%20saya%20ingin%20tanya-tanya%20tentang%20Villa%20Lodji%20Svarga%202&utm_source=landingpage&utm_medium=chat_button&utm_campaign=info_request"

            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full text-center transition-all duration-300 ease-in-out shadow-md"
          >
            Booking Sekarang
          </a>
        </nav>
      </div>
    </header>
  );
};
