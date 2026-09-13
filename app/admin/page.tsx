"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/ui/Footer";
import {
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Search,
  Download,
  Filter,
  Trash2,
  Mail,
  User,
  PlusCircle,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  RefreshCw,
  Landmark,
  Lock,
  Layers,
  FileText,
  Building,
  Check,
  X,
  ExternalLink,
  Heart,
  Image as ImageIcon,
  Video as VideoIcon,
  Send,
} from "lucide-react";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { Publication } from "@/data/publications";
import { BlogPost } from "@/lib/blog";

interface LogEntry {
  id: string;
  fullName: string;
  email: string;
  affiliation: string;
  purpose: string;
  preferredMethod: string;
  message: string;
  tempPhotoData?: string | null;
  timestamp: number;
  dateFormatted: string;
  timeFormatted: string;
  isoDate: string;
  status: "UNREAD" | "REVIEWED" | "ARCHIVED";
}

interface VisitorLogEntry {
  id: string;
  userId?: string;
  name: string;
  email: string;
  picture?: string;
  provider: "google" | "email" | "guest";
  role: "ADMIN" | "USER";
  timestamp: number;
  dateFormatted: string;
  timeFormatted: string;
  isoDate: string;
}

interface LogStats {
  total: number;
  today: number;
  unread: number;
  reviewed: number;
  visitorTotal?: number;
  visitorToday?: number;
  visitorUnique?: number;
}

export default function AdminPage() {
  const [session, setSession] = useState<{
    name: string;
    email: string;
    picture?: string;
    isAdmin: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  // Active Admin Tab: "LOG_BOOK" | "VISITOR_LOGBOOK" | "BLOG_MANAGER" | "ADD_RESEARCH" | "OVERVIEW"
  const [activeTab, setActiveTab] = useState<"LOG_BOOK" | "VISITOR_LOGBOOK" | "BLOG_MANAGER" | "ADD_RESEARCH" | "OVERVIEW">("LOG_BOOK");

  // Log Book Data & Filter States
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [visitorLogins, setVisitorLogins] = useState<VisitorLogEntry[]>([]);
  const [visitorSearch, setVisitorSearch] = useState("");
  const [stats, setStats] = useState<LogStats>({ total: 0, today: 0, unread: 0, reviewed: 0, visitorTotal: 0, visitorToday: 0, visitorUnique: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "UNREAD" | "REVIEWED">("ALL");
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [logsLoading, setLogsLoading] = useState(false);

  // Blog Manager State
  const [adminBlogPosts, setAdminBlogPosts] = useState<BlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogSearch, setBlogSearch] = useState("");
  const [blogTypeFilter, setBlogTypeFilter] = useState<"ALL" | "photo" | "video" | "text">("ALL");
  const [newBlogType, setNewBlogType] = useState<"photo" | "video" | "text">("photo");
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogCaption, setNewBlogCaption] = useState("");
  const [newBlogMediaUrl, setNewBlogMediaUrl] = useState("");
  const [newBlogLocation, setNewBlogLocation] = useState("Balasore Archival Center, Odisha");
  const [newBlogTags, setNewBlogTags] = useState("OdishaHistory, ArchaeologicalSurvey");
  const [blogPublishing, setBlogPublishing] = useState(false);
  const [blogSuccess, setBlogSuccess] = useState<string | null>(null);
  const [blogError, setBlogError] = useState<string | null>(null);

  // Research Publisher Form State
  const [researchTitle, setResearchTitle] = useState("");
  const [researchYear, setResearchYear] = useState(new Date().getFullYear().toString());
  const [researchType, setResearchType] = useState<Publication["type"]>("ARTICLE");
  const [researchPublisher, setResearchPublisher] = useState("KAALREKHA Academic Press");
  const [researchDescription, setResearchDescription] = useState("");
  const [researchAbstract, setResearchAbstract] = useState("");
  const [researchThemes, setResearchThemes] = useState("ODISHA MARITIME, HISTORICAL ARCHIVES");
  const [publishing, setPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState<string | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);

  // Check admin session
  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setSession(data.user);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Fetch Log Book entries and Blog posts when admin session is active
  const fetchLogs = async () => {
    setLogsLoading(true);
    try {
      const res = await fetch("/api/admin/logs");
      const data = await res.json();
      if (data.success) {
        if (data.logs) setLogs(data.logs);
        if (data.visitorLogins) setVisitorLogins(data.visitorLogins);
        if (data.stats) setStats(data.stats);
      }
    } catch {
      console.warn("Failed to load logs");
    } finally {
      setLogsLoading(false);
    }
  };

  const fetchAdminBlogPosts = async () => {
    setBlogLoading(true);
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      if (data.success && data.posts) {
        setAdminBlogPosts(data.posts);
      }
    } catch {
      console.warn("Failed to load blog posts");
    } finally {
      setBlogLoading(false);
    }
  };

  useEffect(() => {
    if (session?.email?.toLowerCase().trim() === "kumar2000150@gmail.com") {
      fetchLogs();
      fetchAdminBlogPosts();
    }
  }, [session]);

  // Handle Admin Publishing Blog Post
  const handleAdminCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlogError(null);
    setBlogSuccess(null);
    setBlogPublishing(true);

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: newBlogType,
          title: newBlogTitle,
          caption: newBlogCaption,
          mediaUrl: newBlogMediaUrl,
          location: newBlogLocation,
          tags: newBlogTags,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to publish blog dispatch.");
      }

      setBlogSuccess(`✓ Dispatch "${newBlogTitle}" published successfully to social feed!`);
      setAdminBlogPosts((prev) => [data.post, ...prev]);
      setNewBlogTitle("");
      setNewBlogCaption("");
      setNewBlogMediaUrl("");
    } catch (err: unknown) {
      setBlogError(err instanceof Error ? err.message : "Error publishing blog dispatch");
    } finally {
      setBlogPublishing(false);
    }
  };

  // Handle Admin Toggle Hide/Unhide
  const handleAdminToggleHide = async (id: string) => {
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "PATCH" });
      const data = await res.json();
      if (data.success) {
        setAdminBlogPosts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, isHidden: data.isHidden } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Admin Delete Post
  const handleAdminDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog dispatch permanently?")) return;
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setAdminBlogPosts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (session?.isAdmin) {
      fetchLogs();
    }
  }, [session]);

  // Update Log Status
  const handleUpdateStatus = async (id: string, newStatus: "UNREAD" | "REVIEWED" | "ARCHIVED") => {
    try {
      const res = await fetch("/api/admin/logs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setLogs((prev) =>
          prev.map((log) => (log.id === id ? { ...log, status: newStatus } : log))
        );
        if (selectedLog?.id === id) {
          setSelectedLog((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Enquiry Log
  const handleDeleteLog = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this log book entry?")) return;
    try {
      const res = await fetch(`/api/admin/logs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setLogs((prev) => prev.filter((log) => log.id !== id));
        if (selectedLog?.id === id) setSelectedLog(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Visitor Login Log
  const handleDeleteVisitorLog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this visitor login record?")) return;
    try {
      const res = await fetch(`/api/admin/logs?id=${id}&type=visitor`, { method: "DELETE" });
      if (res.ok) {
        setVisitorLogins((prev) => prev.filter((log) => log.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered Enquiry Logs
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        log.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.affiliation.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" ? true : log.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [logs, searchQuery, statusFilter]);

  // Filtered Visitor Logins
  const filteredVisitors = useMemo(() => {
    return visitorLogins.filter((v) => {
      const q = visitorSearch.toLowerCase();
      return (
        v.name.toLowerCase().includes(q) ||
        v.email.toLowerCase().includes(q) ||
        v.provider.toLowerCase().includes(q) ||
        v.dateFormatted.toLowerCase().includes(q)
      );
    });
  }, [visitorLogins, visitorSearch]);

  // Handle Publishing Research
  const handlePublishResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setPublishError(null);
    setPublishSuccess(null);
    setPublishing(true);

    try {
      const res = await fetch("/api/admin/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: researchTitle,
          year: researchYear,
          type: researchType,
          publisher: researchPublisher,
          description: researchDescription,
          abstract: researchAbstract || researchDescription,
          relatedThemes: researchThemes.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to publish research.");
      }

      setPublishSuccess(`✓ Research titled "${researchTitle}" published successfully into KAALREKHA archive.`);
      setResearchTitle("");
      setResearchDescription("");
      setResearchAbstract("");
    } catch (err: unknown) {
      setPublishError(err instanceof Error ? err.message : "Error publishing research");
    } finally {
      setPublishing(false);
    }
  };

  // Export Log Book to CSV
  const exportToCSV = () => {
    if (logs.length === 0) return;
    const headers = ["ID", "Date", "Time", "Full Name", "Email", "Affiliation", "Purpose", "Message", "Status"];
    const rows = logs.map((l) => [
      l.id,
      l.dateFormatted,
      l.timeFormatted,
      `"${l.fullName.replace(/"/g, '""')}"`,
      l.email,
      `"${l.affiliation.replace(/"/g, '""')}"`,
      `"${l.purpose.replace(/"/g, '""')}"`,
      `"${l.message.replace(/"/g, '""')}"`,
      l.status,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `KAALREKHA_Enquiry_LogBook_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Visitor Logbook to CSV
  const exportVisitorCSV = () => {
    if (visitorLogins.length === 0) return;
    const headers = ["ID", "Date", "Time", "Scholar Name", "Email", "Provider", "Role"];
    const rows = visitorLogins.map((v) => [
      v.id,
      v.dateFormatted,
      v.timeFormatted,
      `"${v.name.replace(/"/g, '""')}"`,
      v.email,
      v.provider,
      v.role,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `KAALREKHA_Visitor_Logbook_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-museum-ivory flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-museum-terracotta animate-spin" />
      </div>
    );
  }

  // Strict Non-Admin Access Wall (Only kumar2000150@gmail.com)
  if (!session || session.email?.toLowerCase().trim() !== "kumar2000150@gmail.com") {
    return (
      <div className="min-h-screen bg-museum-ivory text-museum-charcoal flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto my-auto p-8 bg-museum-parchment/80 border border-museum-stone rounded-2xl shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-museum-terracotta/10 border border-museum-terracotta/30 flex items-center justify-center mx-auto text-museum-terracotta">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-museum-terracotta font-semibold block">
              CHRONICLER RESTRICTED AREA
            </span>
            <h1 className="font-serif text-3xl font-bold text-museum-charcoal mt-2">
              Admin Portal & Log Book
            </h1>
            <p className="text-xs text-museum-charcoalLight mt-2 leading-relaxed">
              This panel is exclusively for <strong>Dr. Anjan Kumar Pal</strong> (<code>kumar2000150@gmail.com</code>). Please sign in with the verified archive owner account.
            </p>
          </div>

          <div className="pt-2">
            <GoogleSignInButton
              onSuccess={(user) => {
                if (user.email.toLowerCase().trim() === "kumar2000150@gmail.com") {
                  window.location.reload();
                } else {
                  alert(`Signed in as ${user.email}. Only kumar2000150@gmail.com has Administrator privileges.`);
                }
              }}
              buttonText="Admin Sign In with Google"
            />
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="text-xs font-mono text-museum-terracotta hover:underline inline-flex items-center gap-1"
            >
              <span>← Return to Public Archive</span>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-museum-ivory text-museum-charcoal selection:bg-museum-terracotta selection:text-white">
      <Navbar />

      {/* Hero Admin Header */}
      <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-12 bg-museum-parchment/60 border-b border-museum-stone">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-museum-terracotta/10 border border-museum-terracotta/30 rounded-full text-xs font-mono font-bold text-museum-terracotta uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ARCHIVE OWNER CONTROL & LOG BOOK</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-museum-charcoal">
              KAALREKHA Admin Desk
            </h1>
            <p className="text-xs sm:text-sm font-sans text-museum-charcoalLight">
              Logged in as: <span className="font-mono font-bold text-museum-charcoal">{session.name}</span> ({session.email})
            </p>
          </div>

          {/* Quick Tab Selector */}
          <div className="flex flex-wrap items-center gap-2 bg-museum-ivory p-1.5 rounded-xl border border-museum-stone">
            <button
              onClick={() => setActiveTab("LOG_BOOK")}
              className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "LOG_BOOK"
                  ? "bg-museum-terracotta text-white shadow-xs"
                  : "text-museum-charcoal hover:bg-museum-parchment"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>ENQUIRY LOGS ({stats.total})</span>
            </button>

            <button
              onClick={() => setActiveTab("VISITOR_LOGBOOK")}
              className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "VISITOR_LOGBOOK"
                  ? "bg-museum-terracotta text-white shadow-xs"
                  : "text-museum-charcoal hover:bg-museum-parchment"
              }`}
            >
              <User className="w-4 h-4" />
              <span>VISITOR LOGBOOK ({visitorLogins.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("BLOG_MANAGER")}
              className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "BLOG_MANAGER"
                  ? "bg-museum-terracotta text-white shadow-xs"
                  : "text-museum-charcoal hover:bg-museum-parchment"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>BLOG & FEED ({adminBlogPosts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("ADD_RESEARCH")}
              className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "ADD_RESEARCH"
                  ? "bg-museum-terracotta text-white shadow-xs"
                  : "text-museum-charcoal hover:bg-museum-parchment"
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>ADD RESEARCH</span>
            </button>

            <Link
              href="/research"
              className="px-4 py-2.5 rounded-lg text-xs font-mono font-semibold uppercase text-museum-charcoal hover:bg-museum-parchment flex items-center gap-1.5 transition-all"
            >
              <Eye className="w-3.5 h-3.5 text-museum-terracotta" />
              <span>VIEW ARCHIVE</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-12 space-y-8">
        {/* TAB 1: LOG BOOK (Enquiries & Visitor Registry with Date & Time) */}
        {activeTab === "LOG_BOOK" && (
          <div className="space-y-6">
            {/* Stats Dashboard Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 bg-museum-parchment/60 border border-museum-stone rounded-2xl shadow-xs space-y-1">
                <span className="text-[10px] font-mono uppercase text-museum-charcoalLight block font-semibold">
                  TOTAL LOGGED ENQUIRIES
                </span>
                <p className="font-serif text-3xl font-bold text-museum-charcoal">{stats.total}</p>
              </div>

              <div className="p-5 bg-museum-parchment/60 border border-museum-stone rounded-2xl shadow-xs space-y-1">
                <span className="text-[10px] font-mono uppercase text-museum-terracotta block font-semibold">
                  TODAY&apos;S SUBMISSIONS
                </span>
                <p className="font-serif text-3xl font-bold text-museum-terracotta">{stats.today}</p>
              </div>

              <div className="p-5 bg-museum-parchment/60 border border-museum-stone rounded-2xl shadow-xs space-y-1">
                <span className="text-[10px] font-mono uppercase text-amber-700 block font-semibold">
                  PENDING / UNREAD
                </span>
                <p className="font-serif text-3xl font-bold text-amber-800">{stats.unread}</p>
              </div>

              <div className="p-5 bg-museum-parchment/60 border border-museum-stone rounded-2xl shadow-xs space-y-1">
                <span className="text-[10px] font-mono uppercase text-museum-olive block font-semibold">
                  REVIEWED / ADDRESSED
                </span>
                <p className="font-serif text-3xl font-bold text-museum-olive">{stats.reviewed}</p>
              </div>
            </div>

            {/* Filter, Search & Export Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-museum-parchment/40 p-4 rounded-2xl border border-museum-stone">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-museum-charcoalLight" />
                <input
                  type="text"
                  placeholder="Search by researcher name, email, topic, or message..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-museum-ivory border border-museum-stone rounded-xl text-xs text-museum-charcoal focus:border-museum-terracotta focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Status Filter Buttons */}
                <div className="inline-flex rounded-xl border border-museum-stone bg-museum-ivory p-1 text-xs font-mono">
                  <button
                    onClick={() => setStatusFilter("ALL")}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      statusFilter === "ALL" ? "bg-museum-terracotta text-white" : "text-museum-charcoal"
                    }`}
                  >
                    ALL
                  </button>
                  <button
                    onClick={() => setStatusFilter("UNREAD")}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      statusFilter === "UNREAD" ? "bg-amber-700 text-white" : "text-museum-charcoal"
                    }`}
                  >
                    UNREAD
                  </button>
                  <button
                    onClick={() => setStatusFilter("REVIEWED")}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      statusFilter === "REVIEWED" ? "bg-museum-olive text-white" : "text-museum-charcoal"
                    }`}
                  >
                    REVIEWED
                  </button>
                </div>

                <button
                  onClick={fetchLogs}
                  disabled={logsLoading}
                  className="p-2.5 bg-museum-ivory border border-museum-stone hover:bg-museum-parchment rounded-xl text-museum-charcoal transition-all cursor-pointer"
                  title="Refresh Log Book"
                >
                  <RefreshCw className={`w-4 h-4 ${logsLoading ? "animate-spin text-museum-terracotta" : ""}`} />
                </button>

                <button
                  onClick={exportToCSV}
                  disabled={logs.length === 0}
                  className="px-4 py-2.5 bg-museum-ivory border border-museum-stone hover:bg-museum-parchment text-museum-charcoal rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5 text-museum-terracotta" />
                  <span>EXPORT CSV</span>
                </button>
              </div>
            </div>

            {/* Log Book Entries List / Cards */}
            {filteredLogs.length === 0 ? (
              <div className="text-center py-16 bg-museum-parchment/30 border border-museum-stone rounded-2xl p-8 space-y-3">
                <BookOpen className="w-12 h-12 text-museum-stone mx-auto" />
                <h3 className="font-serif text-xl font-bold text-museum-charcoal">Log Book is Empty</h3>
                <p className="text-xs text-museum-charcoalLight max-w-sm mx-auto">
                  No visitor enquiries or audit logs match your search. New submissions from the public enquiry portal will appear here automatically with daily updates.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`p-5 rounded-2xl border transition-all duration-200 bg-museum-ivory flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs ${
                      log.status === "UNREAD"
                        ? "border-amber-400/80 bg-amber-50/20"
                        : "border-museum-stone hover:border-museum-stoneLight"
                    }`}
                  >
                    <div className="space-y-2 flex-1">
                      {/* Top Meta Line with Date & Time */}
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-museum-terracotta/10 text-museum-terracotta font-bold">
                          <Calendar className="w-3 h-3" />
                          <span>{log.dateFormatted}</span>
                        </span>

                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-museum-parchment text-museum-charcoalLight">
                          <Clock className="w-3 h-3" />
                          <span>{log.timeFormatted}</span>
                        </span>

                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                            log.status === "UNREAD"
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          }`}
                        >
                          {log.status}
                        </span>

                        <span className="text-[11px] font-semibold text-museum-charcoal font-sans px-2 py-0.5 bg-museum-parchment/60 rounded">
                          {log.purpose}
                        </span>
                      </div>

                      {/* Researcher Identity Details */}
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="font-serif text-lg font-bold text-museum-charcoal">{log.fullName}</h4>
                        <span className="text-xs font-mono text-museum-terracotta font-semibold">
                          {log.email}
                        </span>
                        {log.affiliation && (
                          <span className="text-xs text-museum-charcoalLight font-sans border-l border-museum-stone pl-3">
                            {log.affiliation}
                          </span>
                        )}
                      </div>

                      {/* Message Snippet */}
                      <p className="text-xs text-museum-charcoal font-serif line-clamp-2 leading-relaxed">
                        &ldquo;{log.message}&rdquo;
                      </p>
                    </div>

                    {/* Right Action Buttons */}
                    <div className="flex items-center gap-2 self-start md:self-center">
                      {log.tempPhotoData && (
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="px-3 py-2 bg-museum-parchment border border-museum-stone hover:bg-museum-ivory text-museum-charcoal rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 cursor-pointer"
                          title="View Identity Snapshot"
                        >
                          <Eye className="w-3.5 h-3.5 text-museum-terracotta" />
                          <span>Photo</span>
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedLog(log)}
                        className="px-4 py-2 bg-museum-terracotta hover:bg-museum-mutedRed text-white rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                      >
                        Read Dossier
                      </button>

                      <button
                        onClick={() =>
                          handleUpdateStatus(log.id, log.status === "UNREAD" ? "REVIEWED" : "UNREAD")
                        }
                        className={`p-2 rounded-xl border transition-all cursor-pointer ${
                          log.status === "UNREAD"
                            ? "bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100"
                            : "bg-museum-ivory border-museum-stone text-museum-charcoalLight hover:text-museum-charcoal"
                        }`}
                        title={log.status === "UNREAD" ? "Mark as Reviewed" : "Mark as Unread"}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteLog(log.id)}
                        className="p-2 bg-museum-ivory border border-museum-stone hover:bg-red-50 hover:text-red-700 text-museum-charcoalLight rounded-xl transition-all cursor-pointer"
                        title="Delete Entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: VISITOR LOGBOOK (Live Visitor Sign-Ins with Date & Time) */}
        {activeTab === "VISITOR_LOGBOOK" && (
          <div className="space-y-6">
            {/* Visitor Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-museum-parchment/60 border border-museum-stone rounded-2xl shadow-xs space-y-1">
                <span className="text-[10px] font-mono uppercase text-museum-charcoalLight block font-semibold">
                  TOTAL VISITOR SESSIONS
                </span>
                <p className="font-serif text-3xl font-bold text-museum-charcoal">{stats.visitorTotal ?? visitorLogins.length}</p>
                <span className="text-[11px] text-museum-charcoalLight block">All recorded login events</span>
              </div>

              <div className="p-5 bg-museum-parchment/60 border border-museum-stone rounded-2xl shadow-xs space-y-1">
                <span className="text-[10px] font-mono uppercase text-museum-terracotta block font-semibold">
                  TODAY&apos;S VISITOR LOGINS
                </span>
                <p className="font-serif text-3xl font-bold text-museum-terracotta">{stats.visitorToday ?? 0}</p>
                <span className="text-[11px] text-museum-charcoalLight block">Signed in today</span>
              </div>

              <div className="p-5 bg-museum-parchment/60 border border-museum-stone rounded-2xl shadow-xs space-y-1">
                <span className="text-[10px] font-mono uppercase text-museum-olive block font-semibold">
                  UNIQUE SCHOLARS / EMAILS
                </span>
                <p className="font-serif text-3xl font-bold text-museum-olive">{stats.visitorUnique ?? new Set(visitorLogins.map((v) => v.email)).size}</p>
                <span className="text-[11px] text-museum-charcoalLight block">Distinct user accounts</span>
              </div>
            </div>

            {/* Filter, Search & Export Bar for Visitor Logbook */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-museum-parchment/40 p-4 rounded-2xl border border-museum-stone">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-museum-charcoalLight" />
                <input
                  type="text"
                  placeholder="Search visitor by name, email, or date..."
                  value={visitorSearch}
                  onChange={(e) => setVisitorSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-museum-ivory border border-museum-stone rounded-xl text-xs text-museum-charcoal focus:border-museum-terracotta focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchLogs}
                  disabled={logsLoading}
                  className="p-2.5 bg-museum-ivory border border-museum-stone hover:bg-museum-parchment rounded-xl text-museum-charcoal transition-all cursor-pointer"
                  title="Refresh Visitor Logbook"
                >
                  <RefreshCw className={`w-4 h-4 ${logsLoading ? "animate-spin text-museum-terracotta" : ""}`} />
                </button>

                <button
                  onClick={exportVisitorCSV}
                  disabled={visitorLogins.length === 0}
                  className="px-4 py-2.5 bg-museum-ivory border border-museum-stone hover:bg-museum-parchment text-museum-charcoal rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5 text-museum-terracotta" />
                  <span>EXPORT VISITOR CSV</span>
                </button>
              </div>
            </div>

            {/* Visitor Logbook List */}
            {filteredVisitors.length === 0 ? (
              <div className="p-12 text-center bg-museum-parchment/30 border border-dashed border-museum-stone rounded-2xl space-y-2">
                <User className="w-8 h-8 text-museum-charcoalLight/50 mx-auto" />
                <p className="font-serif text-lg text-museum-charcoal">No visitor logins recorded yet.</p>
                <p className="text-xs text-museum-charcoalLight">
                  When a scholar logs in via Google or Email on the user side, their login timestamp and email will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredVisitors.map((vlog) => (
                  <div
                    key={vlog.id}
                    className="p-5 bg-museum-ivory border border-museum-stone rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-museum-terracotta/50 shadow-xs"
                  >
                    <div className="flex items-start gap-4">
                      {/* Avatar / Picture */}
                      {vlog.picture ? (
                        <Image
                          src={vlog.picture}
                          alt={vlog.name}
                          width={44}
                          height={44}
                          className="w-11 h-11 rounded-full object-cover border border-museum-stone shrink-0"
                          unoptimized
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-museum-parchment border border-museum-stone flex items-center justify-center text-museum-terracotta font-serif font-bold text-base shrink-0">
                          {vlog.name ? vlog.name.charAt(0).toUpperCase() : "V"}
                        </div>
                      )}

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h4 className="font-serif text-base font-bold text-museum-charcoal">{vlog.name}</h4>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                              vlog.role === "ADMIN"
                                ? "bg-museum-terracotta text-white"
                                : "bg-museum-parchment border border-museum-stone text-museum-charcoal"
                            }`}
                          >
                            {vlog.role === "ADMIN" ? "ADMIN / OWNER" : "VISITOR"}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-50 text-blue-800 border border-blue-200">
                            {vlog.provider === "google" ? "Google OAuth" : "Email Sign-In"}
                          </span>
                        </div>

                        <p className="text-xs font-mono text-museum-terracotta font-semibold">
                          {vlog.email}
                        </p>
                      </div>
                    </div>

                    {/* Timestamp & Actions */}
                    <div className="flex items-center gap-3 self-end md:self-center">
                      <div className="text-right">
                        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-museum-charcoal">
                          <Calendar className="w-3.5 h-3.5 text-museum-terracotta" />
                          <span>{vlog.dateFormatted}</span>
                        </div>
                        <div className="flex items-center justify-end gap-1 text-[11px] font-mono text-museum-charcoalLight">
                          <Clock className="w-3 h-3" />
                          <span>{vlog.timeFormatted}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteVisitorLog(vlog.id)}
                        className="p-2 bg-museum-ivory border border-museum-stone hover:bg-red-50 hover:text-red-700 text-museum-charcoalLight rounded-xl transition-all cursor-pointer"
                        title="Delete Visitor Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: BLOG & FEED MANAGER (Social Dispatches, Add & Delete Posts) */}
        {activeTab === "BLOG_MANAGER" && (
          <div className="space-y-8">
            {/* Blog Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 bg-museum-parchment/60 border border-museum-stone rounded-2xl shadow-xs space-y-1">
                <span className="text-[10px] font-mono uppercase text-museum-charcoalLight block font-semibold">
                  TOTAL DISPATCHES
                </span>
                <p className="font-serif text-3xl font-bold text-museum-charcoal">{adminBlogPosts.length}</p>
                <span className="text-[11px] text-museum-charcoalLight block">All archive posts</span>
              </div>

              <div className="p-5 bg-museum-parchment/60 border border-museum-stone rounded-2xl shadow-xs space-y-1">
                <span className="text-[10px] font-mono uppercase text-museum-terracotta block font-semibold">
                  PUBLIC POSTS
                </span>
                <p className="font-serif text-3xl font-bold text-museum-terracotta">
                  {adminBlogPosts.filter((p) => !p.isHidden).length}
                </p>
                <span className="text-[11px] text-museum-charcoalLight block">Visible to all visitors</span>
              </div>

              <div className="p-5 bg-museum-parchment/60 border border-museum-stone rounded-2xl shadow-xs space-y-1">
                <span className="text-[10px] font-mono uppercase text-amber-700 block font-semibold">
                  HIDDEN POSTS
                </span>
                <p className="font-serif text-3xl font-bold text-amber-800">
                  {adminBlogPosts.filter((p) => p.isHidden).length}
                </p>
                <span className="text-[11px] text-museum-charcoalLight block">Private to admin only</span>
              </div>

              <div className="p-5 bg-museum-parchment/60 border border-museum-stone rounded-2xl shadow-xs space-y-1">
                <span className="text-[10px] font-mono uppercase text-museum-olive block font-semibold">
                  TOTAL LIKES RECEIVED
                </span>
                <p className="font-serif text-3xl font-bold text-museum-olive flex items-center gap-2">
                  <Heart className="w-5 h-5 text-museum-terracotta fill-museum-terracotta" />
                  <span>{adminBlogPosts.reduce((acc, p) => acc + (p.likesCount || 0), 0)}</span>
                </p>
                <span className="text-[11px] text-museum-charcoalLight block">Community engagement</span>
              </div>
            </div>

            {/* Create / Upload New Blog Dispatch Card */}
            <div className="bg-museum-parchment/60 border border-museum-stone rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="border-b border-museum-stone pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-museum-terracotta font-bold block">
                    CREATE & BROADCAST DISPATCH
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-museum-charcoal mt-1">
                    Upload New Post / Social Story
                  </h3>
                  <p className="text-xs text-museum-charcoalLight font-sans mt-0.5">
                    Upload archaeological photos, documentary video clips, or scholarly field notes directly to the public social feed.
                  </p>
                </div>

                <Link
                  href="/blog"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-museum-ivory border border-museum-stone text-xs font-mono font-semibold text-museum-charcoal hover:border-museum-terracotta transition-all self-start sm:self-auto"
                >
                  <Eye className="w-3.5 h-3.5 text-museum-terracotta" />
                  <span>View Public Feed</span>
                  <ExternalLink className="w-3 h-3 text-museum-charcoalLight" />
                </Link>
              </div>

              {blogSuccess && (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-900 font-sans flex items-center gap-2 animate-fade-in">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{blogSuccess}</span>
                </div>
              )}

              {blogError && (
                <div className="p-4 bg-red-50 border border-red-300 rounded-2xl text-xs text-red-900 font-sans flex items-center gap-2 animate-fade-in">
                  <X className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{blogError}</span>
                </div>
              )}

              <form onSubmit={handleAdminCreateBlog} className="space-y-4 text-xs font-sans">
                {/* Media Format Selector */}
                <div>
                  <label className="block uppercase font-bold text-museum-charcoal mb-1.5">
                    Select Post Format *
                  </label>
                  <div className="grid grid-cols-3 gap-2 max-w-md">
                    <button
                      type="button"
                      onClick={() => setNewBlogType("photo")}
                      className={`py-2.5 px-3 rounded-xl font-mono font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                        newBlogType === "photo"
                          ? "bg-museum-terracotta text-white border-museum-terracotta shadow-xs"
                          : "bg-museum-ivory border-museum-stone text-museum-charcoal"
                      }`}
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span>PHOTO</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setNewBlogType("video")}
                      className={`py-2.5 px-3 rounded-xl font-mono font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                        newBlogType === "video"
                          ? "bg-museum-terracotta text-white border-museum-terracotta shadow-xs"
                          : "bg-museum-ivory border-museum-stone text-museum-charcoal"
                      }`}
                    >
                      <VideoIcon className="w-4 h-4" />
                      <span>VIDEO</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setNewBlogType("text")}
                      className={`py-2.5 px-3 rounded-xl font-mono font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                        newBlogType === "text"
                          ? "bg-museum-terracotta text-white border-museum-terracotta shadow-xs"
                          : "bg-museum-ivory border-museum-stone text-museum-charcoal"
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      <span>NOTE / QUOTE</span>
                    </button>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block uppercase font-bold text-museum-charcoal mb-1">
                    Dispatch Headline / Title *
                  </label>
                  <input
                    type="text"
                    value={newBlogTitle}
                    onChange={(e) => setNewBlogTitle(e.target.value)}
                    placeholder="e.g. Rare Inscription Discovered at Sobhaneswar Temple"
                    className="w-full bg-museum-ivory border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal focus:border-museum-terracotta focus:outline-none"
                    required
                  />
                </div>

                {/* Media URL if Photo or Video */}
                {newBlogType !== "text" && (
                  <div>
                    <label className="block uppercase font-bold text-museum-charcoal mb-1">
                      {newBlogType === "photo" ? "Image Path or Web Image URL *" : "Video Embed URL or MP4 URL *"}
                    </label>
                    <input
                      type="text"
                      value={newBlogMediaUrl}
                      onChange={(e) => setNewBlogMediaUrl(e.target.value)}
                      placeholder={
                        newBlogType === "photo"
                          ? "/images/odisha_bhubaneswar_lingaraj_1789302971914.jpg or https://..."
                          : "https://www.youtube.com/embed/... or /videos/research.mp4"
                      }
                      className="w-full bg-museum-ivory border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal font-mono text-xs focus:border-museum-terracotta focus:outline-none"
                      required
                    />
                    <span className="text-[10px] text-museum-charcoalLight mt-1 block">
                      Local image files in <code>/images/...</code> or valid web URLs are supported.
                    </span>
                  </div>
                )}

                {/* Caption / Commentary */}
                <div>
                  <label className="block uppercase font-bold text-museum-charcoal mb-1">
                    Caption & Scholarly Field Notes *
                  </label>
                  <textarea
                    rows={4}
                    value={newBlogCaption}
                    onChange={(e) => setNewBlogCaption(e.target.value)}
                    placeholder="Provide detailed historical observations, archival context, dates, and significance..."
                    className="w-full bg-museum-ivory border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal focus:border-museum-terracotta focus:outline-none"
                    required
                  />
                </div>

                {/* Location & Tags */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase font-bold text-museum-charcoal mb-1">
                      Location Tag
                    </label>
                    <input
                      type="text"
                      value={newBlogLocation}
                      onChange={(e) => setNewBlogLocation(e.target.value)}
                      placeholder="e.g. Konark Sun Temple, Odisha"
                      className="w-full bg-museum-ivory border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal focus:border-museum-terracotta focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-bold text-museum-charcoal mb-1">
                      Hashtags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={newBlogTags}
                      onChange={(e) => setNewBlogTags(e.target.value)}
                      placeholder="OdishaArchaeology, Epigraphy, History"
                      className="w-full bg-museum-ivory border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal focus:border-museum-terracotta focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={blogPublishing}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-museum-terracotta text-white hover:bg-museum-mutedRed rounded-xl text-xs font-mono font-bold uppercase tracking-wider shadow-md disabled:opacity-50 cursor-pointer"
                  >
                    {blogPublishing ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <span>{blogPublishing ? "Publishing..." : "Publish to Social Feed"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Post Moderation & List Header */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-museum-parchment/40 p-4 rounded-2xl border border-museum-stone">
                <div className="flex items-center gap-3">
                  <h4 className="font-serif text-lg font-bold text-museum-charcoal">
                    Manage Published Dispatches ({adminBlogPosts.length})
                  </h4>
                </div>

                <button
                  onClick={fetchAdminBlogPosts}
                  disabled={blogLoading}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-museum-ivory border border-museum-stone hover:bg-museum-parchment rounded-xl text-xs font-mono font-semibold text-museum-charcoal transition-all cursor-pointer self-start sm:self-auto"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${blogLoading ? "animate-spin text-museum-terracotta" : ""}`} />
                  <span>Refresh Feed</span>
                </button>
              </div>

              {/* Blog Posts Cards List */}
              {adminBlogPosts.length === 0 ? (
                <div className="p-12 text-center bg-museum-parchment/30 border border-dashed border-museum-stone rounded-3xl space-y-2">
                  <Sparkles className="w-8 h-8 text-museum-charcoalLight/50 mx-auto" />
                  <p className="font-serif text-lg text-museum-charcoal">No dispatches published yet.</p>
                  <p className="text-xs text-museum-charcoalLight">
                    Use the form above to post your first field photo, video, or note.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {adminBlogPosts.map((post) => (
                    <div
                      key={post.id}
                      className={`p-5 bg-museum-ivory border rounded-3xl space-y-4 transition-all shadow-xs ${
                        post.isHidden
                          ? "border-amber-300 bg-amber-50/30"
                          : "border-museum-stone hover:border-museum-terracotta/40"
                      }`}
                    >
                      {/* Card Header: Type Badge & Actions */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-museum-parchment border border-museum-stone text-museum-charcoal flex items-center gap-1">
                            {post.type === "photo" && <ImageIcon className="w-3 h-3 text-museum-terracotta" />}
                            {post.type === "video" && <VideoIcon className="w-3 h-3 text-blue-600" />}
                            {post.type === "text" && <FileText className="w-3 h-3 text-emerald-600" />}
                            <span>{post.type}</span>
                          </span>

                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                              post.isHidden
                                ? "bg-amber-100 text-amber-900 border border-amber-300"
                                : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                            }`}
                          >
                            {post.isHidden ? "HIDDEN" : "PUBLIC"}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleAdminToggleHide(post.id)}
                            className={`p-2 rounded-xl border text-xs font-mono font-semibold transition-all cursor-pointer ${
                              post.isHidden
                                ? "bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200"
                                : "bg-museum-parchment border-museum-stone text-museum-charcoalLight hover:text-museum-charcoal"
                            }`}
                            title={post.isHidden ? "Unhide Post (Make Public)" : "Hide Post from Visitors"}
                          >
                            {post.isHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            onClick={() => handleAdminDeletePost(post.id)}
                            className="p-2 bg-museum-parchment border border-museum-stone hover:bg-red-50 hover:text-red-700 text-museum-charcoalLight rounded-xl transition-all cursor-pointer"
                            title="Delete Dispatch"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Title & Preview */}
                      <div className="space-y-1.5">
                        <h4 className="font-serif text-base font-bold text-museum-charcoal leading-snug line-clamp-1">
                          {post.title}
                        </h4>
                        <p className="text-xs text-museum-charcoalLight font-sans line-clamp-2 leading-relaxed">
                          {post.caption}
                        </p>
                      </div>

                      {/* Footer: Date, Likes, Location */}
                      <div className="pt-3 border-t border-museum-stone flex items-center justify-between text-[11px] font-mono text-museum-charcoalLight">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-museum-terracotta font-semibold">
                            <Heart className="w-3.5 h-3.5 fill-museum-terracotta" />
                            <span>{post.likesCount}</span>
                          </span>
                          <span>•</span>
                          <span>{post.dateFormatted}</span>
                        </div>

                        <Link
                          href="/blog"
                          target="_blank"
                          className="inline-flex items-center gap-1 text-museum-terracotta hover:underline font-semibold"
                        >
                          <span>View on Feed</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: RESEARCH PUBLISHER */}
        {activeTab === "ADD_RESEARCH" && (
          <div className="max-w-3xl mx-auto bg-museum-parchment/60 border border-museum-stone rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="border-b border-museum-stone pb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-museum-terracotta font-bold block">
                ARCHIVE MONOGRAPH & DISCOVERY PUBLISHER
              </span>
              <h3 className="font-serif text-3xl font-bold text-museum-charcoal mt-1">
                Publish New Research Paper
              </h3>
              <p className="text-xs text-museum-charcoalLight font-sans mt-1">
                Publish peer-reviewed papers, field monographs, and epigraphic notes directly into the KAALREKHA public catalog.
              </p>
            </div>

            {publishSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 font-sans flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{publishSuccess}</span>
              </div>
            )}

            {publishError && (
              <div className="p-4 bg-red-50 border border-red-300 rounded-xl text-xs text-red-900 font-sans flex items-center gap-2">
                <X className="w-4 h-4 text-red-600 shrink-0" />
                <span>{publishError}</span>
              </div>
            )}

            <form onSubmit={handlePublishResearch} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-museum-charcoalLight font-semibold mb-1.5">
                  RESEARCH TITLE *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maritime Guilds of Kalinga: Copperplate Edicts from 4th to 8th Century CE"
                  value={researchTitle}
                  onChange={(e) => setResearchTitle(e.target.value)}
                  className="w-full bg-museum-ivory border border-museum-stone rounded-xl p-3.5 text-sm text-museum-charcoal font-serif focus:border-museum-terracotta focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-museum-charcoalLight font-semibold mb-1.5">
                    YEAR OF PUBLICATION *
                  </label>
                  <input
                    type="text"
                    required
                    value={researchYear}
                    onChange={(e) => setResearchYear(e.target.value)}
                    className="w-full bg-museum-ivory border border-museum-stone rounded-xl p-3 text-xs text-museum-charcoal font-mono focus:border-museum-terracotta focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-museum-charcoalLight font-semibold mb-1.5">
                    DOCUMENT TYPE *
                  </label>
                  <select
                    value={researchType}
                    onChange={(e) => setResearchType(e.target.value as Publication["type"])}
                    className="w-full bg-museum-ivory border border-museum-stone rounded-xl p-3 text-xs text-museum-charcoal font-sans focus:border-museum-terracotta focus:outline-none"
                  >
                    <option value="ARTICLE">ARTICLE / PAPER</option>
                    <option value="BOOK">MONOGRAPH / BOOK</option>
                    <option value="CHAPTER">EDITED VOLUME CHAPTER</option>
                    <option value="REVIEW">CRITICAL ESSAY</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-museum-charcoalLight font-semibold mb-1.5">
                    PUBLISHER / JOURNAL
                  </label>
                  <input
                    type="text"
                    value={researchPublisher}
                    onChange={(e) => setResearchPublisher(e.target.value)}
                    className="w-full bg-museum-ivory border border-museum-stone rounded-xl p-3 text-xs text-museum-charcoal font-sans focus:border-museum-terracotta focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-museum-charcoalLight font-semibold mb-1.5">
                  THEMES / TAGS (Comma-separated)
                </label>
                <input
                  type="text"
                  value={researchThemes}
                  onChange={(e) => setResearchThemes(e.target.value)}
                  placeholder="ODISHA MARITIME, INSCRIPTIONS, TRADE"
                  className="w-full bg-museum-ivory border border-museum-stone rounded-xl p-3 text-xs text-museum-charcoal font-mono focus:border-museum-terracotta focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-museum-charcoalLight font-semibold mb-1.5">
                  SHORT DESCRIPTION / SUMMARY *
                </label>
                <textarea
                  rows={3}
                  required
                  value={researchDescription}
                  onChange={(e) => setResearchDescription(e.target.value)}
                  placeholder="Concise overview of the key arguments and historical scope..."
                  className="w-full bg-museum-ivory border border-museum-stone rounded-xl p-3.5 text-xs text-museum-charcoal font-serif focus:border-museum-terracotta focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-museum-charcoalLight font-semibold mb-1.5">
                  EXTENDED SCHOLARLY ABSTRACT
                </label>
                <textarea
                  rows={5}
                  value={researchAbstract}
                  onChange={(e) => setResearchAbstract(e.target.value)}
                  placeholder="Full methodological abstract, primary sources consulted, and archaeological findings..."
                  className="w-full bg-museum-ivory border border-museum-stone rounded-xl p-3.5 text-xs text-museum-charcoal font-serif focus:border-museum-terracotta focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={publishing}
                  className="w-full py-4 bg-museum-terracotta hover:bg-museum-mutedRed text-white text-xs font-bold uppercase tracking-wider transition-all rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {publishing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>PUBLISHING TO ARCHIVE...</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4" />
                      <span>PUBLISH TO PUBLIC CATALOG</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Log Book Entry Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-museum-ivory border border-museum-stone rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-5 text-museum-charcoal relative">
            <button
              onClick={() => setSelectedLog(null)}
              className="absolute top-4 right-4 p-2 text-museum-charcoalLight hover:text-museum-charcoal hover:bg-museum-parchment rounded-xl transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-museum-stone pb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-museum-terracotta font-bold uppercase">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {selectedLog.dateFormatted} • {selectedLog.timeFormatted}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-museum-charcoal mt-1">
                {selectedLog.fullName}
              </h3>
              <p className="text-xs font-mono text-museum-charcoalLight">
                <a
                  href={`mailto:${selectedLog.email}`}
                  className="text-museum-terracotta hover:underline font-bold"
                >
                  {selectedLog.email}
                </a>{" "}
                • {selectedLog.affiliation}
              </p>
            </div>

            {/* Attached Identity Snapshot */}
            {selectedLog.tempPhotoData && (
              <div className="p-4 bg-museum-parchment/60 rounded-xl border border-museum-stone text-center space-y-2">
                <span className="text-[10px] font-mono text-museum-charcoalLight uppercase font-semibold block">
                  VERIFIED RESEARCHER IDENTITY SNAPSHOT
                </span>
                <div className="relative w-48 h-36 mx-auto rounded-xl overflow-hidden border-2 border-museum-terracotta shadow-md bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedLog.tempPhotoData}
                    alt={selectedLog.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Purpose & Reply Preference */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-museum-parchment/40 p-3 rounded-xl border border-museum-stone">
              <div>
                <span className="text-museum-charcoalLight block text-[10px]">PURPOSE:</span>
                <span className="font-bold text-museum-charcoal">{selectedLog.purpose}</span>
              </div>
              <div>
                <span className="text-museum-charcoalLight block text-[10px]">PREFERRED REPLY:</span>
                <span className="font-bold text-museum-charcoal">{selectedLog.preferredMethod}</span>
              </div>
            </div>

            {/* Message Body */}
            <div className="bg-museum-parchment/40 p-5 rounded-xl border border-museum-stone space-y-2">
              <span className="text-[10px] font-mono uppercase text-museum-terracotta font-bold block">
                ENQUIRY MESSAGE BODY:
              </span>
              <p className="text-sm font-serif leading-relaxed text-museum-charcoal whitespace-pre-wrap">
                {selectedLog.message}
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`mailto:${selectedLog.email}?subject=Re: KAALREKHA Academic Enquiry - ${selectedLog.purpose}`}
                className="flex-1 py-3 bg-museum-terracotta hover:bg-museum-mutedRed text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 text-center"
              >
                <Mail className="w-4 h-4" />
                <span>Direct Reply to {selectedLog.email}</span>
              </a>

              <button
                onClick={() => {
                  handleUpdateStatus(
                    selectedLog.id,
                    selectedLog.status === "UNREAD" ? "REVIEWED" : "UNREAD"
                  );
                }}
                className="px-5 py-3 bg-museum-ivory border border-museum-stone hover:bg-museum-parchment text-museum-charcoal text-xs font-mono font-bold uppercase rounded-xl transition-all cursor-pointer"
              >
                {selectedLog.status === "UNREAD" ? "Mark as Reviewed" : "Mark as Unread"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
