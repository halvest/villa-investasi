"use client";

import { useState } from "react";
import LogoImage from "../assets/icons/logo.svg";
import MenuIcon from "../assets/icons/menu.svg";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <LogoImage className="h-10 w-10" />
          <span className="text-xl font-bold text-gray-900">Lodji Svarga 2</span>
        </div>

        {/* Desktop Menu */}
        <nav
          className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700"
          role="navigation"
          aria-label="Main menu"
        >
          <a href="#promo" className="hover:text-pink-600 transition-colors">Promo</a>
          <a href="#keunggulan" className="hover:text-pink-600 transition-colors">Benefit</a>
          <a href="#unit" className="hover:text-pink-600 transition-colors">Fasilitas Unit</a>
          <a href="#lokasi" className="hover:text-pink-600 transition-colors">Lokasi</a>
          <a href="#faq" className="hover:text-pink-600 transition-colors">FAQ</a>
          <a
            href="#booking"
            className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-lg transition-colors shadow-sm"
          >
            Booking Sekarang
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden border border-gray-300 p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle mobile menu"
        >
          <MenuIcon className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-4 px-4 pb-6 pt-2 text-sm font-medium text-gray-700">
          <a href="#promo" className="hover:text-pink-600 transition-colors">Promo</a>
          <a href="#keunggulan" className="hover:text-pink-600 transition-colors">Benefit</a>
          <a href="#unit" className="hover:text-pink-600 transition-colors">Fasilitas Unit</a>
          <a href="#lokasi" className="hover:text-pink-600 transition-colors">Lokasi</a>
          <a href="#faq" className="hover:text-pink-600 transition-colors">FAQ</a>
          <a
            href="#booking"
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-center transition-colors"
          >
            Booking Sekarang
          </a>
        </nav>
      </div>
    </header>
  );
};
