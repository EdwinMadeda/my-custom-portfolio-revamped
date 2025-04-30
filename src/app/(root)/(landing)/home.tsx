import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { navByName } from "@/config/site";

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
        <p className="text-primary mt-11 uppercase">
          Let's build something together
        </p>
        <h1 className="mt-2">
          Hi, I'm Edwin Madeda <br /> A Software Developer
        </h1>
        <p className="mt-5 max-w-xl">
          I love tinkering, building interfaces & web applications, thus
          transforming ideas into great products.
        </p>
        <div className="my-10">
          <Button className="rounded-full">
            View Work <BsFillArrowRightCircleFill className="size-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
