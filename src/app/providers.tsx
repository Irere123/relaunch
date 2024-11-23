"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/components/ui/toaster";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SessionProvider>
      <Toaster />
      {children}
    </SessionProvider>
  );
};
