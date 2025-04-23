"use client";

import { NavHref, NavItem, StateTuple } from "@/types";
import { ComponentType, createContext, FC, useContext, useState } from "react";

type IsCurrentHref = (href: NavHref) => boolean;

type Navigation = {
  navItems: NavItem[];
  mobileMenuState: StateTuple<boolean>;
  currentHrefState: StateTuple<NavHref>;
  isCurrentHref: IsCurrentHref;
  toggleMobileMenu: () => void;
};

const NavigationContext = createContext<Navigation | null>(null);

export function NavigationProvider({
  navItems = [],
  children,
}: {
  navItems?: NavItem[];
  children: React.ReactNode;
}) {
  const mobileMenuState = useState(false);
  const [, setOpen] = mobileMenuState;
  const toggleMobileMenu = () => {
    setOpen((prev) => !prev);
  };

  const currentHrefState = useState<NavHref>("#home");
  const [currentHref] = currentHrefState;
  const isCurrentHref: IsCurrentHref = (href) => currentHref === href;

  return (
    <NavigationContext.Provider
      value={{
        navItems,
        mobileMenuState,
        currentHrefState,
        isCurrentHref,
        toggleMobileMenu,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation(): Navigation {
  const ctx = useContext(NavigationContext);
  if (!ctx)
    throw new Error(
      "useNavigationMenu must be used within NavigationMenuProvider",
    );
  return ctx;
}

export function WithNavigationContext<P extends object>(
  Component: ComponentType,
): FC<P> {
  return function (props) {
    return (
      <NavigationProvider>
        <Component {...props} />
      </NavigationProvider>
    );
  };
}
