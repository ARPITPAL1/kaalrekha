"use client";

import { useState } from "react";
import Link from "next/link";
import { timelineEvents, TimelineEra } from "@/data/timelineEvents";
import { ArrowRight, Calendar, Compass, ShieldCheck } from "lucide-react";

export default function HistoricalTimeline() {
  const [selectedEra, setSelectedEra] = useState<TimelineEra>(timelineEvents[2]); // 1 CE default

  return (
    <section className="relative w-full py-28 px-4 sm:px-6 lg:px-12 bg-museum-ivory border-t border-museum-stone overflow-hidden text-museum-charcoal">
      <div className="max-w-[1680px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-museum-stone">
          <div>
            <span className="text-xs font-sans font-semibold uppercase tracking-widest text-museum-terracotta flex items-center gap-2">
              <span className="w-4 h-[2px] bg-museum-terracotta" />
              CHRONOLOGICAL STRATIGRAPHY
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-museum-charcoal mt-2">
              The Interactive Timeline
            </h2>
          </div>
          <p className="max-w-md text-sm text-museum-charcoalLight font-sans mt-4 md:mt-0 leading-relaxed">
            Historical inquiry is not static chronology; it is the dialogue between excavated material evidence and the changing human condition across millennia.
          </p>
        </div>

        {/* Horizontal Era Navigation Selector */}
        <div
          className="relative w-full flex items-center justify-between overflow-x-auto pb-6 mb-12 scrollbar-none border-b border-museum-stone/70"
        >
          {timelineEvents.map((era) => {
            const isSelected = selectedEra.id === era.id;
            return (
              <button
                key={era.id}
                onClick={() => setSelectedEra(era)}
                className="group relative flex-1 min-w-[130px] py-4 text-center focus:outline-none transition-all duration-300"
              >
                {/* Year Label */}
                <span
                  className={`block font-mono text-sm tracking-wider transition-all ${
                    isSelected
                      ? "text-museum-terracotta font-bold scale-110"
                      : "text-museum-charcoalLight group-hover:text-museum-charcoal font-medium"
                  }`}
                >
                  {era.year}
                </span>

                {/* Subtitle / Period */}
                <span className="block text-[10px] uppercase tracking-wider font-sans text-museum-charcoalLight mt-1 truncate px-1">
                  {era.period.split("&")[0]}
                </span>

                {/* Milestone Indicator Marker */}
                <div className="relative mt-4 flex items-center justify-center">
                  <div
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                      isSelected
                        ? "bg-museum-terracotta ring-4 ring-museum-terracotta/20 scale-125"
                        : "bg-museum-parchment border border-museum-stone group-hover:border-museum-terracotta"
                    }`}
                  />
                  {isSelected && (
                    <span className="absolute -bottom-2 w-1.5 h-2 bg-museum-terracotta" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Era Deep-Dive Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Era Context Card */}
          <div className="lg:col-span-7 bg-museum-parchment/70 border border-museum-stone p-8 md:p-12 rounded-2xl relative overflow-hidden flex flex-col justify-between shadow-sm">
            {/* Watermark Year */}
            <span className="absolute -bottom-8 -right-4 font-serif text-[140px] font-bold text-museum-stone/40 select-none pointer-events-none leading-none">
              {selectedEra.year}
            </span>

            <div>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-museum-terracotta mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-museum-terracotta/10 border border-museum-terracotta/20 font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedEra.period}
                </span>
                <span className="inline-flex items-center gap-1.5 text-museum-charcoalLight font-sans">
                  <Compass className="w-3.5 h-3.5 text-museum-antiqueGold" />
                  {selectedEra.coordinates}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-museum-charcoal font-bold leading-tight mb-4">
                {selectedEra.headline}
              </h3>

              <p className="font-sans text-base text-museum-charcoalLight leading-relaxed mb-8">
                {selectedEra.description}
              </p>
            </div>

            {/* Key Milestones List */}
            <div className="pt-6 border-t border-museum-stone/70">
              <span className="text-[11px] uppercase tracking-wider font-mono text-museum-antiqueGold font-bold block mb-3">
                KEY HISTORICAL SEALS &amp; ARCHIVAL RECORDS
              </span>
              <ul className="space-y-2.5 text-xs text-museum-charcoal font-sans">
                {selectedEra.keyEvents.map((event, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-museum-terracotta font-mono text-[11px] font-bold mt-0.5">0{idx + 1}</span>
                    <span className="text-museum-charcoal">{event}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center gap-4">
                <Link
                  href={selectedEra.researchLink}
                  className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-museum-terracotta font-semibold hover:text-museum-mutedRed transition-colors group"
                >
                  <span>EXAMINE RELATED SCHOLARSHIP</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Primary Excavated Artifact Feature */}
          <div className="lg:col-span-5 bg-museum-ivory border border-museum-stone p-8 rounded-2xl flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-mono text-museum-terracotta font-bold block mb-2">
                EXCAVATED INDEX ARTIFACT
              </span>
              <h4 className="font-serif text-2xl font-bold text-museum-charcoal mb-3">
                {selectedEra.primaryArtifact}
              </h4>
              <p className="text-xs text-museum-charcoalLight leading-relaxed mb-6 font-sans">
                Stratigraphic anchor specimen correlated with numismatic hoards and carbon-14 dated organic layers in the Mediterranean Epigraphic Archive.
              </p>

              <div className="p-4 bg-museum-parchment rounded-xl border border-museum-stone space-y-2.5 text-[11px] font-mono">
                <div className="flex justify-between text-museum-charcoalLight">
                  <span>CATALOG ID:</span>
                  <span className="text-museum-charcoal font-semibold">OXF-ARC-{selectedEra.id.toUpperCase()}</span>
                </div>
                <div className="flex justify-between text-museum-charcoalLight">
                  <span>DISCOVERY SITE:</span>
                  <span className="text-museum-charcoal font-semibold">{selectedEra.coordinates}</span>
                </div>
                <div className="flex justify-between text-museum-charcoalLight">
                  <span>CURATORIAL STATUS:</span>
                  <span className="text-museum-terracotta font-semibold">VERIFIED SPECIMEN</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-museum-stone flex items-center justify-between text-xs text-museum-charcoalLight">
              <span className="flex items-center gap-1.5 font-mono text-museum-antiqueGold font-semibold">
                <ShieldCheck className="w-4 h-4" />
                PEER-REVIEWED EVIDENCE
              </span>
              <Link
                href="/publications"
                className="hover:text-museum-terracotta transition-colors uppercase tracking-wider text-[11px] font-semibold"
              >
                VIEW MONOGRAPHS &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
