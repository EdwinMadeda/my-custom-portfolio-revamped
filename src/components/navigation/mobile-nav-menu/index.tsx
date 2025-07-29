import { useRef } from "react";
import HamburgerBtn from "../hamburger/hamburger-btn";
import clsx from "clsx";
import Link from "next/link";
import useMobileNavMenu from "./useMobileNavMenu";
import { AnimatePresence, motion } from "framer-motion";

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
            className="order-2 ml-3 sm:ml-4 lg:hidden"
            state={[open, setOpen]}
            onClick={toggleMobileMenu}
            aria-expanded={open ? "true" : "false"}
            aria-controls="mobile-menu"
          />
          <AnimatePresence mode="wait" initial={false}>
            {open && (
              <>
                <motion.div
                  key="mobile-menu"
                  initial={{ y: "-100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className={clsx(
                    "top-nav-height-mobile absolute left-0 -z-10 w-full items-center justify-between shadow-md lg:hidden",
                  )}
                  id="mobile-menu"
                >
                  <motion.ul
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.08,
                          delayChildren: 0.15,
                        },
                      },
                      hidden: {
                        transition: {
                          staggerChildren: 0.05,
                          staggerDirection: -1,
                        },
                      },
                    }}
                    className="bg-background flex flex-col space-y-1 p-4 pb-8"
                  >
                    {navItems.map(({ name, label, href }, index) => (
                      <motion.li
                        key={index}
                        variants={{
                          hidden: { opacity: 0, y: -8 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="px-2"
                      >
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
                          aria-current={
                            isCurrentHref(href) ? "page" : undefined
                          }
                          aria-label={`Go to ${name}`}
                          aria-describedby={`${name}-desc`}
                          onClick={() => {
                            closeMenuAndFocus();
                            setCurrentHref(href);
                          }}
                        >
                          {label}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
                <motion.div
                  key="overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "top-nav-height-mobile min-h-screen-minus-nav-height absolute left-0 -z-20 w-full bg-black lg:hidden",
                  )}
                  tabIndex={-1}
                />
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}
