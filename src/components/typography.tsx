import { cn } from "@/lib/utils";

export function GradientHeading({
  children,
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h3
      className={cn(
        "bg-linear-to-br/oklab from-[#ff014f] from-20% to-[#992884] to-50% bg-[length:100%] bg-clip-text font-extrabold text-transparent uppercase",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function SubHeading({
  children,
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <>
      <h3 className={cn("mt-4 leading-loose capitalize", className)}>
        {children}
      </h3>{" "}
      <div className="mx-auto mt-6 flex">
        <span className="bg-primary inline-block h-[3px] w-40 rounded-full"></span>
        <span className="bg-primary mx-1 inline-block h-[3px] w-3 rounded-full"></span>
        <span className="bg-primary inline-block h-[3px] w-1 rounded-full"></span>
      </div>
    </>
  );
}
