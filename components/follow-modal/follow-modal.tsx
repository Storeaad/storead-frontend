import React, { PropsWithChildren } from "react";

import { Following } from "@/apis/generated/models";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
        {trigger === "followers" ? "followers" : "followings"}
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
                <span>{follow.name}</span>
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
