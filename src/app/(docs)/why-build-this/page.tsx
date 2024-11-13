import { ChevronLeft } from "lucide-react";
import { WhyBuildThisPageClient } from "./page.client";
import Link from "next/link";

export const metadata = {
  title: "Why Build This?",
};

export default function WhyBuildThisPage() {
  return (
    <>
      <Link href="/" className="flex items-center p-4">
        <ChevronLeft />
        <span className="ml-2">Go home</span>
      </Link>
      <WhyBuildThisPageClient />
    </>
  );
}
