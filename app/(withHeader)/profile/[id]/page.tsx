import ProfileLayout from "./components/profile-layout";
import { ProfileProps } from "./type";

async function ProfilePage({ params }: ProfileProps) {
  const userId = (await params).id;

  return <ProfileLayout id={userId} />;
}

export default ProfilePage;
