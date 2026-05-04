import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean;
};

export function Button({ className = "", isActive = false, ...props }: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium transition",
        "disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        isActive
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-background text-foreground hover:bg-muted",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
