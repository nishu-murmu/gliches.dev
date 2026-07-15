import { atom } from "nanostores";

const getInitialTheme = (): string => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("toggleDarkMode");
    if (stored === "dark" || stored === "light") return stored;
  }
  return "dark";
};

export const toggleDarkMode = atom(getInitialTheme());
