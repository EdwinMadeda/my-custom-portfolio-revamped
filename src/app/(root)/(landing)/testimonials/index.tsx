"use client";

import SectionContent from "@/components/section-content";
import { GradientHeading, SubHeading } from "@/components/typography";

import { Card } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { navByName } from "@/config/site";
import { cn } from "@/lib/utils";

import Testimonial, { TestimonialType } from "./testimonial";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/custom-avatar";
import MyCustomCarousel from "@/components/my-custom-carousel";
import { EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import useResponsive from "@/hooks/useResponsive";

const testimonials: TestimonialType[] = [
  {
    name: "Robert Lane",
    feedback: `
    
    <p>Working with this team has been an exceptional experience. Their proactive communication and attention to detail stood out from the start. They kept us well-informed at every stage, ensuring that we were always aligned and on track.</p>
    <p>What truly impressed us was their ability to understand our goals and tailor their approach to meet our specific needs. They were flexible, responsive, and always went the extra mile to ensure our success.</p>
    <p>Thanks to their commitment and expertise, the project was delivered on time and exceeded our expectations. I would highly recommend them to anyone looking for a reliable and skilled partner.</p>

    `,
    positionTitle: "CTO",
    affiliationName: "Robert Consultancy",
    affiliationLink: "https://robertconsultancy.com",
    photoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    isPinned: true,
    category: "topRated",
  },
  {
    name: "Jeny Doe",
    feedback: `
      <p>The end product exceeded all expectations. Highly professional, timely, and great attention to detail.</p>
      <p>We were impressed with how well they understood our vision and translated it into a user-friendly design.</p>
    `,
    positionTitle: "CEO",
    affiliationName: "Jeny Consultancy",
    affiliationLink: "https://jenyconsultancy.io",
    photoUrl:
      "https://images.unsplash.com/photo-1521747116042-5a810fda9664?crop=faces&fit=crop&w=256&h=256&q=80",
    isPinned: false,
    category: "clientsFavorite",
  },
  {
    name: "Ema Watson",
    feedback: `
      <p>Their UX thinking transformed our platform. I appreciated the clear process and insightful recommendations.</p>
      <p>They were able to pinpoint areas of improvement and offered practical, effective solutions that aligned perfectly with our goals.</p>
       <p>Thanks to their commitment and expertise, the project was delivered on time and exceeded our expectations. I would highly recommend them to anyone looking for a reliable and skilled partner.</p>
    `,
    positionTitle: "Lead UX Researcher",
    affiliationName: "Stech",
    affiliationLink: "https://stechdesigns.com",
    photoUrl:
      "https://images.unsplash.com/photo-1506748686217-d5c14fdf6b36?crop=faces&fit=crop&w=256&h=256&q=80",
    isPinned: false,
    category: "mostPopular",
  },
  {
    name: "Carlos Rivera",
    feedback: `
      <p>The collaboration felt seamless and efficient. Their team truly understood our needs.</p>
      <p>They were incredibly flexible, responding to our feedback quickly and adapting to changes in our requirements without missing a beat.</p>
       <p>Thanks to their commitment and expertise, the project was delivered on time and exceeded our expectations. I would highly recommend them to anyone looking for a reliable and skilled partner.</p>
        <p>Thanks to their commitment and expertise, the project was delivered on time and exceeded our expectations. I would highly recommend them to anyone looking for a reliable and skilled partner.</p>
    `,
    positionTitle: "Product Manager",
    affiliationName: "InnoTech",
    affiliationLink: "https://innotech.io",
    photoUrl:
      "https://images.unsplash.com/photo-1501594907351-86e2b8fddfb3?crop=faces&fit=crop&w=256&h=256&q=80",
    isPinned: true,
    category: "topRated",
  },
  {
    name: "Sophie Liu",
    feedback: `
      <p>I appreciated the regular updates and thoughtful suggestions throughout the project.</p>
      <p>Their team was always available to discuss new ideas, which kept the project on track and helped us refine our vision.</p>
    `,
    positionTitle: "UI Designer",
    affiliationName: "Pixel Partners",
    affiliationLink: "https://pixelpartners.design",
    photoUrl:
      "https://images.unsplash.com/photo-1506834305643-b2099bc3a3a3?crop=faces&fit=crop&w=256&h=256&q=80",
    isPinned: false,
    category: "clientsFavorite",
  },
  {
    name: "Daniel Cho",
    feedback: `
      <p>Their engineering team went above and beyond. Highly recommended!</p>
      <p>They not only delivered on time but also offered valuable insights that improved our system's performance and scalability.</p>
    `,
    positionTitle: "Software Engineer",
    affiliationName: "CodeFlow Labs",
    affiliationLink: "https://codeflowlabs.dev",
    photoUrl:
      "https://images.unsplash.com/photo-1501594907351-86e2b8fddfb3?crop=faces&fit=crop&w=256&h=256&q=80",
    isPinned: false,
    category: "mostPopular",
  },
  {
    name: "Lina Kovács",
    feedback: `
      <p>Creative, communicative, and genuinely invested in the project’s success.</p>
      <p>Their attention to detail and focus on our business objectives made them a pleasure to work with.</p>
    `,
    positionTitle: "Marketing Director",
    affiliationName: "Marketly",
    affiliationLink: "https://marketly.co",
    photoUrl:
      "https://images.unsplash.com/photo-1531493237466-85c1482cb59b?crop=faces&fit=crop&w=256&h=256&q=80",
    isPinned: false,
    category: "other",
  },
  {
    name: "Tariq Abdullah",
    feedback: `
      <p>One of the most professional teams I’ve worked with. Everything was delivered on time.</p>
      <p>They managed the project efficiently, staying ahead of deadlines and ensuring top-quality results every step of the way.</p>
    `,
    positionTitle: "Full Stack Developer",
    affiliationName: "Buildit Studio",
    affiliationLink: "https://buildit.studio",
    photoUrl:
      "https://images.unsplash.com/photo-1530731143229-e94b62b8e074?crop=faces&fit=crop&w=256&h=256&q=80",
    isPinned: true,
    category: "topRated",
  },
  {
    name: "Ava Thompson",
    feedback: `
      <p>Their design approach was user-first and results-driven. Truly impressive work.</p>
      <p>The team’s ability to craft a seamless experience for users was a major factor in the success of our project.</p>
    `,
    positionTitle: "Design Lead",
    affiliationName: "UXPioneers",
    affiliationLink: "https://uxpioneers.com",
    photoUrl:
      "https://images.unsplash.com/photo-1537649683138-9f709a649db1?crop=faces&fit=crop&w=256&h=256&q=80",
    isPinned: false,
    category: "clientsFavorite",
  },
  {
    name: "Mohammed Khan",
    feedback: `
      <p>They simplified a very complex product and helped us go to market faster.</p>
      <p>We couldn’t have asked for a better partner during this process. They understood our needs and were able to deliver under tight deadlines.</p>
    `,
    positionTitle: "Product Owner",
    affiliationName: "LaunchPath",
    affiliationLink: "https://launchpath.io",
    photoUrl:
      "https://images.unsplash.com/photo-1543484374-b320ba0bcb47?crop=faces&fit=crop&w=256&h=256&q=80",
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

  const breakpoints = {
    smallMobile: { max: 639 },
    mobile: { min: 640, max: 767 },
    tablet: { min: 768, max: 1023 },
    largeTablet: { min: 1024, max: 1279 },
    desktop: { min: 1280 },
  };

  const { isSmallDevice } = useResponsive(breakpoints);

  const OPTIONS: EmblaOptionsType = {
    axis: "x",
    align: "start",
    slidesToScroll: "auto",
    loop: true,
  };

  const PLUGINS: EmblaPluginType[] = [
    Autoplay({ playOnInit: false, delay: 10000 }),
  ];

  const SLIDES = testimonials.map((testimonial, idx) => (
    <Card className="m-1 h-full" key={idx}>
      <Testimonial testimonial={testimonial} />
    </Card>
  ));

  const ThumbContent = (index: number, isSelected: boolean) => {
    const testimonial = testimonials.find((_, itemIdx) => itemIdx === index);
    return (
      <Avatar
        className={cn("ring-accent !size-10 ring-4", {
          "ring-primary/80": isSelected,
        })}
      >
        <AvatarImage src={testimonial?.photoUrl} />
        <AvatarFallback name={testimonial?.name} />
      </Avatar>
    );
  };

  return (
    <section id={name} aria-labelledby={name} aria-describedby={`${name}-desc`}>
      <GradientHeading>{heading}</GradientHeading>
      <SubHeading>{subHeading}</SubHeading>
      <SectionContent>
        <MyCustomCarousel
          slides={SLIDES}
          options={OPTIONS}
          plugins={PLUGINS}
          navigationType={isSmallDevice ? "thumbnail" : "arrow_plus_thumbnail"}
          slideSize={isSmallDevice ? "100%" : "50%"}
          slideHeight={19}
          renderThumbContent={ThumbContent}
          enableAutoplay
          className="pt-2 md:pt-5"
        />
      </SectionContent>
    </section>
  );
}
