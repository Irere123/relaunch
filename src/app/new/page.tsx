import { CreateProjectForm } from "./page.client";

export default async function NewProjectPage() {
  return (
    <div className="flex w-full min-h-screen justify-center items-center">
      <CreateProjectForm />
    </div>
  );
}
