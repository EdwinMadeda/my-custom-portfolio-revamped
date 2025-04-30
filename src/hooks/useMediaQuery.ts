import { useEffect, useState } from "react";

export default function useMediaQuery(
  queryString: string,
  defaultValue = false,
) {
  const [matches, setMatches] = useState(defaultValue);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(queryString);
    const handleChange = () => setMatches(mediaQueryList.matches);
    handleChange();
    mediaQueryList.addEventListener("change", handleChange);

    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [queryString]);

  return matches;
}
