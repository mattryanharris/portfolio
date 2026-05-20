import Link from "next/link";
import { projects } from "./data/projects";

export default function Home() {
  return (
    <div className="px-12 py-10">
      {/* Dense grid of project "products" — isolated marks on neutral bg,
          no card chrome. Title shows on hover, matching the supply.openai.com
          catalog vibe. */}
      <ul className="grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              scroll={false}
              className="group block focus:outline-none"
              aria-label={p.title}
            >
              {/* Project "mark" — a chunky colored square with the cover label */}
              <div className="relative aspect-square w-full overflow-hidden rounded-sm transition-transform duration-200 group-hover:-translate-y-1">
                <div
                  className="absolute inset-0"
                  style={{ background: p.cover.background }}
                />
                <span className="absolute inset-0 flex items-end justify-start p-3 text-[11px] tracking-tight text-white/95 mix-blend-screen">
                  {p.cover.label}
                </span>
              </div>
              {/* Title appears on hover */}
              <div className="mt-2 h-4 text-center text-[11px] text-[color:var(--foreground)] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                {p.title}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
