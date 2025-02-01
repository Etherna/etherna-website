"use client"

import { useState } from "react"
import { Button, Collapsible, useDocumentInfo, useLocale } from "@payloadcms/ui"

import type { TextFieldClientProps } from "payload"

interface DeleteLocaleFieldProps extends TextFieldClientProps {
  fieldToUse: string
  checkboxFieldPath: string
}

export function DeleteLocaleField({}: DeleteLocaleFieldProps) {
  const [collapsed, setCollapsed] = useState(true)
  const doc = useDocumentInfo()
  const locale = useLocale()
  const [isPending, setIsPending] = useState(false)

  const handleDelete = async () => {
    try {
      setIsPending(true)

      const response = await fetch(
        `/api/delete-locale/${doc.docConfig?.slug}/${doc.id}/${locale.code}`,
        {
          method: "POST",
        },
      )

      if (!response.ok) {
        const msg = await response.text()
        throw new Error(msg)
      }

      const redirectUrl = new URL(window.location.href)
      redirectUrl.searchParams.delete("locale")

      window.location.href = redirectUrl.href
    } catch (error) {
      console.error(error)
      alert("Failed to delete locale: " + (error as Error).message)
    } finally {
      setIsPending(false)
    }
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
        <Button
          className="bg-[var(--color-error-500)]"
          buttonStyle="pill"
          onClick={handleDelete}
          disabled={isPending}
        >
          Delete this locale
        </Button>
      </Collapsible>
    </div>
  )
}
