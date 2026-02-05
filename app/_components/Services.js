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
      gsap.fromTo(
        cardsRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 md:px-12 lg:px-20 bg-black text-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d9ff00]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-techno tracking-tighter mb-6">
            CORE CAPABILITIES
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl font-ancorli leading-relaxed">
            We deliver end-to-end solutions that transform how you operate, from
            strategic planning to autonomous execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`
                group relative p-8 rounded-2xl 
                bg-white/5 border border-white/10 backdrop-blur-sm
                hover:border-[#d9ff00]/50 hover:bg-white/10 transition-all duration-300
                flex flex-col justify-between h-[300px] md:h-[350px]
                ${service.colSpan}
              `}
            >
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-lg bg-white/5 group-hover:bg-[#d9ff00]/20 transition-colors duration-300">
                  <service.icon
                    className="w-8 h-8 text-white group-hover:text-[#d9ff00] transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>
                <ArrowUpRight className="w-6 h-6 text-white/40 group-hover:text-[#d9ff00] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3 font-techno group-hover:text-[#d9ff00] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/60 font-ancorli text-base leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  {service.description}
                </p>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d9ff00]/0 to-[#d9ff00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
