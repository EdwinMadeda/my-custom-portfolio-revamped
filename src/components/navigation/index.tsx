"use client";

import Link from "next/link";
import Logo from "../logo";
import { ModeToggle } from "../mode-toggle";

import clsx from "clsx";

import { cn } from "@/lib/utils";
import HamburgerBtn from "./hamburger/hamburger-btn";
import { useSticky } from "./useSticky";
import { useNavigation } from "./navigation-context";

export default function Navigation() {
  const [ref, isSticky] = useSticky({ threshold: 500 });

  return (
    <>
      <header
        ref={ref}
        className={cn(
          "h-nav-height-mobile lg:h-nav-height bg-background/95 border-border sticky top-0 z-50 w-full border-b backdrop-blur-sm",
          {
            "lg:bg-background/50": !isSticky,
          },
        )}
      >
        <nav
          className={cn(
            "bg-background/95 relative mx-auto flex max-w-screen-xl items-center justify-between px-4 lg:space-x-8 lg:bg-transparent",
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

function NavBar() {
  const {
    currentHrefState: [, setCurrentHref],
    isCurrentHref,
    navItems,
  } = useNavigation();
  return (
    <div
      className={clsx(
        "order-1 hidden w-auto flex-1 items-center justify-end lg:flex",
      )}
      id="desktop-navbar"
    >
      <ul className={clsx("flex flex-row space-x-8")}>
        {navItems.map(({ label, href }, index) => (
          <li key={index}>
            <Link
              href={href}
              className={clsx(
                "relative block rounded py-1 transition-all duration-200 ease-in-out",

                isCurrentHref(href)
                  ? "text-primary after:bg-primary after:opacity-100"
                  : "text-muted-foreground hover:text-foreground after:bg-foreground",

                "after:absolute after:top-full after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:rounded-full after:opacity-0 after:transition-opacity after:duration-200 hover:after:opacity-100",
              )}
              aria-current={isCurrentHref(href) ? "page" : undefined}
              onClick={() => setCurrentHref(href)}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileNavMenu() {
  const {
    mobileMenuState,
    toggleMobileMenu,
    currentHrefState: [, setCurrentHref],
    isCurrentHref,
    navItems,
  } = useNavigation();
  const [open, setOpen] = mobileMenuState;
  const setAfterScale = () => {
    const scales = [
      "after:scale-x-[50%]",
      "after:scale-x-[60%]",
      "after:scale-x-[70%]",
      "after:scale-x-[80%]",
    ];
    return scales[Math.floor(Math.random() * scales.length)];
  };

  const setHoverAfterScale = () => {
    const scales = [
      "hover:after:scale-x-[50%]",
      "hover:after:scale-x-[60%]",
      "hover:after:scale-x-[70%]",
      "hover:after:scale-x-[80%]",
    ];
    return scales[Math.floor(Math.random() * scales.length)];
  };

  return (
    <>
      {navItems.length > 0 && (
        <>
          <HamburgerBtn
            className="order-2 ml-5 lg:hidden"
            state={[open, setOpen]}
            onClick={toggleMobileMenu}
          />
          <div
            data-state={!open ? "open" : "closed"}
            className={clsx(
              "top-nav-height-mobile absolute left-0 -z-10 w-full items-center justify-between shadow-md lg:hidden",
              "transition-transform duration-500 ease-in-out",
              [
                "data-[state=open]:-translate-y-[200%]",
                "data-[state=open]:animate-in",
                "data-[state=open]:duration-500",
                "data-[state=open]:animate-slide-in-from-top",
              ],
              [
                "data-[state=closed]:animate-out",
                "data-[state=closed]:duration-300",
                "data-[state=closed]:animate-slide-out-to-top",
              ],
            )}
            id="mobile-menu"
          >
            <ul
              className={clsx("bg-background flex flex-col space-y-1 p-4 pb-8")}
            >
              {navItems.map(({ label, href }, index) => (
                <li key={index} className="px-2">
                  <Link
                    href={href}
                    className={clsx(
                      "relative mb-1.5 block rounded py-3 pr-4 pl-3 transition-colors duration-500",

                      isCurrentHref(href)
                        ? [
                            "text-primary after:bg-primary",
                            setAfterScale(),
                            "!hover:after:scale-x-[80%]",
                          ]
                        : [
                            "text-muted-foreground hover:text-foreground after:bg-foreground",
                            setHoverAfterScale(),
                          ],

                      "before:bg-border before:absolute before:top-full before:left-0 before:h-[1px] before:w-full before:content-['']",

                      "after:absolute after:top-full after:left-0 after:h-[2px] after:w-1/2 after:origin-left after:scale-x-0 after:transition-transform after:duration-500 after:content-['']",
                    )}
                    aria-current={isCurrentHref(href) ? "page" : undefined}
                    onClick={() => {
                      setOpen(false);
                      setCurrentHref(href);
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {open && (
            <div
              onClick={() => setOpen(false)}
              className={clsx(
                "top-nav-height-mobile h-screen-minus-nav-height-mobile absolute left-0 -z-20 w-full bg-black/50 lg:hidden",
                "data-[state=open]:fade-in-0",
              )}
            />
          )}
        </>
      )}
    </>
  );
}
