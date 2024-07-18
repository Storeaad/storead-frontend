"use client";

import { useEffect, useState } from "react";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Switch } from "../ui/switch";

function ThemeSwitch() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex items-center">
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="ml-2 text-sm">다크모드</span>
      </div>
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(isChecked) => setTheme(isChecked ? "dark" : "light")}
      />
    </div>
  );
}

export default ThemeSwitch;
