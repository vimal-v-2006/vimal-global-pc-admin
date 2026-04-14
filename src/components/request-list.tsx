import Link from "next/link";
import type { AdminRequest } from "@/lib/data";
import { StatusPill } from "@/components/status-pill";

export function RequestList({ items }: { items: AdminRequest[] }) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-300">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.2em] text-slate-400">
            <tr>
              <th className="px-5 py-4">ID</th>
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Phone</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">App</th>
              <th className="px-5 py-4">Services</th>
              <th className="px-5 py-4">Payment</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-white/10">
                <td className="px-5 py-4 font-semibold text-white">
                  <Link href={`/requests/${item.id}`} className="hover:text-cyan-300">
                    {item.id}
                  </Link>
                </td>
                <td className="px-5 py-4">{item.name}</td>
                <td className="px-5 py-4">{item.phone}</td>
                <td className="px-5 py-4">{item.email}</td>
                <td className="px-5 py-4">{item.contactApp}</td>
                <td className="px-5 py-4">{item.services.join(", ")}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-col gap-2">
                    <StatusPill value={item.paymentStatus} />
                    <StatusPill value={item.paymentMode} />
                  </div>
                </td>
                <td className="px-5 py-4">
                  <StatusPill value={item.requestStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
