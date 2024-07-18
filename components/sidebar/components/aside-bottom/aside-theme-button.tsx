"use client";

import { useTheme } from "next-themes";

import ThemeSwitch from "@/components/theme-switch/theme-switch";

import AsideTooltip from "../aside-tooltip";

function AsideThemeButton() {
  const { theme } = useTheme();

  return (
    <AsideTooltip
      content={`${theme === "dark" ? "라이트" : "다크"} 테마로 변경`}
    >
      <ThemeSwitch isIcon={true} />
    </AsideTooltip>
  );
}

export default AsideThemeButton;
