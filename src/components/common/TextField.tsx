import React, { useMemo } from "react"

import classNames from "@/utils/classnames"

type TextFieldProps = {
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
  elRef?: React.MutableRefObject<any>
  inputFormatter?(val: string): string
  onFocus?(): void
  onBlur?(): void
  onChange(val: string): void
}

const TextField: React.FC<TextFieldProps> = ({
  value,
  checked,
  className,
  id,
  name,
  error,
  type,
  placeholder,
  autocomplete,
  multiline,
  required,
  disabled,
  elRef,
  inputFormatter,
  onFocus,
  onBlur,
  onChange,
}) => {
  const Field: React.FC<React.AllHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>> = useMemo(
    () => (props: React.AllHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) =>
      (
        <>
          {multiline ? (
            <textarea {...props} rows={6} ref={elRef} />
          ) : (
            <input {...props} ref={elRef} />
          )}
        </>
      ) as any,
    [elRef, multiline]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement

    const formattedValue = inputFormatter?.(target.value) ?? target.value
    onChange(formattedValue)
  }

  const isTypeText = ["text", "password", "email"].includes(type ?? "") || multiline

  return (
    <div className="flex flex-col">
      <Field
        className={classNames("disabled:pointer-events-none disabled:opacity-50", className, {
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

export default TextField
