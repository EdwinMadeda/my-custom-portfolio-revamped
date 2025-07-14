import { icons } from "@/config/icons";

export const allPlatformLinks = [
  {
    label: "LinkedIn",
    bgColor: "#0A66C2",
    Icon: icons.linkedin,
    url: "",
  },
  {
    label: "GitHub",
    bgColor: "#333333",
    Icon: icons.github,
    url: "",
  },
  {
    label: "GitLab",
    bgColor: "#FC6D26",
    Icon: icons.gitlab,
    url: "",
  },
  {
    label: "Bitbucket",
    bgColor: "#2684FF",
    Icon: icons.bitbucket,
    url: "",
  },
  {
    label: "Stack Overflow",
    bgColor: "#EF8236",
    Icon: icons.stackoverflow,
    url: "",
  },
  {
    label: "Dev.to",
    bgColor: "#0A0A0A",
    Icon: icons["dev.to"],
    url: "",
  },
  {
    label: "LeetCode",
    bgColor: "#FFA116",
    Icon: icons.leetcode,
    url: "",
  },
  {
    label: "Medium",
    bgColor: "#FFC017",
    Icon: icons.medium,
    url: "",
  },
  {
    label: "YouTube",
    bgColor: "#FF0000",

    Icon: icons.youtube,
    url: "",
  },
  {
    label: "Twitter",
    bgColor: "#1DA1F2",

    Icon: icons.twitter,
    url: "",
  },
  {
    label: "Twitch",
    bgColor: "#9146FF",

    Icon: icons.twitch,
    url: "",
  },
  {
    label: "Vimeo",
    bgColor: "#1AB7EA",
    Icon: icons.vimeo,
    url: "",
  },
  {
    label: "Behance",
    bgColor: "#0057FF",
    Icon: icons.behance,
    url: "",
  },
  {
    label: "Dribbble",
    bgColor: "#EA4C89",
    Icon: icons.dribbble,
    url: "",
  },
  {
    label: "Reddit",
    bgColor: "#FF4500",
    Icon: icons.reddit,
    url: "",
  },
  {
    label: "Discord",
    bgColor: "#5865F2",
    Icon: icons.discord,
    url: "",
  },
  {
    label: "Slack",
    bgColor: "#4A154B",
    Icon: icons.slack,
    url: "",
  },
  {
    label: "Upwork",
    bgColor: "#6FDA44",
    Icon: icons.upwork,
    url: "",
  },
  {
    label: "Fiverr",
    bgColor: "#1DBF73",
    Icon: icons.fiverr,
    url: "",
  },
  {
    label: "Freelancer",
    bgColor: "#29B2FE",
    Icon: icons.freelancer,
    url: "",
  },
  {
    label: "AngelList",
    bgColor: "#000000",
    Icon: icons.angellist,
    url: "",
  },
  {
    label: "Email",
    bgColor: "#6FC2B0",
    Icon: icons.email,
    url: "",
  },
  {
    label: "Resume",
    bgColor: "#565F69",
    Icon: icons.resume,
    url: "",
  },
] as const;

export type PlatformLink = (typeof allPlatformLinks)[number];

export type PlatformLabel = PlatformLink["label"];

export const platformByLabel = Object.fromEntries(
  allPlatformLinks.map((item) => [item.label, item]),
) as Record<PlatformLabel, PlatformLink>;
