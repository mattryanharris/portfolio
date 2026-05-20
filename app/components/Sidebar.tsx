"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { companies } from "../data/portfolio";

/** Left sidebar — Matt Harris brand + contact at top, scrollable list of
 *  companies with role/dates underneath each, copyright pinned at the
 *  bottom. Clicking a company filters the catalog via `?c=<id>`; clicking
 *  the brand resets to all. */
export default function Sidebar() {
  const searchParams = useSearchParams();
  const active = searchParams.get("c");

  return (
    <aside className="fixed left-0 top-0 z-10 flex h-screen w-[220px] flex-col justify-between px-8 py-10">
      <div className="overflow-y-auto pr-2">
        <Link
          href="/"
          className="block font-sans text-[15px] font-semibold tracking-tight"
        >
          Matt Harris
        </Link>
        <p className="mt-1 text-[12px] leading-snug text-[color:var(--muted)]">
          Product, design, and engineering.
          <br />
          Pasadena, CA.
        </p>
        <div className="mt-2 flex gap-3 text-[12px] text-[color:var(--muted)]">
          <a
            href="mailto:matthew@biofare.org"
            className="hover:text-[color:var(--accent)]"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/mattryanharris"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[color:var(--accent)]"
          >
            LinkedIn
          </a>
        </div>

        <ul className="mt-12 space-y-5">
          <li>
            <Link
              href="/"
              className={`block text-[13px] ${
                active === null
                  ? "text-[color:var(--foreground)]"
                  : "text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
              }`}
            >
              All work
            </Link>
          </li>
          {companies.map((c) => {
            const isActive = active === c.id;
            return (
              <li key={c.id}>
                <Link
                  href={`/?c=${c.id}`}
                  className={`block text-[13px] leading-tight ${
                    isActive
                      ? "text-[color:var(--accent)]"
                      : "hover:text-[color:var(--foreground)]"
                  }`}
                >
                  <span
                    className={
                      isActive ? "" : "text-[color:var(--foreground)]"
                    }
                  >
                    {c.name}
                  </span>
                  <span className="block text-[11px] text-[color:var(--muted)]">
                    {c.role}
                  </span>
                  <span className="block text-[11px] text-[color:var(--muted)]">
                    {c.dates}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-8 shrink-0 text-[11px] text-[color:var(--muted)]">
        © {new Date().getFullYear()}
      </div>
    </aside>
  );
}
