import colors from "@/const/colors";
import MASJID from "@/content/masjid";
import React from "react";
import Logo from "./Logo2";
import IMG from "@/content/img";

interface FooterProps {
  contact?: {
    address: string;
    email: string;
    whatsapp: string; // full link e.g. https://wa.me/6281234567890
  };
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  contact = {
    address: `${MASJID.ALAMAT}`,
    email: `${MASJID.EMAIL}`,
    whatsapp: `${MASJID.WA}`,
    waMe: `${MASJID.WA_ME}`,
  },
  className = "",
}) => {
  return (
    <footer
      className={`w-full text-white pt-6 pb-4 px-6 ${className}`}
      style={{ backgroundColor: colors.primary }}
    >
      {/* Bagian Atas */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start">
        {/* Logo */}
        <Logo img={IMG.LOGO_WHITE} />

        {/* Kontak */}
        <div className="text-lg text-right">
          <div className="text-4xl font-semibold mb-2">Contact</div>
          <div className="w-[100px] h-px bg-white ml-auto mb-4"></div>
          <div className="mb-1">{contact.address}</div>
          <div className="mb-1">
            <a
              href={`mailto:${contact.email}`}
              className="underline hover:text-gray-100"
            >
              {contact.email}
            </a>
          </div>
          <div>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-100"
            >
              {contact.whatsapp}
            </a>
          </div>
        </div>
      </div>

      {/* Garis Horizontal */}
      <hr className="my-4 border-t border-white opacity-50" />

      {/* Bagian Bawah */}
      <div className="text-xs text-center">
        MOSQUENET © 2025 - All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
