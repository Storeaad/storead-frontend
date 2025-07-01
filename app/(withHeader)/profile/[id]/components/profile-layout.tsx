"use client";

import { useQuery } from "@tanstack/react-query";

import { Skeleton } from "@/components/ui/skeleton";
import { followerListQueryOption } from "@/hooks/queryOptions/followerListQueryOption";
import { myProfileQueryOption } from "@/hooks/queryOptions/myProfileQueryOption";
import { userProfileQueryOption } from "@/hooks/queryOptions/userProfileQueryOption";

import Follow from "./follow";
import FollowButton from "./follow-button";
import Introduce from "./introduce";
import ProfileArticles from "./profile-articles";
import ProfileImage from "./profile-image";
import UserName from "./user-name";

interface Props {
  id: string;
}

function ProfileLayout({ id }: Props) {
  const { data: myProfile, isPending: isMyPending } = useQuery({
    ...myProfileQueryOption,
    throwOnError: false,
  });
  const { data: userProfile, isPending: isUserPending } = useQuery(
    userProfileQueryOption(id),
  );

  // 팔로우 상태 확인을 위한 쿼리 추가
  const { data: followerList, isPending: isFollowerListPending } = useQuery({
    ...followerListQueryOption(id),
    enabled: !!myProfile && myProfile.profile_id !== id, // 내 프로필이 아닐 때만 실행
  });

  if (isMyPending || isUserPending) return <Skeleton className="w-12 h-12" />;

  // 나의 프로필인지 확인 (로그인 여부와 현재 페이지가 내 프로필인지)
  const isMyOwnProfile = myProfile?.profile_id === id;

  // 내가 이 프로필을 팔로우하고 있는지 확인
  const isFollowing =
    followerList?.followers?.some(
      (follower) => follower.id === myProfile?.profile_id,
    ) || false;

  // 로그인 상태이고, 내 프로필이 아닐 때만 팔로우 버튼 표시
  const showFollowButton = !!myProfile && !isMyOwnProfile;

  return (
    <>
      <div className="flex items-center">
        <ProfileImage
          initialImageUrl={
            userProfile?.profile_photo || myProfile?.profile_photo
          }
          profileId={id}
        />
        {showFollowButton && (
          <FollowButton
            profileId={id}
            isFollowing={isFollowing}
          />
        )}
      </div>
      <UserName
        name={userProfile?.name || myProfile?.name}
        profileId={id}
      />
      <Introduce
        introduce={userProfile?.about_me || myProfile?.about_me}
        profileId={id}
      />
      <Follow profileId={id} />
      {/* <ArticlesTap /> */}
      <ProfileArticles profileId={id} />
    </>
  );
}

export default ProfileLayout;
