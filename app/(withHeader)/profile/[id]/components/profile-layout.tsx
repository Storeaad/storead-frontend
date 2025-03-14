"use client";

import { useQuery } from "@tanstack/react-query";

import { Skeleton } from "@/components/ui/skeleton";
import { myProfileQueryOption } from "@/hooks/queryOptions/myProfileQueryOption";
import { userProfileQueryOption } from "@/hooks/queryOptions/userProfileQueryOption";

import Follow from "./follow";
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

  if (isMyPending || isUserPending) return <Skeleton className="w-12 h-12" />;

  return (
    <>
      <ProfileImage
        initialImageUrl={userProfile?.profile_photo || myProfile?.profile_photo}
        profileId={id}
      />
      <UserName
        name={userProfile?.name || myProfile?.name}
        profileId={id}
      />
      <Follow profileId={id} />
      <Introduce
        introduce={userProfile?.about_me || myProfile?.about_me}
        profileId={id}
      />
      {/* <ArticlesTap /> */}
      <ProfileArticles profileId={id} />
    </>
  );
}

export default ProfileLayout;
