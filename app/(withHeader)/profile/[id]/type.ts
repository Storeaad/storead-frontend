import { Profile } from "@/api/generated/models";

export interface ProfileProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export interface ProfileImageProps {
  imageUrl?: string;
}

export interface UserNameProps {
  name?: string;
  profileId: string;
}

export interface FollowProps {
  profileId: string;
}

export interface IntroduceProps {
  introduce?: string;
  profileId: string;
}

export type ProfilePayload = Partial<
  Pick<Profile, "profile_photo" | "about_me" | "name">
>;
