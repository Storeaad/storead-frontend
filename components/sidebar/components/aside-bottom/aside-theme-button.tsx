"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";

const AsideTooltip = dynamic(() => import("../aside-tooltip"), { ssr: false });

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
