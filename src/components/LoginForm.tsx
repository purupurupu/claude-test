import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";

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
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
