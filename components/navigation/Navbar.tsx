"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Shield, LogOut, Landmark, Globe, ChevronDown, UserCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userSession, setUserSession] = useState<{
    name: string;
    email: string;
    picture?: string;
    googleSub?: string;
    authProvider?: string;
    isAdmin?: boolean;
    role?: string;
  } | null>(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const { language, toggleLanguage, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Fetch visitor session info
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUserSession(data.user);
        }
      })
      .catch(() => {});

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUserSession(null);
    window.location.href = "/onboarding";
  };

  const navLinks = [
    { name: language === "or" ? "ପ୍ରଚ୍ଛଦ" : "HOME", href: "/" },
    { name: language === "or" ? "ଗବେଷଣା" : "RESEARCH", href: "/research" },
    { name: language === "or" ? "ବ୍ଲଗ୍ ଓ ଅପଡେଟ୍" : "BLOG & FEED", href: "/blog" },
    { name: language === "or" ? "ଭାରତ (ଓଡ଼ିଶା)" : "INDIA (BHARAT)", href: "/india" },
    { name: language === "or" ? "ପରିଚୟ" : "ABOUT", href: "/about" },
    { name: language === "or" ? "ଅନୁସନ୍ଧାନ" : "ENQUIRY", href: "/enquiry" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-museum-ivory/95 backdrop-blur-md border-b border-museum-stone shadow-sm py-3"
            : "bg-museum-ivory/90 backdrop-blur-sm border-b border-museum-stone/40 py-3.5"
        }`}
      >
        <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          {/* Logo & Classical Identity */}
          <Link href="/" className="group flex items-center gap-3.5 focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-museum-parchment border border-museum-stone/80 flex items-center justify-center text-museum-terracotta group-hover:border-museum-terracotta group-hover:scale-105 transition-all shadow-xs">
              <Landmark className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.18em] text-museum-charcoal group-hover:text-museum-terracotta transition-colors uppercase">
                KAALREKHA
              </span>
              <span className="text-[8.5px] tracking-[0.22em] uppercase text-museum-charcoalLight font-mono font-medium -mt-0.5">
                PAST INSPIRES TOMORROW
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-8">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group py-1 text-xs font-sans uppercase tracking-[0.16em] transition-colors focus:outline-none"
                >
                  <span
                    className={`${
                      isActive
                        ? "text-museum-terracotta font-bold"
                        : "text-museum-charcoalLight hover:text-museum-charcoal font-semibold"
                    } transition-colors`}
                  >
                    {item.name}
                  </span>

                  {/* Active accent line */}
                  <span
                    className={`absolute -bottom-1 left-0 w-full h-[2px] transition-all duration-300 rounded-full ${
                      isActive
                        ? "bg-museum-terracotta opacity-100 scale-x-100"
                        : "bg-museum-terracotta/40 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Header Controls: Language Selector, User Profile & Session Controls */}
          <div className="flex items-center space-x-3 sm:space-x-4 text-xs">
            {/* Language Switcher Pill matching design */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-museum-parchment/80 border border-museum-stone hover:border-museum-terracotta text-museum-charcoal font-sans text-xs transition-all shadow-xs cursor-pointer"
                title={language === "or" ? "Change Language" : "ଭାଷା ପରିବର୍ତ୍ତନ କରନ୍ତୁ"}
                aria-label="Select language"
              >
                <Globe className="w-3.5 h-3.5 text-museum-terracotta" />
                <span className="font-semibold">
                  {language === "or" ? "ଓଡ଼ିଆ" : "English"}
                </span>
                <ChevronDown className="w-3 h-3 text-museum-charcoalLight" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-36 bg-museum-ivory border border-museum-stone rounded-xl shadow-lg p-1 z-50">
                  <button
                    onClick={() => {
                      setLanguage("en");
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      language === "en"
                        ? "bg-museum-terracotta text-white font-bold"
                        : "text-museum-charcoal hover:bg-museum-parchment"
                    }`}
                  >
                    <span>English</span>
                    {language === "en" && <span>✓</span>}
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("or");
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      language === "or"
                        ? "bg-museum-terracotta text-white font-bold"
                        : "text-museum-charcoal hover:bg-museum-parchment"
                    }`}
                  >
                    <span>ଓଡ଼ିଆ (Odia)</span>
                    {language === "or" && <span>✓</span>}
                  </button>
                </div>
              )}
            </div>

            {userSession ? (
              <div className="hidden lg:flex items-center gap-2 pl-2">
                {userSession.email?.toLowerCase().trim() === "kumar2000150@gmail.com" && (
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-museum-terracotta hover:bg-museum-mutedRed text-white font-mono text-[11px] font-bold tracking-wider uppercase transition-all shadow-xs"
                  >
                    <Landmark className="w-3.5 h-3.5" />
                    <span>ADMIN DESK</span>
                  </Link>
                )}

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-museum-parchment border border-museum-stone text-museum-charcoal">
                  {userSession.picture ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={userSession.picture}
                      alt={userSession.name}
                      className="w-5 h-5 rounded-full object-cover border border-museum-terracotta/40"
                    />
                  ) : (
                    <Shield className="w-3.5 h-3.5 text-museum-terracotta" />
                  )}
                  <span className="font-sans uppercase tracking-wider text-[10px] font-semibold max-w-[120px] truncate">
                    {userSession.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-museum-charcoalLight hover:text-museum-terracotta transition-colors p-1 flex items-center gap-1 cursor-pointer"
                  title={language === "or" ? "ପ୍ରସ୍ଥାନ କରନ୍ତୁ" : "Sign Out"}
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/onboarding"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-museum-parchment border border-museum-stone hover:border-museum-terracotta text-museum-charcoal font-semibold text-xs tracking-wider transition-all shadow-xs"
                >
                  <UserCheck className="w-3.5 h-3.5 text-museum-terracotta" />
                  <span>{language === "or" ? "ଗୁଗଲ୍ ସାଇନ୍ ଇନ୍" : "Google Sign In"}</span>
                </Link>
                <Link
                  href="/india"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8A3324] hover:bg-[#70291C] text-white font-medium text-xs tracking-wider transition-all duration-300 shadow-sm hover:shadow"
                >
                  <span>{language === "or" ? "ଅନୁସନ୍ଧାନ କରନ୍ତୁ" : "Explore Now"}</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="xl:hidden p-2 rounded-xl bg-museum-parchment border border-museum-stone text-museum-charcoal hover:border-museum-terracotta transition-colors cursor-pointer"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
        currentPath={pathname}
        userSession={userSession}
        onLogout={handleLogout}
        language={language}
        onToggleLanguage={toggleLanguage}
      />
    </>
  );
}
