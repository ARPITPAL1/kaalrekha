"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/ui/Footer";
import EnquiryForm from "@/components/enquiry/EnquiryForm";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { Send, Mail, UserCheck, Sparkles, HelpCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function EnquiryPage() {
  const { language } = useLanguage();
  const isOdia = language === "or";

  const [userSession, setUserSession] = useState<{ name: string; email: string; picture?: string } | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  // Auto-detect logged-in scholar profile
  useEffect(() => {
    try {
      const saved = localStorage.getItem("kaalrekha_scholar_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.email) {
          setUserSession({
            name: parsed.name || "Scholar Researcher",
            email: parsed.email,
            picture: parsed.picture,
          });
        }
      }
    } catch {}

    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUserSession(data.user);
          try {
            localStorage.setItem(
              "kaalrekha_scholar_user",
              JSON.stringify({ name: data.user.name, email: data.user.email, picture: data.user.picture })
            );
          } catch {}
        }
      })
      .catch(() => {})
      .finally(() => setLoadingSession(false));
  }, []);

  return (
    <div className="min-h-screen w-full bg-museum-ivory text-museum-charcoal selection:bg-museum-terracotta selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-12 px-4 sm:px-6 lg:px-12 border-b border-museum-stone bg-museum-parchment/60">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-museum-terracotta/10 border border-museum-terracotta/20 rounded-full text-xs font-mono uppercase tracking-wider text-museum-terracotta font-bold">
              <span className="w-2 h-2 rounded-full bg-museum-terracotta animate-pulse" />
              <span>{isOdia ? "ପ୍ରତ୍ୟକ୍ଷ ବିଦ୍ୱାନ ଯୋଗାଯୋଗ" : "DIRECT SCHOLARLY DISPATCH"}</span>
            </div>

            {userSession && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-museum-olive/10 border border-museum-olive/30 rounded-full text-xs font-mono text-museum-olive font-semibold">
                <UserCheck className="w-3.5 h-3.5" />
                <span>{isOdia ? "ପଞ୍ଜୀକୃତ ବିଦ୍ୱାନ" : "LOGGED-IN SCHOLAR"}</span>
              </div>
            )}
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-museum-charcoal leading-tight">
            {isOdia ? "ଶିକ୍ଷାଗତ ଅନୁସନ୍ଧାନ ଓ ଯୋଗାଯୋଗ" : "Academic Enquiry"}
          </h1>

          <p className="font-sans text-base sm:text-lg text-museum-charcoalLight leading-relaxed">
            {isOdia
              ? "ଡକ୍ଟର ଅଞ୍ଜନ କୁମାର ପାଲଙ୍କ ସହ ଐତିହାସିକ ଗବେଷଣା, ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ସର୍ବେକ୍ଷଣ କିମ୍ବା ଆକାଡେମିକ୍ ପରାମର୍ଶ ପାଇଁ ସିଧାସଳଖ ବାର୍ତ୍ତା ପ୍ରେରଣ କରନ୍ତୁ।"
              : "Send historical research queries, archaeological survey questions, or collaboration proposals directly to Dr. Anjan Kumar Pal. All submissions are logged into the archive."}
          </p>

          {/* Quick Info Box */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-museum-charcoalLight">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-museum-terracotta" />
              <span>{isOdia ? "ସ୍ୱୟଂଚାଳିତ ଲଗ୍ ରକ୍ଷଣାବେକ୍ଷଣ" : "Automated Admin Logbook Record"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-museum-terracotta" />
              <span>{isOdia ? "ସିଧାସଳଖ ଆର୍କାଇଭ୍ ଡେସ୍କ କୁ ପ୍ରେରଣ" : "Direct Dispatch to Archive Inbox"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form Container */}
      <section className="py-12 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto space-y-8">
        <EnquiryForm
          userSession={userSession}
          onLoginSuccess={(user) => {
            setUserSession(user);
          }}
        />
      </section>

      <Footer />
    </div>
  );
}
