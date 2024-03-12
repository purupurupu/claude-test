import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import RegistrationForm from "../components/RegistrationForm";
import { useAuth } from "@/hooks/useAuth";

export default function Registration() {
  const router = useRouter();
  const { register } = useAuth();

  async function handleRegistration(data: {
    name: string;
    email: string;
    password: string;
    age: number;
    gender: string;
  }) {
    await register(data);
    router.push("/");
  }

  return (
    <Layout title="Registration">
      <div className="container mx-auto px-4">
        <RegistrationForm onSubmit={handleRegistration} />
      </div>
    </Layout>
  );
}
