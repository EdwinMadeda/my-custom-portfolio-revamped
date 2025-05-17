import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Button } from "@/components/ui/custom-button";
import { navByName } from "@/config/site";
import Link from "next/link";
import { Heading1, Paragraph } from "@/components/typography";
import { PlatformLinksMobile } from "@/components/platform-links";

export default function Home() {
  const {
    name,
    label: heading,
    longDescription: subHeading,
  } = navByName("home");

  return (
    <section
      id={name}
      className="h-screen-minus-nav-height"
      aria-labelledby={name}
      aria-describedby={`${name}-desc`}
    >
      <div className="flex h-full flex-col justify-center">
        <Paragraph className="text-primary mt-11 uppercase">
          Let's build something together
        </Paragraph>
        <Heading1 className="mt-2">
          Hi, I'm Edwin Madeda <br /> A Software Developer
        </Heading1>
        <Paragraph className="mt-5 max-w-xl">
          I love tinkering, building interfaces & web applications, thus
          transforming ideas into great products.
        </Paragraph>
        <div className="my-10">
          <Button className="group" asChild>
            <Link href="#works">
              View Work
              <BsFillArrowRightCircleFill className="size-6 transition-transform duration-300 ease-in-out group-hover:rotate-90" />
            </Link>
          </Button>
        </div>
        <PlatformLinksMobile className="mt-5" />
      </div>
    </section>
  );
}
