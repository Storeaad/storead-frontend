"use client";

import { Dispatch, FormEvent, SetStateAction, useState } from "react";

import { Check, X } from "lucide-react";
import { toast } from "sonner";

import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { commentListQueryOption } from "@/hooks/queryOptions/commentListQueryOption";
import { updateComment } from "@/lib/apis/comment/updateComment";

interface Props {
  content: string;
  commentId: string;
  articleId: string;
  handleEdit: Dispatch<SetStateAction<boolean>>;
}

function EditTextarea({ content, commentId, articleId, handleEdit }: Props) {
  const queryClient = useQueryClient();
  const [newContent, setNewContent] = useState(content);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateComment(commentId, newContent);
      queryClient.invalidateQueries({
        queryKey: commentListQueryOption(articleId).queryKey,
      });
      handleEdit(false);
      toast("댓글이 수정되었습니다.");
    } catch (err) {
      toast.error("댓글을 수정하지 못했습니다. 잠시후 다시 시도해주세요.");
    }
  };

  return (
    <TooltipProvider delayDuration={300}>
      <form
        onSubmit={handleSubmit}
        className="space-y-3 rounded-md border bg-card p-3 shadow-sm"
      >
        <Textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          rows={3}
          placeholder="댓글 수정..."
          className="resize-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
        />
        <div className="flex items-center justify-end space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(false)}
                aria-label="수정 취소"
              >
                <X className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>취소</p>
            </TooltipContent>
          </Tooltip>

          <Button
            type="submit"
            size="sm"
            className="bg-blue-500"
            disabled={!newContent.trim()}
          >
            {" "}
            <Check className="mr-1 h-4 w-4" />{" "}
          </Button>
        </div>
      </form>
    </TooltipProvider>
  );
}

export default EditTextarea;
