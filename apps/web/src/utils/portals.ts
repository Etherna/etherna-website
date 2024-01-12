import { createPortal as createPortalPrimitive } from "react-dom"

export const createPortal = (children: React.ReactNode, selector: string) => {
  if (typeof window === "undefined") {
    return null
  }
  const el = document.querySelector(selector)
  return el && createPortalPrimitive(children, el)
}
