"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDownUp,
  AtSign,
  Bold,
  Image,
  Italic,
  Link2,
  MoreHorizontal,
  ThumbsDown,
  ThumbsUp,
  Underline,
} from "lucide-react";
import { useState } from "react";

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

export function ProjectReviewsSection() {
  const [comments] = useState<Comment[]>([
    {
      id: 1,
      author: "Noah Pierre",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "I'm a bit unclear about how condensation forms in the water cycle. Can someone break it down?",
      timestamp: "58 minutes ago",
      likes: 25,
      dislikes: 3,
      replies: [
        {
          id: 2,
          author: "Skill Sprout",
          avatar: "/placeholder.svg?height=40&width=40",
          content:
            "Condensation happens when water vapor cools down and changes back into liquid droplets. It's the step before precipitation. The example with the glass of ice water in the video was a great visual!",
          timestamp: "8 minutes ago",
          likes: 2,
          dislikes: 0,
        },
      ],
    },
    {
      id: 3,
      author: "Mollie Hall",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "I really enjoyed today's lesson on the water cycle! The animations made the processes so much easier to grasp.",
      timestamp: "5 hours ago",
      likes: 0,
      dislikes: 0,
    },
  ]);

  return (
    <div className="w-full">
      <div className="p-6">
        <div className="space-y-6">
          {/* Comment Input */}
          <div className="space-y-4">
            <Textarea
              placeholder="Add comment..."
              className="min-h-[100px] resize-none"
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bold className="h-4 w-4" />
                  <span className="sr-only">Bold</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Italic className="h-4 w-4" />
                  <span className="sr-only">Italic</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Underline className="h-4 w-4" />
                  <span className="sr-only">Underline</span>
                </Button>
                <div className="w-px h-4 bg-border my-auto mx-2" />
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Link2 className="h-4 w-4" />
                  <span className="sr-only">Add link</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Image className="h-4 w-4" />
                  <span className="sr-only">Add image</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <AtSign className="h-4 w-4" />
                  <span className="sr-only">Mention user</span>
                </Button>
              </div>
              <Button>Submit</Button>
            </div>
          </div>

          {/* Comments Header */}
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Comments</h2>
              <Badge variant="secondary">25</Badge>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowDownUp className="h-4 w-4" />
                  Most recent
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Most recent</DropdownMenuItem>
                <DropdownMenuItem>Most liked</DropdownMenuItem>
                <DropdownMenuItem>Oldest first</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="space-y-4">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.avatar} alt={comment.author} />
                      <AvatarFallback>{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            {comment.author}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            {comment.timestamp}
                          </span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <ThumbsUp className="h-4 w-4" />
                            <span className="sr-only">Like</span>
                          </Button>
                          <span className="text-sm">{comment.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <ThumbsDown className="h-4 w-4" />
                            <span className="sr-only">Dislike</span>
                          </Button>
                          <span className="text-sm">{comment.dislikes}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nested Replies */}
                {comment.replies?.map((reply) => (
                  <div key={reply.id} className="ml-12 space-y-4">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={reply.avatar} alt={reply.author} />
                        <AvatarFallback>{reply.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">
                              {reply.author}
                            </span>
                            <span className="text-muted-foreground text-sm">
                              {reply.timestamp}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </div>
                        <p className="text-sm">{reply.content}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <ThumbsUp className="h-4 w-4" />
                              <span className="sr-only">Like</span>
                            </Button>
                            <span className="text-sm">{reply.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <ThumbsDown className="h-4 w-4" />
                              <span className="sr-only">Dislike</span>
                            </Button>
                            <span className="text-sm">{reply.dislikes}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
