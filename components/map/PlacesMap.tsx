"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { placesOfResearch, ResearchPlace } from "@/data/placesOfResearch";
import { MapPin, Compass, ExternalLink, List, Map as MapIcon, ArrowRight, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function PlacesMap() {
  const [selectedPlace, setSelectedPlace] = useState<ResearchPlace>(placesOfResearch[0]);
  const [viewMode, setViewMode] = useState<"map" | "table">("map");
  const { language } = useLanguage();
  const isOdia = language === "or";

  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-12 bg-museum-parchment/40 border-t border-museum-stone overflow-hidden text-museum-charcoal">
      <div className="max-w-[1680px] mx-auto">
        {/* Header with accessible View Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-museum-stone">
          <div>
            <span className="text-xs font-sans font-semibold uppercase tracking-widest text-[#8A3324] flex items-center gap-2">
              <span className="w-4 h-[2px] bg-[#8A3324]" />
              {isOdia ? "ଭୌଗୋଳିକ ଅଭିଲେଖାଗାର ଓ ମାନଚିତ୍ର" : "GEOSPATIAL TOPOGRAPHY & WORLD MAP"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-museum-charcoal mt-2">
              {isOdia ? "ଗବେଷଣା ସ୍ଥଳୀ ଓ ବିଶ୍ୱ ମାନଚିତ୍ର" : "Places of Research & World Map"}
            </h2>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-xs text-museum-charcoalLight font-mono hidden sm:inline">
              VIEW MODE:
            </span>
            <div className="flex border border-museum-stone rounded-xl overflow-hidden bg-museum-ivory p-1">
              <button
                onClick={() => setViewMode("map")}
                className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider flex items-center gap-1.5 rounded-lg transition-all ${
                  viewMode === "map"
                    ? "bg-[#8A3324] text-white font-semibold shadow-sm"
                    : "text-museum-charcoalLight hover:text-museum-charcoal"
                }`}
                aria-label="Interactive Map View"
              >
                <MapIcon className="w-3.5 h-3.5" />
                {isOdia ? "ମାନଚିତ୍ର" : "World Map"}
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider flex items-center gap-1.5 rounded-lg transition-all ${
                  viewMode === "table"
                    ? "bg-[#8A3324] text-white font-semibold shadow-sm"
                    : "text-museum-charcoalLight hover:text-museum-charcoal"
                }`}
                aria-label="Accessible Table View"
              >
                <List className="w-3.5 h-3.5" />
                {isOdia ? "ତାଲିକା" : "Index (Table)"}
              </button>
            </div>
          </div>
        </div>

        {/* Map View */}
        {viewMode === "map" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* World Map Image with Interactive Overlay Pins */}
            <div className="lg:col-span-8 relative bg-museum-ivory border border-museum-stone rounded-2xl overflow-hidden shadow-md flex flex-col justify-between min-h-[460px]">
              
              {/* World Map High-Res Archival Artwork */}
              <div className="relative w-full h-[380px] sm:h-[460px]">
                <Image
                  src="/images/kaalrekha_world_map.jpg"
                  alt="Kaalrekha Antique Historical World Map with trade routes and empires"
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />

                {/* Top Overlay Badge */}
                <div className="absolute top-4 left-4 bg-museum-ivory/95 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-museum-stone text-[10px] font-mono text-museum-charcoal uppercase tracking-wider font-semibold shadow-xs flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#8A3324]" />
                  <span>{isOdia ? "ପ୍ରାଚୀନ ବାଣିଜ୍ୟ ପଥ ଓ ସଭ୍ୟତା ମାନଚିତ୍ର" : "HISTORICAL WORLD CARTOGRAPHY & TRADE ROUTES"}</span>
                </div>
              </div>

              {/* Bottom Interactive Quick-Select Strip */}
              <div className="p-4 bg-museum-parchment/90 border-t border-museum-stone flex flex-wrap gap-2 items-center justify-between">
                <span className="text-[11px] font-mono text-museum-charcoalLight">
                  {isOdia ? "ପ୍ରମୁଖ ଗବେଷଣା କ୍ଷେତ୍ର:" : "FEATURED BASINS:"}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {placesOfResearch.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPlace(p)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-sans transition-all cursor-pointer ${
                        selectedPlace.id === p.id
                          ? "bg-[#8A3324] text-white font-semibold"
                          : "bg-museum-ivory text-museum-charcoal hover:bg-museum-stone/50 border border-museum-stone"
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Place Dossier Card */}
            <div className="lg:col-span-4 bg-museum-ivory border border-museum-stone p-8 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-museum-terracotta mb-3">
                  <MapPin className="w-3.5 h-3.5 text-museum-terracotta" />
                  <span>{selectedPlace.coordinates.formatted}</span>
                </div>

                <h3 className="font-serif text-3xl font-bold text-museum-charcoal mb-1">
                  {selectedPlace.name}
                </h3>
                <span className="text-xs font-serif italic text-museum-antiqueGold block mb-4">
                  {selectedPlace.ancientName} · {selectedPlace.modernCountry}
                </span>

                <div className="p-3 bg-museum-parchment border border-museum-stone rounded-xl mb-6 text-[11px] font-mono">
                  <div className="text-museum-charcoalLight uppercase tracking-wider mb-1">CHRONOLOGICAL WINDOW:</div>
                  <div className="text-museum-charcoal font-semibold">{selectedPlace.period}</div>
                </div>

                <p className="font-sans text-sm text-museum-charcoalLight leading-relaxed mb-6">
                  {selectedPlace.relevance}
                </p>
              </div>

              {/* Related Dossiers Link */}
              <div className="pt-6 border-t border-museum-stone space-y-3">
                <Link
                  href="/research"
                  className="flex items-center justify-between p-3 bg-museum-parchment hover:bg-museum-stone/40 border border-museum-stone rounded-xl text-xs text-museum-charcoal hover:text-[#8A3324] transition-colors"
                >
                  <span className="truncate pr-2 font-medium">Linked Research &amp; Publications</span>
                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                </Link>

                <Link
                  href="/india"
                  className="flex items-center justify-between p-3 bg-museum-parchment hover:bg-museum-stone/40 border border-museum-stone rounded-xl text-xs text-museum-charcoal hover:text-[#8A3324] transition-colors"
                >
                  <span className="truncate pr-2 font-medium">India &amp; Odisha Historical Archive</span>
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Accessible Table/List View */
          <div className="bg-museum-ivory border border-museum-stone rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 bg-museum-parchment border-b border-museum-stone text-xs text-museum-charcoalLight font-mono">
              COMPREHENSIVE GEOSPATIAL EXCAVATION &amp; SURVEY SITES
            </div>
            <div className="divide-y divide-museum-stone/70">
              {placesOfResearch.map((place) => (
                <div
                  key={place.id}
                  className="p-6 hover:bg-museum-parchment/50 transition-colors grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                >
                  <div className="md:col-span-4">
                    <h4 className="font-serif text-xl font-bold text-museum-charcoal">{place.name}</h4>
                    <span className="text-xs text-museum-antiqueGold font-serif italic">
                      {place.ancientName} ({place.modernCountry})
                    </span>
                  </div>

                  <div className="md:col-span-2 font-mono text-xs text-museum-charcoalLight">
                    {place.coordinates.formatted}
                  </div>

                  <div className="md:col-span-4 text-xs text-museum-charcoalLight leading-relaxed font-sans">
                    {place.relevance}
                  </div>

                  <div className="md:col-span-2 flex justify-end gap-2">
                    <Link
                      href="/research"
                      className="px-3 py-1.5 text-[11px] font-sans uppercase tracking-wider text-[#8A3324] border border-[#8A3324]/30 hover:bg-[#8A3324] hover:text-white rounded-lg font-semibold transition-colors cursor-pointer"
                    >
                      PUBLICATION
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
