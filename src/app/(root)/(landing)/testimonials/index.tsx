"use client";

import SectionInnerContent from "@/components/section-inner-content";
import { GradientHeading, SubHeading } from "@/components/typography";

import Autoplay from "embla-carousel-autoplay";
import { navByName } from "@/config/site";

import { TestimonialCard, TestimonialSkeleton } from "./testimonial";
import MyCustomCarousel from "@/components/my-custom-carousel";
import { EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import useResponsive from "@/hooks/useResponsive";
import { testimonials } from "./testimonials-constants";
import { ThumbContent, ThumbContentSkeleton } from "./thumb-nail-content";
import { carouselBreakpoints } from "@/components/my-custom-carousel/carousel-breakpoints";

export default function Testimonials() {
  const {
    name,
    label: heading,
    shortDescription: subHeading,
  } = navByName("testimonials");

  const { isSmallDevice } = useResponsive(carouselBreakpoints);

  const OPTIONS: EmblaOptionsType = {
    axis: "x",
    align: "start",
    slidesToScroll: "auto",
    loop: true,
  };

  const PLUGINS: EmblaPluginType[] = [
    Autoplay({ playOnInit: false, delay: 10000 }),
  ];

  const SLIDES = testimonials
    ? testimonials.map((testimonial, index) => (
        <TestimonialCard key={index} testimonial={testimonial} />
      ))
    : Array.from({ length: 2 }).map((_, index) => (
        <TestimonialSkeleton key={index} />
      ));

  const renderThumbContent = testimonials ? ThumbContent : ThumbContentSkeleton;

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
          renderThumbContent={renderThumbContent}
          enableAutoplay
          className="pt-2 md:pt-5"
        />
      </SectionInnerContent>
    </section>
  );
}
