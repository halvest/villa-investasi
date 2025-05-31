'use client';

import Image from 'next/image';
import InstaIcon from '../assets/icons/instagram.png';
import TiktokIcon from '../assets/icons/tiktok.png';
import FacebookIcon from '../assets/icons/facebook.png';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-900 text-white/70 border-t border-white/25 py-10">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left Text */}
        <div className="text-sm text-center sm:text-left select-none text-white/60">
          © {currentYear} Haspro Agency. All rights reserved.
        </div>

        {/* Social Media Icons */}
        <nav>
          <ul className="flex gap-6 items-center justify-center">
            {/* Instagram */}
            <li>
              <a
                href="https://www.instagram.com/hasproagency"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:opacity-80 transition-opacity duration-300"
              >
                <Image src={InstaIcon} alt="Instagram" width={24} height={24} />
              </a>
            </li>

            {/* TikTok */}
            <li>
              <a
                href="https://www.tiktok.com/@hasproagency_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="hover:opacity-80 transition-opacity duration-300"
              >
                <Image src={TiktokIcon} alt="TikTok" width={24} height={24} />
              </a>
            </li>

            {/* Facebook */}
            <li>
              <a
                href="https://www.facebook.com/hasproagency1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:opacity-80 transition-opacity duration-300"
              >
                <Image src={FacebookIcon} alt="Facebook" width={24} height={24} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};
