"use client";

import { GoPeople } from "react-icons/go";
import { LuDot } from "react-icons/lu";

import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import { Profile } from "@/apis/generated/models";
import FollowModal from "@/components/follow-modal/follow-modal";
import { Skeleton } from "@/components/ui/skeleton";
import { QUERY_KEY } from "@/constants/queryKey";
import { followerListQueryOption } from "@/hooks/queryOptions/followerListQueryOption";
import { followingListQueryOption } from "@/hooks/queryOptions/followingListQueryOption";

import { FollowProps } from "../type";

function Follow({ profileId }: FollowProps) {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData<Profile | undefined>([
    QUERY_KEY.MY_PROFILE,
  ]);
  const { data: followerList, isPending: isFollowerPending } = useSuspenseQuery(
    {
      ...followerListQueryOption(profileId),
    },
  );
  const { data: followingList, isPending: isFollowingPending } =
    useSuspenseQuery({
      ...followingListQueryOption(profileId),
    });

  if (isFollowerPending || isFollowingPending) {
    return <Skeleton className="w-24 h-8" />;
  }

  return (
    <div className="flex items-center gap-2">
      <GoPeople />
      <section className="flex items-center">
        <div className="flex gap-1 hover:text-blue-500 hover:cursor-pointer">
          <span className="font-bold">{followerList.followers_count || 0}</span>
          <FollowModal
            trigger="followers"
            list={followerList.followers || []}
            profileId={profileId}
            isMe={profileId === userInfo?.profile_id}
          />
        </div>
        <LuDot />
        <div className="flex gap-1 hover:text-blue-500 hover:cursor-pointer">
          <span className="font-bold">
            {followingList.followers_count || 0}
          </span>
          <FollowModal
            trigger="followings"
            list={followingList.followers || []}
            profileId={profileId}
          />
        </div>
      </section>
    </div>
  );
}

export default Follow;
