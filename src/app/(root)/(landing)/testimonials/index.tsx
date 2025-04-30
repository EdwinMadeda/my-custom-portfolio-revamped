import SectionContent from "@/components/section-content";
import { GradientHeading, SubHeading } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { navByName } from "@/config/site";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import Testimonial, { ReadMore } from "./testimonial";

const testimonials = [
  {
    name: "Robert Lane",
    feedback:
      "Working with this team has been a phenomenal experience. The communication and delivery were top-notch from start to finish.",
    positionTitle: "CTO",
    affiliationName: "Robert Consultancy",
    affiliationLink: "https://robertconsultancy.com",
    photoUrl: "https://example.com/photos/robert.jpg",
    isPinned: true,
    category: "topRated",
  },
  {
    name: "Jeny Doe",
    feedback:
      "The end product exceeded all expectations. Highly professional, timely, and great attention to detail.",
    positionTitle: "CEO",
    affiliationName: "Jeny Consultancy",
    affiliationLink: "https://jenyconsultancy.io",
    photoUrl: "https://example.com/photos/jeny.jpg",
    isPinned: false,
    category: "clientsFavorite",
  },
  {
    name: "Ema Watson",
    feedback:
      "Their UX thinking transformed our platform. I appreciated the clear process and insightful recommendations.",
    positionTitle: "Lead UX Researcher",
    affiliationName: "Stech",
    affiliationLink: "https://stechdesigns.com",
    photoUrl: "https://example.com/photos/ema.jpg",
    isPinned: false,
    category: "mostPopular",
  },
  {
    name: "Carlos Rivera",
    feedback:
      "The collaboration felt seamless and efficient. Their team truly understood our needs.",
    positionTitle: "Product Manager",
    affiliationName: "InnoTech",
    affiliationLink: "https://innotech.io",
    photoUrl: "https://example.com/photos/carlos.jpg",
    isPinned: true,
    category: "topRated",
  },
  {
    name: "Sophie Liu",
    feedback:
      "I appreciated the regular updates and thoughtful suggestions throughout the project.",
    positionTitle: "UI Designer",
    affiliationName: "Pixel Partners",
    affiliationLink: "https://pixelpartners.design",
    photoUrl: "https://example.com/photos/sophie.jpg",
    isPinned: false,
    category: "clientsFavorite",
  },
  {
    name: "Daniel Cho",
    feedback:
      "Their engineering team went above and beyond. Highly recommended!",
    positionTitle: "Software Engineer",
    affiliationName: "CodeFlow Labs",
    affiliationLink: "https://codeflowlabs.dev",
    photoUrl: "https://example.com/photos/daniel.jpg",
    isPinned: false,
    category: "mostPopular",
  },
  {
    name: "Lina Kovács",
    feedback:
      "Creative, communicative, and genuinely invested in the project’s success.",
    positionTitle: "Marketing Director",
    affiliationName: "Marketly",
    affiliationLink: "https://marketly.co",
    photoUrl: "https://example.com/photos/lina.jpg",
    isPinned: false,
    category: "other",
  },
  {
    name: "Tariq Abdullah",
    feedback:
      "One of the most professional teams I’ve worked with. Everything was delivered on time.",
    positionTitle: "Full Stack Developer",
    affiliationName: "Buildit Studio",
    affiliationLink: "https://buildit.studio",
    photoUrl: "https://example.com/photos/tariq.jpg",
    isPinned: true,
    category: "topRated",
  },
  {
    name: "Ava Thompson",
    feedback:
      "Their design approach was user-first and results-driven. Truly impressive work.",
    positionTitle: "Design Lead",
    affiliationName: "UXPioneers",
    affiliationLink: "https://uxpioneers.com",
    photoUrl: "https://example.com/photos/ava.jpg",
    isPinned: false,
    category: "clientsFavorite",
  },
  {
    name: "Mohammed Khan",
    feedback:
      "They simplified a very complex product and helped us go to market faster.",
    positionTitle: "Product Owner",
    affiliationName: "LaunchPath",
    affiliationLink: "https://launchpath.io",
    photoUrl: "https://example.com/photos/mohammed.jpg",
    isPinned: false,
    category: "mostPopular",
  },
];

export default function Testimonials() {
  const {
    name,
    label: heading,
    shortDescription: subHeading,
  } = navByName("testimonials");

  return (
    <section id={name} aria-labelledby={name} aria-describedby={`${name}-desc`}>
      <GradientHeading>{heading}</GradientHeading>
      <SubHeading>{subHeading}</SubHeading>
      <SectionContent>
        <Carousel
          className={clsx("w-full", {})}
          opts={{
            align: "start",
          }}
        >
          <CarouselContent className={clsx("h-[650px] md:h-full")}>
            {testimonials.map((testimonial, idx) => (
              <CarouselItem key={idx} className="md:basis-1/2">
                <div className="p-1">
                  <Card className="h-[350px]">
                    <Testimonial />
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </SectionContent>
    </section>
  );
}
