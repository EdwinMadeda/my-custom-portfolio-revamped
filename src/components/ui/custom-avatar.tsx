"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn, generateBgFromName, getInitials } from "@/lib/utils";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  name = "",
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback> & { name?: string }) {
  const { bgColor: avatarBgColor, luminance } = generateBgFromName(name);

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
      style={{
        backgroundColor: avatarBgColor,
      }}
      dangerouslySetInnerHTML={{
        __html: getInitials(name, luminance),
      }}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
