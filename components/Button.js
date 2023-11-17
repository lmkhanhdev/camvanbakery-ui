import { cn } from "@/lib/utils";

export default function Button({ children, className, onClick }) {
  return (
    <button
      className={cn(
        "inline-flex items-center text-white px-6 py-1 rounded-md font-medium",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
