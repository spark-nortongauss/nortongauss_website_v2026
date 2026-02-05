"use client";

import { useEffect, useRef } from "react";
import { Network, Cpu, Cloud, Activity, Bot, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Digital Strategy & Transformation",
    description: "Aligning technology with business goals for scalable growth.",
    icon: Network,
    colSpan: "md:col-span-2",
  },
  {
    title: "Automation & RPA",
    description: "Streamlining operations with intelligent process automation.",
    icon: Cpu,
    colSpan: "md:col-span-1",
  },
  {
    title: "Cloud & Edge Computing",
    description:
      "Resilient infrastructure for the modern distributed enterprise.",
    icon: Cloud,
    colSpan: "md:col-span-1",
  },
  {
    title: "Observability & Monitoring",
    description: "Full-stack visibility to prevent downtime before it happens.",
    icon: Activity,
    colSpan: "md:col-span-2",
  },
  {
    title: "AI & Intelligent Agents",
    description:
      "Generative AI solutions that automate complex decision-making.",
    icon: Bot,
    colSpan: "md:col-span-3",
  },
];

export default function Services() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Directions for each card: Top, Right, Left, Right, Bottom
      const animationConfig = [
        { y: -100, x: 0 }, // 0: Digital Strategy (From Top)
        { y: 0, x: 100 }, // 1: Automation (From Right)
        { y: 0, x: -100 }, // 2: Cloud (From Left)
        { y: 0, x: 100 }, // 3: Observability (From Right)
        { y: 100, x: 0 }, // 4: AI (From Bottom)
      ];

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const config = animationConfig[index] || { y: 50, x: 0 };

        gsap.fromTo(
          card,
          {
            y: config.y,
            x: config.x,
            opacity: 0,
          },
          {
            y: 0,
            x: 0,
            opacity: 1,
            duration: 2, // Smooth duration
            ease: "power2.out",
            scrollTrigger: {
              trigger: card, // Each card triggers itself
              start: "top 75%", // Starts when card top is at 85% viewport (near bottom)
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
            // Removed stagger to let scroll position dictate timing
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 md:px-12 lg:px-20 bg-[#050505] text-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d9ff00]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold font-techno tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50">
            CORE CAPABILITIES
          </h2>
          <p className="text-white/50 text-xl md:text-2xl max-w-3xl font-ancorli leading-relaxed border-l-2 border-[#d9ff00] pl-6">
            We deliver end-to-end solutions that transform how you operate, from
            strategic planning to autonomous execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`
                group relative p-10 rounded-3xl 
                bg-[#0a0a0a] border border-white/[0.08]
                hover:border-[#d9ff00]/40 hover:bg-[#0f0f0f] transition-all duration-1200 ease-out
                flex flex-col justify-between h-[320px] md:h-[400px]
                ${service.colSpan}
                overflow-hidden
              `}
            >
              <div className="flex justify-between items-start z-10 relative">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] group-hover:bg-[#d9ff00]/10 group-hover:border-[#d9ff00]/20 transition-all duration-500">
                  <service.icon
                    className="w-10 h-10 text-white/80 group-hover:text-[#d9ff00] transition-colors duration-500"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#d9ff00]/30 group-hover:bg-[#d9ff00]/10 transition-all duration-500">
                  <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-[#d9ff00] group-hover:scale-110 transition-all duration-500" />
                </div>
              </div>

              <div className="z-10 relative mt-auto">
                <h3 className="text-3xl font-bold mb-4 font-techno text-white/90 group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/50 font-ancorli text-lg leading-relaxed group-hover:text-white/70 transition-colors duration-500 max-w-[90%]">
                  {service.description}
                </p>
              </div>

              {/* Enhanced Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#d9ff00]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#d9ff00]/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none group-hover:scale-150" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
