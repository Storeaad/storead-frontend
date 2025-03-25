"use client";

import { ChangeEventHandler, useState } from "react";

import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { useQueryClient } from "@tanstack/react-query";

import { Profile } from "@/apis/generated/models";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QUERY_KEY } from "@/constants/queryKey";

import { useUpdateProfileMutation } from "../hooks/mutation/useUpdateProfileMutation";
import { ProfileImageProps } from "../type";

function ProfileImage({ initialImageUrl, profileId }: ProfileImageProps) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const isMe =
    profileId ===
    queryClient.getQueryData<Profile | undefined>([QUERY_KEY.MY_PROFILE])
      ?.profile_id;

  const updateMutation = useUpdateProfileMutation({
    setDisableForm: () => setIsEditing(false),
    setName: (name) => setImageUrl(name),
  });

  const handleUpdateImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsEditing(true);
    const files = e.target.files;

    if (files instanceof File) {
      const file = files[0];
      updateMutation.mutate({ profile_photo: file });
    } else {
      toast("파일 타입이 아닙니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="relative flex gap-2">
      <Avatar className="w-40 h-40">
        <AvatarImage src={imageUrl} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {isMe && (
        <Button
          variant="outline"
          size="icon"
          className="rounded-full absolute bottom-0 right-0 cursor-pointer"
          asChild
        >
          <label>
            <Input
              type="file"
              className="hidden"
              onChange={handleUpdateImage}
              disabled={isEditing}
            />
            <Pencil className="h-4 w-4 text-gray-500" />
          </label>
        </Button>
      )}
    </div>
  );
}

export default ProfileImage;
