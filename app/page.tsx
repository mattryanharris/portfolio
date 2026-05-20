import Image from "next/image";
import Link from "next/link";
import {
  projects,
  getCompany,
  type Project,
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
      {/* Header — shows context for the current filter, or none when viewing all */}
      <header className="mb-10 min-h-[60px]">
        {activeCompany ? (
          <>
            <p className="text-[11px] uppercase tracking-widest text-[color:var(--muted)]">
              {activeCompany.role} · {activeCompany.dates}
            </p>
            <h1 className="mt-1 font-sans text-3xl font-semibold tracking-tight">
              {activeCompany.name}
            </h1>
          </>
        ) : (
          <p className="text-[11px] uppercase tracking-widest text-[color:var(--muted)]">
            All work
          </p>
        )}
      </header>

      {/* One continuous grid of every project. Mirrors supply.openai.com's
          shape: 4 → 6 → 8 columns with a tight 4px gap. Breathing room
          around each tile comes from the inset within the cell, not from
          the gap between cells. */}
      <ul className="grid grid-cols-4 gap-x-1 gap-y-8 lg:grid-cols-6 xl:grid-cols-8">
        {projects.map((p) => (
          <ProjectTile
            key={p.slug}
            project={p}
            dimmed={
              activeCompanyId !== null && p.companyId !== activeCompanyId
            }
          />
        ))}
      </ul>
    </div>
  );
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
          className={`relative flex aspect-square w-full items-center justify-center transition-transform duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1 group-hover:scale-[1.06] group-hover:rotate-[3deg] ${
            dimmed ? "opacity-20 saturate-50" : "opacity-100"
          }`}
        >
          {project.cover.image ? (
            // Image scales to ~55% of the cell — matches the scale of
            // supply.openai.com's product photos (which have built-in
            // transparent padding inside the PNGs themselves).
            <div className="relative h-[55%] w-[55%]">
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
            // a tiny mono cover label in the corner. Matches the visual
            // weight of a product photo.
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
          className={`mt-2 h-4 text-center text-[11px] text-[color:var(--foreground)] transition-opacity duration-150 ${
            dimmed
              ? "opacity-0"
              : "opacity-0 group-hover:opacity-100"
          }`}
        >
          {project.title}
        </div>
      </Link>
    </li>
  );
}
