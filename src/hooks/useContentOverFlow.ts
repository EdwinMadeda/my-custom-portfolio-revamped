import React, { useLayoutEffect, useState } from "react";

export default function useContentOverFlow<T extends HTMLElement>({
  lineClamp = 4,
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
      setIsOverflowing(el.scrollHeight > maxHeight + tolerance);
    };

    updateOverflowStatus();
    const resizeObserver = new ResizeObserver(updateOverflowStatus);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [lineClamp, tolerance]);

  return isOverflowing;
}
