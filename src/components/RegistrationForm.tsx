import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";

type RegistrationFormProps = {
  onSubmit: (data: {
    name: string;
    email: string;
    password: string;
    age: number;
    gender: string;
  }) => void;
};

export default function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{
    name: string;
    email: string;
    password: string;
    age: number;
    gender: string;
  }>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="name"
        label="Name"
        register={register}
        errors={errors}
        required
      />
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
      <Input
        name="age"
        label="Age"
        type="number"
        register={register}
        errors={errors}
        required
      />
      <Input
        name="gender"
        label="Gender"
        as="select"
        register={register}
        errors={errors}
        required
      >
        <option value="">Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </Input>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
