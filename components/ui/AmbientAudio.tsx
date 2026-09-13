"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { soundEngine } from "@/lib/soundEngine";

export default function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    const active = soundEngine.toggleSound();
    setIsPlaying(active);
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-6 left-6 z-40 flex items-center gap-3 px-3.5 py-2 rounded-full border border-archive-border bg-archive-dark/80 backdrop-blur-md text-vellum-muted hover:text-antique-gold hover:border-antique-gold/40 transition-all duration-300 group shadow-lg"
      aria-label={isPlaying ? "Mute ambient archive audio" : "Enable atmospheric archive audio"}
      title={isPlaying ? "Atmospheric sound on (click to mute)" : "Atmospheric sound muted (click to enable)"}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-antique-gold animate-pulse" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-vellum-dim group-hover:text-vellum" />
        )}
      </div>

      <div className="flex items-center gap-1">
        <span className="text-[10px] uppercase tracking-archival font-sans font-medium">
          {isPlaying ? "ARCHIVE SOUNDSCAPE" : "ATMOSPHERE: MUTED"}
        </span>
        {isPlaying && (
          <div className="flex items-end gap-[2px] h-3 ml-1">
            <span className="w-[2px] h-2 bg-antique-gold animate-pulse" style={{ animationDelay: "0ms" }} />
            <span className="w-[2px] h-3 bg-antique-gold animate-pulse" style={{ animationDelay: "150ms" }} />
            <span className="w-[2px] h-1.5 bg-antique-gold animate-pulse" style={{ animationDelay: "300ms" }} />
          </div>
        )}
      </div>
    </button>
  );
}
