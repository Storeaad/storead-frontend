"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

import AsideTooltip from "../aside-tooltip";

function AsideThemeButton() {
  const { theme, setTheme, systemTheme } = useTheme();
  return (
    <AsideTooltip content="테마 변경">
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
    </AsideTooltip>
  );
}

export default AsideThemeButton;
