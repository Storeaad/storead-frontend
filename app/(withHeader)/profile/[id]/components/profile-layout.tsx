"use client";

import { useQuery } from "@tanstack/react-query";

import { Skeleton } from "@/components/ui/skeleton";
import { myProfileQueryOption } from "@/hooks/queryOptions/myProfileQueryOption";
import { userProfileQueryOption } from "@/hooks/queryOptions/userProfileQueryOption";

import Follow from "./follow";
import Introduce from "./introduce";
import ProfileImage from "./profile_image";
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
        imageUrl={userProfile?.profile_photo || myProfile?.profile_photo}
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
    </>
  );
}

export default ProfileLayout;
