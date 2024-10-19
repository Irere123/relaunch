"use client";

import Link from "next/link";
import Image from "next/image";

import { useScroll } from "../hooks/use-scroll";
import { Button, buttonVariants } from "./ui/button";
import { cn, nFormatter } from "../lib/utils";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Dashboard, Sparkles } from "./icons";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

export default function Navbar({
  session,
  stars,
}: {
  session: Session | null;
  stars: number;
}) {
  const scrolled = useScroll(50);

  const { push } = useRouter();

  return (
    <div
      className={`fixed top-0 flex w-full justify-center ${
        scrolled
          ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
          : "bg-white/0"
      } z-30 transition-all`}
    >
      <div className="mx-5 flex h-16 w-full max-w-screen-lg items-center justify-between">
        <Link href="/" className="relative h-28 w-28">
          <Image
            fill
            src="/logomark.svg"
            alt="ReLaunch logo"
            className="h-14"
          />
        </Link>
        <div className="flex items-center space-x-2">
          <a
            href="https://github.com/irere123/relaunch-v2"
            target="_blank"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "px-3 py-1.5"
            )}
          >
            <Sparkles className="w-4 h-4" />
            <p className="text-sm ml-2">{nFormatter(stars, { full: true })}</p>
          </a>
          {session?.user ? (
            <>
              <Link
                href={`/dashboard`}
                className="flex justify-center items-center h-10 w-10 bg-muted rounded-full"
              >
                <Dashboard />
              </Link>
              <Link href={`/profile`}>
                <Avatar>
                  <AvatarImage src={session.user.image!} />
                </Avatar>
              </Link>
            </>
          ) : (
            <Button onClick={async () => push("/auth/sign-in")}>Submit</Button>
          )}
        </div>
      </div>
    </div>
  );
}
