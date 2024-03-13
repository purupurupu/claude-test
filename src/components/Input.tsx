import { FieldErrors, UseFormRegister } from "react-hook-form";

type InputProps = {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  as?: "input" | "textarea" | "select";
} & React.InputHTMLAttributes<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

export default function Input({
  name,
  label,
  register,
  errors,
  ...props
}: InputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      {props.as === "select" ? (
        <select
          {...register(name, { required: props.required })}
          id={name}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
          {...props}
        />
      ) : props.as === "textarea" ? (
        <textarea
          {...register(name, { required: props.required })}
          id={name}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
          {...props}
        />
      ) : (
        <input
          {...register(name, { required: props.required })}
          id={name}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
          {...props}
        />
      )}
      {errors[name] && (
        <span className="text-red-500 text-sm">
          {" "}
          {errors[name]?.message?.toString()}
        </span>
      )}
    </div>
  );
}
