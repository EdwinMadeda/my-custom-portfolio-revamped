"use client";

import SectionContent from "@/components/section-content";
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
      <SectionContent>
        <ContactCard />
      </SectionContent>
    </section>
  );
}
