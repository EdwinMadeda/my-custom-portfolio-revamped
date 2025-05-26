import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/custom-button";

interface ThumbnailProps extends React.ComponentPropsWithoutRef<"button"> {
  isSelected: boolean;
}

export default function Thumbnail({
  isSelected,
  className,
  children,
  ...props
}: ThumbnailProps) {
  return (
    <div className="min-w-0 flex-[0_0_18%] pl-[var(--thumbs-slide-spacing)] sm:flex-[0_0_19%]">
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "text-muted-foreground size-[var(--thumbs-slide-size)] touch-manipulation appearance-none text-[1.5rem] font-semibold no-underline",
          { "text-primary": isSelected },
          className,
        )}
        style={{
          WebkitTapHighlightColor: "var(--border)",
        }}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
}
