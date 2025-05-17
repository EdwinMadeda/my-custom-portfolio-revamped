import Navigation from "@/components/navigation";
import { NavigationProvider } from "@/components/navigation/navigation-context";
import { Lead, Muted } from "@/components/typography";
import { Button } from "@/components/ui/custom-button";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <NavigationProvider>
        <Navigation />
      </NavigationProvider>
      <main>
        <section className="flex h-full items-center">
          <div className="container mx-auto my-8 flex flex-col items-center justify-center">
            <div className="max-w-md text-center">
              <Lead asChild>
                <h1 className="mb-8 !text-9xl font-extrabold">
                  <span className="sr-only">Error</span>404
                </h1>
              </Lead>
              <h2 className="text-2xl font-semibold md:text-3xl">
                Sorry, we couldn't find this page.
              </h2>
              <Muted className="mt-4 mb-8">
                But dont worry, you can find plenty of other things on our
                homepage.
              </Muted>
              <Button>
                <Link href="/">Back to homepage</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
