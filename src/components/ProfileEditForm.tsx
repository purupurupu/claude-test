import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";

type ProfileEditFormProps = {
  user: {
    name: string;
    bio: string;
    age: number;
    gender: string;
  };
  onSubmit: (data: {
    name: string;
    bio: string;
    age: number;
    gender: string;
  }) => void;
};

export default function ProfileEditForm({
  user,
  onSubmit,
}: ProfileEditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    name: string;
    bio: string;
    age: number;
    gender: string;
  }>({
    defaultValues: user,
  });

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
        name="bio"
        label="Bio"
        as="textarea"
        register={register}
        errors={errors}
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
      <Button type="submit">Save</Button>
    </form>
  );
}
