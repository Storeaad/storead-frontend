"use client";

import { usePathname } from "next/navigation";

import SearchDialog from "@/components/article-search/search-dialog/search-dialog";

import AsideTooltip from "../aside-tooltip";

function SearchIcon() {
  const pathname = usePathname();

  if (["/", "/search"].includes(pathname)) return null;

  return (
    <AsideTooltip content="게시글 검색">
      <SearchDialog />
    </AsideTooltip>
  );
}

export default SearchIcon;
