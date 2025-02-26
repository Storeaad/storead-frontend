"use client";

import { useState } from "react";

import { Pencil } from "lucide-react";

import { useQueryClient } from "@tanstack/react-query";

import { Profile } from "@/apis/generated/models";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QUERY_KEY } from "@/constants/queryKey";

import { useUpdateProfileMutation } from "../hooks/mutation/useUpdateProfileMutation";
import { useNameForm } from "../hooks/useNameForm";
import { UserNameProps } from "../type";

function UserName({ name: initialName, profileId }: UserNameProps) {
  const queryClient = useQueryClient();
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useNameForm(initialName);
  const isMe =
    profileId ===
    queryClient.getQueryData<Profile | undefined>([QUERY_KEY.MY_PROFILE])
      ?.profile_id;

  const updateMutation = useUpdateProfileMutation({
    setDisableForm: () => setIsEditing(false),
    setName: (name) => setName(name),
  });

  const onSubmit = (data: { name: string }) => {
    updateMutation.mutate({ name: data.name });
  };

  if (isEditing) {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center space-x-2"
      >
        <Input
          {...register("name", { required: true })}
          className="font-extrabold text-2xl"
        />
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
      </form>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <h2 className="font-extrabold text-2xl">{name}</h2>
      {isMe ? (
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="h-4 w-4 text-gray-500" />
        </Button>
      ) : null}
    </div>
  );
}

export default UserName;
