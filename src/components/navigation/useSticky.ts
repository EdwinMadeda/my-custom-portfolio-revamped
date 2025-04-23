import { useEffect, useRef, useState } from "react";

interface UseStickyOptions {
  /**
   * Scroll Y position at which to consider the header sticky
   */
  threshold?: number;
  enabled?: boolean;
}

export function useSticky<T extends HTMLElement>({
  threshold = 80,
  enabled = true,
}: UseStickyOptions = {}) {
  const ref = useRef<T>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      setIsSticky(window.scrollY > threshold);
    };

    handleScroll(); // Run initially

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enabled, threshold]);

  return [ref, isSticky] as const;
}
