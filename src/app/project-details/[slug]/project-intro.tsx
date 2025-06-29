import { Heading1, Paragraph } from "@/components/typography";
import { Skeleton } from "@/components/ui/skeleton";

export function ProjectIntro() {
  return (
    <>
      <Paragraph className="text-primary mt-11 uppercase">
        Where passion meets purpose
      </Paragraph>
      <Heading1 className="mt-2">Personal Portfolio</Heading1>
      <Paragraph className="mt-5 max-w-xl">
        This platform serves as a personal reflection of my growth as a
        developer. Here, you’ll find a collection of projects that highlight my
        skills, challenges overcome, and the creative process behind each piece.
      </Paragraph>
    </>
  );
}

export function ProjectIntroSkeleton() {
  return (
    <div className="mt-11 space-y-4">
      {/* Paragraph (uppercase small title) */}
      <Skeleton className="bg-primary/20 h-4 w-52 rounded" />

      {/* Heading1 (4xl - 5xl) */}
      <Skeleton className="h-10 w-80 rounded" />

      {/* Paragraph body text */}
      <div className="mt-8 mb-4 max-w-xl space-y-3">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-[95%] rounded" />
        <Skeleton className="h-4 w-[85%] rounded" />
      </div>
    </div>
  );
}
