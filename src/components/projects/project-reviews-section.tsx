"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowDownUp, MoreHorizontal } from "lucide-react";
import { createReview } from "@/modules/actions/create-review";
import { createReviewSchema, FormResponse } from "@/modules/actions/utils";
import { toast } from "@/hooks/use-toast";
import { ProjectReview } from "@/types";
import { revalidateProject } from "@/modules/actions/revalidate-project";

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  replies?: Comment[];
}

export function ProjectReviewsSection({
  slug,
  projectId,
  reviews,
}: {
  slug: string;
  projectId: string;
  reviews: ProjectReview[];
}) {
  const [projectReviews] = useState<ProjectReview[]>([...reviews]);
  const { data } = useSession();

  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<z.infer<typeof createReviewSchema>>({
    resolver: zodResolver(createReviewSchema),
  });

  const [state, formAction] = useFormState<FormResponse, FormData>(
    createReview,
    null as any
  );

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.status === "error") {
      state.errors?.forEach((error) => {
        setError(error.path as keyof typeof errors, {
          message: error.message,
        });
      });
    }

    if (state.status === "success") {
      toast({ description: state.message });
      revalidateProject(slug);
    }
  }, [state]);

  return (
    <div className="w-full">
      <div className="p-6">
        <div className="space-y-6">
          {data?.user && (
            <form action={formAction} className="space-y-4">
              <Textarea
                {...register("content")}
                placeholder="Add comment..."
                className="min-h-[100px] resize-none"
              />
              <input
                {...register("projectId")}
                type="hidden"
                value={projectId}
                readOnly
              />
              <input
                {...register("userId")}
                type="hidden"
                value={data.user.id}
                readOnly
              />

              <div className="flex justify-between items-center">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          )}

          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Comments</h2>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowDownUp className="h-4 w-4" />
                  Most recent
                </Button>
              </DropdownMenuTrigger>
              {/* <DropdownMenuContent align="end">
                <DropdownMenuItem>Most recent</DropdownMenuItem>
                <DropdownMenuItem>Most liked</DropdownMenuItem>
                <DropdownMenuItem>Oldest first</DropdownMenuItem>
              </DropdownMenuContent> */}
            </DropdownMenu>
          </div>

          <div className="space-y-6">
            {projectReviews.map((comment) => (
              <div key={comment.id} className="space-y-4">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={comment.user.image!}
                        alt={comment.user.name!}
                      />
                      <AvatarFallback>
                        {comment.user.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            {comment.user.name}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            {comment.createdAt}
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
          </div>
        </div>
      </div>
    </div>
  );
}
