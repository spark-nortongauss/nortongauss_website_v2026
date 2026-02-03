"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SplitText = ({ children, className }) => {
  return (
    <span className={`inline-block ${className}`}>
      {children.split("").map((char, index) => (
        <span key={index} className="inline-block char">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2000", // Scroll distance
          scrub: 1,
          pin: true,
          // markers: true, // debug
        },
      });

      // Split text into arrays of chars
      const chars1 = text1Ref.current.querySelectorAll(".char");
      const chars2 = text2Ref.current.querySelectorAll(".char");
      const chars3 = text3Ref.current.querySelectorAll(".char");

      // Initial state for text 2 and text 3
      gsap.set(chars2, { y: 100, opacity: 0 });
      gsap.set(chars3, { y: 100, opacity: 0 });

      // Animation Sequence
      tl.to(chars1, {
        y: -100,
        opacity: 0,
        stagger: 0.03,
        duration: 1.2,
        ease: "power4.out",
      })
        .to(
          chars2,
          {
            y: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=1",
        ) // Overlap
        .to(chars2, {
          y: -100,
          opacity: 0,
          stagger: 0.03,
          duration: 1.2,
          ease: "power4.out",
        })
        .to(
          chars3,
          {
            y: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=1",
        ); // Overlap
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen bg-black overflow-hidden relative"
    >
      <div
        ref={containerRef}
        className="w-full h-full flex justify-center items-center relative"
      >
        {/* TEXT 1: We are Norton-Gauss */}
        <h2
          ref={text1Ref}
          className="absolute text-[3.5vw] md:text-[4.5vw] lg:text-[70px] whitespace-nowrap font-normal leading-tight text-center z-10"
        >
          <SplitText className="text-white">We are </SplitText>
          <SplitText className="text-brand font-['Ancorli']">
            Norton-Gauss
          </SplitText>
        </h2>

        {/* TEXT 2: We operate in industries where */}
        <h2
          ref={text2Ref}
          className="absolute text-[2.5vw] md:text-[3.5vw] lg:text-[50px] whitespace-nowrap font-bold leading-tight text-center z-10 uppercase"
        >
          <SplitText className="text-white">
            We operate in industries where
          </SplitText>
        </h2>

        {/* TEXT 3: system Cannot fail */}
        <h2
          ref={text3Ref}
          className="absolute text-[2.5vw] md:text-[3.5vw] lg:text-[50px] whitespace-nowrap font-bold leading-tight text-center z-10"
        >
          <SplitText className="text-white">system </SplitText>
          <SplitText className="text-[#D8FF36] text-[1.8em]">
            Cannot fail
          </SplitText>
        </h2>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-row items-center gap-4 opacity-50 z-20">
        <div className="w-[20px] h-[45px] border border-white rounded-full flex justify-center items-center">
          <div className="w-[1px] h-[20px] bg-white animate-pulse" />
        </div>
        {/* <span className="text-[15px] leading-[36px] tracking-[0.9px] font-['Techno_Nue'] text-white">
          Scroll Down
        </span> */}
      </div>
    </section>
  );
};

export default About;
