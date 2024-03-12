import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import ProfileEditForm from "../components/ProfileEditForm";
import { useAuth } from "@/hooks/useAuth";

export default function ProfileEdit() {
  const router = useRouter();
  const { user, updateUser } = useAuth();

  async function handleProfileEdit(data: {
    name: string;
    bio: string;
    age: number;
    gender: string;
  }) {
    if (!user) return;
    await updateUser(data);
    router.push("/profile");
  }

  if (!user) {
    return <Layout title="Edit Profile">Loading...</Layout>;
  }

  return (
    <Layout title="Edit Profile">
      <div className="container mx-auto px-4">
        <ProfileEditForm user={user} onSubmit={handleProfileEdit} />
      </div>
    </Layout>
  );
}
