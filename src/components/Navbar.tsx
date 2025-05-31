"use client";

import { useState } from "react";
import LogoImage from "../assets/icons/lodji.svg";
import MenuIcon from "../assets/icons/menu.svg";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#E8ECE4]/95 backdrop-blur-md shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <LogoImage className="h-10 w-10" />
          <span className="text-xl font-bold text-[#445B47] tracking-tight">Villa Lodjisvarga 2</span>
        </div>

        {/* Desktop Menu */}
        <nav
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[#445B47]"
          role="navigation"
          aria-label="Main menu"
        >
          <a href="#promo" className="hover:text-[#8CA58D] transition-colors">Promo</a>
          <a href="#benefit" className="hover:text-[#8CA58D] transition-colors">Benefit</a>
          <a href="#fasilitas" className="hover:text-[#8CA58D] transition-colors">Fasilitas Unit</a>
          <a href="#lokasi" className="hover:text-[#8CA58D] transition-colors">Lokasi</a>
          <a href="#faq" className="hover:text-[#8CA58D] transition-colors">FAQ</a>
          <a
            href="#booking"
            className="bg-[#445B47] hover:bg-[#384E3D] text-white px-5 py-2 rounded-full transition-colors shadow-md"
          >
            Booking Sekarang
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden border border-[#445B47] p-2 rounded-lg hover:bg-[#f0f4ef] transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle mobile menu"
        >
          <MenuIcon className="h-6 w-6 text-[#445B47]" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-4 px-4 pb-6 pt-2 text-sm font-medium text-[#445B47] bg-[#E8ECE4]">
          <a href="#promo" className="hover:text-[#8CA58D] transition-colors">Promo</a>
          <a href="#benefit" className="hover:text-[#8CA58D] transition-colors">Benefit</a>
          <a href="#fasilitas" className="hover:text-[#8CA58D] transition-colors">Fasilitas Unit</a>
          <a href="#lokasi" className="hover:text-[#8CA58D] transition-colors">Lokasi</a>
          <a href="#faq" className="hover:text-[#8CA58D] transition-colors">FAQ</a>
          <a
            href="#booking"
            className="bg-[#445B47] hover:bg-[#384E3D] text-white px-4 py-2 rounded-full text-center transition-colors shadow-sm"
          >
            Booking Sekarang
          </a>
        </nav>
      </div>
    </header>
  );
};
