"use client";

import { useTheme } from "next-themes";
import React from "react";
import SunIcon from "@/assets/svgs/sun.svg";
import MoonIcon from "@/assets/svgs/moon.svg";

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const handleToggleTheme = () => {
    if (resolvedTheme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <button onClick={handleToggleTheme} className="animate-bounce">
      {resolvedTheme === "dark" && <SunIcon className="w-[25px] h-[25px]" />}
      {resolvedTheme === "light" && <MoonIcon className="w-[25px] h-[25px]" />}
    </button>
  );
};

export default ThemeToggle;
