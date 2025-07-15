import { useStore } from "@nanostores/react";
import React, { useEffect } from "react";
import { toggleDarkMode } from "../../atoms";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const $toggleDarkMode = useStore(toggleDarkMode);

  useEffect(() => {
    if ($toggleDarkMode === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("toggleDarkMode", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("toggleDarkMode", "light");
    }
  }, [$toggleDarkMode || toggleDarkMode]);

  return (
    <body className="leading-relaxed font-hack text-sm text-[#1d1e20] bg-[#48e2d5] dark:text-[#FFFDF6] dark:bg-[#1d1e20] transition-colors duration-300">
      {children}
    </body>
  );
};

export default RootLayout;
