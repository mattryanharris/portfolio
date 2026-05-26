"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { projects, getCompany, type Project } from "../data/portfolio";

type View = "list" | "grid";

/** Home catalog with two layouts: a scannable list (default) and the
 *  thumbnail grid. The chosen view persists in localStorage. Company
 *  filtering (dimming non-matching projects) is driven by the `?c=` param,
 *  resolved on the server and passed down as `activeCompanyId`. */
export default function Catalog({
  activeCompanyId,
}: {
  activeCompanyId: string | null;
}) {
  const [view, setView] = useState<View>("list");

  useEffect(() => {
    const saved = localStorage.getItem("catalog-view");
    if (saved === "list" || saved === "grid") setView(saved);
  }, []);

  const choose = (v: View) => {
    setView(v);
    localStorage.setItem("catalog-view", v);
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-end gap-1">
        <ToggleButton
          active={view === "list"}
          onClick={() => choose("list")}
          label="List view"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <line x1="2" y1="4" x2="14" y2="4" />
            <line x1="2" y1="8" x2="14" y2="8" />
            <line x1="2" y1="12" x2="14" y2="12" />
          </svg>
        </ToggleButton>
        <ToggleButton
          active={view === "grid"}
          onClick={() => choose("grid")}
          label="Grid view"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="2" y="2" width="5" height="5" rx="1" />
            <rect x="9" y="2" width="5" height="5" rx="1" />
            <rect x="2" y="9" width="5" height="5" rx="1" />
            <rect x="9" y="9" width="5" height="5" rx="1" />
          </svg>
        </ToggleButton>
      </div>

      {view === "list" ? (
        <ListView activeCompanyId={activeCompanyId} />
      ) : (
        <GridView activeCompanyId={activeCompanyId} />
      )}
    </>
  );
}

function ToggleButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
        active
          ? "bg-black/[0.07] text-[color:var(--foreground)]"
          : "text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
      }`}
    >
      {children}
    </button>
  );
}

/** Default layout, one row per project: thumbnail, title + company,
 *  tagline, year. */
function ListView({ activeCompanyId }: { activeCompanyId: string | null }) {
  return (
    <ul className="border-t border-[color:var(--border)]">
      {projects.map((p) => {
        const company = getCompany(p.companyId);
        const dimmed =
          activeCompanyId !== null && p.companyId !== activeCompanyId;
        return (
          <li
            key={p.slug}
            className={`border-b border-[color:var(--border)] transition-opacity ${
              dimmed ? "opacity-25" : ""
            }`}
          >
            <Link
              href={`/projects/${p.slug}`}
              scroll={false}
              className="group -mx-3 flex items-center gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-black/[0.03]"
            >
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md">
                {p.cover.image ? (
                  <Image
                    src={p.cover.image}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-contain"
                  />
                ) : (
                  <span
                    className="absolute inset-0"
                    style={{ background: p.cover.background }}
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-sans text-[15px] font-medium tracking-tight text-[color:var(--foreground)]">
                    {p.title}
                  </span>
                  <span className="shrink-0 truncate font-mono text-[11px] uppercase tracking-widest text-[color:var(--muted)]">
                    {company?.name}
                  </span>
                </div>
                <p className="truncate font-sans text-[13px] text-[color:var(--muted)]">
                  {p.tagline}
                </p>
              </div>
              <span className="shrink-0 font-mono text-[12px] text-[color:var(--muted)]">
                {p.year}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Thumbnail grid, mirroring supply.openai.com's shape: 4 → 6 → 8 columns
 *  with a tight gap, breathing room from the inset within each cell. */
function GridView({ activeCompanyId }: { activeCompanyId: string | null }) {
  return (
    <ul className="grid grid-cols-4 gap-x-1 gap-y-8 lg:grid-cols-6 xl:grid-cols-8">
      {projects.map((p) => (
        <ProjectTile
          key={p.slug}
          project={p}
          dimmed={activeCompanyId !== null && p.companyId !== activeCompanyId}
        />
      ))}
    </ul>
  );
}

/** Deterministic angle in [-7°, -3°] ∪ [3°, 7°] for each tile, so each
 *  one rotates a different amount and direction on hover. */
function bounceAngle(slug: string): string {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) | 0;
  const sign = h & 1 ? 1 : -1;
  const mag = 3 + (Math.abs(h >> 1) % 5); // 3..7
  return `${sign * mag}deg`;
}

function ProjectTile({
  project,
  dimmed,
}: {
  project: Project;
  dimmed: boolean;
}) {
  return (
    <li>
      <Link
        href={`/projects/${project.slug}`}
        scroll={false}
        className="group block focus:outline-none"
        aria-label={project.title}
      >
        <div
          style={
            { "--bounce-rotate": bounceAngle(project.slug) } as React.CSSProperties
          }
          className={`relative flex aspect-square w-full items-center justify-center will-change-transform [transition:transform_350ms_cubic-bezier(0.34,1.45,0.64,1),opacity_400ms_ease-out] group-hover:-translate-y-1.5 group-hover:scale-[1.07] group-hover:rotate-[var(--bounce-rotate)] ${
            dimmed ? "opacity-25" : "opacity-100"
          }`}
        >
          {project.cover.image ? (
            // Image scales to ~68% of the cell, a bit larger than the color
            // blocks, since these product PNGs carry built-in transparent
            // padding (matching the look of supply.openai.com's photos).
            <div className="relative h-[68%] w-[68%]">
              <Image
                src={project.cover.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 15vw, (max-width: 1024px) 10vw, 7vw"
                className="object-contain"
              />
            </div>
          ) : (
            // Color tile: a 55% × 55% solid block centered in the cell with
            // a tiny mono cover label in the corner.
            <div className="relative h-[55%] w-[55%] overflow-hidden rounded-sm">
              <div
                className="absolute inset-0"
                style={{ background: project.cover.background }}
              />
              <span className="absolute inset-0 flex items-end justify-start p-1.5 text-[9px] tracking-tight text-white/95 mix-blend-screen">
                {project.cover.label}
              </span>
            </div>
          )}
        </div>
        <div
          className={`mt-2 h-5 text-center text-[13px] text-[color:var(--foreground)] transition-opacity duration-150 ${
            dimmed ? "opacity-0" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          {project.title}
        </div>
      </Link>
    </li>
  );
}
