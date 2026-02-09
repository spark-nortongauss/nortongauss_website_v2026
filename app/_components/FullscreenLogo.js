"use client";
import React from "react";

const FullscreenLogo = () => {
  return (
    <section className="h-screen w-full flex justify-center items-center bg-black overflow-hidden relative">
      {/* Corner Markers - Top */}
      <div className="absolute top-8 left-8 text-white z-10 pointer-events-none">
        <span className="text-2xl font-light">+</span>
      </div>
      <div className="absolute top-8 right-8 text-white z-10 pointer-events-none">
        <span className="text-2xl font-light">+</span>
      </div>

      {/* Main Text */}
      <h1
        className="text-white font-bold leading-none tracking-tighter text-center z-0 scale-y-125 select-none"
        style={{
          fontSize: "15vw",
          fontFamily: '"Techno_Nue", sans-serif',
        }}
      >
        NORTON-GAUSS
      </h1>

      {/* Floating Dot/Period if needed from image reference (User said "Exactly like this image. Here the word is: 'NORTON-GAUSS'") */}
      {/* The image shows a dot after 'FLOW'. I'll assume standard text for now unless requested. */}

      {/* Corner Markers - Bottom */}
      <div className="absolute bottom-8 left-8 text-white z-10 pointer-events-none">
        <span className="text-2xl font-light">+</span>
      </div>
      <div className="absolute bottom-8 right-8 text-white z-10 pointer-events-none">
        <span className="text-2xl font-light">+</span>
      </div>

      {/* Right Side Scroll Indicator */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 h-16 w-1 bg-gray-800 rounded-full overflow-hidden hidden md:block">
        <div className="h-1/2 w-full bg-white rounded-full"></div>
      </div>
    </section>
  );
};

export default FullscreenLogo;
