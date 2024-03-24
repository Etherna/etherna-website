import React from "react"

import { cn } from "@/utils/classnames"

interface TextFieldProps {
  value: string
  checked?: boolean
  className?: string
  id?: string
  placeholder?: string
  name?: string
  error?: string
  type?: "text" | "email" | "url" | "password" | "radio" | "checkbox"
  autocomplete?:
    | "on"
    | "off"
    | "name"
    | "given-name"
    | "family-name"
    | "email"
    | "tel"
    | "url"
    | "current-password"
  multiline?: boolean
  required?: boolean
  disabled?: boolean
  elRef?: React.MutableRefObject<HTMLInputElement>
  inputFormatter?: (val: string) => string
  onFocus?: () => void
  onBlur?: () => void
  onChange: (val: string) => void
}

export function TextField({
  value,
  checked,
  className,
  id,
  name,
  error,
  type,
  placeholder,
  autocomplete,
  required,
  disabled,
  elRef,
  inputFormatter,
  onFocus,
  onBlur,
  onChange,
}: TextFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement

    const formattedValue = inputFormatter?.(target.value) ?? target.value
    onChange(formattedValue)
  }

  const isTypeText = ["text", "password", "email"].includes(type ?? "")

  return (
    <div className="flex flex-col">
      <input
        ref={elRef}
        className={cn("disabled:pointer-events-none disabled:opacity-50", className, {
          "w-full rounded-lg border-2 border-gray-300 bg-transparent px-4 py-3 transition duration-500":
            isTypeText,
          "placeholder:text-sm placeholder:text-gray-500": isTypeText,
          "border-red-500": typeof error === "string",
        })}
        id={id}
        value={Number.isNaN(value) ? "" : value}
        checked={checked}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autocomplete}
        required={required}
        disabled={disabled}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {error && <small className="mt-1 text-xs font-medium text-red-500">{error}</small>}
    </div>
  )
}
