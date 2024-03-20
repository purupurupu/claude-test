import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "@/components/Layout";
import RegistrationForm from "../components/RegistrationForm";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/Spinner";
import Notification from "@/components/Notification";

export default function Registration() {
  const router = useRouter();
  const { register, error: authError, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegistration(data: {
    name: string;
    email: string;
    password: string;
    age: number;
    gender: string;
  }) {
    setLoading(true);
    setError("");

    try {
      await register(data);
      // TODO: Redirect to the home page after registration
      // backend should return a token
      router.push("/login");
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
    <Layout title="Registration">
      <div className="container mx-auto px-4">
        {(loading || authLoading) && <Spinner />}
        {error && <Notification message={error} variant="error" />}
        {authError && <Notification message={authError} variant="error" />}
        <RegistrationForm onSubmit={handleRegistration} />
      </div>
    </Layout>
  );
}
