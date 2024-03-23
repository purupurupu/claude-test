import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import Link from "next/link";

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
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Create an account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        <div className="text-center">
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link href="/login">
          <span className="text-blue-500 hover:underline">Login</span>
        </Link>
      </p>
    </div>
  );
}
