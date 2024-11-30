"use client";

import React, { useEffect } from "react";

export const EdgeAnalytics: React.FC<{ projectId: string; slug: string }> = ({
  projectId,
  slug,
}) => {
  useEffect(() => {
    navigator.sendBeacon("/api/page-view", JSON.stringify({ slug, projectId }));
  }, []);
  return null;
};
