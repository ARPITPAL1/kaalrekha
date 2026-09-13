"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Shield, AlertCircle, Landmark, Lock, ArrowLeft } from "lucide-react";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [verifiedUser, setVerifiedUser] = useState<{
    name: string;
    email: string;
    picture?: string;
    googleSub?: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle Google OAuth Success
  const handleGoogleSuccess = (user: {
    name: string;
    email: string;
    picture?: string;
    googleSub?: string;
  }) => {
    setVerifiedUser(user);
    setErrorMessage(null);
  };

  // Enter Archive after Google Auth
  const handleEnterArchive = () => {
    if (verifiedUser?.email?.toLowerCase().trim() === "kumar2000150@gmail.com") {
      router.push("/admin");
    } else {
      const redirectPath = searchParams.get("redirect") || "/";
      router.push(redirectPath);
    }
    router.refresh();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center bg-museum-ivory overflow-x-hidden px-4 sm:px-6 py-6 md:py-10 text-museum-charcoal selection:bg-museum-terracotta selection:text-white">
      {/* Background Sunlit Roman Architecture */}
      <div className="absolute inset-0 z-0 opacity-15 filter scale-105 pointer-events-none">
        <Image
          src="/images/roman_sunlit_hero.jpg"
          alt="Sunlit Classical Roman architecture"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-museum-ivory via-museum-ivory/80 to-museum-ivory/95" />
      </div>

      {/* Decorative Classical Frame */}
      <div className="absolute inset-4 sm:inset-6 md:inset-8 border border-museum-stone/50 pointer-events-none z-10 hidden sm:block rounded-3xl" />

      {/* Top Header Bar */}
      <header className="relative z-20 w-full max-w-4xl flex items-center justify-between py-2">
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-10 h-10 rounded-xl bg-museum-parchment border border-museum-stone flex items-center justify-center text-museum-terracotta shadow-xs group-hover:scale-105 transition-all">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <span className="font-serif text-xl font-bold tracking-widest text-museum-charcoal block leading-none">
              KAALREKHA
            </span>
            <span className="text-[10px] uppercase tracking-wider text-museum-terracotta font-mono font-semibold block mt-1">
              SCHOLAR ARCHIVE PROTOCOL
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-museum-charcoalLight hover:text-museum-terracotta transition-colors px-3 py-1.5 rounded-xl bg-museum-parchment/80 border border-museum-stone"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Back to Archive</span>
        </Link>
      </header>

      {/* Main Museum Center Card Container */}
      <main className="relative z-20 w-full flex items-center justify-center py-6 sm:py-8 my-auto">
        <div className="w-full max-w-md p-6 sm:p-10 bg-museum-ivory/95 backdrop-blur-xl border border-museum-stone rounded-3xl shadow-2xl transition-all duration-500 space-y-6">
          {/* Error message alert */}
          {errorMessage && (
            <div className="p-3.5 bg-museum-mutedRed/10 border border-museum-mutedRed/30 rounded-2xl text-xs text-museum-mutedRed flex items-center gap-2.5 font-medium animate-fade-in">
              <AlertCircle className="w-4 h-4 text-museum-mutedRed flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {!verifiedUser ? (
            /* ONLY GOOGLE SIGN-IN STATE */
            <div className="space-y-6 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-museum-parchment border border-museum-stone mx-auto flex items-center justify-center text-museum-terracotta shadow-xs">
                  <Landmark className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-museum-terracotta block font-mono">
                    KAALREKHA HISTORICAL ARCHIVE
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl text-museum-charcoal font-bold leading-tight mt-1">
                    Scholar Sign In
                  </h1>
                </div>
                <p className="font-sans text-xs sm:text-sm text-museum-charcoalLight max-w-xs mx-auto leading-relaxed">
                  Authenticate with your Google Account to enter the historical archives, dispatches, monographs, and research logs.
                </p>
              </div>

              {/* Exclusive Google Sign-In Action */}
              <div className="pt-2 flex justify-center">
                <div className="w-full">
                  <GoogleSignInButton
                    onSuccess={handleGoogleSuccess}
                    onError={(err) => setErrorMessage(err)}
                    buttonText="Continue with Google"
                  />
                </div>
              </div>

              {/* Security Trust Seal */}
              <div className="pt-4 border-t border-museum-stone/60 text-center space-y-2">
                <div className="inline-flex items-center justify-center gap-1.5 text-[11px] font-mono text-museum-charcoalLight">
                  <Lock className="w-3.5 h-3.5 text-museum-terracotta" />
                  <span>Google OAuth 2.0 • Secure OpenID Connect</span>
                </div>
                <p className="text-[10px] text-museum-charcoalLight/70 font-sans leading-relaxed max-w-xs mx-auto">
                  Single sign-on authenticated via Google. Your Google unique ID securely provisions your verified visitor session.
                </p>
              </div>
            </div>
          ) : (
            /* ACCESS GRANTED STATE */
            <div className="space-y-6 text-center animate-fade-in">
              <div className="relative mx-auto w-20 h-20">
                {verifiedUser.picture ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={verifiedUser.picture}
                    alt={verifiedUser.name || "Scholar"}
                    className="w-20 h-20 rounded-full object-cover border-2 border-museum-terracotta shadow-md mx-auto"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-museum-olive/15 border border-museum-olive flex items-center justify-center mx-auto text-museum-olive shadow-sm">
                    <CheckCircle2 className="w-10 h-10 animate-pulse" />
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-museum-terracotta font-bold block">
                  GOOGLE CREDENTIALS VERIFIED
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-museum-charcoal">
                  Access Granted
                </h2>
                <p className="font-serif text-lg text-museum-terracotta italic">
                  Welcome, {verifiedUser.name || "Scholar"}.
                </p>
                <p className="text-xs text-museum-charcoalLight font-mono">
                  {verifiedUser.email}
                </p>
                <p className="text-xs text-museum-charcoalLight max-w-xs mx-auto mt-2 font-sans leading-relaxed">
                  A secure session has been established. The historical collections and research logs are now unlocked.
                </p>
              </div>

              <button
                onClick={handleEnterArchive}
                className="w-full py-4 bg-museum-terracotta text-white hover:bg-museum-mutedRed text-xs font-sans font-bold uppercase tracking-wider transition-all rounded-2xl shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>ENTER THE ARCHIVE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="relative z-20 w-full text-center py-2 text-[11px] font-mono text-museum-charcoalLight/60">
        KAALREKHA (କାଳରେଖା) • Historical & Archival Research by Dr. Anjan Kumar Pal
      </footer>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-museum-ivory text-museum-charcoal font-mono text-xs">
          INITIALIZING ARCHIVE GATES...
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}
