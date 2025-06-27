import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import { boolean } from "zod";

// Gradient-styled heading (usually for splash or hero titles)
export function GradientHeading({
  children,
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <Heading3
      className={cn(
        "bg-gradient-to-br from-[#ff014f] from-20% to-[#992884] to-50% bg-clip-text font-extrabold text-transparent uppercase",
        className,
      )}
      {...props}
    >
      {children}
    </Heading3>
  );
}

export function SubHeading({
  children,
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <>
      <Heading3
        className={cn("mt-4 leading-loose capitalize", className)}
        {...props}
      >
        {children}
      </Heading3>
      <div className="mx-auto mt-6 flex">
        <span className="bg-primary h-[3px] w-40 rounded-full" />
        <span className="bg-primary mx-1 h-[3px] w-3 rounded-full" />
        <span className="bg-primary h-[3px] w-1 rounded-full" />
      </div>
    </>
  );
}

export function Heading1({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className,
      )}
      {...props}
    />
  );
}

export function Heading2({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    />
  );
}

export function Heading3({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export function Heading4({ className, ...props }: React.ComponentProps<"h4">) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export function Heading5({ className, ...props }: React.ComponentProps<"h5">) {
  return (
    <h5
      className={cn(
        "scroll-m-20 text-lg font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export function Heading6({ className, ...props }: React.ComponentProps<"h6">) {
  return (
    <h6
      className={cn(
        "scroll-m-20 text-base font-semibold tracking-normal",
        className,
      )}
      {...props}
    />
  );
}

export function Paragraph({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  );
}

export function Lead({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"p"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "p";

  return (
    <Comp
      className={cn("text-muted-foreground text-xl", className)}
      {...props}
    />
  );
}

export function Muted({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)} {...props} />
  );
}

export function Quote({
  className,
  ...props
}: React.ComponentProps<"blockquote">) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  );
}

export const ProseContent = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    asChild?: boolean;
    maxWidth: "prose" | "none";
  }
>(({ className, maxWidth = "prose", asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      ref={ref}
      className={cn(
        "prose prose-base dark:prose-invert",
        "prose-a:px-2 prose-a:underline-offset-4 hover:prose-a:underline",
        "prose-blockquote:border-foreground",
        "prose-ul:list-foreground prose-ol:list-foreground",
        [
          "prose-headings:text-foreground",
          "prose-lead:text-muted-foreground",
          "prose-p:text-foreground",
          "prose-blockquote:text-foreground",
          "prose-figcaption:text-foreground",
          "prose-strong:text-foreground",
          "prose-em:text-foreground",
          "prose-kbd:text-foreground",
          "prose-code:text-foreground",
          "prose-li:text-foreground",
          "prose-th:text-foreground",
          "prose-td:text-foreground",
          "prose-a:text-primary",
          "prose-hr:bg-border",
          "",
        ],
        {
          "max-w-none": maxWidth === "none",
          "max-w-prose": maxWidth === "prose",
        },
        className,
      )}
      {...props}
    />
  );
});
