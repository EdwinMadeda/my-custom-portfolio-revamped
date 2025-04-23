import { cn } from "@/lib/utils";
import clsx from "clsx";
import Link from "next/link";

export default function Logo({
  href = "/",
  className,
}: React.ComponentProps<"a">) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded px-2 pt-2 whitespace-nowrap uppercase",
        className,
      )}
    >
      <span className={clsx("text-primary font-rainbowBridge text-5xl")}>
        E
      </span>
      <span className={clsx("font-lemonJelly text-3xl")}>madeda</span>
    </Link>
  );
}
