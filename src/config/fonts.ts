import { DM_Sans, Manrope } from "next/font/google";
import localFont from "next/font/local";

export const dmSans = DM_Sans({
  variable: "--font-dmSans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  style: "normal",
  display: "swap",
});

export const manrope = Manrope({
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin", "latin-ext"],
  style: "normal",
  display: "swap",
});

export const lemonJelly = localFont({
  src: [
    {
      path: "../assets/fonts/LemonJelly/Lemon Jelly Personal Use.woff",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-lemonJelly",
});

export const roadBlast = localFont({
  src: [
    {
      path: "../assets/fonts/RoadBlast/Road Blast!.woff",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-roadBlast",
});

export const rainbowBridge = localFont({
  src: [
    {
      path: "../assets/fonts/RainbowBridge/Rainbow Bridge Personal Use.woff",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-rainbowBridge",
});
