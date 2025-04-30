import { navItems } from "@/config/site";
import { NavHref, NavItem } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  if (typeof str !== "string") return str;
  return str
    .split(" ")
    .map((word) => word.charAt(0).toLocaleUpperCase() + str.slice(1))
    .join();
}

export function getNavItemsByHref(hrefs: NavHref[]): NavItem[] {
  return navItems.filter((item) => hrefs.includes(item.href));
}

export function chunkArray<T>(array: Array<T>, chunkSize: number): Array<T[]> {
  const chunkedArray: Array<T[]> = [];
  let index = 0;
  while (index < array.length) {
    chunkedArray.push(array.slice(index, index + chunkSize));
    index += chunkSize;
  }
  return chunkedArray;
}
