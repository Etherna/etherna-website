"use client"

import { useState } from "react"
import { Button, Collapsible, useDocumentInfo, useLocale } from "@payloadcms/ui"

import type { TextFieldClientProps } from "payload"

interface DeleteLocaleFieldProps extends TextFieldClientProps {
  fieldToUse: string
  checkboxFieldPath: string
}

export function DeleteLocaleField({ field }: DeleteLocaleFieldProps) {
  const [collapsed, setCollapsed] = useState(true)
  const doc = useDocumentInfo()
  const locale = useLocale()

  const handleDelete = async () => {
    const response = await fetch(
      `/api/delete-locale/${doc.docConfig?.slug}/${doc.id}/${locale.code}`,
      {
        method: "POST",
      },
    )

    if (!response.ok) {
      console.error(await response.text())
      alert("Failed to delete locale")
      return false
    }

    console.log(await response.json())

    return true
  }

  return (
    <div className="field-type slug-field-component">
      <Collapsible
        header={<span className="text-[var(--color-error-500)]">Delete this locale</span>}
        isCollapsed={collapsed}
        onToggle={setCollapsed}
      >
        <h3>Delete this locale and all its content?</h3>
        <p>This action is irreversible.</p>
        <Button className="bg-[var(--color-error-500)]" buttonStyle="pill" onClick={handleDelete}>
          Delete this locale
        </Button>
      </Collapsible>
    </div>
  )
}
