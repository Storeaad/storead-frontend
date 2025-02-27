import { Profile } from "@/apis/generated/models";

export const getUserProfile = async (id: string) => {
  const response = (await fetch(
    `${process.env.BASE_URL}/api/v1/profiles/${id}`,
    { method: "GET", cache: "no-store" },
  ).then((data) => data.json())) as { status: number; profile: Profile };

  return response.profile;
};
