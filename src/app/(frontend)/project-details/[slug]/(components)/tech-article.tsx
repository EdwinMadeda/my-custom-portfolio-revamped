import { ProseContent } from "@/components/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { PortableText } from "next-sanity";
import { SINGLE_PROJECT_QUERYResult } from "../../../../../../sanity.types";

type SingleProjectDetails = NonNullable<SINGLE_PROJECT_QUERYResult>;

type TechArticleProps = Pick<SingleProjectDetails, "detailedDescription">;

export function TechArticle({ detailedDescription }: TechArticleProps) {
  return (
    <ProseContent maxWidth="prose" asChild>
      {/* <article className="pt-8">
        <h1>Technologies Behind Our Project</h1>
        <p>
          Building a modern web application requires a robust set of tools and
          technologies. This project leverages a carefully chosen stack to
          ensure optimal performance, scalability, and a great user experience.
        </p>
        <h2>Frontend Frameworks</h2>
        <p>
          The frontend of this project is powered by <strong>Next.js</strong>, a
          React-based framework designed for server-side rendering and static
          site generation. This ensures that our pages load quickly and are
          SEO-friendly, which is essential for a modern portfolio website.
        </p>
        <p>
          Additionally, we utilize <strong>React</strong> to build user
          interfaces efficiently. Its component-based architecture makes it easy
          to manage complex UIs and keeps the development process smooth and
          maintainable.
        </p>
        <p>
          Styling is done with <strong>Tailwind CSS</strong>, a utility-first
          CSS framework that helps us rapidly build custom designs.
          Tailwind&apos;s approach allows for a more efficient and streamlined
          workflow when crafting a responsive layout for our site.
        </p>
        <p>
          For the user interface, we use <strong>Shadcn/ui</strong>, a component
          library built with Tailwind CSS and React. This helps to maintain a
          consistent UI while allowing for customization and flexibility in
          design.
        </p>
        <h2>Content Management System (CMS)</h2>
        <p>
          To handle content management, we rely on <strong>Sanity.io</strong>, a
          powerful headless CMS. With its flexible and structured content model,
          it provides an excellent backend solution for creating, managing, and
          delivering content seamlessly to our frontend.
        </p>
        <h2>Development Tools</h2>
        <p>
          Development is streamlined through the use of <strong>Git</strong> for
          version control and <strong>GitHub</strong> for collaboration. Git
          allows us to keep track of code changes efficiently, while GitHub
          provides a platform for hosting, reviewing, and collaborating on our
          code.
        </p>
        <h2>Why This Tech Stack?</h2>
        <p>
          This tech stack was selected with performance, scalability, and
          maintainability in mind. <strong>Next.js</strong> provides an ideal
          foundation for building fast and SEO-friendly websites.{" "}
          <strong>React</strong> allows for dynamic user interfaces, while{" "}
          <strong>Tailwind CSS</strong> and <strong>Shadcn/ui</strong> enable
          rapid styling and UI development.
        </p>
        <p>
          Additionally, <strong>Sanity.io</strong> ensures that we can easily
          manage and scale content, while <strong>GitHub</strong> and{" "}
          <strong>Git</strong> make collaboration and version control easy and
          efficient.
        </p>
        <p>
          In conclusion, this stack empowers us to create modern, scalable, and
          maintainable web applications. The combination of frontend and backend
          technologies ensures a seamless development experience while
          delivering excellent performance and user experience.
        </p>
      </article> */}

      <article className="pt-8">
        {detailedDescription && <PortableText value={detailedDescription} />}
      </article>
    </ProseContent>
  );
}

export function TechArticleSkeleton() {
  return (
    <ProseContent maxWidth="prose" asChild>
      <article className="space-y-6 pt-8">
        {/* Title */}
        <Skeleton className="h-8 w-3/4" />
        {/* Intro paragraph */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        {/* Sections */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3">
            {/* Section heading */}
            <Skeleton className="h-6 w-1/2" />

            {/* Paragraphs */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            {/* Optional second paragraph */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
        {/* Final paragraph */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </article>
    </ProseContent>
  );
}
