import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";

type SettingsFormProps = {
  user: {
    email: string;
  };
  onSubmit: (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
};

export default function SettingsForm({ user, onSubmit }: SettingsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    defaultValues: {
      email: user.email,
    },
  });

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
        label="New Password"
        type="password"
        register={register}
        errors={errors}
      />
      <Input
        name="confirmPassword"
        label="Confirm New Password"
        type="password"
        register={register}
        errors={errors}
      />
      <Button type="submit">Save</Button>
    </form>
  );
}
