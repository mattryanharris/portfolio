"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import type { Project } from "../../data/projects";

/** Click-outside / Esc-to-close modal containing a full case study.
 *  Backed by Next.js intercepting routes — the underlying URL changes to
 *  /projects/<slug>, so links are shareable and back/forward navigate cleanly.
 */
export default function ProjectModal({
  project,
  children,
}: {
  project: Project;
  children: ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.back();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [router]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) router.back();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
        className="relative flex h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Floating close button — stays visible while modal interior scrolls */}
        <button
          onClick={() => router.back()}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 font-sans text-base text-[#111] shadow-sm backdrop-blur transition-colors hover:bg-[color:var(--accent)] hover:text-white"
        >
          ✕
        </button>

        {/* Scrollable case-study body — scrollbar hidden via .no-scrollbar */}
        <div className="no-scrollbar flex-1 overflow-y-auto font-sans text-[color:var(--foreground)]">
          {/* Hero band */}
          <div
            className="relative flex aspect-[16/8] w-full items-end"
            style={{ background: project.cover.background }}
          >
            <span className="m-6 font-mono text-sm text-white/90">
              {project.cover.label}
            </span>
            <span className="absolute top-6 left-6 font-mono text-xs text-white/70">
              {project.year}
            </span>
          </div>

          {/* Header */}
          <header className="border-b border-[color:var(--border)] px-8 pt-8 pb-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-[color:var(--muted)]">
              {project.category}
            </p>
            <h1 className="mt-2 font-sans text-3xl font-semibold tracking-tight">
              {project.title}
            </h1>
            <p className="mt-2 font-sans text-base text-[color:var(--muted)]">
              {project.tagline}
            </p>
          </header>

          {/* Case study content */}
          <div className="px-8 py-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
