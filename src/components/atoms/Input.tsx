import type { InputHTMLAttributes } from "react";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={[
        "h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm",
        "outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
