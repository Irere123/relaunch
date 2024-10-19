import { Testimonials } from "@/components/home/Testimonials";
import { BookOpen } from "@/components/icons";
import { MainLayout } from "@/components/layouts/MainLayout";
import ProjectsList from "@/components/projects/projects-list";
import SearchBar, { SearchBarPlaceholder } from "@/components/ui/search-bar";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <MainLayout>
      <div className="relative z-10 mx-auto w-full max-w-xl px-5 py-10 xl:px-0">
        <Link
          href={`/why-build-this`}
          className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-gray-100 px-7 py-2 transition-colors hover:bg-gray-50"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          <BookOpen className="text-sm h-5 w-5 text-gray-600" />
          <p className="text-sm font-semibold text-gray-600">
            Why we built ReLaunch?
          </p>
        </Link>
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center  text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-6xl md:leading-[1.1]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          Showcasing ideas to the public!
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Share your work and connect with a global audience in a space designed
          to reflect your unique style.
        </p>
        <div
          className="mx-auto mt-10 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <Suspense fallback={<SearchBarPlaceholder />}>
            <SearchBar />
          </Suspense>
        </div>
      </div>

      <div
        className="animate-fade-up opacity-0 mx-auto"
        style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
      >
        <div className="mx-5 md:mx-0">
          <div className="grid gap-4 w-full">
            <Testimonials />
          </div>

          <div className="grid gap-4">
            <h2 className="font-medium text-center text-4xl">All projects</h2>
            <ProjectsList />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
