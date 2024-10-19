import { Session } from "next-auth";
import { Suspense } from "react";

import Navbar from "./navbar";
import { getRepo } from "@/lib/github";
import { auth } from "@/modules/auth";

export default function Nav() {
  return (
    <Suspense>
      <NavRSC />
    </Suspense>
  );
}

async function NavRSC() {
  const [session, { stars }] = (await Promise.all([
    auth(),
    getRepo("https://github.com/irere123/relaunch-v2"),
  ])) as [Session, { stars: number }];

  return <Navbar session={session} stars={stars} />;
}
