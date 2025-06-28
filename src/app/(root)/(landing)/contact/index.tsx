"use client";

import SectionInnerContent from "@/components/section-inner-content";
import { GradientHeading, SubHeading } from "@/components/typography";
import { navByName } from "@/config/site";
import ContactCard from "./contact-card";

export default function Contact() {
  const {
    name,
    label: heading,
    longDescription: subHeading,
  } = navByName("contact");

  return (
    <section
      id={name}
      className="content"
      aria-labelledby={name}
      aria-describedby={`${name}-desc`}
    >
      <GradientHeading>{heading}</GradientHeading>
      <SubHeading>{subHeading}</SubHeading>
      <SectionInnerContent>
        <div className="pt-2 md:pt-4">
          <ContactCard />
        </div>
      </SectionInnerContent>
    </section>
  );
}
