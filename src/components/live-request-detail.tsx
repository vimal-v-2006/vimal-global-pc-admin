"use client";

import { useCallback, useEffect, useState } from "react";
import type { AdminRequest } from "@/lib/data";
import { RequestDetail } from "@/components/request-detail";
import { REQUESTS_ENDPOINT } from "@/lib/api";

export function LiveRequestDetail({ id }: { id: string }) {
  const [request, setRequest] = useState<AdminRequest | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const response = await fetch(REQUESTS_ENDPOINT, { cache: "no-store" });
      const data: AdminRequest[] = await response.json();
      const match = data.find((item) => item.id === id) ?? null;
      setRequest(match);
    } catch {
      setRequest(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    let active = true;

    async function guardedLoad() {
      if (!active) return;
      await load();
    }

    guardedLoad();
    const interval = window.setInterval(guardedLoad, 3000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [load]);

  if (loading) {
    return <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-sm text-slate-300 backdrop-blur-xl">Loading request...</div>;
  }

  if (!request) {
    return <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-white/5 p-6 text-sm text-slate-400 backdrop-blur-xl">Request not found in live backend.</div>;
  }

  return <RequestDetail request={request} onUpdated={load} />;
}
