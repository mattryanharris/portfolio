import Link from "next/link";
import { projects } from "./data/projects";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <section className="mb-16 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Software & design at the edges of consumer products.
        </h1>
        <p className="mt-4 text-lg text-[color:var(--muted)]">
          Solo builds, mostly. Apple TV apps, iOS, small Next.js services that
          make a stubborn workflow disappear.
        </p>
      </section>

      <section>
        <header className="mb-6 flex items-baseline justify-between font-mono text-xs uppercase tracking-widest text-[color:var(--muted)]">
          <span>Selected work</span>
          <span>{projects.length} projects</span>
        </header>

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[color:var(--border)] bg-[color:var(--border)] sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <li key={p.slug} className="bg-white">
              <Link
                href={`/projects/${p.slug}`}
                className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
              >
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden"
                  style={{ background: p.cover.background }}
                >
                  <span className="absolute bottom-4 left-4 font-mono text-xs text-white/90 mix-blend-screen">
                    {p.cover.label}
                  </span>
                  <span className="absolute top-4 right-4 font-mono text-xs text-white/70">
                    {p.year}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4 p-5">
                  <div>
                    <h2 className="text-base font-medium tracking-tight group-hover:text-[color:var(--accent)]">
                      {p.title}
                    </h2>
                    <p className="mt-1 text-sm text-[color:var(--muted)]">
                      {p.tagline}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-[color:var(--muted)]">
                    {p.category}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
