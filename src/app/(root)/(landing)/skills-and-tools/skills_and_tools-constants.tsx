import { Breakpoints } from "@/hooks/useResponsive";

export interface SkillOrTool {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const skills_and_tools: SkillOrTool[] = [
  {
    title: "HTML5",
    description:
      "Semantic and accessible markup, forming the foundation of every modern web page.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4h16l-1.5 18L12 20l-6.5 2L4 4z"
      />
    ),
  },
  {
    title: "CSS3 & Tailwind",
    description:
      "From classic stylesheets to utility-first design systems like Tailwind CSS.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 7h18M3 12h18M3 17h18"
      />
    ),
  },
  // {
  //   title: "JavaScript (ES6+)",
  //   description:
  //     "Dynamic and powerful scripting for interactivity and application logic.",
  //   icon: (
  //     <path
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //       strokeWidth={2}
  //       d="M11 17l-5-5 5-5m2 10l5-5-5-5"
  //     />
  //   ),
  // },
  // {
  //   title: "TypeScript",
  //   description:
  //     "A typed superset of JavaScript that enhances reliability and productivity.",
  //   icon: (
  //     <path
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //       strokeWidth={2}
  //       d="M4 4h16v16H4z"
  //     />
  //   ),
  // },
  {
    title: "React & Next.js",
    description:
      "Modern frameworks for building fast, scalable and SEO-friendly SPAs.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3"
      />
    ),
  },
  {
    title: "Node.js",
    description:
      "JavaScript runtime built for building fast and scalable server-side applications.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 2l9 5v10l-9 5-9-5V7z"
      />
    ),
  },
  {
    title: "MySQL",
    description:
      "Relational database system for structured data management and querying.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 10h16M4 14h16M4 18h16"
      />
    ),
  },
  {
    title: "PHP",
    description:
      "Server-side scripting language powering many web applications and CMS platforms.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18V6h4a4 4 0 010 8H6m8 4V6h4"
      />
    ),
  },
  {
    title: "Git & GitHub",
    description:
      "Version control and collaboration tools essential for any developer workflow.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 2a10 10 0 00-3 19.5c.5.1.7-.2.7-.5v-1.6c-2.9.6-3.5-1.4-3.5-1.4a2.7 2.7 0 00-1.1-1.5c-.9-.6.1-.6.1-.6a2.2 2.2 0 011.6 1 2.2 2.2 0 003 1 2.2 2.2 0 01.6-1.4c-2.3-.3-4.6-1.1-4.6-4.9a3.8 3.8 0 011-2.6 3.5 3.5 0 01.1-2.6s.9-.3 2.8 1a9.6 9.6 0 015 0c1.9-1.3 2.8-1 2.8-1a3.5 3.5 0 01.1 2.6 3.8 3.8 0 011 2.6c0 3.9-2.4 4.6-4.6 4.9a2.5 2.5 0 01.7 2v3c0 .3.2.6.7.5A10 10 0 0012 2z"
      />
    ),
  },
  {
    title: "Docker",
    description:
      "Containerization tool for consistent environments across development and production.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 12h16M4 6h16M4 18h16"
      />
    ),
  },
];
