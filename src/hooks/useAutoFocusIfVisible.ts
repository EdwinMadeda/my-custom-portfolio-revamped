import React from "react";

export default function useAutoFocusIfVisible<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.focus();
      },
      {
        threshold: 0.5,
      },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
