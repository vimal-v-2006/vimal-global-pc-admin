import { Sidebar } from "@/components/sidebar";
import { LiveRequestBoard } from "@/components/live-request-board";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <Sidebar />
        <div className="space-y-8">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Standalone admin panel</p>
            <h1 className="mt-3 text-4xl font-black text-white">Live website requests</h1>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              This admin app reads real requests from the shared local backend, including payment mode and screenshot file details.
            </p>
          </div>

          <LiveRequestBoard />
        </div>
      </div>
    </div>
  );
}
