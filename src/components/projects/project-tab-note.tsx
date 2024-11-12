import { Info } from "lucide-react";

export default function ProjectTabNote({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center space-x-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
      <Info className="h-5 w-5 text-blue-500" />
      {children}
    </div>
  );
}
