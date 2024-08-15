"use client";

import { usePathname } from "next/navigation";

import SearchDialog from "@/components/article-search/search-dialog/search-dialog";

function SearchIcon() {
  const pathname = usePathname();

  if (["/", "/search"].includes(pathname)) return null;

  return <SearchDialog />;
}

export default SearchIcon;
