import Link from "next/link";

export function EmptyProjects() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center space-y-4">
      <div className="text-4xl">📋</div>
      <h2 className="text-2xl font-semibold text-gray-800">
        No Active Projects
      </h2>
      <p className="text-gray-600 max-w-md">
        You don&apos;t have any active projects at the moment. Create your first
        project to get started.
      </p>
      <Link
        href="/new"
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Create Project
      </Link>
    </div>
  );
}
