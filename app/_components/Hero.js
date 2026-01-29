"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Hero = () => {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const tagsRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    // Canvas Particle System
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let particles = [];
    const particleCount = 1500;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * canvas.width;
        this.pz = this.z;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.speed = Math.random() * 0.5 + 0.1;

        // Random color between green and yellow
        const hue = Math.random() < 0.8 ? 70 : 60; // Greenish yellow
        this.color = `hsla(${hue}, 100%, 50%, ${Math.random() * 0.5 + 0.2})`;
      }

      update() {
        this.z -= this.speed;
        if (this.z <= 0) {
          this.reset();
          this.z = canvas.width;
          this.pz = this.z;
        }

        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        const sx =
          (this.x - canvas.width / 2) * (canvas.width / this.z) +
          canvas.width / 2;
        const sy =
          (this.y - canvas.height / 2) * (canvas.width / this.z) +
          canvas.height / 2;

        const r = (canvas.width / this.z) * 0.5;

        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

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

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-black flex flex-col justify-start pt-40 md:pt-48 px-6 md:px-20"
    >
      {/* Background Animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-60"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start gap-4 max-w-5xl">
        <div className="overflow-hidden">
          <h1
            ref={title1Ref}
            className="text-[12vw] md:text-[10rem] font-bold leading-[0.85] tracking-tight uppercase"
          >
            CLOUD
          </h1>
        </div>

        <div className="overflow-hidden ml-[10vw]">
          <h1
            ref={title2Ref}
            className="text-[12vw] md:text-[10rem] font-bold leading-[0.85] tracking-tight uppercase"
          >
            & EDGE
          </h1>
        </div>

        {/* Tags */}
        <div ref={tagsRef} className="flex flex-wrap gap-4 mt-8">
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
          className="max-w-md mt-6 text-sm md:text-base text-white/50 leading-relaxed font-sans"
        >
          Norton-Gauss provides seamless cloud and edge solutions that empower
          your business with high-performance computing and intelligent data
          management.
        </p>

        {/* CTA Button */}
        <div className="mt-10">
          <button
            ref={btnRef}
            className="bg-brand text-black px-12 py-4 rounded-full font-bold text-sm md:text-lg tracking-wider uppercase hover:scale-105 active:scale-95 transition-transform"
          >
            KNOW MORE
          </button>
        </div>
      </div>

      {/* Scroll Down Indicator (Optional but matches design spirit) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-[10px] tracking-widest uppercase">
          scroll down
        </span>
        <div className="w-[1px] h-10 bg-white animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
