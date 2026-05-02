import type { InputHTMLAttributes } from "react";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={[
        "h-10 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm",
        "outline-none transition placeholder:text-zinc-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100",
        className,
      ].join(" ")}
      {...props}
    />
  );
}

