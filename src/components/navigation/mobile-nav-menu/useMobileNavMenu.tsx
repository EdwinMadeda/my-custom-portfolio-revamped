import { useEffect, useState } from "react";
import { useNavigation } from "../navigation-context";

export default function useMobileNavMenu() {
  const {
    mobileMenuState,
    toggleMobileMenu,
    currentHrefState: [, setCurrentHref],
    isCurrentHref,
    navItems,
  } = useNavigation();
  const [open, setOpen] = mobileMenuState;
  const [scaleClass, setScaleClass] = useState<{
    after: string;
    afterHover: string;
  } | null>(null);

  useEffect(() => {
    const scales = [
      "after:scale-x-[50%]",
      "after:scale-x-[60%]",
      "after:scale-x-[70%]",
      "after:scale-x-[80%]",
    ];
    const scaleHovers = [
      "hover:after:scale-x-[50%]",
      "hover:after:scale-x-[60%]",
      "hover:after:scale-x-[70%]",
      "hover:after:scale-x-[80%]",
    ];
    const randomizeScale = (scales: string[]) =>
      scales[Math.floor(Math.random() * scales.length)];

    setScaleClass({
      after: randomizeScale(scales),
      afterHover: randomizeScale(scaleHovers),
    });
  }, []);

  return {
    toggleMobileMenu,
    setCurrentHref,
    isCurrentHref,
    navItems,
    open,
    setOpen,
    scaleClass,
  };
}
