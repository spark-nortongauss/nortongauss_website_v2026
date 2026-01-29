"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function Navbar() {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileDropdown, setExpandedMobileDropdown] = useState(null);

  // Navigation links with dropdown flags
  const navLinks = [
    { name: "Home", href: "/", hasDropdown: false },
    { name: "Industries", href: "/industries", hasDropdown: true },
    { name: "Services", href: "/services", hasDropdown: true },
    { name: "Solutions", href: "/solutions", hasDropdown: true },
    { name: "Case & Insights", href: "/case-insights", hasDropdown: true },
    { name: "About", href: "/about", hasDropdown: false },
    { name: "Careers", href: "/careers", hasDropdown: false },
    { name: "Contact", href: "/contact", hasDropdown: false },
  ];

  // Dropdown menu data
  const dropdownMenus = {
    Industries: [
      {
        title: "Telecom and Communications",
        description: "",
        href: "/industries/telecom-media-communications",
      },
      {
        title: "Industry & Manufacturing",
        description: "",
        href: "/industries/industry-manufacturing",
      },
      {
        title: "Food & Beverage",
        description: "",
        href: "/industries/food-beverage",
      },
      {
        title: "Logistics & Supply Chain",
        description: "",
        href: "/industries/logistics-supply-chain",
      },
      {
        title: "Retail & Ecommerce",
        description: "",
        href: "/industries/retail-ecommerce",
      },
    ],
    Services: [
      {
        title: "Digital Strategy & Transformation",
        description: "",
        href: "/services/digital-strategy-transformation",
      },
      {
        title: "Cloud & Edge",
        description: "",
        href: "/services/cloud-edge",
      },
      {
        title: "Gen AI & Agents",
        description: "",
        href: "/services/gen-ai-agents",
      },
      {
        title: "Automation & RPA",
        description: "",
        href: "/services/automation-rpa",
      },
      {
        title: "Observability & Monitoring",
        description: "",
        href: "/services/observability-monitoring",
      },
    ],
    Solutions: [
      {
        title: "ObservOne",
        description: "",
        href: "/solutions/observone",
      },
      {
        title: "Zylo (commercial proposals automation)",
        description: "",
        href: "/solutions/zylo",
      },
    ],
    "Case & Insights": [
      {
        title: "Gen AI & Agents",
        description: "",
        href: "/case-insights/gen-ai-agents",
      },
      {
        title: "Automation & RPA",
        description: "",
        href: "/case-insights/automation-rpa",
      },
      {
        title: "Cloud & Edge",
        description: "",
        href: "/case-insights/cloud-edge",
      },
      {
        title: "Digital Strategy & Automation",
        description: "",
        href: "/case-insights/digital-strategy-automation",
      },
    ],
  };

  // GSAP animation effect for desktop dropdown
  useEffect(() => {
    if (activeDropdown) {
      const timeline = gsap.timeline();

      // Animate overlay fade in
      timeline.fromTo(
        ".navbar-overlay",
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );

      // Animate dropdown fade in (container remains static)
      timeline.fromTo(
        ".dropdown-container",
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.2", // Start slightly before overlay finishes
      );

      // Animate menu items from bottom (no stagger to avoid left-to-right wave)
      timeline.fromTo(
        ".dropdown-item",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.2",
      );
    }
  }, [activeDropdown]);

  // GSAP animation effect for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      const timeline = gsap.timeline();

      // Animate mobile menu slide down
      timeline.fromTo(
        ".mobile-menu",
        { y: "-100%" },
        { y: 0, duration: 0.5, ease: "power3.out" },
      );

      // Stagger animate menu items from top
      timeline.fromTo(
        ".mobile-nav-item",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" },
        "-=0.3",
      );
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setExpandedMobileDropdown(null);
  }, [pathname]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-10 py-6 lg:py-12">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <img
              src="/NG_Logo_Colour_50x50.png"
              alt="Logo"
              className="h-12 w-12 md:h-16 md:w-16 object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center space-x-4 xl:space-x-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.hasDropdown ? (
                <div
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  className="cursor-pointer"
                >
                  <span
                    className={`text-lg xl:text-[18px] font-normal font-techno-nue transition-colors duration-200 ${
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
                  onMouseEnter={() => setActiveDropdown(null)}
                  className={`text-lg xl:text-[18px] font-normal font-techno-nue transition-colors duration-200 ${
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

        {/* Desktop Book a Call Button */}
        <div className="hidden lg:block">
          <Link
            href="/book-a-call"
            className="bg-[#D8FF36] text-black text-lg xl:text-[18px] font-bold font-techno-nue px-4 py-2 xl:px-6 xl:py-2 rounded-full hover:bg-white transition-colors duration-200 whitespace-nowrap"
          >
            Book a Call
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden flex flex-col items-center justify-center w-10 h-10 space-y-1.5 z-50"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>

        <style jsx global>{`
          .font-techno-nue {
            font-family: "Techno_Nue", sans-serif;
          }
        `}</style>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu fixed top-0 left-0 w-full h-screen bg-black z-40 overflow-y-auto pt-24 px-6">
          <ul className="flex flex-col space-y-6">
            {navLinks.map((link, index) => (
              <li key={link.name} className="mobile-nav-item">
                {link.hasDropdown ? (
                  <div>
                    <div
                      onClick={() =>
                        setExpandedMobileDropdown(
                          expandedMobileDropdown === link.name
                            ? null
                            : link.name,
                        )
                      }
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <span className="text-2xl md:text-3xl font-normal font-techno-nue text-white">
                        {link.name}
                      </span>
                      <svg
                        className={`w-6 h-6 text-white transition-transform duration-300 ${
                          expandedMobileDropdown === link.name
                            ? "rotate-180"
                            : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    {expandedMobileDropdown === link.name && (
                      <ul className="mt-4 ml-4 space-y-3">
                        {dropdownMenus[link.name].map((item) => (
                          <li key={item.title}>
                            <Link
                              href={item.href}
                              className="flex flex-col group"
                            >
                              <span className="text-lg font-techno-nue text-white group-hover:text-[#D8FF36] transition-colors duration-200">
                                {item.title}
                              </span>
                              <span className="text-sm text-gray-400">
                                {item.description}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`text-2xl md:text-3xl font-normal font-techno-nue transition-colors duration-200 ${
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

          {/* Mobile Book a Call Button */}
          <div className="mt-8 mobile-nav-item">
            <Link
              href="/book-a-call"
              className="block text-center bg-[#D8FF36] text-black text-xl font-bold font-techno-nue px-6 py-3 rounded-full hover:bg-white transition-colors duration-200"
            >
              Book a Call
            </Link>
          </div>
        </div>
      )}

      {/* Desktop Background Overlay */}
      {activeDropdown && (
        <div
          className="navbar-overlay hidden lg:block fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          style={{ top: "8rem" }}
          onMouseEnter={() => setActiveDropdown(null)}
        />
      )}

      {/* Desktop Dropdown Container */}
      {activeDropdown && (
        <div
          className="dropdown-container hidden lg:block fixed left-0 right-0 z-45 bg-[#0a0a0a] border-t border-white/20"
          style={{ top: "8rem" }}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="max-w-7xl mx-auto px-10 py-16">
            <div className="flex justify-center gap-12 flex-wrap">
              {dropdownMenus[activeDropdown]?.map((item) => (
                <Link
                  href={item.href}
                  className="dropdown-item flex flex-col max-w-xs group cursor-pointer"
                  key={item.title}
                >
                  <h3 className="text-white text-[16px] font-techno-nue font-normal mb-2 group-hover:text-[#D8FF36] transition-colors duration-200">
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
