"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Script from "next/script";

const Hero = () => {
  const heroRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const tagsRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    // GSAP Animations
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1.2 },
    });

    tl.fromTo(
      title1Ref.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.5 },
    )
      .fromTo(
        title2Ref.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=1",
      )
      .fromTo(
        tagsRef.current?.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1 },
        "-=0.8",
      )
      .fromTo(
        descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.8",
      )
      .fromTo(
        btnRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1 },
        "-=0.6",
      );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-black flex flex-col justify-start pt-32 md:pt-36 px-6 md:px-20"
    >
      <Script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@1.12.42/build/spline-viewer.js"
      />

      {/* Background 3D Scene */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <spline-viewer
          url="https://prod.spline.design/DPOTOKwHkxuxDRd0/scene.splinecode"
          loading-anim-type="spinner-small-dark"
        ></spline-viewer>
      </div>

      {/* Content Container - pointer-events-none to let clicks pass to canvas, but children auto */}
      <div className="relative z-10 flex flex-col items-start gap-2 max-w-5xl pointer-events-none">
        <div className="overflow-hidden">
          <h1
            ref={title1Ref}
            className="text-[12vw] md:text-[8rem] font-bold leading-[0.85] tracking-tight uppercase pointer-events-auto"
          >
            CLOUD
          </h1>
        </div>

        <div className="overflow-hidden ml-[10vw]">
          <h1
            ref={title2Ref}
            className="text-[12vw] md:text-[8rem] font-bold leading-[0.85] tracking-tight uppercase pointer-events-auto"
          >
            & EDGE
          </h1>
        </div>

        {/* Tags */}
        <div
          ref={tagsRef}
          className="flex flex-wrap gap-4 mt-6 pointer-events-auto"
        >
          {["PUBLIC", "HYBRID", "ON-PREM"].map((tag) => (
            <span
              key={tag}
              className="px-6 py-1.5 border border-white/30 rounded-full text-[10px] md:text-xs font-semibold tracking-widest text-white/70 hover:bg-white hover:text-black transition-all cursor-crosshair"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p
          ref={descRef}
          className="max-w-md mt-4 text-sm md:text-base text-white/50 leading-relaxed font-sans pointer-events-auto"
        >
          Norton-Gauss provides seamless cloud and edge solutions that empower
          your business with high-performance computing and intelligent data
          management.
        </p>

        {/* CTA Button */}
        <div className="mt-8 pointer-events-auto">
          <button
            ref={btnRef}
            className="bg-brand text-black px-12 py-4 rounded-full font-bold text-sm md:text-lg tracking-wider uppercase hover:scale-105 active:scale-95 transition-transform"
          >
            KNOW MORE
          </button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 pointer-events-none">
        <span className="text-[10px] tracking-widest uppercase">
          scroll down
        </span>
        <div className="w-[1px] h-10 bg-white animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
