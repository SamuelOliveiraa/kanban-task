type ButtonProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "primary" | "secondary" | "delete";
};

export default function Button({
  children,
  variant = "primary",
  ...rest
}: ButtonProps) {
  return (
    <div
      tabIndex={0}
      role="button"
      className={`flex border-2 border-transparent items-center justify-center hover:opacity-80 transition-all duration-200 hover:cursor-pointer w-full rounded-full p-3 gap-2 text-md  ${
        variant === "secondary"
          ? "bg-gray-300 outline-none focus:border-purple-200 focus-within:border-purple-200 text-gray-900"
          : variant === "delete"
          ? "bg-red-500 text-white"
          : "bg-purple-200 text-white"
      }`}
      {...rest}
    >
      {children}
    </div>
  );
}
