"use client";

import { useState } from "react";

import { useTheme } from "next-themes";

import { useQueryClient } from "@tanstack/react-query";

import { Profile } from "@/apis/generated/models";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { QUERY_KEY } from "@/constants/queryKey";
import { cn } from "@/lib/utils";

import { useUpdateProfileMutation } from "../hooks/mutation/useUpdateProfileMutation";
import { useIntroduceForm } from "../hooks/useIntroduceForm";
import { IntroduceProps } from "../type";

function Introduce({ introduce: initialIntroduce, profileId }: IntroduceProps) {
  const { theme } = useTheme();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [introduce, setIntroduce] = useState(initialIntroduce);
  const { register, handleSubmit, reset } = useIntroduceForm(introduce);
  const updateMutation = useUpdateProfileMutation({
    setDisableForm: () => setIsEditing(false),
    setIntroduce: (content) => setIntroduce(content),
  });
  const isMe =
    profileId ===
    queryClient.getQueryData<Profile | undefined>([QUERY_KEY.MY_PROFILE])
      ?.profile_id;

  const onSubmit = (data: { introduce: string }) => {
    updateMutation.mutate({ about_me: data.introduce });
  };

  return (
    <div
      className={cn(
        "min-w-52 min-h-36 flex flex-col justify-between p-4 bg-amber-100 rounded-lg shadow-md hover:shadow-lg transition-shadow",
        theme === "dark" && "shadow-slate-500 hover:shadow-slate-400",
      )}
    >
      {isMe ? (
        isEditing ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col h-full"
          >
            <Textarea
              {...register("introduce")}
              className="flex-grow mb-2 text-black bg-transparent"
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="submit"
                variant="outline"
                size="sm"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? "저장 중..." : "저장"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsEditing(false);
                  reset();
                }}
              >
                취소
              </Button>
            </div>
          </form>
        ) : (
          <pre
            className="font-sans text-black flex-grow cursor-text"
            onClick={() => setIsEditing(true)}
          >
            {introduce}
          </pre>
        )
      ) : (
        <pre className="font-sans text-black flex-grow cursor-text">
          {introduce}
        </pre>
      )}
    </div>
  );
}

export default Introduce;
