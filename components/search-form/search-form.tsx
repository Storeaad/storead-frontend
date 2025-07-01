"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { useDebounce } from "@uidotdev/usehooks";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

interface Props {
  placeholder?: string;
}

const SearchForm = ({
  placeholder = "원하시는 서평을 검색해보세요.",
}: Props) => {
  const { register, watch } = useFormContext();
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<string[]>([]);
  const debouncedValue = useDebounce(watch("query", ""), 1000);

  // TODO: 검색어 추천 api 연동하기
  useEffect(() => {
    if (debouncedValue) {
      setOpen(true);
      setList((old) => [...old, debouncedValue]);
    } else {
      setOpen(false);
    }
  }, [debouncedValue]);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverAnchor className="w-full">
        <div className="relative w-full">
          <Input
            {...register("query")}
            placeholder={placeholder}
            className="w-full pr-12 py-6 shadow-md dark:shadow-white"
          />
          <Button
            type="submit"
            className="absolute right-0 top-0 h-full px-3"
            variant="ghost"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </PopoverAnchor>
      <PopoverContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <Command>
          <CommandList>
            <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
            <CommandGroup>
              {list.length > 0 &&
                list.map((item, idx) => (
                  <CommandItem key={idx}>{item}</CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchForm;
