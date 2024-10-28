"use client";

import { Toaster } from "@/components/ui/toaster";
import React from "react";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};
