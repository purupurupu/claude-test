import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import Link from "next/link";

type LoginFormProps = {
  onSubmit: (data: { email: string; password: string }) => void;
};

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string }>();

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          name="email"
          label="Email"
          type="email"
          register={register}
          errors={errors}
          required
        />
        <Input
          name="password"
          label="Password"
          type="password"
          register={register}
          errors={errors}
          required
        />
        <div className="text-center">
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
      <p className="text-center mt-4">
        Don&apos;t have an account?{" "}
        <Link href="/registration">
          <p className="text-blue-500 hover:underline">Register</p>
        </Link>
      </p>
    </div>
  );
}
