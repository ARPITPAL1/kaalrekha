"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PublicationsCatchAllPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/research");
  }, [router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-museum-ivory text-museum-charcoal font-mono text-xs">
      REDIRECTING TO RESEARCH ARCHIVE...
    </div>
  );
}
