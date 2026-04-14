import { cn } from "@/lib/utils";

const tones: Record<string, string> = {
  Paid: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Pending: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Contacted: "border-sky-400/30 bg-sky-400/10 text-sky-200",
  "In Progress": "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  Completed: "border-violet-400/30 bg-violet-400/10 text-violet-200",
  "Pay later": "border-orange-400/30 bg-orange-400/10 text-orange-200",
  "Screenshot payment": "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
};

export function StatusPill({ value }: { value: string }) {
  return <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-medium", tones[value] ?? "border-white/10 bg-white/5 text-white")}>{value}</span>;
}
