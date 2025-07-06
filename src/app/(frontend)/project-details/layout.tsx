import Navigation from "@/components/navigation";
import { NavigationProvider } from "@/components/navigation/navigation-context";
import React from "react";

export default function ProjectDetailsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NavigationProvider>
        <Navigation />
      </NavigationProvider>
      <main>{children}</main>
    </>
  );
}
