import { Testimonials } from "@/components/home/Testimonials";
import { BookOpen } from "@/components/icons";
import { MainLayout } from "@/components/layouts/MainLayout";
import Link from "next/link";

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
          A plaform to showcase your projects on the internet.
        </p>
      </div>
      <div
        className="animate-fade-up opacity-0 mx-auto"
        style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
      >
        <div className="mx-5 md:mx-0">
          <div className="grid gap-4 w-full">
            <Testimonials />
          </div>

          <div className="mb-8 mt-12 border-t border-gray-200" />

          <div className="grid gap-4">
            <h2 className="font-display text-2xl">All Projects</h2>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
