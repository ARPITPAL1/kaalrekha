"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/ui/Footer";
import EmailVerification from "@/components/enquiry/EmailVerification";
import CameraVerification from "@/components/enquiry/CameraVerification";
import EnquiryForm from "@/components/enquiry/EnquiryForm";
import { scholarProfile } from "@/data/scholarProfile";
import { ShieldCheck, Mail, CheckCircle2, Lock, ArrowRight, UserCheck, RotateCcw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function EnquiryPage() {
  const { language } = useLanguage();
  const isOdia = language === "or";

  const [userSession, setUserSession] = useState<{ name: string; email: string } | null>(null);
  const [photoVerified, setPhotoVerified] = useState(false);
  const [tempPhotoData, setTempPhotoData] = useState<string | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  // Check visitor session on load
  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUserSession(data.user);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingSession(false));
  }, []);

  const handleEmailVerified = (user: { name: string; email: string }) => {
    setUserSession(user);
  };

  const handlePhotoVerified = (photoData: string | null) => {
    setTempPhotoData(photoData);
    setPhotoVerified(true);
  };

  const handleRestart = async () => {
    setUserSession(null);
    setPhotoVerified(false);
    setTempPhotoData(null);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
  };

  return (
    <div className="min-h-screen w-full bg-museum-ivory text-museum-charcoal selection:bg-museum-terracotta selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-14 px-4 sm:px-6 lg:px-12 border-b border-museum-stone bg-museum-parchment/60">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-museum-terracotta/10 border border-museum-terracotta/20 rounded-full text-xs font-mono uppercase tracking-wider text-museum-terracotta font-semibold">
              <span className="w-2 h-2 rounded-full bg-museum-terracotta" />
              <span>{isOdia ? "ପ୍ରତ୍ୟକ୍ଷ ବିଦ୍ୱାନ ଯୋଗାଯୋଗ" : "DIRECT SCHOLARLY DISPATCH"}</span>
            </div>

            {/* Prominent Header Restart Button */}
            {(userSession || photoVerified) && (
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-museum-stone bg-museum-ivory hover:bg-museum-parchment text-museum-charcoal text-xs font-mono font-semibold transition-all shadow-xs cursor-pointer"
                title={isOdia ? "ସମସ୍ତ ତଥ୍ୟ ପୁନରାରମ୍ଭ କରନ୍ତୁ" : "Restart entire enquiry"}
              >
                <RotateCcw className="w-3.5 h-3.5 text-museum-terracotta" />
                <span>{isOdia ? "ପୁନରାରମ୍ଭ (RESTART)" : "RESTART"}</span>
              </button>
            )}
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-museum-charcoal leading-tight">
            {isOdia ? "ଶିକ୍ଷାଗତ ଅନୁସନ୍ଧାନ ଓ ଯୋଗାଯୋଗ" : "Academic Enquiry"}
          </h1>

          <p className="font-sans text-base sm:text-lg text-museum-charcoalLight mt-3 leading-relaxed">
            {isOdia
              ? "ନିରାପଦ ଗବେଷଣା ବାର୍ତ୍ତାଳାପ ପାଇଁ, ଇମେଲ୍ ଯାଞ୍ଚ ବାଧ୍ୟତାମୂଳକ ଏବଂ ଆପଣଙ୍କ ପରିଚୟ ଫଟୋ ସଂଲଗ୍ନ ହୋଇ ସିଧାସଳଖ kumar2000150@gmail.com କୁ ପଠାଯାଏ।"
              : "For scholarly authenticity, mandatory email verification and an identity snapshot ensure legitimate correspondence, dispatched directly to kumar2000150@gmail.com."}
          </p>

          {/* 3-Step Verification Progress Bar */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Step 1: Email */}
            <div
              className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-mono shadow-xs ${
                userSession
                  ? "bg-museum-olive/10 border-museum-olive/30 text-museum-olive font-bold"
                  : "bg-museum-ivory border-museum-stone text-museum-charcoal"
              }`}
            >
              <span>{isOdia ? "୧. ଇମେଲ୍ ଯାଞ୍ଚ" : "1. EMAIL VERIFICATION"}</span>
              {userSession ? (
                <span className="flex items-center gap-1 text-museum-olive font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {isOdia ? "ପ୍ରମାଣିତ" : "PASSED"}
                </span>
              ) : (
                <span className="text-museum-terracotta font-semibold">{isOdia ? "ବାଧ୍ୟତାମୂଳକ" : "MANDATORY"}</span>
              )}
            </div>

            {/* Step 2: Identity Photo */}
            <div
              className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-mono shadow-xs ${
                photoVerified
                  ? "bg-museum-olive/10 border-museum-olive/30 text-museum-olive font-bold"
                  : userSession
                  ? "bg-museum-ivory border-museum-terracotta/40 text-museum-charcoal"
                  : "bg-museum-ivory/50 border-museum-stone/50 text-museum-charcoalLight/60"
              }`}
            >
              <span>{isOdia ? "୨. ପରିଚୟ ଫଟୋ" : "2. IDENTITY PHOTO"}</span>
              {photoVerified ? (
                <span className="flex items-center gap-1 text-museum-olive font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {isOdia ? "ସଂଲଗ୍ନ" : "PASSED"}
                </span>
              ) : userSession ? (
                <span className="text-museum-terracotta font-semibold">{isOdia ? "ପ୍ରତୀକ୍ଷାରତ" : "PENDING"}</span>
              ) : (
                <span className="text-museum-charcoalLight">{isOdia ? "ତାଲାବଦ୍ଧ" : "LOCKED"}</span>
              )}
            </div>

            {/* Step 3: Message */}
            <div
              className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-mono shadow-xs ${
                photoVerified && userSession
                  ? "bg-museum-ivory border-museum-olive/40 text-museum-charcoal"
                  : "bg-museum-ivory/50 border-museum-stone/50 text-museum-charcoalLight/60"
              }`}
            >
              <span>{isOdia ? "୩. ବାର୍ତ୍ତା ପ୍ରେରଣ" : "3. DISPATCH"}</span>
              {photoVerified && userSession ? (
                <span className="text-museum-olive font-bold">{isOdia ? "ଉନ୍ମୁକ୍ତ" : "READY"}</span>
              ) : (
                <span className="text-museum-charcoalLight">{isOdia ? "ତାଲାବଦ୍ଧ" : "LOCKED"}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Verification Sequence Pipeline */}
      <section className="py-12 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto space-y-8">
        {/* STEP 1: Mandatory Email Verification */}
        <EmailVerification
          initialSession={userSession}
          onVerified={handleEmailVerified}
        />

        {/* STEP 2: Non-biometric Identity Photo */}
        {userSession && (
          <CameraVerification
            onVerified={handlePhotoVerified}
            senderName={userSession.name}
            senderEmail={userSession.email}
            purpose="Scholar Identity Verification"
          />
        )}

        {/* STEP 3: Message Form & Dispatch to kumar2000150@gmail.com */}
        {userSession && photoVerified && (
          <EnquiryForm
            userSession={userSession}
            tempPhotoData={tempPhotoData}
            onRestart={handleRestart}
          />
        )}

        {/* Alternative Academic Contact Info */}
        <div className="pt-10 border-t border-museum-stone">
          <span className="text-xs uppercase font-mono tracking-wider text-museum-terracotta font-bold block mb-4">
            {isOdia ? "ସିଧାସଳଖ ଫ୍ୟାକଲ୍ଟି ଯୋଗାଯୋଗ ବିବରଣୀ" : "DIRECT FACULTY CONTACT & REGISTRIES"}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs font-sans">
            <div className="p-4 bg-museum-parchment/60 border border-museum-stone rounded-xl space-y-1 shadow-xs">
              <span className="text-museum-charcoalLight font-mono block text-[10px] font-semibold">
                {isOdia ? "ମୁଖ୍ୟ ପ୍ରାପକ ଇମେଲ୍:" : "DEFAULT RECIPIENT INBOX:"}
              </span>
              <a
                href="mailto:kumar2000150@gmail.com"
                className="text-museum-charcoal hover:text-museum-terracotta font-mono font-bold break-all"
              >
                kumar2000150@gmail.com
              </a>
            </div>

            <div className="p-4 bg-museum-parchment/60 border border-museum-stone rounded-xl space-y-1 shadow-xs">
              <span className="text-museum-charcoalLight font-mono block text-[10px] font-semibold">
                {isOdia ? "ଅକ୍ସଫୋର୍ଡ ଫ୍ୟାକଲ୍ଟି ଇମେଲ୍:" : "OXFORD FACULTY EMAIL:"}
              </span>
              <a
                href={`mailto:${scholarProfile.socials.academicEmail}`}
                className="text-museum-charcoal hover:text-museum-terracotta font-mono font-semibold break-all"
              >
                {scholarProfile.socials.academicEmail}
              </a>
            </div>

            <div className="p-4 bg-museum-parchment/60 border border-museum-stone rounded-xl space-y-1 shadow-xs">
              <span className="text-museum-charcoalLight font-mono block text-[10px] font-semibold">
                {isOdia ? "ଶାରୀରିକ କାର୍ଯ୍ୟାଳୟ:" : "PHYSICAL OFFICE:"}
              </span>
              <span className="text-museum-charcoal block font-medium">
                Faculty of Classics, Ioannou Centre, St Giles&apos;, Oxford
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
