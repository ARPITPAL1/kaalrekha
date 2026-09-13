"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/ui/Footer";
import { scholarProfile } from "@/data/scholarProfile";
import {
  Download,
  Award,
  BookOpen,
  GraduationCap,
  Briefcase,
  ExternalLink,
  Shield,
  ArrowRight,
  School,
  Scroll,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { language } = useLanguage();
  const isOdia = language === "or";

  return (
    <div className="min-h-screen w-full bg-museum-ivory text-museum-charcoal selection:bg-museum-terracotta selection:text-white">
      <Navbar />

      {/* Hero Header with Portrait of Dr. Anjan Kumar Pal */}
      <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-12 border-b border-museum-stone bg-museum-parchment/60">
        <div className="max-w-[1680px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Real Author Portrait Photography */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-2xl overflow-hidden border border-museum-stone shadow-xl">
                <Image
                  src="/images/dr_anjan_kumar_pal.jpg"
                  alt={scholarProfile.name}
                  fill
                  priority
                  className="object-cover object-center filter contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-museum-charcoal/30 via-transparent to-transparent opacity-40" />
              </div>

              {/* Accession Seal Tag */}
              <div className="mt-4 text-center">
                <span className="text-[11px] uppercase font-mono tracking-wider text-[#8A3324] font-bold">
                  {isOdia
                    ? "ଡଃ ଅଞ୍ଜନ କୁମାର ପାଲ · ପିଏଚ୍.ଡି (ଫକୀର ମୋହନ ବିଶ୍ୱବିଦ୍ୟାଳୟ, ବାଲେଶ୍ୱର)"
                    : "DR. ANJAN KUMAR PAL · PH.D. (FAKIR MOHAN UNIVERSITY, BALASORE)"}
                </span>
              </div>
            </div>

            {/* Editorial Biography */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#8A3324]/10 border border-[#8A3324]/20 rounded-full text-xs font-mono uppercase tracking-wider text-[#8A3324] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#8A3324]" />
                <span>{isOdia ? "ଐତିହାସିକ ଓ ଗବେଷକ ପରିଚୟ" : "ACADEMIC & SCHOLAR PROFILE"}</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-museum-charcoal font-bold leading-[1.08]">
                {isOdia ? scholarProfile.nameOdia : scholarProfile.name}
              </h1>

              <p className="font-serif text-xl sm:text-2xl text-[#8A3324] italic font-medium">
                {isOdia ? scholarProfile.fieldOdia : scholarProfile.field}
              </p>

              {/* PhD Dissertation Feature Callout Box */}
              <div className="p-6 bg-museum-ivory border-l-4 border-[#8A3324] rounded-r-2xl border-y border-r border-museum-stone shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#8A3324] font-bold uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4 text-[#8A3324]" />
                  <span>{isOdia ? "ପିଏଚ୍.ଡି ଗବେଷଣା ନିବନ୍ଧ (DOCTORAL DISSERTATION)" : "DOCTORAL DISSERTATION · PH.D."}</span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-museum-charcoal">
                  &ldquo;{scholarProfile.phdTopic}&rdquo;
                </h3>
                <p className="text-xs font-mono text-museum-charcoalLight">
                  {scholarProfile.phdUniversity}
                </p>
              </div>

              <div className="space-y-4 font-sans text-base sm:text-lg text-museum-charcoalLight leading-relaxed">
                {(isOdia ? scholarProfile.fullBioOdia : scholarProfile.fullBio).map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Research & Contact CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/research"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#8A3324] text-white hover:bg-museum-mutedRed text-xs font-sans font-bold uppercase tracking-wider transition-all rounded-xl shadow-md cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{isOdia ? "ଗବେଷଣା ପତ୍ର ଓ ପ୍ରବନ୍ଧ ସମୂହ" : "EXPLORE RESEARCH PAPERS"}</span>
                </Link>

                <Link
                  href="/enquiry"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-museum-stone hover:border-[#8A3324] text-museum-charcoal hover:text-[#8A3324] text-xs font-sans uppercase tracking-wider transition-colors rounded-xl bg-museum-ivory font-semibold shadow-xs"
                >
                  <span>{isOdia ? "ଶିକ୍ଷାଗତ ଅନୁସନ୍ଧାନ (INQUIRY)" : "ACADEMIC INQUIRY"}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trajectory & Appointments Sections */}
      <section className="py-24 px-4 sm:px-6 lg:px-12 max-w-[1680px] mx-auto space-y-20 font-sans">
        {/* Academic Journey */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8A3324] uppercase tracking-wider mb-2 font-bold">
            <Briefcase className="w-4 h-4" />
            {isOdia ? "ଶିକ୍ଷାଗତ ଅନୁଭୂତି ଓ କାର୍ଯ୍ୟଧାରା" : "CHRONOLOGICAL TRAJECTORY"}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-museum-charcoal mb-8">
            {isOdia ? "ଗବେଷଣା ଓ ଶିକ୍ଷାଗତ ନିଯୁକ୍ତି" : "Academic Appointments & Fieldwork"}
          </h2>

          <div className="space-y-4">
            {scholarProfile.academicJourney.map((job, idx) => (
              <div
                key={idx}
                className="p-8 bg-museum-parchment/60 border border-museum-stone rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:border-[#8A3324] transition-colors shadow-sm"
              >
                <div className="md:col-span-3 font-mono text-xs text-[#8A3324] font-bold">
                  {job.period}
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-serif text-2xl font-bold text-museum-charcoal">{job.role}</h3>
                  <span className="text-xs font-sans text-museum-charcoalLight uppercase tracking-wider block mt-1 font-medium">
                    {job.institution}
                  </span>
                </div>
                <div className="md:col-span-5 font-sans text-sm text-museum-charcoalLight leading-relaxed">
                  {job.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Doctoral Degree */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8A3324] uppercase tracking-wider mb-2 font-bold">
            <GraduationCap className="w-4 h-4" />
            {isOdia ? "ଉଚ୍ଚଶିକ୍ଷା ଓ ଉପାଧି" : "HIGHER EDUCATION & DEGREES"}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-museum-charcoal mb-8">
            {isOdia ? "ଶିକ୍ଷାଗତ ଡିଗ୍ରୀ" : "Education & Academic Degrees"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scholarProfile.education.map((edu, idx) => (
              <div
                key={idx}
                className={`p-8 bg-museum-ivory border rounded-2xl flex flex-col justify-between space-y-4 shadow-sm ${
                  idx === 0 ? "border-[#8A3324]/40 ring-1 ring-[#8A3324]/20" : "border-museum-stone"
                }`}
              >
                <div>
                  <span className="font-mono text-xs text-[#8A3324] font-bold block mb-1">
                    {edu.year}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-museum-charcoal mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-xs font-sans text-museum-charcoalLight uppercase tracking-wider">
                    {edu.institution}
                  </p>
                  {idx === 0 && (
                    <p className="text-xs font-sans text-museum-charcoal leading-relaxed border-t border-museum-stone pt-3 mt-3">
                      <strong>{isOdia ? "ନିବନ୍ଧ ବିଷୟ:" : "Doctoral Thesis:"}</strong> &ldquo;{edu.dissertation}&rdquo;
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
