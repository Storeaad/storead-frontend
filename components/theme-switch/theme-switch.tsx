"use client";

import { useEffect, useState } from "react";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "../ui/button";
import { Switch } from "../ui/switch";

interface Props {
  isIcon?: boolean;
}

function ThemeSwitch({ isIcon }: Props) {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {isIcon === true ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {(theme == null && systemTheme === "dark") || theme === "dark" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
      ) : (
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center">
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="ml-2 text-sm">다크모드</span>
          </div>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={(isChecked) =>
              setTheme(isChecked ? "dark" : "light")
            }
          />
        </div>
      )}
    </>
  );
}

export default ThemeSwitch;
