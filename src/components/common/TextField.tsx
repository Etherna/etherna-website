import React, { useMemo } from "react"
import classNames from "classnames"

import classes from "@styles/components/common/TextField.module.scss"

type TextFieldProps = {
  value: string
  className?: string
  id?: string
  placeholder?: string
  name?: string
  type?: "text" | "email" | "url" | "password"
  autocomplete?: "on" | "off" | "name" | "given-name" | "family-name" | "email" | "tel" | "url" | "current-password"
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
  className,
  id,
  name,
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
    () => (props: React.AllHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) => (
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
    <Field
      className={classNames(classes.textField, className)}
      id={id}
      value={Number.isNaN(value) ? "" : value}
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
  )
}

export default TextField
