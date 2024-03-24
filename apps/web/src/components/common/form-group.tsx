import { cn } from "@/utils/classnames"

import type { PropsWithChildren } from "react"

interface FormGroupProps extends PropsWithChildren {
  className?: string
  label?: string
  labelFor?: string
  error?: string
}

export function FormGroup({ children, className, label, labelFor, error }: FormGroupProps) {
  return (
    <div className={cn("mb-4 md:mb-6", className)}>
      {label && (
        <label className="mb-2 text-sm font-semibold text-gray-700" htmlFor={labelFor}>
          {label}
        </label>
      )}
      {children}
      {error && <small className="mt-1 text-xs font-medium text-red-500">{error}</small>}
    </div>
  )
}
