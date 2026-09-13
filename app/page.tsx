"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/ui/Footer";
import CinematicHero, { eraTimelineData, EraData } from "@/components/hero/CinematicHero";
import HistoricalTimeline from "@/components/timeline/HistoricalTimeline";
import TodayInHistory from "@/components/timeline/TodayInHistory";
import PlacesMap from "@/components/map/PlacesMap";
import { scholarProfile } from "@/data/scholarProfile";
import { useLanguage } from "@/context/LanguageContext";
import {
  ArrowRight,
  BookOpen,
  Compass,
  FileText,
  ExternalLink,
  Calendar,
  Layers,
  Sparkles,
  MapPin,
  Landmark,
} from "lucide-react";

export default function HomePage() {
  const { t, language } = useLanguage();
  const isOdia = language === "or";
  const [activeEraIndex, setActiveEraIndex] = useState(0);

  const activeEra = eraTimelineData[activeEraIndex];

  return (
    <div className="relative min-h-screen w-full bg-[#FAF7F2] text-museum-charcoal overflow-x-hidden selection:bg-[#8A3324] selection:text-white">
      <Navbar />

      {/* 01 CINEMATIC HERO WITH INTEGRATED ERA TIMELINE */}
      <CinematicHero
        selectedEraIndex={activeEraIndex}
        onEraChange={(era) => {
          const idx = eraTimelineData.findIndex((e) => e.id === era.id);
          if (idx !== -1) setActiveEraIndex(idx);
        }}
      />

      {/* 02 EXPLORE KEY CIVILIZATIONS & REGIONS (DYNAMICALLY SYNCED WITH TIME/ERA) */}
      <section id="explore-civilizations" className="relative w-full py-24 px-4 sm:px-6 lg:px-12 bg-museum-ivory border-t border-museum-stone">
        <div className="max-w-[1680px] mx-auto">
          {/* Header */}
          <div className="mb-12 pb-6 border-b border-museum-stone">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8A3324] font-semibold">
              <Compass className="w-4 h-4" />
              <span>
                {isOdia
                  ? `ଯୁଗ ଅନୁସନ୍ଧାନ · ${activeEra.nameOdia}`
                  : `ERA EXPLORATION · ${activeEra.name.toUpperCase()} (${activeEra.period})`}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-museum-charcoal mt-2">
              {isOdia ? "ପ୍ରମୁଖ ସଭ୍ୟତା, ସ୍ଥାନ ଓ ଘଟଣାବଳୀ" : "Key Civilizations, Places & Events"}
            </h2>
            <p className="font-sans text-sm sm:text-base text-museum-charcoalLight mt-2 max-w-3xl">
              {isOdia ? activeEra.descriptionOdia : activeEra.description}
            </p>
          </div>

          {/* Dynamic Grid of Civilizations for the Active Era */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeEra.civilizations.map((civ, idx) => (
              <Link
                key={idx}
                href={civ.link}
                className="group relative bg-museum-parchment/60 hover:bg-museum-ivory rounded-2xl border border-museum-stone p-6 hover:border-[#8A3324] hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="relative h-44 w-full rounded-xl overflow-hidden mb-4 border border-museum-stone/70">
                    <Image
                      src={civ.image}
                      alt={civ.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-3 text-[10px] font-mono text-white/90 bg-black/40 backdrop-blur px-2 py-0.5 rounded">
                      {civ.period}
                    </span>
                  </div>

                  <div className="text-[10px] font-bold tracking-widest text-museum-antiqueGold uppercase font-mono">
                    {isOdia ? civ.tagOdia : civ.tag}
                  </div>
                  <h3 className="font-serif font-bold text-xl text-museum-charcoal group-hover:text-[#8A3324] transition-colors mt-1">
                    {isOdia ? civ.nameOdia : civ.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-museum-charcoalLight mt-2 font-sans leading-relaxed">
                    {isOdia ? civ.focusOdia : civ.focus}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-museum-stone/60 flex items-center justify-between text-xs font-semibold text-[#8A3324]">
                  <span>{isOdia ? "ଐତିହାସିକ ତଥ୍ୟ ପଢ଼ନ୍ତୁ" : "Explore Dossier"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {/* Connected Events in Era */}
          <div className="mt-12 bg-museum-parchment/80 rounded-2xl border border-museum-stone p-6 md:p-8">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8A3324] font-bold mb-4">
              <Calendar className="w-4 h-4" />
              <span>{isOdia ? "ଏହି ଯୁଗର ପ୍ରମୁଖ ଘଟଣାବଳୀ" : "SIGNIFICANT EVENTS IN THIS ERA"}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeEra.events.map((ev, i) => (
                <div
                  key={i}
                  className="bg-museum-ivory p-4 rounded-xl border border-museum-stone flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded bg-[#8A3324]/10 text-[#8A3324] font-mono text-[11px] font-bold">
                        {ev.year}
                      </span>
                      <span className="text-[10px] font-mono text-museum-charcoalLight truncate">
                        {ev.location}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-museum-charcoal">
                      {isOdia ? ev.titleOdia : ev.title}
                    </h4>
                    <p className="text-xs text-museum-charcoalLight mt-1 leading-relaxed">
                      {isOdia ? ev.descOdia : ev.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04 INTERACTIVE TIMELINE & TODAY IN HISTORY */}
      <HistoricalTimeline />
      <TodayInHistory />

      {/* 05 FEATURED RESEARCH / MONOGRAPH SPOTLIGHT */}
      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-12 bg-museum-parchment/50 border-t border-museum-stone">
        <div className="max-w-[1680px] mx-auto">
          <div className="p-8 md:p-12 bg-museum-ivory border border-museum-stone rounded-2xl relative overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-museum-terracotta/10 border border-museum-terracotta/20 rounded-full text-xs font-mono text-museum-terracotta uppercase tracking-wider font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t.monographSection.badge}
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl text-museum-charcoal font-bold leading-tight">
                  {t.monographSection.title}
                </h3>

                <p className="font-sans text-base text-museum-charcoalLight leading-relaxed">
                  {t.monographSection.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    href="/research"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-museum-terracotta text-white hover:bg-museum-mutedRed text-xs font-sans font-semibold uppercase tracking-wider transition-all rounded-xl shadow-sm"
                  >
                    <span>{t.monographSection.readDossier}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href="https://academic.oup.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 border border-museum-stone hover:border-museum-terracotta text-museum-charcoal hover:text-museum-terracotta text-xs font-sans uppercase tracking-wider transition-colors rounded-xl bg-museum-parchment/60 font-semibold"
                  >
                    <span>{t.monographSection.catalogue}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Bibliographic Card */}
              <div className="lg:col-span-4 p-6 bg-museum-parchment rounded-xl border border-museum-stone space-y-3 font-mono text-xs text-museum-charcoalLight">
                <div className="text-[10px] uppercase text-museum-terracotta tracking-wider font-bold">
                  {t.monographSection.recordTitle}
                </div>
                <div className="flex justify-between border-b border-museum-stone pb-2">
                  <span>{t.monographSection.publisher}</span>
                  <span className="text-museum-charcoal font-semibold">Oxford University Press</span>
                </div>
                <div className="flex justify-between border-b border-museum-stone pb-2">
                  <span>{t.monographSection.year}</span>
                  <span className="text-museum-charcoal font-semibold">2026</span>
                </div>
                <div className="flex justify-between border-b border-museum-stone pb-2">
                  <span>{t.monographSection.format}</span>
                  <span className="text-museum-charcoal font-semibold">{isOdia ? "ହାର୍ଡକଭର / ମନୋଗ୍ରାଫ୍" : "Hardcover / Monograph"}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.monographSection.isbn}</span>
                  <span className="text-museum-charcoal font-semibold">978-0-19-887412-3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 HISTORICAL MAP */}
      <PlacesMap />

      {/* 07 INDIA & ODISHA ARCHIVE SPOTLIGHT */}
      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-12 bg-museum-parchment/40 border-t border-museum-stone">
        <div className="max-w-[1680px] mx-auto">
          <div className="bg-museum-ivory border border-museum-stone rounded-2xl p-8 md:p-12 transition-all duration-300 hover:border-museum-terracotta shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-3 py-1 bg-museum-antiqueGold/15 border border-museum-antiqueGold/30 rounded-full text-museum-charcoal font-semibold">
                    {t.spotlightSection.fullOdiaBadge}
                  </span>
                  <span className="text-museum-terracotta font-mono font-semibold">{t.spotlightSection.panorama360}</span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-museum-charcoal">
                  {isOdia ? "ଭାରତ ଓ ଓଡ଼ିଶାର ସମ୍ପୂର୍ଣ୍ଣ ଐତିହାସିକ ଅଭିଲେଖାଗାର" : "Complete History of India & Odisha"}
                </h3>
                <p className="font-sans text-base text-museum-charcoalLight leading-relaxed max-w-3xl">
                  {isOdia
                    ? "ପ୍ରାଗୈତିହାସିକ ଯୁଗଠାରୁ ଆରମ୍ଭ କରି ସିନ୍ଧୁ ସଭ୍ୟତା, ମୌର୍ଯ୍ୟ, ଗୁପ୍ତ, ମୋଗଲ, ମରାଠା ଏବଂ ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ ସହିତ ପ୍ରାଚୀନ କଳିଙ୍ଗ, ଖାରବେଳ, ଗଙ୍ଗ, ଗଜପତି, ଜଗନ୍ନାଥ ସଂସ୍କୃତି ଓ ୧୮୧୭ ପାଇକ ବିଦ୍ରୋହର ବିସ୍ତୃତ ତଥ୍ୟ। କୋଣାର୍କ ଓ ତାଜମହଲର ୩୬୦° ଗୁଗଲ୍ ଷ୍ଟ୍ରିଟ୍ ଭ୍ୟୁ ଅନୁଭବ କରନ୍ତୁ।"
                    : "Exhaustive documentation spanning from prehistoric India and the Indus Valley to the Maurya, Gupta, Mughal, and Maratha empires, alongside Ancient Kalinga, Kharavela, Eastern Gangas, Gajapatis, Jagannath culture, and the 1817 Paika Rebellion. Features 360° Google Maps Street Views."}
                </p>
                <div className="pt-2">
                  <Link
                    href="/india"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-museum-terracotta hover:bg-museum-terracottaDark text-white rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all shadow-md"
                  >
                    <span>{isOdia ? "ଭାରତ ଓ ଓଡ଼ିଶା ଇତିହାସ ପଢ଼ନ୍ତୁ" : "EXPLORE INDIA & ODISHA ARCHIVE"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-4 p-6 bg-museum-parchment rounded-xl border border-museum-stone space-y-3 font-mono text-xs text-museum-charcoal">
                <div className="text-[10px] uppercase text-museum-terracotta tracking-wider font-bold">
                  {isOdia ? "ଅଧ୍ୟୟନ ବିଭାଗ" : "ARCHIVAL DIVISIONS"}
                </div>
                <div className="flex items-center justify-between border-b border-museum-stone/70 pb-2">
                  <span>{isOdia ? "ଭାରତର ଇତିହାସ:" : "Indian History:"}</span>
                  <span className="font-bold text-museum-olive">{isOdia ? "୨୫+ ଯୁଗ ଓ ଅଧ୍ୟାୟ" : "25+ Epochs"}</span>
                </div>
                <div className="flex items-center justify-between border-b border-museum-stone/70 pb-2">
                  <span>{isOdia ? "ଓଡ଼ିଶାର ଇତିହାସ:" : "Odisha History:"}</span>
                  <span className="font-bold text-museum-terracotta">{isOdia ? "୨୦+ ରାଜବଂଶ ଓ ବିଦ୍ରୋହ" : "20+ Dynasties"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{isOdia ? "୩୬୦° ଐତିହାସିକ ଦୃଶ୍ୟ:" : "360° Panoramas:"}</span>
                  <span className="font-bold text-museum-antiqueGold">{isOdia ? "କୋଣାର୍କ, ପୁରୀ, ତାଜମହଲ" : "Konark, Puri, Taj"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 09 ABOUT THE HISTORIAN */}
      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-12 bg-museum-ivory border-t border-museum-stone">
        <div className="max-w-[1680px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Portrait Photography */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-2xl overflow-hidden border border-museum-stone shadow-md">
                <Image
                  src="/images/historian_portrait.jpg"
                  alt={scholarProfile.name}
                  fill
                  className="object-cover filter contrast-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-museum-charcoal/40 via-transparent to-transparent opacity-60" />
              </div>

              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-museum-terracotta/40 pointer-events-none hidden sm:block" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-museum-terracotta/40 pointer-events-none hidden sm:block" />
            </div>

            {/* Editorial Biography */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-sans font-semibold uppercase tracking-widest text-museum-terracotta flex items-center gap-2">
                <span className="w-4 h-[2px] bg-museum-terracotta" />
                {t.aboutSection.badge}
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-museum-charcoal font-bold leading-tight">
                {isOdia ? t.hero.scholarName : scholarProfile.name}
              </h2>

              <p className="font-serif text-lg text-museum-terracotta italic font-normal">
                {isOdia ? t.hero.scholarRole : "Associate Professor in Roman Imperial History & Mediterranean Epigraphy, University of Oxford."}
              </p>

              <div className="space-y-4 font-sans text-base text-museum-charcoalLight leading-relaxed">
                <p>
                  {isOdia
                    ? "ଡକ୍ଟର ଭାନ୍ସଙ୍କ ଗବେଷଣା ପ୍ରାଚୀନ ସାମରିକ ବ୍ୟବସ୍ଥା, ଭୂମଧ୍ୟସାଗରୀୟ ଜଳପଥ ଏବଂ ଶିଳାଲେଖ ଭିତ୍ତିକ ସ୍ମୃତି ଉପରେ କାର୍ଯ୍ୟ କରେ।"
                    : "Dr. Vance's scholarship interrogates the intersection of classical military authority, maritime trade corridors, and epigraphic memory across the western Mediterranean basin."}
                </p>
                <p>
                  {isOdia
                    ? "ଅକ୍ସଫୋର୍ଡ୍ ଓ କେମ୍ବ୍ରିଜ୍ ବିଶ୍ୱବିଦ୍ୟାଳୟରୁ ଶିକ୍ଷାପ୍ରାପ୍ତ, ସେ ଇଟାଲୀ, ଅଷ୍ଟ୍ରିଆ ଏବଂ ଉତ୍ତର ଆଫ୍ରିକାରେ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ସର୍ବେକ୍ଷଣ ସହିତ ୩ଡି ଫୋଟୋଗ୍ରାମେଟ୍ରି କାର୍ଯ୍ୟ ସମ୍ପାଦନ କରିଛନ୍ତି।"
                    : "Educated at Oxford and Cambridge, he has conducted systematic archaeological surveys in Italy, Austria, and North Africa, combining traditional archival paleography with cutting-edge 3D photogrammetry."}
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-museum-terracotta text-white hover:bg-museum-mutedRed text-xs font-sans font-semibold uppercase tracking-wider transition-all rounded-xl shadow-sm"
                >
                  <span>{t.aboutSection.fullBioBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/talks"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-museum-stone hover:border-museum-terracotta text-museum-charcoal hover:text-museum-terracotta text-xs font-sans uppercase tracking-wider transition-colors rounded-xl bg-museum-parchment/60 font-semibold"
                >
                  <span>{t.aboutSection.talksBtn}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 FINAL CONTACT EXPERIENCE */}
      <section className="relative w-full py-28 px-4 sm:px-6 lg:px-12 bg-museum-parchment/70 border-t border-museum-stone text-center overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-museum-terracotta font-semibold block">
            {t.portalSection.badge}
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-museum-charcoal leading-[1.05] tracking-tight">
            {t.portalSection.headingMain} <br />
            <span className="italic text-museum-terracotta font-serif">{t.portalSection.headingItalic}</span>
          </h2>

          <p className="font-sans text-base text-museum-charcoalLight max-w-2xl mx-auto leading-relaxed">
            {t.portalSection.subhead}
          </p>

          <div className="pt-4">
            <Link
              href="/enquiry"
              className="inline-flex items-center gap-3 px-10 py-4 bg-museum-terracotta text-white hover:bg-museum-mutedRed text-xs font-sans font-semibold uppercase tracking-widest transition-all rounded-xl shadow-md group"
            >
              <span>{t.portalSection.ctaBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 11 FOOTER */}
      <Footer />
    </div>
  );
}
