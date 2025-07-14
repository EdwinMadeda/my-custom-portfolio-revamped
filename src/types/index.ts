import { navItems } from "@/config/site";

export type StateTuple<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export type NavItem = (typeof navItems)[number];
export type NavName = NavItem["name"];
export type NavHref = NavItem["href"];
