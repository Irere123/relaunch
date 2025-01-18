"use client";

import { useContext, useState, useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import { MessageSquare, Search, Filter } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useDebounce } from "use-debounce";

import { DashboardContext } from "@/components/dashboard/dashboard-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PAGE_SIZE = 10;

export default function Reviews() {
  const { projects, selectedProjectIndex: idx } = useContext(DashboardContext);
  const currentProject = projects[idx];
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const { ref, inView } = useInView();

  const getKey = (pageIndex: number, previousPageData: any[]) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/api/projects/${currentProject?.id}/reviews?page=${pageIndex}&search=${debouncedSearch}`;
  };

  const { data, size, setSize, isLoading, mutate } = useSWRInfinite(
    getKey,
    async (url) => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
    {
      revalidateFirstPage: false,
      revalidateOnFocus: false,
    }
  );

  const reviews = data ? data.flat() : [];
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  useEffect(() => {
    if (inView && !isReachingEnd && !isLoading) {
      setSize(size + 1);
    }
  }, [inView, isReachingEnd]);

  if (!currentProject) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium">No Project Selected</p>
        <p className="text-gray-600 mt-1">
          Please select a project to view its reviews.
        </p>
      </div>
    );
  }

  if (isLoading && !data) {
    return <div className="h-96 w-full animate-pulse rounded-lg bg-gray-100" />;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Project Reviews</h1>
          <Badge variant="secondary" className="px-3 py-1">
            {reviews.length} Reviews
          </Badge>
        </div>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search reviews by content..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {!reviews || reviews.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium">No reviews yet</p>
            <p className="text-gray-600 mt-1 max-w-sm">
              Reviews for your project will appear here once users start
              providing feedback.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review: any) => (
            <Card
              key={review.id}
              className="overflow-hidden shadow-none rounded-sm"
            >
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={review.user?.image}
                      alt={review.user?.name}
                    />
                    <AvatarFallback>
                      {review.user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold truncate">
                          {review.user?.name}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {new Date(review.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 break-words">
                      {review.content}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {!isReachingEnd && (
            <div ref={ref} className="h-16 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
