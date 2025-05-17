import React from "react";
import { Button } from "./ui/custom-button";
import Link, { LinkProps } from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { cn } from "@/lib/utils";

export default function BackButton({
  href,
  className,
  children,
}: React.ComponentProps<"button"> & LinkProps) {
  return (
    <Button
      className={cn("group inline-flex items-center", className)}
      variant="link"
      asChild
    >
      <Link href={href}>
        <BsArrowLeft className="ml-2 size-5 transition-transform duration-300 ease-in-out group-hover:-translate-x-1" />
        {children}
      </Link>
    </Button>
  );
}
