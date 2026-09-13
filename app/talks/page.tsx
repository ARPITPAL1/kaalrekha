"use client";

import Link from "next/link";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/ui/Footer";
import { Mic, Tv, Video, Calendar, MapPin, ExternalLink, ArrowRight } from "lucide-react";

interface MediaItem {
  id: string;
  title: string;
  category: "DOCUMENTARY" | "KEYNOTE" | "PODCAST" | "LECTURE";
  event: string;
  location: string;
  date: string;
  duration: string;
  description: string;
  linkText: string;
}

const mediaItems: MediaItem[] = [
  {
    id: "bbc-documentary-rome",
    title: "The Roman Supply Machine: Feeding an Empire (BBC Radio 4 / Television)",
    category: "DOCUMENTARY",
    event: "BBC History Series",
    location: "London & Ostia Antica",
    date: "October 2024",
    duration: "58 mins",
    description:
      "Dr. Marcus Vance walks the subterranean grain granaries of Ostia Antica with presenter Mary Beard, exploring how Alexandrian grain fleets prevented urban famine in imperial Rome.",
    linkText: "Watch BBC iPlayer Episode",
  },
  {
    id: "cambridge-keynote",
    title: "Erasing the Dead: Damnatio Memoriae as Spectacle in Imperial Epigraphy",
    category: "KEYNOTE",
    event: "Triennial Conference of the Greek and Roman Societies",
    location: "University of Cambridge",
    date: "July 2024",
    duration: "45 mins",
    description:
      "Plenary keynote examining the cognitive and emotional resonance of deliberate chisel gouges on bronze legal tablets after the assassination of Emperor Geta.",
    linkText: "Watch Keynote Recording",
  },
  {
    id: "dan-snow-history-hit",
    title: "Life on the Danubian Frontier: Pay, Weapons & Native Contact",
    category: "PODCAST",
    event: "Dan Snow's History Hit Podcast",
    location: "London Studio",
    date: "March 2024",
    duration: "42 mins",
    description:
      "Deep dive discussion on recent excavation findings at Carnuntum, revealing that soldiers on the northern border were recruited from North Africa and Syria.",
    linkText: "Listen on History Hit / Spotify",
  },
  {
    id: "british-museum-gallery-talk",
    title: "The Soldier as Consumer: Numismatics in the Legionary Canabae",
    category: "LECTURE",
    event: "British Museum Department of Greece & Rome",
    location: "BP Lecture Theatre, British Museum",
    date: "January 2024",
    duration: "60 mins",
    description:
      "Public lecture accompanying the landmark exhibition 'Legion: Life in the Roman Army', breaking down coin hoard circulation patterns.",
    linkText: "Watch Museum Lecture Stream",
  },
];

export default function TalksPage() {
  return (
    <div className="min-h-screen w-full bg-archive-darkest text-vellum selection:bg-crimson-historical selection:text-vellum">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-44 pb-20 px-6 md:px-12 border-b border-archive-border bg-gradient-to-b from-archive-darkest via-archive-dark to-archive-darkest">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-antique-gold flex items-center gap-2 mb-4">
            <span className="w-4 h-[1px] bg-antique-gold" />
            PUBLIC SCHOLARSHIP
          </span>

          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-vellum font-normal leading-[0.95] max-w-4xl">
            Talks & <br />
            <span className="italic text-antique-gold font-light">Broadcast Media</span>
          </h1>

          <p className="font-editorial text-xl sm:text-2xl text-vellum-muted font-light max-w-2xl mt-6 leading-relaxed">
            International conference keynotes, documentary appearances, and public historical audio broadcasts translating epigraphic discovery into popular engagement.
          </p>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mediaItems.map((item) => (
            <div
              key={item.id}
              className="bg-archive-dark border border-archive-border hover:border-antique-gold/40 p-8 md:p-10 rounded-xl flex flex-col justify-between transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-antique-gold mb-3">
                  <span className="px-2.5 py-1 bg-antique-gold/15 border border-antique-gold/30 rounded font-semibold tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-vellum-dim">{item.duration}</span>
                </div>

                <h2 className="font-editorial text-2xl sm:text-3xl text-vellum mb-3 leading-snug">
                  {item.title}
                </h2>

                <div className="flex flex-wrap gap-4 text-xs font-mono text-vellum-muted mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-antique-gold" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-crimson-historical" />
                    {item.location}
                  </span>
                </div>

                <p className="font-editorial text-base text-vellum-muted leading-relaxed font-light mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 border-t border-archive-borderMuted flex items-center justify-between">
                <button
                  onClick={() => alert(`Streaming archival record: "${item.title}"`)}
                  className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-antique-gold hover:text-vellum transition-colors"
                >
                  <span>{item.linkText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
