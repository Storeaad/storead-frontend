import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { ReviewFormValue } from "../hooks/useReviewForm";

function BookRate() {
  const { control } = useFormContext<ReviewFormValue>();

  return (
    <FormField
      control={control}
      name="rating"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold">책 평점</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              placeholder="책 평점을 입력해주세요."
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default BookRate;
