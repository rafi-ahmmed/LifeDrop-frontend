"use client";
import { useTheme } from "next-themes";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="cursor-pointer"
    >
      <IoSunny className=" size-6  text-yellow-400 dark:block hidden" />
      <FaMoon className="size-5 text-slate-900 dark:hidden block" />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
