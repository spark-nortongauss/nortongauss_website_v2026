"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Script from "next/script";

const slides = [
  {
    id: 1,
    title1: "CLOUD",
    title2: "& EDGE",
    tags: ["PUBLIC", "HYBRID", "ON-PREM"],
    desc: "Norton-Gauss provides seamless cloud and edge solutions that empower your business with high-performance computing and intelligent data management.",
    splineUrl: "https://prod.spline.design/DPOTOKwHkxuxDRd0/scene.splinecode",
  },
  {
    id: 2,
    title1: "AUTOMATION",
    title2: "& RPA",
    tags: ["INTELLIGENT", "EFFICIENT", "SCALABLE"],
    desc: "Streamline operations with advanced robotic process automation and intelligent workflows designed for the future of work.",
    splineUrl: "/scene_robot.splinecode",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  const isInitialMount = useRef(true);
  const isTransitioning = useRef(false);

  // Refs for animation
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const tagsRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);

  // Auto-switch logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning.current) {
        animateOut(() => {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        });
      }
    }, 8000); // 8 seconds duration

    return () => clearInterval(interval);
  }, []);

  // Animate Out Function
  const animateOut = (callback) => {
    isTransitioning.current = true;
    const tl = gsap.timeline({
      onComplete: () => {
        callback();
        // isTransitioning remains true until animateIn completes
      },
    });

    tl.to(
      [
        title1Ref.current,
        title2Ref.current,
        tagsRef.current?.children,
        descRef.current,
      ],
      {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        stagger: 0.05,
      },
    );
  };

  // Animate In (Triggered by state change)
  useEffect(() => {
    if (isInitialMount.current) {
      // Initial Entrance
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1.2 },
        onComplete: () => {
          isInitialMount.current = false;
        },
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
    } else {
      // Subsequent Slides Entrance
      // Prepare elements (they are currently hidden from animateOut or default state)
      gsap.set(
        [
          title1Ref.current,
          title2Ref.current,
          tagsRef.current?.children,
          descRef.current,
        ],
        { opacity: 0, y: 20 },
      );

      const tlIn = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          isTransitioning.current = false;
        },
      });

      tlIn
        .to(title1Ref.current, { y: 0, opacity: 1, duration: 0.8 })
        .to(title2Ref.current, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
        .to(
          tagsRef.current?.children,
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
          "-=0.6",
        )
        .to(descRef.current, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6");
    }
  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-black flex flex-col justify-start pt-24 md:pt-36 px-6 md:px-20 font-[Techno_Nue]"
    >
      <Script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@1.12.42/build/spline-viewer.js"
      />

      {/* Background 3D Scenes */}
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 z-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
          style={{ pointerEvents: index === currentSlide ? "all" : "none" }}
        >
          <spline-viewer
            url={s.splineUrl}
            loading-anim-type="spinner-small-dark"
          ></spline-viewer>
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-start gap-2 max-w-5xl pointer-events-none">
        <div className="overflow-hidden">
          <h1
            ref={title1Ref}
            className="text-[11vw] md:text-[8rem] font-bold leading-[0.85] tracking-tight uppercase pointer-events-auto font-techno drop-shadow-lg"
          >
            {slide.title1}
          </h1>
        </div>

        <div className="overflow-hidden ml-[10vw]">
          <h1
            ref={title2Ref}
            className="text-[11vw] md:text-[8rem] font-bold leading-[0.85] tracking-tight uppercase pointer-events-auto font-techno drop-shadow-lg"
          >
            {slide.title2}
          </h1>
        </div>

        {/* Tags */}
        <div
          ref={tagsRef}
          className="flex flex-wrap gap-3 md:gap-4 mt-4 md:mt-6 pointer-events-auto"
        >
          {slide.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 md:px-6 md:py-1.5 border border-white/30 rounded-full text-[10px] md:text-xs font-semibold tracking-widest text-white/70 hover:bg-white hover:text-black transition-all cursor-crosshair font-techno"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p
          ref={descRef}
          className="max-w-[90%] md:max-w-md mt-4 text-sm md:text-base text-white/70 md:text-white/50 leading-relaxed font-techno pointer-events-auto drop-shadow-md"
        >
          {slide.desc}
        </p>

        {/* CTA Button */}
        <div className="mt-6 md:mt-8 pointer-events-auto">
          <button
            ref={btnRef}
            className="bg-brand text-black px-8 py-3 md:px-12 md:py-4 rounded-full font-bold text-xs md:text-lg tracking-wider uppercase hover:scale-105 active:scale-95 transition-transform font-techno"
          >
            KNOW MORE
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (currentSlide !== idx && !isTransitioning.current) {
                animateOut(() => setCurrentSlide(idx));
              }
            }}
            className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? "bg-brand scale-150" : "bg-white/30 hover:bg-white/70"}`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 pointer-events-none">
        <span className="text-[10px] tracking-widest uppercase font-techno">
          scroll down
        </span>
        <div className="w-[1px] h-10 bg-white animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
