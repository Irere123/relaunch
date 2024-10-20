import { TrendingUp, Rss, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex gap-4 p-4 min-h-screen">
      <div className="flex flex-col items-center gap-4 border border-border px-4 py-2 h-full bg-muted rounded-md">
        <Link href="/" className="relative h-10 w-10">
          <Image
            fill
            src="/relaunch.svg"
            alt="ReLaunch logo"
            className="h-14 rounded-full"
          />
        </Link>
        <Link
          href={`/dashboard`}
          className="flex items-center gap-3 text-muted-foreground"
        >
          <TrendingUp className="h-5" />
          Analytics
        </Link>
        <Link href={`/dashboard/feedback`} className="flex items-center gap-3">
          <Rss className="h-5" />
          Feeback
        </Link>
        <Link href={`/dashboard/console`} className="flex items-center gap-3">
          <Wrench className="h-5" />
          Console
        </Link>
      </div>
      {children}
    </div>
  );
};
