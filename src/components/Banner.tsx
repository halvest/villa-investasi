"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function Banner() {
  return (
    <div className="relative top-0 bg-black py-3 text-white md:py-0 border-b border-white/20">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-12 md:flex-row">
        <Link
          href="https://wa.me/6281234567890?text=Halo%2C%20saya%20tertarik%20dengan%20investasi%20Villa%20Lodji%20Svarga%202.%20Boleh%20minta%20info%20lengkapnya%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center text-sm text-white leading-loose font-medium"
        >
          🏡
          <span className="ml-1">
            Tertarik investasi di Villa Lodji Svarga 2? Chat kami sekarang
          </span>
          <ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
