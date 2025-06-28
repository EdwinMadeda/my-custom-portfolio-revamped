import { cn } from "@/lib/utils";

function Skeleton({
  className,
  animate = true,
  ...props
}: React.ComponentProps<"div"> & { animate?: boolean }) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-accent rounded-md",
        { "animate-pulse": animate },
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
