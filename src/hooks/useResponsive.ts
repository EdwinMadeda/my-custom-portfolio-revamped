import useMediaQuery from "./useMediaQuery";

export interface Breakpoints {
  smallMobile: { max: number };
  mobile: { min: number; max: number };
  tablet: { min: number; max: number };
  largeTablet: { min: number; max: number };
  desktop: { min: number };
}

interface useResponsiveReturnType {
  isSmallMobile: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isLargeTablet: boolean;
  isDesktop: boolean;
  isSmallDevice: boolean;
}

export default function useResponsive(
  breakpoints: Breakpoints,
): useResponsiveReturnType {
  const isSmallMobile = useMediaQuery(
    `(max-width: ${breakpoints.smallMobile.max}px)`,
  );
  const isMobile = useMediaQuery(
    `(min-width: ${breakpoints.mobile.min}px) and (max-width: ${breakpoints.mobile.max}px)`,
  );
  const isTablet = useMediaQuery(
    `(min-width: ${breakpoints.tablet.min}px) and (max-width: ${breakpoints.tablet.max}px)`,
  );
  const isLargeTablet = useMediaQuery(
    `(min-width: ${breakpoints.largeTablet.min}px) and (max-width:${breakpoints.largeTablet.max}px)`,
  );
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.desktop.min}px`);

  const isSmallDevice = isMobile || isSmallMobile || isTablet;

  return {
    isSmallMobile,
    isMobile,
    isTablet,
    isLargeTablet,
    isDesktop,
    isSmallDevice,
  };
}
