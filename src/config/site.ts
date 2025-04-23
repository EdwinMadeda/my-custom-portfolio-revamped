import { getNavItemsByHref } from "@/lib/utils";

export const siteConfig = {
  name: "Custom Portfolio",
  title: "Edwin Madeda | Web Developer",
  description:
    "Explore the portfolio of Edwin Madeda, showcasing web development skills, projects, and technical expertise.",
  keyWords: [],
  authors: [{ name: "Edwin" }],
  creator: "Edwin Madeda",
  publisher: "Edwin Madeda",
};

export const navItems = [
  { name: "home", label: "Home", href: "#home" },
  { name: "about-me", label: "About Me", href: "#about-me" },
  { name: "skills", label: "Skills", href: "#skills" },
  { name: "works", label: "Works", href: "#works" },
  { name: "testimonials", label: "Testimonials", href: "#testimonials" },
  { name: "contact", label: "Contact", href: "#contact" },
] as const;

export const landingNavItems = () =>
  getNavItemsByHref([
    "#home",
    "#about-me",
    "#skills",
    "#testimonials",
    "#contact",
  ]);

export const profileDetailsNavItems = () => getNavItemsByHref([]);
