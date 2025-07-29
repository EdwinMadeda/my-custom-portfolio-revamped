import { cn } from "@/lib/utils";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/custom-avatar";

import { testimonials } from "./testimonials-constants";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageOff } from "lucide-react";

export function ThumbContent(index: number, isSelected: boolean) {
  const testimonial = testimonials.find((_, itemIdx) => itemIdx === index);
  return (
    <Avatar
      className={cn("!size-10 border shadow-sm ring-4 select-none", {
        "": isSelected,
      })}
    >
      <AvatarImage src={testimonial?.photoUrl} className="rounded-full" />
      <AvatarFallback name={testimonial?.name} />
    </Avatar>
  );
}

export function ThumbContentSkeleton() {
  return (
    <Skeleton className="ring-muted flex !size-10 items-center justify-center rounded-full border shadow-sm ring-4">
      <ImageOff className="text-muted-foreground h-5 w-5" />
    </Skeleton>
  );
}
