import { useStore } from "@nanostores/react";
import React, { useEffect } from "react";
import { toggleDarkMode } from "../../atoms";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const $toggleDarkMode = useStore(toggleDarkMode);

  useEffect(() => {
    if ($toggleDarkMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("toggleDarkMode", $toggleDarkMode);
  }, [$toggleDarkMode]);

  return (
    <body className="leading-relaxed font-hack text-sm text-[var(--color-text)] bg-[var(--color-bg)] transition-colors duration-300">
      {children}
    </body>
  );
};

export default RootLayout;
