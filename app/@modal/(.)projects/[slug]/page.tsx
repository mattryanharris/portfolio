import { notFound } from "next/navigation";
import {
  getProject,
  getCompany,
  projects,
} from "../../../data/portfolio";
import { summaries } from "../../../data/summaries";
import FavoritedTVStudy from "../../../projects/[slug]/_studies/favoritedtv";
import RexStudy from "../../../projects/[slug]/_studies/rex";
import ProjectModal from "../../_components/ProjectModal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function InterceptedProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const company = getCompany(project.companyId);

  return (
    <ProjectModal project={project} companyName={company?.name}>
      {project.slug === "favoritedtv" ? (
        <FavoritedTVStudy />
      ) : project.slug === "rex-radcliffe" ? (
        <RexStudy />
      ) : (
        summaries[project.slug] ?? (
          <p className="leading-7 text-[#222]">{project.tagline}</p>
        )
      )}
    </ProjectModal>
  );
}
