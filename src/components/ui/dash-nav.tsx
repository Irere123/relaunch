"use client";

import Image from "next/image";
import Link from "next/link";
import { FolderClosed, Plus, Star, Wrench } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";

export function DashNav() {
  return (
    <>
      {/* Side nav */}
      <div
        className={cn(
          "relative h-full w-[240px] max-w-full bg-neutral-100 transition-transform md:translate-x-0"
        )}
      >
        <div className="absolute overflow-hidden">
          <div
            className={cn(
              "pointer-events-none absolute -left-2/3 bottom-0 aspect-square w-[140%] translate-y-1/4 rounded-full opacity-15 blur-[75px]",
              "bg-[conic-gradient(from_32deg_at_center,#855AFC_0deg,#3A8BFD_72deg,#00FFF9_144deg,#5CFF80_198deg,#EAB308_261deg,#f00_360deg)]"
            )}
          />
        </div>
        <div className="flex items-center justify-between py-4 md:pb-10 w-full px-2 pr-4">
          <Link href="/" className="relative h-8 w-8">
            <Image
              fill
              src="/relaunch.svg"
              alt="ReLaunch logo"
              className="h-14 rounded-full"
            />
          </Link>
          <Link
            href={`/new`}
            className="h-7 w-7 hover:bg-neutral-200 p-1 flex justify-center items-center rounded transition-all"
          >
            <Plus className="h-8 cursor-pointer" />
          </Link>
        </div>
        <div className="md:flex flex-col text-neutral-600 hidden px-2">
          <SideNavItem
            href={`/dashboard`}
            icon={<FolderClosed className="h-5" />}
          >
            Projects
          </SideNavItem>
          <SideNavItem
            href={`/dashboard/feedback`}
            icon={<Star className="h-5" />}
          >
            Reviews
          </SideNavItem>
          <SideNavItem
            href={`/dashboard/console`}
            icon={<Wrench className="h-5" />}
          >
            Console
          </SideNavItem>
        </div>
        <div className="absolute bottom-0 py-2 w-full px-2">
          <Link href={"/"}>
            <Button className="w-full">All projects</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

const SideNavItem: React.FC<{
  children: React.ReactNode;
  icon: React.ReactNode;
  href: string;
}> = ({ children, icon, href }) => {
  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 hover:text-sky-500 hover:bg-sky-100 rounded-md p-2 text-sm`}
    >
      {icon}
      {children}
    </Link>
  );
};
