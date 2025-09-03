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
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/40 backdrop-blur-xl border-b border-white/30 shadow-lg py-2"
          : "bg-white/20 backdrop-blur-md border-b border-white/20 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center transition-all duration-300">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LogoImage
            className={`transition-all duration-300 ${
              scrolled ? "h-8 w-8" : "h-10 w-10"
            }`}
          />
          <span
            className={`font-bold tracking-tight transition-all duration-300 ${
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
          <a href="#promo" className="hover:text-amber-500 transition-colors">
            Promo
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
            href="#booking"
            className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-full transition-colors shadow-md"
          >
            Booking Sekarang
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden border border-slate-400/40 p-2 rounded-lg bg-white/30 backdrop-blur-sm hover:bg-white/50 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle mobile menu"
        >
          <MenuIcon className="h-6 w-6 text-slate-700" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden backdrop-blur-xl border-t border-white/20 transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-4 px-4 pb-6 pt-3 text-sm font-medium text-slate-800 bg-white/40 backdrop-blur-xl rounded-b-2xl shadow-md">
          <a href="#promo" className="hover:text-amber-500 transition-colors">
            Promo
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
            href="#booking"
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full text-center transition-colors shadow-md"
          >
            Booking Sekarang
          </a>
        </nav>
      </div>
    </header>
  );
};
