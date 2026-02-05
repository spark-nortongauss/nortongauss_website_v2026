"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const GlobalOps = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // HUD Data States
  const [activeNodes, setActiveNodes] = useState(842);
  const [latency, setLatency] = useState(24);
  const [threatLevel, setThreatLevel] = useState("LOW");
  const [logs, setLogs] = useState([
    "INITIALIZING SEQUENCE...",
    "CONNECTING TO SATELLITE LINK...",
    "ESTABLISHING SECURE HANDSHAKE...",
  ]);

  // Simulate Live Data
  useEffect(() => {
    const interval = setInterval(() => {
      // Updates random nodes
      setActiveNodes((prev) => prev + Math.floor(Math.random() * 5) - 2);
      // Updates latency
      setLatency((prev) => {
        const newVal = prev + Math.floor(Math.random() * 10) - 5;
        return newVal < 5 ? 5 : newVal > 60 ? 60 : newVal;
      });

      // Updates logs
      const messages = [
        "PACKET LOSS DETECTED: NODE EU-4",
        "REROUTING TRAFFIC -> ASIA-PACIFIC",
        "OPTIMIZING EDGE CACHE...",
        "SYNCHRONIZING DATABASE SHARDS...",
        "THREAT INTEL: CLEAN",
        "NEW INSTANCE PROVISIONED: SUPER-CLUSTER-7",
        "AUTO-SCALING ENABLED",
        "HEARTBEAT RECEIVED: TOKYO",
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setLogs((prev) =>
        [`[${new Date().toLocaleTimeString()}] ${randomMsg}`, ...prev].slice(
          0,
          6,
        ),
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // --- THREE.JS SETUP ---
    const scene = new THREE.Scene();
    // Dark fog for depth
    scene.fog = new THREE.FogExp2(0x000000, 0.002);

    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 18;
    camera.position.y = 5;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight,
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- INTERACTION STATE ---
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();

    const onMouseMove = (event) => {
      const rect = canvasRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      targetRotation.x = mouse.y * 0.2;
      targetRotation.y = mouse.x * 0.2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // --- OBJECTS ---

    // --- OBJECTS ---
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 1. Globe (Points)
    const geometry = new THREE.SphereGeometry(6, 64, 64);
    const material = new THREE.PointsMaterial({
      color: 0x333333,
      size: 0.05,
    });
    const globe = new THREE.Points(geometry, material);
    worldGroup.add(globe);

    // 2. Globe Wireframe Overlay (Faint)
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x111111,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const globeWire = new THREE.Mesh(geometry, wireframeMat);
    worldGroup.add(globeWire);

    // 3. Active Nodes (Glowing bright dots)
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 200;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      // Random placement on sphere surface implementation is tricky,
      // quick approximation: random point in cube normalized to sphere radius
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 6.05; // slightly above surface

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      posArray[i * 3] = x;
      posArray[i * 3 + 1] = y;
      posArray[i * 3 + 2] = z;
    }

    particlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );
    const particlesMat = new THREE.PointsMaterial({
      color: 0xd9ff00, // Brand Neon
      size: 0.15,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const nodeParticles = new THREE.Points(particlesGeo, particlesMat);
    globe.add(nodeParticles); // Attach to globe so they rotate with it

    // 4. Atmosphere Glow
    const atmosGeo = new THREE.SphereGeometry(6.2, 32, 32);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0xd9ff00,
      transparent: true,
      opacity: 0.05,
      side: THREE.BackSide, // Inverted for glow effect usually, but basic transparency works for simple look
    });
    const atmos = new THREE.Mesh(atmosGeo, atmosMat);
    worldGroup.add(atmos);

    // --- ANIMATION ---
    // Floating movement
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      // Auto Rotation
      worldGroup.rotation.y += 0.0005;

      // Mouse Interaction with damping
      worldGroup.rotation.x +=
        (targetRotation.x * 0.5 - worldGroup.rotation.x) * 0.05;
      worldGroup.rotation.z +=
        (targetRotation.y * 0.2 - worldGroup.rotation.z) * 0.05;

      // Pulse effect     // Stars/Particles reverse rotate slightly

      renderer.render(scene, camera);
    };
    animate();

    // --- RESIZE ---
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight,
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[800px] bg-black overflow-hidden flex items-center justify-center border-y border-white/5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black opacity-50" />

      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* --- HUD OVERLAY --- */}
      <div className="absolute inset-0 z-10 pointer-events-none p-6 md:p-12 max-w-[1600px] mx-auto flex flex-col justify-between">
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-[#d9ff00] font-mono text-sm tracking-[0.2em] mb-1">
              GLOBAL COMMAND
            </h3>
            <h2 className="text-white text-3xl md:text-5xl font-bold font-techno tracking-tighter">
              REAL-TIME <br /> OPERATIONS
            </h2>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-[#d9ff00] rounded-full animate-pulse" />
              <span className="text-[#d9ff00] font-mono text-xs">
                LIVE FEED
              </span>
            </div>
            <div className="border border-white/20 bg-black/50 backdrop-blur-sm p-4 rounded-sm">
              <div className="text-white/50 text-xs font-mono mb-1">
                ACTIVE NODES
              </div>
              <div className="text-2xl text-white font-mono">
                {activeNodes.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE - Decorative Crosshairs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none hidden md:block" />

        {/* FOOTER */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          {/* LOGS */}
          <div className="w-full md:w-1/3">
            <div className="flex items-center justify-between border-b border-white/20 pb-2 mb-2">
              <span className="text-white/50 font-mono text-xs">
                SYSTEM LOGS
              </span>
              <span className="text-[#d9ff00]/50 font-mono text-xs">
                V.2.0.4
              </span>
            </div>
            <div className="h-32 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <div className="flex flex-col gap-1">
                {logs.map((log, i) => (
                  <div
                    key={i}
                    className="text-[#d9ff00] font-mono text-xs opacity-80 truncate"
                  >
                    <span className="mr-2 opacity-50">{">"}</span>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* METRICS */}
          <div className="flex gap-4">
            <div className="border border-white/10 bg-white/5 p-4 w-32 backdrop-blur-md">
              <span className="text-white/40 text-[10px] uppercase font-mono block mb-1">
                Avg Latency
              </span>
              <span className="text-white text-2xl font-mono">{latency}ms</span>
              <div className="w-full h-1 bg-white/10 mt-2 relative">
                <div
                  className="absolute left-0 top-0 h-full bg-[#d9ff00]"
                  style={{ width: `${(latency / 100) * 100}%` }}
                />
              </div>
            </div>
            <div className="border border-white/10 bg-white/5 p-4 w-32 backdrop-blur-md">
              <span className="text-white/40 text-[10px] uppercase font-mono block mb-1">
                Threat Lvl
              </span>
              <span className="text-[#d9ff00] text-2xl font-mono">
                {threatLevel}
              </span>
              <div className="w-full h-1 bg-white/10 mt-2">
                <div className="w-[10%] h-full bg-[#d9ff00]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalOps;
