import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import SettingsForm from "../components/SettingsForm";
import { useAuth } from "@/hooks/useAuth";

export default function Settings() {
  const router = useRouter();
  const { user, updatePassword } = useAuth();

  async function handleSettingsUpdate(data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    await updatePassword(data);
    router.push("/");
  }

  if (!user) {
    return <Layout title="Settings">Loading...</Layout>;
  }

  return (
    <Layout title="Settings">
      <div className="container mx-auto px-4">
        <SettingsForm user={user} onSubmit={handleSettingsUpdate} />
      </div>
    </Layout>
  );
}
