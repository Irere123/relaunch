import { getProject } from "@/modules/actions";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [
    {
      tab: [], // for the root page
    },
  ];
}

export default async function ProjectPage(
  props: {
    params: Promise<{ slug: string; tab?: string[] }>;
  }
) {
  const params = await props.params;

  const {
    slug,
    tab
  } = params;

  const project = await getProject({ slug });

  if (!project) {
    notFound();
  }

  if (tab?.[0] === "team") {
    return (
      <div>
        <p>Team for project</p>
      </div>
    );
  }

  if (tab?.[0] === "reviews") {
    return (
      <div>
        <p>Project reviews</p>
      </div>
    );
  }

  return (
    <div>
      <p>Hello world</p>
    </div>
  );
}
