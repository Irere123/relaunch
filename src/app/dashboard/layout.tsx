import React from "react";

import { Navbar } from "@/components/dashboard/navbar";
import { auth } from "@/modules/auth";
import { redirect } from "next/navigation";
import { getUserProjects } from "@/modules/actions/get-user-projects";
import { DashboardProvider } from "@/components/dashboard/dashboard-provider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const projects = await getUserProjects({
    userId: session?.user.id as string,
  });

  return (
    <DashboardProvider projects={projects}>
      <div className="mx-auto min-h-screen w-full max-w-screen-md">
        <Navbar />
        {projects.length > 0 ? (
          <div className="py-6 md:px-6 px-4">{children}</div>
        ) : null}
      </div>
    </DashboardProvider>
  );
}
