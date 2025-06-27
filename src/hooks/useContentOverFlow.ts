import React, { useLayoutEffect, useState } from "react";

export default function useContentOverFlow<T extends HTMLElement>({
  lineClamp = 5,
  tolerance = 5,
  contentRef,
}: {
  lineClamp?: number;
  tolerance?: number;
  contentRef: React.RefObject<T | null>;
}) {
  const [isOverflowing, setIsOverflowing] = useState(false);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const updateOverflowStatus = () => {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight || "24");

      if (isNaN(lineHeight) || !lineHeight) return;

      const maxHeight = lineHeight * lineClamp;
      const contentHeight = el.scrollHeight || 0;
      const isOverflowing = contentHeight > maxHeight + tolerance;

      // Debugging logs
      // console.log("lineHeight:", lineHeight); // Log the lineHeight to see what value you're getting
      // console.log("maxHeight:", maxHeight); // Log maxHeight to see how it's being calculated

      setIsOverflowing(isOverflowing);
    };

    updateOverflowStatus();
    const resizeObserver = new ResizeObserver(updateOverflowStatus);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [lineClamp, tolerance, contentRef]);

  return isOverflowing;
}
