"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchFormData {
  query: string;
}

interface Props {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

function ReviewListHeader({ onSearch, placeholder = "서평 검색..." }: Props) {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const { register, handleSubmit, reset, watch } = useForm<SearchFormData>();
  const router = useRouter();
  const searchQuery = watch("query");

  const onSubmit = (data: SearchFormData) => {
    if (data.query.trim()) {
      if (onSearch) {
        onSearch(data.query.trim());
      } else {
        router.push(`/search?query=${encodeURIComponent(data.query.trim())}`);
      }
    }
  };

  const handleClearSearch = () => {
    reset();
    setIsSearchMode(false);
    if (onSearch) {
      onSearch("");
    }
  };
  return (
    <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-10 p-6 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            전체 서평
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {isSearchMode ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <Input
                  {...register("query")}
                  placeholder={placeholder}
                  className="w-80 h-11 pl-4 pr-10 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200"
                  autoFocus
                />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleClearSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <Button
                type="submit"
                size="sm"
                className="h-11 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md rounded-xl transition-all duration-200"
              >
                <Search className="w-4 h-4" />
              </Button>
            </form>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSearchMode(true)}
              className="flex items-center gap-2 h-11 px-6 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 rounded-xl shadow-sm transition-all duration-200"
            >
              <Search className="w-4 h-4" />
              <span className="font-medium">검색</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewListHeader;
