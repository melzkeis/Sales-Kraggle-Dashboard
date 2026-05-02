import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean;
};

export function Button({ className = "", isActive = false, ...props }: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium transition",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
        isActive
          ? "border-emerald-700 bg-emerald-700 text-white shadow-sm"
          : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50",
        className,
      ].join(" ")}
      {...props}
    />
  );
}

