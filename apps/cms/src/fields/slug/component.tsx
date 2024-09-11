"use client"

import React, { useCallback, useEffect } from "react"
import {
  Button,
  FieldLabel,
  TextInput,
  useField,
  useFieldProps,
  useFormFields,
} from "@payloadcms/ui"

import { slugify } from "@/lib/string"

import type { TextFieldClientProps } from "payload"

interface SlugComponentProps extends TextFieldClientProps {
  fieldToUse: string
  checkboxFieldPath: string
}

export function SlugComponent({
  field,
  fieldToUse,
  checkboxFieldPath: checkboxFieldPathFromProps,
}: SlugComponentProps) {
  const { label } = field
  const { path, readOnly: readOnlyFromProps } = useFieldProps()

  const checkboxFieldPath = path.includes(".")
    ? `${path}.${checkboxFieldPathFromProps}`
    : checkboxFieldPathFromProps

  const { value, setValue } = useField<string>({ path })

  const { value: checkboxValue, setValue: setCheckboxValue } = useField<boolean>({
    path: checkboxFieldPath,
  })

  const fieldToUseValue = useFormFields(([fields, _dispatch]) => {
    return fields[fieldToUse]?.value as string
  })

  useEffect(() => {
    if (checkboxValue) {
      if (fieldToUseValue) {
        const formattedSlug = slugify(fieldToUseValue)

        if (value !== formattedSlug) setValue(formattedSlug)
      } else {
        if (value !== "") setValue("")
      }
    }
  }, [fieldToUseValue, checkboxValue, setValue, value])

  const handleLock = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()

      setCheckboxValue(!checkboxValue)
    },
    [checkboxValue, setCheckboxValue],
  )

  const readOnly = readOnlyFromProps || checkboxValue

  return (
    <div className="field-type slug-field-component">
      <div className="flex items-center justify-between">
        <FieldLabel field={field} htmlFor={`field-${path}`} label={label} />

        <Button className="m-0 pb-1.5" buttonStyle="none" onClick={handleLock}>
          {checkboxValue ? "Unlock" : "Lock"}
        </Button>
      </div>

      <TextInput label={""} value={value} onChange={setValue} path={path} readOnly={readOnly} />
    </div>
  )
}
