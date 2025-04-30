import { cn } from "@/lib/utils";
import React from "react";

export default function SectionContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("mt-8 w-full xl:mt-10", className)} {...props}>
      {children}
    </div>
  );
}
