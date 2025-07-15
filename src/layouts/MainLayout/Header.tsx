import { Moon, Sun } from "lucide-react";
import { useState, useRef, useEffect, useContext } from "react";
import { toggleDarkMode } from "../../atoms";
import { useStore } from "@nanostores/react";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [displayText, setDisplayText] = useState("Nishu Murmu");
  const [textColor, setTextColor] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const $toggleDarkMode = useStore(toggleDarkMode);

  const psychedelicColors = [
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
    const input1 = "Nishu Murmu";
    const input2 = "_Gliches_";
    const maxLength = Math.max(input1.length, input2.length);
    const totalIterations = 10;
    setDisplayText(input1);
    let iterationCount = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      iterationCount++;
      if (iterationCount >= totalIterations) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setDisplayText(input2);
        setTextColor("#48e2d5"); // Reset color
        return;
      }

      // Set random psychedelic color
      const randomColor =
        psychedelicColors[Math.floor(Math.random() * psychedelicColors.length)];
      setTextColor(randomColor);
      setDisplayText(getRandomText(maxLength));
    }, 50); // Adjust speed here
  };

  const toggleDarkModeHandler = () => {
    setToggle((prev) => !prev);
    const currentMode = $toggleDarkMode == "dark" ? "light" : "dark";
    toggleDarkMode.set(currentMode);
    localStorage.setItem("toggleDarkMode", currentMode);
  };

  useEffect(() => {
    if (isHovered) {
      timeoutRef.current = setTimeout(() => {
        startGlitchAnimation();
      }, 100);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayText("Nishu Murmu");
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered]);

  return (
    <header className="bg-white/50 dark:bg-[#2d2e30]/50 border-b border-gray-200 dark:border-gray-600 sticky top-0 z-50 shadow-sm backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-8 flex justify-between items-center h-16">
        <div
          className="logo"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h1 className="text-xl font-semibold">
            <a
              href="/"
              className="transition-all duration-300 dark:text-[#FFFDF6] text-[#1d1e20]"
              style={{ color: textColor || "" }} // Apply dynamic color
            >
              {displayText}
            </a>
          </h1>
        </div>
        <nav className="flex items-center gap-6">
          <ul className="hidden md:flex list-none gap-8 items-center">
            <li>
              <a
                href="/projects"
                className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="/blogs"
                className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                Blogs
              </a>
            </li>
            <li>
              <a
                href="/interests"
                className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                Interests
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
