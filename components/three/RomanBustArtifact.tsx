"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ZoomIn, RotateCcw, ShieldCheck, Sparkles, Compass } from "lucide-react";

export default function RomanBustArtifact() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleReset = () => {
    setZoomLevel(1);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleReset();
      }}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[520px] rounded-2xl bg-museum-parchment/60 border border-museum-stone flex items-center justify-center overflow-hidden group shadow-sm transition-all duration-300"
    >
      {/* High-Resolution Photographic Museum Specimen */}
      <div
        className="relative w-full h-full transition-transform duration-500 ease-out"
        style={{
          transform: `scale(${zoomLevel}) translate3d(${mousePos.x * -10}px, ${mousePos.y * -10}px, 0) rotateY(${mousePos.x * 6}deg) rotateX(${mousePos.y * -6}deg)`,
        }}
      >
        <Image
          src="/images/classical_statue_dark.jpg"
          alt="Authentic Classical Roman Marble Bust Sculpture — Curatorial Specimen"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center filter contrast-[1.05] brightness-[0.95]"
        />

        {/* Natural Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-museum-charcoal/70 via-transparent to-transparent" />

        {/* Dynamic Specular Sunlight on Hover */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300 mix-blend-soft-light"
          style={{
            background: `radial-gradient(circle 280px at ${(mousePos.x + 1) * 50}% ${(mousePos.y + 1) * 50}%, rgba(216, 204, 182, 0.6), transparent 70%)`,
          }}
        />
      </div>

      {/* Museum Placard Header */}
      <div className="absolute top-4 left-4 z-20 flex flex-col bg-museum-ivory/95 backdrop-blur-md p-3.5 rounded-xl border border-museum-stone shadow-sm max-w-sm">
        <span className="text-[10px] uppercase font-mono tracking-wider text-museum-terracotta flex items-center gap-1.5 font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          AUTHENTIC MUSEUM SPECIMEN · BM-891
        </span>
        <span className="text-sm font-serif text-museum-charcoal font-semibold italic mt-1">
          Classical Roman Marble Portrait Bust (Severan Dynasty, c. 198–211 CE)
        </span>
        <span className="text-[10px] text-museum-charcoalLight font-sans mt-0.5">
          Provenance: British Museum Curatorial Collection &amp; Roman Forum Epigraphic Vault
        </span>
      </div>

      {/* Control Buttons (Zoom / Reset) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={() => setZoomLevel((z) => (z === 1 ? 1.35 : 1))}
          className="p-2.5 rounded-xl bg-museum-ivory/95 backdrop-blur-md border border-museum-stone text-museum-charcoal hover:text-museum-terracotta hover:border-museum-terracotta transition-colors shadow-sm"
          title="Toggle High-Resolution Specimen Macro View"
          aria-label="Zoom artifact specimen"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        {zoomLevel > 1 && (
          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-museum-ivory/95 backdrop-blur-md border border-museum-stone text-museum-charcoal hover:text-museum-terracotta transition-colors shadow-sm"
            title="Reset Zoom"
            aria-label="Reset zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Bottom Inspection Prompt */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between bg-museum-ivory/90 backdrop-blur-md px-4 py-2 rounded-xl border border-museum-stone text-xs text-museum-charcoalLight">
        <span className="flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-museum-antiqueGold" />
          Move cursor to examine marble chiseling
        </span>
        <span className="font-mono text-[10px] uppercase text-museum-terracotta font-semibold">
          Epigraphic Archive Specimen
        </span>
      </div>
    </div>
  );
}
