type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "delete";
};

export default function Button({
  children,
  variant = "primary",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={` flex items-center justify-center hover:opacity-80 transition-all duration-200 hover:cursor-pointer w-full rounded-full p-3 gap-2 text-md  ${
        variant === "secondary"
          ? "bg-gray-300 text-purple-200"
          : variant === "delete"
          ? "bg-red-500 text-white"
          : "bg-purple-200 text-white"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}
