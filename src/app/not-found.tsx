import Navigation from "@/components/navigation";
import { NavigationProvider } from "@/components/navigation/navigation-context";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <NavigationProvider>
        <Navigation />
      </NavigationProvider>
      <main>
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </main>
    </>
  );
}
