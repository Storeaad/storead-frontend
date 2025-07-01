import React, { PropsWithChildren } from "react";

import Link from "next/link";

import { Following } from "@/apis/generated/models";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UnfollowAlert } from "./components/unfollow-alert";
import { useUnfollowMutaion } from "./hooks/mutaion/useUnfollowMutaion";

interface Props extends PropsWithChildren {
  trigger: "followers" | "followings";
  list: Following[];
  profileId: string;
  isMe?: boolean;
  onFollowStateChange?: () => void; // 팔로우 상태 변경 콜백 추가
}

function FollowModal({
  trigger,
  list,
  profileId,
  isMe,
  onFollowStateChange,
}: Props) {
  const unfollowMutation = useUnfollowMutaion(profileId);

  const handleUnfollow = (userId: string) => {
    unfollowMutation.mutate(userId, {
      onSuccess: () => {
        // 언팔로우 성공 시 콜백 호출
        if (onFollowStateChange) {
          onFollowStateChange();
        }
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        {trigger === "followers" ? "Followers" : "Followings"}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {trigger === "followers" ? "follower list" : "following list"}
          </DialogTitle>
          {list.length > 0 ? (
            list.map((follow) => (
              <div
                key={follow.id}
                className="flex justify-between items-center py-2"
              >
                <Link
                  className="flex items-center"
                  href={`/profile/${follow.id}`}
                >
                  <Avatar className="mr-2">
                    <AvatarImage
                      src={follow.profile_photo || ""}
                      alt={follow.name}
                      width={40}
                      height={40}
                    />
                    <AvatarFallback>
                      {follow.name.substring(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{follow.name}</span>
                </Link>
                {trigger === "followers" && isMe && (
                  <UnfollowAlert onClick={() => handleUnfollow(follow.id)} />
                )}
              </div>
            ))
          ) : (
            <span className="text-lg text-muted-foreground">
              {`아직 ${trigger === "followers" ? "팔로워" : "팔로잉"} 목록이 없습니다.`}
            </span>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default FollowModal;
