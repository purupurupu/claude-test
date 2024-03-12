type NotificationProps = {
  message: string;
  variant?: "info" | "success" | "warning" | "error";
};

export default function Notification({
  message,
  variant = "info",
}: NotificationProps) {
  const variants = {
    info: "bg-blue-100 text-blue-900",
    success: "bg-green-100 text-green-900",
    warning: "bg-yellow-100 text-yellow-900",
    error: "bg-red-100 text-red-900",
  };

  return (
    <div
      className={`${variants[variant]} px-4 py-3 rounded relative`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  );
}
