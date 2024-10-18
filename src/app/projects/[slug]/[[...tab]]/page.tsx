import { getProject } from "@/modules/actions";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [
    {
      tab: [], // for the root page
    },
  ];
}

export default async function ProjectPage({
  params: { slug, tab },
}: {
  params: { slug: string; tab: string };
}) {
  const project = await getProject({ slug });

  if (!project) {
    notFound();
  }

  return (
    <div>
      <p>Hello world</p>
    </div>
  );
}
