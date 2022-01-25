import React from "react"
import ReactDOM from "react-dom"

export const createPortal = (children: React.ReactNode, selector: string) => {
  if (typeof window === "undefined") {
    return null
  }
  const el = document.querySelector(selector)
  return el && ReactDOM.createPortal(children, el)
}
