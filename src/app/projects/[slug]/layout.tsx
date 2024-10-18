import { getProject } from "@/modules/actions";
import { Globe, Star } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { MainLayout } from "@/components/layouts/MainLayout";
import { buttonLinkVariants } from "@/components/ui/button-link";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { cn, constructMetadata, nFormatter } from "@/lib/utils";

export const revalidate = 43200;

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const project = await getProject({ slug });

  if (!project) {
    return;
  }

  return constructMetadata({
    title: ` ${project.name} | Relaunch`,
    description: `View ${project.name} on Relaunch. ${project.description}`,
  });
}

export async function generateStaticParams() {
  const projectsArr = await db.select().from(projects).limit(150);

  return projectsArr.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectLayout({
  params: { slug },
  children,
}: {
  params: { slug: string };
  children: React.ReactNode;
}) {
  const project = await getProject({ slug });

  if (!project) {
    notFound();
  }

  return (
    <MainLayout>
      <div
        className={cn(
          "relative aspect-[4/1] w-full rounded-t-2xl bg-gradient-to-tr",
          project.gradient
        )}
      ></div>
      <div className="relative -mt-8 flex items-center justify-between px-4 sm:-mt-12 sm:items-end md:pr-0">
        <Image
          src={"/relaunch.svg"}
          alt={""}
          width={100}
          height={100}
          className="h-16 w-16 rounded-full bg-white p-2 sm:h-24 sm:w-24"
        />
        <div className="flex items-center space-x-2 py-2">
          <Suspense>
            <button>Edit project</button>
          </Suspense>
          <a
            href={""}
            target="_blank"
            className={buttonLinkVariants({ variant: "secondary" })}
          >
            <Star className="h-4 w-4" />
            <p className="text-sm">{nFormatter(2342, { full: true })}</p>
          </a>
        </div>
      </div>
      <div className="max-w-lg p-4 pb-0">
        <div className="flex items-center space-x-2">
          <h1 className="font-display text-3xl font-bold">{}</h1>
        </div>
        <p className="mt-2 text-gray-500">{}</p>
      </div>
      {/* <ProjectLayoutTabs /> */}

      <div className="relative mx-4 flex min-h-[22rem] items-center justify-center rounded-xl border border-gray-200 bg-white p-4">
        {children}
      </div>
    </MainLayout>
  );
}
