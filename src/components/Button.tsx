type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = "primary",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white",
    outline: "bg-white hover:bg-gray-100 text-gray-800 border border-gray-400",
  };

  return (
    <button
      {...props}
      className={`font-bold py-2 px-4 rounded ${variants[variant]}`} // Convert the value to a string
    >
      {children}
    </button>
  );
}
