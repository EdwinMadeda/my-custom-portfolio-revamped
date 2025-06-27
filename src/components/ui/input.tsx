import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 rounded-md px-3 py-1", // layout & sizing
        "border-input dark:bg-input/30 border bg-transparent", // border & background
        "placeholder:text-muted-foreground text-foreground text-base md:text-sm", // text
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium", // file input
        "shadow-xs transition-[color,box-shadow] outline-none", // effects
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", // focus
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40", //validation
        "selection:bg-primary selection:text-primary-foreground", // selection
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50", // disabled
        className, // custom
      )}
      {...props}
    />
  );
}

export { Input };
