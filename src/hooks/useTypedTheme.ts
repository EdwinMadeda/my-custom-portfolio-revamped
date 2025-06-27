import { Theme } from "@/config/themes";
import { useTheme } from "next-themes";

export default function useTypedTheme() {
  const { theme, setTheme, resolvedTheme, ...rest } = useTheme();
  return {
    theme: theme as Theme | undefined,
    setTheme: setTheme as (theme: Theme) => void,
    resolvedTheme: resolvedTheme as Theme | undefined,
  };
}
