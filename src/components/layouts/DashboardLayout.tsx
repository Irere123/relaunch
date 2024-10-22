import React from "react";
import { DashNav } from "../ui/dash-nav";

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_minmax(0,1fr)] bg-neutral-100 overflow-y-hidden">
      <DashNav />
      <div className="px-4 py-4 border border-border bg-white mt-4 rounded-tl-2xl sm:h-full">
        {children}
      </div>
    </div>
  );
};
