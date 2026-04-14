"use client";

import { useEffect, useMemo, useState } from "react";
import type { AdminRequest } from "@/lib/data";
import { RequestList } from "@/components/request-list";

export function LiveRequestBoard() {
  const [requests, setRequests] = useState<AdminRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response = await fetch("http://localhost:4100/requests", { cache: "no-store" });
        const data = await response.json();
        if (active) setRequests(data);
      } catch {
        if (active) setRequests([]);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    const interval = window.setInterval(load, 3000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  const openRequests = useMemo(() => requests.filter((item) => item.requestStatus !== "Completed"), [requests]);
  const completedRequests = useMemo(() => requests.filter((item) => item.requestStatus === "Completed"), [requests]);

  if (loading) {
    return <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-sm text-slate-300 backdrop-blur-xl">Loading incoming requests...</div>;
  }

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Open requests</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Requests waiting for your action</h2>
        </div>
        {openRequests.length > 0 ? (
          <RequestList items={openRequests} />
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-white/5 p-6 text-sm text-slate-400 backdrop-blur-xl">No open requests right now.</div>
        )}
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Completed history</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Finished requests with time history</h2>
        </div>
        {completedRequests.length > 0 ? (
          <RequestList items={completedRequests} />
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-white/5 p-6 text-sm text-slate-400 backdrop-blur-xl">No completed requests yet.</div>
        )}
      </section>
    </div>
  );
}
