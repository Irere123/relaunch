import { getProject } from "@/modules/actions";
import { notFound } from "next/navigation";

export default async function ProjectPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const project = await getProject({ slug });

  if (!project) {
    notFound();
  }

  return (
    <div>
      <p>{project.name}</p>
      <p>{project.description}</p>
    </div>
  );
}
