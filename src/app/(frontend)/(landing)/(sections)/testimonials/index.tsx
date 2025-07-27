"use client";

import SectionInnerContent from "@/components/section-inner-content";
import { GradientHeading, SubHeading } from "@/components/typography";

import Autoplay from "embla-carousel-autoplay";
import { navByName } from "@/config/site";

import { TestimonialCard, TestimonialSkeleton } from "./testimonial";
import MyCustomCarousel from "@/components/my-custom-carousel";
import { EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import useResponsive from "@/hooks/useResponsive";
import { ThumbContent, ThumbContentSkeleton } from "./thumb-nail-content";
import { carouselBreakpoints } from "@/components/my-custom-carousel/carousel-breakpoints";
import { ProfileType } from "@/types";

export type TestimonialsType = ProfileType["testimonials"];

export type FeaturedTestimonials =
  NonNullable<TestimonialsType>["featuredTestimonials"];

export type SingleFeaturedTestimonial =
  NonNullable<FeaturedTestimonials>[number];

interface TestimonialsProps {
  testimonials: TestimonialsType;
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const {
    name,
    label: heading,
    shortDescription: subHeading,
  } = navByName("testimonials");

  const featuredTestimonials = testimonials?.featuredTestimonials;

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

  const SLIDES = testimonials?.featuredTestimonials
    ? testimonials.featuredTestimonials.map((featuredTestimonial) => (
        <TestimonialCard
          key={featuredTestimonial._id}
          featuredTestimonial={featuredTestimonial}
        />
      ))
    : Array.from({ length: 6 }).map((_, index) => (
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
