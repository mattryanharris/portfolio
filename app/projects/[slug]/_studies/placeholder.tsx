import type { Project } from "../../../data/projects";

export default function Placeholder({ project }: { project: Project }) {
  return (
    <div className="prose max-w-none">
      <p className="leading-7 text-[#222]">
        Case study coming soon. {project.tagline}
      </p>
      <p className="mt-4 text-sm text-[color:var(--muted)]">
        If you want the working notes before this page is finished, drop me a
        line and I'll send them over.
      </p>
    </div>
  );
}
