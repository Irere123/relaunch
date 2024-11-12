import Link from "next/link";

import { cn } from "@/lib/utils";
import { Project } from "@/types";
import { EditTeamButton } from "./edit-team-button";

export function ProjectTeam({ project }: { project: Project }) {
  const { team } = project;

  return (
    <>
      <div className="absolute right-4 top-4">
        <EditTeamButton project={project} />
      </div>
      <div
        className={cn(
          "mx-auto grid max-w-md grid-cols-1 gap-4",
          team.length > 1 && "sm:grid-cols-2"
        )}
      >
        {team.map((user) => (
          <div key={user.id} className="flex items-center space-x-4">
            <Link href={`/u/${user.id}`} className="flex-none">
              <img
                src={user.image}
                alt="avatar"
                className="h-14 w-14 rounded-full"
              />
            </Link>
            <div className="flex flex-col space-y-0.5">
              <Link
                href={`/u/${user.id}`}
                className="font-medium text-gray-700 underline-offset-4 hover:underline"
              >
                {user.name}
              </Link>
              {/* <p className="text-sm text-gray-500">{user.}</p> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
