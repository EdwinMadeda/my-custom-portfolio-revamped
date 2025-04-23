import React from "react";
import { useNavigation } from "./navigation-context";
import clsx from "clsx";
import Link from "next/link";

export default function NavBar() {
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
      <ul className={clsx("flex flex-row space-x-5")}>
        {navItems.map(({ name, label, href }, index) => (
          <li key={index}>
            <Link
              href={href}
              className={clsx(
                "relative block rounded px-3 py-1 transition-all duration-200 ease-in-out",

                isCurrentHref(href)
                  ? "text-primary after:bg-primary after:opacity-100"
                  : "text-muted-foreground hover:text-foreground after:bg-foreground",

                "after:absolute after:top-full after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:rounded-full after:opacity-0 after:transition-opacity after:duration-200 hover:after:opacity-100",
              )}
              aria-current={isCurrentHref(href) ? "page" : undefined}
              aria-label={`Go to ${name}`}
              aria-describedby={`${name}-desc`}
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
