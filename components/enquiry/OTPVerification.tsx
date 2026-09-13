"use client";

import { useState, useEffect } from "react";
import { Smartphone, ShieldCheck, ArrowRight, RefreshCw, AlertCircle } from "lucide-react";

interface OTPVerificationProps {
  onVerified: (phone: string, receipt: string) => void;
}

export default function OTPVerification({ onVerified }: OTPVerificationProps) {
  const [step, setStep] = useState<"PHONE" | "CODE">("PHONE");
  const [countryCode, setCountryCode] = useState("+44");
  const [phoneInput, setPhoneInput] = useState("");
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(30);
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState("");

  const fullPhoneNumber = `${countryCode}${phoneInput.trim()}`;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "CODE" && countdown > 0) {
      timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!phoneInput || phoneInput.length < 6) {
      setErrorMessage("Please enter a valid mobile phone number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhoneNumber }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setErrorMessage(data.error || "Failed to send code.");
        return;
      }

      setStep("CODE");
      setCountdown(30);
    } catch {
      setErrorMessage("Network connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }

    const newCode = [...otpCode];
    newCode[index] = val;
    setOtpCode(newCode);

    // Auto advance focus to next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const combinedCode = otpCode.join("");
    if (combinedCode.length !== 6) {
      setErrorMessage("Please enter all 6 digits of the verification code.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhoneNumber, code: combinedCode }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setErrorMessage(data.error || "Verification failed.");
        return;
      }

      setIsVerified(true);
      setVerifiedPhone(fullPhoneNumber);
      onVerified(fullPhoneNumber, data.receipt);
    } catch {
      setErrorMessage("Verification error. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  if (isVerified) {
    return (
      <div className="w-full bg-archive-dark border border-archive-border rounded-lg p-6 md:p-8 text-center space-y-3">
        <div className="w-14 h-14 rounded-full bg-green-900/30 border border-green-500/50 flex items-center justify-center mx-auto text-green-400">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <span className="text-[10px] uppercase font-mono tracking-archival text-antique-gold">
          STEP 2 COMPLETED
        </span>
        <h4 className="font-editorial text-2xl text-vellum">NUMBER VERIFIED</h4>
        <p className="text-xs text-vellum-muted font-mono">{verifiedPhone}</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-archive-dark border border-archive-border rounded-lg p-6 md:p-8">
      {step === "PHONE" ? (
        <form onSubmit={handleSendOtp} className="space-y-6">
          <div className="flex items-center gap-2 text-antique-gold text-xs font-mono tracking-archival uppercase">
            <Smartphone className="w-4 h-4" />
            STEP 2 · MOBILE NUMBER VERIFICATION
          </div>

          <div>
            <h3 className="font-editorial text-3xl text-vellum">Verify Your Number</h3>
            <p className="text-xs text-vellum-muted mt-2 font-editorial leading-relaxed">
              We send a short-lived 6-digit verification code to confirm your telephone routing.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 bg-crimson-deep/40 border border-crimson-historical/60 rounded text-xs text-vellum flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-crimson-historical flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="flex gap-2">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-24 bg-archive-surface border border-archive-border rounded p-3 text-xs text-vellum font-mono focus:border-antique-gold focus:outline-none"
            >
              <option value="+44">UK (+44)</option>
              <option value="+1">US (+1)</option>
              <option value="+39">IT (+39)</option>
              <option value="+33">FR (+33)</option>
              <option value="+49">DE (+49)</option>
              <option value="+91">IN (+91)</option>
              <option value="+61">AU (+61)</option>
            </select>

            <input
              type="tel"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="Mobile Phone Number"
              className="flex-1 bg-archive-surface border border-archive-border rounded p-3 text-sm text-vellum font-mono placeholder:text-vellum-dim focus:border-antique-gold focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-antique-gold text-archive-darkest hover:bg-vellum text-xs font-sans font-semibold uppercase tracking-[0.2em] transition-all rounded shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>DISPATCHING CODE...</span>
              </>
            ) : (
              <>
                <span>SEND VERIFICATION CODE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-antique-gold text-xs font-mono tracking-archival uppercase">
              <Smartphone className="w-4 h-4" />
              <span>ENTER VERIFICATION CODE</span>
            </div>
            <button
              type="button"
              onClick={() => setStep("PHONE")}
              className="text-xs text-vellum-muted hover:text-antique-gold font-mono"
            >
              Change Number
            </button>
          </div>

          <div>
            <h3 className="font-editorial text-2xl text-vellum">Six-Digit Security Code</h3>
            <p className="text-xs text-vellum-muted mt-1 font-mono">
              Sent to: <span className="text-vellum">{fullPhoneNumber}</span>
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 bg-crimson-deep/40 border border-crimson-historical/60 rounded text-xs text-vellum flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-crimson-historical flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 6 Digit Inputs */}
          <div className="flex justify-between gap-2 max-w-sm mx-auto">
            {otpCode.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-12 h-14 bg-archive-surface border border-archive-border rounded text-center text-xl font-mono text-vellum focus:border-antique-gold focus:outline-none"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-antique-gold text-archive-darkest hover:bg-vellum text-xs font-sans font-semibold uppercase tracking-[0.2em] transition-all rounded shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>VERIFYING CODE...</span>
              </>
            ) : (
              <span>VERIFY NUMBER</span>
            )}
          </button>

          <div className="flex items-center justify-between text-xs font-mono text-vellum-dim pt-2">
            <span>
              {countdown > 0 ? `RESEND IN 00:${countdown < 10 ? `0${countdown}` : countdown}` : "CODE READY"}
            </span>
            <button
              type="button"
              disabled={countdown > 0 || loading}
              onClick={handleSendOtp}
              className="text-antique-gold hover:underline disabled:opacity-40 disabled:hover:no-underline"
            >
              RESEND CODE
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
