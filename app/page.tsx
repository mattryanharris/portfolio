import Link from "next/link";
import {
  companies,
  projects,
  getCompany,
  projectsForCompany,
} from "./data/portfolio";

type Props = {
  searchParams?: Promise<{ c?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const params = (await searchParams) ?? {};
  const activeCompanyId = params.c ?? null;
  const activeCompany = activeCompanyId ? getCompany(activeCompanyId) : null;

  return (
    <div className="px-12 py-12">
      {activeCompany ? (
        // Filtered view: just this company's projects, with a header.
        <section>
          <header className="mb-8">
            <p className="text-[11px] uppercase tracking-widest text-[color:var(--muted)]">
              {activeCompany.role} · {activeCompany.dates}
            </p>
            <h1 className="mt-2 font-sans text-3xl font-semibold tracking-tight">
              {activeCompany.name}
            </h1>
            {activeCompany.location && (
              <p className="mt-1 text-[12px] text-[color:var(--muted)]">
                {activeCompany.location}
              </p>
            )}
          </header>
          <ProjectGrid items={projectsForCompany(activeCompany.id)} />
        </section>
      ) : (
        // Default view: every company as a section header, projects below.
        <div className="space-y-14">
          {companies.map((c) => {
            const items = projectsForCompany(c.id);
            if (items.length === 0) return null;
            return (
              <section key={c.id}>
                <header className="mb-5 flex items-baseline justify-between">
                  <h2 className="font-sans text-[15px] font-semibold tracking-tight">
                    <Link
                      href={`/?c=${c.id}`}
                      className="hover:text-[color:var(--accent)]"
                    >
                      {c.name}
                    </Link>
                  </h2>
                  <p className="text-[11px] text-[color:var(--muted)]">
                    {c.role} · {c.dates}
                  </p>
                </header>
                <ProjectGrid items={items} />
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

import type { Project } from "./data/portfolio";

function ProjectGrid({ items }: { items: Project[] }) {
  return (
    <ul className="grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
      {items.map((p) => (
        <li key={p.slug}>
          <Link
            href={`/projects/${p.slug}`}
            scroll={false}
            className="group block focus:outline-none"
            aria-label={p.title}
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-sm transition-transform duration-200 group-hover:-translate-y-1">
              <div
                className="absolute inset-0"
                style={{ background: p.cover.background }}
              />
              <span className="absolute inset-0 flex items-end justify-start p-3 text-[11px] tracking-tight text-white/95 mix-blend-screen">
                {p.cover.label}
              </span>
            </div>
            <div className="mt-2 h-4 text-center text-[11px] text-[color:var(--foreground)] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              {p.title}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
