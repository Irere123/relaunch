import { getUserProjects } from "@/modules/actions/get-user-projects";
import { auth } from "@/modules/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const projects = await getUserProjects({ userId: session?.user?.id! });

  return (
    <div>
      <p>Hello dashboard</p>
      {projects!.length < 1 ? (
        <div>
          <p>You don't have project showcased yet.</p>
          <p>Create one</p>
        </div>
      ) : (
        projects?.map((p) => <p key={p.id}>{p.name}</p>)
      )}
    </div>
  );
}
