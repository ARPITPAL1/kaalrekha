"use client";

import Link from "next/link";
import { scholarProfile } from "@/data/scholarProfile";
import { Landmark } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t, language } = useLanguage();
  const isOdia = language === "or";

  return (
    <footer className="relative w-full bg-museum-parchment border-t border-museum-stone py-16 px-4 sm:px-6 lg:px-12 text-museum-charcoal">
      <div className="max-w-[1680px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-museum-stone">
          {/* Col 1: Scholar identity */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-museum-ivory border border-museum-stone flex items-center justify-center text-museum-terracotta">
                <Landmark className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-widest text-museum-charcoal">
                KAALREKHA (କାଳରେଖା)
              </span>
            </div>
            <p className="font-serif text-lg text-museum-charcoal font-medium">
              {isOdia ? scholarProfile.nameOdia : scholarProfile.name}
            </p>
            <p className="text-xs text-museum-charcoalLight font-sans uppercase tracking-widest">
              {isOdia ? scholarProfile.institutionOdia : scholarProfile.institution}
            </p>
            <p className="text-[11px] text-[#8A3324] font-mono font-medium">
              FAKIR MOHAN UNIVERSITY · {scholarProfile.coordinates}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 text-xs font-sans uppercase tracking-wider">
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-museum-antiqueGold font-bold block">
                {t.footer.archiveDossiers}
              </span>
              <Link href="/" className="block text-museum-charcoalLight hover:text-museum-terracotta transition-colors">
                {t.nav.home}
              </Link>
              <Link href="/research" className="block text-museum-charcoalLight hover:text-museum-terracotta transition-colors">
                {t.nav.research}
              </Link>
              <Link href="/india" className="block text-museum-charcoalLight hover:text-museum-terracotta transition-colors">
                {t.nav.india}
              </Link>
            </div>
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-museum-antiqueGold font-bold block">
                {t.footer.institutional}
              </span>
              <Link href="/globe" className="block text-museum-charcoalLight hover:text-museum-terracotta transition-colors">
                {t.nav.globe}
              </Link>
              <Link href="/about" className="block text-museum-charcoalLight hover:text-museum-terracotta transition-colors">
                {t.nav.about}
              </Link>
              <Link href="/enquiry" className="block text-museum-charcoalLight hover:text-museum-terracotta transition-colors">
                {t.nav.enquiry}
              </Link>
            </div>
          </div>

          {/* Col 3: Academic Indexes */}
          <div className="md:col-span-3 space-y-3 text-xs font-sans">
            <span className="text-[10px] font-mono uppercase text-museum-antiqueGold font-bold block">
              {t.footer.registries}
            </span>
            <div className="space-y-2 text-museum-charcoalLight">
              <div>
                <span className="text-[10px] font-mono text-museum-charcoalLight block">ORCID ID:</span>
                <a
                  href={`https://orcid.org/${scholarProfile.socials.orcid}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-museum-terracotta font-mono text-xs text-museum-charcoal font-semibold"
                >
                  {scholarProfile.socials.orcid}
                </a>
              </div>
              <div>
                <span className="text-[10px] font-mono text-museum-charcoalLight block">DEFAULT INBOX:</span>
                <a
                  href="mailto:kumar2000150@gmail.com"
                  className="font-mono text-xs text-museum-terracotta font-bold hover:underline"
                >
                  kumar2000150@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Ethics Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-museum-charcoalLight font-sans gap-4">
          <p>
            &copy; {new Date().getFullYear()} {isOdia ? t.hero.scholarName : scholarProfile.name}. {t.footer.copyright}
          </p>
          <div className="flex items-center gap-6 text-[11px] font-mono">
            <span>{t.footer.zeroBiometric}</span>
            <span>{t.footer.accessible}</span>
            <Link href="/about" className="hover:text-museum-terracotta">
              {t.footer.credits}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
