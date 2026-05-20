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

      {/* One continuous grid of every project. Tiles outside the active filter
          dim back; click any tile (dim or not) to open its case study. */}
      <ul className="grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
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
          className={`relative aspect-square w-full overflow-hidden rounded-sm transition-transform duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-2 group-hover:scale-[1.06] group-hover:rotate-[4deg] ${
            dimmed ? "opacity-20 saturate-50" : "opacity-100"
          }`}
        >
          {project.cover.image ? (
            // Image tile: photo centered with breathing room, no colored
            // backdrop. The image floats on the page bg directly.
            <Image
              src={project.cover.image}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 14vw"
              className="object-contain p-8"
            />
          ) : (
            // Solid-color tile with a mono cover label.
            <>
              <div
                className="absolute inset-0"
                style={{ background: project.cover.background }}
              />
              <span className="absolute inset-0 flex items-end justify-start p-3 text-[11px] tracking-tight text-white/95 mix-blend-screen">
                {project.cover.label}
              </span>
            </>
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
