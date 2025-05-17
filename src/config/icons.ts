import { IconType } from "react-icons";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaYoutube,
  FaBehance,
  FaBitbucket,
  FaDribbble,
  FaMedium,
  FaAngellist,
  FaStackOverflow,
  FaDiscord,
  FaTwitch,
  FaVimeo,
} from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { SiUpwork, SiFiverr, SiReddit, SiGitlab } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";
import { SiSlack } from "react-icons/si";
import { SiFreelancer } from "react-icons/si";
import DevToSvg from "@/components/svg-icons/dev.to-svg";
import LeetCodeSvg from "@/components/svg-icons/leetcode-svg";

export const socialPlatformNames = [
  "linkedin",
  "github",
  "gitlab",
  "bitbucket",
  "stackoverflow",
  "dev.to",
  "leetcode",
  "medium",
  "youtube",
  "twitter",
  "twitch",
  "vimeo",
  "behance",
  "dribbble",
  "reddit",
  "discord",
  "slack",
  "upwork",
  "fiverr",
  "freelancer",
  "angellist",
] as const;

export type SocialPlatform = (typeof socialPlatformNames)[number];

export const icons: Record<SocialPlatform | "resume" | "email", IconType> = {
  linkedin: FaLinkedin,
  github: FaGithub,
  bitbucket: FaBitbucket,
  twitter: FaTwitter,
  youtube: FaYoutube,
  behance: FaBehance,
  dribbble: FaDribbble,
  medium: FaMedium,
  upwork: SiUpwork,
  fiverr: SiFiverr,
  angellist: FaAngellist,
  stackoverflow: FaStackOverflow,
  gitlab: SiGitlab,
  reddit: SiReddit,
  discord: FaDiscord,
  twitch: FaTwitch,
  vimeo: FaVimeo,
  email: HiOutlineMail,
  resume: BsFillPersonLinesFill,
  "dev.to": DevToSvg,
  leetcode: LeetCodeSvg,
  slack: SiSlack,
  freelancer: SiFreelancer,
};
