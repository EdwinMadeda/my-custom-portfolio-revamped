export interface Project {
  title: string;
  slug: string;
  status: string;
  thumbnail: string;
  description: string;
  technologiesUsed: string[];
  liveDemoLink: string;
  repoLink: string;
  detailedDescription: string[];
  date: string;
  previewImage: string;
}

export const projects: Project[] = [
  {
    title: "Portfolio Website",
    slug: "portfolio-website",
    status: "published",
    thumbnail: "/images/portfolio-thumbnail.jpg",
    description:
      "A modern developer portfolio with responsive design and SEO optimization.",
    technologiesUsed: ["React", "Next.js", "Tailwind CSS"],
    liveDemoLink: "https://yourdomain.com",
    repoLink: "https://github.com/yourhandle/portfolio",
    detailedDescription: [
      "Built using a modern tech stack to highlight skills, experience, and projects.",
      "Includes dark mode, performance optimizations, and dynamic content loading.",
    ],
    date: "2024-06-15",
    previewImage: "/images/portfolio-preview.jpg",
  },
  {
    title: "E-commerce Platform",
    slug: "ecommerce-platform",
    status: "draft",
    thumbnail: "/images/ecommerce-thumbnail.jpg",
    description:
      "A full-stack e-commerce platform with cart, payments, and admin dashboard.",
    technologiesUsed: ["React", "Node.js", "MongoDB", "Stripe"],
    liveDemoLink: "https://shop.example.com",
    repoLink: "https://github.com/yourhandle/ecommerce-platform",
    detailedDescription: [
      "Supports user authentication, order tracking, and inventory management.",
      "Built with a focus on performance, scalability, and mobile-first design.",
    ],
    date: "2023-12-01",
    previewImage: "/images/ecommerce-preview.jpg",
  },
  {
    title: "Blog CMS",
    slug: "blog-cms",
    status: "published",
    thumbnail: "/images/blog-thumbnail.jpg",
    description:
      "A content management system for blogs with markdown and WYSIWYG support.",
    technologiesUsed: ["Next.js", "Sanity", "Tailwind CSS"],
    liveDemoLink: "https://blog.example.com",
    repoLink: "https://github.com/yourhandle/blog-cms",
    detailedDescription: [
      "Includes user-friendly dashboard for authors and content scheduling.",
      "SEO-friendly, fast-loading blog pages with support for custom components.",
    ],
    date: "2023-10-20",
    previewImage: "/images/blog-preview.jpg",
  },
  {
    title: "Job Board",
    slug: "job-board",
    status: "published",
    thumbnail: "/images/jobboard-thumbnail.jpg",
    description:
      "A niche job board for remote developer roles with filtering and applications.",
    technologiesUsed: ["React", "Express", "PostgreSQL", "Tailwind"],
    liveDemoLink: "https://jobs.example.com",
    repoLink: "https://github.com/yourhandle/job-board",
    detailedDescription: [
      "Employers can post jobs and view applicants.",
      "Job seekers can filter, apply, and bookmark listings.",
    ],
    date: "2023-09-05",
    previewImage: "/images/jobboard-preview.jpg",
  },
  {
    title: "Fitness Tracker App",
    slug: "fitness-tracker-app",
    status: "published",
    thumbnail: "/images/fitness-thumbnail.jpg",
    description:
      "A cross-platform app to track workouts, calories, and fitness goals.",
    technologiesUsed: ["React Native", "Expo", "Firebase"],
    liveDemoLink: "https://fitness.example.com",
    repoLink: "https://github.com/yourhandle/fitness-tracker",
    detailedDescription: [
      "Tracks progress, supports reminders, and integrates with wearable devices.",
      "Syncs user data in real-time with Firebase.",
    ],
    date: "2024-01-11",
    previewImage: "/images/fitness-preview.jpg",
  },
  {
    title: "Admin Dashboard",
    slug: "admin-dashboard",
    status: "draft",
    thumbnail: "/images/dashboard-thumbnail.jpg",
    description:
      "An admin dashboard template with charts, tables, and user management.",
    technologiesUsed: ["Vue.js", "Chart.js", "Tailwind CSS"],
    liveDemoLink: "https://admin.example.com",
    repoLink: "https://github.com/yourhandle/admin-dashboard",
    detailedDescription: [
      "Customizable layout with responsive sidebar navigation.",
      "Interactive data visualizations and CRUD operations for user roles.",
    ],
    date: "2023-07-30",
    previewImage: "/images/dashboard-preview.jpg",
  },
];
