import { getNavItemsByHref } from "@/lib/utils";
import { NavItem, NavName } from "@/types";

export const siteConfig = {
  name: "My Custom Portfolio Revamped",
  title: "Edwin Madeda | Web Developer",
  description:
    "Explore the portfolio of Edwin Madeda, showcasing web development skills, projects, and technical expertise.",
  keyWords: [],
  authors: [{ name: "Edwin" }],
  creator: "Edwin Madeda",
  publisher: "Edwin Madeda",
};

export const navItems = [
  {
    name: "home",
    label: "Home",
    href: "#home",
    shortDescription: "Welcome! Discover what I do.",
    longDescription:
      "Welcome to my site! Explore what I do and how I can help you.",
  },
  {
    name: "about-me",
    label: "About Me",
    href: "#about-me",
    shortDescription: "Get to know my story and expertise.",
    longDescription: "Learn more about me, my journey, and my expertise.",
  },
  {
    name: "skills",
    label: "Skills",
    href: "#skills",
    shortDescription: "Explore my skills and tools.",
    longDescription:
      "Check out my skills, the tools I use, and how I bring value to projects.",
  },
  {
    name: "works",
    label: "Works",
    href: "#works",
    shortDescription: "Explore the work I've done and the skills I've honed.",
    longDescription:
      "Explore examples of my work and the value I'm doing across different domains.",
  },
  {
    name: "testimonials",
    label: "Testimonials",
    href: "#testimonials",
    shortDescription: "See feedback from those I've worked with.",
    longDescription: "See what others are saying about my work and impact.",
  },
  {
    name: "contact",
    label: "Contact",
    href: "#contact",
    shortDescription: "Reach out for inquiries or collaborations.",
    longDescription:
      "Get in touch with me for inquiries, collaborations, or just a chat!",
  },
] as const;

export const navByName = (name: NavName): NavItem =>
  Object.fromEntries(navItems.map((item) => [item.name, item]))[name];

export const landingNavItems = () =>
  getNavItemsByHref([
    "#home",
    "#about-me",
    "#skills",
    "#works",
    "#testimonials",
    "#contact",
  ]);

export const profileDetailsNavItems = () => getNavItemsByHref([]);
