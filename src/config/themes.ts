// export const themes = ["light", "dark", "system"] as const;
export type Theme = (typeof themes)[keyof typeof themes];

export const themes = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

export const themeValues = Object.values(themes);
