"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Terminal,
  Shield,
  Cpu,
  Activity,
  Globe,
  Database,
  Lock,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    id: "01",
    title: "Global Telecom Network",
    industry: "Telecom",
    challenge: "Managing 50M+ active subscribers with <99.9% uptime.",
    solution: "Deployed autonomous NOC with predictive failure analysis.",
    stat: "40% Reduced MTTR",
    icon: Globe,
    color: "#d9ff00",
    logs: [
      "Analyzing traffic patterns...",
      "Node redundancy: ACTIVE",
      "Latency optimized: 12ms",
      "Subscriber load: STABLE",
    ],
  },
  {
    id: "02",
    title: "FinTech Security Ops",
    industry: "Finance",
    challenge: "Detecting fraudulent transactions in micro-seconds.",
    solution: "Real-time anomaly detection pipeline with edge inference.",
    stat: "$2B+ Assets Secured",
    icon: Lock,
    color: "#00ff9d",
    logs: [
      "Scanning transaction pool...",
      "Heuristic match: 99.4%",
      "Fraud vector BLOCKED",
      "Ledger sync: COMPLETE",
    ],
  },
  {
    id: "03",
    title: "Smart Mfg. Grid",
    industry: "Manufacturing",
    challenge: "Zero-tolerance for assembly line latency.",
    solution: "IoT sensor fusion with local edge processing clusters.",
    stat: "Zero Unplanned Downtime",
    icon: Cpu,
    color: "#00d9ff",
    logs: [
      "Sensor calibration: OK",
      "Assembly throughput: 100%",
      "Thermal load: NOMINAL",
      "Predictive maint. scheduled",
    ],
  },
];

export default function UseCases() {
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const [activeCase, setActiveCase] = useState(useCases[0]);
  const [terminalLogs, setTerminalLogs] = useState(useCases[0].logs);

  useEffect(() => {
    // --- SCROLL LOGIC ---
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftPanelRef.current,
      });
    });

    // Update active case on scroll (works on mobile too, but terminal scrolls away)
    useCases.forEach((useCase, index) => {
      ScrollTrigger.create({
        trigger: `#use-case-${index}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => updateActiveCase(index),
        onEnterBack: () => updateActiveCase(index),
      });
    });

    return () => {
      mm.revert();
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  const updateActiveCase = (index) => {
    setActiveCase(useCases[index]);

    // Clear previous interval to avoid duplicates
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

    setTerminalLogs([]);
    let logIndex = 0;

    // Initial log immediately
    setTerminalLogs([useCases[index].logs[0]]);
    logIndex = 1;

    typingIntervalRef.current = setInterval(() => {
      if (logIndex < useCases[index].logs.length) {
        setTerminalLogs((prev) => [...prev, useCases[index].logs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(typingIntervalRef.current);
      }
    }, 1200);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-black text-white flex flex-col lg:flex-row"
    >
      {/* --- LEFT PANEL: COMMAND TERMINAL (Sticky) --- */}
      <div
        ref={leftPanelRef}
        className="w-full lg:w-1/2 h-auto min-h-[60vh] lg:h-screen lg:sticky lg:top-0 bg-[#050505] border-r border-white/10 flex items-center justify-center p-4 lg:p-8 relative overflow-hidden order-1 lg:order-1 z-20"
      >
        {/* Background Grid & CRT Effect */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d9ff00]/[0.02] to-transparent z-30 pointer-events-none animate-[scan_4s_linear_infinite]" />

        <div className="relative z-10 w-full max-w-lg border border-white/10 bg-black/90 backdrop-blur-xl rounded-sm overflow-hidden shadow-2xl shadow-black/80 transition-all duration-300">
          {/* Terminal Header */}
          <div className="bg-[#0a0a0a] px-4 py-2 flex items-center justify-between border-b border-white/10">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            <div className="font-mono text-[10px] text-white/30 tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-[#d9ff00] rounded-full animate-pulse" />
              CMD // {activeCase.industry}
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-4 lg:p-8 h-auto aspect-[4/5] lg:aspect-auto lg:h-[450px] flex flex-col font-mono text-sm relative">
            {/* ID and Status */}
            <div className="flex justify-between items-end mb-4 lg:mb-8 pb-4 border-b border-dashed border-white/10">
              <div>
                <div className="text-[9px] text-white/40 mb-1 tracking-widest">
                  OPERATION ID
                </div>
                <div
                  key={activeCase.id}
                  className="text-xl lg:text-2xl text-white font-bold tracking-widest"
                >
                  {activeCase.id}
                </div>
              </div>
              <div>
                <div className="text-[9px] text-white/40 mb-1 text-right tracking-widest">
                  SYSTEM STATUS
                </div>
                <div className="text-[#d9ff00] text-right text-xs lg:text-sm font-bold tracking-wider">
                  ONLINE <span className="animate-blink">_</span>
                </div>
              </div>
            </div>

            {/* Dynamic Visual Placeholder */}
            <div className="flex-1 flex items-center justify-center relative mb-4 lg:mb-6 perspective-[1000px]">
              <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_10s_linear_infinite] opacity-30" />
              <div className="absolute inset-8 border border-dashed border-[#d9ff00]/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />

              <div className="relative z-10 transform-style-3d animate-float">
                <activeCase.icon
                  size={80}
                  color={activeCase.color}
                  strokeWidth={1}
                  className="drop-shadow-[0_0_30px_rgba(217,255,0,0.3)]"
                />
              </div>
            </div>

            {/* Logs */}
            <div className="space-y-1.5 h-[150px] overflow-hidden text-[10px] lg:text-xs font-mono">
              <div className="text-white/30 mb-2 border-b border-white/5 pb-1">
                // SYSTEM LOGS
              </div>
              {terminalLogs.map((log, i) => (
                <div
                  key={i}
                  className="text-[#d9ff00]/90 truncate font-mono flex"
                >
                  <span className="opacity-30 mr-3">
                    {new Date().toLocaleTimeString("en-US", { hour12: false })}
                  </span>
                  <span
                    className="animate-typing border-r-2 border-[#d9ff00] pr-1"
                    style={{ animationDuration: "3.5s" }}
                  >
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT PANEL: INTELLIGENCE REPORTS (Scrollable) --- */}
      <div
        ref={rightPanelRef}
        className="w-full lg:w-1/2 bg-black relative z-10 order-2 lg:order-2"
      >
        <div className="py-6 lg:py-24 px-6 md:px-12 lg:px-20 max-w-2xl mx-auto">
          <div className="space-y-24 lg:space-y-40 pb-24 lg:pb-40 mt-0 lg:mt-12">
            {/* Fixed Header */}
            <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/10 py-3 mb-6 -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-20 lg:px-20 flex justify-between items-center transition-all duration-300">
              <h2 className="text-[10px] lg:text-xs font-mono text-[#d9ff00] tracking-[0.3em] flex items-center gap-3">
                <Globe size={14} /> INTELLIGENCE ARCHIVE
              </h2>
              <div className="text-[10px] text-white/30 font-mono hidden md:block">
                SCROLL TO EXPLORE
              </div>
            </div>

            {useCases.map((item, i) => {
              const isActive = activeCase.id === item.id;

              return (
                <div
                  key={i}
                  id={`use-case-${i}`}
                  className={`group relative border p-6 lg:p-10 rounded-sm transition-all duration-700
                    ${
                      isActive
                        ? "border-[#d9ff00]/50 bg-[#d9ff00]/[0.03]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }
                `}
                >
                  {/* Huge Background Number */}
                  <div
                    className={`absolute top-0 right-0 p-6 opacity-[0.03] font-[1000] text-8xl lg:text-[10rem] font-techno select-none pointer-events-none transition-all duration-700 ${isActive ? "text-[#d9ff00] opacity-10" : "text-white"}`}
                  >
                    {item.id}
                  </div>

                  {/* Card Header */}
                  <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div
                      className={`p-3 rounded-sm border transition-colors duration-500 ${isActive ? "bg-[#d9ff00]/10 border-[#d9ff00]" : "bg-white/5 border-white/10"}`}
                    >
                      <item.icon
                        size={24}
                        className={`transition-colors duration-500 ${isActive ? "text-[#d9ff00]" : "text-white/60"}`}
                      />
                    </div>
                    <span
                      className={`text-[10px] lg:text-xs font-mono border rounded-full px-3 py-1 transition-colors duration-500 ${isActive ? "border-[#d9ff00]/30 text-[#d9ff00]" : "border-white/20 text-white/50"}`}
                    >
                      {item.industry}
                    </span>
                  </div>

                  <h3
                    className={`text-2xl md:text-3xl lg:text-4xl font-bold font-techno mb-6 transition-colors duration-500 ${isActive ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" : "text-white/40"}`}
                  >
                    {item.title}
                  </h3>

                  <div
                    className={`space-y-8 relative z-10 transition-all duration-500 ${isActive ? "opacity-100" : "opacity-50"}`}
                  >
                    <div className="grid gap-6">
                      <div className="pl-4 border-l border-white/10">
                        <h4 className="text-[9px] text-white/40 uppercase mb-2 tracking-widest">
                          The Challenge
                        </h4>
                        <p className="text-white/80 leading-relaxed font-light">
                          {item.challenge}
                        </p>
                      </div>

                      <div className="pl-4 border-l border-[#d9ff00]/30">
                        <h4 className="text-[9px] text-[#d9ff00]/60 uppercase mb-2 tracking-widest">
                          Our Solution
                        </h4>
                        <p className="text-white leading-relaxed">
                          {item.solution}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                      <div
                        className={`text-2xl lg:text-3xl font-mono font-bold transition-colors duration-500 ${isActive ? "text-[#d9ff00] animate-pulse" : "text-white/20"}`}
                      >
                        {item.stat}
                      </div>
                    </div>
                  </div>

                  {/* Active Indicator Line */}
                  {isActive && (
                    <div className="absolute left-0 top-10 w-0.5 h-12 bg-[#d9ff00] animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
