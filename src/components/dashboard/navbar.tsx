"use client";

import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import { BarChart, Home, MessageSquareDot, Plus } from "lucide-react";

import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";

export const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const { push } = useRouter();

  return (
    <header className="flex items-center h-16 px-4 shrink-0 md:px-6">
      <Link
        href={`/u/${session?.user?.id}`}
        className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4"
      >
        <Avatar>
          <AvatarImage src={session?.user?.image as string} />
        </Avatar>
      </Link>
      <nav className="flex flex-row items-center gap-4 lg:gap-6">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="sr-only">Dashboard</span>
        </Link>
        <Link
          href="/dashboard"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <BarChart className="w-5 h-5" />
          <span className="sr-only">Projects</span>
        </Link>
        <Link
          href="/dashboard/reviews"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <MessageSquareDot className="w-5 h-5" />
          <span className="sr-only">Reviews</span>
        </Link>
      </nav>
      <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <Button
          variant="outline"
          className="ml-auto"
          onClick={() => push("/new")}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>
    </header>
  );
};
