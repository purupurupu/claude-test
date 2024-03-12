import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import LoginForm from "../components/LoginForm";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  async function handleLogin(data: { email: string; password: string }) {
    await login(data);
    router.push("/");
  }

  return (
    <Layout title="Login">
      <div className="container mx-auto px-4">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </Layout>
  );
}
