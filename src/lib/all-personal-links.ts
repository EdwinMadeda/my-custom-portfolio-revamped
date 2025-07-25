import { icons } from "@/config/icons";

export const platformLinks = [
  {
    label: "LinkedIn",
    value: "linkedin",
    bgColor: "#0A66C2",
    Icon: icons.linkedin,
    description: "Professional Networking",
  },
  {
    label: "GitHub",
    value: "github",
    bgColor: "#333333",
    Icon: icons.github,
    description: "Developer Portfolio",
  },
  {
    label: "GitLab",
    value: "gitlab",
    bgColor: "#FC6D26",
    Icon: icons.gitlab,
    description: "Code Hosting & Collaboration",
  },
  {
    label: "Bitbucket",
    value: "bitbucket",
    bgColor: "#2684FF",
    Icon: icons.bitbucket,
    description: "Source Code Collaboration",
  },
  {
    label: "Stack Overflow",
    value: "stackoverflow",
    bgColor: "#EF8236",
    Icon: icons.stackoverflow,
    description: "Developer Expertise & Collaboration",
  },
  {
    label: "Dev.to",
    value: "devto",
    bgColor: "#0A0A0A",
    Icon: icons["dev.to"],
    description: "Developer Blogging",
  },
  {
    label: "LeetCode",
    value: "leetcode",
    bgColor: "#FFA116",
    Icon: icons.leetcode,
    description: "Coding Challenges & Practice",
  },
  {
    label: "Medium",
    value: "medium",
    bgColor: "#FFC017",
    Icon: icons.medium,
    description: "Blogging & Thought Leadership",
  },
  {
    label: "YouTube",
    value: "youtube",
    bgColor: "#FF0000",
    Icon: icons.youtube,
    description: "Video Portfolio & Tutorials",
  },
  {
    label: "Twitter",
    value: "twitter",
    bgColor: "#1DA1F2",
    Icon: icons.twitter,
    description: "Tech Community Engagement",
  },
  {
    label: "Twitch",
    value: "twitch",
    bgColor: "#9146FF",
    Icon: icons.twitch,
    description: "Live Streaming for Developers & Creatives",
  },
  {
    label: "Vimeo",
    value: "vimeo",
    bgColor: "#1AB7EA",
    Icon: icons.vimeo,
    description: "Video Projects Showcase",
  },
  {
    label: "Behance",
    value: "behance",
    bgColor: "#0057FF",
    Icon: icons.behance,
    description: "Creative Portfolio",
  },
  {
    label: "Dribbble",
    value: "dribbble",
    bgColor: "#EA4C89",
    Icon: icons.dribbble,
    description: "UI/UX & Design Showcase",
  },
  {
    label: "Reddit",
    value: "reddit",
    bgColor: "#FF4500",
    Icon: icons.reddit,
    description: "Community Discussions & Knowledge Sharing",
  },
  {
    label: "Discord",
    value: "discord",
    bgColor: "#5865F2",
    Icon: icons.discord,
    description: "Networking & Professional Communities",
  },
  {
    label: "Slack",
    value: "slack",
    bgColor: "#4A154B",
    Icon: icons.slack,
    description: "Team Collaboration & Communication",
  },
  {
    label: "Upwork",
    value: "upwork",
    bgColor: "#6FDA44",
    Icon: icons.upwork,
    description: "Freelancer Job Platform",
  },
  {
    label: "Fiverr",
    value: "fiverr",
    bgColor: "#1DBF73",
    Icon: icons.fiverr,
    description: "Freelance Services Showcase",
  },
  {
    label: "Freelancer",
    value: "freelancer",
    bgColor: "#29B2FE",
    Icon: icons.freelancer,
    description: "Freelance Marketplace",
  },
  {
    label: "AngelList",
    value: "angellist",
    bgColor: "#000000",
    Icon: icons.angellist,
    description: "Networking with Startups",
  },
] as const;

export const additionalLinks = [
  {
    label: "Email",
    value: "email",
    bgColor: "#6FC2B0",
    Icon: icons.email,
    description: "Direct Contact",
  },
  {
    name: "phone",
    label: "Phone",
    bgColor: "#34b7f1",
    Icon: icons.phone,
    description: "Contact by Phone",
  },
  {
    label: "Resume",
    value: "resume",
    bgColor: "#565F69",
    Icon: icons.resume,
    description: "CV / Professional Summary",
  },
] as const;

export const allPersonalLinks = [...platformLinks, ...additionalLinks];

export type PlatformLink = (typeof platformLinks)[number];

export type BasePersonalLink = (typeof allPersonalLinks)[number];

export type PersonalLink = BasePersonalLink & { url: string };

export type PersonalLinkLabel = BasePersonalLink["label"];

export const personalLinkByLabel = Object.fromEntries(
  allPersonalLinks.map((item) => [item.label, { ...item, url: "" }]),
) as Record<PersonalLinkLabel, PersonalLink>;
