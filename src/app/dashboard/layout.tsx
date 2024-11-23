"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

import { Navbar } from "@/components/dashboard/navbar";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (!session?.user) {
      push("/");
    }
  }, []);

  return (
    <div className="mx-auto min-h-screen w-full max-w-screen-md">
      <Navbar />
      <div className="py-6 md:px-6 px-4">{children}</div>
    </div>
  );
}
