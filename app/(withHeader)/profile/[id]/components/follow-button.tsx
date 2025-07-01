"use client";

import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { QUERY_KEY } from "@/constants/queryKey";
import { userFollow } from "@/lib/apis/profile/userFollow";
import { userUnfollow } from "@/lib/apis/profile/userUnfollow";

interface FollowButtonProps {
  profileId: string;
  isFollowing: boolean;
}

function FollowButton({
  profileId,
  isFollowing: initialIsFollowing,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: userFollow,
    onSuccess: () => {
      setIsFollowing(true);
      // 팔로워/팔로잉 목록 갱신
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FOLLOWER_LIST, profileId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FOLLOWING_LIST, profileId],
      });
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: userUnfollow,
    onSuccess: () => {
      setIsFollowing(false);
      // 팔로워/팔로잉 목록 갱신
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FOLLOWER_LIST, profileId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FOLLOWING_LIST, profileId],
      });
    },
  });

  const handleFollowToggle = () => {
    if (isFollowing) {
      unfollowMutation.mutate(profileId);
    } else {
      followMutation.mutate(profileId);
    }
  };

  return (
    <Button
      variant={isFollowing ? "outline" : "default"}
      onClick={handleFollowToggle}
      disabled={followMutation.isPending || unfollowMutation.isPending}
      size="sm"
      className="ml-2"
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}

export default FollowButton;
