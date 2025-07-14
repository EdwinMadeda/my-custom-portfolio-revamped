import { navItems } from "@/config/site";
import { NavHref, NavItem } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { CountryCode, getExampleNumber } from "libphonenumber-js";
import { twMerge } from "tailwind-merge";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import examples from "libphonenumber-js/mobile/examples";
import { CountryName } from "./generated-countries";

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

export function getInitials(name: string, bgLuminance: number = 128): string {
  if (!name) {
    return "";
  }
  const textColor = getTextColorFromLuminance(bgLuminance);
  const words = name.trim().split(/\s+/);
  let initials = "";

  if (words.length === 1) initials = words[0][0].toUpperCase();
  else initials = `${words[0][0].toUpperCase()}${words[1][0].toUpperCase()}`;

  return `<span style="color: ${textColor};font-weight: 800;">${initials}</span>`;
}

export function generateBgFromName(
  name: string | undefined | null,
  alpha: number = 0.8,
): { bgColor: string; luminance?: number } {
  if (!name) return { bgColor: `rgba(255,255,255,${alpha})` };

  const combinedName = name.trim().replace(/\s+/g, "");

  let hash = 0;
  for (let i = 0; i < combinedName.length; i += 1) {
    hash = combinedName.charCodeAt(i) + ((hash << 5) - hash);
  }

  // name.charCodeAt() return an int between 0 and 65535
  // left shift (<<)  operator moves to left by number of specified
  // bites after <<. The whole for loop will create a color hash
  // based on username length

  // for (let i = 0; i < 3; i += 1) {
  //   const value = (hash >> (i * 8)) & 0xff;
  //   bgColor += `00${value.toString(16)}`.slice(-2);
  // }

  const r = (hash >> 16) & 0xff;
  const g = (hash >> 8) & 0xff;
  const b = hash & 0xff;

  const luminance = getLuminance(r, g, b);
  const bgColor = `rgba(${r},${g},${b},${alpha})`;

  return { bgColor, luminance };
}

export function generateTextColorFromHex(hex: string): string {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  const luminance = getLuminance(r, g, b);
  return getTextColorFromLuminance(luminance);
}

export function getLuminance(r: number, g: number, b: number): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getTextColorFromLuminance(luminance: number): string {
  return luminance > 128 ? "#000000" : "#FFFFFF";
}

export function getCountryDetails(countryCode: CountryCode) {
  countries.registerLocale(enLocale);
  const countryName = countries.getName(countryCode, "en") as CountryName;
  const exampleNumber = getExampleNumber(countryCode, examples);

  return {
    countryName,
    exampleNumber: exampleNumber?.formatNational() ?? "",
    exampleNumberAsNational: exampleNumber?.nationalNumber,
  };
}
