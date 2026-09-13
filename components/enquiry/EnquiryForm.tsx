"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Send, CheckCircle2, ShieldAlert, RefreshCw, ArrowLeft, RotateCcw, User, Mail, Sparkles } from "lucide-react";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { useLanguage } from "@/context/LanguageContext";

interface EnquiryFormProps {
  userSession: { name: string; email: string; picture?: string } | null;
  onLoginSuccess?: (user: { name: string; email: string; picture?: string }) => void;
}

export default function EnquiryForm({ userSession, onLoginSuccess }: EnquiryFormProps) {
  const { language } = useLanguage();
  const isOdia = language === "or";

  const [fullName, setFullName] = useState(userSession?.name || "");
  const [email, setEmail] = useState(userSession?.email || "");
  const [mobile, setMobile] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [purpose, setPurpose] = useState(isOdia ? "ଐତିହାସିକ ଗବେଷଣା ପରାମର୍ଶ" : "Research Collaboration");
  const [preferredMethod, setPreferredMethod] = useState("Email");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [auditInfo, setAuditInfo] = useState<{
    timestamp: string;
    dateFormatted?: string;
    timeFormatted?: string;
    logId?: string;
  } | null>(null);

  // Auto-fill form fields by default from login email and user session
  useEffect(() => {
    if (userSession) {
      if (userSession.name) setFullName(userSession.name);
      if (userSession.email) setEmail(userSession.email);

      // Smart Affiliation Auto-Fill from domain if available
      const emailDomain = (userSession.email || "").split("@")[1]?.toLowerCase() || "";
      if (emailDomain.includes("ox.ac.uk")) {
        setAffiliation("University of Oxford");
      } else if (emailDomain.includes("cam.ac.uk")) {
        setAffiliation("University of Cambridge");
      } else if (emailDomain.includes("harvard.edu")) {
        setAffiliation("Harvard University");
      } else if (emailDomain.includes("fmuniversity")) {
        setAffiliation("Fakir Mohan University");
      } else if (emailDomain.includes("utkal")) {
        setAffiliation("Utkal University");
      }
    }

    // Restore cached draft / previous preferences if available
    try {
      const saved = localStorage.getItem("kaalrekha_enquiry_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.affiliation && !affiliation) setAffiliation(parsed.affiliation);
        if (parsed.purpose && !purpose) setPurpose(parsed.purpose);
        if (parsed.preferredMethod && !preferredMethod) setPreferredMethod(parsed.preferredMethod);
      }
    } catch {}
  }, [userSession]);

  // Persist updated draft preferences to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "kaalrekha_enquiry_draft",
        JSON.stringify({
          affiliation,
          purpose,
          preferredMethod,
        })
      );
    } catch {}
  }, [affiliation, purpose, preferredMethod]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanName = (fullName || userSession?.name || "").trim();
    const cleanEmail = (email || userSession?.email || "").trim();
    const cleanMessage = message.trim();

    if (!cleanName) {
      setErrorMessage(isOdia ? "ଦୟାକରି ଆପଣଙ୍କ ପୂରା ନାମ ଲେଖନ୍ତୁ।" : "Please provide your full name.");
      return;
    }

    if (!cleanEmail || !cleanEmail.includes("@")) {
      setErrorMessage(isOdia ? "ଦୟାକରି ଏକ ବୈଧ ଇମେଲ୍ ଠିକଣା ପ୍ରଦାନ କରନ୍ତୁ।" : "Please provide a valid email address.");
      return;
    }

    if (!cleanMessage || cleanMessage.length < 3) {
      setErrorMessage(
        isOdia
          ? "ଦୟାକରି ଏକ ସ୍ପଷ୍ଟ ବାର୍ତ୍ତା ଲେଖନ୍ତୁ (ଅତି କମରେ ୩ ଅକ୍ଷର)।"
          : "Please write a substantive enquiry message (minimum 3 characters)."
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: cleanName,
          email: cleanEmail,
          mobile: mobile.trim(),
          affiliation: affiliation.trim() || "Independent Scholar",
          purpose,
          preferredMethod,
          message: cleanMessage,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setErrorMessage(data.error || "Failed to deliver enquiry.");
        return;
      }

      setAuditInfo(data.audit || {
        timestamp: new Date().toISOString(),
        dateFormatted: new Date().toLocaleDateString("en-GB", { timeZone: "Asia/Kolkata" }),
        timeFormatted: new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" }),
      });
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

  const handleReset = () => {
    setMessage("");
    setSubmitted(false);
    setAuditInfo(null);
  };

  if (submitted) {
    return (
      <div className="w-full bg-museum-parchment/60 border border-museum-stone rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-sm animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-museum-olive/15 border border-museum-olive/40 flex items-center justify-center mx-auto text-museum-olive">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div>
          <span className="text-[11px] uppercase font-mono tracking-widest text-museum-terracotta font-bold block">
            {isOdia ? "ପ୍ରେରଣ ସଫଳ ହେଲା — ଲଗ୍ ବୁକ୍ ରେ ଯୋଡାଯାଇଛି" : "DISPATCH CONFIRMATION — LOGGED TO ARCHIVE"}
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-museum-charcoal mt-2">
            {isOdia ? "ଅନୁସନ୍ଧାନ ବାର୍ତ୍ତା ସଫଳତାର ସହ ଦାଖଲ ହୋଇଛି" : "Enquiry Successfully Submitted"}
          </h3>
          <p className="font-sans text-base text-museum-charcoalLight max-w-md mx-auto mt-3 leading-relaxed">
            {isOdia
              ? "ଆପଣଙ୍କ ବାର୍ତ୍ତା ସଫଳତାର ସହିତ ପ୍ରେରଣ କରାଯାଇଛି ଏବଂ ଆଡମିନ୍ ଲଗ୍ ବୁକ୍ ରେ ସ୍ୱୟଂଚାଳିତ ଭାବରେ ସଂରକ୍ଷିତ ହୋଇଛି।"
              : "Your research enquiry has been dispatched to Dr. Anjan Kumar Pal and securely logged into the admin logbook."}
          </p>
        </div>

        {/* Audit Verification Card */}
        <div className="max-w-md mx-auto p-5 bg-museum-ivory border border-museum-stone rounded-2xl text-xs font-mono text-left space-y-2.5 text-museum-charcoal shadow-xs">
          <div className="flex justify-between border-b border-museum-stone/50 pb-2">
            <span className="text-museum-charcoalLight">{isOdia ? "ପ୍ରେରକଙ୍କ ନାମ:" : "SCHOLAR:"}</span>
            <span className="font-bold text-museum-charcoal">{fullName}</span>
          </div>
          <div className="flex justify-between border-b border-museum-stone/50 pb-2">
            <span className="text-museum-charcoalLight">{isOdia ? "ଇମେଲ୍:" : "EMAIL:"}</span>
            <span className="text-museum-terracotta font-bold">{email}</span>
          </div>
          <div className="flex justify-between border-b border-museum-stone/50 pb-2">
            <span className="text-museum-charcoalLight">{isOdia ? "ଗବେଷଣା ବିଷୟ:" : "PURPOSE:"}</span>
            <span className="text-museum-charcoal">{purpose}</span>
          </div>
          {auditInfo && (
            <div className="flex justify-between">
              <span className="text-museum-charcoalLight">{isOdia ? "ଭାରତୀୟ ସମୟ (IST):" : "REAL-TIME TIMESTAMP:"}</span>
              <span className="text-museum-olive font-bold">
                {auditInfo.dateFormatted && auditInfo.timeFormatted
                  ? `${auditInfo.dateFormatted}, ${auditInfo.timeFormatted}`
                  : new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
              </span>
            </div>
          )}
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-museum-ivory border border-museum-stone hover:bg-museum-parchment text-museum-charcoal text-xs font-sans font-semibold uppercase tracking-wider rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-museum-terracotta" />
            <span>{isOdia ? "ଅନ୍ୟ ଏକ ପ୍ରଶ୍ନ ପଠାନ୍ତୁ" : "SEND ANOTHER ENQUIRY"}</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-museum-terracotta hover:bg-museum-mutedRed text-white text-xs font-semibold uppercase tracking-wider transition-all rounded-xl shadow-sm cursor-pointer"
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
      className="w-full bg-museum-parchment/60 border border-museum-stone rounded-3xl p-6 sm:p-10 space-y-6 shadow-sm"
    >
      <div className="border-b border-museum-stone pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-museum-terracotta font-bold block">
            {isOdia ? "ଶିକ୍ଷାଗତ ବାର୍ତ୍ତା ଫର୍ମ" : "OFFICIAL SCHOLARLY DISPATCH"}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-museum-charcoal mt-1">
            {isOdia ? "ବାର୍ତ୍ତା ଏବଂ ପ୍ରଶ୍ନାବଳୀ ଦାଖଲ" : "Research Enquiry Submission"}
          </h3>
          <p className="text-xs text-museum-charcoalLight font-sans mt-1">
            {isOdia
              ? "ଦାଖଲ ହୋଇଥିବା ପ୍ରତ୍ୟେକ ବାର୍ତ୍ତା ପ୍ରକୃତ ସମୟ ସହିତ ଆଡମିନ୍ ଲଗ୍ ବୁକ୍ ରେ ସଂରକ୍ଷିତ ହୁଏ।"
              : "Submissions are recorded with real-time timestamps into the archive logbook."}
          </p>
        </div>

        {/* Quick Google Login if not logged in */}
        {!userSession && onLoginSuccess && (
          <div className="self-start sm:self-auto">
            <GoogleSignInButton
              buttonText="Auto-fill with Google"
              onSuccess={(user) => {
                setFullName(user.name);
                setEmail(user.email);
                onLoginSuccess(user);
              }}
            />
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-800 flex items-center gap-2 animate-fade-in">
          <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-museum-charcoal mb-1.5 font-bold">
            {isOdia ? "ପୂରା ନାମ *" : "FULL NAME *"}
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Dr. / Prof. / Scholar Name"
            className="w-full bg-museum-ivory border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal placeholder:text-museum-charcoalLight/50 focus:border-museum-terracotta focus:outline-none"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-museum-charcoal mb-1.5 font-bold">
            {isOdia ? "ଇମେଲ୍ ଠିକଣା *" : "EMAIL ADDRESS *"}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="scholar@university.edu"
            className="w-full bg-museum-ivory border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal font-mono placeholder:text-museum-charcoalLight/50 focus:border-museum-terracotta focus:outline-none"
            required
          />
        </div>

        {/* Affiliation */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-museum-charcoal mb-1.5 font-bold">
            {isOdia ? "ସଂସ୍ଥା / ବିଶ୍ୱବିଦ୍ୟାଳୟ" : "AFFILIATION / INSTITUTION"}
          </label>
          <input
            type="text"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
            placeholder={isOdia ? "ଯେପରିକି: ଉତ୍କଳ ବିଶ୍ୱବିଦ୍ୟାଳୟ / ସ୍ୱତନ୍ତ୍ର ଗବେଷକ" : "e.g. Utkal University / Independent Scholar"}
            className="w-full bg-museum-ivory border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal placeholder:text-museum-charcoalLight/50 focus:border-museum-terracotta focus:outline-none"
          />
        </div>

        {/* Purpose */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-museum-charcoal mb-1.5 font-bold">
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
        <label className="block text-[11px] font-mono uppercase tracking-wider text-museum-charcoal mb-1.5 font-bold">
          {isOdia ? "ଆପଣଙ୍କ ବାର୍ତ୍ତା / ପ୍ରଶ୍ନାବଳୀ *" : "YOUR MESSAGE / RESEARCH QUERY *"}
        </label>
        <textarea
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            isOdia
              ? "ଦୟାକରି ଆପଣଙ୍କ ଐତିହାସିକ ପ୍ରଶ୍ନ, ଗବେଷଣା ବିଷୟ କିମ୍ବା ଆଲୋଚନାର ବିବରଣୀ ଲେଖନ୍ତୁ..."
              : "Please describe your historical inquiry, research proposal, or academic collaboration topic..."
          }
          className="w-full bg-museum-ivory border border-museum-stone rounded-2xl p-4 text-sm text-museum-charcoal placeholder:text-museum-charcoalLight/50 focus:border-museum-terracotta focus:outline-none font-serif text-base leading-relaxed"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-museum-terracotta hover:bg-museum-mutedRed text-white text-xs font-bold font-mono uppercase tracking-wider transition-all rounded-xl shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>{isOdia ? "ଦାଖଲ ହେଉଛି..." : "DISPATCHING ENQUIRY..."}</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>{isOdia ? "ଦାଖଲ କରନ୍ତୁ (SUBMIT ENQUIRY)" : "SUBMIT ENQUIRY TO ARCHIVE"}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
