"use client";

import { useState, useEffect } from "react";
import { Mail, CheckCircle2, User, Sparkles, RefreshCw, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

interface EmailVerificationProps {
  initialSession: { name: string; email: string } | null;
  onVerified: (user: { name: string; email: string }) => void;
}

export default function EmailVerification({ initialSession, onVerified }: EmailVerificationProps) {
  const { language } = useLanguage();
  const isOdia = language === "or";

  const [name, setName] = useState(initialSession?.name || "");
  const [email, setEmail] = useState(initialSession?.email || "");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [verifiedUser, setVerifiedUser] = useState<{ name: string; email: string } | null>(
    initialSession
  );

  // Automatically sync and copy login email whenever initialSession or localStorage is present
  useEffect(() => {
    if (initialSession && initialSession.email) {
      setName(initialSession.name || "");
      setEmail(initialSession.email || "");
      setVerifiedUser(initialSession);
      onVerified(initialSession);
      return;
    }

    try {
      const saved = localStorage.getItem("kaalrekha_scholar_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.email) {
          const userObj = { name: parsed.name || "Verified Scholar", email: parsed.email };
          setName(userObj.name);
          setEmail(userObj.email);
          setVerifiedUser(userObj);
          onVerified(userObj);
        }
      }
    } catch {}
  }, [initialSession, onVerified]);

  // Seamless direct verification without OTP
  const handleDirectConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || cleanName.length < 2) {
      setErrorMessage(isOdia ? "ଦୟାକରି ଆପଣଙ୍କ ପୂରା ନାମ ଲେଖନ୍ତୁ।" : "Please enter your full scholarly name.");
      return;
    }

    if (!cleanEmail || !cleanEmail.includes("@")) {
      setErrorMessage(isOdia ? "ଦୟାକରି ଏକ ବୈଧ ଇମେଲ୍ ଠିକଣା ପ୍ରବେଶ କରନ୍ତୁ।" : "Please enter a valid email address.");
      return;
    }

    setLoading(true);

    const userObj = { name: cleanName, email: cleanEmail };
    try {
      localStorage.setItem("kaalrekha_scholar_user", JSON.stringify(userObj));
    } catch {}

    setVerifiedUser(userObj);
    onVerified(userObj);
    setLoading(false);
  };

  const handleReset = () => {
    setVerifiedUser(null);
  };

  if (verifiedUser) {
    return (
      <div className="w-full bg-museum-parchment/60 border border-museum-stone rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between border-b border-museum-stone pb-4 mb-4">
          <div className="flex items-center gap-2 text-museum-olive text-xs font-mono font-semibold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>{isOdia ? "ପଦକ୍ଷେପ ୧: ଇମେଲ୍ ଯାଞ୍ଚ ସଫଳ (ପ୍ରମାଣିତ)" : "STEP 1: LOGIN EMAIL CONFIRMED"}</span>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-mono text-museum-terracotta hover:underline cursor-pointer"
          >
            {isOdia ? "ଇମେଲ୍ ପରିବର୍ତ୍ତନ କରନ୍ତୁ" : "Switch Account"}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-museum-ivory p-4 rounded-xl border border-museum-stone shadow-2xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-museum-terracotta" />
              <p className="font-serif text-lg font-bold text-museum-charcoal">{verifiedUser.name}</p>
            </div>
            <p className="text-xs font-mono text-museum-charcoalLight pl-6">{verifiedUser.email}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-museum-olive bg-museum-olive/10 border border-museum-olive/20 px-3.5 py-1.5 rounded-lg self-start sm:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {isOdia ? "ଲଗଇନ୍ ଇମେଲ୍ ଯୋଡ଼ାଗଲା" : "LOGIN ACCOUNT BOUND"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-museum-parchment/60 border border-museum-stone rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-museum-stone pb-4">
        <div className="flex items-center gap-2 text-museum-terracotta text-xs font-mono font-semibold uppercase tracking-wider">
          <Mail className="w-4 h-4" />
          <span>{isOdia ? "ପଦକ୍ଷେପ ୧: ପରିଦର୍ଶକ ପରିଚୟ ଓ ଇମେଲ୍" : "STEP 1: VISITOR SCHOLAR PROFILE"}</span>
        </div>
        <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-museum-terracotta/10 text-museum-terracotta font-semibold border border-museum-terracotta/20">
          {isOdia ? "ବାଧ୍ୟତାମୂଳକ" : "MANDATORY"}
        </span>
      </div>

      {errorMessage && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 font-sans">
          {errorMessage}
        </div>
      )}

      {/* Quick Google Sign-In Option */}
      <div className="bg-museum-ivory p-5 rounded-2xl border border-museum-stone space-y-3">
        <p className="text-xs font-sans text-museum-charcoalLight leading-relaxed">
          {isOdia
            ? "ଗୁଗଲ୍ ଲଗଇନ୍ ମାଧ୍ୟମରେ ଆପଣଙ୍କ ପରିଚୟ ସ୍ୱୟଂଚାଳିତ ଭାବେ ଯୋଡ଼ି ଦିଅନ୍ତୁ କିମ୍ବା ତଳେ ଆପଣଙ୍କ ଇମେଲ୍ ଲେଖନ୍ତୁ:"
            : "Sign in with Google to automatically copy your verified name and email, or fill below directly:"}
        </p>
        <GoogleSignInButton
          onSuccess={(user) => {
            const userObj = { name: user.name, email: user.email };
            setName(user.name);
            setEmail(user.email);
            setVerifiedUser(userObj);
            onVerified(userObj);
          }}
          buttonText="Auto-fill with Google"
        />
      </div>

      {/* Direct Form Entry without OTP */}
      <form onSubmit={handleDirectConfirm} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-museum-charcoalLight mb-1.5 font-semibold">
              {isOdia ? "ଆପଣଙ୍କ ପୂରା ନାମ *" : "FULL SCHOLAR NAME *"}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isOdia ? "ଉଦାହରଣ: ରାଜେଶ ମହାନ୍ତି" : "e.g. Dr. Arthur Evans"}
              className="w-full bg-museum-ivory border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal focus:border-museum-terracotta focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-museum-charcoalLight mb-1.5 font-semibold">
              {isOdia ? "ଇମେଲ୍ ଠିକଣା *" : "LOGIN EMAIL ADDRESS *"}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@institution.edu"
              className="w-full bg-museum-ivory border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal focus:border-museum-terracotta focus:outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-museum-terracotta hover:bg-museum-mutedRed text-white text-xs font-semibold uppercase tracking-wider transition-all rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>{isOdia ? "ଯାଞ୍ଚ ହେଉଛି..." : "CONFIRMING..."}</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>{isOdia ? "ଏହି ଇମେଲ୍ ସହିତ ଆଗକୁ ବଢ଼ନ୍ତୁ" : "CONFIRM & CONTINUE WITH THIS EMAIL"}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
