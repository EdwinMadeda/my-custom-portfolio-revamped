"use client";

import SectionInnerContent from "@/components/section-inner-content";
import { GradientHeading, SubHeading } from "@/components/typography";

import { Card } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { navByName } from "@/config/site";

import { TestimonialCard, TestimonialSkeleton } from "./testimonial";
import MyCustomCarousel from "@/components/my-custom-carousel";
import { EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import useResponsive from "@/hooks/useResponsive";
import { testimonials } from "./testimonials-constants";
import { ThumbContent, ThumbContentSkeleton } from "./thumb-nail-content";

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

  const SLIDES = testimonials.map((testimonial, index) => (
    // <TestimonialCard key={index} testimonial={testimonial} />
    <TestimonialSkeleton key={index} />
  ));

  return (
    <section id={name} aria-labelledby={name} aria-describedby={`${name}-desc`}>
      <GradientHeading>{heading}</GradientHeading>
      <SubHeading>{subHeading}</SubHeading>
      <SectionInnerContent>
        <MyCustomCarousel
          slides={SLIDES}
          options={OPTIONS}
          plugins={PLUGINS}
          navigationType={isSmallDevice ? "thumbnail" : "arrow_plus_thumbnail"}
          slideSize={isSmallDevice ? "100%" : "50%"}
          slideHeight={19}
          renderThumbContent={ThumbContentSkeleton}
          enableAutoplay
          className="pt-2 md:pt-5"
        />
      </SectionInnerContent>
    </section>
  );
}
