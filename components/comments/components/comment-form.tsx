"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addCommentMutationOption } from "@/hooks/mutationOptions/addCommentMutationOption";
import { commentListQueryOption } from "@/hooks/queryOptions/commentListQueryOption";

interface Props {
  articleId: string;
}

const formSchema = z.object({
  content: z.string().min(2, {
    message: "2글자 이상 입력해주세요.",
  }),
});

function CommentForm({ articleId }: Props) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const { mutate, isPending } = useMutation({
    ...addCommentMutationOption(articleId),
    onMutate: () => form.reset(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentListQueryOption(articleId).queryKey,
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({ content: values.content });
  }

  return (
    <Card className="w-full bg-secondary">
      <CardContent className="pt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="댓글을 입력해주세요."
                        disabled={isPending}
                        className="flex-grow"
                        {...field}
                      />
                      <Button
                        type="submit"
                        disabled={isPending}
                      >
                        {isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            전송 중
                          </>
                        ) : (
                          "댓글 작성"
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default CommentForm;
