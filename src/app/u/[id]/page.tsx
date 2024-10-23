import Image from "next/image";
import { redirect } from "next/navigation";

import { constructMetadata } from "@/lib/utils";
import { getUserProfile } from "@/modules/user/get-user";
import { MainLayout } from "@/components/layouts/MainLayout";
import { getUserProjects } from "@/modules/actions/get-user-projects";
import { ProjectsGrid } from "@/components/projects/projects-grid";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const user = await getUserProfile(id);

  if (!user) return;

  return constructMetadata({
    title: `${user.name} | Relaunch`,
    description: `Checkout ${user.name} Projects on Relaunch and give him feedback and support.`,
    image: user.image,
  });
}

export default async function ProfilePage({ params }: Props) {
  const { id } = await params;
  const user = await getUserProfile(id);
  const projects = await getUserProjects({ userId: id });

  if (!user) {
    redirect("/");
  }

  return (
    <MainLayout>
      <div
        className={
          "relative aspect-[4/1] w-full rounded-t-2xl border-t border-border bg-gradient-to-tr mt-6 from-yellow-50 via-indigo-50 to-green-50"
        }
      />
      <div className="relative -mt-8 flex items-center justify-between px-4 sm:-mt-12 sm:items-end md:pr-0">
        <Image
          src={user.image!}
          alt={user.name!}
          width={100}
          height={100}
          className="h-16 w-16 rounded-full bg-white p-2 sm:h-24 sm:w-24"
        />
      </div>

      <div className="relative mx-4 flex flex-col min-h-[22rem] bg-white p-4">
        <h2 className="font-medium text-lg">Gallery</h2>
        <div className="py-10">
          <ProjectsGrid projects={projects} />
        </div>
      </div>
    </MainLayout>
  );
}
