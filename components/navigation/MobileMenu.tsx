"use client";

import Link from "next/link";
import { X, Shield, LogOut, Landmark, Languages, UserCheck } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { name: string; href: string }[];
  currentPath: string;
  userSession: {
    name: string;
    email: string;
    picture?: string;
    googleSub?: string;
    authProvider?: string;
    isAdmin?: boolean;
    role?: string;
  } | null;
  onLogout: () => void;
  language: "or" | "en";
  onToggleLanguage: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  links,
  currentPath,
  userSession,
  onLogout,
  language,
  onToggleLanguage,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-museum-ivory flex flex-col justify-between p-6 sm:p-8 overflow-y-auto animate-fade-in text-museum-charcoal">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-museum-stone pb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-museum-parchment border border-museum-stone flex items-center justify-center text-museum-terracotta">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <span className="font-serif text-xl font-bold tracking-widest text-museum-charcoal">
              KAALREKHA
            </span>
            <span className="block text-[9px] uppercase tracking-wider text-museum-terracotta font-sans mt-0.5 font-semibold">
              {language === "or" ? "ଇତିହାସ ପ୍ରେରଣା ଦିଏ" : "PAST INSPIRES TOMORROW"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Language Switcher */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-museum-parchment border border-museum-stone text-xs font-semibold text-museum-charcoal"
          >
            <Languages className="w-3.5 h-3.5 text-museum-terracotta" />
            <span>{language === "or" ? "ଓଡ଼ିଆ" : "English"}</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-museum-parchment border border-museum-stone text-museum-charcoal hover:border-museum-terracotta transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Navigation Links */}
      <nav className="my-8 flex flex-col space-y-3">
        {links.map((link, idx) => {
          const isActive =
            link.href === "/"
              ? currentPath === "/"
              : currentPath.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="group flex items-baseline justify-between py-3 border-b border-museum-stone/60"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-xs font-mono text-museum-antiqueGold font-semibold">
                  0{idx + 1}
                </span>
                <span
                  className={`font-serif text-2xl tracking-wide transition-colors ${
                    isActive
                      ? "text-museum-terracotta font-bold"
                      : "text-museum-charcoal group-hover:text-museum-terracotta"
                  }`}
                >
                  {link.name}
                </span>
              </div>
              {isActive && (
                <span className="w-2.5 h-2.5 rounded-full bg-museum-terracotta" />
              )}
            </Link>
          );
        })}

        {userSession?.email?.toLowerCase().trim() === "kumar2000150@gmail.com" && (
          <Link
            href="/admin"
            onClick={onClose}
            className="group flex items-baseline justify-between py-3 border-b border-museum-terracotta/40 bg-museum-terracotta/5 px-2 rounded-xl"
          >
            <div className="flex items-baseline gap-4">
              <span className="text-xs font-mono text-museum-terracotta font-bold">ADM</span>
              <span className="font-serif text-2xl tracking-wide text-museum-terracotta font-bold">
                ADMIN DESK & LOG BOOK
              </span>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-museum-terracotta animate-pulse" />
          </Link>
        )}
      </nav>

      {/* Bottom Session & Utilities */}
      <div className="pt-5 border-t border-museum-stone space-y-4">
        {userSession ? (
          <div className="flex items-center justify-between py-3 px-4 bg-museum-parchment rounded-xl border border-museum-stone">
            <div className="flex items-center gap-2.5">
              {userSession.picture ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={userSession.picture}
                  alt={userSession.name}
                  className="w-7 h-7 rounded-full object-cover border border-museum-terracotta/40"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-museum-terracotta/10 border border-museum-terracotta/20 flex items-center justify-center text-museum-terracotta">
                  <Shield className="w-4 h-4" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-xs font-sans text-museum-charcoal uppercase tracking-wider font-semibold">
                  {userSession.name}
                </span>
                <span className="text-[10px] text-museum-charcoalLight font-mono">
                  {userSession.email}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="text-xs text-museum-terracotta hover:underline flex items-center gap-1 font-mono font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              {language === "or" ? "ପ୍ରସ୍ଥାନ" : "Exit"}
            </button>
          </div>
        ) : (
          <Link
            href="/onboarding"
            onClick={onClose}
            className="w-full py-3 bg-museum-parchment border border-museum-stone text-museum-charcoal hover:border-museum-terracotta text-xs font-sans font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4 text-museum-terracotta" />
            <span>{language === "or" ? "ଗୁଗଲ୍ ସହିତ ସାଇନ୍ ଇନ୍ କରନ୍ତୁ" : "Sign In with Google"}</span>
          </Link>
        )}

        <div className="flex items-center justify-between text-xs text-museum-charcoalLight font-mono">
          <span>KAALREKHA ARCHIVE</span>
          <span>EST. MMXXVI</span>
        </div>
      </div>
    </div>
  );
}
