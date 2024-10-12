"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};
