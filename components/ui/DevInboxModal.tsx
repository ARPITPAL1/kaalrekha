"use client";

import { useEffect, useState } from "react";
import { Mail, Smartphone, ShieldCheck, X, CheckCircle, ExternalLink, RefreshCw } from "lucide-react";

interface InboxItem {
  id: string;
  type: "EMAIL_VERIFICATION" | "MOBILE_OTP" | "ENQUIRY_DISPATCH";
  to: string;
  name?: string;
  subject: string;
  token?: string;
  verifyUrl?: string;
  otpCode?: string;
  timestamp: number;
  details?: string;
}

export default function DevInboxModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<InboxItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/inbox");
      const data = await res.json();
      if (data.logs) {
        setLogs(data.logs);
      }
    } catch {
      // Ignored in dev
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLogs();
      const interval = setInterval(fetchLogs, 4000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full border border-antique-gold/40 bg-archive-darkest/90 backdrop-blur-md text-antique-gold hover:bg-antique-gold/10 hover:border-antique-gold transition-all duration-300 shadow-xl group"
        title="Open Dispatch & Verification Simulator"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-antique-gold opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-antique-gold"></span>
        </span>
        <span className="text-[10px] uppercase tracking-archival font-sans font-semibold">
          DISPATCH LOGS (DEV)
        </span>
        {logs.length > 0 && (
          <span className="bg-crimson-historical text-vellum text-[9px] px-1.5 py-0.2 rounded-full font-mono">
            {logs.length}
          </span>
        )}
      </button>

      {/* Slide-out Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div
            className="w-full max-w-md bg-archive-dark border-l border-archive-border flex flex-col h-full shadow-2xl p-6 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Dispatch and Verification Logs"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-archive-border">
              <div>
                <span className="text-[10px] font-sans tracking-archival uppercase text-antique-gold">
                  ARCHIVAL DISPATCH SIMULATOR
                </span>
                <h3 className="font-editorial text-xl text-vellum mt-0.5">Verification Signals</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchLogs}
                  className="p-1.5 text-vellum-muted hover:text-vellum transition-colors rounded"
                  title="Refresh logs"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-antique-gold" : ""}`} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-vellum-muted hover:text-vellum transition-colors rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-vellum-muted mt-3 mb-4 leading-relaxed">
              Real-time audit log of cryptographic visitor tokens, SMS OTP codes, and owner enquiries. Click to auto-verify without leaving the browser.
            </p>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {logs.length === 0 ? (
                <div className="text-center py-16 text-vellum-dim text-xs">
                  No dispatch signals recorded yet. Initiate onboarding or send an enquiry to view cryptographic seals.
                </div>
              ) : (
                logs.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded bg-archive-surface border border-archive-border hover:border-antique-gold/30 transition-all text-xs"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-wider font-mono font-semibold text-antique-gold">
                        {item.type === "EMAIL_VERIFICATION" && <Mail className="w-3 h-3 text-antique-gold" />}
                        {item.type === "MOBILE_OTP" && <Smartphone className="w-3 h-3 text-crimson-historical" />}
                        {item.type === "ENQUIRY_DISPATCH" && <ShieldCheck className="w-3 h-3 text-green-400" />}
                        {item.type.replace("_", " ")}
                      </span>
                      <span className="text-[10px] text-vellum-dim font-mono">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </span>
                    </div>

                    <div className="font-medium text-vellum text-sm truncate mb-1">
                      {item.subject}
                    </div>

                    <div className="text-vellum-muted text-[11px] mb-2 font-mono">
                      To: <span className="text-vellum">{item.to}</span>
                    </div>

                    {/* Quick action for Email verification */}
                    {item.type === "EMAIL_VERIFICATION" && item.verifyUrl && (
                      <div className="mt-2.5 pt-2 border-t border-archive-borderMuted flex gap-2">
                        <a
                          href={item.verifyUrl}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-antique-gold/15 text-antique-gold hover:bg-antique-gold/25 rounded text-[11px] font-sans font-medium transition-colors"
                        >
                          <CheckCircle className="w-3 h-3" />
                          1-Click Verify Access
                          <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                        </a>
                      </div>
                    )}

                    {/* Quick copy for SMS OTP code */}
                    {item.type === "MOBILE_OTP" && item.otpCode && (
                      <div className="mt-2.5 pt-2 border-t border-archive-borderMuted flex items-center justify-between">
                        <div className="font-mono text-base tracking-widest text-vellum font-bold px-2 py-0.5 bg-archive-dark rounded border border-archive-border">
                          {item.otpCode}
                        </div>
                        <button
                          onClick={() => copyToClipboard(item.otpCode!, item.id)}
                          className="px-2.5 py-1 bg-archive-card hover:bg-antique-gold/20 text-vellum-muted hover:text-antique-gold text-[10px] font-sans font-medium rounded transition-colors"
                        >
                          {copiedId === item.id ? "COPIED" : "COPY CODE"}
                        </button>
                      </div>
                    )}

                    {/* Details preview */}
                    {item.details && (
                      <details className="mt-2 text-[10px] text-vellum-dim font-mono cursor-pointer">
                        <summary className="hover:text-vellum">View Message Payload</summary>
                        <pre className="mt-1 p-2 bg-archive-darkest rounded whitespace-pre-wrap overflow-x-auto text-[10px] text-vellum-muted">
                          {item.details}
                        </pre>
                      </details>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-archive-border flex items-center justify-between text-[10px] text-vellum-dim">
              <span>Zero persistent database photo storage</span>
              <button
                onClick={() => setLogs([])}
                className="hover:text-vellum transition-colors uppercase tracking-wider"
              >
                Clear Log
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
