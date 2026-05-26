import { getCompany } from "./data/portfolio";
import Catalog from "./components/Catalog";

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
            <p className="text-[12px] uppercase tracking-widest text-[color:var(--muted)]">
              {activeCompany.role} · {activeCompany.dates}
            </p>
            <h1 className="mt-1 font-sans text-3xl font-semibold tracking-tight">
              {activeCompany.name}
            </h1>
          </>
        ) : (
          <p className="text-[12px] uppercase tracking-widest text-[color:var(--muted)]">
            All work
          </p>
        )}
      </header>

      <Catalog activeCompanyId={activeCompanyId} />
    </div>
  );
}
