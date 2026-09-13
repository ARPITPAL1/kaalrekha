"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, Clock, RefreshCw, Sparkles, Globe, Landmark, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface HistoryEventItem {
  year: number | string;
  text: string;
  textOdia?: string;
  category?: string;
}

export default function TodayInHistory() {
  const { language } = useLanguage();
  const isOdia = language === "or";

  const [dateStr, setDateStr] = useState<string>("");
  const [events, setEvents] = useState<HistoryEventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<number>(0);

  const fetchTodayData = async () => {
    setLoading(true);
    try {
      const now = new Date();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");

      const res = await fetch(`/api/today-in-history?month=${month}&day=${day}`);
      const data = await res.json();
      if (data && data.events) {
        setDateStr(data.date);
        setEvents(data.events);
      }
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodayData();
  }, []);

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-12 bg-museum-parchment/70 border-t border-museum-stone overflow-hidden text-museum-charcoal">
      <div className="max-w-[1680px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-museum-stone">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8A3324] font-semibold">
              <Clock className="w-4 h-4 animate-spin-slow" />
              <span>{isOdia ? "ପ୍ରତ୍ୟହ ଐତିହାସିକ କାଳଗଣନା" : "DAILY HISTORICAL CHRONOLOGY"}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-museum-charcoal mt-2 flex items-center gap-3">
              <span>{isOdia ? "ଆଜିର ଐତିହାସିକ ଘଟଣାବଳୀ" : "Today in History"}</span>
              <span className="text-xl sm:text-2xl font-mono text-[#8A3324] font-normal">
                ({dateStr || "Today"})
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <span className="text-xs font-mono text-museum-charcoalLight flex items-center gap-1.5 bg-museum-ivory px-3 py-1.5 rounded-lg border border-museum-stone">
              <Globe className="w-3.5 h-3.5 text-[#8A3324]" />
              <span>{isOdia ? "ସର୍ବଦା ଲାଇଭ୍ ଅପଡେଟ୍" : "Live Internet Sync"}</span>
            </span>
            <button
              onClick={fetchTodayData}
              disabled={loading}
              className="p-2 bg-museum-ivory hover:bg-museum-parchment border border-museum-stone rounded-lg text-museum-charcoal hover:text-[#8A3324] transition-all cursor-pointer"
              title="Refresh today's data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#8A3324]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Featured Today Card & Timeline list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Featured Milestone Spotlight */}
          <div className="lg:col-span-7 bg-museum-ivory border border-museum-stone p-8 sm:p-10 rounded-2xl relative overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#8A3324]/10 text-[#8A3324] font-mono text-xs font-bold border border-[#8A3324]/20 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{events[activeTab]?.year || "HISTORICAL MILESTONE"}</span>
                </span>
                <span className="text-xs font-mono text-museum-antiqueGold uppercase font-semibold">
                  {events[activeTab]?.category || "Historical Record"}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-museum-charcoal leading-snug mb-4">
                {isOdia && events[activeTab]?.textOdia
                  ? events[activeTab]?.textOdia
                  : events[activeTab]?.text || "Loading historical events for today..."}
              </h3>

              {events[activeTab]?.textOdia && !isOdia && (
                <p className="font-sans text-xs text-museum-charcoalLight italic border-l-2 border-museum-stone pl-3 mt-3">
                  {events[activeTab]?.textOdia}
                </p>
              )}
            </div>

            <div className="pt-6 border-t border-museum-stone/80 mt-8 flex flex-wrap items-center justify-between text-xs font-mono text-museum-charcoalLight">
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#8A3324]" />
                <span>{isOdia ? "ପ୍ରାମାଣିକ ଅଭିଲେଖାଗାର ତଥ୍ୟ" : "Archival Verified"}</span>
              </div>
              <span>{isOdia ? `ଘଟଣା ${activeTab + 1} / ${events.length}` : `Record ${activeTab + 1} of ${events.length}`}</span>
            </div>
          </div>

          {/* Right: Interactive Timeline of Events for Today */}
          <div className="lg:col-span-5 bg-museum-ivory border border-museum-stone p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono text-museum-charcoalLight uppercase tracking-wider font-bold block mb-4">
                {isOdia ? "ଆଜିର ତାରିଖରେ ଘଟିଥିବା ଅନ୍ୟାନ୍ୟ ଘଟଣାବଳୀ" : "OTHER OCCURRENCES ON THIS DATE"}
              </span>

              <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                {events.map((ev, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      activeTab === idx
                        ? "bg-[#8A3324]/10 border-[#8A3324] shadow-xs"
                        : "bg-museum-parchment/50 border-museum-stone hover:bg-museum-parchment hover:border-museum-stone/80"
                    }`}
                  >
                    <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold shrink-0 mt-0.5 ${
                      activeTab === idx ? "bg-[#8A3324] text-white" : "bg-museum-ivory text-museum-charcoal border border-museum-stone"
                    }`}>
                      {ev.year}
                    </span>
                    <p className="text-xs font-sans text-museum-charcoal line-clamp-2 leading-relaxed">
                      {isOdia && ev.textOdia ? ev.textOdia : ev.text}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-museum-stone mt-4 text-[11px] font-mono text-museum-charcoalLight flex items-center justify-between">
              <span>{isOdia ? "ସଦ୍ୟତମ ତଥ୍ୟ ଅପଡେଟ୍" : "Auto-Refreshed Daily"}</span>
              <span className="text-[#8A3324] font-semibold">{dateStr}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
