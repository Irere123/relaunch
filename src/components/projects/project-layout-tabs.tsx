"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { PROJECT_TABS } from "@/lib/constants";

export default function ProjectLayoutTabs() {
  const { slug, tab } = useParams() as { slug: string; tab?: string[] };

  return (
    <div className="my-4 flex flex-col space-y-6 p-4">
      <div className="flex max-w-fit items-center rounded-full bg-gray-100">
        <TabLink
          title="Analytics"
          href={`/projects/${slug}`}
          active={!tab || tab.length === 0}
        />
        {PROJECT_TABS.map((t) => (
          <TabLink
            key={t.tab}
            title={t.title}
            href={`/projects/${slug}/${t.tab}`}
            active={tab && tab[0] === t.tab}
          />
        ))}
      </div>
    </div>
  );
}

export const TabLink = ({
  title,
  href,
  active,
}: {
  title: string;
  href: string;
  active?: boolean;
}) => {
  return (
    <Link href={href} className="relative z-10">
      <div
        className={cn(
          "rounded-full px-4 py-1.5 text-sm font-medium text-gray-800 transition-all",
          active ? "text-white" : "hover:text-gray-500",
        )}
      >
        {title}
      </div>
      {active && (
        <motion.div
          layoutId="indicator"
          className="absolute left-0 top-0 h-full w-full rounded-full bg-black"
          style={{ zIndex: -1 }}
        />
      )}
    </Link>
  );
};
