import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import LoginForm from "@/components/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/Spinner";
import Notification from "@/components/Notification";

export default function Login() {
  const router = useRouter();
  const { login, error: authError, loading: authLoading } = useAuth();

  async function handleLogin(data: { email: string; password: string }) {
    try {
      await login(data);
      router.push("/home");
    } catch (error: any) {
      console.log("Error:", error.message);
    }
  }

  return (
    <Layout title="Login">
      <div className="container mx-auto px-4">
        {authLoading && <Spinner />}
        {authError && <Notification message={authError} variant="error" />}
        <LoginForm onSubmit={handleLogin} />
      </div>
    </Layout>
  );
}
