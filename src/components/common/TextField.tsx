import React, { useMemo } from "react"

import classes from "@/styles/components/common/TextField.module.scss"

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

  return (
    <div className={classes.textFieldWrapper}>
      <Field
        className={classNames(classes.textField, className, {
          [classes.typeText]: multiline || ["text", "password", "email"].includes(type ?? ""),
          [classes.error]: typeof error === "string",
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
      {error && <small className={classes.textFieldError}>{error}</small>}
    </div>
  )
}

export default TextField
