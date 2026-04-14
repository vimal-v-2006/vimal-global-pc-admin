import { Sidebar } from "@/components/sidebar";
import { LiveRequestBoard } from "@/components/live-request-board";

export default function RequestsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <Sidebar />
        <div className="space-y-6">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Requests</p>
            <h1 className="mt-3 text-4xl font-black text-white">Live incoming requests</h1>
          </div>
          <LiveRequestBoard />
        </div>
      </div>
    </div>
  );
}
