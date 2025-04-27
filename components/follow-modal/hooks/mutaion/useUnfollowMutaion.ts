"use client";

import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEY } from "@/constants/queryKey";
import { userUnfollow } from "@/lib/apis/profile/userUnfollow";

export const useUnfollowMutaion = (profileId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userUnfollow,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FOLLOWER_LIST, profileId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FOLLOWING_LIST, profileId],
      });
      toast("팔로우를 취소했습니다.");
    },
  });
};
