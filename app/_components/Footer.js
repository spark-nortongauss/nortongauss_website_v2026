"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-content",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-black text-white py-20 px-6 md:px-12 border-t border-white/10 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-900/30 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-purple-900/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto footer-content">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-bold tracking-tighter mb-4">
              NORTON-GAUSS
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Engineering Intelligence into Operations.
              <br />
              We build autonomous, self-healing operational systems for the
              enterprise.
            </p>
            <div className="flex gap-4">
              {/* Placeholder Social Icons */}
              {["LinkedIn", "Twitter", "GitHub"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-xs uppercase tracking-widest"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">
              Solutions
            </h3>
            <ul className="space-y-4">
              {["ObservOne", "SalesHub", "Automation Core", "NOC/SOC AI"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">
              Services
            </h3>
            <ul className="space-y-4">
              {[
                "Digital Strategy",
                "Cloud & Edge",
                "Gen AI & Agents",
                "Observability",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / CTA Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">
              Company
            </h3>
            <ul className="space-y-4 mb-8">
              {["About Us", "Careers", "Contact", "Partners"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium tracking-wide group"
            >
              Book a Strategy Call
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Norton-Gauss Inc. All rights
            reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
