import Image from "next/image"

import { cn } from "@/lib/utils"
import kaggleLogo from "../../public/lg-68c75047217a6-Kaggle.webp"

type LogoPlaceholderProps = {
  className?: string
  compact?: boolean
}

export function LogoPlaceholder({ className, compact = false }: LogoPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-md bg-muted/50",
        compact ? "h-8 w-full" : "h-14 w-36",
        className,
      )}
      aria-label="Kaggle logo"
      role="img"
    >
      <Image
        src={kaggleLogo}
        alt="Kaggle logo"
        fill
        priority={compact}
        sizes={compact ? "224px" : "144px"}
        className="object-contain p-1.5"
      />
    </div>
  )
}
