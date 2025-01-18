"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import useSWRInfinite from "swr/infinite";
import { useInView } from "react-intersection-observer";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDownUp, MoreHorizontal } from "lucide-react";
import { createReview } from "@/modules/actions/create-review";
import { createReviewSchema, FormResponse } from "@/modules/actions/utils";
import { toast } from "@/hooks/use-toast";
import { ProjectReview } from "@/types";

const PAGE_SIZE = 10;

export function ProjectReviewsSection({
  slug,
  projectId,
}: {
  slug: string;
  projectId: string;
}) {
  const { data: session } = useSession();
  const { ref, inView } = useInView();

  const getKey = (pageIndex: number, previousPageData: any[]) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/api/projects/${projectId}/reviews?page=${pageIndex}`;
  };

  const {
    data,
    size,
    setSize,
    mutate: mutateReviews,
  } = useSWRInfinite(
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

  const {
    register,
    reset,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof createReviewSchema>>({
    resolver: zodResolver(createReviewSchema),
  });

  const [state, formAction] = useFormState<FormResponse, FormData>(
    createReview,
    null as any
  );

  useEffect(() => {
    if (!state) return;

    if (state.status === "error") {
      state.errors?.forEach((error) => {
        setError(error.path as any, {
          message: error.message,
        });
      });
      return;
    }

    if (state.status === "success") {
      // Optimistically update the UI with the returned review data
      const optimisticReview: ProjectReview = {
        ...state.data,
        user: {
          id: session?.user?.id!,
          name: session?.user?.name ?? null,
          image: session?.user?.image ?? null,
          emailVerified: null,
        },
      };

      mutateReviews((pages) => {
        const newPages = [...(pages || [])];
        if (newPages[0]) {
          newPages[0] = [optimisticReview, ...newPages[0]];
        } else {
          newPages[0] = [optimisticReview];
        }
        return newPages;
      }, false);

      reset();
      toast({ description: state.message });
    }
  }, [state]);

  useEffect(() => {
    if (inView && !isReachingEnd) {
      setSize(size + 1);
    }
  }, [inView, isReachingEnd]);

  if (!reviews) {
    return (
      <div className="w-full">
        <div className="p-6">
          <div className="space-y-6">
            {/* Comment Form Skeleton */}
            <div className="space-y-4">
              <div className="h-[100px] bg-gray-100 animate-pulse rounded-md" />
              <div className="flex justify-between items-center">
                <div className="w-20 h-9 bg-gray-100 animate-pulse rounded-md" />
              </div>
            </div>

            {/* Comments Header Skeleton */}
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <div className="h-7 w-24 bg-gray-100 animate-pulse rounded-md" />
                <div className="h-6 w-8 bg-gray-100 animate-pulse rounded-full" />
              </div>
              <div className="h-9 w-32 bg-gray-100 animate-pulse rounded-md" />
            </div>

            {/* Comments List Skeleton */}
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-gray-100 animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-32 bg-gray-100 animate-pulse rounded-md" />
                          <div className="h-5 w-24 bg-gray-100 animate-pulse rounded-md" />
                        </div>
                        <div className="h-8 w-8 bg-gray-100 animate-pulse rounded-md" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-100 animate-pulse rounded-md" />
                        <div className="h-4 bg-gray-100 animate-pulse rounded-md w-3/4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="p-6">
        <div className="space-y-6">
          {session?.user && (
            <form action={formAction} className="space-y-4">
              <Textarea
                {...register("content")}
                placeholder="Add comment..."
                className="min-h-[100px] resize-none"
              />
              {errors.content && (
                <p className="text-sm text-red-500">{errors.content.message}</p>
              )}
              <input
                type="hidden"
                {...register("projectId")}
                value={projectId}
              />
              <input
                type="hidden"
                {...register("userId")}
                value={session.user.id}
              />

              <div className="flex justify-between items-center">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          )}

          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Comments</h2>
              <div className="rounded-full bg-gray-100 px-2.5 py-0.5 text-sm text-gray-600">
                {reviews.length}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowDownUp className="h-4 w-4" />
                  Most recent
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>

          <div className="space-y-6">
            {reviews.map((comment) => (
              <div key={comment.id} className="space-y-4">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={comment.user?.image as any}
                        alt={comment.user?.name as any}
                      />
                      <AvatarFallback>
                        {comment.user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            {comment.user?.name}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            {new Date(comment.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {!isReachingEnd && (
              <div ref={ref} className="h-8 w-full">
                <div className="h-8 w-8 mx-auto animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
