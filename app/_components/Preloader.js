"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./preloader.css";

export default function Preloader() {
  const preloaderRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    // Show the animation container
    timeline.to(".mil-preloader-animation", {
      opacity: 1,
    });

    // Phase 1: Staggered fade-in/up
    timeline.fromTo(
      ".mil-animation-1 .mil-h3",
      {
        y: "30px",
        opacity: 0,
      },
      {
        y: "0px",
        opacity: 1,
        stagger: 0.4,
      },
    );

    // Phase 1: Fade out
    timeline.to(
      ".mil-animation-1 .mil-h3",
      {
        opacity: 0,
        y: "-30",
      },
      "+=.3",
    );

    // Phase 2: Reveal Box Setup
    timeline.fromTo(
      ".mil-reveal-box",
      0.1,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        x: "-30",
      },
    );

    // Phase 2: Reveal Box Expand
    timeline.to(
      ".mil-reveal-box",
      0.45,
      {
        width: "100%",
        x: 0,
      },
      "+=.1",
    );

    // Phase 2: Reveal Box Retract
    timeline.to(".mil-reveal-box", {
      right: "0",
    });
    timeline.to(".mil-reveal-box", 0.3, {
      width: "0%",
    });

    // Phase 2: Text appear (now targeting the container opacity if needed, or children)
    // Originally it targeted .mil-animation-2 .mil-h3
    // We will target the container content
    timeline.fromTo(
      [".mil-animation-2 .mil-h3", ".mil-preloader-logo"],
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
      "-=.5",
    );

    // Final Exit
    timeline.to(
      [".mil-animation-2 .mil-h3", ".mil-preloader-logo"],
      0.6,
      {
        opacity: 0,
        y: "-30",
      },
      "+=.5",
    );

    timeline.to(
      ".mil-preloader",
      0.8,
      {
        opacity: 0,
        ease: "sine.in",
        onComplete: function () {
          if (preloaderRef.current) {
            preloaderRef.current.classList.add("mil-hidden");
          }
        },
      },
      "+=.2",
    );
  }, []);

  return (
    <div className="mil-preloader" ref={preloaderRef}>
      <div className="mil-preloader-animation">
        {/* Phase 1: Staggered Text */}
        <div className="mil-pos-abs mil-animation-1">
          <p className="mil-h3 mil-thin">Drive</p>
          <p className="mil-h3 mil-accent">Disruptive</p>
          <p className="mil-h3">Change</p>
        </div>
        {/* Phase 2: Reveal Animation */}
        <div className="mil-pos-abs mil-animation-2">
          <div className="mil-reveal-frame">
            <p className="mil-reveal-box"></p>
            <div className="mil-logo-container">
              <img
                src="/NG_Logo_Colour_50x50.png"
                alt="NG Logo"
                className="mil-preloader-logo"
              />
              <p className="mil-h3">NORTON-GAUSS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
