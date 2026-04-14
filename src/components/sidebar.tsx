import Link from "next/link";

const items = [
  { href: "/", label: "Dashboard" },
  { href: "/requests", label: "Requests" },
];

export function Sidebar() {
  return (
    <aside className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <p className="text-lg font-semibold text-white">Vimal PC Admin</p>
      <p className="mt-2 text-sm text-slate-400">Separate admin console for website requests.</p>
      <nav className="mt-6 space-y-2">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="block rounded-xl border border-transparent px-4 py-3 text-sm text-slate-300 transition hover:border-white/10 hover:bg-white/5 hover:text-white">
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
