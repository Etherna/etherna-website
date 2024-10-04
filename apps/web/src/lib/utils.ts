import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import type { ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInnerTag(heading: string | undefined): "h3" | "h4" | "h5" | "h6" {
  return ("h" + (Number((heading ?? "h2").replace("h", "")) + 1)) as "h3" | "h4" | "h5" | "h6"
}
