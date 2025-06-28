interface TechItem {
  label: string;
  content: string;
}

interface TechCategory {
  category: string;
  items: TechItem[];
}

export const techStackInfo: TechCategory[] = [
  {
    category: "Frontend",
    items: [
      {
        label: "Next.js",
        content:
          "A React framework for server-side rendering and static site generation.",
      },
      {
        label: "React",
        content: "JavaScript library for building user interfaces.",
      },
      {
        label: "Tailwind CSS",
        content: "Utility-first CSS framework for fast UI development.",
      },
      {
        label: "Shadcn/ui",
        content: "A UI component library built with Tailwind CSS and React.",
      },
    ],
  },
  {
    category: "CMS",
    items: [
      {
        label: "Sanity.io",
        content: "Headless CMS for structured content management.",
      },
    ],
  },
  {
    category: "Styling",
    items: [{ label: "Tailwind CSS", content: "Utility-first CSS framework." }],
  },
  {
    category: "Development Tools",
    items: [
      {
        label: "GitHub",
        content: "Platform for version control and collaboration.",
      },
      {
        label: "Git",
        content: "Distributed version control system.",
      },
    ],
  },
];
