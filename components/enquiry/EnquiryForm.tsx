"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, ShieldAlert, RefreshCw, ArrowLeft, Mail, RotateCcw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface EnquiryFormProps {
  userSession: { name: string; email: string };
  tempPhotoData: string | null;
  onRestart?: () => void;
}

export default function EnquiryForm({ userSession, tempPhotoData, onRestart }: EnquiryFormProps) {
  const { language } = useLanguage();
  const isOdia = language === "or";

  const [fullName, setFullName] = useState(userSession.name);
  const [email, setEmail] = useState(userSession.email);
  const [affiliation, setAffiliation] = useState("");
  const [purpose, setPurpose] = useState(isOdia ? "ଐତିହାସିକ ଗବେଷଣା ପରାମର୍ଶ" : "Research Collaboration");
  const [preferredMethod, setPreferredMethod] = useState("Email");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [auditInfo, setAuditInfo] = useState<{ timestamp: string; recipient: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!message || message.length < 10) {
      setErrorMessage(
        isOdia
          ? "ଦୟାକରି ଏକ ବିସ୍ତୃତ ବାର୍ତ୍ତା ଲେଖନ୍ତୁ (ଅତି କମରେ ୧୦ ଅକ୍ଷର)।"
          : "Please enter a substantive inquiry message (minimum 10 characters)."
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          emailVerified: true,
          faceVerified: true,
          affiliation,
          purpose,
          preferredMethod,
          message,
          tempPhotoData,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setErrorMessage(data.error || "Failed to deliver enquiry.");
        return;
      }

      setAuditInfo(data.audit);
      setSubmitted(true);
    } catch {
      setErrorMessage(
        isOdia
          ? "ନେଟୱର୍କ ତ୍ରୁଟି। ଦୟାକରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।"
          : "Network error occurred during dispatch. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="w-full bg-museum-parchment/60 border border-museum-stone rounded-2xl p-8 md:p-12 text-center space-y-6 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-museum-olive/15 border border-museum-olive/40 flex items-center justify-center mx-auto text-museum-olive">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div>
          <span className="text-[11px] uppercase font-mono tracking-wider text-museum-terracotta font-semibold">
            {isOdia ? "ପ୍ରେରଣ ସଫଳ ହେଲା" : "DISPATCH CONFIRMATION"}
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-museum-charcoal mt-2">
            {isOdia ? "ଅନୁସନ୍ଧାନ ବାର୍ତ୍ତା ପ୍ରେରିତ" : "ENQUIRY SUCCESSFULLY SENT"}
          </h3>
          <p className="font-sans text-base text-museum-charcoalLight max-w-md mx-auto mt-3 leading-relaxed">
            {isOdia
              ? "ଆପଣଙ୍କ ବାର୍ତ୍ତା ଓ ପରିଚୟ ଫଟୋ ସଫଳତାର ସହିତ kumar2000150@gmail.com କୁ ପଠାଯାଇଛି।"
              : "Your message and verified identity photo have been dispatched directly to kumar2000150@gmail.com."}
          </p>
        </div>

        {/* Audit Verification Card */}
        <div className="max-w-md mx-auto p-4 bg-museum-ivory border border-museum-stone rounded-xl text-xs font-mono text-left space-y-2 text-museum-charcoal">
          <div className="flex justify-between border-b border-museum-stone/50 pb-1.5">
            <span className="text-museum-charcoalLight">{isOdia ? "ଗନ୍ତବ୍ୟ ଇମେଲ୍:" : "DESTINATION INBOX:"}</span>
            <span className="font-bold text-museum-terracotta">kumar2000150@gmail.com</span>
          </div>
          <div className="flex justify-between border-b border-museum-stone/50 pb-1.5">
            <span className="text-museum-charcoalLight">{isOdia ? "ଇମେଲ୍ ଯାଞ୍ଚ ସ୍ଥିତି:" : "EMAIL STATUS:"}</span>
            <span className="text-museum-olive font-bold">{isOdia ? "ପ୍ରମାଣିତ (VERIFIED)" : "VERIFIED"}</span>
          </div>
          <div className="flex justify-between border-b border-museum-stone/50 pb-1.5">
            <span className="text-museum-charcoalLight">{isOdia ? "ପରିଚୟ ଫଟୋ:" : "IDENTITY PHOTO:"}</span>
            <span className="text-museum-charcoal">{isOdia ? "ସଂଲଗ୍ନ (ଅଣ-ବାୟୋମେଟ୍ରିକ୍)" : "ATTACHED (NON-BIOMETRIC)"}</span>
          </div>
          {auditInfo && (
            <div className="flex justify-between">
              <span className="text-museum-charcoalLight">{isOdia ? "ସମୟ ମୋହର:" : "TIMESTAMP:"}</span>
              <span className="text-museum-charcoal">{auditInfo.timestamp}</span>
            </div>
          )}
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          {onRestart && (
            <button
              onClick={onRestart}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-museum-ivory border border-museum-stone hover:bg-museum-parchment text-museum-charcoal text-xs font-sans font-semibold uppercase tracking-wider rounded-xl transition-all shadow-xs"
            >
              <RotateCcw className="w-4 h-4 text-museum-terracotta" />
              <span>{isOdia ? "ପୁନରାରମ୍ଭ (RESTART)" : "RESTART NEW ENQUIRY"}</span>
            </button>
          )}

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-museum-terracotta hover:bg-museum-terracottaDark text-white text-xs font-semibold uppercase tracking-wider transition-all rounded-xl shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isOdia ? "ମୁଖ୍ୟ ପୃଷ୍ଠାକୁ ଫେରନ୍ତୁ" : "RETURN TO ARCHIVE"}</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-museum-parchment/60 border border-museum-stone rounded-2xl p-6 md:p-10 space-y-6 shadow-sm"
    >
      <div className="border-b border-museum-stone pb-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-museum-terracotta font-semibold">
            {isOdia ? "ପଦକ୍ଷେପ ୩: ଶେଷ ବାର୍ତ୍ତା ପ୍ରେରଣ" : "STEP 3: ACADEMIC MESSAGE DISPATCH"}
          </span>
          <span className="text-xs font-mono text-museum-charcoalLight flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-museum-terracotta" />
            <span>To: <strong>kumar2000150@gmail.com</strong></span>
          </span>
        </div>
        <h3 className="font-serif text-3xl font-bold text-museum-charcoal mt-1">
          {isOdia ? "ବାର୍ତ୍ତା ଏବଂ ପ୍ରଶ୍ନାବଳୀ ଫର୍ମ" : "Academic Enquiry Form"}
        </h3>
        <p className="text-xs text-museum-charcoalLight font-sans mt-1">
          {isOdia
            ? "ଆପଣଙ୍କ ଇମେଲ୍ ଏବଂ ପରିଚୟ ଫଟୋ ସଫଳତାର ସହ ଯାଞ୍ଚ ହୋଇଛି। ଏହି ବାର୍ତ୍ତାଟି ସିଧାସଳଖ kumar2000150@gmail.com କୁ ପଠାଯିବ।"
            : "Your email and identity snapshot are verified. This enquiry will be delivered directly to kumar2000150@gmail.com."}
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-museum-charcoalLight mb-1.5 font-semibold">
            {isOdia ? "ପୂରା ନାମ *" : "FULL NAME *"}
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-museum-ivory border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal focus:border-museum-terracotta focus:outline-none"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-museum-charcoalLight mb-1.5 font-semibold">
            {isOdia ? "ପ୍ରମାଣିତ ଇମେଲ୍ *" : "VERIFIED EMAIL *"}
          </label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full bg-museum-stone/30 border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoalLight font-mono cursor-not-allowed"
          />
        </div>

        {/* Affiliation */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-museum-charcoalLight mb-1.5 font-semibold">
            {isOdia ? "ସଂସ୍ଥା / ବିଶ୍ୱବିଦ୍ୟାଳୟ" : "AFFILIATION / INSTITUTION"}
          </label>
          <input
            type="text"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
            placeholder={isOdia ? "ଯେପରିକି: ଉତ୍କଳ ବିଶ୍ୱବିଦ୍ୟାଳୟ / ସ୍ୱତନ୍ତ୍ର ଗବେଷକ" : "e.g. Oxford / Independent Scholar"}
            className="w-full bg-museum-ivory border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal placeholder:text-museum-charcoalLight/50 focus:border-museum-terracotta focus:outline-none"
          />
        </div>

        {/* Purpose */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-museum-charcoalLight mb-1.5 font-semibold">
            {isOdia ? "ଯୋଗାଯୋଗର ଉଦ୍ଦେଶ୍ୟ *" : "PURPOSE OF CONTACT *"}
          </label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full bg-museum-ivory border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal focus:border-museum-terracotta focus:outline-none"
          >
            <option value="Research Collaboration">{isOdia ? "ଐତିହାସିକ ଗବେଷଣା ପରାମର୍ଶ" : "Research Collaboration"}</option>
            <option value="Speaking Invitation">{isOdia ? "ବକ୍ତୃତା / ସମ୍ମିଳନୀ ନିମନ୍ତ୍ରଣ" : "Speaking Invitation"}</option>
            <option value="Media Interview">{isOdia ? "ଗଣମାଧ୍ୟମ ସାକ୍ଷାତକାର" : "Media / Interview"}</option>
            <option value="Academic Question">{isOdia ? "ଶିକ୍ଷାଗତ ପ୍ରଶ୍ନ" : "Academic Question"}</option>
            <option value="Archival Documentation">{isOdia ? "ଆର୍କାଇଭ୍ ଡକ୍ୟୁମେଣ୍ଟେସନ୍" : "Archival Documentation"}</option>
            <option value="Other">{isOdia ? "ଅନ୍ୟାନ୍ୟ" : "Other"}</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-[11px] font-mono uppercase tracking-wider text-museum-charcoalLight mb-1.5 font-semibold">
          {isOdia ? "ଆପଣଙ୍କ ବାର୍ତ୍ତା *" : "YOUR MESSAGE *"}
        </label>
        <textarea
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            isOdia
              ? "ଦୟାକରି ଆପଣଙ୍କ ଐତିହାସିକ ପ୍ରଶ୍ନ, ଗବେଷଣା ବିଷୟ କିମ୍ବା ଆଲୋଚନାର ବିବରଣୀ ଲେଖନ୍ତୁ..."
              : "Please describe your historical inquiry, research proposal, or academic collaboration..."
          }
          className="w-full bg-museum-ivory border border-museum-stone rounded-xl p-3.5 text-sm text-museum-charcoal placeholder:text-museum-charcoalLight/50 focus:border-museum-terracotta focus:outline-none font-serif text-base"
          required
        />
      </div>

      {/* Notice of recipient */}
      <div className="p-3 bg-museum-ivory rounded-xl border border-museum-stone text-xs text-museum-charcoalLight font-mono flex items-center justify-between">
        <span>{isOdia ? "ପଠାଯିବା ସ୍ଥାନ (Default Recipient):" : "Default Recipient:"}</span>
        <span className="font-bold text-museum-charcoal">kumar2000150@gmail.com</span>
      </div>

      {/* Action Buttons: Explicit RESTART and SUBMIT buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        {onRestart && (
          <button
            type="button"
            onClick={onRestart}
            className="px-6 py-4 rounded-xl border border-museum-stone bg-museum-ivory hover:bg-museum-parchment text-museum-charcoal text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-museum-terracotta" />
            <span>{isOdia ? "ରିଷ୍ଟାର୍ଟ (RESTART)" : "RESTART"}</span>
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-4 bg-museum-terracotta hover:bg-museum-terracottaDark text-white text-xs font-bold uppercase tracking-wider transition-all rounded-xl shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>{isOdia ? "ଦାଖଲ ହେଉଛି..." : "SUBMITTING TO kumar2000150@gmail.com..."}</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>{isOdia ? "ଦାଖଲ କରନ୍ତୁ (SUBMIT ENQUIRY)" : "SUBMIT ENQUIRY TO kumar2000150@gmail.com"}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
