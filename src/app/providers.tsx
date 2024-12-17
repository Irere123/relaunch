"use client";

import { SWRConfig } from "swr";
import React from "react";
import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/components/ui/toaster";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <SessionProvider>
        <Toaster />
        {children}
      </SessionProvider>
    </SWRConfig>
  );
};
