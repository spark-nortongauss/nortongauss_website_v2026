"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function Navbar() {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Navigation links with dropdown flags
  const navLinks = [
    { name: "Home", href: "/", hasDropdown: false },
    { name: "Industries", href: "/industries", hasDropdown: true },
    { name: "Services", href: "/services", hasDropdown: true },
    { name: "Solutions", href: "/solutions", hasDropdown: true },
    { name: "Insights", href: "/insights", hasDropdown: false },
    { name: "About", href: "/about", hasDropdown: false },
    { name: "Careers", href: "/careers", hasDropdown: false },
    { name: "Contact", href: "/contact", hasDropdown: false },
  ];

  // Dropdown menu data
  const dropdownMenus = {
    Industries: [
      {
        title: "Financial Services",
        description: "Banking and fintech solutions",
        href: "/industries/financial-services",
      },
      {
        title: "Healthcare",
        description: "Medical and healthcare systems",
        href: "/industries/healthcare",
      },
      {
        title: "Retail & E-commerce",
        description: "Online retail platforms",
        href: "/industries/retail",
      },
      {
        title: "Technology",
        description: "Tech sector solutions",
        href: "/industries/technology",
      },
    ],
    Services: [
      {
        title: "Consulting",
        description: "Strategic business consulting",
        href: "/services/consulting",
      },
      {
        title: "Development",
        description: "Custom software development",
        href: "/services/development",
      },
      {
        title: "Integration",
        description: "System integration services",
        href: "/services/integration",
      },
      {
        title: "Support",
        description: "24/7 technical support",
        href: "/services/support",
      },
    ],
    Solutions: [
      {
        title: "Cloud Solutions",
        description: "Scalable cloud infrastructure",
        href: "/solutions/cloud",
      },
      {
        title: "AI & Analytics",
        description: "Data-driven insights",
        href: "/solutions/ai-analytics",
      },
      {
        title: "Security",
        description: "Enterprise security solutions",
        href: "/solutions/security",
      },
      {
        title: "Automation",
        description: "Business process automation",
        href: "/solutions/automation",
      },
    ],
  };

  // GSAP animation effect
  useEffect(() => {
    if (activeDropdown) {
      const timeline = gsap.timeline();

      // Animate overlay fade in
      timeline.fromTo(
        ".navbar-overlay",
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // Animate dropdown slide down and fade in
      timeline.fromTo(
        ".dropdown-container",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.2" // Start slightly before overlay finishes
      );

      // Stagger animate menu items
      timeline.fromTo(
        ".dropdown-item",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" },
        "-=0.2"
      );
    }
  }, [activeDropdown]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 py-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <img
              src="/NG_Logo_Colour_50x50.png"
              alt="Logo"
              className="h-16 w-16 object-contain"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-4 xl:space-x-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.hasDropdown ? (
                <div
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  className="cursor-pointer"
                >
                  <span
                    className={`text-lg xl:text-[26px] font-normal font-techno-nue transition-colors duration-200 ${
                      pathname === link.href || activeDropdown === link.name
                        ? "text-[#D8FF36]"
                        : "text-white hover:text-[#D8FF36]"
                    }`}
                  >
                    {link.name}
                  </span>
                </div>
              ) : (
                <Link
                  href={link.href}
                  className={`text-lg xl:text-[26px] font-normal font-techno-nue transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-[#D8FF36]"
                      : "text-white hover:text-[#D8FF36]"
                  }`}
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Book a Call Button */}
        <div>
          <Link
            href="/book-a-call"
            className="bg-[#D8FF36] text-black text-lg xl:text-[26px] font-normal font-techno-nue px-4 py-2 xl:px-6 xl:py-2 rounded-full hover:bg-white transition-colors duration-200 whitespace-nowrap"
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

      {/* Background Overlay */}
      {activeDropdown && (
        <div
          className="navbar-overlay fixed inset-0 bg-black z-40"
          style={{ top: "6.5rem" }}
          onMouseEnter={() => setActiveDropdown(null)}
        />
      )}

      {/* Dropdown Container */}
      {activeDropdown && (
        <div
          className="dropdown-container fixed left-0 right-0 z-45 bg-[#0a0a0a]"
          style={{ top: "6.5rem" }}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="max-w-7xl mx-auto px-10 py-8">
            <div className="flex justify-center gap-8 flex-wrap">
              {dropdownMenus[activeDropdown].map((item) => (
                <Link
                  href={item.href}
                  className="dropdown-item flex flex-col max-w-xs group cursor-pointer"
                  key={item.title}
                >
                  <h3 className="text-white text-xl xl:text-2xl font-techno-nue font-normal mb-2 group-hover:text-[#D8FF36] transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm xl:text-base">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
