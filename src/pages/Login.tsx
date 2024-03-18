import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "@/components/Layout";
import LoginForm from "../components/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "../components/Spinner";
import Notification from "../components/Notification";

export default function Login() {
  const router = useRouter();
  const { login, error: authError, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(data: { email: string; password: string }) {
    setLoading(true);
    setError("");

    try {
      await login(data);
      router.push("/home");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }

    setLoading(false);
  }

  return (
    <Layout title="Login">
      <div className="container mx-auto px-4">
        {(loading || authLoading) && <Spinner />}
        {error && <Notification message={error} variant="error" />}
        {authError && <Notification message={authError} variant="error" />}
        <LoginForm onSubmit={handleLogin} />
      </div>
    </Layout>
  );
}
