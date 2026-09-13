"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { RefreshCw, AlertCircle, Sparkles, Check, Key, ShieldCheck, X } from "lucide-react";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
            use_fedcm_for_prompt?: boolean;
          }) => void;
          prompt: (notification?: (notification: {
            isNotDisplayed: () => boolean;
            isSkippedMoment: () => boolean;
            isDismissedMoment: () => boolean;
            getNotDisplayedReason: () => string;
            getSkippedReason: () => string;
            getDismissedReason: () => string;
          }) => void) => void;
          renderButton: (
            element: HTMLElement,
            options: {
              type?: "standard" | "icon";
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "large" | "medium" | "small";
              text?: "signin_with" | "signup_with" | "continue_with" | "signin";
              shape?: "rectangular" | "pill" | "circle" | "square";
              logo_alignment?: "left" | "center";
              width?: string | number;
            }
          ) => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}

interface GoogleSignInButtonProps {
  onSuccess?: (user: { name: string; email: string; picture?: string; googleSub?: string }) => void;
  onError?: (error: string) => void;
  className?: string;
  buttonText?: string;
}

export default function GoogleSignInButton({
  onSuccess,
  onError,
  className = "",
  buttonText = "Continue with Google",
}: GoogleSignInButtonProps) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [activeClientId, setActiveClientId] = useState<string>(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""
  );

  // In-modal quick configuration inputs
  const [inputClientId, setInputClientId] = useState("");
  const [inputClientSecret, setInputClientSecret] = useState("");
  const [savingConfig, setSavingConfig] = useState(false);

  const gsiButtonRef = useRef<HTMLDivElement>(null);

  // Fetch client ID from server config dynamically
  useEffect(() => {
    fetch("/api/auth/google/config", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientId) {
          setActiveClientId(data.clientId);
        }
      })
      .catch(() => {});
  }, []);

  // Load Google Identity Services SDK
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.google?.accounts?.id) {
      setScriptLoaded(true);
      return;
    }

    const scriptId = "google-jssdk-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => {
        console.error("[Google Auth] Failed to load Google Identity Services SDK.");
      };
      document.head.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  // Handle Google Token Response from GIS
  const handleCredentialResponse = useCallback(
    async (response: { credential: string }) => {
      if (!response?.credential) {
        const msg = "Google authentication was cancelled or returned no credentials.";
        setErrorMessage(msg);
        onError?.(msg);
        setLoading(false);
        return;
      }

      setLoading(true);
      setErrorMessage(null);

      try {
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential: response.credential }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          const errorMsg = data.error || "Google authentication verification failed.";
          setErrorMessage(errorMsg);
          onError?.(errorMsg);
          setLoading(false);
          return;
        }

        onSuccess?.(data.user);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Network error during Google authentication.";
        setErrorMessage(msg);
        onError?.(msg);
        setLoading(false);
      }
    },
    [onError, onSuccess]
  );

  // Initialize GSI when script is loaded and client ID is available
  useEffect(() => {
    if (!scriptLoaded || !window.google?.accounts?.id || !activeClientId) return;

    try {
      window.google.accounts.id.initialize({
        client_id: activeClientId,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      // Optionally render hidden native button to attach click handler
      if (gsiButtonRef.current) {
        window.google.accounts.id.renderButton(gsiButtonRef.current, {
          theme: "outline",
          size: "large",
          type: "standard",
          shape: "pill",
          text: "continue_with",
          width: "100%",
        });
      }
    } catch (err) {
      console.warn("[Google Auth] GSI Initialization notice:", err);
    }
  }, [scriptLoaded, activeClientId, handleCredentialResponse]);

  // Button Click Handler
  const handleButtonClick = async () => {
    setErrorMessage(null);

    let clientIdToUse = activeClientId;
    if (!clientIdToUse) {
      try {
        const res = await fetch("/api/auth/google/config", { cache: "no-store" });
        const data = await res.json();
        if (data.clientId) {
          clientIdToUse = data.clientId;
          setActiveClientId(data.clientId);
        }
      } catch (e) {
        console.error("Failed to load google config:", e);
      }
    }

    if (!clientIdToUse) {
      setShowConfigModal(true);
      return;
    }

    setLoading(true);

    if (window.google?.accounts?.id) {
      window.google.accounts.id.initialize({
        client_id: clientIdToUse,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          const reason = notification.getNotDisplayedReason();
          console.warn("[Google Prompt Not Displayed]:", reason);
          // Try clicking the native hidden button if prompt is suppressed
          const nativeBtn = gsiButtonRef.current?.querySelector<HTMLElement>("[role=button], div[tabindex='0']");
          if (nativeBtn) {
            nativeBtn.click();
          } else {
            setErrorMessage(`Google prompt could not be displayed (${reason}). Please check third-party cookies or browser popup permissions.`);
            setLoading(false);
          }
        } else if (notification.isSkippedMoment() || notification.isDismissedMoment()) {
          setLoading(false);
        }
      });
    } else {
      setErrorMessage("Google Identity Services is initializing. Please retry in a moment.");
      setLoading(false);
    }
  };

  // Quick In-Browser Key Configuration Submission
  const handleSaveDevConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputClientId.trim()) return;

    setSavingConfig(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/google/dev-save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: inputClientId.trim(),
          clientSecret: inputClientSecret.trim(),
        }),
      });

      const data = await res.json();
      if (data.success && data.clientId) {
        setActiveClientId(data.clientId);
        setShowConfigModal(false);

        // Immediately initialize GIS and trigger prompt
        if (window.google?.accounts?.id) {
          window.google.accounts.id.initialize({
            client_id: data.clientId,
            callback: handleCredentialResponse,
          });
          window.google.accounts.id.prompt();
        }
      } else {
        setErrorMessage(data.error || "Failed to save configuration.");
      }
    } catch {
      setErrorMessage("Failed to save credentials to local configuration.");
    } finally {
      setSavingConfig(false);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {errorMessage && (
        <div className="mb-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-museum-mutedRed flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Hidden container for Google's native rendering target fallback */}
      <div ref={gsiButtonRef} className="hidden" />

      {/* Custom Designed Luxury "Continue with Google" Button */}
      <button
        type="button"
        onClick={handleButtonClick}
        disabled={loading}
        className="w-full py-3.5 px-4 bg-museum-parchment hover:bg-museum-ivory border border-museum-stone hover:border-museum-terracotta text-museum-charcoal font-sans font-semibold text-xs tracking-wider uppercase rounded-xl transition-all duration-300 shadow-sm hover:shadow flex items-center justify-center gap-3 group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin text-museum-terracotta" />
            <span className="font-mono text-museum-terracotta">VERIFYING WITH GOOGLE...</span>
          </>
        ) : (
          <>
            {/* Official Google 4-Color SVG Icon */}
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="text-museum-charcoal group-hover:text-museum-terracotta transition-colors">
              {buttonText}
            </span>
          </>
        )}
      </button>

      {/* 🚀 Quick In-Browser Google OAuth Key Setup Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-museum-ivory border border-museum-stone rounded-2xl p-6 sm:p-7 max-w-lg w-full shadow-2xl space-y-4 relative text-museum-charcoal">
            {/* Close Button */}
            <button
              onClick={() => setShowConfigModal(false)}
              className="absolute top-4 right-4 p-1.5 text-museum-charcoalLight hover:text-museum-charcoal hover:bg-museum-parchment rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 text-museum-terracotta">
              <div className="p-2.5 rounded-xl bg-museum-terracotta/10 border border-museum-terracotta/20">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-museum-charcoal">
                  Connect Google Client ID
                </h3>
                <span className="text-[10px] font-mono text-museum-terracotta uppercase font-semibold">
                  QUICK 1-STEP CONFIGURATION
                </span>
              </div>
            </div>

            <p className="text-xs text-museum-charcoalLight leading-relaxed">
              Paste your <strong>Google Client ID</strong> below to immediately activate Google Sign-In on your local machine.
            </p>

            <form onSubmit={handleSaveDevConfig} className="space-y-3.5 pt-1">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-museum-charcoal font-bold mb-1.5">
                  GOOGLE CLIENT ID <span className="text-museum-terracotta">*</span>
                </label>
                <input
                  type="text"
                  value={inputClientId}
                  onChange={(e) => setInputClientId(e.target.value)}
                  placeholder="e.g. 123456789-xxxx.apps.googleusercontent.com"
                  autoFocus
                  required
                  className="w-full bg-museum-parchment border border-museum-stone rounded-xl p-3 text-xs text-museum-charcoal placeholder:text-museum-charcoalLight/60 font-mono focus:border-museum-terracotta focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-museum-charcoal font-bold mb-1.5">
                  GOOGLE CLIENT SECRET <span className="text-museum-charcoalLight text-[10px]">(Optional for local)</span>
                </label>
                <input
                  type="password"
                  value={inputClientSecret}
                  onChange={(e) => setInputClientSecret(e.target.value)}
                  placeholder="e.g. GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full bg-museum-parchment border border-museum-stone rounded-xl p-3 text-xs text-museum-charcoal placeholder:text-museum-charcoalLight/60 font-mono focus:border-museum-terracotta focus:outline-none transition-colors"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-3 border border-museum-stone text-museum-charcoalLight hover:text-museum-charcoal text-xs font-sans uppercase tracking-wider rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingConfig || !inputClientId.trim()}
                  className="flex-1 py-3 bg-museum-terracotta hover:bg-museum-mutedRed text-white text-xs font-sans font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {savingConfig ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>SAVING & LAUNCHING...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>SAVE & START GOOGLE LOGIN</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
