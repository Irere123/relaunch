import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";

import { Project } from "@/db/schema";
import { cn, nFormatter } from "@/lib/utils";
import { buttonLinkVariants } from "../ui/button-link";

export default function ProjectCard(project: Project) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-transform will-change-transform hover:-translate-y-0.5 hover:shadow-xl"
    >
      <div
        className={cn(
          "aspect-[5/2] w-full rounded-t-xl bg-gradient-to-tr",
          project.gradient
        )}
      ></div>
      <div className="-mt-8 flex items-center justify-between px-2">
        <Image
          src={project.logo || "/relaunch.svg"}
          alt={project.name!}
          width={100}
          height={100}
          className="h-16 w-16 rounded-full bg-white p-2"
        />
        <div className={buttonLinkVariants({ variant: "secondary" })}>
          <Eye className="h-4 w-4" />
          <p className="text-sm">
            {nFormatter(project.clicks as number, { full: true })}
          </p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-1">
          <h2 className="font-display text-xl font-semibold">{project.name}</h2>
        </div>
        <p className="mt-2 line-clamp-3 text-sm text-gray-500">
          {project.description}
        </p>
      </div>
    </Link>
  );
}
