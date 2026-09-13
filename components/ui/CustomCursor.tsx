"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<"default" | "hover" | "explore" | "drag" | "inspect">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check touch or reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice || prefersReducedMotion) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorMode = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (cursorMode === "explore") {
        setCursorType("explore");
      } else if (cursorMode === "drag") {
        setCursorType("drag");
      } else if (cursorMode === "inspect") {
        setCursorType("inspect");
      } else if (target.closest("button, a, input, select, textarea, [role='button']")) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  // Smooth lerp frame
  useEffect(() => {
    if (isTouch) return;
    let animationFrameId: number;

    const render = () => {
      setPos((prev) => ({
        x: prev.x + (targetPos.x - prev.x) * 0.22,
        y: prev.y + (targetPos.y - prev.y) * 0.22,
      }));
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetPos, isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Precision center dot */}
      <div
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-antique-gold transition-opacity duration-150"
        style={{
          left: `${targetPos.x}px`,
          top: `${targetPos.y}px`,
          width: cursorType === "hover" ? "4px" : "6px",
          height: cursorType === "hover" ? "4px" : "6px",
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Outer context ring */}
      <div
        className={`fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-200 ${
          cursorType === "default"
            ? "w-8 h-8 border border-antique-gold/30 bg-transparent"
            : cursorType === "hover"
            ? "w-12 h-12 border border-antique-gold/80 bg-antique-gold/10 backdrop-blur-[1px] scale-110"
            : cursorType === "explore"
            ? "w-20 h-20 border border-antique-gold bg-archive-darkest/75 backdrop-blur-sm"
            : cursorType === "drag"
            ? "w-16 h-16 border border-crimson-historical bg-archive-darkest/75 backdrop-blur-sm"
            : "w-20 h-20 border border-antique-gold bg-archive-darkest/80"
        }`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        {cursorType === "explore" && (
          <span className="text-[9px] uppercase tracking-[0.2em] font-sans font-medium text-antique-gold">
            EXPLORE
          </span>
        )}
        {cursorType === "drag" && (
          <span className="text-[9px] uppercase tracking-[0.2em] font-sans font-medium text-vellum">
            DRAG
          </span>
        )}
        {cursorType === "inspect" && (
          <span className="text-[9px] uppercase tracking-[0.2em] font-sans font-medium text-antique-gold">
            INSPECT
          </span>
        )}
      </div>
    </>
  );
}
