"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { AdminRequest } from "@/lib/data";
import { formatAdminDate } from "@/lib/data";
import { StatusPill } from "@/components/status-pill";
import { requestByIdEndpoint } from "@/lib/api";

export function RequestDetail({ request, onUpdated }: { request: AdminRequest; onUpdated?: () => void }) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function markCompleted() {
    setUpdating(true);
    setError(null);
    try {
      const response = await fetch(requestByIdEndpoint(request.id), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestStatus: "Completed",
          historyAction: "Marked as completed by admin",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update request");
      }

      onUpdated?.();
    } catch {
      setError("Could not mark this request as completed. Check the backend URL and try again.");
    } finally {
      setUpdating(false);
    }
  }

  async function deleteCompletedRequest() {
    const confirmed = window.confirm("Delete this completed request permanently? This will remove the screenshot and all stored data from the database.");
    if (!confirmed) return;

    setDeleting(true);
    setError(null);
    try {
      const response = await fetch(requestByIdEndpoint(request.id), {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete request");
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Could not delete this request. Check the backend URL and try again.");
      setDeleting(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-bold text-white">{request.name}</h2>
          <StatusPill value={request.paymentStatus} />
          <StatusPill value={request.requestStatus} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Info label="Request ID" value={request.id} />
          <Info label="Submitted" value={formatAdminDate(request.submittedDate)} />
          <Info label="Phone" value={request.phone} />
          <Info label="Email" value={request.email} />
          <Info label="Contact app" value={request.contactApp} />
          {request.country ? <Info label="Country" value={request.country} /> : null}
        </div>
        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Services</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {request.services.map((service) => (
              <span key={service} className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-sm text-slate-200">
                {service}
              </span>
            ))}
          </div>
        </section>
        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Custom request</p>
          <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm leading-7 text-slate-200">
            {request.customRequest}
          </div>
        </section>
        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">PC specs</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {Object.entries(request.pcSpecs).filter(([, value]) => value).length > 0 ? Object.entries(request.pcSpecs).filter(([, value]) => value).map(([key, value]) => (
              <div key={key} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-200">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{key}</p>
                <p className="mt-2">{value}</p>
              </div>
            )) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/60 p-4 text-sm text-slate-400">
                No specs were provided.
              </div>
            )}
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-lg font-semibold text-white">Payment details</p>
          <div className="mt-4 space-y-4 text-sm text-slate-300">
            <div className="flex flex-wrap gap-2">
              <StatusPill value={request.paymentMode} />
              <StatusPill value={request.paymentStatus} />
            </div>
            {request.paymentScreenshot && request.paymentScreenshotDataUrl ? (
              <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Screenshot file</p>
                  <p className="mt-2 break-all text-white">{request.paymentScreenshot}</p>
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
                  <Image
                    src={request.paymentScreenshotDataUrl}
                    alt={request.paymentScreenshot}
                    width={1200}
                    height={1200}
                    className="h-auto w-full"
                    unoptimized
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={request.paymentScreenshotDataUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Open screenshot
                  </a>
                  <a
                    href={request.paymentScreenshotDataUrl}
                    download={request.paymentScreenshot}
                    className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                  >
                    Download screenshot
                  </a>
                </div>
              </div>
            ) : request.paymentScreenshot ? (
              <div className="rounded-2xl border border-dashed border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
                Old request only has the filename stored. New uploads will support preview and download automatically.
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/60 p-4 text-slate-400">
                No screenshot because this request is pay later.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-lg font-semibold text-white">Request history</p>
          <div className="mt-4 space-y-3">
            {(request.history ?? []).length > 0 ? (request.history ?? []).map((item, index) => (
              <div key={`${item.at}-${index}`} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-200">
                <p>{item.action}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">{formatAdminDate(item.at)}</p>
              </div>
            )) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/60 p-4 text-sm text-slate-400">
                No history yet.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-lg font-semibold text-white">Admin actions</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={markCompleted}
              disabled={updating || deleting || request.requestStatus === "Completed"}
              className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {request.requestStatus === "Completed" ? "Already completed" : updating ? "Saving..." : "Mark as completed"}
            </button>
            {request.requestStatus === "Completed" ? (
              <button
                type="button"
                onClick={deleteCompletedRequest}
                disabled={deleting || updating}
                className="rounded-full border border-rose-400/30 bg-rose-400/10 px-5 py-3 text-sm font-semibold text-rose-100 transition hover:bg-rose-400/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete permanently"}
              </button>
            ) : null}
          </div>
          {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm text-slate-100 break-words">{value}</p>
    </div>
  );
}
