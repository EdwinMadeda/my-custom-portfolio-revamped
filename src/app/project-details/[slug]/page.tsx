import BackButton from "@/components/back-button";
import Divider from "@/components/divider";
import ImageWithFallback from "@/components/image-with-fallback";
import SectionContent from "@/components/section-content";
import { Heading1, Paragraph, ProseContent } from "@/components/typography";
import { Button } from "@/components/ui/custom-button";
import { Card } from "@/components/ui/card";
import clsx from "clsx";
import { Fragment } from "react";
import { ExternalLink } from "react-external-link";

export const metadata = {
  title: "Project Details",
};

export default async function ProjectDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const techStackInfo = [
    {
      category: "Frontend",
      items: [
        {
          label: "Next.js",
          content:
            "A React framework for server-side rendering and static site generation.",
        },
        {
          label: "React",
          content: "JavaScript library for building user interfaces.",
        },
        {
          label: "Tailwind CSS",
          content: "Utility-first CSS framework for fast UI development.",
        },
        {
          label: "Shadcn/ui",
          content: "A UI component library built with Tailwind CSS and React.",
        },
      ],
    },

    {
      category: "CMS",
      items: [
        {
          label: "Sanity.io",
          content: "Headless CMS for structured content management.",
        },
      ],
    },

    {
      category: "Styling",
      items: [
        { label: "Tailwind CSS", content: "Utility-first CSS framework." },
      ],
    },
    {
      category: "Development Tools",
      items: [
        {
          label: "GitHub",
          content: "Platform for version control and collaboration.",
        },
        {
          label: "Git",
          content: "Distributed version control system.",
        },
      ],
    },
  ];

  return (
    <>
      <section>
        <div className="flex h-full flex-col justify-center">
          <Paragraph className="text-primary mt-11 uppercase">
            Where passion meets purpose
          </Paragraph>
          <Heading1 className="mt-2">Personal Portfolio</Heading1>
          <Paragraph className="mt-5 max-w-xl">
            This platform serves as a personal reflection of my growth as a
            developer. Here, you’ll find a collection of projects that highlight
            my skills, challenges overcome, and the creative process behind each
            piece.
          </Paragraph>

          <SectionContent className="container">
            <div className="flex flex-wrap gap-8">
              <figure className="flex flex-col items-center justify-end">
                <div className="flex w-[225px] items-end justify-center md:w-[270px]">
                  <ImageWithFallback
                    className="h-auto w-full rounded-lg"
                    src={`https://picsum.photos/id/15/450/975`}
                    alt="Phone Mockup"
                    width={450}
                    height={975}
                    fallbackMsg={
                      <>
                        No <br />
                        preview <br />
                        available
                      </>
                    }
                  />
                </div>
                <figcaption className="p-6 leading-relaxed font-semibold">
                  On Mobile
                </figcaption>
              </figure>
              <figure className="flex flex-col items-center justify-end">
                <div className="flex w-[270px] items-end justify-center md:w-[330px]">
                  <ImageWithFallback
                    className="h-auto w-full rounded-lg"
                    src="https://picsum.photos/id/15/600/800"
                    alt="Tablet Mockup"
                    width={600}
                    height={800}
                  />
                </div>
                <figcaption className="p-6 leading-relaxed font-semibold">
                  On Tablet
                </figcaption>
              </figure>
              <figure className="flex flex-col items-center justify-end">
                <div className="flex w-[480px] items-end justify-center md:w-[576px]">
                  <ImageWithFallback
                    className="h-auto w-full rounded-lg"
                    src="https://picsum.photos/id/15/960/540"
                    alt="Desktop Mockup"
                    width={960}
                    height={540}
                  />
                </div>
                <figcaption className="p-6 leading-relaxed font-semibold">
                  On Desktop
                </figcaption>
              </figure>
            </div>
          </SectionContent>

          <div className="my-10 flex gap-4">
            <BackButton href="/#works">Back to Works</BackButton>
            <Button asChild>
              <ExternalLink href="https://example.com">
                View Repository
              </ExternalLink>
            </Button>
            <Button asChild>
              <ExternalLink href="https://example.com">Visit Site</ExternalLink>
            </Button>
          </div>
        </div>
      </section>

      <section>
        <div className="flex w-full flex-col md:flex-row-reverse md:items-start">
          <aside className="top-20 mb-8 pt-8 md:sticky md:ml-8 md:max-w-[20rem] md:min-w-[18rem] md:self-start lg:ml-32">
            <Card className="border-border flex flex-col py-6 md:py-8">
              <div className="mb-2.5 px-6 leading-7 font-semibold capitalize">
                Technologies used for portfolio website
              </div>

              {techStackInfo.map(({ category, items }, categoryIndex) => (
                <div key={categoryIndex}>
                  {items.map(({ label, content }, index) => (
                    <Fragment key={label}>
                      {index === 0 && <Divider title={category} />}
                      <div
                        className={clsx(`mb-5 px-6 last:mb-0`, {
                          "pt-5": index === 0,
                        })}
                      >
                        <div className="mb-2 text-xs font-semibold">
                          {label}
                        </div>
                        <div className="text-muted-foreground overflow-hidden text-xs md:text-sm">
                          {content}
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
              ))}
            </Card>
          </aside>
          <ProseContent maxWidth="prose" asChild>
            <article className="mx-auto pt-8">
              <h1>Technologies Behind Our Project</h1>
              <p>
                Building a modern web application requires a robust set of tools
                and technologies. This project leverages a carefully chosen
                stack to ensure optimal performance, scalability, and a great
                user experience.
              </p>
              <h2>Frontend Frameworks</h2>
              <p>
                The frontend of this project is powered by{" "}
                <strong>Next.js</strong>, a React-based framework designed for
                server-side rendering and static site generation. This ensures
                that our pages load quickly and are SEO-friendly, which is
                essential for a modern portfolio website.
              </p>
              <p>
                Additionally, we utilize <strong>React</strong> to build user
                interfaces efficiently. Its component-based architecture makes
                it easy to manage complex UIs and keeps the development process
                smooth and maintainable.
              </p>
              <p>
                Styling is done with <strong>Tailwind CSS</strong>, a
                utility-first CSS framework that helps us rapidly build custom
                designs. Tailwind's approach allows for a more efficient and
                streamlined workflow when crafting a responsive layout for our
                site.
              </p>
              <p>
                For the user interface, we use <strong>Shadcn/ui</strong>, a
                component library built with Tailwind CSS and React. This helps
                to maintain a consistent UI while allowing for customization and
                flexibility in design.
              </p>
              <h2>Content Management System (CMS)</h2>
              <p>
                To handle content management, we rely on{" "}
                <strong>Sanity.io</strong>, a powerful headless CMS. With its
                flexible and structured content model, it provides an excellent
                backend solution for creating, managing, and delivering content
                seamlessly to our frontend.
              </p>
              <h2>Development Tools</h2>
              <p>
                Development is streamlined through the use of{" "}
                <strong>Git</strong> for version control and{" "}
                <strong>GitHub</strong> for collaboration. Git allows us to keep
                track of code changes efficiently, while GitHub provides a
                platform for hosting, reviewing, and collaborating on our code.
              </p>
              <h2>Why This Tech Stack?</h2>
              <p>
                This tech stack was selected with performance, scalability, and
                maintainability in mind. <strong>Next.js</strong> provides an
                ideal foundation for building fast and SEO-friendly websites.{" "}
                <strong>React</strong> allows for dynamic user interfaces, while{" "}
                <strong>Tailwind CSS</strong> and <strong>Shadcn/ui</strong>{" "}
                enable rapid styling and UI development.
              </p>
              <p>
                Additionally, <strong>Sanity.io</strong> ensures that we can
                easily manage and scale content, while <strong>GitHub</strong>{" "}
                and <strong>Git</strong> make collaboration and version control
                easy and efficient.
              </p>
              <p>
                In conclusion, this stack empowers us to create modern,
                scalable, and maintainable web applications. The combination of
                frontend and backend technologies ensures a seamless development
                experience while delivering excellent performance and user
                experience.
              </p>
            </article>
          </ProseContent>
        </div>
      </section>
    </>
  );
}
