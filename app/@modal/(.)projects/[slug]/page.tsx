import { notFound } from "next/navigation";
import { getProject, projects } from "../../../data/projects";
import FavoritedTVStudy from "../../../projects/[slug]/_studies/favoritedtv";
import Placeholder from "../../../projects/[slug]/_studies/placeholder";
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

  return (
    <ProjectModal project={project}>
      {project.slug === "favoritedtv" ? (
        <FavoritedTVStudy />
      ) : (
        <Placeholder project={project} />
      )}
    </ProjectModal>
  );
}
