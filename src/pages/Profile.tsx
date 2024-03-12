import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import UserProfile from "@/components/UserProfile";
import { getUser } from "@/lib/api";

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<{
    name: string;
    bio: string;
    pictures: string[];
  } | null>(null);

  useEffect(() => {
    async function fetchUser() {
      if (typeof id !== "string") return;
      const data = await getUser(id);
      setUser(data);
    }
    fetchUser();
  }, [id]);

  if (!user) {
    return <Layout title="Profile">Loading...</Layout>;
  }

  return (
    <Layout title="Profile">
      <div className="container mx-auto px-4">
        <UserProfile user={user} />
      </div>
    </Layout>
  );
}
