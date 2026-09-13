"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Shield, AlertCircle, Landmark, Lock } from "lucide-react";
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
    const redirectPath = searchParams.get("redirect") || "/";
    router.push(redirectPath);
    router.refresh();
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-museum-ivory overflow-hidden px-4 sm:px-6 py-12 text-museum-charcoal selection:bg-museum-terracotta selection:text-white">
      {/* Background Sunlit Roman Architecture */}
      <div className="absolute inset-0 z-0 opacity-20 filter scale-105 pointer-events-none">
        <Image
          src="/images/roman_sunlit_hero.jpg"
          alt="Sunlit Classical Roman architecture"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-museum-ivory via-museum-ivory/80 to-museum-ivory/90" />
      </div>

      {/* Decorative Classical Frame */}
      <div className="absolute inset-6 md:inset-10 border border-museum-stone/60 pointer-events-none z-10 hidden sm:block rounded-2xl" />

      {/* Top Left Brand Badge */}
      <div className="absolute top-6 left-6 md:left-12 z-20 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-museum-parchment border border-museum-stone flex items-center justify-center text-museum-terracotta">
          <Landmark className="w-4 h-4" />
        </div>
        <span className="font-serif text-xl font-bold tracking-widest text-museum-charcoal">KAALREKHA</span>
        <span className="text-[10px] uppercase tracking-wider text-museum-terracotta font-mono border-l border-museum-stone pl-3 font-semibold">
          SCHOLAR ACCESS PROTOCOL
        </span>
      </div>

      {/* Main Museum Center Card */}
      <div className="relative z-20 w-full max-w-md p-8 md:p-10 bg-museum-ivory/95 backdrop-blur-xl border border-museum-stone rounded-2xl shadow-xl transition-all duration-500">
        {/* Error message alert */}
        {errorMessage && (
          <div className="mb-6 p-3.5 bg-museum-mutedRed/10 border border-museum-mutedRed/30 rounded-xl text-xs text-museum-mutedRed flex items-center gap-2.5 font-medium">
            <AlertCircle className="w-4 h-4 text-museum-mutedRed flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {!verifiedUser ? (
          /* ONLY GOOGLE SIGN-IN STATE */
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-museum-parchment border border-museum-stone mx-auto flex items-center justify-center text-museum-terracotta mb-4 shadow-xs">
                <Landmark className="w-7 h-7" />
              </div>
              <span className="text-xs font-sans font-semibold uppercase tracking-widest text-museum-terracotta block mb-1 font-mono">
                KAALREKHA HISTORICAL ARCHIVE
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-museum-charcoal font-bold leading-tight">
                Scholar Sign In
              </h1>
              <p className="font-sans text-xs sm:text-sm text-museum-charcoalLight mt-2.5 leading-relaxed">
                Authenticate with your Google Account to enter the historical archives, manuscripts, and 3D research models.
              </p>
            </div>

            {/* Exclusive Google Sign-In Action */}
            <div className="pt-2">
              <GoogleSignInButton
                onSuccess={handleGoogleSuccess}
                onError={(err) => setErrorMessage(err)}
                buttonText="Continue with Google"
              />
            </div>

            {/* Security Trust Seal */}
            <div className="pt-4 border-t border-museum-stone/60 text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-museum-charcoalLight">
                <Lock className="w-3.5 h-3.5 text-museum-terracotta" />
                <span>Google OAuth 2.0 • Secure OpenID Connect</span>
              </div>
              <p className="text-[10px] text-museum-charcoalLight/70 font-sans leading-normal">
                Single sign-on authenticated via Google. Your Google unique ID (sub) securely provisions your visitor session.
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

            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-museum-terracotta font-bold">
                GOOGLE CREDENTIALS VERIFIED
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-museum-charcoal mt-1">
                Access Granted
              </h2>
              <p className="font-serif text-lg text-museum-terracotta italic mt-1">
                Welcome, {verifiedUser.name || "Scholar"}.
              </p>
              <p className="text-xs text-museum-charcoalLight font-mono mt-1">
                {verifiedUser.email}
              </p>
              <p className="text-xs text-museum-charcoalLight max-w-xs mx-auto mt-2 font-sans leading-relaxed">
                A secure visitor session has been established. The historical collections are now open to you.
              </p>
            </div>

            <button
              onClick={handleEnterArchive}
              className="w-full py-4 bg-museum-terracotta text-white hover:bg-museum-mutedRed text-xs font-sans font-bold uppercase tracking-wider transition-all rounded-xl shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>ENTER THE ARCHIVE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
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
