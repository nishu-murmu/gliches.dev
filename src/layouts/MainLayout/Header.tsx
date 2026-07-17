import { Moon, Sun } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toggleDarkMode } from "../../atoms";
import { useStore } from "@nanostores/react";
import { siteConfig } from "../../config/site";

const { profile, navigation } = siteConfig;

const Header = () => {
  const [toggle, setToggle] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("toggleDarkMode") === "dark";
    }
    return true;
  });
  const [displayText, setDisplayText] = useState(profile.name);
  const [textColor, setTextColor] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const $toggleDarkMode = useStore(toggleDarkMode);

  const darkHoverColors = [
    "#FF00FF", // Neon Pink
    "#00FFFF", // Cyan
    "#00FF00", // Neon Green
    "#FFFF00", // Yellow
    "#FF69B4", // Hot Pink
    "#8A2BE2", // Blue Violet
    "#FFA500", // Orange
    "#00FFFF", // Aqua
    "#FF1493", // Deep Pink
    "#7FFF00", // Chartreuse
  ];

  const lightHoverColors = [
    "#7C3AED",
    "#1D4ED8",
    "#0F766E",
    "#B45309",
    "#BE185D",
    "#6D28D9",
    "#15803D",
    "#9A3412",
  ];

  const getRandomText = (length: number): string => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const startGlitchAnimation = () => {
    const input1 = profile.name;
    const input2 = profile.brand;
    const maxLength = Math.max(input1.length, input2.length);
    const totalIterations = 10;
    setDisplayText(input1);
    let iterationCount = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    const hoverColors =
      $toggleDarkMode === "dark" ? darkHoverColors : lightHoverColors;

    intervalRef.current = setInterval(() => {
      iterationCount++;
      if (iterationCount >= totalIterations) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setDisplayText(input2);
        setTextColor($toggleDarkMode === "dark" ? "#48e2d5" : "#6d28d9");
        return;
      }

      const randomColor =
        hoverColors[Math.floor(Math.random() * hoverColors.length)];
      setTextColor(randomColor);
      setDisplayText(getRandomText(maxLength));
    }, 50);
  };

  const toggleDarkModeHandler = () => {
    const currentMode = $toggleDarkMode === "dark" ? "light" : "dark";
    toggleDarkMode.set(currentMode);
    setToggle(currentMode === "dark");
  };

  useEffect(() => {
    if (isHovered) {
      timeoutRef.current = setTimeout(() => {
        startGlitchAnimation();
      }, 100);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayText(profile.name);
      setTextColor("");
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, $toggleDarkMode]);

  return (
    <header className="bg-[var(--color-header-bg)] border-b border-[var(--color-border)] sticky top-0 z-50 shadow-sm backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-8 flex justify-between items-center h-16">
        <div
          className="logo"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h1 className="text-xl font-semibold">
            <a
              href="/"
              className="transition-all duration-300 text-[var(--color-text)]"
              style={{ color: textColor || "" }}
            >
              {displayText}
            </a>
          </h1>
        </div>
        <nav className="flex items-center gap-6">
          <ul className="hidden md:flex list-none gap-8 items-center">
            <li>
              <a
                href="/blogs"
              className="text-[var(--color-muted)] font-medium hover:text-[var(--color-accent)] transition-colors duration-300"
              >
                {navigation.blogsLabel}
              </a>
            </li>
          </ul>
          <button
            onClick={toggleDarkModeHandler}
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
          >
            {toggle ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
