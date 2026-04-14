import { Sidebar } from "@/components/sidebar";
import { LiveRequestDetail } from "@/components/live-request-detail";

export default async function RequestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <Sidebar />
        <div className="space-y-6">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Request detail</p>
            <h1 className="mt-3 text-4xl font-black text-white">{id}</h1>
          </div>
          <LiveRequestDetail id={id} />
        </div>
      </div>
    </div>
  );
}
