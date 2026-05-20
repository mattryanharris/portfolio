import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "../../data/projects";
import FavoritedTVStudy from "./_studies/favoritedtv";
import Placeholder from "./_studies/placeholder";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="font-sans">
      <div
        className="relative flex aspect-[16/6] w-full items-end overflow-hidden"
        style={{ background: project.cover.background }}
      >
        <span className="m-8 font-mono text-sm text-white/90">
          {project.cover.label}
        </span>
        <span className="absolute top-8 right-8 font-mono text-xs text-white/70">
          {project.year}
        </span>
      </div>

      <div className="mx-auto max-w-3xl px-8 py-12">
        <header className="mb-10 flex items-baseline justify-between gap-6 border-b border-[color:var(--border)] pb-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[color:var(--muted)]">
              {project.category}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              {project.title}
            </h1>
            <p className="mt-2 text-lg text-[color:var(--muted)]">
              {project.tagline}
            </p>
          </div>
          <Link
            href="/"
            className="hidden shrink-0 font-mono text-xs uppercase tracking-widest text-[color:var(--muted)] hover:text-[color:var(--accent)] sm:block"
          >
            ← back
          </Link>
        </header>

        {project.slug === "favoritedtv" ? (
          <FavoritedTVStudy />
        ) : (
          <Placeholder project={project} />
        )}
      </div>
    </article>
  );
}
