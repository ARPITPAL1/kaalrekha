"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/ui/Footer";
import { useLanguage } from "@/context/LanguageContext";
import {
  Heart,
  Share2,
  Bookmark,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  Image as ImageIcon,
  Video as VideoIcon,
  FileText,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  X,
  Send,
  MoreVertical,
  ShieldCheck,
  Search,
  Filter,
  RefreshCw,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { BlogPost } from "@/lib/blog";

export default function BlogPage() {
  const { language } = useLanguage();
  const isOdia = language === "or";
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<"ALL" | "photo" | "video" | "text">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [session, setSession] = useState<{
    name: string;
    email: string;
    isAdmin: boolean;
  } | null>(null);

  // Modal State for Admin Creating Post
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [postType, setPostType] = useState<"photo" | "video" | "text">("photo");
  const [postTitle, setPostTitle] = useState("");
  const [postCaption, setPostCaption] = useState("");
  const [postMediaUrl, setPostMediaUrl] = useState("");
  const [postLocation, setPostLocation] = useState("Balasore Archival Center, Odisha");
  const [postTags, setPostTags] = useState("OdishaHistory, HistoricalArchives");
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Liked Posts local tracking
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [doubleTapHeartPostId, setDoubleTapHeartPostId] = useState<string | null>(null);
  const [expandedCaptions, setExpandedCaptions] = useState<Record<string, boolean>>({});

  // Fetch Session
  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setSession(data.user);
        }
      })
      .catch(() => {});
  }, []);

  // Fetch Blog Posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      if (data.success && data.posts) {
        setPosts(data.posts);
      }
    } catch {
      console.warn("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Like Action (Available to Everyone)
  const handleLike = async (postId: string) => {
    // Optimistic update
    const currentlyLiked = Boolean(likedPosts[postId]);
    setLikedPosts((prev) => ({ ...prev, [postId]: !currentlyLiked }));
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              likesCount: currentlyLiked ? Math.max(0, p.likesCount - 1) : p.likesCount + 1,
            }
          : p
      )
    );

    try {
      const res = await fetch("/api/blog/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, likesCount: data.likesCount } : p
          )
        );
      }
    } catch {
      // Revert on failure
      setLikedPosts((prev) => ({ ...prev, [postId]: currentlyLiked }));
    }
  };

  // Double Tap on Photo to Like
  const handleDoubleTap = (postId: string) => {
    if (!likedPosts[postId]) {
      handleLike(postId);
    }
    setDoubleTapHeartPostId(postId);
    setTimeout(() => setDoubleTapHeartPostId(null), 900);
  };

  // Share Action
  const handleShare = async (post: BlogPost) => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.caption.slice(0, 100) + "...",
          url: url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    navigator.clipboard.writeText(url);
    showToast(isOdia ? "ଲିଙ୍କ୍ କ୍ଲିପବୋର୍ଡରେ କପି ହୋଇଛି!" : "Post link copied to clipboard!");
  };

  // Admin: Toggle Hide/Unhide
  const handleToggleHide = async (id: string) => {
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "PATCH" });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, isHidden: data.isHidden } : p))
        );
        showToast(
          data.isHidden
            ? (isOdia ? "ପୋଷ୍ଟ୍ ସର୍ବସାଧାରଣଙ୍କଠାରୁ ଲୁକ୍କାୟିତ ହୋଇଛି।" : "Post is now hidden from visitors.")
            : (isOdia ? "ପୋଷ୍ଟ୍ ଏବେ ସମସ୍ତଙ୍କ ପାଇଁ ଦୃଶ୍ୟମାନ।" : "Post is now publicly visible.")
        );
      }
    } catch {
      showToast("Error updating post visibility");
    }
  };

  // Admin: Delete Post
  const handleDeletePost = async (id: string) => {
    if (!confirm(isOdia ? "ଆପଣ ଏହି ପୋଷ୍ଟ୍ କୁ ସବୁଦିନ ପାଇଁ ଡିଲିଟ୍ କରିବାକୁ ଚାହାଁନ୍ତି କି?" : "Are you sure you want to permanently delete this post?")) {
      return;
    }

    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        showToast(isOdia ? "ପୋଷ୍ଟ୍ ଡିଲିଟ୍ ହୋଇଛି।" : "Post deleted successfully.");
      }
    } catch {
      showToast("Error deleting post");
    }
  };

  // Admin: Create New Post
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postCaption.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: postType,
          title: postTitle,
          caption: postCaption,
          mediaUrl: postMediaUrl,
          location: postLocation,
          tags: postTags,
        }),
      });

      const data = await res.json();
      if (data.success && data.post) {
        setPosts([data.post, ...posts]);
        setShowCreateModal(false);
        setPostTitle("");
        setPostCaption("");
        setPostMediaUrl("");
        showToast(isOdia ? "ନୂତନ ପୋଷ୍ଟ୍ ସଫଳତାର ସହ ପ୍ରକାଶିତ ହେଲା!" : "Dispatch published successfully to the social feed!");
      } else {
        alert(data.error || "Failed to publish post");
      }
    } catch {
      alert("Error publishing post");
    } finally {
      setSubmitting(false);
    }
  };

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesType = filterType === "ALL" ? true : post.type === filterType;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        post.title.toLowerCase().includes(q) ||
        post.caption.toLowerCase().includes(q) ||
        (post.location && post.location.toLowerCase().includes(q)) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      return matchesType && matchesSearch;
    });
  }, [posts, filterType, searchQuery]);

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] text-museum-charcoal selection:bg-museum-terracotta selection:text-white">
      <Navbar />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="bg-museum-charcoal text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-sans flex items-center gap-2.5 border border-museum-stone">
            <Sparkles className="w-4 h-4 text-museum-antiqueGold" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <section className="relative pt-36 pb-12 px-4 sm:px-6 lg:px-12 border-b border-museum-stone bg-museum-parchment/40">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-museum-terracotta/10 border border-museum-terracotta/30 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-museum-terracotta">
            <span className="w-2 h-2 rounded-full bg-museum-terracotta animate-pulse" />
            <span>{isOdia ? "ଐତିହାସିକ ବ୍ଲଗ୍ ଓ ଫଟୋ ଅଭିଲେଖାଗାର" : "HISTORICAL DISPATCHES & SOCIAL FEED"}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-museum-charcoal tracking-tight">
            {isOdia ? "ଡକ୍ଟର ଅଞ୍ଜନ କୁମାର ପାଲଙ୍କ " : "Live Field Dispatches & "}
            <br />
            <span className="italic text-museum-terracotta font-serif">
              {isOdia ? "ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଡାଏରୀ" : "Visual Archival Stories"}
            </span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-museum-charcoalLight max-w-2xl mx-auto leading-relaxed">
            {isOdia
              ? "ପ୍ରାଚୀ ଉପତ୍ୟକା, କଳିଙ୍ଗ ଜଳଯାତ୍ରା, ତାଳପତ୍ର ପୋଥି ଓ ଔପନିବେଶିକ ଶିକ୍ଷା ସମ୍ପର୍କିତ ଫଟୋ, ଭିଡିଓ ଏବଂ ଐତିହାସିକ ବିଶ୍ଳେଷଣର ନିରନ୍ତର ଧାରା।"
              : "An Instagram-style scholarly journal exploring archaeological expeditions, ancient maritime epigraphs, rare palm-leaf manuscripts, and archival discoveries in real time."}
          </p>

          {/* Admin Publish Trigger Button */}
          {session?.isAdmin && (
            <div className="pt-2">
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-museum-terracotta text-white hover:bg-museum-mutedRed rounded-2xl text-xs font-sans font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{isOdia ? "ନୂଆ ପୋଷ୍ଟ୍ / ଫଟୋ / ଭିଡିଓ ଯୋଡ଼ନ୍ତୁ" : "UPLOAD NEW DISPATCH / POST"}</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Filter Tabs & Search Header */}
      <section className="sticky top-16 z-30 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-museum-stone/60 py-4 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Feed Type Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-museum-parchment p-1 rounded-2xl border border-museum-stone text-xs font-mono font-semibold">
            <button
              onClick={() => setFilterType("ALL")}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                filterType === "ALL"
                  ? "bg-museum-terracotta text-white shadow-xs"
                  : "text-museum-charcoal hover:text-museum-terracotta"
              }`}
            >
              {isOdia ? "ସବୁ" : "ALL"}
            </button>

            <button
              onClick={() => setFilterType("photo")}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
                filterType === "photo"
                  ? "bg-museum-terracotta text-white shadow-xs"
                  : "text-museum-charcoal hover:text-museum-terracotta"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{isOdia ? "ଫଟୋ" : "PHOTOS"}</span>
            </button>

            <button
              onClick={() => setFilterType("video")}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
                filterType === "video"
                  ? "bg-museum-terracotta text-white shadow-xs"
                  : "text-museum-charcoal hover:text-museum-terracotta"
              }`}
            >
              <VideoIcon className="w-3.5 h-3.5" />
              <span>{isOdia ? "ଭିଡିଓ" : "VIDEOS"}</span>
            </button>

            <button
              onClick={() => setFilterType("text")}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
                filterType === "text"
                  ? "bg-museum-terracotta text-white shadow-xs"
                  : "text-museum-charcoal hover:text-museum-terracotta"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{isOdia ? "ନୋଟ୍ସ" : "NOTES"}</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-museum-charcoalLight" />
            <input
              type="text"
              placeholder={isOdia ? "ସନ୍ଧାନ କରନ୍ତୁ..." : "Search dispatches..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-museum-parchment border border-museum-stone rounded-xl text-xs text-museum-charcoal focus:border-museum-terracotta focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Main Feed Container */}
      <main className="max-w-xl mx-auto px-4 py-8 space-y-8">
        {loading ? (
          <div className="py-24 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-museum-terracotta animate-spin mx-auto" />
            <p className="font-serif text-sm text-museum-charcoalLight">Loading dispatches & archival feed...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-20 text-center bg-museum-parchment/40 border border-dashed border-museum-stone rounded-3xl p-8 space-y-3">
            <Sparkles className="w-8 h-8 text-museum-charcoalLight mx-auto" />
            <h3 className="font-serif text-lg font-bold text-museum-charcoal">No Dispatches Found</h3>
            <p className="text-xs text-museum-charcoalLight max-w-sm mx-auto">
              No posts matched your active filter or search. Check back soon for new field notes and photo dispatches.
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isLiked = Boolean(likedPosts[post.id]);
            const isExpanded = Boolean(expandedCaptions[post.id]);

            return (
              <article
                key={post.id}
                className={`bg-white border rounded-3xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md ${
                  post.isHidden
                    ? "border-amber-400/80 bg-amber-50/20"
                    : "border-museum-stone/80"
                }`}
              >
                {/* Post Header */}
                <div className="p-4 sm:p-5 flex items-center justify-between border-b border-museum-stone/30">
                  <div className="flex items-center gap-3">
                    {/* Scholar Avatar */}
                    <div className="w-10 h-10 rounded-full border-2 border-museum-terracotta/40 p-0.5 relative shrink-0">
                      <div className="w-full h-full rounded-full bg-museum-terracotta text-white flex items-center justify-center font-serif font-bold text-sm overflow-hidden">
                        {post.author.avatar ? (
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        ) : (
                          "AP"
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-serif font-bold text-sm text-museum-charcoal leading-none">
                          {post.author.name}
                        </h3>
                        {post.author.verified && (
                          <span title="Verified Archival Scholar">
                            <CheckCircle2 className="w-3.5 h-3.5 text-museum-terracotta fill-museum-terracotta/20" />
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-museum-charcoalLight mt-1 font-sans">
                        {post.location && (
                          <span className="flex items-center gap-1 font-medium text-museum-terracotta/90 truncate max-w-[200px]">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span>{post.location}</span>
                          </span>
                        )}
                        <span>•</span>
                        <span className="font-mono text-[10px]">{post.dateFormatted}</span>
                      </div>
                    </div>
                  </div>

                  {/* Post Badges & Admin Controls */}
                  <div className="flex items-center gap-1.5">
                    {post.isHidden && (
                      <span className="px-2.5 py-1 bg-amber-100 border border-amber-300 text-amber-900 rounded-full text-[10px] font-mono font-bold uppercase">
                        HIDDEN FROM PUBLIC
                      </span>
                    )}

                    {/* Admin Action Menu */}
                    {session?.isAdmin && (
                      <div className="flex items-center gap-1 bg-museum-parchment p-1 rounded-xl border border-museum-stone">
                        <button
                          onClick={() => handleToggleHide(post.id)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            post.isHidden
                              ? "text-amber-700 bg-amber-100 hover:bg-amber-200"
                              : "text-museum-charcoalLight hover:text-museum-charcoal"
                          }`}
                          title={post.isHidden ? "Unhide Post (Make Public)" : "Hide Post from Visitors"}
                        >
                          {post.isHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-1.5 text-museum-charcoalLight hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Post"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Media Container */}
                {post.type === "photo" && post.mediaUrl && (
                  <div
                    className="relative w-full aspect-[4/3] sm:aspect-square bg-museum-charcoal overflow-hidden group select-none cursor-pointer"
                    onDoubleClick={() => handleDoubleTap(post.id)}
                  >
                    <Image
                      src={post.mediaUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-102"
                      unoptimized
                    />

                    {/* Animated Double-Tap Heart Overlay */}
                    {doubleTapHeartPostId === post.id && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-ping">
                        <Heart className="w-24 h-24 text-white fill-museum-terracotta drop-shadow-2xl" />
                      </div>
                    )}

                    <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-mono text-white/90">
                      KAALREKHA ARCHIVE
                    </div>
                  </div>
                )}

                {post.type === "video" && post.mediaUrl && (
                  <div className="relative w-full aspect-video bg-black overflow-hidden">
                    {post.mediaUrl.includes("youtube.com") || post.mediaUrl.includes("youtu.be") || post.mediaUrl.includes("embed") ? (
                      <iframe
                        src={post.mediaUrl}
                        title={post.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={post.mediaUrl}
                        controls
                        className="w-full h-full object-cover"
                        poster="/images/eastern_ganga_konark_1789279222338.jpg"
                      />
                    )}
                  </div>
                )}

                {post.type === "text" && (
                  <div className="p-8 bg-gradient-to-br from-[#FAF6EE] to-[#F2EDE2] border-y border-museum-stone/40 relative">
                    <span className="text-5xl font-serif text-museum-terracotta/20 absolute top-4 left-6 select-none">
                      &ldquo;
                    </span>
                    <div className="relative z-10 space-y-3">
                      <h4 className="font-serif text-xl sm:text-2xl font-bold text-museum-charcoal leading-snug">
                        {post.title}
                      </h4>
                      <p className="font-serif text-sm sm:text-base text-museum-charcoal italic leading-relaxed">
                        {post.caption}
                      </p>
                    </div>
                  </div>
                )}

                {/* Interactive Action Bar (Like, Share, Bookmark) */}
                <div className="px-5 pt-4 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Like Button */}
                    <button
                      onClick={() => handleLike(post.id)}
                      className="group flex items-center gap-1.5 text-xs font-mono font-bold transition-all cursor-pointer focus:outline-none"
                    >
                      <Heart
                        className={`w-6 h-6 transition-all duration-200 group-hover:scale-115 ${
                          isLiked
                            ? "text-museum-terracotta fill-museum-terracotta animate-pulse"
                            : "text-museum-charcoal group-hover:text-museum-terracotta"
                        }`}
                      />
                    </button>

                    {/* Share Button */}
                    <button
                      onClick={() => handleShare(post)}
                      className="text-museum-charcoal hover:text-museum-terracotta hover:scale-115 transition-all cursor-pointer focus:outline-none"
                      title="Share Dispatch"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Bookmark Visual Indicator */}
                  <button
                    onClick={() => showToast(isOdia ? "ପୋଷ୍ଟ୍ ସଂରକ୍ଷିତ ହୋଇଛି।" : "Post bookmarked to reading session.")}
                    className="text-museum-charcoalLight hover:text-museum-terracotta hover:scale-110 transition-all cursor-pointer"
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>

                {/* Likes Counter */}
                <div className="px-5 py-1">
                  <p className="font-sans text-xs font-bold text-museum-charcoal">
                    {post.likesCount.toLocaleString()} {isOdia ? "ଜଣ ପସନ୍ଦ କରିଛନ୍ତି" : "likes"}
                  </p>
                </div>

                {/* Caption, Title & Hashtags */}
                <div className="px-5 pb-5 pt-1 space-y-2 text-xs font-sans">
                  {post.type !== "text" && (
                    <h4 className="font-serif text-base font-bold text-museum-charcoal leading-snug">
                      {post.title}
                    </h4>
                  )}

                  {post.type !== "text" && (
                    <div className="text-museum-charcoal/90 text-xs sm:text-sm leading-relaxed font-sans">
                      <p className={isExpanded ? "" : "line-clamp-3"}>
                        {post.caption}
                      </p>

                      {post.caption.length > 180 && (
                        <button
                          onClick={() =>
                            setExpandedCaptions((prev) => ({
                              ...prev,
                              [post.id]: !isExpanded,
                            }))
                          }
                          className="text-museum-terracotta hover:underline font-semibold text-xs mt-1 block cursor-pointer"
                        >
                          {isExpanded
                            ? (isOdia ? "କମ୍ ଦେଖନ୍ତୁ" : "Show less")
                            : (isOdia ? "...ଅଧିକ ପଢନ୍ତୁ" : "...Read full dispatch")}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Hashtags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-mono text-museum-terracotta hover:underline cursor-pointer"
                        >
                          #{tag.replace(/^#/, "")}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Time Stamp */}
                  <div className="pt-2 text-[10px] font-mono text-museum-charcoalLight uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-3 h-3 text-museum-charcoalLight" />
                    <span>
                      {post.dateFormatted} · {post.timeFormatted}
                    </span>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </main>

      {/* Admin Post Creation Modal */}
      {showCreateModal && session?.isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-museum-charcoal/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-museum-stone rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-museum-stone pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-museum-terracotta font-bold block">
                  ARCHIVE OWNER PUBLISHER
                </span>
                <h3 className="font-serif text-2xl font-bold text-museum-charcoal mt-1">
                  Create Social Dispatch / Post
                </h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 text-museum-charcoalLight hover:text-museum-terracotta rounded-full hover:bg-museum-parchment transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs font-sans">
              {/* Post Type Selector */}
              <div>
                <label className="block uppercase font-bold text-museum-charcoal mb-1.5">
                  Post Format / Media Type *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPostType("photo")}
                    className={`py-2.5 px-3 rounded-xl font-mono font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      postType === "photo"
                        ? "bg-museum-terracotta text-white border-museum-terracotta shadow-xs"
                        : "bg-museum-parchment border-museum-stone text-museum-charcoal"
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>PHOTO</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPostType("video")}
                    className={`py-2.5 px-3 rounded-xl font-mono font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      postType === "video"
                        ? "bg-museum-terracotta text-white border-museum-terracotta shadow-xs"
                        : "bg-museum-parchment border-museum-stone text-museum-charcoal"
                    }`}
                  >
                    <VideoIcon className="w-4 h-4" />
                    <span>VIDEO</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPostType("text")}
                    className={`py-2.5 px-3 rounded-xl font-mono font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      postType === "text"
                        ? "bg-museum-terracotta text-white border-museum-terracotta shadow-xs"
                        : "bg-museum-parchment border-museum-stone text-museum-charcoal"
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
                  Post Title / Headline *
                </label>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. Rare Inscription Discovered at Sobhaneswar Temple"
                  className="w-full bg-museum-parchment border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal focus:border-museum-terracotta focus:outline-none"
                  required
                />
              </div>

              {/* Media URL (If photo or video) */}
              {postType !== "text" && (
                <div>
                  <label className="block uppercase font-bold text-museum-charcoal mb-1">
                    {postType === "photo" ? "Image Path or Web URL *" : "Video Embed URL or MP4 URL *"}
                  </label>
                  <input
                    type="text"
                    value={postMediaUrl}
                    onChange={(e) => setPostMediaUrl(e.target.value)}
                    placeholder={
                      postType === "photo"
                        ? "/images/odisha_bhubaneswar_lingaraj_1789302971914.jpg or https://..."
                        : "https://www.youtube.com/embed/... or /videos/field-doc.mp4"
                    }
                    className="w-full bg-museum-parchment border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal font-mono text-xs focus:border-museum-terracotta focus:outline-none"
                    required
                  />
                  <span className="text-[10px] text-museum-charcoalLight mt-1 block">
                    You can enter a local image path like <code>/images/...</code> or any web image URL.
                  </span>
                </div>
              )}

              {/* Caption / Description */}
              <div>
                <label className="block uppercase font-bold text-museum-charcoal mb-1">
                  Caption & Historical Commentary *
                </label>
                <textarea
                  rows={4}
                  value={postCaption}
                  onChange={(e) => setPostCaption(e.target.value)}
                  placeholder="Describe your research discovery, archaeological findings, field observations, and historical context..."
                  className="w-full bg-museum-parchment border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal focus:border-museum-terracotta focus:outline-none"
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
                    value={postLocation}
                    onChange={(e) => setPostLocation(e.target.value)}
                    placeholder="e.g. Konark Sun Temple, Odisha"
                    className="w-full bg-museum-parchment border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal focus:border-museum-terracotta focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block uppercase font-bold text-museum-charcoal mb-1">
                    Hashtags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={postTags}
                    onChange={(e) => setPostTags(e.target.value)}
                    placeholder="OdishaArchaeology, Epigraphy, History"
                    className="w-full bg-museum-parchment border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal focus:border-museum-terracotta focus:outline-none"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-museum-stone flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2.5 bg-museum-parchment border border-museum-stone rounded-xl text-xs font-semibold text-museum-charcoal hover:bg-museum-ivory"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-museum-terracotta text-white hover:bg-museum-mutedRed rounded-xl text-xs font-mono font-bold uppercase tracking-wider shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>{submitting ? "Publishing..." : "Publish Dispatch"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
