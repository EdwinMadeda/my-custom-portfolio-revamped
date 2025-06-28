import { useRef } from "react";
import HamburgerBtn from "../hamburger/hamburger-btn";
import clsx from "clsx";
import Link from "next/link";
import useMobileNavMenu from "./useMobileNavMenu";

export default function MobileNavMenu() {
  const {
    toggleMobileMenu,
    setCurrentHref,
    isCurrentHref,
    navItems,
    open,
    setOpen,
    scaleClass,
  } = useMobileNavMenu();

  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);
  const closeMenuAndFocus = () => {
    setOpen(false);
    if (hamburgerBtnRef.current) hamburgerBtnRef.current.focus();
  };

  return (
    <>
      {navItems.length > 0 && (
        <>
          <HamburgerBtn
            ref={hamburgerBtnRef}
            className="order-2 ml-5 lg:hidden"
            state={[open, setOpen]}
            onClick={toggleMobileMenu}
            aria-expanded={open ? "true" : "false"}
            aria-controls="mobile-menu"
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
              {navItems.map(({ name, label, href }, index) => (
                <li key={index} className="px-2">
                  <Link
                    href={href}
                    className={clsx(
                      "relative mb-1.5 block rounded py-3 pr-4 pl-3 transition-colors duration-500",

                      isCurrentHref(href)
                        ? [
                            "text-primary after:bg-primary",
                            scaleClass?.after,
                            "!hover:after:scale-x-[80%]",
                          ]
                        : [
                            "text-muted-foreground hover:text-foreground after:bg-foreground",
                            scaleClass?.afterHover,
                          ],

                      "before:bg-border before:absolute before:top-full before:left-0 before:h-[1px] before:w-full before:content-['']",

                      "after:absolute after:top-full after:left-0 after:h-[2px] after:w-1/2 after:origin-left after:scale-x-0 after:transition-transform after:duration-500 after:content-['']",
                    )}
                    aria-current={isCurrentHref(href) ? "page" : undefined}
                    aria-label={`Go to ${name}`}
                    aria-describedby={`${name}-desc`}
                    onClick={() => {
                      closeMenuAndFocus();
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
                "top-nav-height-mobile h-screen-minus-nav-height absolute left-0 -z-20 w-full bg-black/50 lg:hidden",
                "data-[state=open]:fade-in-0",
              )}
              tabIndex={-1}
            />
          )}
        </>
      )}
    </>
  );
}

HamburgerBtn.displayName = "HamburgerBtn";
