import { useFormContext } from "react-hook-form";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  placeholder?: string;
}

const SearchForm = ({ placeholder = "검색어를 입력해주세요." }: Props) => {
  const { register } = useFormContext();

  return (
    <div className="flex gap-2">
      <Input
        {...register("query")}
        placeholder={placeholder}
        className="flex-grow"
      />
      <Button type="submit">
        <Search className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default SearchForm;
