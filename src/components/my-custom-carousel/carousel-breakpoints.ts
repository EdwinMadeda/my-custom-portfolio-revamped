import { Breakpoints } from "@/hooks/useResponsive";

export const carouselBreakpoints: Breakpoints = {
  smallMobile: { max: 639 },
  mobile: { min: 640, max: 767 },
  tablet: { min: 768, max: 1023 },
  largeTablet: { min: 1024, max: 1279 },
  desktop: { min: 1280 },
};
