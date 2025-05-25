"use client";

import { useEffect, useRef, useState } from "react";

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

  const formRef = useRef<HTMLFormElement>(null); // form 참조를 위한 ref 생성

  useEffect(() => {
    // 외부 클릭 시 편집 취소하는 함수
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        if (isEditing) {
          setIsEditing(false);
          reset({ introduce: initialIntroduce }); // react-hook-form의 값을 초기값으로 리셋
          setIntroduce(initialIntroduce); // 컴포넌트 상태도 초기값으로 리셋
        }
      }
    };

    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing, initialIntroduce, reset, setIntroduce]); // 의존성 배열에 initialIntroduce, setIntroduce 추가

  const onSubmit = (data: { introduce: string }) => {
    updateMutation.mutate({ about_me: data.introduce });
  };

  return (
    <div
      className={cn(
        "min-w-52 flex flex-col justify-between p-4 rounded-lg border", // 배경색 및 그림자 제거, 테두리 추가
        theme === "dark" ? "border-neutral-700" : "border-neutral-300", // 테마에 따른 테두리 색상
        // "min-w-52 min-h-36 flex flex-col justify-between p-4 bg-amber-100 rounded-lg shadow-md hover:shadow-lg transition-shadow",
        // theme === "dark" && "shadow-slate-500 hover:shadow-slate-400",
      )}
    >
      {isMe ? (
        isEditing ? (
          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col h-full"
          >
            <Textarea
              {...register("introduce")}
              className={cn(
                "flex-grow mb-2 bg-transparent border-none focus:ring-0", // 배경과 테두리 투명 유지
                theme === "dark" ? "text-neutral-200" : "text-neutral-800", // 테마에 따른 텍스트 색상
              )}
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
              {/* <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsEditing(false);
                  reset();
                }}
              >
                취소
              </Button> */}
            </div>
          </form>
        ) : (
          <pre
            className={cn(
              "flex-grow mb-2 bg-transparent", // 배경 투명 유지
              theme === "dark" ? "text-neutral-200" : "text-neutral-800", // 테마에 따른 텍스트 색상
            )}
            onClick={() => setIsEditing(true)}
          >
            {introduce}
          </pre>
        )
      ) : (
        <pre
          className={cn(
            "flex-grow mb-2 bg-transparent", // 배경 투명 유지
            theme === "dark" ? "text-neutral-200" : "text-neutral-800", // 테마에 따른 텍스트 색상
          )}
        >
          {introduce}
        </pre>
      )}
    </div>
  );
}

export default Introduce;
