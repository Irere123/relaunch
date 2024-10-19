"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Link2 } from "lucide-react";
import { Command } from "cmdk";

import { Project } from "@/db/schema";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "../icons";

export default function SearchBar() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Project[]>([]);

  const searchParams = useSearchParams();
  const q = searchParams?.get("q") || "";

  function search(query: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }

    window.history.replaceState(null, "", `?${params.toString()}`);
  }

  const [debouncedQuery] = useDebounce(q, 150);

  useEffect(() => {
    const abortController = new AbortController();

    if (!debouncedQuery) return setItems([]);
    const fetchResults = async (q: string) => {
      try {
        setLoading(true);
        const results = await fetch(`/api/search?query=${q}`).then((resp) =>
          resp.json()
        );

        setItems(results.items as Project[]);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchResults(debouncedQuery);

    return () => {
      abortController.abort();
    };
  }, [debouncedQuery]);

  const router = useRouter();

  return (
    <Command
      className="peer relative w-full max-w-md"
      loop
      shouldFilter={false}
    >
      <div className="absolute inset-y-0 left-3 text-gray-400 mt-3">
        {loading ? (
          <LoadingSpinner className="h-4" />
        ) : (
          <Link2 className="h-4" />
        )}
      </div>
      <Command.Input
        name="query"
        id="query"
        className="block w-full rounded-md border border-gray-300 h-10 pl-10 text-sm text-gray-900 placeholder-gray-400 shadow-md focus:border-gray-500 focus:outline-none focus:ring-gray-500"
        placeholder="Search for a project"
        value={q}
        onValueChange={search}
      />
      <Command.List
        className={cn(
          "absolute z-10 mt-2 h-[calc(var(--cmdk-list-height)+17px)] max-h-[300px] w-full overflow-auto rounded-md border border-gray-200 bg-white p-2 shadow-md transition-all duration-75",
          {
            hidden: items.length === 0,
          }
        )}
      >
        {items.map((item) => (
          <Command.Item
            key={item.id}
            value={item.name}
            onSelect={() => {
              router.push(`/projects/${item.slug}`);
            }}
            className="group flex cursor-pointer items-center justify-between rounded-md px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 aria-disabled:opacity-75 aria-disabled:bg-white aria-selected:text-gray-900"
          >
            <div className="flex flex-col space-y-0.5">
              <p>{item.name}</p>
            </div>
          </Command.Item>
        ))}
      </Command.List>
    </Command>
  );
}

export function SearchBarPlaceholder() {
  return (
    <div className="peer relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 mt-3 text-gray-400">
        <Link2 className="h-4" />
      </div>
      <input
        name="query"
        id="query"
        className="block w-full rounded-md border-gray-200 pt-10 text-sm text-gray-900 placeholder-gray-400 shadow-lg focus:border-gray-500 focus:outline-none foucs:ring-gray-500"
        disabled
        aria-invalid="true"
      />
    </div>
  );
}
