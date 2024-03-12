import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import UserCard from "../components/UserCard";
import { getUsers, createMatch } from "../lib/api";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const [users, setUsers] = useState<
    {
      id: string;
      name: string;
      age: number;
      bio: string;
      pictures: string[];
    }[]
  >([]);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchUsers() {
      const data = await getUsers();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  async function handleLike(userId: string) {
    if (!user) return;
    await createMatch({ userId, matchedUserId: user.id });
    setUsers(users.slice(1));
  }

  async function handleDislike() {
    setUsers(users.slice(1));
  }

  return (
    <Layout title="Home">
      <div className="container mx-auto px-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onLike={() => handleLike(user.id)}
            onDislike={handleDislike}
          />
        ))}
      </div>
    </Layout>
  );
}
