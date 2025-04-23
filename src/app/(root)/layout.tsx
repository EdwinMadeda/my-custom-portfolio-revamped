import Navigation from "@/components/navigation";
import { NavigationProvider } from "@/components/navigation/navigation-context";
import { landingNavItems } from "@/config/site";
import React from "react";

export default function LandingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NavigationProvider navItems={landingNavItems()}>
        <Navigation />
      </NavigationProvider>
      <main>{children}</main>
    </>
  );
}
