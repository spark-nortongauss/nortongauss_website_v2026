"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Industries", href: "/industries" },
    { name: "Services", href: "/services" },
    { name: "Solutions", href: "/solutions" },
    { name: "Insights", href: "/insights" },
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 py-6">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/">
          {/* Assuming logo is available from preloader work, but user provided image shows 'C' logo. 
               The user uploaded 'uploaded_media_0' which shows 'C' logo. 
               I will placeholder it with the text or the previous logo if applicable, 
               but strictly the request says "implement the navbar only" and "You have all the existing colors".
               The image shows an icon. I will use a simple text or logic for now, or just the NG logo from preloader if appropriate.
               Wait, the user said @[public/NG_Logo_Colour_50x50.png] in previous turn. I'll use that as logo foundation.
           */}
          <img
            src="/NG_Logo_Colour_50x50.png"
            alt="Logo"
            className="h-16 w-16 object-contain"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center space-x-8">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={`text-[26px] font-normal font-techno-nue transition-colors duration-200 ${
                pathname === link.href
                  ? "text-[#D8FF36]"
                  : "text-white hover:text-[#D8FF36]"
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Book a Call Button */}
      <div>
        <Link
          href="/book-a-call"
          className="bg-[#D8FF36] text-black text-[26px] font-normal font-techno-nue px-6 py-2 rounded-full hover:bg-white transition-colors duration-200"
        >
          Book a Call
        </Link>
      </div>

      <style jsx global>{`
        .font-techno-nue {
          font-family: "Techno_Nue", sans-serif;
        }
      `}</style>
    </nav>
  );
}
