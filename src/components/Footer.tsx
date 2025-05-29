import InstaIcon from "../assets/icons/insta.svg";
import XIcon from "../assets/icons/x-social.svg";
import LinkedInIcon from "../assets/icons/linkedin.svg";
import YoutubeIcon from "../assets/icons/youtube.svg";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white/70 border-t border-white/25 py-8">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-sm sm:text-left text-center text-white/70 select-none">
          © {currentYear} Eldora UI. All rights reserved.
        </div>

        <nav>
          <ul className="flex gap-6">
            <li>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                <XIcon className="w-6 h-6" />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                <LinkedInIcon className="w-6 h-6" />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                <InstaIcon className="w-6 h-6" />
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                <YoutubeIcon className="w-6 h-6" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};
