"use client";

import Logo from "../logo";
import { ModeToggle } from "../mode-toggle";

import { cn } from "@/lib/utils";

import { useSticky } from "./useSticky";

import NavBar from "./nav-bar";
import MobileNavMenu from "./mobile-nav-menu";

export default function Navigation() {
  const [ref, isSticky] = useSticky({ threshold: 500 });

  return (
    <>
      <header
        ref={ref}
        className={cn(
          "h-nav-height-mobile lg:h-nav-height bg-background/75 border-border sticky top-0 z-50 w-full border-b backdrop-blur-sm",
          {
            "lg:bg-background/50": !isSticky,
          },
        )}
      >
        <nav
          className={cn(
            "@container",
            "bg-background/95 relative mx-auto flex items-center justify-between lg:space-x-8 lg:bg-transparent",
            "border-border border-b lg:border-none",
          )}
        >
          <Logo />
          <NavBar />
          <MobileNavMenu />
          <div className="order-1 flex flex-1 items-center justify-end lg:order-2 lg:flex-none">
            <ModeToggle />
          </div>
        </nav>
      </header>
    </>
  );
}
